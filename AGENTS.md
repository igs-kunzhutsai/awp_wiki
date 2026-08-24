# AWP Wiki Agent 指引

> 所有 AI 的共同入口。規範只以 `WIKI-SPEC.md` 為準；Claude 與 Kiro 也從本檔進入。

本 repo 是 AWP 團隊知識庫，不是 source code repo。

---

## 開工前讀這兩份

| 檔案 | 給你什麼 |
|---|---|
| **`WIKI-SPEC.md`** | 現行 Wiki 唯一規範 |
| **`wiki/index.md`** | 目前導覽與任務入口 |

不要全量載入 wiki，依任務讀取必要頁面。

---

## Source code 基準

**source code 唯一基準：`../AWP_Backend/AWP_BACKEND_SYSTEM/`**

機器上可能同時存在多份 AWP checkout，長得幾乎一樣，**只有路徑分得出來**。
任何要引用 source code 的工作，第一件事是確認你讀的是上面那份。

**wiki 可能落後於基準 —— wiki 這樣寫，不等於驗證通過。**
涉及簽章、參數、enum、常數時，直接 grep header，不要只信 wiki。

---

## 知識管線

```text
團隊成員 → wiki/raw/ → Wiki Agent → wiki/curated/ → wiki/outline/ → Git PR
```

- 團隊成員可新增與修正 `wiki/raw/`。
- `wiki/curated/` 與 `wiki/outline/` 是 AI 產物，人工不可直接修改。
- 發現 AI 整理錯誤時，回 Raw 修正來源後重新產生。
- Module 依 Cocos／Unity 分流；Project 目錄與 YAML 標頭都必須標示引擎。

## 紅線

- 不准把沒有來源的推測寫成事實；不確定就標 `⚠️ 待確認`
- 不准直接修改 `wiki/curated/` 或 `wiki/outline/`
- 不准提交密鑰、個資、客戶機密或未授權內容
- 不准刪 `wiki/log.md` 既有條目，只能 append
- **一次改動超過 15 個檔案要先停下討論**
- **破壞性操作前先列清單確認**（刪檔、大量覆寫、結構重組、`git reset`、force push）
- commit、push、合併與 Outline 發布由使用者決定，不主動執行
- token 不准寫進會被 git 追蹤的檔案，必須使用環境變數

---

本地 markdown 是正本，Outline 只是給人瀏覽的鏡像，不一致以本地為準。
