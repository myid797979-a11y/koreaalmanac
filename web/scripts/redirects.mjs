// 바뀐 주소 → 새 주소 301 (2026-11-13). 빌드 후·배포 전에 out/_redirects 뒤에 덧붙인다.
//
// 배경: 상세 페이지 주소는 "제목-슬러그 + -id" 다. 번역이 들어오거나 KTO 가 제목을 고치면 슬러그가 바뀐다
// (예: culture/4-399540/ → culture/4th-korea-gugak-orchestra-festival-…-399540/). 구글은 옛 주소로 다시 와서
// 404 를 받는다 — Search Console 404 145건(2026-11-09)의 상당수가 이것이었다.
// id 는 바뀌지 않으므로, 예전에 알려진 주소(data/indexnow-state.json) 중 지금 빌드에 없는 것을 같은 id 의
// 현재 주소로 보낸다. id 자체가 사라진 것(보존 기간이 끝난 행사)은 그대로 404 — 억지로 허브로 보내면 soft 404 다.
//
// Cloudflare Pages 정적 규칙 한도는 2,000 줄 — 넘치면 최근 것부터 자르고 경고.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const HOST = 'https://koreaalmanac.com';
const KINDS = ['festival', 'culture', 'place', 'venue'];
const LIMIT = 1900;   // 기존 규칙 몇 줄의 여유

// indexnow-state 는 현재 주소만 남기고 사라진 주소는 지운다 — 그래서 별도 이력(data/url-history.json)에
// 지금까지 알려진 주소를 누적한다. 처음 값은 git 이력 속 state 90개 버전에서 모았다(2026-11-13, 5,582건).
const HIST = '../data/url-history.json';
const stateNow = existsSync('../data/indexnow-state.json')
  ? JSON.parse(readFileSync('../data/indexnow-state.json', 'utf8')) : {};
const history = new Set(existsSync(HIST) ? JSON.parse(readFileSync(HIST, 'utf8')) : []);
for (const u of Object.keys(stateNow)) if (u.startsWith('http')) history.add(u);
const sorted = [...history].sort();
writeFileSync(HIST, JSON.stringify(sorted).replace(/","/g, '",\n"') + '\n');
const state = Object.fromEntries(sorted.map(u => [u, 1]));

// 현재 빌드: 종류별 id → 슬러그
const now = {};
for (const k of KINDS) {
  now[k] = new Map();
  if (!existsSync(join('out', k))) continue;
  for (const d of readdirSync(join('out', k))) {
    const m = d.match(/-(\d+)$/);
    if (m) now[k].set(m[1], d);
  }
}

const lines = [];
for (const url of Object.keys(state)) {
  if (!url.startsWith(HOST)) continue;
  const m = url.slice(HOST.length).match(/^\/([a-z]+)\/([^/]+)\/?$/);
  if (!m || !KINDS.includes(m[1])) continue;
  const [, kind, slug] = m;
  if (existsSync(join('out', kind, slug, 'index.html'))) continue;
  const id = slug.match(/-(\d+)$/)?.[1];
  const cur = id && now[kind].get(id);
  if (!cur || cur === slug) continue;
  lines.push(`/${kind}/${slug}/ /${kind}/${cur}/ 301`);
  lines.push(`/${kind}/${slug} /${kind}/${cur}/ 301`);
}

if (lines.length > LIMIT) {
  console.log(`⚠ 리다이렉트 ${lines.length} 줄 — Cloudflare 한도 때문에 ${LIMIT} 줄만 씁니다`);
  lines.length = LIMIT;
}
const path = join('out', '_redirects');
const base = existsSync(path) ? readFileSync(path, 'utf8') : '';
writeFileSync(path, base.trimEnd() + '\n\n# 바뀐 슬러그 → 현재 주소 (scripts/redirects.mjs 자동 생성)\n' + lines.join('\n') + '\n');
console.log(`_redirects: 슬러그 변경 ${lines.length / 2}건`);
