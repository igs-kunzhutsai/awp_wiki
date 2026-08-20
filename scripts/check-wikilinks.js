#!/usr/bin/env node
// 掃全站 [[wikilink]] 是否解得開。發現壞連結 → exit 1（WIKI-SPEC.md 規則 4）
const L = require('./lib');

if (process.argv.includes('--selftest')) return selftest();

const { all, checked } = L.pages();
const exists = new Set(all.map(r => r.replace(/\.md$/, '')));

let total = 0;
const broken = [];

for (const rel of checked) {
  const from = rel.replace(/\.md$/, '');
  for (const m of L.read(rel).matchAll(L.LINK_RE)) {
    total++;
    const target = m[1].trim();
    const cands = L.candidates(target, from);
    if (!cands.some(c => exists.has(c))) {
      broken.push({ file: rel, target, cands });
    }
  }
}

console.log(`檢查 ${checked.length} 頁（另有 ${all.length - checked.length} 頁排除：raw/ 與 _example*）`);
console.log(`連結總數 ${total}，解不開 ${broken.length}`);
if (broken.length) {
  console.log('\n--- 解不開的連結 ---');
  for (const b of broken) {
    console.log(`  ${b.file}: [[${b.target}]]`);
    console.log(`    試過：${b.cands.join(' | ')}`);
  }
}
L.finish(broken.length, '連結檢查');

// 陽性／陰性對照，確認這支腳本真的抓得到問題，而不是永遠回綠
function selftest() {
  const fs = require('fs'), os = require('os'), path = require('path');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wl-'));
  fs.writeFileSync(path.join(dir, 'a.md'), '[[b]] and [[nope]]\n');
  fs.writeFileSync(path.join(dir, 'b.md'), 'ok\n');
  fs.mkdirSync(path.join(dir, 'raw'));
  fs.writeFileSync(path.join(dir, 'raw', 'c.md'), '[[also-nope]]\n');

  const { all, checked } = L.pages(dir);
  const exists = new Set(all.map(r => r.replace(/\.md$/, '')));
  let bad = 0;
  for (const rel of checked) {
    for (const m of L.read(rel, dir).matchAll(L.LINK_RE)) {
      if (!L.candidates(m[1], rel.replace(/\.md$/, '')).some(c => exists.has(c))) bad++;
    }
  }
  const ok = bad === 1 && checked.length === 2;
  console.log(ok
    ? '✓ selftest：抓到 1 個壞連結，raw/ 正確排除'
    : `✗ selftest：預期 1 壞連結／2 頁，實得 ${bad}／${checked.length}`);
  process.exit(ok ? 0 : 1);
}
