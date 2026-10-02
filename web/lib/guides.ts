// 가이드 목록 — 가이드 인덱스(app/guides)와 홈(app/page)이 같이 쓴다.
// 순서 = 인덱스 노출 순서. 시즌 가이드는 시즌이 지나면 뒤로 내리고, 다음 해 것으로 갈아끼운다.
export type Guide = {
  href: string;
  title: string;
  blurb: string;
  tag: 'Seasonal' | 'Itinerary' | 'How-to';
  photo?: string;   // KTO 장소 슬러그 — 카드 사진을 빌려 쓴다
};

export const GUIDES: Guide[] = [
  {
    href: '/guides/jinju-lantern-festival-2026/',
    title: 'Jinju Lantern Festival 2026: 3–18 October',
    blurb: 'Thousands of lanterns on the river below Jinjuseong Fortress. When to go, what is free, floating a wish lantern, the easy day trip from Busan, and what to do when Jinju’s hotels are full.',
    tag: 'Seasonal',
    photo: 'jinjuseong-fortress-264596',
  },
  {
    href: '/guides/best-festivals-in-korea/',
    title: 'Korea’s best festivals: 20 worth planning a trip around',
    blurb: 'Cherry blossoms, mud, lanterns, fireworks and frozen rivers: the festivals worth crossing the country for, season by season, with this year’s dates or when they usually fall.',
    tag: 'Seasonal',
    photo: 'gyeonghwa-station-cherry-blossom-street-1643702',
  },
  {
    href: '/guides/busan-fireworks-2026/',
    title: 'Busan Fireworks Festival 2026: 7 November',
    blurb: 'Korea’s biggest fireworks over Gwangalli Beach. The free viewing spots and when to claim them, whether paid seats are worth it, the hotel problem, and how to leave with a million other people.',
    tag: 'Seasonal',
    photo: 'busan-gwangandaegyo-bridge-1064834',
  },
  {
    href: '/guides/halloween-seoul-2026/',
    title: 'Halloween in Seoul 2026',
    blurb: 'It falls on a Saturday this year. Where the night actually happens now — Hongdae, the theme parks, the ticketed club parties — how the city manages the crowds since 2022, and what to know before you go to Itaewon.',
    tag: 'Seasonal',
    photo: 'itaewon-shopping-street-273721',
  },
  {
    href: '/guides/skiing-in-korea/',
    title: 'Skiing in Korea 2026–27: which resort, and how to get there',
    blurb: 'Yongpyong and High1 for a proper trip; Vivaldi, Elysian Gangchon and Gonjiam for a day from Seoul. Shuttles, the KTX, day tours with gear, what lifts and rental cost, and the week to avoid.',
    tag: 'Seasonal',
    photo: 'balwangsan-cable-car-3060197',
  },
  {
    href: '/guides/christmas-new-year-seoul/',
    title: 'Christmas & New Year in Seoul 2026–27',
    blurb: 'Both holidays fall on a Friday this year. The Bosingak bell at midnight, a month of lantern and light festivals, the 1,000-won ice rink, and the east-coast sunrise trains that sell out in minutes.',
    tag: 'Seasonal',
    photo: 'cheonggyecheon-stream-897540',
  },
  {
    href: '/guides/seollal-2027/',
    title: 'Seollal 2027: 6–9 February',
    blurb: 'The lunar new year is a day later than China’s this year. What closes, what opens free, why the palace closing days flip, and why it is secretly a good week to be in Seoul.',
    tag: 'Seasonal',
    photo: 'namsangol-hanok-village-264116',
  },
  {
    href: '/guides/cherry-blossom-2027/',
    title: 'Cherry blossom 2027: planning before the forecast',
    blurb: 'The forecast arrives in late February. Until then: how the front moves from Jeju to Seoul, what the last six years actually did, and how to book a trip to a date that does not exist yet.',
    tag: 'Seasonal',
    photo: 'yeouido-hangang-park-1064767',
  },
  {
    href: '/guides/korea-in-winter/',
    title: 'Korea in winter 2026–27',
    blurb: 'Cold and dry rather than snowy — and Seollal lands on 7 February 2027, which moves the palace closing days. Ice festivals, ski timing, and the week to plan around.',
    tag: 'Seasonal',
    photo: 'wondae-ri-birch-forest-whispering-birch-forest-2475952',
  },
  {
    href: '/guides/autumn-foliage/',
    title: 'Korea autumn foliage 2026',
    blurb: 'Peak dates run late this year — Seoraksan 16–25 Oct, Seoul and the south into mid-November. Where to go, and why the cable-car queue decides your day.',
    tag: 'Seasonal',
    photo: 'seoraksan-ulsanbawi-rock-264169',
  },
  {
    href: '/guides/baseball-in-korea/',
    title: 'How to see a baseball game in Korea',
    blurb: 'The cheering, the chicken, the ₩15,000 seats and the honest way for a foreigner to get a ticket. Ten teams, nine stadiums, plus a note on K League football.',
    tag: 'How-to',
    photo: 'gocheok-sky-dome-3006386',
  },
  {
    href: '/guides/kpop-award-shows/',
    title: 'K-pop award shows 2026–27: dates and how to get in',
    blurb: 'KGMA and the Melon Music Awards on back-to-back November weekends in Seoul, the broadcasters’ December festivals, and the big ones abroad this year. How tickets work and how to plan a trip around them.',
    tag: 'Seasonal',
    photo: 'olympic-park-789703',
  },
  {
    href: '/guides/korean-spa-jjimjilbang/',
    title: 'Korean spas and jjimjilbang: how they work',
    blurb: 'The nude bathing floors and the clothed sauna hall, the order of things at the door, the body scrub, sleeping over, tattoos, and the best spas in Seoul, Incheon and Busan.',
    tag: 'How-to',
    photo: 'spaland-centum-city-1000306',
  },
  {
    href: '/guides/templestay-korea/',
    title: 'Templestay in Korea: a night in a Buddhist temple',
    blurb: 'Day programmes and overnight stays, the 4am dawn service, 108 bows and the four-bowl monastic meal. What it costs, what to bring, and which temple to choose.',
    tag: 'How-to',
    photo: 'hapcheon-haeinsa-temple-264238',
  },
  {
    href: '/guides/rainy-day-seoul/',
    title: 'Rainy day in Seoul: indoor things to do',
    blurb: 'Free national museums, the War Memorial, Starfield Library and COEX, Lotte World and its aquarium, a bathhouse afternoon and the underground malls.',
    tag: 'How-to',
    photo: 'national-museum-of-korea-268137',
  },
  {
    href: '/guides/korea-with-kids/',
    title: 'Korea with kids',
    blurb: 'The free children’s museums and zoo in Seoul, theme parks, aquariums and Jeju, strollers on the subway, children’s fares, family rooms and food for fussy eaters.',
    tag: 'How-to',
    photo: 'seoul-children-s-grand-park-1051832',
  },
  {
    href: '/guides/seoul-markets/',
    title: 'Seoul’s traditional markets: what to eat at each',
    blurb: 'Gwangjang, Namdaemun, Tongin, Mangwon, Gyeongdong and Noryangjin: the dish to order at each, when to go, and how to eat at a market stall.',
    tag: 'How-to',
    photo: 'mangwon-market-2592401',
  },
  {
    href: '/guides/busan-food-guide/',
    title: 'What to eat in Busan',
    blurb: 'Dwaeji gukbap, milmyeon, ssiat hotteok, fish cake and raw fish at Jagalchi and Gwangalli, and the food streets of Nampo, Seomyeon and Haeundae.',
    tag: 'How-to',
    photo: 'jagalchi-market-2382544',
  },
  {
    href: '/guides/hiking-in-seoul/',
    title: 'Hiking in Seoul',
    blurb: 'Bukhansan’s granite summit, the sunset climb up Inwangsan, easy Achasan, the Bugaksan city wall and Gwanaksan: routes, difficulty and how to get there.',
    tag: 'How-to',
    photo: 'bukhansan-national-park-seoul-district-1747593',
  },
  {
    href: '/guides/seoul-cafes/',
    title: 'Seoul café guide',
    blurb: 'Warehouse cafés in Seongsu, hanok cafés in Ikseon-dong, Yeonnam’s bakeries and Hannam’s roasters, bingsu in summer and how café culture works.',
    tag: 'How-to',
    photo: 'yeonnam-dong-2484384',
  },
  {
    href: '/guides/korean-food-guide/',
    title: 'Eating in Korea: what to order and how it works',
    blurb: 'Free side dishes, the call bell, the two-portion rule and paying at the counter. The dishes worth ordering, what they cost, the Seoul food markets to start with, and eating as a vegetarian.',
    tag: 'How-to',
    photo: 'gwangjang-market-273761',
  },
  {
    href: '/guides/seoul-shopping/',
    title: 'Shopping in Seoul: where to go for what',
    blurb: 'Myeongdong, Hongdae, Seongsu, Dongdaemun, Gangnam and Insadong by what each is good for. K-beauty, K-pop albums, the instant tax refund, the airport kiosks and duty free.',
    tag: 'How-to',
    photo: 'myeong-dong-264312',
  },
  {
    href: '/guides/seoul-palaces/',
    title: 'Seoul’s five palaces: which to see, and when',
    blurb: 'Tuesday closes two, Monday closes three. Which palace to choose, free entry in hanbok, the guard ceremony times, the Secret Garden ticket, and the palaces you can visit after dark.',
    tag: 'How-to',
    photo: 'changdeokgung-palace-complex-unesco-world-heritage-site-264348',
  },
  {
    href: '/guides/day-trips-from-seoul/',
    title: 'Day trips from Seoul: 12 that work without a car',
    blurb: 'Six an hour away on the subway, six by KTX, bus or tour. Suwon, Nami, the DMZ, Namhansanseong, Incheon, Yangpyeong, and the fast trains to Gangneung and Jeonju — which to pick for your season.',
    tag: 'Itinerary',
    photo: 'yangpyeong-dumulmeori-1272552',
  },
  {
    href: '/guides/suwon-day-trip/',
    title: 'A day trip to Suwon: Hwaseong Fortress and the palace',
    blurb: 'The UNESCO fortress an hour from Seoul on the subway. Which way round the 5.7 km wall, the palace martial-arts show, galbi or chicken for dinner, and the Hwaseong Festival on 4–11 October.',
    tag: 'Itinerary',
    photo: 'suwon-hwaseong-fortress-unesco-world-heritage-264204',
  },
  {
    href: '/guides/nami-island-day-trip/',
    title: 'A day trip to Nami Island from Seoul',
    blurb: 'Easy on your own by train, but the places people pair it with are not. When a tour makes sense, the ferry or the zip wire, the gold ginkgo weeks, and dakgalbi in Chuncheon on the way back.',
    tag: 'Itinerary',
    photo: 'nami-island-264244',
  },
  {
    href: '/guides/everland-vs-lotte-world/',
    title: 'Everland or Lotte World? Choosing a Seoul theme park',
    blurb: 'An hour out to the big outdoor coasters and safari, or indoors at a subway station in Seoul. Getting there, the paid queue passes, cheaper tickets, and the weeks the school trips take over.',
    tag: 'How-to',
    photo: 'everland-264235',
  },
  {
    href: '/guides/dmz-tour-from-seoul/',
    title: 'A DMZ tour from Seoul: what you actually see',
    blurb: 'Imjingak, the Third Tunnel and Dora Observatory explained honestly — what needs a tour and what does not, the JSA question, Cheorwon and Goseong as quieter alternatives, and the passport rule.',
    tag: 'How-to',
    photo: 'imjingak-resort-pyeonghwa-nuri-park-264487',
  },
  {
    href: '/guides/korea-entry-requirements/',
    title: 'Korea entry requirements 2026: K-ETA, e-Arrival Card and customs',
    blurb: 'Who is exempt from the K-ETA until 31 December 2026, the online arrival card to file within three days of landing, the official sites and the look-alikes, and the customs allowances.',
    tag: 'How-to',
    photo: 'sungnyemun-gate-264257',
  },
  {
    href: '/guides/where-to-stay-in-seoul/',
    title: 'Where to stay in Seoul: the neighbourhoods compared',
    blurb: 'Myeongdong, Jongno, Hongdae, Gangnam, Seongsu, Itaewon, Dongdaemun, Jamsil and Seoul Station: what each is good for, what to watch out for, and how it connects to the airport.',
    tag: 'How-to',
    photo: 'ikseon-dong-hanok-street-2943972',
  },
  {
    href: '/guides/getting-around-seoul/',
    title: 'Getting around Seoul: cards, subway, buses and taxis',
    blurb: 'T-money and the travel cards, how the subway and buses work, free transfers, last trains and night buses, and taxis with Kakao T.',
    tag: 'How-to',
    photo: 'seoul-namsan-park-264320',
  },
  {
    href: '/guides/esim-and-apps-for-korea/',
    title: 'eSIM, SIM or pocket Wi-Fi for Korea, and the apps to install',
    blurb: 'Which connection to choose, and why Naver Map or KakaoMap beats Google Maps here. Kakao T, Papago and the subway app, and the Korean-number problem.',
    tag: 'How-to',
    photo: 'lotte-world-tower-seoul-sky-2493015',
  },
  {
    href: '/guides/hanbok-rental/',
    title: 'Hanbok rental in Seoul: where, how much, and what you get',
    blurb: 'The shops by Gyeongbokgung and Bukchon, what two to four hours costs, traditional versus modern styles, free palace entry and winter layers.',
    tag: 'How-to',
    photo: 'hanboknam-gyeongbokgung-branch-2593860',
  },
  {
    href: '/guides/where-to-stay-in-busan/',
    title: 'Where to stay in Busan',
    blurb: 'Haeundae for the beach, Gwangalli for the bridge and the fireworks, Seomyeon for transport and food, Nampo for the old port and markets.',
    tag: 'How-to',
    photo: 'haeundae-beach-264155',
  },
  {
    href: '/guides/incheon-airport-layover/',
    title: 'An Incheon Airport layover: what you can actually do',
    blurb: 'The free transit tours for 4–24 hour stopovers, whether Seoul is reachable and back, the paperwork to leave the airport, and what to do if you stay airside.',
    tag: 'How-to',
    photo: 'deoksugung-palace-264316',
  },
  {
    href: '/guides/incheon-airport-to-seoul/',
    title: 'Incheon Airport to Seoul: train, bus or taxi',
    blurb: 'Which way in depends on where your hotel is, not the price. The AREX express and all-stop, limousine buses and taxis compared, the first-hour checklist, and what to do if you land after midnight.',
    tag: 'How-to',
    photo: 'gwanghwamun-square-929909',
  },
  {
    href: '/guides/korea-on-a-budget/',
    title: 'Korea on a budget: what things cost in 2026',
    blurb: 'Real prices for transport, food, beds and sights, three daily budgets from ₩60,000, and honest verdicts on the passes — most of the best things here are free or nearly.',
    tag: 'How-to',
    photo: 'tongin-market-1823985',
  },
  {
    href: '/guides/seoul-nightlife/',
    title: 'Seoul after dark: where to go by neighbourhood',
    blurb: 'Hongdae, Itaewon, Gangnam, Seongsu, Euljiro and the river — what each is for, what it costs, the 19+ passport rule, and how to get home after the last train.',
    tag: 'How-to',
    photo: 'banpo-bridge-rainbow-fountain-1011983',
  },
  {
    href: '/venues/',
    title: 'Concert venues: getting there, what to expect, where to stay',
    blurb: 'Goyang Stadium, INSPIRE Arena, Olympic Park, KINTEX, Gocheok Sky Dome, the Sejong Center, BEXCO and eight more — the nearest station, the route from Incheon Airport, and the trick for getting out afterwards.',
    tag: 'How-to',
    photo: 'sejong-center-268132',
  },
  {
    href: '/guides/korea-7-day-itinerary/',
    title: '7 days in Korea: Seoul, Gyeongju and Busan',
    blurb: 'Three days in Seoul, a day trip out, the Silla capital and the coast, all by KTX. The order that avoids the closing days, and variations for autumn, winter and K-pop trips.',
    tag: 'Itinerary',
    photo: 'gyeongju-bulguksa-temple-unesco-world-heritage-264261',
  },
  {
    href: '/guides/seoul-3-days/',
    title: '3 days in Seoul',
    blurb: 'A first-timer route built around the palace closing days and Bukchon’s 5pm curfew — the two things that break most published itineraries.',
    tag: 'Itinerary',
    photo: 'gyeongbokgung-palace-264337',
  },
  {
    href: '/guides/jeju-3-days/',
    title: '3 days in Jeju',
    blurb: 'What to sort before you fly: the driving-licence rule that catches foreigners at the rental desk, Hallasan summit permits, and Manjanggul’s 2026 reopening that most guides missed.',
    tag: 'Itinerary',
    photo: 'hallasan-mountain-264172',
  },
  {
    href: '/guides/busan-2-days/',
    title: '2 days in Busan',
    blurb: 'Split the way the city is — old town west, beaches east. With the Taejongdae train suspension, Jagalchi’s Tuesday closures, and why the Sky Capsule price is per capsule, not per person.',
    tag: 'Itinerary',
    photo: 'busan-gamcheon-culture-village-1998211',
  },
  {
    href: '/guides/jeonju-2-days/',
    title: '2 days in Jeonju',
    blurb: 'Korea’s largest hanok village, the Joseon founder’s shrine, a 1914 cathedral, bibimbap at the source and a makgeolli table that keeps filling. With the KTX from Seoul and why to stay the night.',
    tag: 'Itinerary',
    photo: 'jeonju-hanok-village-slow-city-264285',
  },
  {
    href: '/guides/gangneung-sokcho-2-days/',
    title: '2 days on the east coast: Gangneung and Sokcho',
    blurb: 'The KTX to the sea, Gyeongpo Beach and the Anmok coffee coast, seawater tofu, then the Sokcho fish market and the Seoraksan cable car before the queues.',
    tag: 'Itinerary',
    photo: 'gangneung-gyeongpo-beach-264253',
  },
  {
    href: '/guides/andong-hahoe-village/',
    title: 'Andong and Hahoe Village',
    blurb: 'The UNESCO clan village in a bend of the river, the Hahoe mask dance, Byeongsan Seowon, jjimdak and Andong soju, and why to spend the night in a village house.',
    tag: 'Itinerary',
    photo: 'andong-hahoe-village-unesco-world-heritage-264148',
  },
  {
    href: '/guides/gyeongju-2-days/',
    title: '2 days in Gyeongju',
    blurb: 'The Silla capital stopped charging admission in 2023 and most guides never noticed. Downtown is 2 km end to end on foot; Bulguksa is the one bus ride, and the Seokguram shuttle runs hourly.',
    tag: 'Itinerary',
    photo: 'gyeongju-daereungwon-ancient-tomb-complex-2818690',
  },
  {
    href: '/guides/kpop-tickets/',
    title: 'How to buy K-pop concert tickets as a foreigner',
    blurb: 'Which platforms actually sell to overseas buyers, how the presale queue works, and why resold tickets get voided at the door.',
    tag: 'How-to',
    photo: 'kt-g-sangsangmadang-arts-space-hongik-university-kt-g-733295',
  },
];

