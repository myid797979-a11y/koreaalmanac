import placesJson from '@/data/places.json';

// KTO 영문 관광지 — 원문이 영어라 번역이 필요 없다.
// 분류는 Exporter 가 KTO cat3 코드를 여행자 언어 9개로 재편해 넣어준다.
export type Place = {
  id: string; slug: string; title: string;
  cat: PlaceCat; region: string;
  addr: string | null; image: string;
  mapx: string | null; mapy: string | null;
  tel: string | null; overview: string | null;
};

export type PlaceCat =
  | 'heritage' | 'temples' | 'villages' | 'hiking' | 'coast'
  | 'nature' | 'views' | 'neighbourhoods' | 'themeparks' | 'museums'
  | 'markets' | 'shopping' | 'food';

export const places = placesJson as Place[];

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
  { slug: 'markets', cat: 'markets', label: 'Traditional markets',
    blurb: 'Covered alleys of food stalls and fabric traders, harbour fish markets, and five-day markets that appear on set dates and vanish again.' },
  { slug: 'shopping', cat: 'shopping', label: 'Shopping streets & malls',
    blurb: 'Department stores, outlet malls, duty free, and the streets that specialise — antiques in Insadong, jewellery in Jongno, fashion in Dongdaemun.' },
  { slug: 'museums', cat: 'museums', label: 'Museums & galleries',
    blurb: 'National and city museums, art galleries and memorial halls. Many of the national ones are free.' },
];

export const catBySlug = (slug: string) => PLACE_CATS.find(c => c.slug === slug);
export const catMeta = (cat: PlaceCat) => PLACE_CATS.find(c => c.cat === cat)!;

export function placesByCat(cat: PlaceCat): Place[] {
  return places.filter(p => p.cat === cat);
}

export function placesByRegion(region: string): Place[] {
  return places.filter(p => p.region === region);
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
