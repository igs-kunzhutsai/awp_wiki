# AWP Wiki Agent 指引

> 所有 AI 的共同入口。現行 Wiki 規範只以 `WIKI-SPEC.md` 為準；Claude 與 Kiro 也從本檔進入。

本 repo 是 AWP 團隊知識庫，不是 source code repo。

## 開工前讀這兩份

1. `WIKI-SPEC.md`：現行 Wiki 唯一規範
2. `wiki/index.md`：目前導覽與任務入口

不要全量載入 wiki，依任務讀取必要頁面。

## Source code 基準

需要核對 AWP 實作時，唯一基準是：

```text
../AWP_Backend/AWP_BACKEND_SYSTEM/
```

涉及 API、參數、enum、常數或實作行為，必須回到 source code 查證；Wiki 可能落後，不可單獨視為驗證結果。

## 知識管線

```text
團隊成員 → wiki/raw/ → Wiki Agent → 對應正式知識域 → Git PR → Outline
```

- 團隊成員可新增與修正 `wiki/raw/`。
- AI 整理後直接寫入 `00_Rules-and-Decisions` 至 `10_Deployment-and-Maintenance` 的對應目錄。
- 不建立 `wiki/curated/` 或 `wiki/outline/` 平行層。
- Module 依 Cocos／Unity 分流；Project 目錄與 Metadata 都必須標示引擎。

## 紅線

- 不准把沒有來源的推測寫成事實；不確定就標 `⚠️ 待確認`。
- 不准把不同市場、引擎或板底的同一知識複製成多份；使用 Metadata 關聯。
- 不准提交密鑰、個資、客戶機密或未授權內容。
- 不准刪 `wiki/log.md` 既有條目，只能 append。
- `99_Archive` 預設不納入 LLM 檢索。
- 不准 force push、刪除 Git 歷史或未經審查直接合併 `main`。
- commit、push、合併與 Outline 發布由使用者決定，不主動執行。
- token 不准寫進 Git 追蹤檔案，必須使用環境變數。