/**
 * 가이드 목록(app/guides)의 묶음. 한 페이지 안의 구역이다 — 분류별 URL 은 만들지 않는다
 * (얇은 목록 페이지는 크롤 예산만 먹는다. 한 묶음이 15편을 넘고 그 자체가 검색어가 될 때 다시 판단).
 * tag 로 기본 배정하고, How-to 는 아래 목록으로 '도착 전 준비'·'K-팝·공연'을 떼어 낸다. 나머지는 '체험'.
 */
export const GUIDE_GROUPS = [
  { id: 'seasons',     label: 'Seasons and events' },
  { id: 'itineraries', label: 'Itineraries and day trips' },
  { id: 'before',      label: 'Before you go' },
  { id: 'experiences', label: 'Things to do' },
  { id: 'kpop',        label: 'K-pop and live shows' },
] as const;
const BEFORE = ['/guides/incheon-airport-layover/', '/guides/where-to-stay-in-busan/', '/guides/korea-entry-requirements/', '/guides/esim-and-apps-for-korea/', '/guides/incheon-airport-to-seoul/', '/guides/getting-around-seoul/', '/guides/where-to-stay-in-seoul/', '/guides/korea-on-a-budget/'];
const KPOP = ['/guides/kpop-tickets/', '/guides/kpop-award-shows/', '/venues/'];
export function guideGroup(g: Guide): (typeof GUIDE_GROUPS)[number]['id'] {
  if (KPOP.includes(g.href)) return 'kpop';
  if (g.tag === 'Seasonal') return 'seasons';
  if (g.tag === 'Itinerary') return 'itineraries';
  if (BEFORE.includes(g.href)) return 'before';
  return 'experiences';
}

