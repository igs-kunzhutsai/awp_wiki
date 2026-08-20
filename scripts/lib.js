// 四支腳本共用的走訪與排除規則（WIKI-SPEC.md §2、規則 2）
const fs = require('fs');
const path = require('path');

const WIKI = path.join(__dirname, '..', 'wiki');

/**
 * 三種東西不列入檢查（WIKI-SPEC.md §2）：
 *   raw/          唯讀素材，不進導覽，所以不算孤島
 *   _開頭         範本不是內容
 *   README.md     目錄說明，不是內容頁 —— index.md 列的是實際頁面，不會連目錄說明
 */
function isExcluded(rel) {
  return rel.startsWith('raw/')
      || rel.split('/').some(seg => seg.startsWith('_'))
      || rel.endsWith('README.md');
}

function walk(dir, base) {
  base = base || dir;
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p, base));
    else if (e.isFile() && p.endsWith('.md')) {
      out.push(path.relative(base, p).split(path.sep).join('/'));
    }
  }
  return out;
}

/** 回傳 { all, checked } —— checked 已套用排除規則 */
function pages(root) {
  const all = walk(root || WIKI);
  return { all, checked: all.filter(r => !isExcluded(r)) };
}

/** 嚴格匹配 [[xxx]] 與 [[xxx|顯示]]，排除 POSIX [[:alpha:]] 之類 */
const LINK_RE = /\[\[(?!:)([^\]|:]+?)(?:\|[^\]]+)?\]\]/g;

/** 一個 wikilink 可能指向的候選路徑 */
function candidates(target, fromRel) {
  const dir = path.posix.dirname(fromRel);
  const t = target.trim().replace(/\/$/, '');
  const list = [t, `${dir}/${t}`, `${t}/README`, `${dir}/${t}/README`];
  if (t.startsWith('../') || t.includes('/../')) {
    list.push(path.posix.normalize(`${dir}/${t}`));
  }
  return [...new Set(list)];
}

function read(rel, root) {
  return fs.readFileSync(path.join(root || WIKI, rel), 'utf8');
}

/** 規則 4：發現問題就讓流程失敗，只印訊息不算擋 */
function finish(problemCount, label) {
  if (problemCount > 0) {
    console.error(`\n✗ ${label}：${problemCount} 個問題。exit 1`);
    process.exit(1);
  }
  console.log(`\n✓ ${label}：沒有問題`);
  process.exit(0);
}

module.exports = { WIKI, isExcluded, walk, pages, LINK_RE, candidates, read, finish };
