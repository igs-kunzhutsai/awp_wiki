# AWP Wiki 規範

> **狀態：草案，待團隊確認**
> 建立日期：2026-08-19
> 確認後本文件即為 wiki 的規則。`AGENTS.md` 引用本文件，不重複其內容。

---

## 1. 這個 wiki 是什麼

**AWP Wiki 是 AWP Backend SDK 的程式碼知識庫，主要讀者是 AI agent。**

它回答的是：**這個 SDK 怎麼用、為什麼這樣設計、有什麼不能踩的雷。**

事實基準是 `../AWP_Backend/AWP_BACKEND_SYSTEM/`。所有陳述都必須能回到那份 source code 驗證。

### 維護什麼

- AWP backend 各模組的對外契約與行為
- 遊戲端串接 AWP 的完整流程
- 寫 AWP code 的規範
- 架構決策的理由
- 踩過的雷、隱性約束

### 不維護什麼（但仍收在 `raw/`）

以下內容**還在 repo 裡、查得到**，但我們不負責它的正確性、不隨 code 更新、**不可作為現況依據**：

| 不維護 | 放在 | 要正確答案時去哪 |
|---|---|---|
| 法規原文（GLI / SAS 條款） | `raw/outline/` | 同仁的 compliance 知識庫 |
| 協定與業界通識 | `raw/outline/` | 原始規格書 |
| 遊戲端自己的事（Cocos 編譯、美術、語系） | `raw/outline/` | 遊戲端團隊 |
| 我們自己的舊版文檔 | `raw/legacy/` | 對應的 `modules/` 頁 |
| 精確函式簽章 | — | **看 header**，wiki 不重複維護簽章 |

**「不維護」不等於「不存在」。** 差別在責任：維護區寫錯算 bug，素材區本來就不保證正確。
判準只有一句 —— **AWP 的 code 改了，這頁要不要跟著改？** 要 → 維護區，不用 → `raw/`。

### 品質承諾

- **維護區**（`modules/` `flow/` `conventions/` `decisions/` + 根層頁）：保證跟基準 repo 對得上，對不上算 bug
- **素材區**（`raw/`）：唯讀、不保證正確、不隨 code 更新

### 與 Outline 的關係

本地 markdown 是正本，Outline 是給人瀏覽的鏡像。兩邊不一致以本地為準。`raw/` 不推送 Outline。

---

## 2. 目錄結構

```
awp-wiki-repo/
│
├── WIKI-SPEC.md                  本文件 —— 結構與規範的權威定義
├── AGENTS.md                     專案指引正本，所有 AI 共讀
├── CLAUDE.md                     `@AGENTS.md` ＋ Claude 專屬
├── README.md                     人類入口
├── .kiro/
│   └── steering/project.md       Kiro 入口，指向 AGENTS.md
│
├── wiki/
│   ├── index.md                  唯一導覽入口（30 秒重點 ＋ 任務反查表）
│   ├── glossary.md               術語表
│   ├── log.md                    記 wiki 自己的變化（append-only）
│   │
│   ├── modules/                  有什麼功能（一模組一頁）
│   │   ├── README.md             說明本目錄放什麼
│   │   └── _example-module.md    範例頁
│   │
│   ├── flow/                     怎麼用（跨模組流程）
│   ├── conventions/              寫 code 的規範
│   ├── decisions/                為什麼這樣設計
│   ├── regions/                  跨專案的地區對照表
│   │
│   ├── projects/                 各專案特有（一專案一資料夾）
│   │   ├── README.md
│   │   └── _example-project/     範例專案
│   │       ├── setup.md          設定、bet／denom 表（地區用表格欄位）
│   │       └── issues.md         只有這專案踩過的雷
│   │
│   └── raw/                      原始素材，唯讀，不進 index
│       ├── README.md             raw 自己的入口
│       ├── outline/              從 Outline 匯入的
│       ├── legacy/               我們自己的舊版
│       └── specs/                規格書、會議紀錄
│
└── scripts/
    ├── check-wikilinks.js        掃 [[wikilink]] 是否解得開
    ├── check-orphans.js          找沒人連得到的頁（排除 raw/ 與 _example*）
    ├── api-diff.js               比對兩版 header 的 API 增減
    └── sync-to-outline.js        推送到 Outline（raw/ 不推）
```

