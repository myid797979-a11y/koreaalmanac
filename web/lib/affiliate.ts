// 제휴 링크 — Klook Affiliate (계정 aid 136897, 광고 aff_adid 1460726).
//
// 원칙
//   1) 사람이 고른 페이지에만 건다. 4천 페이지에 검색 링크를 뿌리면 Google 이 "얇은 제휴 사이트" 로
//      본다(2026-09-28 결정). 전국구 축제·상위 관광지·가이드만.
//   2) 상품 id 가 해마다 바뀌는 계절 투어(보령 머드 등)는 검색 딥링크로, 상시 상품(에버랜드·KR Pass·
//      eSIM·AREX)은 상품 링크로 건다. 상품 id 는 2026-09-28 Klook 검색으로 확인한 값.
//   3) 링크는 rel="sponsored" + 새 창, 상자 안에 고지 문구. 목록 순위·선정에는 영향 없음.
//
// 추적: affiliate.klook.com/redirect 가 k_site 로 302 하며 aid 를 쿠키에 심는다(직접 확인).
// 클릭 집계: layout 의 GA4 스크립트가 a[data-aff] 클릭을 affiliate_click 이벤트로 보낸다.

export const KLOOK_AID = '136897';
export const KLOOK_ADID = '1460726';

export type Provider = 'klook' | 'agoda';
export type Offer = { label: string; url: string; note?: string; provider?: Provider };

/** 임의의 Klook URL → 추적 링크 */
export function klook(target: string): string {
  return 'https://affiliate.klook.com/redirect?aid=' + KLOOK_AID +
    '&aff_adid=' + KLOOK_ADID + '&k_site=' + encodeURIComponent(target);
}

/** 상품 경로('252-everland-seoul') → 추적 링크 */
function act(path: string): string {
  return klook('https://www.klook.com/activity/' + path + '/');
}

/** 검색어 → 검색 결과 추적 링크 (상품 id 가 해마다 바뀌는 계절 투어용) */
function search(q: string): string {
  return klook('https://www.klook.com/search/result/?query=' + encodeURIComponent(q));
}

