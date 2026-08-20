# AWP 專案規則入口

Kiro 開工前先完整讀根目錄的 `AGENTS.md`，再依任務讀 `wiki/index.md` 指到的頁。
要動 wiki 之前另讀 `WIKI-SPEC.md` §7。

**不要在本檔複製專案內容。** Kiro 會在開機時全文注入 steering，
複製過來就會形成第二份會漂移的真相，而且漂移是靜默的。

## 唯一刻意重複的一條

**source code 基準是 `../AWP_Backend/AWP_BACKEND_SYSTEM/`。**
機器上可能有多份長得很像的 checkout，只有路徑分得出來。
漏了這條會產出看起來正確、實際編譯不過的程式碼，所以寧可重複。
