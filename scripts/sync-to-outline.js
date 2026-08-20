#!/usr/bin/env node
// 把 wiki/ 推到 Outline。raw/ 不推（WIKI-SPEC.md §1）
//
//   OUTLINE_TOKEN=xxx node sync-to-outline.js
//   node sync-to-outline.js --dry-run
//
// 🔴 規則 4：任何一頁沒有對映就 exit 1。
// 舊版對查不到對映的頁只印一行 SKIP 然後照樣印 Done、exit 0，
// 導致整棵目錄從沒推上 Outline，而且沒有人發現。不要把這條改回去。

const fs = require('fs');
const path = require('path');
const L = require('./lib');

const DRY = process.argv.includes('--dry-run');
const MAP_FILE = path.join(__dirname, 'url-map.json');   // { "相對路徑（不含 .md）": "outline urlId" }

const { all, checked } = L.pages();
const target = checked;          // 已排除 raw/ 與 _example*

if (!fs.existsSync(MAP_FILE)) {
  console.error(`✗ 找不到 ${MAP_FILE}`);
  console.error('  這份檔案記錄「wiki 路徑 → Outline 文件 id」的對映，需要先建立。');
  process.exit(1);
}
const map = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));

const unmapped = target.filter(r => !(r.replace(/\.md$/, '') in map));

console.log(`要推送 ${target.length} 頁（另有 ${all.length - target.length} 頁不推：raw/ 與 _example*）`);

if (unmapped.length) {
  console.error(`\n✗ ${unmapped.length} 頁沒有 Outline 對映：`);
  unmapped.forEach(r => console.error(`  ${r}`));
  console.error('\n先在 Outline 建立對應文件並補進 url-map.json，或確認這些頁本來就不該推。');
  console.error('**不會靜默跳過** —— 那正是先前 40 頁從沒同步卻無人發現的原因。');
  process.exit(1);
}

if (DRY) {
  console.log('\n--dry-run：對映齊全，實際推送請拿掉這個參數。');
  process.exit(0);
}

const TOKEN = process.env.OUTLINE_TOKEN;
if (!TOKEN) {
  console.error('\n✗ 未設定 OUTLINE_TOKEN 環境變數。');
  console.error('  token 不准寫進會被 git 追蹤的檔案。');
  process.exit(1);
}

// TODO(owner): 實際的 Outline API 呼叫。
// 推送每頁時把 [[wikilink]] 轉成 Outline 網址，並在失敗時累計錯誤數，
// 最後用非 0 的 exit code 結束 —— 不要只印訊息。
console.error('\n✗ 尚未實作實際推送。請補上 Outline API 呼叫後移除本段。');
process.exit(1);
