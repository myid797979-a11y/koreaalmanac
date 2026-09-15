// 축제 정렬 — 날짜순만으로는 여행자에게 쓸모가 없다.
//
// 홈은 "이번 주말 / 지금 진행중 / 곧 시작"을 전부 시작일 순으로 뽑고 있었다.
// 그 결과 부산불꽃축제와 '금천구 과학축제'가 같은 무게로 나란히 놓였고,
// 'Busan International Port Conference'(B2B 항만 학술대회)까지 첫 화면에 올라왔다.
// 장소(place-rank.ts)에는 이미 같은 이유로 순위가 있는데 축제만 없었다.
//
// 세 단계로 판단한다:
//   1) FESTIVAL_PICKS — 사람이 고른 전국구 축제. 앞에 고정한다.
//   2) 신호 점수 — 갤러리 사진 수·후원기관·소개문 길이처럼 데이터에서 읽히는 것
//   3) 나머지는 시작일순
import type { Festival } from '@/lib/data';

/**
 * 영어권 방문자가 이름을 알거나, 알면 가고 싶어할 전국구 축제.
 * 실제 데이터에서 id 를 확인해 손으로 골랐다.
 *
 * ⚠ 같은 축제가 회차별로 다른 id 를 갖는 경우가 있다(부산불꽃축제 1385298/235076,
 *   진도 신비의바닷길 705394/506909). 어느 회차가 살아 있든 잡히도록 둘 다 넣는다.
 */
export const FESTIVAL_PICKS: string[] = [
  // ── 불꽃·조명
  '235076',    // 부산불꽃축제 Busan Fireworks Festival
  '1385298',   // 부산불꽃축제 (다른 회차)
  '697197',    // 진주남강유등축제 Jinju Namgang Yudeung Festival
  '1095732',   // 서울빛초롱축제 Seoul Lantern Festival
  '3073454',   // 서울라이트 광화문 Seoul Light Gwanghwamun
  '3012095',   // 서울라이트 한강 빛섬 Seoul Light Hangang Bitseom
  '3115770',   // 광안리 M 드론쇼 Gwangalli M Drone Light Show

  // ── 겨울
  '685135',    // 화천산천어축제 Hwacheon Sancheoneo Ice Festival
  '661861',    // 평창송어축제 Pyeongchang Trout Festival
  '679008',    // 대관령눈꽃축제 Daegwallyeong Snow Festival
  '3432658',   // 함평 winter light
  '1490063',   // 여수 향일암 해맞이 Yeosu Hyangiram Sunrise

  // ── 여름·자연
  '697135',    // 보령머드축제 Boryeong Mud Festival
  '705394',    // 진도 신비의바닷길 Jindo Miracle Sea Road
  '506909',    // 진도 신비의바닷길 (다른 회차)
  '697205',    // 무주반딧불축제 Muju Firefly Festival
  '697182',    // 함평나비축제 Hampyeong Butterfly Festival
  '700520',    // 진해군항제 Jinhae Gunhangje (벚꽃)
  '292954',    // 담양대나무축제 Damyang Bamboo Festival
  '1084180',   // 제주올레걷기축제 Jeju Olle Walking Festival

  // ── 문화·예술
  '617992',    // 광주비엔날레 Gwangju Biennale
  '1057670',   // 백제문화제 Baekje Cultural Festival
  '697371',    // 광주김치축제 Gwangju Kimchi Festival
  '1675246',   // 강릉커피축제 Gangneung Coffee Festival
  '697184',    // 하동야생차문화축제 Hadong Wild Tea
  '638576',    // 함평 국화축제 Korea Chrysanthemum Grand Festival

  // ── 서울 상설 (연중 언제 와도 볼 수 있어 첫 방문자에게 가치가 크다)
  '141661',    // 경복궁 수문장 교대의식 Royal Guard-Changing, Gyeongbokgung
  '292853',    // 궁궐 수문장 교대 (다른 회차)
  '292961',    // 덕수궁 수문장 교대 Royal Guard-Changing, Deoksugung
  '3107059',   // 숭례문 파수의식 Sungnyemun Gate Guard Ceremony
  '2809535',   // 남산 봉수의식 Namsan Beacon Ceremony

  // ── 궁궐 야간 프로그램 (표가 빨리 동나는 것들 — 미리 알아야 갈 수 있다)
  '1331175',   // 창덕궁 달빛기행 Moonlight Tour at Changdeokgung
  '2648460',   // 경복궁 별빛야행 Gyeongbokgung Starlight Tour
  '2756396',   // 덕수궁 석조전 음악회 Night at Seokjojeon Hall
];

