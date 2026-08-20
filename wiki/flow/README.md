# flow/ — 遊戲端怎麼用

**一件事從頭做到尾的步驟，跨模組。**

放這裡的判準是：**這個知識屬於任何單一模組嗎？** 不屬於就放這裡。

例如「跑一手 spin」要照順序呼叫多個 API，中間牽動 credit（扣錢）、state（狀態切換）、
recovery（寫 preview）、chance（機率）—— 放進任何一個模組頁都講不完，所以它屬於 `flow/`。

| | |
|---|---|
| **放** | 完整呼叫順序、開機流程、整合步驟、各步驟的前後置條件 |
| **不放** | 單一模組的內部細節（→ `modules/`） |

## 命名

用動作或流程命名：`game-call-sequence.md`、`first-boot-flow.md`、`ccc-integration.md`。

> 本檔只說明「這個目錄放什麼」，不列出頁面清單（`WIKI-SPEC.md` §2）。
