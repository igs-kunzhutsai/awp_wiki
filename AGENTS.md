# AWP Backend 專案指引

> 本檔是所有 AI agent 的共同真相。Codex 原生讀本檔；Claude 透過 `CLAUDE.md` 的 `@AGENTS.md` 載入。
> **wiki 本身的規範（目錄、frontmatter、規則）在 [`WIKI-SPEC.md`](WIKI-SPEC.md)，本檔不重複。**

## 你的角色

你是 AWP Backend 專案的協作 agent。AWP 是 IGS 機台後台 **C++ SDK**，對外是 **C-style API**（`awp_bs_*` pattern），給遊戲端（Cocos Creator / Unity / Native）整合。

## 🔴 事實基準

**source code 唯一基準：`../AWP_Backend/AWP_BACKEND_SYSTEM/`**

不要用 `../AWP/AWP_BACKEND_SYSTEM-awp_bs_c_style/` —— 那是 2026-05-22 的舊 checkout，比基準少 40 個 API、`game_end` 簽章也不同。wiki 目前多數頁面是對著那份寫的（見下方「wiki 已知落後」）。

---

## ⚡ 第一接觸（任何任務開始前必讀）

依任務類型挑讀，**不要全量載入 wiki**（token 浪費）：

| 任務類型 | 必讀頁 |
|----------|--------|
| 任何事 | `wiki/index.md`（30 秒 mental model + 任務反查表）|
| 第一次接觸 AWP | `wiki/intro.md`（白話從零理解，10 分鐘）|
| 動 code 找 API | `wiki/quick-reference.md`（fact dump，最常 grep）|
| 改某模組 | `wiki/modules/<name>.md` |
| 整合 Cocos | `wiki/integration/ccc-integration.md` |
| 改設定 / yaml | `wiki/modules/setting.md` + `wiki/reference/yaml-config.md` |
| 寫一手 spin code | `wiki/integration/game-call-sequence.md` ⚠️ **已過期，見下方** |

> 目錄結構調整（`integration/` → `flow/`、`reference/` 與 `analysis/` 解散）尚未執行，見 `WIKI-SPEC.md` §9。上表是搬遷前的現況路徑。

---

## 🔴 wiki 已知落後（2026-08-19 實測，尚未修正）

wiki 是對著 5 月舊 checkout 寫的。**動核心流程前必須自己查 header 確認**：

| 項目 | wiki 寫的 | 基準 repo 實際 |
|---|---|---|
| `game_start` | 5 參數 | **6 參數**，新增 `original_bet` |
| 中間步驟 | 無 | **必呼叫 `awp_bs_game_win_determined`**（game_start 後、進 skill game 前，寫 FRAM 防斷電） |
| `game_end` | 12 參數 | **13 參數** |
| 參數名 | `freegame_win` | **`special_game_win`**（語意擴大，含 free game 及 special game） |
| — | — | 新增 `jp_skill_win` |
| API 總數 | 158 | **198**（wiki 漏 40 個，含整組 `awp_bs_handpay_*`、`awp_bs_device_get_*`）|

受影響的頁：`index.md`、`intro.md`、`quick-reference.md`、`integration/game-call-sequence.md` 及另 5 頁仍在寫 `freegame_win`。

---

## 30 秒 Mental Model

- **是什麼**：IGS 機台後台 C++ SDK，對外 C-style API
- **API pattern**：`awp_bs_<module>_<action>`
- **架構**：`awp_bs_context::instance()` singleton 持 interface unique_ptr
- **FSM**：9-state（audit / game_idle / game_play / cashout / handpay / error / lobby / demo / match_me）
- **錢包**：4 種，單位 **cents**；denom 例外是實際值（1/5/10/25）
- **Recovery**：3 類資料（preview / lasthand / chance）
- **Error**：Round-Robin（CLOSABLE 優先）
- **上雲 log**：libcurl + mbedTLS + HMAC（需 `/data/Media/config/hmac_key.dat`）
- **Event callback**：`awp_bs_register_event_callback(cb)`（**不是** `init_event_bridge`！）

