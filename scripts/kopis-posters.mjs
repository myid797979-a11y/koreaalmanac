// concerts.json 의 poster 를 db/kopis.json 에서 채운다. kopisId 가 있는 항목만.
//
// 공연 상세 53페이지에 사진이 하나도 없었다 — 축제·관광지는 KTO 이미지가 있는데
// 공연만 비어 카드가 회색 placeholder 로 나왔다. KOPIS 는 포스터를 100% 주므로
// 쓰지 않을 이유가 없다.
//
// ⚠ KOPIS 가 주는 URL 은 `http://www.kopis.or.kr/...` 인데 우리 사이트는 HTTPS 다.
//   그대로 쓰면 혼합 콘텐츠가 된다. https 로 올리면 www → non-www 로 301 하므로
//   www 를 떼고 https 로 저장한다(리다이렉트 한 번을 아낀다).
//
// 사용: node scripts/kopis-posters.mjs [--dry]

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const R = fileURLToPath(new URL('../', import.meta.url));
const shows = JSON.parse(readFileSync(R + 'db/kopis.json', 'utf8'));
const path = R + 'web/data/concerts.json';
const db = JSON.parse(readFileSync(path, 'utf8'));
const dry = process.argv.includes('--dry');

const httpsify = (u) =>
  (u ?? '')
    .replace(/^http:\/\//i, 'https://')
    .replace(/^https:\/\/www\.kopis\.or\.kr/i, 'https://kopis.or.kr');

let filled = 0, already = 0, noId = 0, noPoster = 0;
for (const it of db.items) {
  if (it.poster) { already++; continue; }
  if (!it.kopisId) { noId++; continue; }
  const src = shows[it.kopisId]?.poster;
  if (!src) { noPoster++; continue; }
  it.poster = httpsify(src);
  filled++;
}

console.log(`포스터 채움 ${filled}건 · 이미 있음 ${already} · kopisId 없음 ${noId} · KOPIS에 포스터 없음 ${noPoster}`);
if (dry) { console.log('(--dry: 저장하지 않음)'); process.exit(0); }

// 필드 순서를 안정적으로 유지하려고 통째로 다시 쓴다
writeFileSync(path, JSON.stringify(db, null, 2) + '\n');
console.log(`저장 완료 · poster 보유 ${db.items.filter((x) => x.poster).length} / ${db.items.length}건`);