// ── 상시 상품 ─────────────────────────────────────────────
const EVERLAND: Offer = { label: 'Everland one-day ticket', url: act('252-everland-seoul'), note: 'QR entry, no counter queue' };
const EVERLAND_BUS: Offer = { label: 'Seoul – Everland shuttle bus', url: act('14421-shuttle-bus-transfers-between-everland-carribean-bay-and-seoul') };
const LOTTE_WORLD: Offer = { label: 'Lotte World Adventure ticket', url: act('251-lotte-world-seoul') };
const LOTTE_AQUARIUM: Offer = { label: 'Lotte World Aquarium ticket', url: act('33305-lotte-world-aquarium-ticket') };
const SEOUL_SKY: Offer = { label: 'Seoul Sky observatory ticket', url: act('17678-lotte-world-sky-admission'), note: 'Lotte World Tower, 117th–123rd floors' };
const SEOUL_PASS: Offer = { label: 'Klook Attraction Pass Seoul', url: act('74595-seoul-pass'), note: 'bundles palaces, towers and museums' };
const NAMI_TOUR: Offer = { label: 'Nami Island, Petite France & Garden of Morning Calm day tour', url: act('2528-nami-island-garden-morning-calm-seoul'), note: 'coach from Seoul' };
const NAMI_ALPACA: Offer = { label: 'Nami Island + Alpaca World day tour', url: act('8962-nami-island-petite-france-railbike-garden-of-morning-calm-day-tour-seoul'), note: 'coach from Seoul' };
const DMZ: Offer = { label: 'DMZ tour from Seoul', url: act('216-dmz-tour-gyeonggi-do'), note: 'passport required on the day' };
const KR_PASS: Offer = { label: 'Korail Pass (KR Pass)', url: act('2847-korea-rail-pass-seoul'), note: 'unlimited KTX for 2–5 days, foreign passports only' };
const ESIM: Offer = { label: 'Unlimited-data eSIM for Korea (SKT 5G)', url: act('109354-south-korea-esim-high-speed-internet-qr-code-voucher'), note: 'QR by email, works on landing' };
const AREX: Offer = { label: 'AREX express train, Incheon Airport → Seoul Station', url: act('1163-airport-to-seoul-city-center-arex-train-incheon'), note: '43 minutes non-stop' };
const HANBOK_GBG: Offer = { label: 'Hanbok rental by Gyeongbokgung', url: act('111262-hanbok-rental-in-seoul-gyeongbokgung'), note: 'palace entry is free in hanbok' };
const HANBOK_BUKCHON: Offer = { label: 'Hanbok rental near Bukchon, with hairstyling', url: act('110939-hanbok-experience-at-hanokhanbok-with-korean-hairstyling') };
const HWACHEON: Offer = { label: 'Hwacheon Ice Festival day tour from Seoul', url: act('2088-hwacheon-sancheoneo-trout-ice-festival-gangwon-do'), note: 'the sensible way there' };
const HWACHEON_LIGHTS: Offer = { label: 'Hwacheon ice fishing + Garden of Morning Calm lights, one day', url: act('26490-hwacheon-sancheoneo-ice-morning-calm-lighting-festival-seoul') };
const ICE_FESTIVALS: Offer = { label: 'Ice-fishing festivals day tour (Pyeongchang, Hwacheon, Gapyeong)', url: act('16018-ice-fishing-festivals-day-tour-seoul'), note: 'operator picks the festival open that week' };
const JINHAE_SEOUL: Offer = { label: 'Jinhae cherry blossom day tour from Seoul', url: act('9523-jinhae-gunhangje-cherry-blossom-festival-from-seoul') };
const JINHAE_BUSAN: Offer = { label: 'Jinhae cherry blossom tour from Busan', url: act('83752-jinhae-cherry-blossom-tour-busan') };
const JINJU: Offer = { label: 'Jinju Lantern Festival guided tour', url: act('124304-korea-festival-express-jinju-namgang-lantern-festival-from-busan'), note: 'departure city chosen at checkout' };
const JINJU_MORE: Offer = { label: 'All Jinju festival tours', url: search('Jinju Lantern Festival') };
const BORYEONG: Offer = { label: 'Boryeong Mud Festival day tours from Seoul', url: search('Boryeong Mud Festival'), note: 'new tours listed each June' };
const BUSAN_FIREWORKS: Offer = { label: 'Fireworks-night cruises and viewing packages', url: search('Busan Fireworks Festival'), note: 'listed from October' };
const GYEONGJU_BUSAN: Offer = { label: 'Gyeongju UNESCO day trip from Busan', url: act('11062-gyeongju-unesco-world-heritage-site-day-trip-busan') };
const GYEONGJU_HANBOK: Offer = { label: 'Hanbok rental in Gyeongju', url: search('Gyeongju hanbok') };
const VIVALDI: Offer = { label: 'Vivaldi Park ski day tour from Seoul', url: act('6886-vivaldi-park-ski-world-day-tour-seoul'), note: 'lesson, gear and shuttle included' };
const MORNING_CALM_LIGHTS: Offer = { label: 'Garden of Morning Calm Lighting Festival & Snowy Land tour', url: act('27166-garden-morning-calm-lighting-festival-snowy-land-tour-seoul'), note: 'evening coach from Seoul' };
const BUSAN_X_SKY: Offer = { label: 'Busan X the Sky observatory ticket', url: act('81280-busan-haeundae-lct-x-the-sky-admission-ticket') };
const VISIT_BUSAN_PASS: Offer = { label: 'Visit Busan Pass', url: act('81576-visit-busan-pass'), note: 'free entry to 30+ attractions for 24 or 48 hours' };
const BLUELINE: Offer = { label: 'Haeundae Blueline Park sky capsule & beach train', url: search('Haeundae Blueline Park Sky Capsule') };
const BUSAN_DAY_TOUR: Offer = { label: 'Busan city day tours (Gamcheon, Haedong Yonggungsa)', url: search('Busan day tour') };
const BUSAN_NIGHT: Offer = { label: 'Busan night tours', url: search('Busan night tour') };
const LOTTE_BUSAN: Offer = { label: 'Lotte World Adventure Busan ticket', url: search('Lotte World Adventure Busan') };
const COEX_AQUARIUM: Offer = { label: 'COEX Aquarium ticket', url: search('COEX Aquarium') };
const GWANGJANG_FOOD: Offer = { label: 'Gwangjang Market night food tour', url: search('Gwangjang Market food tour') };
const JEONJU_TOUR: Offer = { label: 'Jeonju Hanok Village day tour from Seoul', url: search('Jeonju day tour') };
const SUWON_TOUR: Offer = { label: 'Suwon Hwaseong Fortress tours', url: search('Suwon Hwaseong Fortress') };
const GANGNEUNG_TOUR: Offer = { label: 'Gangneung day tours from Seoul', url: search('Gangneung day tour') };
const JEJU_TOUR: Offer = { label: 'Jeju east and west coast day tours', url: search('Jeju day tour') };
const HALLASAN: Offer = { label: 'Hallasan hiking tours', url: search('Hallasan hiking') };
const KBO_TICKETS: Offer = { label: 'KBO baseball tickets sold to overseas visitors', url: search('KBO baseball'), note: 'Seoul home games, when listed' };
const DMZ_MORE: Offer = { label: 'All DMZ tours, including defector-talk and Cheorwon tours', url: search('DMZ tour'), note: 'compare half-day and full-day' };
const AIRPORT_TRANSFER: Offer = { label: 'Private transfer, Incheon Airport → Seoul hotel', url: search('Incheon airport private transfer'), note: 'fixed price, driver meets you in arrivals' };
const LEGOLAND: Offer = { label: 'Legoland Korea tickets', url: search('Legoland Korea'), note: 'Chuncheon, for younger children' };
const PALACE_TOUR: Offer = { label: 'Guided palace tours in English', url: search('Gyeongbokgung palace tour'), note: 'with hanbok or the Secret Garden' };
const FOOD_TOUR: Offer = { label: 'Seoul food tours (markets, night eats, BBQ)', url: search('Seoul food tour'), note: 'small groups with a local guide' };
const COOKING_CLASS: Offer = { label: 'Korean cooking classes in Seoul', url: search('Korean cooking class Seoul'), note: 'kimchi, bibimbap, market visit' };
const WOWPASS: Offer = { label: 'WOWPASS prepaid travel card', url: search('WOWPASS'), note: 'T-money and card payments in one, top up in won' };
const KBEAUTY: Offer = { label: 'K-beauty experiences and shopping tours', url: search('Seoul K-beauty'), note: 'skin analysis, personal colour, shop visits' };
const SKI_TOURS: Offer = { label: 'All ski day tours from Seoul', url: search('ski tour Seoul'), note: 'Elysian Gangchon, Vivaldi, Yongpyong; gear and lessons' };
const SKI_YONGPYONG: Offer = { label: 'Yongpyong Resort lift tickets and packages', url: search('Yongpyong ski'), note: 'for a stay in Pyeongchang' };
const SPA_SEOUL: Offer = { label: 'Seoul spa and jjimjilbang tickets', url: search('Seoul jjimjilbang spa'), note: 'entry, towels and uniform included' };
const SPA_CIMER: Offer = { label: 'Paradise City Cimer spa ticket', url: search('Paradise City Cimer'), note: 'by Incheon Airport, good for layovers' };
const SPA_BUSAN: Offer = { label: 'Spa Land Centum City ticket', url: search('Spa Land Centum City'), note: 'Busan’s best-known spa' };
const TEMPLESTAY: Offer = { label: 'Templestay programmes and temple tours', url: search('templestay'), note: 'day and overnight, some with transport' };
const JEJU_CAR: Offer = { label: 'Jeju car rental', url: search('Jeju car rental'), note: 'bring an International Driving Permit' };
const SIM_CARD: Offer = { label: 'Korean SIM or eSIM with a phone number', url: search('Korea SIM card'), note: 'for apps that need a Korean number' };
const POCKET_WIFI: Offer = { label: 'Pocket Wi-Fi, airport pick-up', url: search('Korea pocket wifi'), note: 'one device for the whole group' };
const TMONEY: Offer = { label: 'T-money and transport cards', url: search('T-money card'), note: 'pick up at the airport' };
const LAYOVER_TOUR: Offer = { label: 'Incheon Airport layover tours to Seoul', url: search('Incheon layover tour'), note: 'airport pick-up and return' };
const BUSAN_FOOD: Offer = { label: 'Busan food and market tours', url: search('Busan food tour'), note: 'Nampo markets and street food' };
const HIKE_SEOUL: Offer = { label: 'Guided Bukhansan and Seoul hikes', url: search('Bukhansan hiking'), note: 'route, gear tips and transport' };
const FOLK_VILLAGE: Offer = { label: 'Korean Folk Village tickets and tours', url: search('Korean Folk Village'), note: '20 minutes from Suwon by bus' };
const BIRF: Offer = { label: 'Busan International Rock Festival tickets', url: search('Busan International Rock Festival') };
const ANDONG_TOUR: Offer = { label: 'Andong Hahoe Village day tours', url: search('Andong Hahoe Village'), note: 'from Seoul or Busan; the mask dance is at the village' };
const YEOSU_TOUR: Offer = { label: 'Yeosu cable car and day tours', url: search('Yeosu') };
const SEORAKSAN_TOUR: Offer = { label: 'Seoraksan day tour from Seoul', url: search('Seoraksan day tour'), note: 'coach in, cable car queue and back the same night' };
const PUB_CRAWL: Offer = { label: 'Seoul pub crawl (Hongdae / Itaewon)', url: search('Seoul pub crawl'), note: 'the easy first night if you are travelling alone' };
const HAN_RIVER_CRUISE: Offer = { label: 'Han River evening cruise', url: search('Han River cruise'), note: 'from Yeouido, timed for the Banpo Bridge fountain' };
const NSEOUL_NIGHT: Offer = { label: 'N Seoul Tower observatory ticket', url: search('N Seoul Tower'), note: 'the night view everyone means' };

