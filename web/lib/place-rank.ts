// 장소 정렬 — 알파벳순은 여행자에게 쓸모가 없다.
// (서울 261곳을 A부터 늘어놓으면 ARTEASPOON 이 경복궁보다 먼저 나온다)
//
// 세 단계로 판단한다:
//   1) TOP_PICKS — 사람이 고른 대표 명소. 지역별로 앞에 고정한다.
//   2) 신호 점수 — 유네스코 표기, 소개문 길이, 사진 보유 등 데이터에서 읽히는 것
//   3) 나머지는 제목순
import { displayTitle, type Place } from '@/lib/places';

/**
 * 지역별 대표 명소 — contentid 를 실제 데이터에서 확인해 손으로 골랐다.
 * ⚠ KTO 영문 관광지 목록에 아직 없는 곳이 있다 (성산일출봉·태종대·DDP).
 *   광장시장·자갈치시장은 쇼핑(contentTypeId 79) 수집으로 들어와 이제 쓸 수 있다.
 */
export const TOP_PICKS: Record<string, string[]> = {
  Seoul: [
    '264337',   // Gyeongbokgung Palace
    '561382',   // Bukchon Hanok Village
    '264348',   // Changdeokgung Palace [UNESCO]
    '264312',   // Myeong-dong
    '264316',   // Deoksugung Palace
    '3075115',  // Insadong Cultural Street
    '2943972',  // Ikseon-dong Hanok Street
    '264320',   // Namsan Park
    '789696',   // Seoul Forest
    '273761',   // Gwangjang Market
    '264152',   // Lotte World
  ],
  Busan: [
    '1998211',  // Gamcheon Culture Village
    '264155',   // Haeundae Beach
    '264250',   // Gwangalli Beach
    '789805',   // BIFF Square
    '2835497',  // Huinnyeoul Culture Village
    '2382544',  // Jagalchi Market
    '1054924',  // Songdo Beach
  ],
  Jeju: [
    '264172',   // Hallasan Mountain
    '264236',   // Manjanggul Lava Tube
    '264588',   // Cheonjiyeon Falls [UNESCO Global Geopark]
    '264181',   // Jeongbang Falls
    '264224',   // Bijarim Forest
    '1624990',  // Camellia Hill
  ],
  Gyeongbuk: [
    '264261',   // Bulguksa Temple [UNESCO]
    '264148',   // Andong Hahoe Village [UNESCO]
    '264256',   // Cheomseongdae Observatory
    '264367',   // Donggung Palace and Wolji Pond
    '264117',   // Daereungwon Tomb Complex
  ],
  Gyeonggi: [
    '264204',   // Suwon Hwaseong Fortress [UNESCO]
    '264235',   // Everland
    '264121',   // Korean Folk Village
    '815994',   // Petite France
    '2376049',  // Camp Greaves DMZ
  ],
  Gangwon: [
    '264244',   // Nami Island
    '264248',   // Seoraksan Gwongeumseong Fortress
    '264189',   // Woljeongsa Temple
  ],
  Jeonbuk: [
    '264285',   // Jeonju Hanok Village [Slow City]
  ],
};

/**
 * 전국 대표 명소 — /places/ 첫 화면에서 "뭘 보러 가야 하나"에 답하는 자리.
 * 종류(궁궐·한옥·시장·벽화마을·해변·산·사찰·성곽)와 지역이 겹치지 않게 골랐다.
 */
export const NATIONAL_PICKS: string[] = [
  '264337',   // 경복궁 — Gyeongbokgung Palace, Seoul
  '561382',   // 북촌한옥마을 — Bukchon Hanok Village, Seoul
  '273761',   // 광장시장 — Gwangjang Market, Seoul
  '1998211',  // 감천문화마을 — Gamcheon Culture Village, Busan
  '264155',   // 해운대 — Haeundae Beach, Busan
  '264172',   // 한라산 — Hallasan, Jeju
  '264261',   // 불국사 — Bulguksa Temple, Gyeongbuk [UNESCO]
  '264204',   // 수원화성 — Suwon Hwaseong Fortress, Gyeonggi [UNESCO]
];

const UNESCO = /UNESCO|World Heritage/i;

/** 데이터에서 읽히는 중요도 신호 (낮을수록 앞) */
function signalScore(p: Place): number {
  let s = 100;
  if (UNESCO.test(p.title)) s -= 40;              // 유네스코 세계유산
  if (p.overview && p.overview.length > 400) s -= 20;   // 공사가 길게 쓴 곳 = 대표 명소인 경우가 많다
  else if (p.overview && p.overview.length > 120) s -= 10;
  else if (!p.overview) s += 15;                  // 소개문 없으면 뒤로
  // 이름이 짧고 고유명사인 곳이 대체로 유명하다 (지점명·부속시설은 길다)
  const clean = displayTitle(p.title);
  if (clean.length <= 20) s -= 5;
  if (/branch|center for|institute|office|hall of fame/i.test(clean)) s += 20;
  return s;
}

/** 여행자에게 보여줄 순서로 정렬 */
export function rankPlaces(list: Place[], region?: string): Place[] {
  const picks = region ? (TOP_PICKS[region] ?? []) : [];
  const pickIdx = new Map(picks.map((id, i) => [id, i]));

  return [...list].sort((a, b) => {
    const pa = pickIdx.has(a.id) ? pickIdx.get(a.id)! : 999;
    const pb = pickIdx.has(b.id) ? pickIdx.get(b.id)! : 999;
    if (pa !== pb) return pa - pb;
    const sa = signalScore(a), sb = signalScore(b);
    if (sa !== sb) return sa - sb;
    return a.title.localeCompare(b.title);
  });
}

/** 지역 대표 명소로 지정됐는가 (뱃지 표시용) */
export function isTopPick(p: Place): boolean {
  return Object.values(TOP_PICKS).some(ids => ids.includes(p.id));
}
