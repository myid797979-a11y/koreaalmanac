import festivalsJson from '@/data/festivals.json';

export type Festival = {
  id: string; slug: string; title: string; titleFull: string;
  start: string | null; end: string | null; region: string;
  addr: string | null; mapx: string | null; mapy: string | null;
  image: string | null; tel: string | null; overview: string | null;
  homepage: string | null; place: string | null; fee: string | null;
  hours: string | null; duration: string | null; sponsor: string | null; mt?: boolean; tags?: string[]; images?: string[];
};

export const festivals = festivalsJson as Festival[];

// KST 기준 오늘 (YYYYMMDD) — 정적 빌드 시점에 박히고, 매일 재빌드로 갱신 (청약각 철학)
export function today(): string {
  const now = new Date(Date.now() + 9 * 3600 * 1000);
  return now.toISOString().slice(0, 10).split('-').join('');
}

export type Status = 'ongoing' | 'upcoming' | 'ended';

export function status(f: Festival, t = today()): Status {
  if (f.end && f.end < t) return 'ended';
  if (f.start && f.start > t) return 'upcoming';
  return 'ongoing';
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function fmt(d: string | null): string {
  if (!d || d.length !== 8) return 'TBD';
  return MONTHS[Number(d.slice(4, 6)) - 1] + ' ' + Number(d.slice(6, 8)) + ', ' + d.slice(0, 4);
}

export function dateRange(f: Festival): string {
  if (!f.start) return 'Dates TBD';
  if (f.start === f.end || !f.end) return fmt(f.start);
  return fmt(f.start) + ' – ' + fmt(f.end);
}

export function daysUntil(d: string, t = today()): number {
  const toDate = (s: string) => new Date(Number(s.slice(0, 4)), Number(s.slice(4, 6)) - 1, Number(s.slice(6, 8)));
  return Math.round((toDate(d).getTime() - toDate(t).getTime()) / 86400000);
}

export function bySlug(slug: string): Festival | undefined {
  return festivals.find(f => f.slug === slug);
}

// ── 허브 페이지 헬퍼 ─────────────────────────────────────────

export const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
export const MONTH_SLUGS = MONTHS_FULL.map(m => m.toLowerCase());

export const REGIONS = ['Seoul', 'Busan', 'Incheon', 'Gyeonggi', 'Gangwon', 'Daejeon',
  'Chungbuk', 'Chungnam', 'Sejong', 'Daegu', 'Gyeongbuk', 'Gyeongnam', 'Ulsan',
  'Jeonbuk', 'Jeonnam', 'Gwangju', 'Jeju'];

// 에버그린 월 허브: URL에 연도를 안 박는 대신, 이미 지난 달은 내년 데이터를 보여준다
export function targetYear(monthIdx: number, t = today()): number {
  const y = Number(t.slice(0, 4));
  return monthIdx + 1 >= Number(t.slice(4, 6)) ? y : y + 1;
}

export function overlapsMonth(f: Festival, year: number, monthIdx: number): boolean {
  if (!f.start) return false;
  const mm = String(monthIdx + 1).padStart(2, '0');
  return f.start <= year + mm + '31' && (f.end ?? f.start) >= year + mm + '01';
}

export function monthFestivals(monthIdx: number): { year: number; list: Festival[] } {
  const year = targetYear(monthIdx);
  const list = festivals
    .filter(f => overlapsMonth(f, year, monthIdx))
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''));
  return { year, list };
}

export function regionFestivals(region: string): Festival[] {
  return festivals.filter(f => f.region === region);
}

export function regionMonthList(region: string, monthIdx: number): Festival[] {
  const year = targetYear(monthIdx);
  return festivals
    .filter(f => f.region === region && overlapsMonth(f, year, monthIdx))
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''));
}

// 지역×월 페이지 생성 문턱 — 3건 미만 조합은 페이지를 만들지 않는다 (scaled content 방지)
export const REGION_MONTH_MIN = 3;

// Add to Calendar (.ics) — 정적 사이트라 data URI로 인라인 생성
export function icsHref(f: Festival): string | null {
  if (!f.start || f.start.length !== 8) return null;
  const endStr = f.end && f.end.length === 8 ? f.end : f.start;
  const d = new Date(Number(endStr.slice(0, 4)), Number(endStr.slice(4, 6)) - 1, Number(endStr.slice(6, 8)));
  d.setDate(d.getDate() + 1);   // DTEND는 exclusive
  const pad = (n: number) => String(n).padStart(2, '0');
  const dtEnd = String(d.getFullYear()) + pad(d.getMonth() + 1) + pad(d.getDate());
  const CRLF = String.fromCharCode(13) + String.fromCharCode(10);
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//KoreaFestivalFinder//EN',
    'BEGIN:VEVENT',
    'UID:' + f.id + '@koreafestivalfinder',
    'DTSTART;VALUE=DATE:' + f.start,
    'DTEND;VALUE=DATE:' + dtEnd,
    'SUMMARY:' + f.title,
    'LOCATION:' + (f.place ?? f.addr ?? f.region),
    'END:VEVENT', 'END:VCALENDAR',
  ];
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines.join(CRLF));
}

// 이번 주말(금~일) 창 — 일요일이면 지나가는 주말을 그대로 잡는다
export function weekendWindow(t = today()): { from: string; to: string; label: string } {
  const d = new Date(Number(t.slice(0, 4)), Number(t.slice(4, 6)) - 1, Number(t.slice(6, 8)));
  const dow = d.getDay();
  const fri = new Date(d);
  fri.setDate(d.getDate() + (dow === 0 ? -2 : 5 - dow));
  const sun = new Date(fri);
  sun.setDate(fri.getDate() + 2);
  const pad = (n: number) => String(n).padStart(2, '0');
  const f8 = (x: Date) => String(x.getFullYear()) + pad(x.getMonth() + 1) + pad(x.getDate());
  const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const label = MO[fri.getMonth()] + ' ' + fri.getDate() + '–' +
    (fri.getMonth() === sun.getMonth() ? '' : MO[sun.getMonth()] + ' ') + sun.getDate();
  return { from: f8(fri), to: f8(sun), label };
}

export function onWeekend(t = today()): Festival[] {
  const { from, to } = weekendWindow(t);
  return festivals
    .filter(f => f.start && f.start <= to && (f.end ?? f.start) >= from)
    .sort((a, b) => {
      const aStarts = a.start! >= from ? 0 : 1;   // 주말에 시작하는 것 먼저
      const bStarts = b.start! >= from ? 0 : 1;
      return aStarts - bStarts || a.start!.localeCompare(b.start!);
    });
}

// ── 카테고리 (Exporter의 태그 규칙과 슬러그 일치) ──────────
export const CATEGORIES: { slug: string; label: string }[] = [
  { slug: 'traditional', label: 'Heritage & Traditional' },
  { slug: 'lights', label: 'Fireworks & Lights' },
  { slug: 'food', label: 'Food & Drink' },
  { slug: 'nature', label: 'Flowers & Nature' },
  { slug: 'music', label: 'Music & Performance' },
  { slug: 'art', label: 'Art & Exhibitions' },
  { slug: 'family', label: 'Family & Kids' },
];

export const categoryLabel = (slug: string): string =>
  CATEGORIES.find(c => c.slug === slug)?.label ?? slug;

export function categoryFestivals(slug: string): Festival[] {
  return festivals.filter(f => (f.tags ?? []).includes(slug));
}
