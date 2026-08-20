# AWP Backend 專案指引（Kiro 入口）

**本檔只是指標。專案的共同真相在 repo 根目錄的 `AGENTS.md`，開工前先讀它。**

不要把 `AGENTS.md` 的內容複製到這裡。複本會漂移，而且漂移是靜默的
（SpinningTop 2026-07-30 實測：複本少一個參數，AI 照做後跑錯硬體卻宣稱驗證通過，零錯誤訊息）。

## 開工前

1. 讀 `AGENTS.md` —— 專案定位、invariants、code style、工作流程、已知 bug
2. 讀 `WIKI-SPEC.md` —— wiki 的目錄規範與四條規則
3. 依任務讀 `wiki/index.md` 指到的頁，不要全量載入 wiki

## 🔴 唯一不能漏的一條

**source code 事實基準是 `../AWP_Backend/AWP_BACKEND_SYSTEM/`。**

不要用 `../AWP/AWP_BACKEND_SYSTEM-awp_bs_c_style/` —— 那是 2026-05-22 的舊 checkout，
少 40 個 API、`game_end` 簽章不同。wiki 多數頁面是對著那份寫的，所以
「wiki 這樣寫」不等於驗證通過。動 code 前自己 grep header 確認。

這條寫在這裡是刻意的重複：漏了它會產生看起來正確、實際編譯不過的程式碼。
其餘內容一律回 `AGENTS.md`，不在本檔展開。
