---
type: index
tags: [toc, entry]
status: stable
updated: 2026-05-25
---
# AWP Backend — AI Wiki Index

> **現行規則已更新**：請以根目錄 [`WIKI-SPEC.md`](../WIKI-SPEC.md) 為準。新版採用 Raw → Curated → Outline 管線、11 個知識領域，以及 Cocos／Unity Module 分流。現有頁面會依遷移計畫逐步整理，本頁既有內容是知識索引，不是規範來源。

> **此 wiki 主要服務 AI agent**。每頁設計成可獨立被 pull / 拼湊使用。

最後更新：2026-08-24

---

## 30 秒 Mental Model

| 概念 | 一句話 |
|------|--------|
| 是什麼 | IGS 機台後台 **C++ SDK**，對外是 **C-style API** |
| 對外 API pattern | `awp_bs_<module>_<action>` |
| Singleton | `awp_bs_context::instance()` 持 22 個 interface `unique_ptr` |
| FSM | 9-state（5/12 物件化）|
| 錢包 | 4 種，單位 **cents** |
| denom | **實際值**（1/5/10/25），不是 cents |
| Recovery 資料 | 3 類（preview / lasthand / chance）|
| Error | 412 個 flag + Round-Robin（CLOSABLE 優先）|
| 上雲 log | libcurl + mbedTLS + HMAC，需 `hmac_key.dat` 在 `/data/Media/config/` |
| Event 通道 | 全域 `__awpNativeEventCallback` + `awp_bs_init_event_bridge()` |

---

## 第一接觸必讀

### Step 1：理解 AWP 是什麼（**必先讀**，10 分鐘）

📖 **[[intro|AWP 是什麼 — 從零理解]]** ⭐ ⭐ ⭐

白話解釋：AWP 做什麼、為什麼這樣設計、一手 spin 怎麼跑、內部架構、開機流程。**從這頁開始**。

讀完能回答：
- AWP 跟遊戲端怎麼分工？
- 為什麼是 C-style API / 9 state / 4 錢包 / 3 類 recovery？
- 一手 spin 6 步流程
- 內部 22 interface 怎麼組起來
- 接下來該看哪頁

### Step 2：按你的目的看對應頁

| 你要做的事 | 讀這個（≈ 15 分鐘）|
|----------|------------------|
| 動手寫一手 spin code | [[integration/game-call-sequence|Game Call Sequence]] |
| 整合 Cocos / Unity / Native | [[integration/ccc-integration|Cocos 整合]] + [[modules/init-mainloop|Init & Main Loop]] |
| 懂 9 state 細節 | [[modules/system-state|System State]] |
| 處理斷電還原 | [[modules/recovery|Recovery]] + [[integration/first-boot-flow|First Boot Flow]] |
| 動硬體 | [[modules/hardware|Hardware]] |
| 改設定 | [[modules/setting|Setting]] + [[reference/yaml-config|YAML Config]] |
| 算錢 / 4 錢包 / 押注 | [[modules/credit-bet-denom|Credit / Bet / Denom]] |

### 不確定要做什麼？

下面有「任務 → 頁面反查表」、「Critical Invariants」、「Source Code Map」可看。

### 深入閱讀

- 🔍 **[[analysis|專案架構分析]]** — 整體架構 / 目錄結構 / CodeStyle 實際觀察 + 優缺點評論（讀完入門頁後想再深入時看）

### AI 速查專用（人看可能覺得密集）

- [[glossary|Glossary]] — 名詞表（看不懂縮寫時查）
- [[quick-reference|Quick Reference]] — 所有 source path / enum / constant / 約束**速查表**（不適合首讀）

---

## 任務 → 頁面反查

