// 검색 색인 대상 판정 — 사이트맵과 페이지 robots 메타가 같은 기준을 쓴다 (2026-11-11).
//
// 배경: AdSense 가 "가치가 별로 없는 콘텐츠" 로 거절(2026-10-18). 사이트 4천여 쪽 중 대부분이 공공데이터를
// 틀에 넣은 페이지라, 그중 얇은 것(소개가 짧거나 실용 정보가 없는 장소, 오래전에 끝난 행사)을 색인에서 뺀다.
// 페이지는 지우지 않는다 — 내부 링크·방문자에게는 그대로 보이고 follow 도 유지한다.
// 축제는 같은 id 로 새 회차가 열리면 날짜가 바뀌어 자동으로 다시 색인된다.
//
// ⚠ robots 메타는 <head> 에 들어가므로 freshness 해시(v4 부터 head 제외)에 잡히지 않는다.
import type { Metadata } from 'next';
import type { Festival } from '@/lib/data';
import type { Place } from '@/lib/places';
import type { CultureEvent } from '@/lib/culture';

/** 장소 소개가 이보다 짧으면 얇은 페이지로 본다 (2026-11-11 기준 74곳) */
export const PLACE_MIN_OVERVIEW = 200;
/** 축제가 끝나고 이 일수가 지나면 색인에서 뺀다 */
export const FESTIVAL_GRACE_DAYS = 60;

export const NOINDEX: Metadata['robots'] = {
  index: false, follow: true,
  googleBot: { index: false, follow: true },
};

function ymdMinus(t: string, days: number): string {
  const d = new Date(Date.UTC(+t.slice(0, 4), +t.slice(4, 6) - 1, +t.slice(6, 8)));
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}

/** 소개가 충분하고 시간·휴무·요금 중 하나라도 있는 장소만 */
export function placeIndexable(p: Place): boolean {
  return (p.overview ?? '').length >= PLACE_MIN_OVERVIEW && Boolean(p.hours || p.closed || p.fee);
}

/** 예정·진행 중이거나 끝난 지 60일 이내인 축제만.
 *  KTO 중복 레코드(DUP_OF)는 여기서 다루지 않는다 — canonical 로 처리 중이고, noindex 를 겹치면 신호가 엇갈린다. */
export function festivalIndexable(f: Festival, t: string): boolean {
  return (f.end ?? f.start ?? '') >= ymdMinus(t, FESTIVAL_GRACE_DAYS);
}

/** 진행 중·예정인 전시·전통공연만 (끝난 것은 404 방지로 90일 남겨 두지만 색인은 안 함) */
export function cultureIndexable(c: CultureEvent, t: string): boolean {
  return c.end >= t;
}
