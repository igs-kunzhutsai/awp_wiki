# AWP Wiki 規範

> 狀態：新版基線
> 本文件是 AWP Wiki 現行規則的唯一權威來源。`AGENTS.md`、`CLAUDE.md` 與其他入口只引用本文件，不複製另一套規則。

## 1. 目的與內容邊界

AWP Wiki 用來保存程式碼不會直接說清楚、但團隊需要重複理解的知識：架構、流程、模組契約、設計決策、操作限制、踩雷紀錄與產品案例。

- 精確 API 簽章、enum、常數與實作細節以 source code 為準，不在 Wiki 維護容易過期的副本。
- Wiki 頁面必須能回到來源或 Raw 紀錄查證。
- 本地 Markdown 是正本；Outline 或其他瀏覽介面是發布鏡像。
- 不確定內容標記 `⚠️ 待確認`，不得把推測寫成確定事實。

## 2. 三層知識管線

```text
團隊成員上傳 Raw
        ↓
YAML 與格式檢查
        ↓
Wiki Agent 產生 Curated
        ↓
Wiki Agent 更新 Outline
        ↓
產生變更摘要、Git commit 與 Pull Request
```

| 層級 | 位置 | 目的 | 編輯權限 |
| --- | --- | --- | --- |
| Raw | `wiki/raw/` | 保存原始紀錄、外部規格、會議與匯入素材 | 團隊成員可新增／修正 |
| Curated | `wiki/curated/` | AI 依 Raw 整理出的可搜尋中間層 | Wiki Agent 產生；人工不可直接修改 |
| Outline | `wiki/outline/` | 對外目錄、摘要與導覽 | Wiki Agent 產生；人工不可直接修改 |
| Maintained | `wiki/` 其他正式領域目錄 | 經審查、可被團隊引用的知識 | 依 PR 與 Owner 審查流程修改 |

Curated 或 Outline 發現錯誤時，回到 Raw 補充或修正來源，再重新執行 Wiki Agent；不得直接手改 AI 產物。

## 3. 目錄與 11 個知識領域

正式知識分類採用以下 11 個領域。新內容只能選一個主要領域，跨領域內容以連結或標籤補足，不複製成多份。

| 編號 | 領域 | 建議內容 |
| --- | --- | --- |
| 01 | Foundations | 基礎概念、術語、背景與學習路徑 |
| 02 | Models | 模型家族、能力、限制、版本與選型 |
| 03 | Data & Knowledge | 資料、知識庫、切分、metadata 與來源 |
| 04 | Prompting | Prompt 設計、上下文、結構化輸出與防注入 |
| 05 | Retrieval & RAG | Embedding、檢索、重排、引用與更新 |
| 06 | Agents & Tools | Agent、工具呼叫、工作流與權限邊界 |
| 07 | Application Engineering | SDK、服務整合、快取、串流與錯誤處理 |
| 08 | Evaluation | 品質、成本、延遲、安全、回歸與上線門檻 |
| 09 | Safety & Governance | 安全、隱私、法規、審查與風險管理 |
| 10 | Operations | 監控、事件、版本、Fallback、成本與退場 |
| 11 | Products & Case Studies | 產品案例、使用模式、決策與經驗回饋 |

建議目錄：

```text
wiki/
├── index.md                 # 正式導覽入口
├── raw/                     # Raw：團隊可上傳，禁止當成現況依據
├── curated/                 # AI 產物：鎖定
├── outline/                 # AI 產物：鎖定
├── foundations/
├── models/
├── data-knowledge/
├── prompting/
├── retrieval-rag/
├── agents-tools/
├── application-engineering/
├── evaluation/
├── safety-governance/
├── operations/
├── products-case-studies/
├── modules/                 # 依引擎分流
│   ├── cocos/
│   └── unity/
├── projects/                # 每個 Project 必須明示引擎
├── decisions/
├── glossary.md
└── log.md                   # append-only
```

既有內容可在遷移完成前留在原目錄；新增或改寫內容依新版 11 領域與三層管線規則處理。

## 4. Module 與 Project 規則

- `Module` 固定依引擎分為 `modules/cocos/` 與 `modules/unity/`。
- Cocos 與 Unity 的內容不可混放；共同內容放在適合的知識領域。
- `Project` 目錄名稱必須寫明引擎，例如 `project-alpha-cocos/`、`project-alpha-unity/`。
- Project 文件的 YAML 標頭也必須有 `engine: cocos` 或 `engine: unity`。
- 若同一 Project 同時支援兩個引擎，仍須分別建立引擎目錄，並用連結共用共同規則。

## 5. Raw 格式

Raw 的路徑採「外層分類＋團隊或專案＋年月」：

```text
wiki/raw/<domain>/<team-or-project>/YYYY/MM/<raw-file>.md
```

每個 Raw 檔案開頭必須有簡易 YAML 標頭：

```yaml
title: "文件標題"
domain: "application-engineering"
engine: "cocos" # cocos | unity | both | n/a
source_type: "meeting" # meeting | note | ticket | document | chat
owner: "@name"
captured_at: "2026-08-24"
status: "raw"
```

YAML 後接原始內容。Raw 階段不要刪除脈絡、過度潤飾或自行推導結論。

## 6. 頁面 Metadata

正式維護頁面至少要有：

```yaml
type: module | flow | convention | decision | project | guide
domain: foundations | models | data-knowledge | prompting | retrieval-rag | agents-tools | application-engineering | evaluation | safety-governance | operations | products-case-studies
status: draft | review | stable | deprecated
owner: "@name"
updated: YYYY-MM-DD
sources: []
```

Curated 與 Outline 由 Agent 產生時，必須保留來源頁面與產生時間；Raw 使用第 5 節的專用標頭。

## 7. Wiki Agent 規範

Wiki Agent 每週至少執行一次，重大事件、架構決策或 Raw 大量新增後可手動觸發。

執行順序：

1. 讀取上次 checkpoint 後新增或修改的 Raw。
2. 驗證 YAML、領域、引擎欄位與敏感資料。
3. 只根據 Raw 產生或更新 Curated，保留來源連結。
4. 依 Curated 更新 Outline，不捏造未存在的目錄或結論。
5. 產生變更摘要與受影響頁面清單。
6. 執行 Markdown、連結、孤島與敏感資料檢查。
7. 建立短生命週期分支、commit 與 Pull Request。

Wiki Agent 不得 force push、刪除 Git 歷史、修改 Raw 來源或未經審查直接合併 `main`。

## 8. Git 與審查

- `main`：穩定、可發布的正本。
- `docs/<topic>-<short-name>`：一般文件變更。
- `adr/<number>-<short-name>`：重大決策。
- Commit 使用 Conventional Commits，例如 `docs: update recovery guide`。
- 一個 commit 聚焦一個意圖；破壞性結構調整拆成遷移與清理兩個 PR。
- 一般文件至少一位領域 Maintainer 審查。
- 架構、資安、資料治理或跨團隊規範需兩位 Maintainer。
- commit 與 push 由使用者決定，Agent 不主動執行。

## 9. 維護週期

- Raw：團隊成員有新資料即可提交。
- Curated／Outline：Wiki Agent 每週至少更新一次。
- 有效文件超過 90 天未檢視，列入維護清單。
- 失效文件標記 `deprecated`，除非確認無追溯價值，不直接刪除。
- `wiki/log.md` 只能 append，記錄規則與知識管線的重要變更。
