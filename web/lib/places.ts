import placesJson from '@/data/places.json';
import { okImage } from '@/lib/images';
import { PLACE_NOTES } from '@/lib/place-notes';

// KTO 영문 관광지 — 원문이 영어라 번역이 필요 없다.
// 분류는 Exporter 가 KTO cat3 코드를 여행자 언어 9개로 재편해 넣어준다.
export type Place = {
  id: string; slug: string; title: string;
  cat: PlaceCat; region: string;
  addr: string | null; image: string;
  mapx: string | null; mapy: string | null;
  tel: string | null; overview: string | null;
  // detailIntro2 — 개관시간·휴관일·요금. 아직 수집 중이라 null 인 항목이 많다.
  hours: string | null; closed: string | null; fee: string | null;
  menu: string | null; parking: string | null;
  // lib/place-notes — 사람이 확인해 덧붙인 방문 팁과 확인 날짜 (없으면 undefined)
  tip?: string; checked?: string;
  /** hours/closed/fee 중 하나라도 노트에서 왔는가 (출처 문구용) */
  noted?: boolean;
};

export type PlaceCat =
  | 'heritage' | 'temples' | 'villages' | 'hiking' | 'coast'
  | 'nature' | 'views' | 'neighbourhoods' | 'themeparks' | 'museums'
  | 'markets' | 'shopping' | 'food';

// 깨진 KTO 이미지는 대체 이미지로 (lib/images.ts)
// 보강 노트는 KTO 값이 빈 칸만 채운다 — KTO 가 나중에 채우면 그쪽이 이긴다.
/**
 * KTO 개관정보는 줄바꿈(<br>)이 빠진 채 와서 "09:00-18:00Winter 09:00-17:00" 처럼 붙는다(2026-11-13 점검: 시간 78곳).
 * 구분이 확실한 자리만 띄운다 — 숫자 뒤 대문자, "won" 뒤 대문자·대괄호, 글자 뒤 [구역], ] 뒤 글자.
 * (소문자-대문자 일반 규칙은 "SeoulSky" 같은 고유명사를 깨므로 쓰지 않는다)
 */
function unglue(s: string | null): string | null {
  if (!s) return s;
  return s
    .replace(/(\d)([A-Z])/g, '$1; $2')
    .replace(/\b(won|hrs?|daily)([A-Z[])/g, '$1; $2')
    .replace(/([a-z.)])\[/g, '$1; [')
    .replace(/\]([A-Za-z0-9])/g, '] $1');
}

function withNote(p00: Place): Place {
  // KTO 영문 소개는 문단 구분을 "· ·" 로 넣어 보낸다(278곳) — 문단 나눔(\n\n)으로 바꾸고 상세에서 문단으로 그린다
  const p0 = { ...p00, hours: unglue(p00.hours), closed: unglue(p00.closed), fee: unglue(p00.fee) };
  const p = p0.overview ? { ...p0, overview: p0.overview.replace(/\s*·\s*·\s*/g, '\n\n').trim() } : p0;
  const n = PLACE_NOTES[p.id];
  if (!n) return p;
  const o = !!n.override;   // 확인해 보니 KTO 값이 틀렸을 때 노트가 이긴다
  const noted = ((o || !p.hours) && !!n.hours) || ((o || !p.closed) && !!n.closed) || ((o || !p.fee) && !!n.fee);
  return {
    ...p,
    overview: p.overview || n.overview || null,
    hours: (o ? n.hours || p.hours : p.hours || n.hours) || null,
    closed: (o ? n.closed || p.closed : p.closed || n.closed) || null,
    fee: (o ? n.fee || p.fee : p.fee || n.fee) || null,
    tip: n.tip, checked: n.checked, noted,
  };
}
export const places: Place[] = (placesJson as Place[]).map(p => withNote({ ...p, image: okImage(p.image) }));

