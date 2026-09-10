// out/ 정적 산출물의 내부 링크가 실제 파일로 해석되는지 검사
const fs = require('fs'), path = require('path');
const OUT = path.resolve('out');
const norm = p => '/' + path.relative(OUT, p).split(path.sep).join('/');

const files = [];
const exists = new Set();
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else {
      exists.add(norm(p));
      if (e.name.endsWith('.html')) files.push(p);
    }
  }
})(OUT);

function resolves(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return exists.has('/index.html');
  const bare = clean.replace(/\/$/, '');
  return exists.has(clean) || exists.has(bare + '.html') || exists.has(bare + '/index.html');
}

const broken = new Map();
let total = 0;
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const page = norm(f);
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1];
    if (/^\/(_next|.*\.(css|js|svg|png|ico|xml|txt|json|webmanifest))/.test(href)) continue;
    total++;
    if (!resolves(href)) {
      if (!broken.has(href)) broken.set(href, new Set());
      broken.get(href).add(page);
    }
  }
}

console.log(`pages: ${files.length}  internal links checked: ${total}`);
if (broken.size === 0) {
  console.log('broken: 0');
} else {
  console.log(`broken: ${broken.size}`);
  for (const [href, pages] of [...broken].slice(0, 30)) {
    const list = [...pages];
    console.log(`  ${href}   <- ${list.slice(0, 3).join(', ')}${list.length > 3 ? ` (+${list.length - 3})` : ''}`);
  }
}
