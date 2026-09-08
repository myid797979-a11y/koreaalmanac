// 에디토리얼 텍스트 — 허브 인트로와 홈 추천. 데이터가 아니라 목소리 담당.
// 청약각 교훈: "숫자만 있고 읽을거리 없음"이 이탈 원인 — 모든 허브에 사람이 쓴 문단 하나.

export const MONTH_INTROS: string[] = [
  "January is Korea at its coldest — and its clearest. This is the season of ice fishing, snow festivals in the Gangwon mountains, and sunrise gatherings on the east coast, with the Lunar New Year (Seollal) bringing palace reenactments and folk games in most years. Pack for real cold; the payoff is crisp skies and festivals you will never see in summer.",
  "February straddles deep winter and the first hints of spring. Seollal often lands here, filling palaces and folk villages with ancestral rites, traditional games, and free hanbok programs, while ski-country events wind down. By late February the plum blossoms are already stirring on the south coast.",
  "March opens Korea's flower calendar: plum blossoms in Gwangyang, sansuyu in Gurye, and the first cherry blossoms on the southern coast by the last week. Festivals move back outdoors, and the crowds are still thin — a sweet spot before the April rush.",
  "April is peak spring — cherry blossoms sweep from the south coast to Seoul in the first two weeks, and nearly every city throws a blossom festival under them. Book lodging early for the famous ones; the season is short and the whole country knows it.",
  "May is green season: comfortable temperatures, long evenings, and the lotus lantern festivities around Buddha's Birthday, when temples and downtown Seoul glow after dark. Rose, tea, and bamboo festivals fill the gaps — this is arguably the easiest month to travel Korea.",
  "June brings early summer without the monsoon: firefly festivals in the clean-air counties, night markets warming up, and mountain greenery at its deepest. It is the quiet month before beach season — good for festivals that reward lingering.",
  "July is monsoon then beach. Once the rains pass, the coast wakes up — mud wrestling at Boryeong, water-gun battles in the cities, and night festivals timed to the cool hours. Expect humidity, plan around the rain radar, and lean into the water events.",
  "August is Korea at full summer heat: sea festivals along every coast, big outdoor music events, and night openings at palaces and heritage sites to dodge the daytime sun. Evening programming is where this month shines.",
  "September is when the festival calendar erupts. The heat breaks, the harvest begins, and heritage night tours, gugak stages, and riverside fireworks fill nearly every weekend — often around Chuseok, Korea's harvest holiday, when palaces run special programs. One of the two best months to visit, and it is not close.",
  "October is the other best month: foliage rolls south from the Gangwon mountains, and Korea answers with its biggest events — lantern festivals on the rivers, fireworks over Seoul and Busan, mask dance in Andong, and food festivals in every county. Book everything early.",
  "November is late-autumn quiet with pockets of brilliance: the last foliage in the southern provinces, chrysanthemum shows, and the first winter light festivals switching on. Crowds thin out, prices drop, and ondol floors start feeling like a feature.",
  "December is illumination season — light festivals, year-end concerts, and Christmas markets in the cities, with sunrise festivals gearing up on the east coast for New Year's Day. Short days, long lights.",
];

export const REGION_INTROS: Record<string, string> = {
  Seoul: "Seoul concentrates more festivals than anywhere else in Korea: palace night openings, Han River fireworks, media-art shows on Dongdaemun Design Plaza, and neighborhood festivals from Sinchon to Seongsu. Most are free, and nearly all sit on the subway map.",
  Busan: "Korea's second city does festivals with a sea view — beach events on Haeundae and Gwangalli, the film festival in autumn, and port-side night markets. The Gwangan Bridge backdrop alone upgrades any event held near the water.",
  Incheon: "Most travelers only see the airport, but Incheon's open-port district — Chinatown, 1900s warehouses, Wolmido — hosts heritage night tours and harbor festivals that make an easy first or last day of a Korea trip.",
  Gyeonggi: "The province wrapped around Seoul holds UNESCO-listed Suwon Hwaseong Fortress, the DMZ border towns of Paju and Yeoncheon, and lake and garden festivals an hour from the capital. Day-trip country with its own headline events.",
  Gangwon: "Korea's mountain province: ski country and the 2018 Olympics in winter, cool highlands and firefly valleys in summer, and the east coast's beaches and sunrise spots year-round. Festivals here trade on nature more than anywhere else.",
  Daejeon: "Korea's science city keeps a lower festival profile, but its old downtown heritage nights, hot-spring district events in Yuseong, and a legendary bakery culture reward a stopover on the KTX line.",
  Chungbuk: "The landlocked lake province — Danyang's river gorges, Cheongju's early-printing heritage, and the mineral springs where King Sejong once took the waters. Its festivals lean agricultural and unhurried: jujubes, ginseng, gardens.",
  Chungnam: "West-coast tidal flats, the old Baekje capitals of Gongju and Buyeo, and Boryeong's world-famous mud festival. History and sea mud, sometimes in the same weekend.",
  Sejong: "Korea's young administrative city has a compact festival calendar built around its lake park and central green belt — small, family-friendly, and easy to navigate.",
  Daegu: "A basin city famous for heat, textiles, and food. Daegu's festivals cluster around Suseongmot Lake, downtown Dongseongno, and a proud street-food scene — plus Korea's biggest tteokbokki festival.",
  Gyeongbuk: "The heartland of old Korea: Silla royal tombs in Gyeongju, Confucian academies in Andong, and mask dance by the Nakdong River. If you want festivals with a thousand years of backstory, this is the province.",
  Gyeongnam: "The south coast province of Jinju's river lanterns, Tongyeong's seafood harbors, and dinosaur coastlines in Goseong. Marine scenery does half the staging work here.",
  Ulsan: "An industrial powerhouse with a surprising festival hand: whale culture at Jangsaengpo, mountain film in the Yeongnam Alps, and drone shows over its river parks.",
  Jeonbuk: "Home of Jeonju — Korea's food capital and its most beloved hanok village — plus filming-set horror nights in Iksan and mountain treasure hunts in Jinan. Eat first, festival second.",
  Jeonnam: "Korea's deep south: thousands of islands, the Suncheon wetlands, Yeosu's night sea, and history festivals staged on the actual straits where Admiral Yi fought. Slow travel country with big-event moments.",
  Gwangju: "The city of the Biennale and of Korea's democracy movement, with an art scene and a food reputation that both punch above its size. Its festivals lean cultural — street art, buskers, night markets on Chungjang-ro.",
  Jeju: "The volcanic island runs its own calendar — fire festivals on the oreum hills, harbor shows in Seogwipo, and canola or camellia blooms depending on the season. Festivals here are scenery-first by default.",
};

// 홈 Featured — 손으로 고른 대표 축제 (앞에서부터, 종료된 것은 자동 스킵)
export const FEATURED_IDS: string[] = [
  "2640874", // Seoul Light DDP Autumn
  "617992",  // 16th Gwangju Biennale
  "1718137", // Silla Culture Festival (Gyeongju)
  "553263",  // Ulsan Whale Festival 30th
  "573459",  // Chuncheon Puppet Festival
  "2648460", // Gyeongbokgung Starlight Tour
  "3521741", // Seoul BBQ Festival
  "141105",  // Goseong Dinosaur World Expo
];
