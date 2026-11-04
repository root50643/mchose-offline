# M HUB 前端鏡像

[開啟設定頁](https://root50643.github.io/mchose-offline/) · [GitHub 儲存庫](https://github.com/root50643/mchose-offline)

目前版本為 **2.0.0**。保存 M HUB 原站的前端、設定檔及靜態資源，透過 GitHub Pages 載入，保留原站介面、文字與操作功能。登入、雲端同步、社群與通知等服務仍使用原廠 API。

## 使用方式

以桌面版 Chrome 或 Edge 開啟設定頁，連接滑鼠或接收器，再依原站介面選取裝置。新網址首次連接時，需在瀏覽器重新選取裝置。

資源依實際使用載入，由瀏覽器進行一般快取；不預先下載整站，不增加快取狀態列或診斷介面。舊版的背景快取與 Service Worker 會在更新時移除，僅處理本專案。

前端程式與靜態設定使用已保存的版本，不會自動同步原廠新版。未收錄或無法取得的靜態資源會沿用原廠網址；原廠服務功能仍需網路及服務可用。

原廠共用 SDK 的 `keyboardConfig.json`、`keyboardPreset.json` 更新若連線超過 5 秒，會交由 SDK 原有的失敗處理使用既有資料與內建定義，避免這兩個請求拖住整個滑鼠介面；不建立替代設定檔。

## 維護與部署

維護工具建議使用 Node.js 24（部署流程亦使用此版本），無須安裝 npm 套件：

```powershell
npm run build
npm run verify
npm test
npm run serve
```

本機預覽位址為 `http://127.0.0.1:8765/`。要檢查 Pages 子路徑，可執行：

```powershell
node tools/dev-server.mjs --port 8766 --prefix /mchose-offline
```

維護者需更新快照時，手動執行 `npm run snapshot`，再重新建置、驗證與部署。GitHub Actions 僅使用儲存庫內的快照建置並發布 `site/`，不在部署時自動更新原廠程式。Pages 的發布來源為 GitHub Actions。

`upstream/` 保存取得的原始檔案；`snapshots/mirror-source-manifest.json` 記錄來源、擷取結果與 SHA-256；`reports/` 保存建置與驗證紀錄。原作者及授權說明見 [第三方內容與授權](THIRD_PARTY_NOTICES.md)。

## 版本紀錄

v2 已取代 v1 的整站預先快取與診斷版本。v1 的工具、Release 及驗收證據保留作歷史紀錄，不代表 v2 的功能或驗收結果；目前部署以 v2 的建置與驗證紀錄為準。