/** 첫 여행 준비 — 홈과 월 허브 하단에 한 줄 링크로. 시즌과 무관하게 늘 필요한 것들 */
export const FIRST_TRIP: { href: string; label: string }[] = [
  { href: '/guides/korea-entry-requirements/', label: 'Entry requirements 2026' },
  { href: '/guides/esim-and-apps-for-korea/', label: 'eSIM and apps' },
  { href: '/guides/incheon-airport-to-seoul/', label: 'Airport to Seoul' },
  { href: '/guides/getting-around-seoul/', label: 'Getting around Seoul' },
  { href: '/guides/where-to-stay-in-seoul/', label: 'Where to stay in Seoul' },
  { href: '/guides/korea-7-day-itinerary/', label: '7 days in Korea' },
  { href: '/guides/korea-on-a-budget/', label: 'Korea on a budget' },
];

/** 홈에 보여줄 것 — 지금 시즌에 맞는 넷 */
export const HOME_GUIDE_HREFS = [
  '/guides/jinju-lantern-festival-2026/',
  '/guides/suwon-day-trip/',
  '/guides/halloween-seoul-2026/',
  '/guides/autumn-foliage/',
];

/** 장소 id → 그 장소를 다룬 가이드 (장소 상세에서 안내) */
export const PLACE_GUIDE: Record<string, string> = {
  '264487': '/guides/dmz-tour-from-seoul/',    // Imjingak
  '3491461': '/guides/dmz-tour-from-seoul/',   // Peace Gondola
  '2376049': '/guides/dmz-tour-from-seoul/',   // Camp Greaves
  '1847807': '/guides/dmz-tour-from-seoul/',   // Dorasan Station
  '264489': '/guides/dmz-tour-from-seoul/',    // Odusan Observatory
  '264161': '/guides/dmz-tour-from-seoul/',    // Goseong Unification Observatory
  '264596': '/guides/jinju-lantern-festival-2026/', // Jinjuseong Fortress
  '264250': '/guides/busan-fireworks-2026/',   // Gwangalli Beach
  '264261': '/guides/gyeongju-2-days/',        // Bulguksa
  '264367': '/guides/gyeongju-2-days/',        // Donggung & Wolji
  '3006386': '/guides/baseball-in-korea/',     // Gocheok Sky Dome
  '264244':  '/guides/nami-island-day-trip/',   // Nami Island
  '815994':  '/guides/nami-island-day-trip/',   // Petite France
  '264212':  '/guides/nami-island-day-trip/',   // Garden of Morning Calm
  '2813153': '/guides/nami-island-day-trip/',   // Alpaca World
  '264204':  '/guides/suwon-day-trip/',         // Suwon Hwaseong
  '264410':  '/guides/suwon-day-trip/',         // Hwaseong Haenggung
  '264387':  '/guides/suwon-day-trip/',         // Paldalmun
  '264395':  '/guides/suwon-day-trip/',         // Hwahongmun
  '2617703': '/guides/suwon-day-trip/',         // Banghwasuryujeong
  '264403':  '/guides/suwon-day-trip/',         // Hwaseong trolley
  '264235':  '/guides/everland-vs-lotte-world/', // Everland
  '264152':  '/guides/everland-vs-lotte-world/', // Lotte World
  '264361':  '/guides/everland-vs-lotte-world/', // Caribbean Bay
  '3340568': '/guides/everland-vs-lotte-world/', // Everland Rocksville
  '264337':  '/guides/seoul-palaces/',         // Gyeongbokgung
  '264348':  '/guides/seoul-palaces/',         // Changdeokgung
  '264350':  '/guides/seoul-palaces/',         // Changgyeonggung
  '264316':  '/guides/seoul-palaces/',         // Deoksugung
  '264351':  '/guides/seoul-palaces/',         // Jongmyo
  '264329':  '/guides/seoul-palaces/',         // Gwanghwamun
  '2033085': '/guides/seoul-palaces/',         // Changdeokgung Injeongmun
  '1942577': '/guides/seoul-palaces/',         // Daehanmun
  '273761':  '/guides/korean-food-guide/',      // Gwangjang Market
  '1823985': '/guides/korean-food-guide/',      // Tongin Market
  '2592401': '/guides/korean-food-guide/',      // Mangwon Market
  '2590278': '/guides/korean-food-guide/',      // Dak Hanmari Alley
  '3013976': '/guides/korean-food-guide/',      // Euljiro Nogari Alley
  '1838143': '/guides/korean-food-guide/',      // Sindang-dong Tteokbokki
  '3403035': '/guides/korean-food-guide/',      // Jongno 3-ga Pocha Street
  '264312':  '/guides/seoul-shopping/',         // Myeongdong
  '273801':  '/guides/seoul-shopping/',         // Lotte Duty Free Myeongdong
  '1984968': '/guides/seoul-shopping/',         // Starfield COEX Mall
  '2946682': '/guides/seoul-shopping/',         // Seongsu shoe street
  '1323377': '/guides/seoul-shopping/',         // Garosu-gil
  '273734':  '/guides/seoul-shopping/',         // Dongdaemun Shopping Town
  '3075115': '/guides/seoul-shopping/',         // Insadong
  '1000306': '/guides/korean-spa-jjimjilbang/',  // Spa Land Centum City
  '3108186': '/guides/korean-spa-jjimjilbang/',  // Paradise City Cimer
  '3107207': '/guides/korean-spa-jjimjilbang/',  // Aquafield Goyang
  '3405270': '/guides/korean-spa-jjimjilbang/',  // Park Habio
  '610302':  '/guides/korean-spa-jjimjilbang/',  // Spa Lei
  '264238':  '/guides/templestay-korea/',        // Haeinsa
  '264189':  '/guides/templestay-korea/',        // Woljeongsa
  '264304':  '/guides/templestay-korea/',        // Songgwangsa
  '264216':  '/guides/templestay-korea/',        // Tongdosa
  '264285':  '/guides/jeonju-2-days/',           // Jeonju Hanok Village
  '264419':  '/guides/jeonju-2-days/',           // Gyeonggijeon
  '264421':  '/guides/jeonju-2-days/',           // Jeondong Cathedral
  '1945427': '/guides/jeonju-2-days/',           // Nambu Market
  '3116081': '/guides/jeonju-2-days/',           // Jaman Mural Village
  '3510771': '/guides/jeonju-2-days/',           // Makgeolli street
  '2593860': '/guides/hanbok-rental/',          // Hanboknam Gyeongbokgung
  '2475947': '/guides/gangneung-sokcho-2-days/', // Gangneung coffee street
  '264191':  '/guides/gangneung-sokcho-2-days/', // Ojukheon
  '264248':  '/guides/gangneung-sokcho-2-days/', // Gwongeumseong / cable car
  '1955432': '/guides/gangneung-sokcho-2-days/', // Sokcho fish market
  '264130':  '/guides/gangneung-sokcho-2-days/', // Sokcho Beach
  '2693549': '/guides/gangneung-sokcho-2-days/', // Chodang sundubu
  '268137':  '/guides/rainy-day-seoul/',        // National Museum of Korea
  '268131':  '/guides/rainy-day-seoul/',        // War Memorial
  '268127':  '/guides/rainy-day-seoul/',        // Seoul Museum of History
  '2642344': '/guides/rainy-day-seoul/',        // Starfield Library
  '1051832': '/guides/korea-with-kids/',        // Seoul Children's Grand Park
  '1215579': '/guides/korea-with-kids/',        // Children's Museum (NMK)
  '1905560': '/guides/korea-with-kids/',        // Seoul Children's Museum
  '2823618': '/guides/korea-with-kids/',        // Snoopy Garden
  '264155':  '/guides/where-to-stay-in-busan/', // Haeundae Beach
  '789805':  '/guides/where-to-stay-in-busan/', // BIFF Square
  '264148':  '/guides/andong-hahoe-village/',   // Hahoe Village
  '264458':  '/guides/andong-hahoe-village/',   // Byeongsan Seowon
  '268220':  '/guides/andong-hahoe-village/',   // Hahoe Mask Museum
  '2944525': '/guides/andong-hahoe-village/',   // Andong jjimdak alley
  '1767851': '/guides/andong-hahoe-village/',   // Woryeonggyo Bridge
  '2382544': '/guides/busan-food-guide/',       // Jagalchi Market
  '1024670': '/guides/busan-food-guide/',       // Gukje Market food street
  '1468918': '/guides/busan-food-guide/',       // Haeundae Market
  '1747593': '/guides/hiking-in-seoul/',        // Bukhansan
  '1348417': '/guides/hiking-in-seoul/',        // Inwangsan
  '1349267': '/guides/hiking-in-seoul/',        // Achasan
  '1061818': '/guides/hiking-in-seoul/',        // Bugaksan
  '1562674': '/guides/hiking-in-seoul/',        // Gwanaksan
  '2484384': '/guides/seoul-cafes/',            // Yeonnam-dong
  '3046389': '/guides/seoul-markets/',          // Starbucks Gyeongdong Market
  '264362':  '/guides/day-trips-from-seoul/',   // Namhansanseong
  '1272552': '/guides/day-trips-from-seoul/',   // Dumulmeori
  '3113166': '/guides/day-trips-from-seoul/',   // Gwangmyeong Cave
  '264513':  '/guides/day-trips-from-seoul/',   // Incheon Chinatown
  '264305':  '/guides/day-trips-from-seoul/',   // Wolmido
};

