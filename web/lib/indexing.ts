// 검색 색인 대상 판정 — 사이트맵과 페이지 robots 메타가 같은 기준을 쓴다 (2026-11-11).
//
// 배경: AdSense 가 "가치가 별로 없는 콘텐츠" 로 거절(2026-10-18). 사이트 4천여 쪽 중 대부분이 공공데이터를
// 틀에 넣은 페이지라, 그중 얇은 것(소개가 짧거나 실용 정보가 없는 장소, 오래전에 끝난 행사)을 색인에서 뺀다.
// 페이지는 지우지 않는다 — 내부 링크·방문자에게는 그대로 보이고 follow 도 유지한다.
// 축제는 같은 id 로 새 회차가 열리면 날짜가 바뀌어 자동으로 다시 색인된다.
//
// 2026-11-13 B안(사용자 결정): GSC 실적 CSV 로 확인해 보니 구글 노출이 10/3 3,282 → 10/5 31 로 하루 만에
// 99% 사라졌다. 수동 조치는 없고 같은 기간 Google September 2026 spam update(9/24~10/8)가 돌았다 —
// "대량 생성 콘텐츠" 강등으로 본다. 그래서 기준을 "얇은 것만 뺀다" 에서 "사람 손이 갔거나 원문이 충분히
// 풍부한 것만 남긴다" 로 바꿨다. 장소 2,674 → 약 670, 축제 510 → 약 90, 문화 367 → 약 40.
// 9월 피크 때도 클릭은 공연·축제·허브·가이드가 받았고 장소 상세는 거의 0 이었다 — 잃을 것이 적다.
// 페이지를 보강하면(place-notes·festival-overviews) 자동으로 다시 색인 대상이 된다.
//
// ⚠ robots 메타는 <head> 에 들어가므로 freshness 해시(v4 부터 head 제외)에 잡히지 않는다.
import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import type { Festival } from '@/lib/data';
import type { Place } from '@/lib/places';
import { TOP_PICKS } from '@/lib/place-rank';
import { PLACE_GUIDE } from '@/lib/guides';
import { englishReady, type CultureEvent } from '@/lib/culture';

/** 장소 소개가 이보다 짧으면 얇은 페이지로 본다 */
export const PLACE_MIN_OVERVIEW = 200;
/** 사람 손이 가지 않은 장소는 KTO 소개가 이 길이 이상일 때만 남긴다 (B안) */
export const PLACE_RICH_OVERVIEW = 800;
/** 축제가 끝나고 이 일수가 지나면 색인에서 뺀다 (B안: 60 → 14) */
export const FESTIVAL_GRACE_DAYS = 14;
/** 전시·공연은 번역된 소개가 이 길이 이상일 때만 (제목·장소·날짜만 있는 목록형은 목록 페이지로 충분) */
export const CULTURE_MIN_OVERVIEW = 200;

export const NOINDEX: Metadata['robots'] = {
  index: false, follow: true,
  googleBot: { index: false, follow: true },
};

function ymdMinus(t: string, days: number): string {
  const d = new Date(Date.UTC(+t.slice(0, 4), +t.slice(4, 6) - 1, +t.slice(6, 8)));
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}

const TOP = new Set(Object.values(TOP_PICKS).flat());

/** 가이드 본문이 링크하는 장소 id — 가이드가 소개한 곳은 사람이 고른 곳이다 (빌드 시 한 번 읽는다) */
const GUIDE_LINKED: Set<string> = (() => {
  const ids = new Set<string>(Object.keys(PLACE_GUIDE));
  try {
    const dir = path.join(process.cwd(), 'app', 'guides');
    for (const d of fs.readdirSync(dir)) {
      const f = path.join(dir, d, 'page.tsx');
      if (!fs.existsSync(f)) continue;
      const src = fs.readFileSync(f, 'utf8');
      for (const m of src.matchAll(/place\/[a-z0-9-]*?-(\d+)\//g)) ids.add(m[1]);
      for (const m of src.matchAll(/slug="[a-z0-9-]*?-(\d+)"/g)) ids.add(m[1]);
    }
  } catch { /* 가이드 폴더를 못 읽으면 PLACE_GUIDE 만 쓴다 */ }
  return ids;
})();

/** 소개가 충분하고 시간·휴무·요금 중 하나라도 있으면서(기본 조건),
 *  사람 손이 갔거나(노트·대표 명소·가이드 링크·유네스코) KTO 소개가 풍부한 곳만. 음식점은 소개 길이로 넣지 않는다. */
export function placeIndexable(p: Place): boolean {
  const body = (p.overview ?? '').length + (p.tip ?? '').length;
  if (body < PLACE_MIN_OVERVIEW || !(p.hours || p.closed || p.fee)) return false;
  if (p.tip || TOP.has(p.id) || GUIDE_LINKED.has(p.id) || /UNESCO/i.test(p.title)) return true;
  return p.cat !== 'food' && (p.overview ?? '').length >= PLACE_RICH_OVERVIEW;
}

/** 예정·진행 중이거나 끝난 지 14일 이내인 축제만.
 *  KTO 중복 레코드(DUP_OF)는 여기서 다루지 않는다 — canonical 로 처리 중이고, noindex 를 겹치면 신호가 엇갈린다. */
export function festivalIndexable(f: Festival, t: string): boolean {
  return (f.end ?? f.start ?? '') >= ymdMinus(t, FESTIVAL_GRACE_DAYS);
}

/** 진행 중·예정이고 영어로 옮겨졌으며 소개가 있는 전시·전통공연만 */
export function cultureIndexable(c: CultureEvent, t: string): boolean {
  return c.end >= t && englishReady(c) && (c.overview ?? '').length >= CULTURE_MIN_OVERVIEW;
}