// ── 축제 id → 상품 ─────────────────────────────────────────
// id 는 web/lib/festival-rank.ts 의 FESTIVAL_PICKS 와 같은 KTO contentid.
const FESTIVAL_OFFERS: Record<string, Offer[]> = {
  '685135':  [HWACHEON, HWACHEON_LIGHTS],                 // 화천산천어축제
  '661861':  [ICE_FESTIVALS],                             // 평창송어축제
  '697135':  [BORYEONG],                                  // 보령머드축제
  '700520':  [JINHAE_SEOUL, JINHAE_BUSAN],                // 진해군항제
  '697197':  [JINJU, JINJU_MORE],                         // 진주남강유등축제
  '235076':  [BUSAN_FIREWORKS, VISIT_BUSAN_PASS],         // 부산불꽃축제
  '1385298': [BUSAN_FIREWORKS, VISIT_BUSAN_PASS],         // 부산불꽃축제 (다른 회차)
  '3115770': [BUSAN_NIGHT, VISIT_BUSAN_PASS],             // 광안리 M 드론쇼
  '141661':  [HANBOK_GBG, SEOUL_PASS],                    // 경복궁 수문장 교대
  '292853':  [HANBOK_GBG, SEOUL_PASS],                    // 궁궐 수문장 교대 (다른 회차)
  '2648460': [HANBOK_GBG],                                // 경복궁 별빛야행
  '292961':  [HANBOK_GBG],                                // 덕수궁 수문장 교대 (한복이면 궁 입장 무료)
  '1675246': [GANGNEUNG_TOUR],                            // 강릉커피축제
  '1084180': [JEJU_TOUR],                                 // 제주올레걷기축제
  '1866962': [MORNING_CALM_LIGHTS, NAMI_TOUR],            // 아침고요수목원 오색별빛정원전
  // 2026-09-28 추가 — 10~11월에 열리는 것 중 Klook 에 실제 상품이 있는 축제
  '293091':  [BIRF],                                      // 부산국제록페스티벌
  '697123':  [ANDONG_TOUR],                               // 안동국제탈춤페스티벌
  '978249':  [SUWON_TOUR],                                // 수원화성문화제
  '2657619': [SUWON_TOUR],                                // 화성행궁 야간개장
  '3487931': [JEONJU_TOUR],                               // 전주한옥마을 전통공연 퍼레이드
  '2818138': [HANBOK_GBG],                                // 창경궁 야연 (궁궐 야간, 한복)
  '4114312': [GANGNEUNG_TOUR],                            // 강릉 빵굽는 마을
  '2874909': [YEOSU_TOUR],                                // 여수 밤바다 불꽃축제
};