/** 지역 허브(축제·지역 페이지) → 그 지역 가이드 */
export const REGION_GUIDES: Record<string, string[]> = {
  Seoul:     ['/guides/seoul-3-days/', '/guides/where-to-stay-in-seoul/', '/guides/seoul-palaces/', '/guides/korean-food-guide/', '/guides/getting-around-seoul/', '/guides/halloween-seoul-2026/'],
  Busan:     ['/guides/busan-2-days/', '/guides/where-to-stay-in-busan/', '/guides/busan-food-guide/', '/guides/busan-fireworks-2026/', '/guides/korean-spa-jjimjilbang/'],
  Gyeongnam: ['/guides/jinju-lantern-festival-2026/', '/guides/templestay-korea/', '/guides/cherry-blossom-2027/'],
  Gyeongbuk: ['/guides/gyeongju-2-days/', '/guides/andong-hahoe-village/'],
  Jeju:      ['/guides/jeju-3-days/'],
  Gangwon:   ['/guides/gangneung-sokcho-2-days/', '/guides/skiing-in-korea/', '/guides/nami-island-day-trip/', '/guides/korea-in-winter/', '/guides/autumn-foliage/'],
  Gyeonggi:  ['/guides/day-trips-from-seoul/', '/guides/suwon-day-trip/', '/guides/everland-vs-lotte-world/', '/guides/nami-island-day-trip/', '/guides/dmz-tour-from-seoul/', '/venues/'],
  Jeonbuk:   ['/guides/jeonju-2-days/', '/guides/templestay-korea/'],
  Jeonnam:   ['/guides/templestay-korea/'],
  Incheon:   ['/guides/incheon-airport-layover/', '/guides/incheon-airport-to-seoul/', '/guides/day-trips-from-seoul/', '/venues/'],
};

