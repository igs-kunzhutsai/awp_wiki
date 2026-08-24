# AWP Wiki 規範

> 狀態：新版基線
> 本文件是 AWP Wiki 現行規則的唯一權威來源。其他入口只引用本文件，不複製另一套規則。

## 1. 核心原則

本 Wiki 的目標是讓知識「找得到、信得過、可追溯」。

- 一份文件只有一個主要歸屬位置。
- 目錄定義主要責任；跨市場、引擎、板底、來源與法規用 YAML 欄位關聯。
- 本地 Markdown 是正本，Outline 網站是發布鏡像。
- 正式知識寫架構、流程、契約、決策、限制與案例；精確 API 簽章、enum、常數與實作細節以 source code 為準。
- 事實、目前實作、建議方案與待確認事項必須分開標示。
- 不確定內容標記 `⚠️ 待確認`，不得把推測寫成確定事實。

## 2. 知識管線與權限

```text
團隊成員上傳 Raw
        ↓
YAML 欄位檢查
        ↓
Wiki Agent 整理到對應正式目錄
        ↓
人工審查與 Git PR
        ↓
同步到 Outline 網站
```

| 層級 | 位置 | 用途 | 編輯原則 |
| --- | --- | --- | --- |
| Raw | `wiki/raw/` | 原始紀錄、外部規格、會議與匯入素材 | 團隊成員可新增／修正；不作為現況依據 |
| 正式知識 | `wiki/` 下的正式知識域 | AI 整理後的可重用知識 | 人工不可直接改壞；透過 Raw、Agent 與 PR 更新 |
| Outline | Outline 網站 | 給人類瀏覽的發布鏡像 | 不作為本地正本 |

不建立 `wiki/curated/` 或 `wiki/outline/` 平行層。AI 整理完成後，直接寫入對應正式目錄；錯誤要回到 Raw 修正來源，再重新產生。

## 3. 目錄架構

正式目錄以參考架構為基礎，並將 Architecture 與 Software Development 合併：

```text
wiki/
├── 00_Rules-and-Decisions/  # 規範與決策
├── 01_Architecture-and-Development/ # 共用技術架構與軟體開發
├── 02_Projects/             # 實際交付專案
├── 03_Game-Library/         # 可移植遊戲庫
├── 04_Modules/              # 可重用模組
│   ├── Cocos/               # Cocos Module
│   ├── Unity/               # Unity Module
│   ├── SAS/
│   ├── Backend/
│   ├── IGSLib/
│   └── Platform/            # OTA／TPM／USB 更新等
├── 05_Compliance/           # 法規與專業分析
├── 06_Markets/              # 市場差異資訊
├── 08_Tools/                # 工具與評估
├── 09_AI-and-Wiki-Agents/    # AI 與 Wiki Agent
├── 10_Incident-and-Problem-Records/ # 問題與事件紀錄
├── raw/                     # Raw 原始資料，與正式知識域一一對應
├── index.md                 # 唯一主要導覽入口
├── glossary.md              # 共用術語
└── log.md                   # append-only 變更紀錄
```

舊分類目錄已移除；新頁面與新 Raw 一律依上述目錄建立，不再新增平行分類入口。

## 4. 各知識域範圍

| 編號 | 目錄 | 內容範圍 |
| --- | --- | --- |
| 00 | Rules and Decisions | 規範、角色、權限、文件生命週期、ADR 與衝突優先順序 |
| 01 | Architecture and Development | 共用系統架構、邊界、關鍵流程、整合關係、編譯、測試、CI/CD、Coding Style 與開發方法 |
| 02 | Projects | 實際交付專案、專案設定、建置、測試、法規對照與已知問題 |
| 03 | Game Library | 可移植遊戲、遊戲規格、機率、素材、平台 Adapter 與發行 |
| 04 | Modules | 可重用模組，例如 SAS、Backend、IGSLib、OTA、TPM、USB 更新 |
| 05 | Compliance | 法規原文索引、專業分析、條款與產品對照 |
| 06 | Markets | 市場、地區、客戶與平台差異；不重複存放共用內容 |
| 08 | Tools | 工具、評估方法、Golden Q&A、檢查腳本與知識品質工具 |
| 09 | AI and Wiki Agents | LLM、Prompt、檢索、Wiki Agent 與知識評估 |
| 10 | Incident and Problem Records | 問題、事故、影響、原因、處置、修復與預防措施紀錄 |

