---
type: log
tier: maintained
status: stable
tags: [log, audit]
sources: []
updated: 2026-08-19
---
# 操作日誌

**Append-only。既有條目不得刪改，只能往下加。**

格式：`## [YYYY-MM-DD] <操作> | <摘要>`

操作類型對應 `WIKI-SPEC.md` §7 的四件事：

| 操作 | 什麼時候記 |
|---|---|
| `ingest` | 匯入了一批素材 |
| `sync` | 跟 code 同步過（要寫明對照的 commit）|
| `lint` | 做過健檢（要寫明掃的 commit range 與發現數量）|
| `fix` | 修正了具體錯誤 |
| `docs` | 新增或改寫頁面 |

**為什麼要這份記錄**：沒有它，沒有人答得出「上次核對 wiki 跟 code 是什麼時候、誰做的」。
而那正是 wiki 悄悄過期而無人察覺的原因。

---

## [2026-08-19] init | 建立 wiki 骨架與規範

- 依 `WIKI-SPEC.md` 建立目錄結構與根層三頁
- 尚無內容頁；`modules/_example-module.md` 與 `projects/_example-project/` 為範本
- 待辦：各目錄 owner 指派、`scripts/` 腳本實作、CI 設定