/** 축제 id → 그 축제를 다룬 가이드 (축제 상세 페이지에서 링크) */
export const FESTIVAL_GUIDE: Record<string, string> = {
  '235076': '/guides/busan-fireworks-2026/',
  '1385298': '/guides/busan-fireworks-2026/',
  '685135': '/guides/korea-in-winter/',
  '700520': '/guides/cherry-blossom-2027/',
  '697197': '/guides/jinju-lantern-festival-2026/',
  '4113182': '/guides/jinju-lantern-festival-2026/',
  '978249':  '/guides/suwon-day-trip/',        // 수원화성문화제
  '2657619': '/guides/suwon-day-trip/',        // 화성행궁 야간개장
  '697123': '/guides/andong-hahoe-village/',
  '1057670': '/guides/best-festivals-in-korea/',
  '697135': '/guides/best-festivals-in-korea/',
  '700867': '/guides/best-festivals-in-korea/',
  '697189': '/guides/best-festivals-in-korea/',
  '679008': '/guides/best-festivals-in-korea/',
  '292954': '/guides/best-festivals-in-korea/',
  '1675246': '/guides/best-festivals-in-korea/',
  '293155': '/guides/best-festivals-in-korea/',
  '697182': '/guides/best-festivals-in-korea/',
  '667418': '/guides/best-festivals-in-korea/',
  '697205': '/guides/best-festivals-in-korea/',
  '661861': '/guides/best-festivals-in-korea/',
  '1718137': '/guides/best-festivals-in-korea/',
  '2874909': '/guides/best-festivals-in-korea/',
  '3487931': '/guides/jeonju-2-days/',          // 전주한옥마을 퍼레이드
  '2394700': '/guides/jeonju-2-days/',          // 전주 문화유산 야행
  '506838':  '/guides/jeonju-2-days/',          // 전주 한지산업대전
  '2757751': '/guides/jeonju-2-days/',          // 전주 거리 인형극 축제
  '2648460': '/guides/seoul-palaces/',          // 경복궁 별빛야행
  '2756396': '/guides/seoul-palaces/',          // 덕수궁 석조전 야간
  '2818138': '/guides/seoul-palaces/',          // 창경궁 야연
  '1331175': '/guides/seoul-palaces/',          // 창덕궁 달빛기행
  '292961':  '/guides/seoul-palaces/',          // 덕수궁 수문장 교대
};

