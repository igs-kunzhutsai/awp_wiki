# scripts/ — 檢查與同步

| 腳本 | 做什麼 | 發現問題時 |
|---|---|---|
| `check-wikilinks.js` | 掃全站 `[[wikilink]]` 是否解得開 | **exit 1** |
| `check-orphans.js` | 找沒有任何頁連進來的頁 | **exit 1** |
| `api-diff.js` | 比對兩版 header 的對外 API 增減 | exit 0（報告工具，不是關卡）|
| `sync-to-outline.js` | 推送到 Outline | **exit 1** |
| `lib.js` | 共用的走訪與排除規則 | — |

## 用法

```bash
node scripts/check-wikilinks.js
node scripts/check-orphans.js
node scripts/api-diff.js <舊 header> <新 header>
node scripts/sync-to-outline.js --dry-run
OUTLINE_TOKEN=xxx node scripts/sync-to-outline.js
```

## 🔴 規則 4：發現問題必須 exit code 非 0

只印訊息不算擋。

> **事故**：同步腳本對 40 頁印 `SKIP` 之後照樣印 `Done`、exit 0，
> 導致整棵目錄從沒推上 Outline，沒有任何人發現。

`sync-to-outline.js` 對「沒有 Outline 對映」的頁直接 exit 1，不靜默跳過。**不要把這條改回去。**

## 自我驗證

每支都有 `--selftest`，用陽性與陰性案例確認它真的抓得到問題，而不是永遠回綠：

```bash
node scripts/check-wikilinks.js --selftest
node scripts/check-orphans.js --selftest
node scripts/api-diff.js --selftest
```

**改動腳本後先跑 selftest。** 一個永遠回綠的檢查工具比沒有工具更危險 ——
它會讓人以為已經檢查過了。

## 排除規則

三種東西不列入連結與孤島檢查（見 `lib.js` 的 `isExcluded`）：

| 排除 | 為什麼 |
|---|---|
| `raw/` | 唯讀素材，本來就不進導覽（`WIKI-SPEC.md` 規則 2）|
| `_` 開頭 | 範本不是內容 |
| `README.md` | 目錄說明不是內容頁，`index.md` 列的是實際頁面 |

## 尚未實作

`sync-to-outline.js` 的實際 API 呼叫還沒補，目前會在對映檢查通過後回報未實作並 exit 1。
補的時候記得：推送失敗要累計錯誤數並以非 0 結束，不要只印訊息。
