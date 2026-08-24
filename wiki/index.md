---
type: index
status: approved
updated: 2026-08-24
source: original
---
# AWP Wiki Index

> 目錄架構依 LLM Wiki Architecture Blueprint：11 個知識域＋ `99_Archive`。本頁是導覽，不取代根目錄 `WIKI-SPEC.md`。

## 目錄

| 編號 | 目錄 | 用途 |
| --- | --- | --- |
| 00 | [Rules and Decisions](00_Rules-and-Decisions/README.md) | 規範與決策 |
| 01 | [Architecture](01_Architecture/README.md) | 共用技術架構 |
| 02 | [Projects](02_Projects/README.md) | 實際交付專案 |
| 03 | [Game Library](03_Game-Library/README.md) | 可移植遊戲庫 |
| 04 | [Modules](04_Modules/README.md) | 可重用模組 |
| 05 | [Compliance](05_Compliance/README.md) | 法規與專業分析 |
| 06 | [Markets](06_Markets/README.md) | 市場差異資訊 |
| 07 | [Software Development](07_Software-Development/README.md) | 程式開發與測試 |
| 08 | [Tools](08_Tools/README.md) | 工具與評估 |
| 09 | [AI and Wiki Agents](09_AI-and-Wiki-Agents/README.md) | AI 與 Wiki Agent |
| 10 | [Deployment and Maintenance](10_Deployment-and-Maintenance/README.md) | 上線與維運 |
| 99 | [Archive](99_Archive/README.md) | 停用、過期與歷史內容 |

## 共用入口

- [Glossary](glossary.md)：共用術語（`[[glossary]]`）
- [Wiki Log](log.md)：規則、分類與知識管線的 append-only 變更紀錄（`[[log]]`）

## 資料流

```text
wiki/raw/ → Wiki Agent → 00–10 正式知識域 → Git PR → Outline
```

## 分類提醒

- `wiki/raw/` 與正式目錄使用相同分類；上傳 Raw 時先放入對應的 `00–10` 或 `99_Archive`，04 Modules 再放入 `Cocos/` 或 `Unity/`。
- 一份文件只有一個主要目錄。
- 市場、引擎、板底、來源、畫面、風格與法規使用 YAML 欄位關聯。
- `04_Modules/Cocos/` 與 `04_Modules/Unity/` 不可混放。
- Project 放在 `02_Projects/`，資料夾名稱要含專案與引擎（例如 `PR-M01P-G001-Unity`），必要文件依 `WIKI-SPEC.md` 第 8 節建立。
- `99_Archive/` 預設不納入 LLM 檢索。

## 目錄狀態

舊的平行分類入口已移除；後續新增內容只使用本頁列出的新版目錄與對應 Raw 目錄。
