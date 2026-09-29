import cultureJson from '@/data/culture.json';
import { okImage } from '@/lib/images';
import { today, fmt } from '@/lib/data';

// 한국문화정보원 문화정보 — 국악·전통공연과 전시. 축제와 같은 방식으로
// 원문(한국어)을 세션에서 번역해 얹는다. mt=true 면 번역본.
export type CultureEvent = {
  id: string; slug: string; title: string;
  start: string; end: string;
  venue: string | null; region: string; district: string | null;
  kind: 'traditional' | 'exhibition';
  image: string | null;
  gpsX: string | null; gpsY: string | null;
  price: string | null; addr: string | null; tel: string | null;
  url: string | null; venueUrl: string | null;
  overview: string | null;
  mt?: boolean;
};

export const culture: CultureEvent[] = (cultureJson as CultureEvent[]).map(c => ({ ...c, image: okImage(c.image) }));

export const KIND_META: Record<CultureEvent['kind'], { label: string; slug: string; blurb: string }> = {
  traditional: {
    label: 'Traditional performance',
    slug: 'traditional',
    blurb: 'Gugak, folk music, mask dance and other living Korean stage traditions — much of it at national institutions with regular weekend programmes.',
  },
  exhibition: {
    label: 'Exhibition',
    slug: 'exhibitions',
    blurb: 'Museum and gallery shows across Korea, including the long-running permanent displays at the national museums.',
  },
};

/** 진행중/예정만 (지난 것은 자동 제외) */
export function liveCulture(kind?: CultureEvent['kind'], t = today()): CultureEvent[] {
  return culture
    .filter(c => c.end >= t && (!kind || c.kind === kind))
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function cultureBySlug(slug: string): CultureEvent | undefined {
  return culture.find(c => c.slug === slug);
}

/**
 * 상세페이지 생성 대상 — 끝난 것도 포함한다 (Exporter 가 종료 후 90일까지 데이터를 남긴다).
 *
 * 예전에는 진행중/예정만 만들었는데, 그러면 Google 이 색인한 페이지가 종료 다음 날 404 가 된다
 * (2026-09-29 GSC 404 7건 전부 /culture/). 축제·공연과 같은 규칙: 페이지는 남기고 Ended 배너.
 * 목록(liveCulture)에서는 그대로 빠진다.
 */
export function cultureParams(): { slug: string }[] {
  return culture.map(c => ({ slug: c.slug }));
}

export function cultureDateRange(c: CultureEvent): string {
  if (c.start === c.end) return fmt(c.start);
  return fmt(c.start) + ' – ' + fmt(c.end);
}

/** 상설/장기 전시 구분 — 6개월 넘게 이어지면 'ongoing' 취급 */
export function isLongRun(c: CultureEvent): boolean {
  const s = new Date(+c.start.slice(0, 4), +c.start.slice(4, 6) - 1, +c.start.slice(6, 8));
  const e = new Date(+c.end.slice(0, 4), +c.end.slice(4, 6) - 1, +c.end.slice(6, 8));
  return (e.getTime() - s.getTime()) / 86400000 > 180;
}

/** 제목이 겹치는 회차에만 연도를 붙인다 (Bing 지침 §13 중복 제목 방지) */
const cultureTitleCounts = (() => {
  const m = new Map<string, number>();
  for (const c of culture) m.set(c.title, (m.get(c.title) ?? 0) + 1);
  return m;
})();

export function uniqueCultureTitle(c: CultureEvent): string {
  const year = (c.start ?? "").slice(0, 4);
  if (!year) return c.title;
  if ((cultureTitleCounts.get(c.title) ?? 0) < 2) return c.title;
  if (c.title.includes(year)) return c.title;
  return c.title + " " + year;
}