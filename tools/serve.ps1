[CmdletBinding()]
param(
    [ValidateRange(1, 65535)][int]$Port = 8765,
    [switch]$NoBrowser,
    [string]$SiteDirectory
)

$ErrorActionPreference = 'Stop'
$siteRoot = [IO.Path]::GetFullPath($(if ($SiteDirectory) { $SiteDirectory } else { Join-Path $PSScriptRoot '..\site' }))
$sitePrefix = $siteRoot.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
if (-not (Test-Path -LiteralPath (Join-Path $siteRoot 'index.html') -PathType Leaf)) {
    Write-Host 'Offline website files are missing. Extract the complete archive before starting.' -ForegroundColor Red
    exit 1
}

$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'
    '.mjs' = 'text/javascript; charset=utf-8'; '.css' = 'text/css; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'; '.map' = 'application/json; charset=utf-8'
    '.txt' = 'text/plain; charset=utf-8'; '.svg' = 'image/svg+xml'; '.png' = 'image/png'
    '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg'; '.gif' = 'image/gif'; '.webp' = 'image/webp'
    '.avif' = 'image/avif'; '.ico' = 'image/x-icon'; '.woff' = 'font/woff'; '.woff2' = 'font/woff2'
    '.ttf' = 'font/ttf'; '.otf' = 'font/otf'; '.wasm' = 'application/wasm'
    '.bin' = 'application/octet-stream'; '.zip' = 'application/zip'; '.mp3' = 'audio/mpeg'
    '.wav' = 'audio/wav'; '.ogg' = 'audio/ogg'; '.mp4' = 'video/mp4'; '.webm' = 'video/webm'
    '.pdf' = 'application/pdf'; '.glb' = 'model/gltf-binary'
    '.webmanifest' = 'application/manifest+json; charset=utf-8'
}

function Send-Response {
    param($Stream, [int]$Status, [string]$Reason, [string]$ContentType, [byte[]]$Body, [bool]$HeadOnly)
    $header = "HTTP/1.1 $Status $Reason`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nCache-Control: no-cache`r`nX-Content-Type-Options: nosniff`r`nConnection: close`r`n`r`n"
    $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
    $Stream.Write($headerBytes, 0, $headerBytes.Length)
    if (-not $HeadOnly -and $Body.Length -gt 0) { $Stream.Write($Body, 0, $Body.Length) }
}

function Send-TextResponse {
    param($Stream, [int]$Status, [string]$Reason, [string]$Text, [bool]$HeadOnly = $false)
    Send-Response $Stream $Status $Reason 'text/plain; charset=utf-8' ([Text.Encoding]::UTF8.GetBytes($Text)) $HeadOnly
}

$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $Port)
try { $listener.Start() }
catch {
    Write-Host "Cannot start http://127.0.0.1:$Port/ . Port $Port may already be in use." -ForegroundColor Red
    Write-Host "Close the previous offline server or run: powershell -File tools\serve.ps1 -Port 8766"
    exit 1
}

$localUrl = "http://127.0.0.1:$Port/"
Write-Host "MCHOSE offline server: $localUrl" -ForegroundColor Green
Write-Host 'Open this address in Chrome or Edge. Keep this window open; press Ctrl+C to stop.'
Write-Host 'This server listens only on this computer and does not download anything.'
if (-not $NoBrowser) {
    try { Start-Process -FilePath $localUrl } catch { Write-Host "Open $localUrl in your browser." }
}

try {
    while ($true) {
        if (-not $listener.Pending()) { Start-Sleep -Milliseconds 30; continue }
        $client = $listener.AcceptTcpClient()
        $stream = $null
        $reader = $null
        try {
            $client.ReceiveTimeout = 5000
            $client.SendTimeout = 30000
            $stream = $client.GetStream()
            $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
            $requestLine = $reader.ReadLine()
            if (-not $requestLine -or $requestLine.Length -gt 8192) { continue }
            $parts = $requestLine.Split(' ')
            if ($parts.Length -ne 3 -or $parts[2] -notmatch '^HTTP/1\.[01]$') {
                Send-TextResponse $stream 400 'Bad Request' 'Invalid request.'
                continue
            }
            $headerSize = $requestLine.Length
            for ($headerNumber = 0; $headerNumber -lt 100; $headerNumber++) {
                $line = $reader.ReadLine()
                if ($null -eq $line -or $line.Length -eq 0) { break }
                $headerSize += $line.Length
                if ($headerSize -gt 16384) { throw 'Request headers are too large.' }
            }
            $headOnly = $parts[0] -eq 'HEAD'
            if ($parts[0] -ne 'GET' -and -not $headOnly) {
                Send-TextResponse $stream 405 'Method Not Allowed' 'Only GET and HEAD are supported.'
                continue
            }
            $requestPath = ($parts[1] -split '[?#]', 2)[0]
            try { $decodedPath = [Uri]::UnescapeDataString($requestPath) }
            catch { Send-TextResponse $stream 400 'Bad Request' 'Invalid URL.' $headOnly; continue }
            if (-not $decodedPath.StartsWith('/') -or $decodedPath.Contains('\') -or $decodedPath.Contains(':') -or $decodedPath.IndexOf([char]0) -ge 0) {
                Send-TextResponse $stream 400 'Bad Request' 'Invalid path.' $headOnly
                continue
            }
            $relativePath = $decodedPath.TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar)
            try { $filePath = [IO.Path]::GetFullPath((Join-Path $siteRoot $relativePath)) }
            catch { Send-TextResponse $stream 400 'Bad Request' 'Invalid path.' $headOnly; continue }
            if ($filePath -ne $siteRoot -and -not $filePath.StartsWith($sitePrefix, [StringComparison]::OrdinalIgnoreCase)) {
                Send-TextResponse $stream 403 'Forbidden' 'Path outside website root.' $headOnly
                continue
            }
            if (Test-Path -LiteralPath $filePath -PathType Container) { $filePath = Join-Path $filePath 'index.html' }
            if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
                Send-TextResponse $stream 404 'Not Found' 'File not found.' $headOnly
                continue
            }
            $checkPath = $filePath
            $isReparsePoint = $false
            while ($checkPath -and $checkPath -ne $siteRoot) {
                if (([IO.File]::GetAttributes($checkPath) -band [IO.FileAttributes]::ReparsePoint) -ne 0) { $isReparsePoint = $true; break }
                $checkPath = [IO.Path]::GetDirectoryName($checkPath)
            }
            if ($isReparsePoint) {
                Send-TextResponse $stream 403 'Forbidden' 'Symbolic links are not served.' $headOnly
                continue
            }
            $extension = [IO.Path]::GetExtension($filePath).ToLowerInvariant()
            $contentType = $mimeTypes[$extension]
            if (-not $contentType) { $contentType = 'application/octet-stream' }
            $fileInfo = [IO.FileInfo]::new($filePath)
            $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($fileInfo.Length)`r`nCache-Control: no-cache`r`nX-Content-Type-Options: nosniff`r`nConnection: close`r`n`r`n"
            $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            if (-not $headOnly) {
                $fileStream = [IO.File]::OpenRead($filePath)
                try { $fileStream.CopyTo($stream, 65536) } finally { $fileStream.Dispose() }
            }
            $stream.Flush()
        }
        catch {
            if ($stream) { try { Send-TextResponse $stream 400 'Bad Request' 'Request could not be read.' } catch {} }
        }
        finally {
            if ($reader) { $reader.Dispose() }
            if ($stream) { $stream.Dispose() }
            $client.Dispose()
        }
    }
}
finally { $listener.Stop() }