// ── 관광지 id → 상품 ───────────────────────────────────────
const PLACE_OFFERS: Record<string, Offer[]> = {
  '264235':  [EVERLAND, EVERLAND_BUS],                    // Everland
  '264152':  [LOTTE_WORLD, LOTTE_AQUARIUM],               // Lotte World
  '2493015': [SEOUL_SKY],                                 // Lotte World Tower Seoul Sky
  '2482037': [LOTTE_AQUARIUM],                            // Lotte World Aquarium
  '264244':  [NAMI_TOUR, NAMI_ALPACA],                    // Nami Island
  '815994':  [NAMI_TOUR],                                 // Petite France
  '264212':  [NAMI_TOUR, MORNING_CALM_LIGHTS],            // Garden of Morning Calm
  '2813153': [NAMI_ALPACA],                               // Alpaca World
  '264337':  [HANBOK_GBG, SEOUL_PASS],                    // Gyeongbokgung
  '561382':  [HANBOK_BUKCHON],                            // Bukchon Hanok Village
  '264348':  [HANBOK_GBG],                                // Changdeokgung
  '264487':  [DMZ],                                       // Imjingak
  '3491461': [DMZ],                                       // DMZ Peace Gondola
  '2376049': [DMZ],                                       // Camp Greaves
  '736274':  [COEX_AQUARIUM],                             // COEX Aquarium
  '273761':  [GWANGJANG_FOOD],                            // Gwangjang Market
  '2815428': [BUSAN_X_SKY, VISIT_BUSAN_PASS],             // Busan X the Sky
  '2812440': [BLUELINE, VISIT_BUSAN_PASS],                // Haeundae Blueline Park
  '264155':  [BUSAN_X_SKY, VISIT_BUSAN_PASS],             // Haeundae Beach
  '1998211': [BUSAN_DAY_TOUR, VISIT_BUSAN_PASS],          // Gamcheon Culture Village
  '2835516': [LOTTE_BUSAN],                               // Lotte World Adventure Busan
  '264261':  [GYEONGJU_BUSAN, KR_PASS],                   // Bulguksa
  '264367':  [GYEONGJU_BUSAN, KR_PASS],                   // Donggung Palace and Wolji Pond
  '264285':  [JEONJU_TOUR, KR_PASS],                      // Jeonju Hanok Village
  '264204':  [SUWON_TOUR],                                // Suwon Hwaseong Fortress
  '264172':  [HALLASAN],                                  // Hallasan
};

