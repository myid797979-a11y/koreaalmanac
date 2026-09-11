// 배포 직후 IndexNow 핑 — Bing(및 Naver·Seznam 등 IndexNow 진영)에 통지.
// 구글은 IndexNow 미지원이라 Search Console 사이트맵으로 커버.
//
// ⚠ 변경된 URL 만 보낸다 (Bing 지침 §4). 안 바뀐 URL 을 반복 제출하면 신호가 무시된다.
//    예전엔 배포할 때마다 사이트맵 전량(3,899건)을 던졌다 — 이틀에 2만 건이 넘었고
//    그중 실제로 바뀐 건 수십 개뿐이었다.
//
// 바뀐 URL 목록은 freshness.mjs 가 빌드 직후에 계산해 out/.changed-urls.json 에 남긴다.

import { readFileSync, existsSync } from 'fs';

const KEY = 'c9accd0f5f4a81cb9478f04161eb86fb';
const HOST = 'koreaalmanac.com';
const CHANGED = 'out/.changed-urls.json';
const MAX = 10000;   // IndexNow 1회 제출 상한

if (!existsSync(CHANGED)) {
  console.log('변경 목록 없음 — freshness.mjs 가 먼저 돌아야 한다. 건너뜀');
  process.exit(0);
}

const urls = JSON.parse(readFileSync(CHANGED, 'utf8'));
if (urls.length === 0) {
  console.log('IndexNow 건너뜀 — 바뀐 URL 없음');
  process.exit(0);
}

const submit = urls.slice(0, MAX);
console.log(`IndexNow 제출 ${submit.length}건` + (urls.length > MAX ? ` (전체 ${urls.length} 중)` : ''));

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
