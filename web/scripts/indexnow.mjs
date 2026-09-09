// 배포 직후 IndexNow 핑 — Bing(및 Naver·Seznam 등 IndexNow 진영)에 전체 URL 즉시 통지.
// 구글은 IndexNow 미지원이라 Search Console 사이트맵으로 커버.
import { readFileSync } from 'fs';

const KEY = 'c9accd0f5f4a81cb9478f04161eb86fb';
const HOST = 'koreaalmanac.com';

const xml = readFileSync('out/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (urls.length === 0) { console.log('sitemap에 URL 없음 — 건너뜀'); process.exit(0); }

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: 'https://' + HOST + '/' + KEY + '.txt',
    urlList: urls.slice(0, 10000),
  }),
});
console.log('IndexNow 응답:', res.status, '· 제출 URL:', urls.length + '건');
