// 배포 직후 IndexNow 핑 — Bing(및 Naver·Seznam 등 IndexNow 진영)에 통지.
// 구글은 IndexNow 미지원이라 Search Console 사이트맵으로 커버.
//
// ⚠ 변경된 URL 만 보낸다. IndexNow 규약은 "추가·수정·삭제된 URL"을 보내라고 명시하고,
//    안 바뀐 URL 을 매번 다시 던지면 제출 자체가 무시되거나 낮게 평가된다.
//    예전엔 배포할 때마다 사이트맵 전량(3,899건)을 던졌다 — 이틀에 2만 건이 넘었고
//    그중 실제로 바뀐 건 수십 개뿐이었다.
//
// 페이지 해시는 푸터의 "refreshed Sep 11, 2026" 을 지운 뒤 계산한다.
// 그 문자열이 전 페이지에 있고 매일 바뀌어서, 그대로 두면 늘 전량이 '변경'으로 잡힌다.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { createHash } from 'crypto';
import { dirname, join } from 'path';

const KEY = 'c9accd0f5f4a81cb9478f04161eb86fb';
const HOST = 'koreaalmanac.com';
const STATE = '../data/indexnow-state.json';
const MAX = 10000;   // IndexNow 1회 제출 상한

const xml = readFileSync('out/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (urls.length === 0) { console.log('sitemap에 URL 없음 — 건너뜀'); process.exit(0); }

/** URL → out/ 안의 파일 경로 */
function fileFor(url) {
  const path = url.replace('https://' + HOST, '').replace(/\/$/, '');
  return join('out', path, 'index.html');
}

/** 날짜처럼 매일 바뀌는 부분을 지운 내용 해시 */
function hashOf(url) {
  const f = fileFor(url);
  if (!existsSync(f)) return null;
  const body = readFileSync(f, 'utf8')
    .replace(/[A-Z][a-z]{2} \d{1,2}, 20\d\d/g, 'DATE');
  return createHash('sha1').update(body).digest('hex').slice(0, 12);
}

const prev = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {};
const next = {};
const changed = [];

for (const url of urls) {
  const h = hashOf(url);
  if (h === null) continue;          // 사이트맵에 있는데 파일이 없다 — 다음 빌드에서 잡힌다
  next[url] = h;
  if (prev[url] !== h) changed.push(url);
}

// 사라진 URL 도 알린다 — 끝난 축제 페이지가 계속 색인에 남지 않도록
const removed = Object.keys(prev).filter(u => !(u in next));

const submit = [...changed, ...removed].slice(0, MAX);
const first = Object.keys(prev).length === 0;

writeFileSync(STATE, JSON.stringify(next, null, 0));

if (submit.length === 0) {
  console.log(`IndexNow 건너뜀 — 바뀐 URL 없음 (전체 ${urls.length}건)`);
  process.exit(0);
}

console.log(
  `IndexNow 제출 대상 ${submit.length}건` +
  ` (신규·변경 ${changed.length} · 삭제 ${removed.length} · 전체 ${urls.length})` +
  (first ? ' — 첫 실행이라 전량' : ''));

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: 'https://' + HOST + '/' + KEY + '.txt',
    urlList: submit,
  }),
});
console.log('IndexNow 응답:', res.status);
if (res.status >= 400) console.log(await res.text());