### 開發查詢
| 我要… | 看哪頁 |
|-------|--------|
| 啟動 backend、寫 main loop | [[modules/init-mainloop|Init & Main Loop]] |
| 一手 spin 怎麼呼叫 | [[integration/game-call-sequence|Game Call Sequence]] |
| 開機流程 + 顯示進度 | [[integration/first-boot-flow|First Boot Flow]] + [[modules/system-state|System State]] |
| 斷電還原處理 | [[modules/recovery|Recovery]] + [[modules/system-state|System State]]（needs_recovery）|
| 退分流程 | [[modules/cashout|Cashout]] |
| 算錢 / 4 種錢包 / 押注列表 / denom | [[modules/credit-bet-denom|Credit / Bet / Denom]] |
| 設定值存取 / yaml 欄位 | [[modules/setting|Setting]] + [[reference/yaml-config|YAML Config]] |
| 處理 / 顯示錯誤 | [[modules/error-manager|Error Manager]] |
| 機率 / Level / Boost / JP | [[modules/chance-config|Chance Config]] |
| 整合 Cocos Creator | [[integration/ccc-integration|Cocos Creator 整合]] |
| 上 log 到雲端 / 連線診斷 | [[modules/network-log|Network Log]] |
| 玩家 session 統計 | [[modules/session-tracker|Session Tracker]] |
| 後台頁批次 get/set 設定 | [[modules/protocol|Protocol]]（JSON Protocol）|
| 動硬體（按鈕 / 燈 / 印票 / UART / 觸控 / RTC）| [[modules/hardware|Hardware]] |
| TPM 加解密 / Private Area | [[modules/tpm|TPM]] |
| BuRAM / FileBuRAM 操作 | [[modules/igslib|IGSlib]] |
| Event Log 事件記錄 | [[modules/event-log|Event Log]] |
| QC 驗 BuRAM 完整性 | [[modules/integrity-check|Integrity Check]] |

### 開發任務
| 任務 | 看哪 |
|------|------|
| 新增一個 module（完整流程） | [[conventions/directory-structure|Directory Structure]]（底部 checklist）|
| 改某 module 行為 | 該 module 頁 + interface header（`src/interface/awp_bs_i*.h`）|
| 加新 error code | [[modules/error-manager|Error Manager]] + [[conventions/naming|Naming]] |
| 加新 setting 欄位 | [[modules/setting|Setting]] + [[reference/yaml-config|YAML Config]] |
| 加新 event_type | [[modules/event-log|Event Log]] |
| 加新雲端 log type | [[modules/network-log|Network Log]]（register_log_type）|
| 確認 ABI / 命名規則 | [[conventions/coding-style|Coding Style]] + [[decisions/why-c-style-api|Why C-style API]] |
| 找某 `awp_bs_*` 函數在哪 | [[quick-reference|Quick Reference]]（source map）|

---

## ⚠️ Critical Invariants（容易踩雷）

| # | 約束 | 詳見 |
|---|------|------|
| 1 | 所有金額 = **cents**；denom 例外是實際值（1/5/10/25）| [[modules/credit-bet-denom|Credit / Bet / Denom]] |
| 2 | `total_win == maingame_win + freegame_win + ingame_jp_win + jp_win`，不對 = `game_end` reject | [[integration/game-call-sequence|Game Call Sequence]] |
| 3 | `skill_win` 無 skill 遊戲時填**同 total_win**（不是 0）| 同上 |
| 4 | Preview key = (game_id, bet, extra_bet, buy_bonus)，**全程一致**（write/commit/game_start/end）| [[modules/recovery|Recovery]] |
| 5 | `init_event_bridge` 前**必須先**定義 `__awpNativeEventCallback` 全域 | [[modules/init-mainloop|Init & Main Loop]] |
| 6 | `awp_bs_init` 回非 0 → 其他 API 全不可用 | 同上 |
| 7 | `awp_bs_main_process` 漏呼叫 → 硬體 event / state / timer / error 全停 | 同上 |
| 8 | Lamp API 未進 Play state 回 -4；Counter `get_count` 回 0 | [[modules/hardware|Hardware]] |
| 9 | Network Log 需 `hmac_key.dat` 在 `/data/Media/config/` | [[modules/network-log|Network Log]] |
| 10 | 5/12 起 state 切換用 `*_enter/exit`，**不能直接設 state** | [[modules/system-state|System State]] + [[decisions/state-machine-objectified|Decision]] |
| 11 | `src/api_manual.md` 簽章部分過期，**以 header 為準** | [[reference/api-manual-index|API Manual 索引]] |
| 12 | `game_start / game_end` 真實簽章是 **12 個參數**（manual 寫 9 個過期）| [[integration/game-call-sequence|Game Call Sequence]] |
| 13 | Multi-game `game_id < 0` 自動視為 0 號（single-game 相容）| [[modules/credit-bet-denom|Credit / Bet / Denom]] |
| 14 | `bet / denom / extra / buy_bonus` 在 game_start 與 game_end **必須相同** | [[integration/game-call-sequence|Game Call Sequence]] |
| 15 | Match Me 必須在 game_idle（spin 結束後）才能開始 | [[modules/system-state|System State]] |
| 16 | `get_preview` 回空字串 = 讀檔失敗（不是 = 沒寫過）| [[modules/recovery|Recovery]] |
| 17 | 兩階段 C ABI：先傳 `nullptr` 取 size，再開 `size+1` buffer | [[quick-reference|Quick Reference]] |
| 18 | Demo state 只能從 lobby 進；match_me 自動切回 game_idle | [[modules/system-state|System State]] |

