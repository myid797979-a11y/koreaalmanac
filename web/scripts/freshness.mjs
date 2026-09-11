// 빌드 직후 · 배포 직전에 돌린다.
//
// 하는 일 두 가지:
//   1) 페이지마다 내용이 실제로 바뀐 날짜를 기록하고, sitemap.xml 에 <lastmod> 를 넣는다.
//      Bing 웹마스터 지침 §3 이 명시적으로 요구하는 신선도 신호다. 전 페이지에 오늘 날짜를
//      박으면 신호가 아니라 잡음이 되므로, 내용이 바뀐 페이지만 날짜를 올린다.
//   2) 바뀐 URL 목록을 남겨 indexnow.mjs 가 그대로 제출하게 한다 (§4: 변경분만).
//
// 해시할 때 "Sep 11, 2026" 같은 날짜는 지운다 — 푸터 갱신일이 전 페이지에 있고
// 매일 바뀌어서, 그대로 두면 늘 전량이 '변경'으로 잡힌다.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { createHash } from 'crypto';
import { join, dirname } from 'path';

const HOST = 'koreaalmanac.com';
const STATE = '../data/indexnow-state.json';
const CHANGED = 'out/.changed-urls.json';

const kst = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);

const xml = readFileSync('out/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (urls.length === 0) { console.log('sitemap에 URL 없음 — 건너뜀'); process.exit(0); }

function hashOf(url) {
  const p = url.replace('https://' + HOST, '').replace(/\/$/, '');
  const f = join('out', p, 'index.html');
  if (!existsSync(f)) return null;
  // 렌더된 내용만 남긴다. Next.js 는 빌드마다 buildId·청크 해시·next/font 클래스명
  // (__variable_d64f0b)이 달라져서, 페이지를 한 글자도 안 고쳐도 HTML 전체가 바뀐다.
  // 스크립트와 링크를 통째로 빼면 그 잡음이 전부 사라진다.
  // 푸터 갱신일("Sep 11, 2026")도 전 페이지에 있고 매일 바뀌므로 지운다.
  const body = readFileSync(f, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<link[^>]*>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')            // <!--1134a6DoyRaVkfKMRzHL9--> 같은 빌드 토큰
    .replace(/__variable_[0-9a-f]+/g, '')
    .replace(/[A-Z][a-z]{2} \d{1,2}, 20\d\d/g, 'DATE');
  return createHash('sha1').update(body).digest('hex').slice(0, 12);
}

// 예전 상태는 {url: "해시"} 였다. 지금은 {url: {h, m}} — 읽을 때 흡수한다.
const rawPrev = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {};
const prev = {};
for (const [u, v] of Object.entries(rawPrev)) {
  prev[u] = typeof v === 'string' ? { h: v, m: kst } : v;
}

const next = {};
const changed = [];
for (const url of urls) {
  const h = hashOf(url);
  if (h === null) continue;
  const was = prev[url];
  if (was && was.h === h) next[url] = was;               // 그대로 — 날짜 유지
  else { next[url] = { h, m: kst }; changed.push(url); } // 바뀌었다 — 오늘로
}
const removed = Object.keys(prev).filter(u => !(u in next));

mkdirSync(dirname(STATE), { recursive: true });
writeFileSync(STATE, JSON.stringify(next, null, 0));
writeFileSync(CHANGED, JSON.stringify([...changed, ...removed]));

// sitemap 에 <lastmod> 주입 — <loc> 바로 뒤에 넣는다
let n = 0;
const out = xml.replace(/<loc>([^<]+)<\/loc>/g, (m, u) => {
  const e = next[u];
  if (!e) return m;
  n++;
  return m + '\n<lastmod>' + e.m + '</lastmod>';
});
writeFileSync('out/sitemap.xml', out);

console.log(
  `lastmod 주입 ${n}/${urls.length}건 · 오늘 변경 ${changed.length} · 삭제 ${removed.length}`);