/** 월 허브에 보여줄 가이드 — 그 달에 검색하는 사람이 실제로 필요로 하는 순서 */
export const MONTH_GUIDES: string[][] = [
  ['/guides/korea-in-winter/', '/guides/skiing-in-korea/', '/guides/christmas-new-year-seoul/', '/guides/seollal-2027/'],   // Jan
  ['/guides/seollal-2027/', '/guides/korea-in-winter/', '/guides/skiing-in-korea/', '/guides/cherry-blossom-2027/'],       // Feb
  ['/guides/cherry-blossom-2027/', '/guides/korea-on-a-budget/', '/guides/seoul-nightlife/'],                                // Mar
  ['/guides/cherry-blossom-2027/', '/guides/seoul-palaces/', '/guides/baseball-in-korea/', '/guides/korea-on-a-budget/'], // Apr
  ['/guides/baseball-in-korea/', '/guides/korea-on-a-budget/', '/guides/seoul-nightlife/'],                                  // May
  ['/guides/baseball-in-korea/', '/guides/everland-vs-lotte-world/', '/guides/korea-on-a-budget/', '/guides/seoul-nightlife/'], // Jun
  ['/guides/rainy-day-seoul/', '/guides/baseball-in-korea/', '/guides/everland-vs-lotte-world/', '/guides/korea-on-a-budget/'], // Jul
  ['/guides/baseball-in-korea/', '/guides/everland-vs-lotte-world/', '/guides/korea-on-a-budget/', '/guides/seoul-nightlife/'], // Aug
  ['/guides/seoul-palaces/', '/guides/baseball-in-korea/', '/guides/autumn-foliage/', '/guides/korea-on-a-budget/'], // Sep
  ['/guides/jinju-lantern-festival-2026/', '/guides/suwon-day-trip/', '/guides/autumn-foliage/', '/guides/halloween-seoul-2026/', '/guides/busan-fireworks-2026/'], // Oct
  ['/guides/kpop-award-shows/', '/guides/busan-fireworks-2026/', '/guides/autumn-foliage/', '/guides/nami-island-day-trip/'], // Nov
  ['/guides/christmas-new-year-seoul/', '/guides/korea-in-winter/', '/guides/skiing-in-korea/', '/guides/kpop-award-shows/'],                                             // Dec
];

