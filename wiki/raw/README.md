# Raw

團隊成員上傳原始資料的入口。Raw 目錄與正式 Wiki 使用相同的知識領域分類；請先選擇正確分類，再依團隊／專案與年月路徑新增內容。

```text
raw/
├── 00_Rules-and-Decisions/
├── 01_Architecture/
├── 02_Projects/
├── 03_Game-Library/
├── 04_Modules/
│   ├── Cocos/
│   └── Unity/
├── 05_Compliance/
├── 06_Markets/
├── 07_Software-Development/
├── 08_Tools/
├── 09_AI-and-Wiki-Agents/
├── 10_Deployment-and-Maintenance/
└── 99_Archive/
```

路徑格式：`raw/<same-domain>/<team-or-project>/YYYY/MM/<raw-file>.md`

每份 Raw 必須遵守根目錄 `WIKI-SPEC.md` 的 YAML 標頭規範。若無法判斷分類，先放 `00_Rules-and-Decisions/` 的待分類資料夾並標記 `⚠️ 待確認`，不要自行建立新分類。

最小可用範例：

```yaml
title: "2026-08-24 美國市場分析會議"
domain: "06_Markets"
engine: "unity"
source_type: "meeting"
source: "original"
owner: "@kunzhu"
captured_at: "2026-08-24"
status: "raw"
```

欄位的詳細定義與正式 Wiki 的 Metadata 範例，請看根目錄 `WIKI-SPEC.md` 的「Raw YAML 欄位定義」與「正式頁面 Metadata 欄位定義」。

Raw 保留原始脈絡，不把推測改寫成結論；Wiki Agent 會將整理結果直接寫入對應的 00–10 正式知識域，不建立 Curated 平行目錄。
