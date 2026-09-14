// KOPIS 신규 공연 검토용 — 공연 데이터 갱신(3일 주기) 때 사람이 훑는 목록을 만든다.
//
// KOPIS 를 발행 파이프라인으로 쓰지 않는 이유는 규칙이 끝내 판단을 못 하기 때문이다:
//  · "로마자 제목" 규칙은 `현대카드 슈퍼콘서트 28, 위켄드 (The Weeknd)` 와
//    `더팩트 뮤직 어워즈` 를 떨어뜨린다 (한글 협찬사명으로 시작해서).
//  · "좌석수" 규칙은 윤종신·부활·안치환을 4,600석짜리라는 이유로 올린다.
//    국내 발라드·트로트는 좌석이 커도 영어권 방문자가 가지 않는다.
// 그래서 자동은 수집까지만 하고, 노출은 사람이 고른 것만 concerts.json 에 넣는다.
//
// 사용: node scripts/kopis-review.mjs [최근N일]

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// ⚠ 경로에 한글(프로젝트_v03)이 있어 URL.pathname 은 퍼센트 인코딩을 뱉는다
const R = fileURLToPath(new URL('../', import.meta.url));
const j = (p) => JSON.parse(readFileSync(R + p, 'utf8'));

const shows = j('db/kopis.json');
const venues = j('db/kopis_venues.json');
const mine = j('web/data/concerts.json').items;

const days = Number(process.argv[2]) || 0;   // 0 = 전체 · N = 최근 N일 등록분만
const today = new Date().toISOString().slice(0, 10).replace(/-/g, '.');
const since = days
  ? new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)
  : null;

const seat = (id) => Number(venues[id]?.seatscale) || 0;
const clean = (s) => (s ?? '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();

// 이미 손으로 넣은 것은 제외 — 날짜(±3일)와 아티스트·제목 조각으로 거칠게 맞춘다.
// 완벽할 필요는 없다. 잘못 걸러도 사람이 목록을 보고 알아챈다.
const d8 = (s) => (s ?? '').replace(/\./g, '');
const linked = new Set(mine.map((m) => m.kopisId).filter(Boolean));
const known = (x) => linked.has(x.mt20id) || mine.some((m) => {
  const gap = Math.abs(Number(d8(x.prfpdfrom)) - Number(m.start));
  if (gap > 3) return false;
  const a = clean(x.prfnm).toLowerCase();
  const b = (m.artist + ' ' + m.title).toLowerCase();
  const words = b.split(/[^a-z0-9]+/).filter((w) => w.length >= 4);
  return words.some((w) => a.includes(w));
});

const rows = Object.values(shows)
  .filter((x) => x.area !== '해외')                    // ⚠ PLAVE 요코하마·변진섭 호치민이 섞인다
  .filter((x) => (x.prfpdto ?? '') >= today)
  .filter((x) => !since || (x.frstregdt ?? '').slice(0, 10) >= since)
  .filter((x) => !known(x))
  .map((x) => {
    const nm = clean(x.prfnm);
    const flags = [
      /내한/.test(nm) ? '내한' : '',
      /[A-Za-z]{3,}/.test(nm) ? '로마자' : '',
      /festival|페스티벌|페스타|fest\b/i.test(nm) ? '페스티벌' : '',
      seat(x.mt10id) >= 5000 ? '대형' : seat(x.mt10id) >= 1000 ? '중형' : '소형',
    ].filter(Boolean);
    return { x, nm, flags, seat: seat(x.mt10id) };
  })
  // 보는 순서: 내한 → 로마자(국제 팬덤 신호) → 규모 → 날짜
  .sort((a, b) =>
    (b.flags.includes('내한') - a.flags.includes('내한')) ||
    (b.flags.includes('로마자') - a.flags.includes('로마자')) ||
    (b.seat - a.seat) ||
    a.x.prfpdfrom.localeCompare(b.x.prfpdfrom));

// ⚠ 한 건당 한 줄로 낸다. 처음엔 두 줄씩(공연장·가격까지) 찍었는데, 362건이 726줄이 되어
//   앞 120줄만 읽고 "다 봤다"고 착각했다 — 실제로는 16%만 본 것이었고, 그 뒤에
//   FLOW(나루토 오프닝)·KANA-BOON·Nujabes 앙상블·HIGHLIGHT 가 묻혀 있었다.
//   전량을 한 화면 흐름에서 읽을 수 있어야 선별이 성립한다. 상세는 --full 로 본다.
const full = process.argv.includes('--full');

console.log(`검토 대상 ${rows.length}건` + (since ? ` (${since} 이후 등록)` : ' (전체)') +
  ` · 이미 보유 ${mine.length}건은 제외`);
console.log('번호 날짜   좌석    구분      공연명');
console.log('');

rows.forEach(({ x, nm, flags, seat: s }, i) => {
  const tag = (flags.includes('내한') ? '내한' : flags.includes('로마자') ? '로마자' : '국내')
    + (flags.includes('페스티벌') ? '·페스' : '');
  console.log(`${String(i + 1).padStart(3)} ${x.prfpdfrom.slice(5)} ${String(s || '-').padStart(6)} ` +
    `${tag.padEnd(9)} ${nm.slice(0, 58)}`);
  if (full) console.log(`      @${clean(x.fcltynm).slice(0, 34)}  ${x.area}  ` +
    `${(x.pcseguidance ?? '').slice(0, 40)}  ${x.relateurl ?? ''}`);
});

console.log('');
console.log(`— 끝. ${rows.length}건 전량 출력. 앞부분만 읽지 말 것. 상세는 --full.`);