// ── 가이드 ────────────────────────────────────────────────
export const GUIDE_OFFERS = {
  winterIce:        [HWACHEON, HWACHEON_LIGHTS, ICE_FESTIVALS],
  winterSkiLights:  [VIVALDI, MORNING_CALM_LIGHTS],
  arrival:          [KR_PASS, ESIM, AREX],
  gyeongju:         [KR_PASS, GYEONGJU_BUSAN, GYEONGJU_HANBOK],
  venueArrival:     [ESIM, AREX],                          // 공연장 가이드 9편 — 비행기 타고 오는 팬
  christmas:        [MORNING_CALM_LIGHTS, ESIM, AREX],     // 연말 가이드
  seollal:          [HANBOK_GBG, ESIM],                    // 설 가이드 — 한복이면 궁 무료
  cherry:           [JINHAE_SEOUL, JINHAE_BUSAN, KR_PASS], // 벚꽃 가이드
  halloween:        [EVERLAND, LOTTE_WORLD, ESIM],         // 할로윈 가이드 — 테마파크가 안전한 선택지
  baseball:         [KBO_TICKETS],                         // 야구 가이드
  foliage:          [SEORAKSAN_TOUR, NAMI_TOUR, KR_PASS],  // 단풍 가이드 (10월 트래픽)
  nightlife:        [PUB_CRAWL, HAN_RIVER_CRUISE, NSEOUL_NIGHT],
  busanFireworks:   [BUSAN_FIREWORKS, VISIT_BUSAN_PASS, BUSAN_X_SKY],
  jinju:            [JINJU, JINJU_MORE],
  airport:          [AREX, ESIM, AIRPORT_TRANSFER],
  dmz:              [DMZ, DMZ_MORE],
  nami:             [NAMI_TOUR, NAMI_ALPACA, MORNING_CALM_LIGHTS],
  suwon:            [SUWON_TOUR, FOLK_VILLAGE],
  dayTrips:         [NAMI_TOUR, DMZ, SUWON_TOUR, KR_PASS],
  palaces:          [HANBOK_GBG, HANBOK_BUKCHON, PALACE_TOUR],
  food:             [GWANGJANG_FOOD, FOOD_TOUR, COOKING_CLASS],
  shopping:         [WOWPASS, ESIM, KBEAUTY],
  ski:              [VIVALDI, SKI_TOURS, SKI_YONGPYONG],
  busan:            [BLUELINE, VISIT_BUSAN_PASS, BUSAN_X_SKY],
  spa:              [SPA_SEOUL, SPA_CIMER, SPA_BUSAN],
  templestay:       [TEMPLESTAY],
  jeonju:           [JEONJU_TOUR, KR_PASS],
  seoul3:           [SEOUL_PASS, HANBOK_GBG, NSEOUL_NIGHT],
  jeju:             [JEJU_CAR, JEJU_TOUR, HALLASAN],
  connect:          [ESIM, SIM_CARD, POCKET_WIFI],
  transit:          [WOWPASS, TMONEY, AREX],
  itinerary7:       [KR_PASS, ESIM, AREX],
  hanbok:           [HANBOK_GBG, HANBOK_BUKCHON, GYEONGJU_HANBOK],
  eastCoast:        [SEORAKSAN_TOUR, GANGNEUNG_TOUR, KR_PASS],
  entry:            [ESIM, AREX],
  rainy:            [LOTTE_WORLD, LOTTE_AQUARIUM, SEOUL_SKY, SPA_SEOUL],
  kids:             [EVERLAND, LOTTE_WORLD, LEGOLAND, LOTTE_AQUARIUM],
  layover:          [LAYOVER_TOUR, ESIM, AREX],
  andong:           [ANDONG_TOUR, KR_PASS],
  busanFood:        [BUSAN_FOOD, VISIT_BUSAN_PASS],
  hiking:           [HIKE_SEOUL, SEORAKSAN_TOUR],
  themeParks:       [EVERLAND, EVERLAND_BUS, LOTTE_WORLD, SEOUL_SKY, LEGOLAND],
} as const;