## 5. 分類與 YAML 欄位

專案、遊戲與模組使用實體目錄；其他維度使用受控 YAML 欄位，不因每個市場或引擎複製一份文件。

| 維度 | 方式 | 範例 |
| --- | --- | --- |
| 專案、遊戲、模組 | 實體目錄 | `02_Projects/PR-M01P-G001` |
| 市場 | 目錄＋YAML 欄位 | `markets: [US, PR]` |
| 遊戲引擎 | YAML 欄位 | `engine: cocos-creator` |
| 板底 | YAML 欄位 | `board: [M01P]` |
| 頁面類型 | YAML 欄位 | `type: meeting` |
| 畫面配置 | YAML 欄位 | `screens: 2 · landscape` |
| 風格 | YAML 欄位 | `style: [latin]` |
| 法規 | YAML 欄位＋關聯文件 | `compliance: [SAS, GLI-11]` |
| 機率 | 受控模型編號 | `math_model_id: MATH-G001-V3` |

YAML 欄位值必須使用受控詞彙，不同文件不可混用 `Cocos`、`CocosCreator`、`cocos_creator` 等近義值。

## 6. Module 與 Project 規則

- Module 目錄依引擎分為 `04_Modules/Cocos/` 與 `04_Modules/Unity/`。
- Cocos 與 Unity Module 不可混放；共用內容放到適合的知識域。
- Project 放在 `02_Projects/`，目錄名稱必須清楚標示專案與引擎，例如 `PR-M01P-G001-Unity`；多引擎專案要在名稱與內容中明確標示支援的引擎。
- Project 文件 YAML 必須有 `engine: cocos-creator`、`engine: unity` 或其他受控引擎值。
- 若 Project 同時支援多個引擎，以 YAML 陣列欄位記錄，並在內容中清楚分段。

## 7. Raw 格式

Raw 必須使用與正式知識完全相同的外層分類，讓上傳者在來源階段就能放到正確知識域。04 Modules 再依引擎分流：

```text
wiki/raw/
├── 00_Rules-and-Decisions/
├── 01_Architecture-and-Development/
├── 02_Projects/
├── 03_Game-Library/
├── 04_Modules/
│   ├── Cocos/
│   └── Unity/
├── 05_Compliance/
├── 06_Markets/
├── 08_Tools/
├── 09_AI-and-Wiki-Agents/
├── 10_Incident-and-Problem-Records/
```

Raw 檔案再依團隊／專案與年月歸檔：

```text
wiki/raw/<same-domain>/<team-or-project>/YYYY/MM/<raw-file>.md
```

例如：

```text
wiki/raw/04_Modules/Cocos/awp-core/2026/08/meeting-2026-08-24.md
wiki/raw/02_Projects/PR-M01P-G001-Unity/2026/08/build-note.md
```

每個 Raw 檔案必須以簡易 YAML 標頭開始：

```yaml
title: "文件標題"
domain: "04_Modules"
type: "meeting" # meeting | note | decision | guide | spec | analysis | issue
status: "raw" # raw | draft | reviewing | approved | deprecated
owner: "@name"
updated: "2026-08-24"
engine: "cocos-creator" # cocos-creator | unity | both | n/a
markets: []
board: []
compliance: []
```

### 共用 YAML 欄位定義

Raw 與正式頁面使用同一套 YAML 欄位。YAML 是文件標籤，不是正文；真正的會議內容、分析內容或正式知識放在 YAML 結束後。

| 欄位 | 必填 | 填寫方式 | 範例 |
| --- | --- | --- | --- |
| `title` | 是 | 人看得懂的文件標題 | `2026-08-24 AWP Wiki 規則會議` |
| `domain` | 是 | 對應最上層目錄名稱；不可自創分類 | `00_Rules-and-Decisions`、`06_Markets` |
| `type` | 是 | 文件內容的種類 | `meeting`、`decision`、`guide`、`spec`、`analysis`、`issue` |
| `status` | 是 | 文件目前狀態 | `raw`、`draft`、`reviewing`、`approved`、`deprecated` |
| `owner` | 是 | 負責補充或確認資料的人／團隊 | `@kunzhu`、`AWP-Research` |
| `updated` | 是 | 這份文件最後記錄或更新的日期 | `2026-08-24` |
| `engine` | 是 | 受控引擎值；沒有引擎填 `n/a` | `unity`、`cocos-creator`、`both`、`n/a` |
| `markets` | 否 | 適用市場；沒有特定市場填 `[]` | `[US, TW]` |
| `board` | 否 | 適用板底／硬體平台；沒有則填 `[]` | `[M01P]` |
| `compliance` | 否 | 相關法規或規格；沒有則填 `[]` | `[GLI-11]` |