---

## Source Code Map（高層）

```
AWP_BACKEND_SYSTEM-awp_bs_c_style/
├── src/
│   ├── awp_backend_main.h          ← 對外 C API（1060 行）
│   ├── awp_backend_main.cpp        ← 對外實作
│   ├── api_manual.md                ← API 手冊（817 行，部分過期）
│   ├── awp_common.h                 ← 共用 enum / 型別
│   ├── awp_log_header.h             ← Log macro
│   ├── awp_bs_igslib_config.h       ← Platform config
│   ├── interface/                   ← 22 個 awp_bs_i*.h（純虛擬）
│   ├── implementations/             ← 18 個模組目錄
│   ├── *.yaml                       ← Machine / Button / Chance 設定
│   ├── cacert.pem                   ← TLS 根憑證
│   ├── hmac_key.dat                 ← HMAC 簽章金鑰（部署到 /data/Media/config/）
│   ├── IGSlib/  TPMlib/             ← 硬體 / TPM 函式庫
│   └── fw_bin/                      ← MCU 韌體 binary
├── ccc_awp_sample/                  ← Cocos 整合範本
├── prebuilt/                        ← Android / iOS / Linux 編譯產出
├── third_party/                     ← libcurl / mbedTLS / yaml-cpp / nlohmann/json
└── tools/                           ← TPM + pw_reset_decode
```

→ [[quick-reference|Quick Reference]] 有完整 22 interface ↔ implementation 對照

---

## 全站 TOC

### 1. [[modules|Modules]] — 16 個模組

**核心流程**：[Init & Main Loop] / [System State] / [Recovery]
**資產押注**：[Credit / Bet / Denom] / [Cashout] / [Setting] / [Chance Config]
**紀錄監控**：[Event Log] / [Network Log] / [Session Tracker] / [Integrity Check]
**系統週邊**：[Error Manager] / [Hardware] / [TPM] / [IGSlib] / [Protocol]

### 2. [[integration|Integration]] — 3 個整合指南
[Cocos Creator 整合] / [First Boot Flow] / [Game Call Sequence]

### 3. [[conventions|Conventions]] — 3 個規範
[Naming] / [Coding Style] / [Directory Structure]

### 4. [[decisions|Decisions]] — 3 個架構決策
[Why C-style API] / [State Machine 物件化] / [libcurl + mbedTLS]

### 5. [[reference|Reference]] — 3 個規格
[API Manual 索引] / [Changelog] / [YAML Config]

### 6. [[glossary|Glossary]] — 術語表

### ⭐ [[quick-reference|Quick Reference]] — AI fact dump（最常查）

---

## 7. 從 Outline 匯入的補充知識（2026-05-26 補完）

以下分類是從 outline 鏡像回本地的非 codebase 通識 / 規格 / 業界知識（共 117 頁），原本只在 outline 上、本地 wiki 缺。

