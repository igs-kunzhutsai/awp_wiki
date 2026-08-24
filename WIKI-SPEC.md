# AWP Wiki 規範

> 狀態：新版基線
> 本文件是 AWP Wiki 現行規則的唯一權威來源。其他入口只引用本文件，不複製另一套規則。

## 1. 核心原則

本 Wiki 的目標是讓知識「找得到、信得過、可追溯」。

- 一份文件只有一個主要歸屬位置。
- 目錄定義主要責任；跨市場、引擎、板底、來源與法規用 Metadata 關聯。
- 本地 Markdown 是正本，Outline 網站是發布鏡像。
- 正式知識寫架構、流程、契約、決策、限制與案例；精確 API 簽章、enum、常數與實作細節以 source code 為準。
- 事實、目前實作、建議方案與待確認事項必須分開標示。
- 不確定內容標記 `⚠️ 待確認`，不得把推測寫成確定事實。

## 2. 知識管線與權限

```text
團隊成員上傳 Raw
        ↓
YAML／Metadata 檢查
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
| 正式知識 | `wiki/00_Governance/` 至 `wiki/10_Operations/` | AI 整理後的可重用知識 | 人工不可直接改壞；透過 Raw、Agent 與 PR 更新 |
| Archive | `wiki/99_Archive/` | 停用、過期與歷史內容 | 預設不納入 LLM 檢索 |
| Outline | Outline 網站 | 給人類瀏覽的發布鏡像 | 不作為本地正本 |

不建立 `wiki/curated/` 或 `wiki/outline/` 平行層。AI 整理完成後，直接寫入對應正式目錄；錯誤要回到 Raw 修正來源，再重新產生。

## 3. 目錄架構

正式目錄與參考架構頁一致：

```text
wiki/
├── 00_Governance/           # 治理與規範
├── 01_Architecture/         # 共用技術架構
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
├── 07_Engineering/          # 工程方法
├── 08_Tools/                # 工具與評估
├── 09_AI-Knowledge/          # LLM 專用知識
├── 10_Operations/           # 維運知識
├── 99_Archive/              # 停用、過期與歷史內容
├── raw/                     # Raw 原始資料，不進正式導覽
├── index.md                 # 唯一主要導覽入口
├── glossary.md              # 共用術語
└── log.md                   # append-only 變更紀錄
```

既有舊分類頁面在完成內容與連結遷移前保留，不視為新版架構；新頁面依上述目錄建立。

## 4. 各知識域範圍

| 編號 | 目錄 | 內容範圍 |
| --- | --- | --- |
| 00 | Governance | 規範、角色、權限、文件生命週期、ADR 與衝突優先順序 |
| 01 | Architecture | 共用系統架構、邊界、關鍵流程與整合關係 |
| 02 | Projects | 實際交付專案、專案設定、建置、測試、法規對照與已知問題 |
| 03 | Game Library | 可移植遊戲、遊戲規格、機率、素材、平台 Adapter 與發行 |
| 04 | Modules | 可重用模組，例如 SAS、Backend、IGSLib、OTA、TPM、USB 更新 |
| 05 | Compliance | 法規原文索引、專業分析、條款與產品對照 |
| 06 | Markets | 市場、地區、客戶與平台差異；不重複存放共用內容 |
| 07 | Engineering | 編譯、測試、CI/CD、Coding Style、工具流程與開發方法 |
| 08 | Tools | 工具、評估方法、Golden Q&A、檢查腳本與知識品質工具 |
| 09 | AI-Knowledge | LLM 使用規範、Prompt、檢索、Agent 與知識評估 |
| 10 | Operations | 發布、監控、事件、回滾、維運與生命週期管理 |
| 99 | Archive | 停用、過期與歷史內容，預設不納入 LLM 檢索 |

## 5. 分類與 Metadata

專案、遊戲與模組使用實體目錄；其他維度使用受控 Metadata，不因每個市場或引擎複製一份文件。

| 維度 | 方式 | 範例 |
| --- | --- | --- |
| 專案、遊戲、模組 | 實體目錄 | `02_Projects/PR-M01P-G001` |
| 市場 | 目錄＋ Metadata | `markets: [US, PR]` |
| 遊戲引擎 | Metadata | `engine: cocos-creator` |
| 板底 | Metadata | `board: [M01P]` |
| 來源 | Metadata | `source: original` |
| 畫面配置 | Metadata | `screens: 2 · landscape` |
| 風格 | Metadata | `style: [latin]` |
| 法規 | Metadata＋關聯文件 | `compliance: [SAS, GLI-11]` |
| 機率 | 受控模型編號 | `math_model_id: MATH-G001-V3` |

Metadata 必須使用受控詞彙，不同文件不可混用 `Cocos`、`CocosCreator`、`cocos_creator` 等近義值。

## 6. Module 與 Project 規則

- Module 目錄依引擎分為 `04_Modules/Cocos/` 與 `04_Modules/Unity/`。
- Cocos 與 Unity Module 不可混放；共用內容放到適合的知識域。
- Project 放在 `02_Projects/`，目錄名稱必須清楚標示專案與必要識別資訊。
- Project 文件 YAML 必須有 `engine: cocos-creator`、`engine: unity` 或其他受控引擎值。
- 若 Project 同時支援多個引擎，以 Metadata 陣列記錄，並在內容中清楚分段。

## 7. Raw 格式

Raw 採外層分類、團隊／專案與年月路徑：

```text
wiki/raw/<domain>/<team-or-project>/YYYY/MM/<raw-file>.md
```

每個 Raw 檔案必須以簡易 YAML 標頭開始：

```yaml
title: "文件標題"
domain: "04_Modules"
engine: "cocos-creator" # cocos-creator | unity | both | n/a
source_type: "meeting" # meeting | note | ticket | document | chat
source: "original"
owner: "@name"
captured_at: "2026-08-24"
status: "raw"
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

## 9. 文件 Metadata 與生命週期

正式頁面至少包含：

```yaml
status: draft | reviewing | approved | deprecated | archived
owner: "@name"
updated: YYYY-MM-DD
source: original | imported | inferred
markets: []
engine: "cocos-creator"
board: []
compliance: []
```

文件生命週期：

```text
draft → reviewing → approved → deprecated → archived
```

草稿、過期文件與會議紀錄不可混入正式知識層；`99_Archive` 預設不納入 LLM 檢索。

## 10. Wiki Agent 與 Git 策略

Wiki Agent 每週至少執行一次；Raw 大量新增、重大決策或架構變更後可手動觸發。

1. 讀取新增或修改的 Raw。
2. 驗證 YAML、Metadata、來源與敏感資料。
3. 整理到對應正式目錄，不建立 `curated/` 平行層。
4. 產生變更摘要、來源清單與受影響頁面。
5. 執行 Markdown、wikilink、孤島、Metadata 與 secrets 檢查。
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
- 過期內容先標記 `deprecated`，確認無追溯價值後才可封存。