共同範例：

```yaml
title: "2026-08-24 美國市場分析會議"
domain: "06_Markets"
type: "meeting"
status: "raw"
owner: "@kunzhu"
updated: "2026-08-24"
engine: "unity"
markets: [US]
board: []
compliance: []
```

YAML 後接原始內容。Raw 不刪除脈絡、不過度潤飾、不自行推導結論。

## 8. Project 文件基線

每個 Project 至少具備以下 11 份文件：

```text
README.md
requirements.md
architecture.md
repository-map.md
build-guide.md
ci-cd.md
test-plan.md
release-checklist.md
compliance-mapping.md
known-issues.md
CHANGELOG.md
```

`README.md` 必須回答：專案是什麼、解決什麼問題、負責團隊、引擎／板底／市場、如何取得與編譯、依賴哪些遊戲與模組、CI/CD 與發布位置、已知限制與風險。

## 9. 文件 YAML 欄位與生命週期

所有 Raw 與正式頁面都使用上方共用 YAML。正式頁面只需要依生命週期更新 `status`，並持續更新 `updated`：

```yaml
status: "approved"
updated: "2026-08-24"
```

這些共用欄位讓 Agent 能篩選、搜尋與判斷文件是否仍然有效。Raw 與正式頁面的差別只在 `status` 與內容整理程度，不再使用兩套 YAML。

文件生命週期：

```text
raw → draft → reviewing → approved → deprecated
```

草稿與會議紀錄先留在 `wiki/raw/`；過期正式文件留在原本知識域，標記 `deprecated`，不要建立額外的封存分類。

## 10. Wiki Agent 與 Git 策略

Wiki Agent 每週至少執行一次；Raw 大量新增、重大決策或架構變更後可手動觸發。

1. 讀取新增或修改的 Raw。
2. 驗證 YAML 欄位、來源與敏感資料。
3. 整理到對應正式目錄，不建立 `curated/` 平行層。
4. 產生變更摘要、來源清單與受影響頁面。
5. 執行 Markdown、wikilink、孤島、YAML 欄位與 secrets 檢查。
6. 建立短生命週期分支與 Pull Request。
7. 審查通過後同步到 Outline。

Git 倉庫策略：

- Wiki 以一個主要倉庫為主；機密資料另設受控倉庫。
- 遊戲原則上一款遊戲一個倉庫。
- Module 僅在有獨立發布週期、版本能力、CI/CD 或團隊責任時拆倉。
- Project 在市場客製幅度大、權限不同或需獨立送審時可拆倉。
- 機率模型與法規原文使用受控權限的獨立倉庫。
- Agent 不得 force push、刪除歷史或未經審查直接合併 `main`。

## 11. 治理規範

- 一頁一主題，縮小 LLM 檢索範圍。
- 文件開頭結論先行，列出摘要、適用範圍、限制與狀態。
- 明確分離正式規範、目前實作、建議方案與待確認事項。
- 使用專案 ID、版本與日期，不使用「目前平台」或「舊版」等模糊代稱。
- 文件必須連結 Git 倉庫、Tag、Commit、Release 或送審版本。
- LLM 回答必須附文件 ID、版本、狀態與來源連結。
- 建立 Golden Q&A 驗證檢索是否命中正確文件。
- 衝突優先順序：已核准法規／規格 → ADR → 專案正式文件 → 模組文件 → FAQ → 會議紀錄。

一般文件由一位領域 Maintainer 審查；架構、資安、資料治理與跨團隊規範由兩位 Maintainer 審查。

## 12. 維護週期

- Raw：團隊成員有新資料即可提交。
- 正式知識：Wiki Agent 每週至少檢查一次。
- 文件超過 90 天未檢視，列入維護清單。
- `wiki/log.md` 只能 append，記錄規則、分類與重大知識變更。
- 過期內容在原本知識域標記 `deprecated`；Git 歷史保留過去版本，不另設封存目錄。
