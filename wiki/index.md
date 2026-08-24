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
| 00 | [Governance](00_Governance/README.md) | 治理與規範 |
| 01 | [Architecture](01_Architecture/README.md) | 共用技術架構 |
| 02 | [Projects](02_Projects/README.md) | 實際交付專案 |
| 03 | [Game Library](03_Game-Library/README.md) | 可移植遊戲庫 |
| 04 | [Modules](04_Modules/README.md) | 可重用模組 |
| 05 | [Compliance](05_Compliance/README.md) | 法規與專業分析 |
| 06 | [Markets](06_Markets/README.md) | 市場差異資訊 |
| 07 | [Engineering](07_Engineering/README.md) | 工程方法 |
| 08 | [Tools](08_Tools/README.md) | 工具與評估 |
| 09 | [AI Knowledge](09_AI-Knowledge/README.md) | LLM 專用知識 |
| 10 | [Operations](10_Operations/README.md) | 維運知識 |
| 99 | [Archive](99_Archive/README.md) | 停用、過期與歷史內容 |

## 資料流

```text
wiki/raw/ → Wiki Agent → 00–10 正式知識域 → Git PR → Outline
```

## 分類提醒

- 一份文件只有一個主要目錄。
- 市場、引擎、板底、來源、畫面、風格與法規使用 Metadata 關聯。
- `04_Modules/Cocos/` 與 `04_Modules/Unity/` 不可混放。
- Project 放在 `02_Projects/`，必要文件依 `WIKI-SPEC.md` 第 8 節建立。
- `99_Archive/` 預設不納入 LLM 檢索。

## 遷移狀態

既有 `wiki/modules/`、`wiki/sas/`、`wiki/gli/` 等頁面仍保留，待分類與連結遷移完成後，歸入新版目錄或 `99_Archive/`。它們不再定義新的目錄規則。