**本節是結構的權威定義。** `README.md` 為了讓人在 repo 首頁看得懂，也畫了一份樹；
兩邊不一致時**以本節為準**（規則 3）。改結構時兩份都要改。

**子目錄不列頁面清單。** `wiki/index.md` 是唯一導覽入口 —— 頁面清單只存在一處，避免兩邊各自過期。

子目錄**可以**有 `README.md`，但只寫「這個目錄放什麼、不放什麼、命名怎麼取」——
那是規則，不會過期；**不得列出本目錄有哪些頁**——那是清單，會過期。
`raw/README.md` 是唯一同時兼作入口的例外，因為 `raw/` 不進 index。

### 範例檔命名

以底線開頭的檔案或資料夾（`_example-module.md`、`_example-project/`）是**範本，不是內容**。

- 新增頁面時複製它改，不要從零寫
- 不列進 `index.md`
- 檢查孤島時比照 `raw/` 排除

### 各目錄放什麼

| 目錄 | 放 | 不放 |
|---|---|---|
| `modules/` | 一個 code 模組一頁：對外 API、行為、狀態、已知問題 | 跨模組的流程、精確簽章 |
| `flow/` | 一件事從頭做到尾的步驟，跨模組 | 單一模組的內部細節 |
| `conventions/` | 命名、code style、目錄結構 | 為什麼選這個規範（→ `decisions/`） |
| `decisions/` | 架構決策：選了什麼、拒絕了什麼、為什麼 | 怎麼做（→ `flow/`） |
| `regions/` | 跨專案的地區差異對照表（功能需求、法規要求） | 單一專案的地區設定（→ `projects/`） |
| `projects/` | 一專案一目錄：該專案的設定、bet 表、踩過的雷 | 換個專案還成立的知識（→ 共用區） |
| `raw/` | 匯入的既有文件、舊版、規格書、會議紀錄 | 任何我們要維護的內容 |

### 🔴 地區是欄位，不是目錄

同一個專案會有多個地區版本。**地區差異多半是「同一件事的不同值」**（denom、max bet、JP 上限、功能開關），
那是表格資料不是文件。寫成 `projects/<遊戲>/setup.md` 裡的一張表，一列一地區：

| 地區 | denom | max bet | JP 上限 | 特殊要求 |
|---|---|---|---|---|
| 菲律賓 | 1 / 5 / 25 | 500 | 有 | 需 X 認證 |
| 澳門 | 5 / 10 | 1000 | 無 | — |

**不要開 `projects/<遊戲>/<地區>/`** —— 那會變成笛卡爾積，新增一個地區要開 N 個目錄，
而且每個目錄有 90% 內容相同，改共同部分要改 N 份。新增地區應該是**加一列**。

### 根層三頁的分工

| 檔案 | 角色 |
|---|---|
| `index.md` | **唯一導覽入口**。30 秒重點、任務反查表、指向各模組頁 |
| `glossary.md` | 術語縮寫表 |
| `log.md` | 記 **wiki 自己**的變化（誰、何時、改了什麼、對照哪個 commit）|

> **沒有 `intro.md`、`quick-reference.md`、`changelog.md`。**
>
> - `quick-reference` 整頁是 enum、常數、錯誤碼 —— **會過期，而且 grep 一下就有**，違反規則 5
> - `intro` 的內容（AWP 是什麼、一手 spin、9 個 state、4 種錢包、開機流程）
>   每一段都有更好的歸屬，留著只會變成第二份會漂移的說法
> - `changelog` 手寫維護不了（實測停在 2026-05-12，其後 40 個新 API 一筆沒記），
>   改用 `scripts/api-diff.js` 比對兩版 header 產生
>
> 這三項的內容分別歸到 `index.md`、`flow/`、各 `modules/` 頁與 `conventions/`。

### `raw/` 內部

```
raw/
├── README.md       自己的目錄（index.md 不列 raw）
├── outline/        從 Outline 匯入的
├── legacy/         我們自己的舊版
└── specs/          規格書、會議紀錄
```

---

## 3. 新增一頁時，該放哪

依序問：

1. **AWP code 改了，這頁要不要跟著改？**
   - 不用 → `raw/`，結束
2. **換一個專案還成立嗎？**
   - 不成立 → `projects/<專案>/`，結束
3. **是跨專案的地區規則嗎？**（各地區功能需求、法規對照）
   - 是 → `regions/`，結束
