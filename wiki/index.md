---
type: index
tier: maintained
status: draft
tags: [toc, entry]
sources: []
source_commit: 0000000
owner: TODO
updated: 2026-08-19
---
# AWP Wiki — 導覽

> 這是全站唯一的導覽入口。**所有頁面清單只列在這裡**，子目錄不重複列（`WIKI-SPEC.md` §2）。
> 依任務對照下表決定要展開哪幾頁，**不要全量載入 wiki**。

---

## 30 秒認識 AWP

| 概念 | 一句話 |
|------|--------|
| 是什麼 | IGS 機台後台 C++ SDK，對外是 C-style API |
| API 命名 | `awp_bs_<module>_<action>` |
| 事實基準 | `../AWP_Backend/AWP_BACKEND_SYSTEM/` |
| （待補） | 建庫時填入本專案的核心概念，五到八條 |

> **本頁不自述約束。** 各模組的硬性限制寫在該模組頁，這裡只連過去（規則 3）。
> 摘要頁自己寫一份，必然會跟細節頁漂開。

---

## 任務反查表

| 我要做什麼 | 讀哪頁 |
|-----------|--------|
| 改某個模組 | `modules/<模組名>.md` |
| 寫串接流程 | `flow/<流程名>.md` |
| 查 code 規範 | `conventions/` |
| 查某個決策為什麼這樣定 | `decisions/` |
| 查某地區的功能／法規要求 | `regions/` |
| 查某專案的設定值 | `projects/<專案>/setup.md` |
| 查某專案踩過的雷 | `projects/<專案>/issues.md` |
| 查術語、看不懂的縮寫 | [[glossary]] |
| **查 enum／常數／錯誤碼** | **不要查 wiki，直接 grep 基準 repo**（規則 5）|
| 查函式精確簽章 | 看 header，wiki 不維護簽章 |

---

## 頁面清單

> 建庫時把實際頁面填進來。每個目錄一個小節，一頁一行加一句話說明。

### modules — 有什麼功能

*（尚無內容。範本見 `modules/_example-module.md`）*

### flow — 怎麼用

*（尚無內容）*

### conventions — 寫 code 的規範

*（尚無內容）*

### decisions — 為什麼這樣設計

*（尚無內容）*

### regions — 各地區差異

*（尚無內容）*

### projects — 各專案特有

*（尚無內容。範本見 `projects/_example-project/`）*

---

## 尚未涵蓋的範圍

> 明確寫出「這個 wiki 還沒寫到什麼」，避免有人以為查不到就等於不存在。
> 建庫後每次健檢（`WIKI-SPEC.md` §7 操作四）更新這一節。

*（尚無內容）*

---

## 不在這裡的東西

| 找什麼 | 去哪 |
|---|---|
| 原始素材、匯入文件、舊版 | `raw/`（不列在本頁，見 `raw/README.md`）|
| 法規原文 | 另有專門的法規知識庫 |
| wiki 自己的變更記錄 | [[log]] |
| 結構與規範 | 根目錄 `WIKI-SPEC.md` |
