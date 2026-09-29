// 이미지 점검 — 장소·축제·문화·공연의 이미지 URL 을 전부 확인해 깨진 것을 lib/broken-images.json 에 쓴다.
// KTO 원본이 사라져도 우리 데이터는 매일 같은 URL 로 다시 만들어지므로, 목록으로 걸러낸다
// (lib/images.ts 가 빌드 때 대체 이미지로 바꾸고, 축제 갤러리에서는 뺀다).
// 사용: cd web && node scripts/image-audit.mjs   (약 8천 개, 2~3분. 한 달에 한 번이면 충분)
import fs from 'fs';

const ld = f => {
  const d = JSON.parse(fs.readFileSync('data/' + f + '.json', 'utf8'));
  return Array.isArray(d) ? d : (d.items || Object.values(d).find(Array.isArray));
};

const urls = new Map(); // url -> [owners]
const add = (u, who) => {
  if (!u || typeof u !== 'string' || !u.startsWith('http')) return;
  if (!urls.has(u)) urls.set(u, []);
  urls.get(u).push(who);
};
for (const p of ld('places')) add(p.image, 'place:' + p.id);
for (const f of ld('festivals')) {
  add(f.image, 'festival:' + f.id);
  (f.images || []).forEach(u => add(u, 'festimg:' + f.id));
}
for (const c of ld('culture')) add(c.image, 'culture:' + c.id);
for (const c of ld('concerts')) add(c.poster, 'concert:' + c.id);

const list = [...urls.keys()];
console.error('checking', list.length, 'urls');

async function check(u) {
  for (let t = 0; t < 2; t++) {
    try {
      const r = await fetch(u, { headers: { Range: 'bytes=0-0' }, signal: AbortSignal.timeout(15000) });
      const ct = r.headers.get('content-type') || '';
      if (r.status >= 400 || !/image/.test(ct)) return r.status + ' ' + ct;
      return null;
    } catch (e) {
      if (t) return 'ERR ' + e.name;   // 한 번 더 시도하고도 실패하면 깨진 것으로 본다
    }
  }
}

const bad = [];
let i = 0, done = 0;
async function worker() {
  while (i < list.length) {
    const u = list[i++];
    const e = await check(u);
    if (e) bad.push({ u, e, owners: urls.get(u) });
    if (++done % 1000 === 0) console.error(done);
  }
}
await Promise.all(Array.from({ length: 24 }, worker));

// 네트워크 오류(ERR)는 일시적일 수 있어 목록에는 HTTP 오류만 넣는다
const hard = bad.filter(b => !b.e.startsWith('ERR'));
fs.writeFileSync('lib/broken-images.json',
  JSON.stringify({ checked: new Date().toISOString().slice(0, 10), urls: hard.map(b => b.u).sort() }, null, 1) + '\n');
for (const b of bad) console.log(b.e.padEnd(22), b.owners.join(' '), b.u);
console.log('broken', hard.length, '· network errors (not listed)', bad.length - hard.length);