// ── Agoda (숙소) ─────────────────────────────────────────
// 파트너 사이트 ID = CID 1976112 (2026-09-28 등록, 승인 대기). 어떤 Agoda URL 이든 ?cid= 를 붙이면
// 추적된다. 호텔 id·도시 id 없이 걸 수 있는 도시 페이지(/city/<slug>.html)를 쓴다 — 아래 슬러그는
// 전부 curl 로 200 확인했고, 없는 슬러그는 404 라 검증이 유효하다. textToSearch 만으로는 홈으로 튕긴다.
//
// 숙소 커미션은 1건에 만 원 단위라 eSIM 몇백 원과 차원이 다르다. 그래서 붙이는 자리는
// "비행기 타고 와서 자야 하는" 페이지 — 공연장·공연·서울 밖 다박 축제·가이드.
export const AGODA_CID = '1976112';

function agodaCity(slug: string): string {
  return 'https://www.agoda.com/city/' + slug + '.html?cid=' + AGODA_CID;
}
function stay(label: string, slug: string, note?: string): Offer {
  return { label, url: agodaCity(slug), note, provider: 'agoda' };
}

const STAY_SEOUL      = stay('Hotels in Seoul', 'seoul-kr', 'Hongdae or Myeongdong for a first visit; Jamsil for the east-side venues');
const STAY_GOYANG     = stay('Hotels in Goyang (Ilsan)', 'goyang-si-kr', 'beside KINTEX and the stadium, no late-night trip back');
const STAY_INCHEON    = stay('Hotels in Incheon, including the airport island', 'incheon-kr', 'Yeongjong hotels are a shuttle ride from INSPIRE Arena');
const STAY_BUSAN      = stay('Hotels in Busan', 'busan-kr', 'Haeundae for the beach, Seomyeon for the centre');
const STAY_DAEGU      = stay('Hotels in Daegu', 'daegu-kr');
const STAY_JINJU      = stay('Hotels in Jinju', 'jinju-si-kr', 'lantern week sells out months ahead; Busan is the fallback');
const STAY_BORYEONG   = stay('Hotels in Boryeong (Daecheon Beach)', 'boryeong-si-kr', 'mud-festival weekends fill; midweek is easier');
const STAY_HWACHEON   = stay('Hotels in Hwacheon', 'hwacheon-gun-kr', 'a small town with few rooms; most visitors day-trip from Seoul');
const STAY_CHANGWON   = stay('Hotels in Changwon, including Jinhae', 'changwon-si-kr', 'Jinhae itself sells out; Changwon city is 20 minutes away');
const STAY_GYEONGJU   = stay('Hotels in Gyeongju', 'gyeongju-si-kr', 'Hwangnidan-gil for the old town, Bomun Lake for resorts');
const STAY_GANGNEUNG  = stay('Hotels in Gangneung', 'gangneung-si-kr', 'Gyeongpo Beach for the sunrise, the station area for the KTX');
const STAY_JEJU       = stay('Hotels on Jeju', 'jeju-kr');
const STAY_PYEONGCHANG = stay('Hotels in Pyeongchang', 'pyeongchang-gun-kr', 'ski-in resorts at Yongpyong and Alpensia');
const STAY_YEOSU      = stay('Hotels in Yeosu', 'yeosu-si-kr');
const STAY_GWANGJU    = stay('Hotels in Gwangju', 'gwangju-kr');
const STAY_ANDONG     = stay('Hotels in Andong', 'andong-si-kr', 'book early for mask-dance week; Hahoe has a few guesthouses');
const STAY_JEONJU     = stay('Hotels in Jeonju', 'jeonju-si-kr', 'a hanok stay inside the village is the point');
const STAY_CHUNCHEON  = stay('Hotels in Chuncheon', 'chuncheon-si-kr', 'the nearest real city to Hwacheon, an hour by bus');
const STAY_SOKCHO     = stay('Hotels in Sokcho', 'sokcho-si-kr', 'the base for Seoraksan; sells out for peak foliage weekends');
const STAY_GAPYEONG  = stay('Hotels and pensions in Gapyeong', 'gapyeong-gun-kr', 'riverside pensions near Nami; most assume a car');
const STAY_CHUNCHEON_NAMI = stay('Hotels in Chuncheon', 'chuncheon-si-kr', '20 minutes from Gapyeong by train, near the dakgalbi street');
const STAY_SUWON     = stay('Hotels in Suwon', 'suwon-si-kr', 'near the fortress walls for the night walk');

