@AGENTS.md

## Claude Code 專屬

以上 `AGENTS.md` 是本專案的共同真相，Codex 與其他 AI 讀同一份。**專案知識、invariants、code style、工作流程全在那裡，本檔不重複。**

wiki 本身的規範（目錄結構、frontmatter、四條規則、搬遷對照）在 [`WIKI-SPEC.md`](WIKI-SPEC.md)。

以下只給 Claude。

### 回覆語言

繁體中文。技術術語（class / function / API 名）保留英文原文。

### 動手前先確認基準

`AGENTS.md` 的「事實基準」那節是硬規則。任何要引用 source code 的工作，第一件事是確認你讀的是 `../AWP_Backend/AWP_BACKEND_SYSTEM/`，不是 `../AWP/AWP_BACKEND_SYSTEM-awp_bs_c_style/`。

兩份長得幾乎一樣，差別是後者停在 2026-05-22、少 40 個 API。**wiki 目前多數頁面是對著後者寫的**，所以「wiki 這樣寫」不能當作驗證通過。

### 驗證優先於引用

wiki 的陳述要拿去下判斷之前，先用一個 grep 對基準 repo 確認。例如：

```bash
grep -q "awp_bs_register_event_callback" ../AWP_Backend/AWP_BACKEND_SYSTEM/src/awp_backend_main.h
```

一秒鐘的成本，可以避免沿用已經錯了三個月的事實。

### 不確定就標，不要編

不確定的事情標 `⚠️ 待確認` 或 `TODO`，絕不編造。這條在 `AGENTS.md` 的 anti-pattern 已列，這裡再強調一次是因為它最常被違反。

### 破壞性操作

刪檔、大量覆寫、結構重組、`git reset`、force push 前先列清單確認。一次改動不超過 15 個檔案；需要更大範圍先停下討論計畫。

commit 與 push 由使用者決定，不主動執行。