---

## ⚠️ Critical Invariants（不可違反）

| # | 約束 | 出處 |
|---|------|------|
| 1 | 所有金額 = **cents**；denom 例外是實際值（1/5/10/25）| 全模組 |
| 2 | ⚠️ **已過期**：原寫 `total_win == maingame + freegame + ingame_jp + jp_win`，但 `freegame_win` 參數已不存在（改 `special_game_win`）。實作只算 3 項且只 LOGW 不 reject | `game_play.cpp` |
| 3 | `skill_win` 沒 skill 遊戲時填**同 total_win**（不是 0）| game_end |
| 4 | Preview key = (game_id, bet, extra_bet, buy_bonus) **全程一致** | recovery |
| 5 | `__awpNativeEventCallback` 必須在 `register_event_callback` **之前**定義 | init |
| 6 | `awp_bs_init` 回非 0 → 其他 API **全不可用** | init |
| 7 | `awp_bs_init` 只做 igslib + system_state；**其他模組在 audit state 內 init** | first-boot-flow |
| 8 | 5/12 起 state 切換用 `*_enter/exit`，**不能直接設 state** | system-state |
| 9 | Cocos 命名空間是 **`igs.awp_bs`**（不是 `jsb.awp_bs`）| ccc-integration |
| 10 | `src/api_manual.md` 部分過期，**以 header 為準** | reference |
| 11 | `awp_bs_init_event_bridge` **API 不存在！**用 `register_event_callback` | init |
| 12 | Chance 檔名是 `chance_buffer_data.bin / chance_slot_info.bin` + `_b` 備份（**不是 `chance_a/b.bin`**）| recovery |

> ⚠️ 這些 invariant 目前沒有標明來源是「code 明確保證」還是「讀 code 推論」。第 2 條就是被寫成前者、實際是後者的例子。引用時請自行回 code 確認。

---

## 🚨 已知 Bug（動 code 前掃過）

- **`awp_bs_recover_commit_hand` 對外 API 內部呼叫被註解掉** — 空殼，遊戲端呼叫無效
- **`error_state::operator_key_down` 整段註解掉** — 錯誤無法手動清除只能等自動
- **`buram_error` 自動 reset 不等使用者確認** — BuRAM 損可能直接抹掉資料
- **`master_password` 唯讀沒在 code 強制**
- **chance_config TPM 解密被 comment out** — production 前要恢復
- **`event_dispatcher` 整段「尚未驗證」** — backend 內沒有實際 emit event
- **`event_log fileburam_healthy_` 是死代碼**（從不設 false）
- **`add_win(bet, win)` 的 `bet` 參數沒被使用**
- **session log 與 schema 不對盤**

> 行號已省略：這些是對著 5 月 checkout 記的，行號在基準 repo 已漂移。用函式名搜尋。

---

## Code Style 摘要

| 範疇 | 規則 |
|------|------|
| 對外 C API | `awp_bs_<module>_<action>` snake_case + `extern "C"` |
| Interface | `awp::i<module>` 純虛擬 |
| Concrete class | `awp::<module>` / `awp::<role>_<module>` |
| Struct | `awp_<purpose>` |
| Enum class | `awp_<purpose>_id` / `awp_<purpose>` |
| Constant | `AWP_<MODULE>_<NAME>` 全大寫 |
| Result | `awp_success` / `awp_error_<reason>` |
| Private field | 結尾加 `_` |
| 檔名 | snake_case |
| Result handling | 一律 `awp_result` enum + LOGE，**不 throw exception** |
| Memory | `unique_ptr` 持有 / raw pointer 借用 |
| Log | `AWP_LOGD/I/W/E` macro（不 printf）|
| 變長資料 | **兩階段 C ABI**（先傳 nullptr 取 size，再開 buffer）|

