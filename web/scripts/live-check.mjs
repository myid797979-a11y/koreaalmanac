// 배포 직후 라이브 점검 — 실제 사이트 HTML 에 GA·제휴 태그가 들어 있는지 확인하고, 없으면 실패한다.
// 왜: 청약각이 빌드 방식을 바꾼 뒤 GA 태그가 에러 없이 빠져 일주일간 통계가 0이었다 (2026-10).
// 빌드·링크 검사는 통과해도 "들어 있어야 할 것이 빠진" 사고는 못 잡는다. Cloudflare 반영 지연을 감안해 재시도한다.
import { readFileSync } from 'node:fs';
const HOST = 'https://koreaalmanac.com';
const CHECKS = [
  { path: '/', must: ['G-QK9J11YDBN', 'ca-pub-5585592855648237'] },
  { path: '/guides/seoul-palaces/', must: ['G-QK9J11YDBN', 'aid=136897', 'cid=1976112'] },
  { path: `/concert/${upcomingConcert()}/`, must: ['G-QK9J11YDBN', 'cid=1976112'] },
];

// 공연 페이지는 끝나면 숙소(제휴) 박스가 빠진다 — 고정 경로를 두면 공연이 끝난 날 점검이 깨진다(2026-11-16 MMA).
// 그래서 14일 이상 남은 공연 중 가장 가까운 것을 매번 고른다.
function upcomingConcert() {
  const items = JSON.parse(readFileSync(new URL('../data/concerts.json', import.meta.url), 'utf8')).items;
  const d = new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10).replace(/-/g, '');
  return items.filter(c => c.start >= d).sort((a, b) => a.start.localeCompare(b.start))[0].id;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
let failed = 0;
for (const c of CHECKS) {
  let missing = c.must;
  for (let attempt = 1; attempt <= 4 && missing.length; attempt++) {
    try {
      const res = await fetch(HOST + c.path + '?livecheck=' + Date.now(), { headers: { 'Cache-Control': 'no-cache' } });
      const html = res.ok ? await res.text() : '';
      missing = c.must.filter(m => !html.includes(m));
      if (!res.ok) missing = [`HTTP ${res.status}`];
    } catch (e) { missing = ['fetch error: ' + e.message]; }
    if (missing.length && attempt < 4) await sleep(15000);
  }
  if (missing.length) { failed++; console.log(`✗ ${c.path} — 빠짐: ${missing.join(', ')}`); }
  else console.log(`✓ ${c.path}`);
}
if (failed) { console.log(`라이브 점검 실패 ${failed}건 — GA·광고·제휴 태그가 실제 사이트에서 빠졌다`); process.exit(1); }
console.log('라이브 점검 통과');
