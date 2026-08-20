# AWP Wiki — 架構範本

給 AI agent 使用的知識庫骨架。**本 repo 目前只有規範與目錄結構，內容尚未填入。**

## 這裡有什麼

| 檔案 | 角色 | 誰讀 |
|---|---|---|
| `AGENTS.md` | **專案指引正本** —— 定位、事實基準、invariants、code style、工作流程 | 所有 AI（Codex 原生位置） |
| `CLAUDE.md` | 第一行 `@AGENTS.md` 載入正本，其餘只寫 Claude 專屬 | Claude Code |
| `.kiro/steering/project.md` | 指向 `AGENTS.md` 的入口 | Kiro |
| `WIKI-SPEC.md` | **wiki 自己的規範** —— 目錄定義、frontmatter、五條規則、checklist | 所有人 |

一份內容、三個入口。**不要把 `AGENTS.md` 的內容複製到其他檔案** —— 複本會漂移，而且漂移是靜默的。

## 目錄結構

```
awp-wiki-repo/
│
├── WIKI-SPEC.md                  wiki 自己的規範（結構的權威定義）
├── AGENTS.md                     專案指引正本，所有 AI 共讀
├── CLAUDE.md                     `@AGENTS.md` ＋ Claude 專屬
├── README.md                     人類入口
├── .kiro/
│   └── steering/project.md       Kiro 入口，指向 AGENTS.md
│
├── wiki/
│   ├── index.md                  唯一導覽入口（30 秒重點 ＋ 任務反查表）
│   ├── glossary.md               術語表
│   ├── log.md                    記 wiki 自己的變化（append-only）
│   │
│   ├── modules/                  有什麼功能（一模組一頁）
│   │   ├── README.md             說明本目錄放什麼
│   │   └── _example-module.md    範例頁
│   │
│   ├── flow/                     怎麼用（跨模組流程）
│   ├── conventions/              寫 code 的規範
│   ├── decisions/                為什麼這樣設計
│   ├── regions/                  跨專案的地區對照表
│   │
│   ├── projects/                 各專案特有（一專案一資料夾）
│   │   ├── README.md
│   │   └── _example-project/     範例專案
│   │       ├── setup.md          設定、bet／denom 表（地區用表格欄位）
│   │       └── issues.md         只有這專案踩過的雷
│   │
│   └── raw/                      原始素材，唯讀，不進 index
│       ├── README.md             raw 自己的入口
│       ├── outline/              從 Outline 匯入的
│       ├── legacy/               我們自己的舊版
│       └── specs/                規格書、會議紀錄
│
└── scripts/
    ├── check-wikilinks.js        掃 [[wikilink]] 是否解得開
    ├── check-orphans.js          找沒人連得到的頁（排除 raw/ 與 _example*）
    ├── api-diff.js               比對兩版 header 的 API 增減
    └── sync-to-outline.js        推送到 Outline（raw/ 不推）
```

> `wiki/` 底下的 `index.md`、`glossary.md`、`log.md` 是**目標結構**，
> 本範本尚未含內容，建庫時自行建立。

### 關於各目錄的 README

每個目錄都有一份 `README.md`，但它**只寫「這個目錄放什麼、不放什麼、命名怎麼取」**——
那是規則，不會過期。

它**不列出本目錄有哪些頁**——那是清單，會過期。
頁面清單只存在 `wiki/index.md` 一處，避免兩邊各自漂移。

`wiki/raw/README.md` 是唯一同時兼作入口的例外，因為 `raw/` 不進 `index.md`，
否則沒有任何地方查得到裡面有什麼。

各目錄放什麼、不放什麼的完整定義，見 `WIKI-SPEC.md` §2。

## 核心設計

**分兩區，責任不同：**

- **維護區**（`modules/` `flow/` `conventions/` `decisions/` `regions/` `projects/` + 根層頁）—— 保證跟基準 repo 對得上，對不上算 bug
- **素材區**（`raw/`）—— 唯讀、不保證正確、不隨 code 更新、不進導航

**新頁該放哪，依序問四題**（`WIKI-SPEC.md` §3）：

1. code 改了要不要跟著改？不用 → `raw/`
2. 換一個專案還成立嗎？不成立 → `projects/<專案>/`
3. 是跨專案的地區規則嗎？是 → `regions/`
4. 剩下的看它在講模組、流程、規範還是決策

**地區是表格欄位，不是目錄。** 新增一個地區應該是加一列，不是開一個目錄。

**每頁四行答題契約**（維護區）：

```markdown
> **答**：這頁回答什麼問題
> **Source**：事實來自哪個檔案
> **讀完接著**：[[相關頁]]
> **約束**：有什麼硬性限制
```

agent 掃這四行就能決定要不要展開全文。這是本架構省 token 的核心，不得省略。

**每條約束附 source 參考**（檔案 → 函式名，不附行號）。讓讀的人能自己核對，不必相信 wiki。

## 五條規則

| # | 規則 |
|---|---|
| 1 | 基準 repo 寫死在規範裡 |
| 2 | `raw/` 唯讀，不進 index |
| 3 | 事實以模組頁為準，摘要頁只能引用 |
| 4 | 檢查腳本必須 exit code 非 0 |
| 5 | **不保存「會過期、又無法自動驗證」的資訊** |

每條都對應一次實際事故，細節見 `WIKI-SPEC.md` §6。第 5 條最上位 —— 它是判斷「該不該寫進 wiki」的通則。

## 開始使用

1. 讀 `WIKI-SPEC.md`，特別是 §1（範圍）、§3（新頁該放哪）、§6（五條規則）
2. 改 `AGENTS.md` 的「事實基準」為你的 source repo 路徑
3. 建 `wiki/index.md` 當導覽入口
4. 每頁照 §4 填 frontmatter、照 §5 寫四行答題契約

## 尚未包含

- `wiki/` 各目錄的實際內容頁
- `scripts/`：`check-wikilinks.js`、`check-orphans.js`、`api-diff.js`、Outline 同步
- CI 設定

補腳本時注意規則 4：**發現問題要 exit code 非 0**，只印訊息不算擋。

## 待決議

`WIKI-SPEC.md` §8 列了六項尚未定案的事項，包括各目錄的 owner 指派。
**規則預設「有人負責」，這題沒答案其他規則都是空的。**
