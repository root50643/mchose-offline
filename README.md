# MCHOSE 滑鼠離線設定工具

此專案保存並調整 M HUB 公開提供的前端程式，供 MCHOSE 滑鼠、接收器與底座在本機或 GitHub Pages 使用。這是非官方專案，與 MCHOSE 原廠無隸屬關係；原廠商標、圖片及程式的權利仍屬原權利人。

## 在 Windows 離線使用

1. 下載完整專案或離線 ZIP，先解壓縮到一般資料夾。
2. 按兩下 `start-offline.cmd`。啟動器只使用 Windows 內建 PowerShell，不需安裝或下載執行環境。
3. 在 Chrome 或 Edge 開啟 `http://127.0.0.1:8765/`，並保持啟動器視窗開啟。
4. 連接滑鼠或接收器，按網頁的裝置連線按鈕，在瀏覽器選取您的 MCHOSE 裝置。

本機伺服器只監聽此電腦的 loopback 位址，不會對區域網路開放，也不會自行下載內容。關閉視窗或按 Ctrl+C 即可停止。若 8765 連接埠已被占用，關閉先前啟動器，或執行 `powershell -File tools/serve.ps1 -Port 8766`。

請透過啟動器開啟，避免直接按兩下 `site/index.html`。WebHID 與 Service Worker 需要瀏覽器支援及合適的來源環境。每個本機位址／連接埠和 GitHub Pages 網址的裝置授權彼此獨立，首次使用時須重新選取裝置。

## GitHub Pages 與斷網快取

網站：[GitHub Pages](https://root50643.github.io/mchose-offline/)。原始快照、維護工具與驗收紀錄：[GitHub 儲存庫](https://github.com/root50643/mchose-offline)。

下載：[完整離線 ZIP](https://github.com/root50643/mchose-offline/releases/download/v1.0.0/mchose-offline.zip)、[SHA-256](https://github.com/root50643/mchose-offline/releases/download/v1.0.0/mchose-offline.zip.sha256)。本機封裝輸出位於 `artifacts/`；解壓縮後按兩下 `start-offline.cmd`。

首次使用 Pages 時，請等待底部顯示「完整快取已就緒，可斷網使用」，再中斷網路。完整資源尚未下載、儲存空間不足或快取被瀏覽器清除時，不會顯示可離線。可以按「重試快取」重建；本機啟動器則可直接使用資料夾裡的檔案。

新版本完整下載後，狀態列會提示關閉本站分頁再重新開啟。快取只管理本專案所在路徑，不會清除其他 GitHub Pages 專案的資料。瀏覽器可能自行回收網站快取，因此長期離線請保留完整離線 ZIP。

瀏覽器設定資料也按本專案路徑隔離，避免同一 GitHub Pages 網域上的其他專案共用或覆寫 `global`、`mouse` 等設定鍵。

## 功能與資料範圍

- 保留原站所有滑鼠型號及其接收器、底座所需的前端設定能力，包含裝置支援的 DPI、回報率、按鍵、巨集與效能選項。
- 滑鼠參數透過瀏覽器 WebHID 直接與裝置通訊；設定過程使用已保存的本站資源。
- 雲端登入、帳號同步、社群、問卷、操作回報、WebSocket 通知與線上更新不屬於離線功能。
- 公開前端快照不等於原廠未公開的 Vue／TypeScript 原始專案，也不包含原廠後端。
- 韌體與其他靜態資料使用所保存版本；本專案的驗收不刷寫韌體。
- 鍵盤、耳機功能不在此次離線版範圍。

2026-11-04 的來源快照包含 624 個檔案（約 275.45 MiB），其中有 97 個韌體二進位檔及 51 個說明文件 PDF。來源清單中的排除項目不會加入離線快取。

原站目前有 10 個舊韌體檔案回傳 404，涉及 A5 Ultra、AX5 V2 OLD／NEW、G3 Ultra 4K／8K 的 offer／payload。這些版本無法提供離線更新，對應升級會在送出任何 OTA 指令前拒絕執行；一般參數設定仍保留。其餘封存韌體在更新前也會核對檔案長度及 SHA-256。韌體燒錄未列入實機驗收。

G3 S 的原廠中英文 `G3.pdf` 也均回傳 404；離線版會顯示說明書未取得，不以其他機型文件替代。所有原始缺失均保留於來源清單及型號資產驗證報告。

56 個型號名稱／別名的 112 次公開官方模板查詢皆回傳空資料；離線版會呈現空的官方模板，不宣稱雲端模板可用。本地設定及匯入、匯出仍由瀏覽器保存。

下載時取得的公開資源與版本資料保存在 `upstream/`、`snapshots/`；實際發布目錄為 `site/`。來源與檔案完整性依專案產生的資源清單核對。不要將帳號權杖、個人設定備份或私人瀏覽器資料提交至公開儲存庫。

## 開發與部署

網站本身不需要 npm 安裝。維護工具使用 Node.js 內建模組：

```powershell
node tools/build-offline.mjs
node tools/build-offline.mjs --check
node tools/test-offline.mjs
node tools/test-runtime.mjs
node tools/dev-server.mjs --port 8765
node tools/dev-server.mjs --port 8766 --prefix /mchose-offline
```

`build-offline.mjs` 依 `site/` 中所有發布檔案建立 SHA-256 清單和有版本的 Service Worker；每次調整資源後均須重建。`--check` 只檢查已產生的清單與快取版本。QA 伺服器的 prefix 模式可驗證 GitHub Pages 子路徑。

推送 `main` 後，`.github/workflows/pages.yml` 會建立快取清單並發布 `site/`。GitHub 儲存庫的 Settings → Pages → Source 須設定為 GitHub Actions。建置及發布期間 Actions 可以連線；發布後網頁執行不依賴原廠 CDN 或 API。

## 驗收記錄

資源完整性、39 型號反向引用、runtime、Windows 啟動器、三分鐘零外連，以及停止本機伺服器後重新開啟網頁的測試均已通過。2026-11-04 已使用實體 A7 V3 Ultra+，透過 WebHID 暫改一項 DPI、讀回確認、還原並再次讀回。六段 DPI、作用中板載配置／段位及效能參數與測試前一致，未修改按鍵、巨集或韌體。公開摘要為 `reports/physical-hid-summary.json`，完整個人設定與截圖不會加入公開專案或 ZIP。

若需重新驗收，在 Chrome 開啟 `http://127.0.0.1:8765/?diagnostics=1`，按「連接設備」並選取 A7 V3 Ultra+。進入滑鼠設定後，診斷面板的「DPI 讀寫並還原測試」會執行已限定的測試並顯示 JSON 結果；請勿以模擬測試結果代替實機驗收。

驗收結果由專案的 `reports/` 記錄。必要項目包括：所有發布資源完整性、根目錄與 `/mchose-offline/` 子路徑、本機斷網冷啟動、Pages 完整快取後斷網重開、零第三方網路請求，以及 A7 V3 Ultra+ 實機 DPI 讀寫後還原。其他型號以資源與程式檢查為準，不能據此宣稱全部型號均完成實機測試。

實機測試應先保存完整 DPI 狀態，只暫改單一 DPI、等待裝置回應並讀回，隨後還原原 DPI 狀態再讀回確認。不使用「套用全部設定」還原，也不改寫按鍵、巨集或韌體。
