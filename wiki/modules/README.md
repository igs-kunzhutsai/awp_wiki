# modules/ — AWP 有什麼功能

**一個 code 模組一頁。** 講這個模組對外提供什麼、行為如何、有哪些狀態、已知問題。

| | |
|---|---|
| **放** | 對外 API 行為、模組內部狀態、生命週期、已知 bug、隱性約束 |
| **不放** | 跨模組的完整流程（→ `flow/`）、精確函式簽章（→ 看 header）、為什麼這樣設計（→ `decisions/`） |

## 命名

檔名用模組名，snake_case 轉 kebab-case：`recovery.md`、`system-state.md`、`credit-bet-denom.md`。

一個模組原則上一頁。若某模組大到一頁講不完（例如 `protocol` 有 19,000 行實作），
可改為 `protocol/` 資料夾拆多頁，但**必須有一頁是入口**。

## 範例

`_example-module.md` 是完整範例，含 frontmatter、四行答題契約、每條約束附 source 的寫法。
新增模組頁時複製它改。

> 本檔只說明「這個目錄放什麼」，**不列出本目錄有哪些頁** ——
> 頁面清單集中在 `wiki/index.md`，避免兩個地方各自過期（`WIKI-SPEC.md` §2）。
