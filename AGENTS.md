# AWP Backend 專案指引

> **所有 AI 的共同真相。** Codex 直接讀本檔；Claude 透過 `CLAUDE.md` 的 `@AGENTS.md` 載入；
> Kiro 透過 `.kiro/steering/project.md` 指過來。
>
> 本檔只寫**怎麼工作**。AWP 的知識（模組行為、約束、已知問題、code style）在 `wiki/`，
> wiki 的結構規範在 `WIKI-SPEC.md` —— **本檔一律引用，不複製**（`WIKI-SPEC.md` 規則 3）。

---

## 這是什麼專案

AWP 是 IGS 機台後台 **C++ SDK**，對外是 C-style API（`awp_bs_<module>_<action>`），
給遊戲端（Cocos Creator / Unity / Native）整合。

本 repo 是它的知識庫，不是程式碼本身。

---

## 🔴 事實基準

**source code 唯一基準：`../AWP_Backend/AWP_BACKEND_SYSTEM/`**

不要用 `../AWP/AWP_BACKEND_SYSTEM-awp_bs_c_style/` —— 那是 2026-05-22 的舊 checkout，
比基準少 40 個 API、`game_end` 簽章也不同。

**任何要引用 source code 的工作，第一件事是確認你讀的是基準那份。**
兩份長得幾乎一樣，看路徑才分得出來。

---

## ⚠️ wiki 目前落後於基準

wiki 多數頁面是對著舊 checkout 寫的。**動核心流程前必須自己查 header 確認**：

| 項目 | wiki 寫的 | 基準實際 |
|---|---|---|
| `game_start` | 5 參數 | **6 參數**，新增 `original_bet` |
| 中間步驟 | 無 | **必呼叫 `awp_bs_game_win_determined`** |
| `game_end` | 12 參數 | **13 參數** |
| 參數名 | `freegame_win` | **`special_game_win`** |
| 對外 API 總數 | 158 | **198**（wiki 漏 40 個）|

`wiki/index.md` 的 Critical Invariants 表也還沒更新，其中至少 3 條已失效。

> 這節是過渡性的，修完就刪。

---

## 開工前先讀哪頁

依任務挑讀，**不要全量載入 wiki**：

| 任務 | 讀 |
|---|---|
| 任何事 | `wiki/index.md` —— 30 秒重點 ＋ 任務反查表 |
| 查 enum / 常數 / 錯誤碼 | **不要查 wiki，直接 grep 基準 repo**（會過期，見規則 5）|
| 改某模組 | `wiki/modules/<name>.md` |
| 寫串接流程 | `wiki/flow/` |
| 查 code 規範 | `wiki/conventions/` |
| 查某地區的要求 | `wiki/regions/` |
| 查某專案的設定 | `wiki/projects/<專案>/` |

---

## 改 wiki 的流程

**任何 AI 要動 wiki，照這五步走：**

1. **先讀 `WIKI-SPEC.md`**，用 §3 的四題判定要寫的東西該放哪個目錄
2. **回基準 repo 查證** —— 不能只看 wiki 原本怎麼寫就照抄
3. **照格式寫**：§5 的四行答題契約 ＋ 每條約束附 source（檔案 → 函式名）
4. **跑檢查腳本**：壞連結、新增孤島當場抓出來，exit code 非 0 就是沒過
5. **`wiki/log.md` append 一筆**：改了什麼、對照哪一個 commit

完整 checklist 見 `WIKI-SPEC.md` §7。

---

## 改 code 之後

1. 跑 build 確認過
2. 用 `sources` 欄位反查受影響的 wiki 頁
3. 更新內容 ＋ `updated` ＋ `source_commit`
4. 動到對外 API 就跑 `scripts/api-diff.js` 確認增減
5. `wiki/log.md` append 一筆

---

## 🔴 紅線（所有 AI 通用）

- ❌ **不准改 `wiki/raw/`** —— 那是唯讀素材
- ❌ **不准刪 `wiki/log.md` 既有條目** —— 只能 append
- ❌ **不准在沒查 code 的情況下寫事實** —— 不確定就標 `⚠️ 待確認` 或 `TODO`，絕不編造
- ❌ **不准用舊 checkout 當基準**
- ❌ **不准把 wiki 的說法當成驗證通過** —— wiki 可能過期，以 header 為準
- ❌ **一次改動超過 15 個檔案要先停下討論**
- ❌ **破壞性操作**（刪檔、大量覆寫、結構重組、`git reset`、force push）**前先列清單確認**
- ❌ **commit 與 push 由使用者決定**，不主動執行
- ❌ **token 不准寫進會被 git 追蹤的檔案** —— 走環境變數

---

## 找 code 的常用指令

全部相對於基準 repo：

```bash
# 對外 API
grep -n "^[[:space:]]*int awp_bs_\|^[[:space:]]*void awp_bs_" src/awp_backend_main.h

# 某模組的實作
ls src/implementations/<module>/

# singleton 取 module
grep -rn "awp_bs_context::instance().get_" src/

# error code
grep -rn "AWP_ERR_" src/

# 比對兩版 API 差異
grep -oE "\bawp_bs_[a-z0-9_]+" <舊 header> | sort -u > /tmp/a
grep -oE "\bawp_bs_[a-z0-9_]+" <新 header> | sort -u > /tmp/b
comm -13 /tmp/a /tmp/b   # 新增的
```

---

## 重要路徑

基準 repo `../AWP_Backend/AWP_BACKEND_SYSTEM/` 底下：

| 用途 | 路徑 |
|---|---|
| 對外 API header | `src/awp_backend_main.h` |
| 對外 API 實作 | `src/awp_backend_main.cpp` |
| Interfaces | `src/interface/awp_bs_i*.h` |
| 各模組實作 | `src/implementations/<module>/` |
| 共用 enum / 型別 | `src/awp_common.h` |
| API 手冊 | `src/api_manual.md`（**部分過期，以 header 為準**）|
| 設定檔 | `src/{Machine,Button,Chance}Configuration.yaml` |

---

## 相關

- **wiki 規範**：`WIKI-SPEC.md`
- **Outline 鏡像**：本地 markdown 是正本，Outline 只是給人瀏覽的鏡像，不一致以本地為準
- **參考實作**：`F:/ACD_RD1_Project/SpinningTop/wiki/`、`F:/ACD_RD1_Project/ProjectWiki/sanbi-wiki/`
