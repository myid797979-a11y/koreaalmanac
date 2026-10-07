import { festivals, type Festival } from '@/lib/data';

// 공휴일 — 주말 페이지·홈이 "이번 주말에 공휴일이 끼었다"를 알리는 데 쓴다.
// 연휴 주말은 KTX·숙소가 먼저 차고, 외국인은 공휴일인 줄 모르고 온다 (한글날 2026-10-09 금 → 3일 연휴).
// 날짜가 지나면 아무것도 안 나오므로 손대지 않아도 되지만, 2027년 3월 이후 분은 그 전에 추가할 것.
export type Holiday = {
  date: string;          // YYYYMMDD
  name: string;
  note: string;          // 여행자에게 필요한 한두 문장 (사실만)
  match?: RegExp;        // 이 공휴일과 관련된 축제 제목
};

export const HOLIDAYS: Holiday[] = [
  {
    date: '20261009', name: 'Hangeul Day',
    note: 'Korea celebrates its alphabet. Shops, restaurants, palaces and museums open as usual; banks and government offices close. Trains out of Seoul fill up on Friday morning and Sunday afternoon, so book KTX seats ahead.',
    match: /hangeul|hangul|sejong/i,
  },
  {
    date: '20261225', name: 'Christmas Day',
    note: 'A public holiday in Korea, celebrated more as a couples’ night out than a family day. Shops and restaurants stay open; Myeongdong, the Cheonggyecheon lights and Lotte World are packed in the evening.',
    match: /christmas|santa/i,
  },
  {
    date: '20270101', name: 'New Year’s Day',
    note: 'Crowds gather at Bosingak bell pavilion in Jongno for the midnight bell on 31 December, and at the east coast for the first sunrise. Most shops open; national museums close on 1 January.',
    match: /new year|sunrise|bell/i,
  },
  { date: '20270206', name: 'Seollal (Lunar New Year)', note: 'Seollal runs 6–9 February 2027, including a substitute holiday on the 9th. Many family-run restaurants and market stalls close for two or three days, trains are sold out weeks ahead, and national museums close on Seollal day itself.' },
  { date: '20270301', name: 'Independence Movement Day', note: 'A public holiday marking the 1919 independence movement; ceremonies at Tapgol Park and the Seodaemun Prison History Hall.' },
];

const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const asDate = (s: string) => new Date(Number(s.slice(0, 4)), Number(s.slice(4, 6)) - 1, Number(s.slice(6, 8)));

/** 금~일 주말 창(+ 월요일)에 걸린 공휴일. 금·월이면 3일 연휴 */
export function weekendHoliday(from: string, to: string): (Holiday & { day: string; long: boolean; related: Festival[] }) | null {
  const mon = asDate(to); mon.setDate(mon.getDate() + 1);
  const pad = (n: number) => String(n).padStart(2, '0');
  const monS = String(mon.getFullYear()) + pad(mon.getMonth() + 1) + pad(mon.getDate());
  const h = HOLIDAYS.find(x => x.date >= from && x.date <= monS);
  if (!h) return null;
  const d = asDate(h.date);
  const related = h.match
    ? festivals.filter(f => h.match!.test(f.title) && !!f.start && f.start <= monS && (f.end ?? f.start) >= from)
    : [];
  return { ...h, day: DOW[d.getDay()] + ' ' + d.getDate() + ' ' + MO[d.getMonth()], long: d.getDay() === 5 || d.getDay() === 1, related };
}
