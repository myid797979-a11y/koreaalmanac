// 요일별 "여는 곳" — KTO 장소의 휴무일(closed) 자유 문장을 요일 규칙으로 바꾼다 (2026-11-12).
//
// 원문 예: "Mondays, New Year's Day, Seollal & Chuseok" · "Second and fourth Monday of every month"
//          · "N/A (Open all year round)" · "Tuesdays · * Inquire in advance"
// 확실히 읽히는 것만 쓴다. 요일도 연중무휴 표시도 없는 문장(예: "Irregular", "Check website")은 'unknown' 으로
// 빼서 목록에 넣지 않는다 — 틀린 "open" 이 빠진 것보다 나쁘다.
import { places, type Place, type PlaceCat } from '@/lib/places';

export const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
export type Day = typeof DAYS[number];
export const DAY_LABEL: Record<Day, string> = {
  monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday',
  friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
};

export type OpenRule = {
  kind: 'rule' | 'unknown';
  weekly: Day[];                         // 매주 쉬는 요일
  some: Day[];                           // 그 요일 중 일부 주만 쉼 (둘째·넷째 월요일 등)
  holidays: boolean;                     // 설·추석·신정·공휴일에 쉼
};

const QUAL = /(first|second|third|fourth|fifth|last|1st|2nd|3rd|4th|5th|every other|alternate|biweekly)/;
const ALWAYS = /(n\/a|open (all year|year[- ]round|every ?day|daily|24)|open 24\/7|no (regular )?(holiday|closing)|closed: none|none\b|연중무휴|365)/;
const HOLI = /(seollal|chuseok|lunar new year|new year|public holiday|national holiday|holidays|january 1\b|jan\. 1\b|1 january)/;
// 계절 휴장("Winter season (December-March)", "December 1 – March 14") — 요일 규칙으로 못 나타내므로 목록에서 뺀다.
// 신정(January 1)·설·추석은 계절이 아니라 공휴일이라 먼저 지우고 본다.
// "1st Monday of March, June, September and December"(분기 점검)처럼 월 이름만 있는 건 기간이 아니다 — 범위만 잡는다.
const M = '(january|february|march|april|may|june|july|august|september|october|november|december)';
const MONTHS = new RegExp(M + '[^,;·]{0,12}?(-|–|~|\\bto\\b|through)\\s*' + M + '|winter season|summer season|off-season|during (the )?winter');

export function parseClosed(text: string | null): OpenRule {
  const none: OpenRule = { kind: 'unknown', weekly: [], some: [], holidays: false };
  if (!text) return none;
  const s = text.toLowerCase();
  const noHoli = s.replace(/january 1(st)?\b|jan\. 1\b|1 january|new year'?’?s?( day)?|lunar new year'?’?s?( day)?/g, '');
  if (MONTHS.test(noHoli)) return none;
  const weekly: Day[] = [], some: Day[] = [];
  for (const d of DAYS) {
    const re = new RegExp(d + 's?\\b', 'g');
    let m: RegExpExecArray | null;
    while ((m = re.exec(s))) {
      // 같은 구절(쉼표·괄호 등으로 끊은 마지막 조각) 안을 본다
      const clause = s.slice(0, m.index).split(/[,;·\/(\n]/).pop() ?? '';
      // "if Monday is a public holiday … the following day" 같은 예외 문장은 규칙이 아니다
      if (/\bif\b|\bwhen\b|falls? on|following|\bnext\b|except|open on/.test(clause)) continue;
      // "둘째·넷째 월요일" 처럼 일부 주만 쉬는 것
      if (QUAL.test(clause)) { if (!some.includes(d)) some.push(d); }
      else if (!weekly.includes(d)) weekly.push(d);
    }
  }
  // "weekends" · "weekdays" 휴무
  if (/closed (on )?weekends|weekends? closed/.test(s)) for (const d of ['saturday', 'sunday'] as Day[]) if (!weekly.includes(d)) weekly.push(d);
  // "If Tuesday falls on a public holiday, closed the following day" 의 holiday 는 휴무가 아니다 — 예외 구절을 지우고 본다
  const holidays = HOLI.test(s.replace(/\b(if|when|in (the )?case of)\b[^,;·)]*/g, ''));
  if (weekly.length || some.length) return { kind: 'rule', weekly, some: some.filter(d => !weekly.includes(d)), holidays };
  if (ALWAYS.test(s) || holidays) return { kind: 'rule', weekly: [], some: [], holidays };
  return none;
}

/** 이 도구에 넣는 분류 — 요일 휴무가 실제로 계획을 바꾸는 곳들 */
export const OPEN_CATS: PlaceCat[] = ['museums', 'heritage', 'markets', 'themeparks', 'shopping', 'views', 'villages', 'temples'];
/** 지역 순서 — 외국인 방문이 많은 곳부터 */
export const OPEN_REGIONS = ['Seoul', 'Busan', 'Gyeonggi', 'Incheon', 'Jeju', 'Gyeongbuk', 'Gangwon', 'Jeonbuk'];

export type OpenPlace = Place & { rule: OpenRule };

let cache: OpenPlace[] | null = null;
export function openPlaces(): OpenPlace[] {
  if (!cache) cache = places
    .filter(p => OPEN_CATS.includes(p.cat) && OPEN_REGIONS.includes(p.region) && p.closed)
    .map(p => ({ ...p, rule: parseClosed(p.closed) }))
    .filter(p => p.rule.kind === 'rule');
  return cache;
}

/** 그 요일에 (적어도 대부분의 주에) 여는 곳 */
export function openOn(day: Day): OpenPlace[] {
  return openPlaces().filter(p => !p.rule.weekly.includes(day));
}
/** 그 요일에 매주 쉬는 곳 */
export function closedOn(day: Day): OpenPlace[] {
  return openPlaces().filter(p => p.rule.weekly.includes(day));
}