/**
 * Article 구조화 데이터용 날짜 (git 최초 커밋일 / 마지막 본문 수정일).
 * ⚠ 본문을 고치면 updated 를 손으로 올린다 — 자동이 아니다. 링크만 고친 경우는 그대로 둔다.
 */
export const GUIDE_DATES: Record<string, { published: string; updated: string }> = {
  '/guides/busan-fireworks-2026/':     { published: '2026-09-29', updated: '2026-09-29' },
  '/guides/jinju-lantern-festival-2026/': { published: '2026-09-29', updated: '2026-09-29' },
  '/guides/incheon-airport-to-seoul/': { published: '2026-09-29', updated: '2026-09-29' },
  '/guides/dmz-tour-from-seoul/':      { published: '2026-09-29', updated: '2026-09-29' },
  '/guides/nami-island-day-trip/':     { published: '2026-09-29', updated: '2026-09-30' },
  '/guides/suwon-day-trip/':           { published: '2026-09-29', updated: '2026-09-30' },
  '/guides/everland-vs-lotte-world/':  { published: '2026-09-29', updated: '2026-09-29' },
  '/guides/day-trips-from-seoul/':     { published: '2026-09-29', updated: '2026-09-29' },
  '/guides/seoul-palaces/':            { published: '2026-09-29', updated: '2026-09-30' },
  '/guides/korean-food-guide/':        { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/seoul-shopping/':           { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/kpop-award-shows/':         { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/skiing-in-korea/':          { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/korean-spa-jjimjilbang/':   { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/templestay-korea/':         { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/jeonju-2-days/':            { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/incheon-airport-layover/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/andong-hahoe-village/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/seoul-markets/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/busan-food-guide/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/hiking-in-seoul/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/seoul-cafes/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/where-to-stay-in-busan/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/rainy-day-seoul/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/korea-with-kids/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/best-festivals-in-korea/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/where-to-stay-in-seoul/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/esim-and-apps-for-korea/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/getting-around-seoul/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/korea-7-day-itinerary/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/hanbok-rental/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/gangneung-sokcho-2-days/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/korea-entry-requirements/': { published: '2026-09-30', updated: '2026-09-30' },
  '/guides/halloween-seoul-2026/':     { published: '2026-09-28', updated: '2026-10-02' },
  '/guides/christmas-new-year-seoul/': { published: '2026-09-28', updated: '2026-09-28' },
  '/guides/seollal-2027/':             { published: '2026-09-28', updated: '2026-09-28' },
  '/guides/cherry-blossom-2027/':      { published: '2026-09-28', updated: '2026-09-28' },
  '/guides/korea-in-winter/':          { published: '2026-09-14', updated: '2026-09-28' },
  '/guides/autumn-foliage/':           { published: '2026-09-14', updated: '2026-09-30' },
  '/guides/baseball-in-korea/':        { published: '2026-09-28', updated: '2026-09-28' },
  '/guides/korea-on-a-budget/':        { published: '2026-09-28', updated: '2026-09-30' },
  '/guides/seoul-nightlife/':          { published: '2026-09-28', updated: '2026-09-28' },
  '/guides/seoul-3-days/':             { published: '2026-09-10', updated: '2026-09-11' },
  '/guides/jeju-3-days/':              { published: '2026-09-10', updated: '2026-09-30' },
  '/guides/busan-2-days/':             { published: '2026-09-10', updated: '2026-09-30' },
  '/guides/gyeongju-2-days/':          { published: '2026-09-14', updated: '2026-09-28' },
  '/guides/kpop-tickets/':             { published: '2026-09-09', updated: '2026-09-11' },
};