4. **剩下的是共用知識，看它在講什麼：**
   - 單一模組 → `modules/`
   - 跨模組流程 → `flow/`
   - 該怎麼寫 → `conventions/`
   - 為什麼這樣設計 → `decisions/`

判不出來 → 先放 `raw/`，不要放進維護區。

---

## 4. Frontmatter 規格

### 維護區

```yaml
---
type: module | flow | convention | decision
tier: maintained
status: draft | stable | deprecated
tags: [core, recovery, ...]
sources: [src/interface/awp_bs_irecovery.h, src/awp_backend_main.h:401-451]
source_commit: a1b2c3d          # 行號的取證基準
owner: <負責人>
updated: 2026-08-19
---
```

### 素材區

```yaml
---
type: raw
tier: raw
status: imported
source_url: https://outline01.igsgame.com/doc/xxx
imported_at: 2026-05-26
---
```

素材區每頁開頭必須有：

```markdown
> ⚠️ 原始素材，唯讀。不隨 code 更新、不保證正確。
> 需要現況請看 [[modules/xxx]]，需要原文請回查來源。
```

匯入腳本自動加，不靠人記得。

---

## 5. 頁面寫法（維護區）

標題後緊接四行答題契約：

```markdown
# Recovery — 斷電還原

> **答**：三類資料怎麼讀寫？commit_hand 流程？key 規則？
> **Source**：`src/interface/awp_bs_irecovery.h` / `src/implementations/recovery/`
> **讀完接著**：[[flow/game-call-sequence]] / [[modules/system-state]]
> **約束**：preview key 全程一致；get_preview 回空字串 = 讀檔失敗
```

用途：agent 掃這四行就能決定要不要展開全文，省 token。**這是本 wiki 的核心設計，不得省略。**

接著寫「本頁行號以 commit `xxxxxxx` 為準，對不上時改搜函式名」。

### 🔴 每條事實附 source 參考

頁層級的 `sources:` 不夠。**每條約束、每個行為描述，後面附上它出自哪個檔案的哪個函式**，
讓讀的人可以自己核對，不必相信 wiki。

```markdown
| # | 約束 | Source |
|---|------|--------|
| 2 | `total_win` 對不上不會 reject，只印警告 | `game_play.cpp` → `check_win_total()` |
```

**附函式名，不附行號。** 行號會漂，函式名相對穩定；頁層級已經 pin 了 commit，
需要精確位置時用那個 commit 加函式名去搜。

這條取代了「標記事實是 code 保證還是文件推論」那種做法 ——
標記本身也會過期，而**過期的標記比沒有標記更危險**（讀的人會直接相信它）。
附 source 則不會騙人：過期了，讀的人一核對就發現。

其餘：繁體中文為主，技術名詞保留英文；程式碼片段優先於抽象描述且附路徑；內部連結用 `[[wikilink]]`。

---

## 6. 規則

以下四條各自對應一次實際事故，違反過就會再犯。

### 規則 1 — 基準 repo 寫死在規範裡

事實基準是 `../AWP_Backend/AWP_BACKEND_SYSTEM/`。所有 `sources` 路徑指向這裡。

> **事故**：wiki 對著 `AWP/AWP_BACKEND_SYSTEM-awp_bs_c_style/`（5 月的舊 checkout）寫了三個月，漏 40 個 API、`game_end` 簽章從 12 參數變 13 沒人知道。

### 規則 2 — `raw/` 唯讀，不進 index

素材只被引用，不被編輯。檢查孤島時排除 `raw/`。`index.md` 不列 `raw/`。

> **事故**：117 / 194 頁被判定為孤島，其中約 100 頁其實是素材被誤當成該維護的知識。

### 規則 3 — 事實以模組頁為準，摘要頁只能引用

`index.md` 不得自述約束，只能連到 `modules/` 對應頁。同題舊頁在目錄上標明「不是現況依據」。

> **事故**：`awp_bs_init_event_bridge` 這個不存在的 API，模組頁已改對，但首讀的三頁還是錯的，且 `first-boot-flow.md` 同一份檔案自我矛盾。

### 規則 4 — 檢查腳本必須 exit code 非 0

腳本發現問題要讓流程失敗，不能只印訊息繼續跑。

> **事故**：`sync-wiki-to-outline.js` 對 40 頁印 `SKIP` 後照樣印 `Done`、exit 0，導致整棵 `gli/` 從沒推上 Outline，沒有人發現。