export const PLACE_CATS: { slug: string; cat: PlaceCat; label: string; blurb: string }[] = [
  { slug: 'palaces-heritage', cat: 'heritage', label: 'Palaces & heritage',
    blurb: 'Royal palaces, fortress walls, ancient tombs and the sites that carry Korea’s written history.' },
  { slug: 'temples', cat: 'temples', label: 'Temples',
    blurb: 'Buddhist temples, many of them a thousand years old and set deep in the mountains — several are UNESCO World Heritage.' },
  { slug: 'hanok-villages', cat: 'villages', label: 'Hanok & folk villages',
    blurb: 'Preserved villages of tiled-roof hanok houses, from Bukchon in central Seoul to whole settlements still lived in.' },
  { slug: 'hiking', cat: 'hiking', label: 'Hiking & mountains',
    blurb: 'Korea is 70% mountains and they start inside the cities — trails range from a subway-accessible hour to Hallasan’s summit.' },
  { slug: 'beaches-islands', cat: 'coast', label: 'Beaches & islands',
    blurb: 'The east coast’s clear water, the west’s tidal flats, and thousands of islands off the southern shore.' },
  { slug: 'parks-nature', cat: 'nature', label: 'Parks & nature',
    blurb: 'Arboretums, recreation forests, valleys and lakes — the quieter half of the Korean outdoors.' },
  { slug: 'viewpoints', cat: 'views', label: 'Viewpoints',
    blurb: 'Observatories, skywalks, cable cars and towers, from city panoramas to cliff-edge glass floors.' },
  { slug: 'neighbourhoods', cat: 'neighbourhoods', label: 'Neighbourhoods & streets',
    blurb: 'Market alleys, mural villages, book streets and the districts worth walking without a plan.' },
  { slug: 'theme-parks', cat: 'themeparks', label: 'Theme parks & experiences',
    blurb: 'Amusement parks, water parks, hot springs and hands-on farms — the reliable rainy-day and family options.' },
  { slug: 'restaurants', cat: 'food', label: 'Where to eat',
    blurb: 'Restaurants and cafes the Korea Tourism Organization writes up in English — a selective list rather than a directory, strongest in Seoul and the southwest.' },
  { slug: 'markets', cat: 'markets', label: 'Traditional markets',
    blurb: 'Covered alleys of food stalls and fabric traders, harbour fish markets, and five-day markets that appear on set dates and vanish again.' },
  { slug: 'shopping', cat: 'shopping', label: 'Shopping streets & malls',
    blurb: 'Department stores, outlet malls, duty free, and the streets that specialise — antiques in Insadong, jewellery in Jongno, fashion in Dongdaemun.' },
  { slug: 'museums', cat: 'museums', label: 'Museums & galleries',
    blurb: 'National and city museums, art galleries and memorial halls. Many of the national ones are free.' },
];

/**
 * 13개를 한 줄로 늘어놓으면 "알아서 고르세요" 가 된다. 여행자가 실제로 나누는
 * 네 갈래로 묶는다 — 옛 한국 / 야외 / 도시 / 실내.
 */
export const CAT_GROUPS: { title: string; blurb: string; cats: PlaceCat[] }[] = [
  {
    title: 'Old Korea',
    blurb: 'Palaces, mountain temples and tiled-roof villages — the things most people come for.',
    cats: ['heritage', 'temples', 'villages'],
  },
  {
    title: 'The outdoors',
    blurb: 'Korea is 70% mountains with coastline on three sides, and both start inside the cities.',
    cats: ['hiking', 'coast', 'nature', 'views'],
  },
  {
    title: 'City life',
    blurb: 'Where to walk, eat and buy things — the half of a trip that is not sightseeing.',
    cats: ['neighbourhoods', 'markets', 'food', 'shopping'],
  },
  {
    title: 'Indoors, and with children',
    blurb: 'The reliable options for a rainy afternoon or a trip with kids in tow.',
    cats: ['museums', 'themeparks'],
  },
];

export const catBySlug = (slug: string) => PLACE_CATS.find(c => c.slug === slug);
export const catMeta = (cat: PlaceCat) => PLACE_CATS.find(c => c.cat === cat)!;

