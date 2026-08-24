# AWP Backend Wiki

AWP 團隊知識庫，目標是讓知識找得到、信得過、可追溯，並與 LLM Wiki Blueprint 採用相同的目錄架構。

## 現行入口

- [Wiki 規範](WIKI-SPEC.md)
- [AI Agent 指引](AGENTS.md)
- [Wiki 導覽](wiki/index.md)
- [Outline 發布鏡像](https://outline01.igsgame.com/doc/awp-nZkwSUrVBG)

## 目錄架構

```text
wiki/
├── 00_Governance/
├── 01_Architecture/
├── 02_Projects/
├── 03_Game-Library/
├── 04_Modules/
│   ├── Cocos/
│   └── Unity/
├── 05_Compliance/
├── 06_Markets/
├── 07_Engineering/
├── 08_Tools/
├── 09_AI-Knowledge/
├── 10_Operations/
└── 99_Archive/
```

另有 `wiki/raw/` 作為團隊原始資料入口，並完整鏡像 `00–10` 與 `99_Archive` 分類；Raw 不直接進正式導覽。

## 知識管線

```text
團隊成員上傳 Raw
        ↓
Wiki Agent 整理到對應正式目錄
        ↓
Git PR 審查
        ↓
同步到 Outline
```

AI 整理後的正式知識由 Agent 與 PR 流程保護，不建立獨立的 `curated/` 或 `outline/` 平行目錄。
