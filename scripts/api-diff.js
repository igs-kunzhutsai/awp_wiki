#!/usr/bin/env node
// 比對兩版 header 的對外 API 增減，取代手寫的變更記錄（WIKI-SPEC.md 規則 5）
//
//   node api-diff.js <舊 header> <新 header>
//   node api-diff.js --selftest
//
// 為什麼要這支：手寫的 API 變更記錄維護不了 —— 實測某份停在三個月前，
// 其後 40 個新 API 一筆沒記，而且沒有人發現。這支一秒就掃得出來。

const fs = require('fs');

const PREFIX = process.env.API_PREFIX || 'awp_bs_';
// 注意：字界要寫成 '\\b' 的字串，不能放進樣板字串 —— 那裡的 \b 是退格字元，regex 會失效
const RE = new RegExp('\\b' + PREFIX + '[a-z0-9_]+', 'g');

if (process.argv.includes('--selftest')) selftest();

const [oldPath, newPath] = process.argv.slice(2);
if (!oldPath || !newPath) {
  console.error('用法：node api-diff.js <舊 header> <新 header>');
  console.error('      node api-diff.js --selftest');
  process.exit(2);
}

const symbols = p => new Set((fs.readFileSync(p, 'utf8').match(RE) || []).sort());

const before = symbols(oldPath);
const after = symbols(newPath);
const added = [...after].filter(s => !before.has(s));
const removed = [...before].filter(s => !after.has(s));

console.log(`舊：${oldPath}  ${before.size} 個 API`);
console.log(`新：${newPath}  ${after.size} 個 API`);

if (added.length) {
  console.log(`\n=== 新增 ${added.length} 個（確認 wiki 有寫到）===`);
  added.forEach(s => console.log(`  + ${s}`));
}
if (removed.length) {
  console.log(`\n=== 移除 ${removed.length} 個（確認 wiki 沒有還在寫）===`);
  removed.forEach(s => console.log(`  - ${s}`));
}
if (!added.length && !removed.length) console.log('\n對外 API 沒有增減。');

console.log('\n把這份輸出貼進 wiki/log.md 的 sync 或 lint 條目。');
// 有差異不算失敗 —— 這支是報告工具，不是關卡
process.exit(0);

function selftest() {
  const os = require('os'), path = require('path');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ad-'));
  const a = path.join(dir, 'a.h'), b = path.join(dir, 'b.h');
  fs.writeFileSync(a, 'int awp_bs_init(); void awp_bs_gone();\n');
  fs.writeFileSync(b, 'int awp_bs_init(); int awp_bs_brand_new(int x);\n');
  const A = symbolsOf(a), B = symbolsOf(b);
  const add = [...B].filter(s => !A.has(s));
  const rm = [...A].filter(s => !B.has(s));
  const ok = add.length === 1 && add[0] === 'awp_bs_brand_new'
          && rm.length === 1 && rm[0] === 'awp_bs_gone';
  console.log(ok
    ? '✓ selftest：正確抓到 1 新增 1 移除'
    : `✗ selftest：實得 新增[${add}] 移除[${rm}]`);
  process.exit(ok ? 0 : 1);

  function symbolsOf(p) {
    return new Set((fs.readFileSync(p, 'utf8').match(RE) || []).sort());
  }
}
