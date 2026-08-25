# Raw

團隊成員上傳原始資料的入口。Raw 目錄與正式 Wiki 使用相同的知識領域分類；請先選擇正確分類，再依團隊／專案與年月路徑新增內容。

```text
raw/
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

路徑格式：`raw/<same-domain>/<team-or-project>/YYYY/MM/<raw-file>.md`

圖片與附件放在同一層的 `assets/` 目錄，例如：

```text
raw/01_Architecture-and-Development/M02/2026/08/
├── m02-packaging-process-outline.md
└── assets/
    ├── 01-resource-output-folder.png
    └── 02-package-source-folder.png
```

圖片不可只貼外部網址；匯入時要保存到 Repo，並在 Markdown 使用相對路徑引用。若圖片含有密鑰、個資或客戶機密，先遮蔽後再上傳。

每份 Raw 必須遵守根目錄 `WIKI-SPEC.md` 的 YAML 標頭規範。若無法判斷分類，先放 `00_Rules-and-Decisions/` 的待分類資料夾並標記 `⚠️ 待確認`，不要自行建立新分類。

最小可用範例：

```yaml
title: "2026-08-24 美國市場分析會議"
domain: "06_Markets"
type: "meeting"
status: "raw"
owner: "@kunzhu"
updated: "2026-08-24"
engine: "unity"
markets: [US]
board: []
compliance: []
```

欄位的詳細定義與 Raw、正式 Wiki 共用的 YAML 範例，請看根目錄 `WIKI-SPEC.md` 的「共用 YAML 欄位定義」。

Raw 保留原始脈絡，不把推測改寫成結論；Wiki Agent 會將整理結果直接寫入對應的正式知識域。
