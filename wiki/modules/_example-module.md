---
type: module
tier: maintained
status: draft
tags: [example, template]
sources: [src/interface/awp_bs_iexample.h, src/implementations/example/]
source_commit: 0000000
owner: TODO
updated: 2026-08-19
---
# Example — 範例模組頁

> **答**：這個模組提供什麼 API？行為如何？有哪些狀態？
> **Source**：`src/interface/awp_bs_iexample.h` / `src/implementations/example/`
> **讀完接著**：[[flow/game-call-sequence]] / [[modules/system-state]]
> **約束**：初始化失敗後所有 API 不可用；金額單位一律 cents

> 本頁行號以 commit `0000000` 為準。行號會隨修改漂移，對不上時改搜函式名。

---

一句話說明這個模組在做什麼。

## 模組職責

- 這個模組負責什麼
- 不負責什麼（劃清邊界，避免之後有人把不相干的東西加進來）

## 對外 API

| API | 用途 | 回傳 |
|---|---|---|
| `awp_bs_example_init()` | 初始化 | 0 成功，非 0 失敗 |
| `awp_bs_example_get_value()` | 取值 | 目前值（cents） |

> **不寫精確簽章**（參數型別、順序）—— 那些會改，以 header 為準。
> 這裡只寫「這個 API 做什麼、什麼情況下會失敗」。

## 約束

**每條後面附 source，讓讀的人能自己核對。附函式名不附行號。**

| # | 約束 | Source |
|---|---|---|
| 1 | 初始化失敗後其餘 API 全不可用 | `example.cpp` → `init()` |
| 2 | 金額單位一律 cents | 全模組 |
| 3 | 未進 ready 狀態呼叫會回錯誤碼，不會 crash | `example.cpp` → `check_state()` |

## 🚨 已知問題

- 描述問題 → 在哪個函式 → 影響什麼

## 相關模組

[[modules/system-state]] / [[flow/game-call-sequence]]
