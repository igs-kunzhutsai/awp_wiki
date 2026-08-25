# AWP Wiki Agent 指引

> 所有 AI 的共同入口。現行 Wiki 規範只以 `WIKI-SPEC.md` 為準；Claude 與 Kiro 也從本檔進入。

本 repo 是 AWP 團隊知識庫，不是 source code repo。

## 開工前讀這兩份

1. `WIKI-SPEC.md`：現行 Wiki 唯一規範
2. `wiki/index.md`：目前導覽與任務入口

不要全量載入 wiki，依任務讀取必要頁面。

## 知識管線

```text
團隊成員 → wiki/raw/ → Wiki Agent → 對應正式知識域 → 人工審查 → Outline
```

- 團隊成員可新增與修正 `wiki/raw/`。
- AI 整理後直接寫入對應的正式知識域；問題與事件紀錄寫入 `10_Incident-and-Problem-Records`。
- `ingest`、`query`、`lint` 必須依 `WIKI-SPEC.md` 第 10 節執行。
- Module 依 Cocos／Unity 分流；Project 目錄與 YAML 欄位都必須標示引擎。

## 紅線

- 不准把沒有來源的推測寫成事實；不確定就標 `⚠️ 待確認`。
- 不准把不同市場、引擎或板底的同一知識複製成多份；使用 YAML 欄位關聯。
- 不准提交密鑰、個資、客戶機密或未授權內容。
- 圖片與附件必須保存到 Repo 並使用相對路徑；不可只依賴外部網址。
- 不准刪 `wiki/log.md` 既有條目，只能 append。
- 不准 force push、刪除 Git 歷史或未經審查直接合併 `main`。
- commit、push、合併與 Outline 發布由使用者決定，不主動執行。
- token 不准寫進 Git 追蹤檔案，必須使用環境變數。
