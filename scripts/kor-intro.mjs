// 영문 KTO 에 개관시간·휴무·요금이 없는 장소를 국문 KTO(KorService2)에서 찾아 원문을 받아 둔다 (2026-11-13).
//
// 배경: 영문 detailIntro2 는 비어 있어도 같은 장소의 국문 레코드에는 값이 있는 경우가 많다.
// 영문·국문은 contentid 가 다르므로 ①영문 제목 뒤 (한글 원제)로 searchKeyword2 → ②좌표 거리로 같은 곳인지 확인
// → ③국문 detailIntro2. 결과는 한국어 원문이라 그대로 쓰지 않는다 — data/translations/places-intro.json 에
// 영어로 옮긴 것만 Exporter 가 병합한다.
//
// 사용: node scripts/kor-intro.mjs [최대콜수=300]
//   결과 누적: db/places-kor-intro.json  { engId: { korId, korTitle, km, ctype, usetime, restdate, usefee, ... } | { none: true } }
//   ⚠ KorService2 쿼터는 매일 축제 수집과 같이 쓴다 — 하루 300콜 안쪽으로.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const key = JSON.parse(readFileSync(join(root, 'Tour.Collector/appsettings.local.json'), 'utf8')).ApiKeyEncoded;
const BASE = 'https://apis.data.go.kr/B551011/KorService2';
const OUT = join(root, 'db/places-kor-intro.json');
const max = Number(process.argv[2] ?? 300);

const places = JSON.parse(readFileSync(join(root, 'web/data/places.json'), 'utf8'));
const store = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};

/** "Dynamic Maze (Insa-dong) (다이나믹 메이즈 (서울 인사동점))" → "다이나믹 메이즈 (서울 인사동점)" */
function koreanName(title) {
  const s = title.trimEnd();
  if (!s.endsWith(')')) return null;
  let depth = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ')') depth++;
    else if (s[i] === '(') { depth--; if (depth === 0) { const inner = s.slice(i + 1, -1); return /[가-힣]/.test(inner) ? inner : null; } }
  }
  return null;
}
const km = (a, b) => {
  const R = 6371, r = Math.PI / 180;
  const dLat = (b.y - a.y) * r, dLon = (b.x - a.x) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.y * r) * Math.cos(b.y * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

let calls = 0;
async function get(op, qs) {
  calls++;
  const url = `${BASE}/${op}?serviceKey=${key}&MobileOS=ETC&MobileApp=tour&_type=json${qs}`;
  const body = await (await fetch(url)).text();
  if (!body.trimStart().startsWith('{')) throw new Error('비정상 응답(쿼터?): ' + body.slice(0, 120));
  const j = JSON.parse(body);
  const code = j.response?.header?.resultCode;
  if (code !== '0000') throw new Error('API 오류 ' + code);
  const it = j.response.body.items?.item;
  return !it ? [] : Array.isArray(it) ? it : [it];
}

const need = places.filter(p => !p.hours && !p.closed && !p.fee && !(p.id in store) && koreanName(p.title) && p.mapx && p.mapy);
console.log(`대상 ${need.length}곳 (이미 조회 ${Object.keys(store).length})`);
let found = 0;
try {
  for (const p of need) {
    if (calls + 2 > max) break;
    // 원제 안의 지점 표기 "(서울 인사동점)" 은 검색을 방해하므로 떼고 찾는다
    const name = koreanName(p.title).replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\[[^\]]*\]/g, '').trim();
    const items = await get('searchKeyword2', `&numOfRows=20&pageNo=1&keyword=${encodeURIComponent(name)}`);
    const me = { x: +p.mapx, y: +p.mapy };
    const best = items
      .filter(i => i.mapx && i.mapy && ['12', '14', '28', '38', '39'].includes(String(i.contenttypeid)))
      .map(i => ({ i, d: km(me, { x: +i.mapx, y: +i.mapy }) }))
      .sort((a, b) => a.d - b.d)[0];
    if (!best || best.d > 0.5) { store[p.id] = { none: true, name }; continue; }
    const [intro] = await get('detailIntro2', `&contentId=${best.i.contentid}&contentTypeId=${best.i.contenttypeid}`);
    const keep = {};
    for (const [k, v] of Object.entries(intro ?? {})) if (v && !['contentid', 'contenttypeid'].includes(k)) keep[k] = String(v);
    store[p.id] = { korId: String(best.i.contentid), korTitle: best.i.title, km: +best.d.toFixed(3), ctype: String(best.i.contenttypeid), ...keep };
    found++;
  }
} catch (e) {
  console.log('중단: ' + e.message);
}
writeFileSync(OUT, JSON.stringify(store, null, 1));
console.log(`매칭 ${found}곳 · ${calls}콜 · 누적 ${Object.keys(store).length}`);
