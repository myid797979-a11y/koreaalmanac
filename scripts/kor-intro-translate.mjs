// db/places-kor-intro.json (국문 원문) → data/translations/places-intro.json (영어, 커밋 대상).
//
// 국문 detailIntro 문구는 종류가 적고 정형적이라(연중무휴·상시 개방·09:00~18:00 …) 세션에서 사람이 옮긴
// 사전(TR)으로 바꾼다. 사전에 없는 문구는 건너뛰고 목록으로 출력한다 — 다음 세션에서 TR 에 추가.
//
// ⚠ "점포별로 상이함"·"시설별로 상이함"·"홈페이지 참조" 처럼 정보가 없는 문구는 일부러 옮기지 않는다(null).
//   그 한 줄로 색인 기준(lib/indexing.ts)만 넘기면 얇은 페이지를 다시 색인시키는 꼴이 된다.
//   캠핑장 입실·퇴실 시각도 "개관시간" 이 아니므로 뺀다.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = JSON.parse(readFileSync(join(root, 'db/places-kor-intro.json'), 'utf8'));
const OUT = join(root, 'data/translations/places-intro.json');

const TR = {
  '연중무휴': 'Open every day',
  '연중 무휴': 'Open every day',
  '상시 개방': 'Always open',
  '무료': 'Free',
  '09:00~17:00': '09:00–17:00',
  '09:00~18:00': '09:00–18:00',
  '09:00~19:00': '09:00–19:00',
  '10:00~18:00': '10:00–18:00',
  '11:00~21:00': '11:00–21:00',
  '08:00~17:00': '08:00–17:00',
  '08:30~22:00': '08:30–22:00',
  '05:00~18:00': '05:00–18:00',
  '06:00~20:00 ※상이할 수 있음': '06:00–20:00 (may vary)',
  '09:00~18:00 (입장 마감 17:30)': '09:00–18:00 (last entry 17:30)',
  '- 09:00~18:00- 입장 마감 17:30': '09:00–18:00 (last entry 17:30)',
  '매년 6월~9월 09:00~18:00  ※ 자세한 사항은 홈페이지 참조': 'June–September 09:00–18:00 (see the official website for details)',
  '상시 개방※ 우천 시·수량 증가 시 안전상 출입 통제될 수 있음': 'Always open (access may be closed for safety in rain or high water)',
  '상시 개방※ 일반적으로 관람이 가능하나 소유주 등의 개인적인 사정으로 관람이 제한될 수도 있음': 'Usually open to visitors, but the owners may restrict access at times',
  '상시 개방※ 자세한 사항은 전화문의 요망': 'Always open (phone ahead for details)',
  '상시 개방 (해수욕장 09:00~18:00 물놀이 가능)': 'Always open (swimming 09:00–18:00 in the beach season)',
  '- 하절기 09:00~18:00- 동절기 09:00~17:00': 'Summer 09:00–18:00; winter 09:00–17:00',
  '[하절기(3월~10월)]- 09:00~18:00[동절기(11월~2월)]- 09:00~17:00': 'March–October 09:00–18:00; November–February 09:00–17:00',
  '[히절기]- 09:00~21:00[동절기]- 09:00~20:00': 'Summer 09:00–21:00; winter 09:00–20:00',
  '[비수기] - 09:00~18:00\n[성수기]  - 09:00~19:30': 'Off-peak 09:00–18:00; peak season 09:00–19:30',
  '엘리베이터 운영시간 09:00~17:00': 'Lift runs 09:00–17:00',
  '국궁전시관 10:00~18:00': 'Archery exhibition hall 10:00–18:00',
  '09:00~16:00※ 절기에 따라 변동이 있을 수 있으므로 전화 문의 후 방문 요망': '09:00–16:00 (varies by season — phone ahead)',
  '[2월~5월/9월~10월]- 09:00~18:00- 입장 마감 17:00[6월~8월]- 09:00~18:30- 입장 마감 17:30[11월~1월]- 09:00~17:30- 입장 마감 16:30':
    'Feb–May and Sep–Oct 09:00–18:00 (last entry 17:00); Jun–Aug 09:00–18:30 (last entry 17:30); Nov–Jan 09:00–17:30 (last entry 16:30)',
  '[2월~5월/9월~10월]- 09:00~18:00- 입장 마감 17:00[6월~8월]- 09:00~18:30- 입장 마감 17:30[11월~1월]- 09:00~17:30-':
    'Feb–May and Sep–Oct 09:00–18:00 (last entry 17:00); Jun–Aug 09:00–18:30 (last entry 17:30); Nov–Jan 09:00–17:30',
  '[성수기(5월~9월)]- 09:00~18:30- 매표 마감 18:00[비수기(10월~4월)]- 09:00~17:30- 매표 마감 17:00※ 통합권 매표 마감 16:00':
    'May–September 09:00–18:30 (tickets until 18:00); October–April 09:00–17:30 (tickets until 17:00); combined tickets until 16:00',
  '[평일]09:30~18:30[주말]09:30~19:00': 'Weekdays 09:30–18:30; weekends 09:30–19:00',
  '- 화요일, 토요일 11:30~18:00 (휴게시간 12:00~13:00)- 수요일~금요일 09:00~18:00 (휴게시간 12:00~13:00)- 일요일 09:00~15:00 (휴게시간 12:00~13:00) ※ 미사시간은 홈페이지 참고':
    'Tue and Sat 11:30–18:00; Wed–Fri 09:00–18:00; Sun 09:00–15:00 (closed 12:00–13:00 daily; see the website for Mass times)',
  '- 경관조명 일몰 후~23:00- 분수 일몰 후~22:40 ※ 5월~8월 일몰 20:00 / 9월~10월 일몰 19:00':
    'Lights from sunset to 23:00; fountain from sunset to 22:40 (sunset about 20:00 in May–August, 19:00 in September–October)',
  '1월 1일 / 설·추석 당일': '1 January; Seollal and Chuseok days',
  '1월 1일 / 설·추석': '1 January; Seollal and Chuseok',
  '설날·추석 당일': 'Seollal and Chuseok days',
  '매주 월요일': 'Mondays',
  '매주 월요일 정기휴무': 'Mondays',
  '매주 화요일': 'Tuesdays',
  '매주 수요일': 'Wednesdays',
  '매주 토요일 / 일요일': 'Saturdays and Sundays',
  '매주 월요일 (단, 공휴일이 월요일인 경우 그 다음날 휴무)': 'Mondays (if Monday is a public holiday, closed the next day instead)',
  '매주 월요일※ 단, 월요일이 공휴일인 경우 정상 운영': 'Mondays (open if Monday is a public holiday)',
  '매주 월요일 (단, 월요일이 공휴일일 경우 다음날) / 1월 1일 / 설·추석 연휴': 'Mondays (the next day if Monday is a public holiday); 1 January; Seollal and Chuseok holidays',
  '연중 무휴 ※기상악화 및 유해생물 출현시 입욕통제': 'Open every day (swimming stopped in bad weather or when jellyfish appear)',
  '국궁전시관: 월요일, 1월 1일, 설 당일, 추석 당일': 'Archery exhibition hall: Mondays, 1 January, Seollal and Chuseok days',
};
// 정보가 없는 문구 — 옮기지 않는다 (위 주석 참고)
const EMPTY = /상이|참조|참고|확인 요망|확인$|입실|퇴실|연중휴무/;

const HOURS = ['usetime', 'opentimefood', 'opentime', 'usetimeculture'];
const CLOSED = ['restdate', 'restdatefood', 'restdateshopping', 'restdateculture'];
const FEE = ['usefee', 'usefeeculture'];

const out = {}, missing = new Set();
const pick = (x, keys) => {
  for (const k of keys) {
    const v = x[k]?.trim();
    if (!v) continue;
    if (TR[v]) return TR[v];
    if (!EMPTY.test(v)) missing.add(v);
  }
  return null;
};
for (const [id, x] of Object.entries(src)) {
  if (x.none) continue;
  const e = { hours: pick(x, HOURS), closed: pick(x, CLOSED), fee: pick(x, FEE) };
  if (e.hours || e.closed || e.fee) out[id] = { ...e, kor: x.korId };
}
writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
console.log(`places-intro.json ${Object.keys(out).length}곳`);
if (missing.size) console.log('사전에 없는 문구 ' + missing.size + ':\n' + [...missing].map(s => '  ' + JSON.stringify(s)).join('\n'));