/** 공연장 가이드 → 숙소 */
export const VENUE_STAY: Record<string, Offer[]> = {
  'goyang-stadium':      [STAY_GOYANG, STAY_SEOUL],
  'inspire-arena':       [STAY_INCHEON, STAY_SEOUL],
  'olympic-park':        [STAY_SEOUL],
  'kintex':              [STAY_GOYANG, STAY_SEOUL],
  'gocheok-sky-dome':    [STAY_SEOUL],
  'jangchung-arena':     [STAY_SEOUL],
  'yes24-live-hall':     [STAY_SEOUL],
  'hongdae-live-venues': [STAY_SEOUL],
  'jamsil':              [STAY_SEOUL],
  'sejong-center':       [STAY_SEOUL],
  'lg-arts-center-seoul': [STAY_SEOUL, STAY_INCHEON],
  'kyung-hee-grand-peace-palace': [STAY_SEOUL],
  'yonsei-university':   [STAY_SEOUL],
  'bexco-busan':         [STAY_BUSAN],
  'busan-asiad-main-stadium': [STAY_BUSAN],
};

/** 공연 상세 → 숙소: 공연장 가이드가 있으면 그 기준, 없으면 도시 기준 */
const CITY_STAY: Record<string, Offer[]> = {
  Seoul: [STAY_SEOUL], Busan: [STAY_BUSAN], Incheon: [STAY_INCHEON], Goyang: [STAY_GOYANG],
  Daegu: [STAY_DAEGU], Gangneung: [STAY_GANGNEUNG], Paju: [STAY_SEOUL],
};
export function stayOffersForConcert(c: { city: string }, venueSlug?: string): Offer[] {
  return (venueSlug && VENUE_STAY[venueSlug]) || CITY_STAY[c.city] || [];
}

/** 서울 밖에서 하루 이상 걸리는 전국구 축제 → 숙소 */
const FESTIVAL_STAY: Record<string, Offer[]> = {
  '697197':  [STAY_JINJU, STAY_BUSAN],        // 진주남강유등축제
  '697135':  [STAY_BORYEONG],                 // 보령머드축제
  '685135':  [STAY_HWACHEON, STAY_CHUNCHEON], // 화천산천어축제
  '700520':  [STAY_CHANGWON, STAY_BUSAN],     // 진해군항제
  '235076':  [STAY_BUSAN],                    // 부산불꽃축제
  '1385298': [STAY_BUSAN],                    // 부산불꽃축제 (다른 회차)
  '3115770': [STAY_BUSAN],                    // 광안리 드론쇼
  '1675246': [STAY_GANGNEUNG],                // 강릉커피축제
  '1084180': [STAY_JEJU],                     // 제주올레걷기축제
  '661861':  [STAY_PYEONGCHANG],              // 평창송어축제
  '679008':  [STAY_PYEONGCHANG],              // 대관령눈꽃축제
  '1490063': [STAY_YEOSU],                    // 여수 향일암 해맞이
  '617992':  [STAY_GWANGJU],                  // 광주비엔날레
  '293091':  [STAY_BUSAN],                    // 부산국제록페스티벌
  '697123':  [STAY_ANDONG],                   // 안동국제탈춤페스티벌
  '637693':  [STAY_CHANGWON],                 // 마산가고파국화축제
  '697371':  [STAY_GWANGJU],                  // 광주김치축제
  '3487931': [STAY_JEONJU],                   // 전주한옥마을 전통공연 퍼레이드
  '4114312': [STAY_GANGNEUNG],                // 강릉 빵굽는 마을
  '2874909': [STAY_YEOSU],                    // 여수 밤바다 불꽃축제
};
export function stayOffersForFestival(id: string): Offer[] {
  return FESTIVAL_STAY[id] ?? [];
}