const PICK_SET = new Set(FESTIVAL_PICKS);

/**
 * 데이터에서 읽히는 중요도 신호 (낮을수록 앞).
 *
 * ⚠ 신호는 거들 뿐이다. 이것만으로는 'Moonlight Workout Busan Challenge' 가
 *   경복궁 수문장 교대보다 위로 온다 — 그래서 FESTIVAL_PICKS 가 먼저다.
 */
function signalScore(f: Festival): number {
  let s = 100;

  // KTO 가 사진을 많이 붙인 축제는 대체로 규모가 크다 (0장 83건 ↔ 8장 82건으로 잘 갈린다)
  const imgs = f.images?.length ?? 0;
  if (imgs >= 8) s -= 25;
  else if (imgs >= 4) s -= 15;
  else if (imgs === 0) s += 15;

  // 문화체육관광부 후원 = 문화관광축제 지정인 경우가 많다
  const sponsor = f.sponsor ?? '';
  if (/Ministry of Culture/i.test(sponsor)) s -= 30;
  else if (/Metropolitan|Province/i.test(sponsor)) s -= 10;

  const ov = f.overview?.length ?? 0;
  if (ov >= 500) s -= 15;
  else if (ov < 200) s += 20;

  if (!f.image) s += 30;          // 대표 사진이 없으면 카드가 빈다
  if (f.homepage) s -= 5;

  // 여행자용이 아닌 것 — 학술대회·산업전·주민 대상 행사
  if (/conference|symposium|forum|fair\b|expo 20|industrial/i.test(f.title)) s += 60;

  return s;
}

/** 여행자에게 보여줄 순서로 정렬. 날짜 우선이 필요한 목록에서는 쓰지 않는다. */
export function rankFestivals(list: Festival[]): Festival[] {
  const idx = new Map(FESTIVAL_PICKS.map((id, i) => [id, i]));
  return [...list].sort((a, b) => {
    const pa = idx.get(a.id) ?? 999;
    const pb = idx.get(b.id) ?? 999;
    if (pa !== pb) return pa - pb;
    const sa = signalScore(a), sb = signalScore(b);
    if (sa !== sb) return sa - sb;
    return (a.start ?? '').localeCompare(b.start ?? '');
  });
}

/** 며칠짜리인가 */
function runDays(f: Festival): number {
  if (!f.start) return 1;
  const d = (x: string) =>
    new Date(Number(x.slice(0, 4)), Number(x.slice(4, 6)) - 1, Number(x.slice(6, 8)));
  return Math.round((d(f.end ?? f.start).getTime() - d(f.start).getTime()) / 86400000) + 1;
}

/**
 * "이번 주말" 처럼 기간이 한정된 자리용 정렬.
 *
 * ⚠ 여기서 rankFestivals 를 그대로 쓰면 안 된다. 수문장 교대·봉수의식 같은 연중 상설이
 *   PICKS 상위라 매번 1등으로 올라오는데, 그건 "이번 주말"의 정보가 아니다
 *   (Trip Planner 도 같은 이유로 짧은 기간을 먼저 둔다).
 *   짧게 열리는 것끼리 먼저 묶고, 그 안에서 중요도로 정렬한다.
 */
export function rankShortFirst(list: Festival[]): Festival[] {
  const bucket = (f: Festival) => {
    const n = runDays(f);
    return n <= 14 ? 0 : n <= 60 ? 1 : n <= 180 ? 2 : 3;
  };
  const ranked = rankFestivals(list);
  const order = new Map(ranked.map((f, i) => [f.id, i]));
  return ranked.sort((a, b) => bucket(a) - bucket(b) || order.get(a.id)! - order.get(b.id)!);
}

/** 전국구 축제로 지정됐는가 (뱃지 표시용) */
export function isTopFestival(f: Festival): boolean {
  return PICK_SET.has(f.id);
}
