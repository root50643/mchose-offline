# M HUB 前端鏡像

[開啟設定頁](https://root50643.github.io/mchose-offline/) · [GitHub 儲存庫](https://github.com/root50643/mchose-offline)

目前版本為 **2.1.0**。保存 M HUB 原站的前端、設定檔及靜態資源，透過 GitHub Pages 載入，保留原站介面、文字與操作功能。登入、雲端同步、社群、通知與使用者上傳內容仍使用原廠服務。

## 使用方式

以桌面版 Chrome 或 Edge 開啟設定頁，連接滑鼠或接收器，再依原站介面選取裝置。新網址首次連接時，需在瀏覽器重新選取裝置。

資源依實際使用載入，由瀏覽器進行一般快取；不預先下載整站，不增加快取狀態列或診斷介面。舊版的背景快取與 Service Worker 會在更新時移除，僅處理本專案。

前端程式與靜態設定使用已保存的版本，不會自動同步原廠新版。設定程式的靜態檔由本專案供應，沒有原廠 CDN 備援下載；未封存的新檔或原廠已無法取得的舊檔會在同源回應找不到，讓原程式處理錯誤。原廠服務功能仍需網路及服務可用。

`keyboardConfig.json`、`keyboardPreset.json` 與 React 介面模組均使用取得的原廠檔案，維持原始載入流程。官方商城、桌面客戶端安裝程式、桌面更新及原生修復工具仍保留原廠連結，未納入瀏覽器設定資源。原作者聲明與授權保留於儲存庫。

目前保存 1,857 個可取得的來源檔案。相依性盤點另有 14 個原廠回應 404 的項目，以及 2 個原廠回應成功但內容為零位元組的韌體；完整網址與證據列於 [靜態資源驗證紀錄](reports/mirror-independence.json)。這些項目不能視為可用檔案，也不會回連中國 CDN 重試。A7 V3 Ultra+ 已完成本版的實機唯讀 DPI 核對；其他型號的資源檢查不等同實機測試。

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

發布時，位元組完全相同的字型共用檔案；鍵盤預設載荷採無損 gzip，SDK 載入後解碼。原始檔保留，測試會核對解碼後 JSON 與原檔一致；圖片、音訊與影片沒有做有損縮減。這些處理不會增加離線預先快取。

獨立相依性盤點由 `tools/audit-mirror-dependencies.mjs` 執行，並以本機 HTTP 同時驗證根路徑與 Pages 子路徑。瀏覽器網路驗證可用 `node tools/dev-server.mjs --port 8765 --audit`，該模式的檢查工具不會放入發布網站。實機驗證僅涵蓋測試紀錄中列出的裝置；不以資源檢查代替其他裝置的實測。

## 版本紀錄

v2.1 補齊 v2.0 因連線問題缺少的可取得靜態資源，移除原廠 CDN 備援與暫時的等待限制。v1 的整站預先快取工具、Release 及驗收證據保留作歷史紀錄；目前部署以本版的相依性、瀏覽器與實機測試紀錄為準。