| 分類 | 內容 | 頁數 | 位置 |
|------|------|------|------|
| **industry** | 業界通識：💡 老虎機小知識、GLI-11/12 中英對照、SAS 6.03、IGT Casino、GSA、AFT、Progressive | 14 + 5 章 | [[industry/README]] |
| **sas** | SAS 6.02 通訊協定全章（Section 1-17）+ GDK 串接 + Dual Port / Serial Port / 斷電開門 | 22 | [[sas/README]] |
| ↳ sas/scenarios | 各 Section 專有機制情境說明（Section 3/10/12/13/14/15/16/17 + AFT Lock-Transfer-Confirm）| 10 | [[sas/scenarios/README]] |
| ↳ sas/implementation | Host Sim / 實作項目 / 待完成清單 / 各章時程 | 4 | [[sas/implementation/README]] |
| **spec** | 各地區功能需求 / 法規對照 / 機台狀態流程 / 設定頁規格 / 企劃規格 / Events API / yaml | 10 | [[spec/README]] |
| **awp-legacy** | 4 月舊版 AWP 模組文檔（Recovery / 狀態機 / Per-Game Bet/Denom / JSON Protocol / Setting / TPM / PIO / OTA / FRAM ...）| 20 | [[awp-legacy/README]] |
| **cocos** | Cocos / Unity / MAUI 整合、Client/Native/Server 三層、效能優化 | 10 + 6 | [[cocos/README]] |
| **ota** | OTA 系統（API / 前後端 / 模組 / 遊戲端實作）| 4 | [[ota/README]] |
| **analysis (擴充)** | + AWP Backend 架構分析白話版 / 專案架構分析 landing | +5 | [[analysis/README]] |
| **misc** | EpicLink / 菲律賓Casino / 專利 / 著作權 / 錯誤列表 / PR版本 | 7 | [[misc/README]] |

### 關於 GLI 兩個目錄

- **[[industry/gli-11/README|industry/gli-11/]]** — GLI-11 五章**中英對照原文**（已有完整內容，從 outline 匯入）
- **[[gli/index|gli/]]** — GLI 條款 → **AWP 對應映射骨架**（24 頁 stub，待 awp-gli-expert agent 填）

兩者互補：前者問「GLI 條款是什麼」，後者問「AWP 代碼如何對應 / 符合 GLI」。

---

## Wiki 與 Code 分工

- **Wiki**：設計意圖 / 行為契約 / call sequence / 約束 / 易踩雷
- **Code**：精確簽章 / 欄位 / 實作細節 / 行號

兩邊都要看。Wiki 告訴你「要做什麼」+「不能做什麼」，Code 告訴你「怎麼做才不踩雷」。

---

## 給 AI 的 Workflow 建議

### 開新對話 / 第一接觸
1. 讀 [Index]（本頁）+ [Glossary] + [Quick Reference] ≈ 5 分鐘
2. 視任務查上方反查表
3. 開對應 module 頁深入

### 拿到 user 問題
1. 任務反查表找對應頁
2. 該頁的 frontmatter `> 答` 確認是否切題
3. 對應 source path 直接 grep / read 確認

### 寫 code 前
1. 對應 module 頁的 API 表 + call sequence
2. [Quick Reference] 約束清單對齊
3. Read `src/awp_backend_main.h` + 對應 `src/interface/awp_bs_i*.h` 確認最新簽章
4. 不確定就**以 header 為準**，不要信 api_manual.md

### 寫完 code
1. 對照 [Coding Style] 規範
2. 確認 ABI 模式正確（兩階段 / extern C / return code）
3. 如果動到任何 module 對外行為 → 更新對應 wiki 頁 + api_manual.md

---

## 不確定 / 找不到時

| 找不到什麼 | 去哪 |
|-----------|------|
| 某 `awp_bs_*` function | `src/awp_backend_main.h` grep |
| 某 module 在哪實作 | [[quick-reference|Quick Reference]] source map |
| 某 enum 值 | [[quick-reference|Quick Reference]] enums section |
| 某 yaml 欄位 | [[reference/yaml-config|YAML Config]] + `MachineConfiguration.yaml` |
| 為何這樣設計 | [[decisions|Decisions]] |
| 何時加的某 API | [[reference/changelog|Changelog]] |