export function placesByCat(cat: PlaceCat): Place[] {
  return places.filter(p => p.cat === cat);
}

export function placesByRegion(region: string): Place[] {
  return places.filter(p => p.region === region);
}

/**
 * 카드·목록에 쓰는 이름 — 뒤에 붙은 (한글 원제) 를 뗀다.
 *
 * 단순 정규식 /\([^)]*\)$/ 으로는 원제 안에 괄호가 또 있는 414건을 못 뗀다:
 *   "Dynamic Maze (Insa-dong) (다이나믹 메이즈 (서울 인사동점))"
 * 그래서 뒤에서부터 괄호 깊이를 세어 마지막 한 덩어리만 정확히 잘라낸다.
 * 한글이 든 덩어리만 뗀다 — "(Insa-dong)" 같은 영문 보조설명은 남긴다.
 */
export function displayTitle(title: string): string {
  const out = displayTitleParen(title);
  if (!/[가-힣]/.test(out)) return out;
  // 괄호 규칙으로 못 뗀 14곳 (2026-11-13): "[진관사(서울)]", "/ 담다헌 …", 닫히지 않은 "(동해역 (…".
  // 영어 사이트 제목에 한글을 남기지 않는다 — 첫 한글 앞에서 자르고 남은 여는 기호를 정리한다.
  const cut = out.slice(0, out.search(/[가-힣]/)).replace(/[\s([/·-]+$/, '').trim();
  return cut.length >= 3 ? cut : out;
}

function displayTitleParen(title: string): string {
  const s = title.trimEnd();
  if (!s.endsWith(')')) return s;
  let depth = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ')') depth++;
    else if (s[i] === '(') {
      depth--;
      if (depth > 0) continue;
      const inner = s.slice(i + 1, s.length - 1);
      return /[가-힣]/.test(inner) ? displayTitle(s.slice(0, i)) : s;
    }
  }
  return s;
}

/** 상세 페이지 부제로 쓰는 한글 원제 (택시·지도앱에 보여주기 좋다) */
export function koreanName(title: string): string | null {
  const stripped = displayTitle(title);
  if (stripped === title.trimEnd()) return null;
  // "(경복궁)" 외에 "[진관사(서울)]"·"/ 담다헌 …"·닫히지 않은 "(동해역 (…" 도 온다 — 바깥 기호만 벗긴다
  let tail = title.trimEnd().slice(stripped.length).trim().replace(/^[\s([/]+/, '');
  if (/^[^([]*[)\]]$/.test(tail) || (tail.match(/\(/g)?.length ?? 0) < (tail.match(/\)/g)?.length ?? 0)) tail = tail.slice(0, -1);
  else if (tail.endsWith(']')) tail = tail.slice(0, -1);
  tail = tail.trim();
  return tail || null;
}

export function placeById(id: string): Place | undefined {
  return places.find(p => p.id === id);
}

export function placeBySlug(slug: string): Place | undefined {
  return places.find(p => p.slug === slug);
}

export function placeParams(): { slug: string }[] {
  return places.map(p => ({ slug: p.slug }));
}

/** 여행자 수요 순 — 건수순으로 하면 강원(176)이 서울(133)을 앞서 실제 수요와 어긋난다 */
export const REGION_PRIORITY = ['Seoul', 'Busan', 'Jeju', 'Gyeonggi', 'Gangwon', 'Gyeongbuk', 'Incheon'];

export function regionsRanked(): { region: string; n: number }[] {
  const counts = new Map<string, number>();
  for (const p of places) counts.set(p.region, (counts.get(p.region) ?? 0) + 1);
  const all = [...counts.entries()].map(([region, n]) => ({ region, n }));
  return all.sort((a, b) => {
    const ia = REGION_PRIORITY.indexOf(a.region);
    const ib = REGION_PRIORITY.indexOf(b.region);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    return b.n - a.n;
  });
}
