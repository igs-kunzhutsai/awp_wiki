# Wiki Log

本檔案為 append-only，只記錄 Wiki 規則、分類與知識管線的重要變更。

## 2026-08-24

- 採用新版 Wiki 規則：Raw → Curated → Outline。
- Module 依 Cocos／Unity 分流，Project 強制標示引擎。
- 知識分類改採 11 個正式領域。

## 2026-08-24（架構對齊）

- 依 LLM Wiki Architecture Blueprint 對齊為 `00_Governance` 至 `10_Operations`，另設 `99_Archive`。
- 移除 `wiki/curated/` 與 `wiki/outline/` 平行層；AI 整理內容直接進對應正式知識域，Outline 網站作為發布鏡像。

## 2026-08-24（Raw 分類對齊）

- 移除無用途的舊平行目錄：`conventions`、`decisions`、`flow`、`modules`、`projects`、`regions`。
- `wiki/raw/` 建立與正式 Wiki 相同的 `00–10`、`99_Archive` 分類；`04_Modules` 再分 `Cocos` 與 `Unity`。

## 2026-08-24（目錄命名清晰化）

- 將正式 Wiki 與 Raw 的目錄名稱改為更直白的英文：`00_Rules-and-Decisions`、`07_Software-Development`、`09_AI-and-Wiki-Agents`、`10_Deployment-and-Maintenance`。

## 2026-08-24（架構與開發合併）

- 合併 `01_Architecture` 與 `07_Software-Development` 為 `01_Architecture-and-Development`。
- 正式 Wiki 與 Raw 使用相同的新目錄；系統架構、開發流程、測試與 CI/CD 集中管理。

## 2026-08-24（問題事件分類）

- 將 `10_Deployment-and-Maintenance` 改為 `10_Incident-and-Problem-Records`。
- 第 10 類專注記錄問題、事故、影響、原因、處置、修復與預防措施。

## 2026-08-24（移除封存分類）

- 移除空的 `wiki/99_Archive/` 與 `wiki/raw/99_Archive/`。
- 過期文件留在原本知識域並標記 `deprecated`；歷史版本由 Git 保留，不另設封存分類。

## 2026-08-24（YAML 欄位統一）

- Raw 與正式頁面改用同一套 YAML 欄位。
- 移除容易混淆的來源與記錄時間欄位，改用共用的 `type` 與 `updated`。

## 2026-08-25（Wiki 操作）

- 在 `WIKI-SPEC.md` 定義 `ingest`、`query`、`lint` 三種 Wiki Agent 操作。
- `ingest` 負責匯入 Raw 並更新正式知識、索引、交叉連結與 Log。
- `query` 預設唯讀；`lint` 負責結構、連結、狀態、矛盾與知識缺口健檢。

## 2026-08-25（索引與追溯）

- 補充正式頁面的「參考資料」與「關聯頁面」格式，讓整理結果可以回連 Raw。
- 補充 `index.md` 頁面索引與 `log.md` 的 `ingest`、`query`、`lint` 操作紀錄格式。
- 補充頁面數量增加後的本地搜尋索引策略，以及矛盾與過期內容的處理規則。

## 2026-08-25（健檢頻率）

- Wiki Agent 與正式知識健檢由每週至少一次改為每天至少一次。

## [2026-08-25] ingest | M02 打包與產品板更新流程

- 操作：ingest
- 輸入：`wiki/raw/02_Projects/PR-M02-Microchip-n-a/2026/08/m02-packaging-process-outline.md`
- 更新頁面：`wiki/02_Projects/PR-M02-Microchip-n-a/build-and-update-guide.md`
- 參考頁面：[Outline M02 打包流程說明](https://outline01.igsgame.com/doc/m02-ltq34UZl8Y)
- 待確認：資源產出連結、開發板燒錄連結、機種名稱範例與 Git 更新目標。

## [2026-08-25] reclassify | M02 打包與產品板更新流程

- 原分類：`02_Projects`
- 新分類：`01_Architecture-and-Development`
- 原因：M02 是板台／平台，不是獨立專案；此頁是可供多個專案共用的打包、燒錄與 FOTA 流程。

## [2026-08-25] rule | 圖片與附件保存

- 圖片與附件匯入時必須保存到 Repo，不可只保留外部網址。
- Raw 保留原始資產，正式頁面複製必要圖片並使用相對路徑引用。
