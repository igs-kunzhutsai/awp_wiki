# AWP Backend 知識庫（舊版入口，僅供 Git 歷史追溯）

給 AI agent 使用的 AWP Backend 專案知識庫。為 LLM 閱讀而設計的 markdown wiki，自動同步到 Outline。

## 為什麼有這份 Wiki

AWP backend 是 C++ 寫的 IGS 機台後台 SDK（135 個 .cpp / 22 個 interface / 16 個 module / 對外 C API）。專案規模 + 模組多 + 跨平台 → AI agent 第一次接觸要花大量時間理解全貌。

**Wiki 把穩定的事實集中**：架構、模組契約、call sequence、約束、設計決策。AI agent 讀 `wiki/index.md` + 對應 module 頁就能直接寫 code。

## 目錄結構

```
AWP/
├── AWP_BACKEND_SYSTEM-awp_bs_c_style/    ← Backend 主程式碼（已存在）
├── wiki/                                   ← LLM Wiki 主體（41 個 .md）
│   ├── index.md                           ← 主 TOC（從這頁開始讀）
│   ├── intro.md                           ← 「AWP 從零理解」入門頁
│   ├── quick-reference.md                 ← AI fact dump（source path / enum / 常數 / 約束）
│   ├── glossary.md                        ← 名詞表
│   ├── modules/        (16 + landing)     ← 各模組對外契約與行為
│   ├── integration/    (3 + landing)      ← Cocos 整合 / 開機流程 / spin 流程
│   ├── conventions/    (3 + landing)      ← 命名 / coding style / 目錄規範
│   ├── decisions/      (3 + landing)      ← 為何 C-style / state 物件化 / libcurl
│   ├── reference/      (3 + landing)      ← API manual 索引 / changelog / yaml
│   └── analysis/       (3 + landing)      ← 架構 / 目錄 / CodeStyle 實際觀察
├── scripts/                                ← 自動化腳本
│   ├── organize-wiki.js                   ← 從 stages/ 搬到 wiki/
│   ├── sync-to-outline.js                 ← 把 wiki/*.md 推到 Outline
│   ├── fix-urls.js                        ← 修正 Outline URL canonical 形式
│   └── url-map.json                       ← urlId → canonical URL 對照
└── stages/awp-wiki/                       ← 工作日誌（5 個 phase）
```

## 三層資料架構

| 層 | 位置 | 用途 |
|----|------|------|
| **Code** | `AWP_BACKEND_SYSTEM-awp_bs_c_style/src/` | 真實 source（最終 authority） |
| **Wiki** | `wiki/*.md` | LLM / 開發者用結構化知識 |
| **Outline** | https://outline01.igsgame.com/doc/awp-nZkwSUrVBG | 給人類瀏覽的 wiki 鏡像 |

**單一事實流向**：source code → wiki/ → Outline。Wiki 是中間層。

## 第一次接觸怎麼讀

1. `wiki/index.md` — 全站 TOC + 30 秒 mental model + 任務反查表
2. `wiki/intro.md` — 從零理解（30 分鐘讀完能跟人交代 AWP 在做什麼）
3. 對應 module 頁（如 `wiki/modules/init-mainloop.md`）

## 設計原則

- **Wiki 看設計、Code 看細節** — 不重複維護函式簽章
- **`src/api_manual.md` 部分過期** — 以 header（`awp_backend_main.h`）為準
- **AI 友善** — 每頁有 frontmatter 標明「答 / Source / 讀完接著 / 約束」

## 維護

改 wiki：
1. 直接編輯 `wiki/<category>/*.md`
2. 設環境變數 `OUTLINE_TOKEN=ol_api_xxx`
3. 跑 `node scripts/sync-wiki-to-outline.js` 推到 Outline
4. 新增頁面：用 `outline-cli create` 加到 Outline，記得更新 `scripts/url-map.json` + `url-map-reverse.json`

```bash
# Windows
set OUTLINE_TOKEN=ol_api_xxx
node scripts/sync-wiki-to-outline.js

# Linux / Mac
OUTLINE_TOKEN=ol_api_xxx node scripts/sync-wiki-to-outline.js
```

⚠️ **不要把 `OUTLINE_TOKEN` 寫進 code commit** — token 走環境變數。

## 相關
- [Outline Wiki 入口](https://outline01.igsgame.com/doc/awp-nZkwSUrVBG)
- 參考實作：`F:/ACD_RD1_Project/ProjectWiki/sanbi-wiki/`（桑比槍台 wiki，本專案參考此結構）
