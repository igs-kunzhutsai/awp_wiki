---
type: project
tier: maintained
status: draft
tags: [example, template]
sources: [src/MachineConfiguration.yaml]
source_commit: 0000000
owner: TODO
updated: 2026-08-19
---
# Example Project — 設定

> **答**：這個專案的 denom / bet / JP 設定是什麼？各地區差在哪？
> **Source**：`src/MachineConfiguration.yaml`
> **讀完接著**：[[modules/credit-bet-denom]] / [[regions/feature-matrix]]
> **約束**：地區差異寫在下方表格，不另開資料夾

---

## 專案概要

| | |
|---|---|
| 遊戲名稱 | Example |
| 上線地區 | 菲律賓 / 澳門 |
| 用到的模組 | [[modules/credit-bet-denom]]、[[modules/chance-config]]、[[modules/cashout]] |

## 🔴 各地區設定（一列一地區）

**新增地區是加一列，不是開一個資料夾。**

| 地區 | denom | max bet | JP 上限 | 特殊要求 |
|---|---|---|---|---|
| 菲律賓 | 1 / 5 / 25 | 500 | 有 | 需 X 認證 |
| 澳門 | 5 / 10 | 1000 | 無 | — |

跨專案通用的地區規則不寫在這裡，寫在 [[regions/regulation-matrix]]。

## 本專案特有的設定

只寫「換一個專案就不成立」的部分。共用的機制連到 `modules/`，不重複解釋。