### 規則 5 — 不保存「會過期、又無法自動驗證」的資訊

這條比前四條上位，是判斷「該不該寫進 wiki」的通則。

| 資訊 | 會過期？ | 能自動驗？ | 怎麼處理 |
|---|---|---|---|
| API 更新歷程 | 會 | 能（`api-diff.js`） | **不寫**，用腳本產生 |
| 精確函式簽章 | 會 | 能（看 header） | **不寫**，wiki 只寫行為 |
| 「這條是 code 保證還是文件推論」的標記 | 會 | 不能 | **不寫**，改附 source 讓人核對 |
| 行號 | 會 | 能（pin commit + 搜函式名） | 可寫，但**必須 pin commit** |
| 設計意圖、為什麼這樣做、踩過的雷 | **不會** | 不用 | **這是 wiki 的本體** |

判準：**會過期又驗不了的，寫進去只會變成會騙人的東西。**
能自動驗的交給腳本，不會過期的才是 wiki 該保存的價值。

> **事故**：`changelog.md` 停在 2026-05-12，其後 40 個新 API 一筆沒記，三個月無人發現 ——
> 一份沒人維護的變更記錄，比沒有更糟，因為它會讓人以為「查過了，沒有變更」。

---

## 7. 平常對這個 wiki 會做的四件事

每個操作都有觸發條件與固定步驟。**照步驟走，不要自己發明流程** ——
多人用各自的 AI 動同一個 wiki，沒有共同步驟就會產生多種寫法與多種品質。

---

### 操作一 — 查詢（Query）

**觸發**：任何人問「AWP 的 X 是怎麼運作的」

**步驟**

1. **先讀 `wiki/index.md`** 定位相關頁，**不要全量載入 wiki**
2. 依判斷讀 1–5 頁，不要更多
3. 回答時附 `[[頁面名]]` 當引用來源
4. 涉及具體行為、簽章、數值 → **回基準 repo 查證再答**，不要只根據 wiki 的說法
5. 如果這個回答本身有重用價值，主動問：「要不要存成新頁或補進既有頁？」

**紅線**：wiki 說的不等於驗證通過。wiki 可能落後於 code。

---

### 操作二 — 匯入素材（Ingest）

**觸發**：有一批既有文件、規格書、會議紀錄要進來

**步驟**

1. 讀來源檔案
2. **先停下來對齊，不要直接動手**。要講清楚四件事：
   - 這批在講什麼
   - 3–5 個關鍵重點
   - 打算新增／修改哪些頁
   - 依 §3 判定屬於哪一區
3. **等確認後才執行**
4. 放進 `raw/` 對應子目錄，**每頁加素材警告 banner**（§4）
5. 更新 `raw/README.md`
6. `wiki/log.md` append 一筆

**為什麼要先對齊**：194 頁裡有 117 頁是孤島，就是因為某次匯入沒經過這一關，
一次倒了 125 頁進來。**傾倒的成本是當下省下的十分鐘，代價是往後每個人都找不到東西。**

**紅線**：`raw/` 唯讀，匯入後不修改內容。

---

### 操作三 — 跟 code 同步（Sync）

**觸發**：改完 code，或定期稽核（見操作四）

**步驟**

1. 用各頁的 `sources` 欄位**反查**哪些頁受影響
2. **回基準 repo 查證**，不能只看 wiki 原本怎麼寫就照抄
3. 更新內容 ＋ `updated` ＋ `source_commit`
4. 動到對外 API → 跑 `scripts/api-diff.js` 確認增減
5. 每條新增或修改的約束**附 source**（檔案 → 函式名）
6. 跑 `check-wikilinks.js` 與 `check-orphans.js`
7. `wiki/log.md` append 一筆，寫明對照的是哪個 commit

**新增頁面時額外檢查**

- [ ] 用 §3 流程判定目錄
- [ ] frontmatter 齊全（含 `source_commit`、`owner`）
- [ ] 四行答題契約寫好
- [ ] 加進 `index.md`（`raw/` 與 `_example*` 除外）

---

### 操作四 — 健檢（Lint）

**觸發**：「lint wiki」，或每兩週一次的定期稽核

**做法**：拿一段 commit range（上次稽核到現在）掃 code 變更，回頭檢查 wiki 該不該改。