⚠️ **既有 codebase 已知不一致**（修舊 code 時知道就好，不要追求一致）：header guard 混用 `#pragma once` vs `#ifndef`；namespace 混用；TODO 沒 owner。

---

## 工作流程

### 改 code 後
1. 跑 build 確認過
2. 更新對應 wiki 頁（API 表 / call sequence / 已知問題 / 隱性約束）
3. 依 `WIKI-SPEC.md` §7 的「改 code 之後」checklist 執行

### 改 wiki
規範與流程見 [`WIKI-SPEC.md`](WIKI-SPEC.md)。本檔不重複。

### 新增 module
1. 看 `wiki/conventions/directory-structure.md` 底部 checklist
2. 仿 banker / cashout / chance 的 `<module>_base + <module>_factory + <module>_us` 三件式拆檔
3. 新 wiki 頁依 `WIKI-SPEC.md` §3 判定目錄、§4 填 frontmatter、§5 寫四行答題契約

### 找 source code
```bash
# 對外 API
grep -n "^[[:space:]]*int awp_bs_\|^[[:space:]]*void awp_bs_" src/awp_backend_main.h

# singleton 取 module
grep -rn "awp_bs_context::instance().get_" src/

# TODO
grep -rn "TODO" src/implementations/

# error code
grep -rn "AWP_ERR_" src/
```

---

## 重要檔案路徑

全部相對於基準 repo `../AWP_Backend/AWP_BACKEND_SYSTEM/`：

| 用途 | 路徑 |
|------|------|
| 對外 API header | `src/awp_backend_main.h` |
| 對外 API impl | `src/awp_backend_main.cpp` |
| Interfaces | `src/interface/awp_bs_i*.h` |
| Implementations | `src/implementations/<module>/`（22 個模組）|
| Common enum/types | `src/awp_common.h` |
| Log macro | `src/awp_log_header.h` |
| API 手冊 | `src/api_manual.md`（**部分過期**）|
| 設定檔 | `src/{Machine,Button,Chance}Configuration.yaml` |
| Build | `build/Android.mk` |
| Cocos sample | `ccc_awp_sample/` |

wiki 這側：`wiki/`、`scripts/sync-wiki-to-outline.js`

---

## ❌ 不要做這些

- ❌ **用 `AWP/AWP_BACKEND_SYSTEM-awp_bs_c_style/` 當基準** → 那是 5 月的舊 checkout
- ❌ **直接信 `api_manual.md`**（部分過期）→ 看 header 確認
- ❌ **直接信 wiki 的核心流程頁** → 見上方「wiki 已知落後」，動 spin 流程前查 header
- ❌ **wiki 連結用 Outline URL** → 用 `[[wikilink]]`
- ❌ **hardcode OUTLINE_TOKEN 到 .js** → 用 `process.env.OUTLINE_TOKEN`
- ❌ **對外 C API 回 `std::string` / 拋 exception** → 全部 `extern "C"` + return code
- ❌ **未確認的事實寫進 wiki** → 標 `⚠️ 待確認` 或 `TODO`
- ❌ **改 code 不同步更新 wiki** → wiki 過期成為負債

---

## 部署提醒

- `hmac_key.dat` 必須在主板 `/data/Media/config/`（Network Log）
- `cacert.pem` 必須在主板 `/data/Media/config/`（HTTPS，**不是 `/sdcard/`**）
- 範本 Cocos sample 只支援 Android `arm64-v8a`（無 iOS）
- 編譯產出單一 `libawpbackend.so`

---

## 相關

- **Wiki 規範**：[`WIKI-SPEC.md`](WIKI-SPEC.md)
- **Wiki Git Repo**：https://igsgithub01.igsgame.com/kunzhutsai/awp-wiki
- **Outline 線上 Wiki**：https://outline01.igsgame.com/doc/awp-nZkwSUrVBG（鏡像，正本在本地）
- **參考實作**：`F:/ACD_RD1_Project/ProjectWiki/sanbi-wiki/`、`F:/ACD_RD1_Project/SpinningTop/wiki/`
