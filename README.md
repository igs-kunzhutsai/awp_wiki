# AWP Backend Wiki

AWP 團隊知識庫，目標是讓知識找得到、信得過、可追溯；目錄以 LLM Wiki Blueprint 為基礎，並依 AWP 需求合併架構與開發分類。

## 現行入口

- [Wiki 規範](WIKI-SPEC.md)
- [AI Agent 指引](AGENTS.md)
- [Wiki 導覽](wiki/index.md)
- [Outline 發布鏡像](https://outline01.igsgame.com/doc/awp-nZkwSUrVBG)

## 目錄架構

```text
wiki/
├── 00_Rules-and-Decisions/
├── 01_Architecture-and-Development/
├── 02_Projects/
├── 03_Game-Library/
├── 04_Modules/
│   ├── Cocos/
│   └── Unity/
├── 05_Compliance/
├── 06_Markets/
├── 08_Tools/
├── 09_AI-and-Wiki-Agents/
├── 10_Incident-and-Problem-Records/
```

另有 `wiki/raw/` 作為團隊原始資料入口，並鏡像所有正式知識分類；Raw 不直接進正式導覽。

## 知識管線

```text
團隊成員上傳 Raw
        ↓
Wiki Agent 整理到對應正式目錄
        ↓
人工審查
        ↓
同步到 Outline
```

AI 整理後的正式知識由 Agent 與人工審查流程保護。