**產出報告，七項**

| # | 檢查 | 怎麼查 |
|---|---|---|
| 1 | **基準漂移** | `sources` 指的還是基準 repo 嗎？行號對得上 `source_commit` 嗎？ |
| 2 | **API 增減** | `api-diff.js` 比對兩版 header，新增的有沒有寫進 wiki |
| 3 | **矛盾** | 不同頁對同一件事說法衝突 |
| 4 | **過時** | code 已改但對應頁沒動（用 `git log` 對照 `sources` 路徑） |
| 5 | **孤島** | 沒有任何頁連進來（排除 `raw/` 與 `_example*`） |
| 6 | **缺口** | `index.md` 或 `log.md` 提到但沒有對應頁的概念 |
| 7 | **結構建議** | 可以拆分或合併的頁、該補哪些頁 |

**產出後 `log.md` append 一筆**，寫明這次掃的 commit range 與發現數量。

**判斷這個健檢有沒有失效的方法**：問一句「**最近一次有人因為這份報告改變了原本要做的事，是什麼時候？**」
答不出來，就算腳本每次都跑成功、報告每次都印出來，它實際上已經沒有作用了。

---

## 8. 待決議

以下尚未定案，不在本規範約束範圍：

| # | 題目 | 需要誰決定 |
|---|---|---|
| 1 | GLI / SAS 知識誰是 owner（`gli/` 28 頁的去留） | 團隊 + 同仁 |
| 2 | 各目錄的 `owner` 指派 | 團隊 |
| 3 | `awp-legacy/` 21 頁：留著標 deprecated 還是刪除 | 團隊 |
| 4 | 43 頁混合內容（`cocos/` `spec/` `misc/` `ota/`）逐頁分類 | 待確認分類草案 |
| 5 | `modules/` 缺的 6 個模組（`sas` `account` `pw_reset_default` `events` `diag_input` `jp_controller`）何時補 | 團隊 |
| 6 | `projects/` 底下實際要開哪些專案目錄 | 團隊 |

---

## 9. 搬遷對照

本規範確認後的一次性搬遷：

| 現在 | 之後 | 動作 |
|---|---|---|
| `integration/` | `flow/` | 改名 |
| `reference/yaml-config.md` | `modules/setting.md` | 合併 |
| `reference/changelog.md` | — | **刪除**（見規則 5），改用 `scripts/api-diff.js` |
| `reference/api-manual-index.md` | — | 刪除（內容已在 `index.md`） |
| `analysis/codestyle.md` | `conventions/coding-style.md` | 合併，需逐段比對 |
| `analysis/directory.md` | `conventions/directory-structure.md` | 合併，需逐段比對 |
| `analysis/architecture.md` | `index.md` ＋ `conventions/` | 分層與 Pattern 併進規範，總覽併進 index |
| `analysis/awp-backend-overview.md` | `index.md` | 只抽「12 個痛點」到已知問題，其餘刪 |
| `intro.md` | 拆散 | 一手 spin → `flow/`、9 state → `modules/system-state`、4 錢包 → `modules/credit-bet-denom`、開機 → `flow/`、其餘併 `index.md` |
| `quick-reference.md` | 拆散 | ABI 慣例與部署 checklist → `conventions/`、invariants → 各 `modules/` 頁；**enum／常數／錯誤碼不搬，改 grep code**（規則 5）|
| `spec/feature-by-region.md` | `regions/feature-matrix.md` | 移動（已是對照表形狀） |
| `spec/regulation-by-region.md` | `regions/regulation-matrix.md` | 移動（同上） |
| 各子目錄 `README.md`（6 份，共 245 行） | — | **刪除**，內容併進 `index.md`（子目錄不設目錄頁） |
| `sas/` `industry/` | `raw/outline/` | 移動（60 頁） |
| `awp-legacy/` | `raw/legacy/` | 移動（21 頁，待第 8 節第 3 題） |
| `cocos/` `spec/` `misc/` `ota/` | 逐頁分流 | 待第 8 節第 4 題 |

⚠️ 合併的四組（`codestyle` / `directory` / `architecture` / `overview`）**不是複製貼上**——兩份可能講法不一致，需逐段比對，遇衝突回 code 確認。

⚠️ 搬遷會讓 612 條 wikilink 與 155 筆 Outline 對映失效。建議一次搬一個目錄，每次跑一次 checker 對照。
