# AWP Backend Wiki

AWP 團隊知識庫，供團隊成員與 AI Agent 查詢、整理與維護。

## 現行入口

- [Wiki 規範](WIKI-SPEC.md)
- [AI Agent 指引](AGENTS.md)
- [Wiki 導覽](wiki/index.md)
- [11 個知識領域與資料管線](WIKI-SPEC.md#3-目錄與-11-個知識領域)

## 新版知識管線

```text
團隊成員上傳 Raw
        ↓
Wiki Agent 整理 Curated
        ↓
Wiki Agent 更新 Outline
        ↓
Git commit / Pull Request
```

- `wiki/raw/`：團隊成員可新增與修正的原始資料。
- `wiki/curated/`：AI 整理後的中間層，人工不可直接修改。
- `wiki/outline/`：AI 產生的目錄與導覽，人工不可直接修改。
- 其餘正式知識頁依 [11 個知識領域](WIKI-SPEC.md#3-目錄與-11-個知識領域) 管理。

## AWP 特別規則

- Module 依引擎分為 `Cocos` 與 `Unity`。
- Project 目錄名稱與 YAML 標頭都必須標示所屬引擎。
- Raw 必須使用外層分類與簡易 YAML 標頭。
- Wiki Agent 每週至少執行一次整理與 Git PR 流程。
- 本地 Markdown 是正本；Outline 是發布鏡像。

既有 Wiki 內容會依遷移計畫逐步對應到新版分類；在遷移完成前，不刪除既有知識頁。
