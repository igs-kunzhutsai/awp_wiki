---
type: project
tier: maintained
status: draft
tags: [example, template, issues]
sources: []
source_commit: 0000000
owner: TODO
updated: 2026-08-19
---
# Example Project — 踩過的雷

> **答**：這個專案遇過什麼問題？怎麼解的？
> **Source**：現場回報與除錯紀錄
> **讀完接著**：[[projects/_example-project/setup]]
> **約束**：只放這個專案特有的；通用問題請寫進對應 `modules/` 頁的已知問題

---

## 格式

每一條寫四件事：**症狀 → 原因 → 怎麼解 → 怎麼避免再犯**。

只寫「換一個專案就不會遇到」的問題。如果別的專案也會遇到，
那不屬於這裡，該寫進對應模組頁的「已知問題」。

## 範例

### 某地區退票金額對不上

- **症狀**：菲律賓機台退票金額比預期少
- **原因**：該地區 denom 設定與 bet 表不一致
- **解法**：修正 `MachineConfiguration.yaml` 的對應欄位
- **避免**：上線前用 [[regions/regulation-matrix]] 對照一次
