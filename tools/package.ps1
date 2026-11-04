param([string]$OutputPath = '')
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
if (-not $OutputPath) { $OutputPath = Join-Path $projectRoot 'artifacts\mchose-offline.zip' }
$archivePath = [IO.Path]::GetFullPath($OutputPath)
if (-not $archivePath.StartsWith($projectRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
    throw 'The archive must be written inside this project.'
}
$archiveDirectory = [IO.Path]::GetDirectoryName($archivePath)
[IO.Directory]::CreateDirectory($archiveDirectory) | Out-Null
if ([IO.File]::Exists($archivePath)) { [IO.File]::Delete($archivePath) }
$stream = [IO.File]::Open($archivePath, [IO.FileMode]::CreateNew)
$archive = New-Object IO.Compression.ZipArchive($stream, [IO.Compression.ZipArchiveMode]::Create, $false)
$count = 0
try {
    foreach ($file in Get-ChildItem -LiteralPath $projectRoot -Recurse -File -Force) {
        $relative = $file.FullName.Substring($projectRoot.Length + 1).Replace('\', '/')
        if ($relative -match '^(\.git|artifacts|node_modules)/' -or $relative -match '^reports/private/' -or $relative -match '\.(log|part|tmp)$') { continue }
        [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, 'mchose-offline/' + $relative, [IO.Compression.CompressionLevel]::Optimal) | Out-Null
        $count++
    }
} finally {
    $archive.Dispose()
    $stream.Dispose()
}
$digest = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash.ToLowerInvariant()
[IO.File]::WriteAllText($archivePath + '.sha256', $digest + '  ' + [IO.Path]::GetFileName($archivePath) + [Environment]::NewLine, (New-Object Text.UTF8Encoding($false)))
[PSCustomObject]@{ Path = $archivePath; Files = $count; Bytes = (Get-Item -LiteralPath $archivePath).Length; SHA256 = $digest } | ConvertTo-Json
