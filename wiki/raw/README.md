# Raw

團隊成員上傳原始資料的入口。Raw 目錄與正式 Wiki 使用相同的知識領域分類；請先選擇正確分類，再依團隊／專案與年月路徑新增內容。

```text
raw/
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

路徑格式：`raw/<same-domain>/<team-or-project>/YYYY/MM/<raw-file>.md`

每份 Raw 必須遵守根目錄 `WIKI-SPEC.md` 的 YAML 標頭規範。若無法判斷分類，先放 `00_Governance/` 的待分類資料夾並標記 `⚠️ 待確認`，不要自行建立新分類。

Raw 保留原始脈絡，不把推測改寫成結論；Wiki Agent 會將整理結果直接寫入對應的 00–10 正式知識域，不建立 Curated 平行目錄。
