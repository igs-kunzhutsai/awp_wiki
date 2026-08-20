# scripts/ — 自動化腳本

本範本不含腳本實作，以下是建議補上的四支：

| 腳本 | 做什麼 |
|---|---|
| `check-wikilinks.js` | 掃全站 `[[wikilink]]` 是否解得開 |
| `check-orphans.js` | 找沒有任何頁連進去的孤島（**排除 `raw/`**） |
| `api-diff.js` | 比對兩版 header 的對外 API 增減，取代手寫 changelog |
| `sync-to-outline.js` | 推送到 Outline（**`raw/` 不推**） |

## 🔴 規則 4：發現問題必須 exit code 非 0

只印訊息不算擋。

> **事故**：同步腳本對 40 頁印 `SKIP` 之後照樣印 `Done`、exit 0，
> 導致整棵目錄從沒推上 Outline，沒有任何人發現。

腳本本身也要能自我驗證 —— 加一個 `--selftest`，用已知的陽性與陰性案例對照，
確認它真的抓得到問題，而不是永遠回綠。
