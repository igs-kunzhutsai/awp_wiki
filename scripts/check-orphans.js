#!/usr/bin/env node
// 找沒有任何頁連進來的孤島。raw/ 與 _example* 不算（WIKI-SPEC.md 規則 2）
const L = require('./lib');

if (process.argv.includes('--selftest')) return selftest();

const { all, checked } = L.pages();
const ENTRY = 'index';          // 導覽入口本身不需要被連

const incoming = {};
checked.forEach(r => { incoming[r.replace(/\.md$/, '')] = []; });

for (const rel of checked) {
  const from = rel.replace(/\.md$/, '');
  for (const m of L.read(rel).matchAll(L.LINK_RE)) {
    for (const c of L.candidates(m[1], from)) {
      if (c in incoming && !incoming[c].includes(from)) { incoming[c].push(from); break; }
    }
  }
}

const orphans = Object.keys(incoming).filter(p => p !== ENTRY && incoming[p].length === 0).sort();

console.log(`檢查 ${checked.length} 頁（另有 ${all.length - checked.length} 頁排除：raw/ 與 _example*）`);
if (orphans.length) {
  console.log('\n--- 沒有任何頁連進來 ---');
  orphans.forEach(p => console.log(`  ${p}.md`));
  console.log('\n每一頁都該從 index.md 走得到。要嘛加進 index，要嘛它其實屬於 raw/。');
}
L.finish(orphans.length, '孤島檢查');

function selftest() {
  const fs = require('fs'), os = require('os'), path = require('path');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'or-'));
  fs.writeFileSync(path.join(dir, 'index.md'), '[[a]]\n');
  fs.writeFileSync(path.join(dir, 'a.md'), 'linked\n');
  fs.writeFileSync(path.join(dir, 'lonely.md'), 'nobody links me\n');
  fs.writeFileSync(path.join(dir, '_example-x.md'), 'template, should be skipped\n');
  fs.mkdirSync(path.join(dir, 'raw'));
  fs.writeFileSync(path.join(dir, 'raw', 'r.md'), 'raw, should be skipped\n');

  const { all, checked } = L.pages(dir);
  const inc = {};
  checked.forEach(r => { inc[r.replace(/\.md$/, '')] = []; });
  for (const rel of checked) {
    const from = rel.replace(/\.md$/, '');
    for (const m of L.read(rel, dir).matchAll(L.LINK_RE)) {
      for (const c of L.candidates(m[1], from)) {
        if (c in inc) { inc[c].push(from); break; }
      }
    }
  }
  const orph = Object.keys(inc).filter(p => p !== 'index' && inc[p].length === 0);
  const ok = orph.length === 1 && orph[0] === 'lonely' && checked.length === 3;
  console.log(ok
    ? '✓ selftest：抓到 lonely，raw/ 與 _example* 正確排除，index 不算孤島'
    : `✗ selftest：預期只有 lonely／共 3 頁，實得 [${orph}]／${checked.length}`);
  process.exit(ok ? 0 : 1);
}
