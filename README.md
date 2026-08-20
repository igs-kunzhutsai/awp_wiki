# AWP Wiki

給 AI agent 使用的 AWP Backend 知識庫。

**所有結構與規範都在 [`WIKI-SPEC.md`](WIKI-SPEC.md)，本檔不重複。**

| 你想知道 | 看 |
|---|---|
| 這個 wiki 涵蓋什麼、不涵蓋什麼 | [`WIKI-SPEC.md`](WIKI-SPEC.md) §1 |
| 目錄結構、各目錄放什麼 | [`WIKI-SPEC.md`](WIKI-SPEC.md) §2 |
| 新的一頁該放哪 | [`WIKI-SPEC.md`](WIKI-SPEC.md) §3 |
| 頁面格式怎麼寫 | [`WIKI-SPEC.md`](WIKI-SPEC.md) §4–5 |
| 有哪些規則 | [`WIKI-SPEC.md`](WIKI-SPEC.md) §6 |
| 平常怎麼操作這個 wiki | [`WIKI-SPEC.md`](WIKI-SPEC.md) §7 |
| AI 開工前該讀什麼 | [`AGENTS.md`](AGENTS.md) |

## 給 AI 的入口

一份正本、三個入口，**不要複製內容到其他檔案** —— 複本會漂移，而且漂移是靜默的。

| 工具 | 讀 |
|---|---|
| Codex | `AGENTS.md`（原生位置，零設定）|
| Claude | `CLAUDE.md` → `@AGENTS.md` |
| Kiro | `.kiro/steering/project.md` → 指向 `AGENTS.md` |

## 目前狀態

本 repo 是**架構範本**：只有規範與目錄骨架，`wiki/` 的內容頁與 `scripts/` 的腳本實作尚未包含。

`WIKI-SPEC.md` §8 列出尚未定案的事項，其中**各目錄的 owner 指派**最關鍵 ——
規範預設「有人負責」，這題沒答案其他規則都是空的。
