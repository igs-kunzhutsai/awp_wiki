# AWP Backend 專案指引

> 所有 AI 的共同入口。Codex 讀本檔；Claude 透過 `CLAUDE.md` 的 `@AGENTS.md` 載入；
> Kiro 透過 `.kiro/steering/project.md` 指過來。

AWP 是 IGS 機台後台 **C++ SDK**，對外是 C-style API（`awp_bs_<module>_<action>`）。
本 repo 是它的知識庫，不是程式碼本身。

---

## 開工前讀這兩份

| 檔案 | 給你什麼 |
|---|---|
| **`wiki/index.md`** | 30 秒重點 ＋ 任務反查表 —— 依任務決定要展開哪幾頁 |
| **`WIKI-SPEC.md`** | wiki 的結構與規範。**要動 wiki 之前必讀 §7（四個操作）** |

**不要全量載入 wiki。** 從 `index.md` 的反查表定位，讀 1–5 頁就好。

---

## 🔴 事實基準

**source code 唯一基準：`../AWP_Backend/AWP_BACKEND_SYSTEM/`**

機器上可能同時存在多份 AWP checkout，長得幾乎一樣，**只有路徑分得出來**。
任何要引用 source code 的工作，第一件事是確認你讀的是上面那份。

**wiki 可能落後於基準 —— wiki 這樣寫，不等於驗證通過。**
涉及簽章、參數、enum、常數時，直接 grep header，不要只信 wiki。

---

## 🔴 紅線

- **不准改 `wiki/raw/`** —— 唯讀素材
- **不准刪 `wiki/log.md` 既有條目** —— 只能 append
- **不准在沒查 code 的情況下寫事實** —— 不確定就標 `⚠️ 待確認`，絕不編造
- **一次改動超過 15 個檔案要先停下討論**
- **破壞性操作前先列清單確認**（刪檔、大量覆寫、結構重組、`git reset`、force push）
- **commit 與 push 由使用者決定**，不主動執行
- **token 不准寫進會被 git 追蹤的檔案** —— 走環境變數

---

本地 markdown 是正本，Outline 只是給人瀏覽的鏡像，不一致以本地為準。