export const GUIDE_STAY = {
  gyeongju:  [STAY_GYEONGJU, STAY_BUSAN],
  cherry:    [STAY_BUSAN, STAY_CHANGWON, STAY_GYEONGJU, STAY_SEOUL],
  christmas: [STAY_SEOUL, STAY_GANGNEUNG, STAY_BUSAN],
  seollal:   [STAY_SEOUL],
  winterSki: [STAY_PYEONGCHANG, STAY_HWACHEON],
  halloween: [STAY_SEOUL],
  baseball:  [STAY_SEOUL, STAY_BUSAN],
  foliage:   [STAY_SOKCHO, STAY_GANGNEUNG, STAY_SEOUL],
  nightlife: [STAY_SEOUL],
  budget:    [STAY_SEOUL, STAY_BUSAN],
  busanFireworks: [STAY_BUSAN],
  jinju:     [STAY_JINJU, STAY_BUSAN],
  airport:   [STAY_INCHEON, STAY_SEOUL],
  nami:      [STAY_GAPYEONG, STAY_CHUNCHEON_NAMI],
  ski:       [STAY_PYEONGCHANG, STAY_GANGNEUNG],
  busan:     [STAY_BUSAN],
  seoul:     [STAY_SEOUL],
  andong:    [STAY_ANDONG],
  itinerary7: [STAY_SEOUL, STAY_GYEONGJU, STAY_BUSAN],
  eastCoast: [STAY_SOKCHO, STAY_GANGNEUNG],
  jeju:      [STAY_JEJU],
  jeonju:    [STAY_JEONJU],
  suwon:     [STAY_SUWON, STAY_SEOUL],
} as const;

export function offersFor(kind: 'festival' | 'place', id: string): Offer[] {
  return (kind === 'festival' ? FESTIVAL_OFFERS : PLACE_OFFERS)[id] ?? [];
}

/** 월 허브("Korea in October")용 — 그 달에 팔리는 것 */
export function monthOffers(m: number): readonly Offer[] {
  if (m === 9 || m === 10) return GUIDE_OFFERS.foliage;          // Oct, Nov
  if (m === 11 || m <= 1) return GUIDE_OFFERS.winterIce;         // Dec, Jan, Feb
  if (m === 2 || m === 3) return GUIDE_OFFERS.cherry;            // Mar, Apr
  return GUIDE_OFFERS.arrival;
}
/** 지역×월 허브용 Klook — ChatGPT 유입의 착륙 페이지(서울 10월이 28%). 그 지역에서 그 달에 실제로 쓸 것만.
 *  목록에 없는 지역은 기차 패스·eSIM. (Agoda 는 승인 확인 뒤 추가 — 2026-10-07 대표 지시) */
export function regionMonthOffers(region: string, m: number): readonly Offer[] {
  const autumn = m === 9 || m === 10;
  switch (region) {
    case 'Seoul':     return autumn ? [HAN_RIVER_CRUISE, HANBOK_GBG, SEOUL_PASS] : GUIDE_OFFERS.seoul3;
    case 'Busan':     return m === 9 || m === 10 ? GUIDE_OFFERS.busanFireworks : GUIDE_OFFERS.busan;
    case 'Gyeonggi':  return [SUWON_TOUR, NAMI_TOUR, EVERLAND, DMZ];
    case 'Incheon':   return GUIDE_OFFERS.layover;
    case 'Gangwon':   return autumn ? [SEORAKSAN_TOUR, NAMI_TOUR, GANGNEUNG_TOUR] : m === 11 || m <= 1 ? GUIDE_OFFERS.winterIce : [GANGNEUNG_TOUR, NAMI_TOUR];
    case 'Jeju':      return GUIDE_OFFERS.jeju;
    case 'Gyeongbuk': return [GYEONGJU_BUSAN, ANDONG_TOUR, KR_PASS];
    case 'Jeonbuk':   return GUIDE_OFFERS.jeonju;
    case 'Gyeongnam': return m === 9 ? GUIDE_OFFERS.jinju : m === 2 || m === 3 ? [JINHAE_BUSAN, JINHAE_SEOUL] : [KR_PASS];
    // 나머지 지역에 계절 상품(설악산·남이섬 투어)을 걸면 엉뚱하다 — 어디로 가든 쓰는 기차 패스·eSIM 만
    default:          return [KR_PASS, ESIM];
  }
}

export function monthStay(m: number): readonly Offer[] {
  if (m === 9 || m === 10) return GUIDE_STAY.foliage;
  if (m === 11 || m <= 1) return GUIDE_STAY.winterSki;
  if (m === 2 || m === 3) return GUIDE_STAY.cherry;
  return GUIDE_STAY.budget;
}

/** 제휴 상자가 붙는 페이지 수 (About 페이지·작업로그용) */
export const AFFILIATE_COVERAGE = {
  festivals: Object.keys(FESTIVAL_OFFERS).length,
  places: Object.keys(PLACE_OFFERS).length,
};
