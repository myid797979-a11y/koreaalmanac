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

export const CATEGORY_INTROS: Record<string, string> = {
  traditional: "Palace guard ceremonies, mask dance, fortress night tours, gugak stages — Korea keeps its traditions on public display, and most of it is free. These are the festivals where the country's thousand-year backstory is the main act.",
  lights: "Korea does darkness well: lantern rivers, drone swarms, media-art facades, palace night openings, and fireworks over the water. Night festivals also double as the best way to dodge summer heat and catch city skylines at their best.",
  food: "From hanwoo beef grill-outs and craft beer parks to ginseng harvests and steamed-bun villages — Korean food festivals are direct lines to regional specialties at farm prices, usually with free entry and paid plates.",
  nature: "Cherry blossoms in April, lotus in July, red spider lilies in September, foliage in October: Korea's flower and nature festivals track the seasons tightly, which makes dates matter more here than anywhere else on this site.",
  music: "Jazz on lake shores, busking world cups, hip-hop in front of ancient tombs, and free open-air stages all summer — Korean music festivals range from ticketed headliners to city streets that simply fill with sound.",
  art: "Two of Asia's leading biennales (Gwangju and Jeju), photography festivals in mountain counties, design weeks, and craft fairs — Korea's art calendar rewards travelers willing to leave Seoul.",
  family: "Dinosaur expos, puppet festivals, alien sports days, pet festas — these are the events built for kids first, usually free, with hands-on programs that do not need Korean to enjoy.",
};

/**
 * 지역 페이지(app/regions)용 여행 소개 — 축제 허브의 REGION_INTROS 와 달리 "여기는 어떤 곳이고,
 * 서울에서 얼마나 걸리고, 며칠 있으면 되나" 를 답한다. 목록만 있던 17개 지역 페이지를
 * 얇은 페이지로 보이지 않게 하는 본문이다 (2026-09-30).
 */
export const REGION_TRAVEL: Record<string, { intro: string; from: string; stay: string; best: string }> = {
  Seoul: {
    intro: 'The capital and one of the great cities of Asia: five Joseon palaces within walking distance of each other, hanok neighbourhoods, street markets, the Han River parks and a food and nightlife scene that runs until dawn. Almost every trip to Korea starts here, and the subway puts all of it within an hour.',
    from: '45–60 minutes from Incheon Airport by AREX or limousine bus',
    stay: '3–4 days, plus day trips',
    best: 'Palaces, markets, food, shopping, K-pop, nightlife',
  },
  Busan: {
    intro: 'Korea’s second city and biggest port, built along 30 km of coast: city beaches at Haeundae and Gwangalli, the fish market at Jagalchi, the hillside Gamcheon Culture Village and cliff-top temples. More relaxed than Seoul, and it does seafood better than anywhere.',
    from: 'About 2 hours 30 minutes by KTX, or a one-hour flight',
    stay: '2–3 days',
    best: 'Beaches, seafood, the coast, festivals by the sea',
  },
  Incheon: {
    intro: 'Most visitors only see the airport, but Incheon has Korea’s only official Chinatown, the old open-port district of 1900s warehouses, the seafront at Wolmido, the new city of Songdo, and islands such as Ganghwa with their own history.',
    from: 'An hour on Subway Line 1, or minutes from the airport',
    stay: 'A day, or your first or last night',
    best: 'Chinatown and jajangmyeon, a stopover near the airport, islands',
  },
  Gyeonggi: {
    intro: 'The province that wraps around Seoul, and day-trip country: the UNESCO fortress at Suwon, the DMZ at Paju, Everland and the Korean Folk Village at Yongin, the Garden of Morning Calm and the lakes and rivers to the east. Most of it is on the subway or an hour by bus.',
    from: '30 minutes to 1 hour 30 minutes, much of it by subway',
    stay: 'Day trips from Seoul',
    best: 'Suwon, the DMZ, theme parks, gardens',
  },
  Gangwon: {
    intro: 'Korea’s mountain province: Seoraksan and Odaesan national parks, the 2018 Winter Olympic resorts in Pyeongchang, and a long east coast of beaches and seafood towns around Gangneung and Sokcho. Nami Island and Chuncheon sit at its western edge, close to Seoul.',
    from: 'About 1 hour 50 minutes to Gangneung by KTX; 2–3 hours by bus to the mountains',
    stay: '2 days on the coast, longer to hike or ski',
    best: 'Mountains, autumn colour, skiing, the east coast',
  },
  Daejeon: {
    intro: 'Korea’s science city, at the centre of the KTX network: the Expo park and science museums, the hot springs of Yuseong, and Sungsimdang, the bakery people travel across the country for. An easy stop between Seoul and Busan.',
    from: 'About 1 hour by KTX',
    stay: 'A stopover or a night',
    best: 'Science museums, hot springs, bakeries',
  },
  Chungbuk: {
    intro: 'The only landlocked province: the river gorges and caves of Danyang, Songnisan National Park and its UNESCO temple Beopjusa, and Cheongju, where the world’s oldest surviving book printed with metal type was made.',
    from: '1 hour 30 minutes to 2 hours 30 minutes by bus or train',
    stay: '1–2 days',
    best: 'Danyang’s river scenery, temples, quiet countryside',
  },
  Chungnam: {
    intro: 'The west coast province: the Baekje kingdom’s old capitals at Gongju and Buyeo, a UNESCO site, the Boryeong Mud Festival in summer, the tidal flats and pine beaches of Taean, and the hot springs of Asan and Onyang.',
    from: '1–2 hours by train or bus',
    stay: 'A day trip or a night',
    best: 'Baekje history, the mud festival, the west coast',
  },
  Sejong: {
    intro: 'Korea’s young administrative capital, built from scratch since the 2010s around a large lake park, with the National Sejong Arboretum and modern government architecture. A niche stop for architecture and gardens.',
    from: 'About 1 hour by KTX to Osong, then a short bus',
    stay: 'Half a day',
    best: 'The arboretum and lake park',
  },
  Daegu: {
    intro: 'A big inland city known for summer heat, textiles and food: Seomun Market’s night market, the Kim Gwang-seok mural street, Palgongsan’s temples, and a strong local cuisine. A good base for Haeinsa and a stop on the way to Gyeongju.',
    from: 'About 1 hour 50 minutes by KTX',
    stay: '1–2 days',
    best: 'Markets and food, a base for nearby temples',
  },
  Gyeongbuk: {
    intro: 'The heartland of old Korea: Gyeongju, the Silla capital full of royal tombs and UNESCO temples; Andong and the Hahoe folk village with its mask dance; the sunrise coast at Pohang; and the remote volcanic island of Ulleungdo.',
    from: 'About 2 hours to Gyeongju by KTX',
    stay: '2 days in Gyeongju, a night in Andong',
    best: 'History, temples, traditional villages',
  },
  Gyeongnam: {
    intro: 'The south coast province: Jinju’s river lanterns, the island harbours of Tongyeong and Geoje, the cherry blossoms of Jinhae, and two of Korea’s greatest temples, Haeinsa and Tongdosa. Busan is the easiest base for most of it.',
    from: '3–4 hours by train or bus, or 1 hour from Busan',
    stay: '1–3 days from Busan',
    best: 'The coast and islands, festivals, temples',
  },
  Ulsan: {
    intro: 'An industrial city with more to it than shipyards: Ganjeolgot, one of the first places on the mainland to see the new year’s sunrise, the rocky Daewangam coast, whale culture at Jangsaengpo, and the silver-grass ridges of the Yeongnam Alps in autumn.',
    from: 'About 2 hours 15 minutes by KTX',
    stay: 'A day or a night, often from Busan or Gyeongju',
    best: 'Coast, sunrise, autumn hiking',
  },
  Jeonbuk: {
    intro: 'Home of Jeonju, the largest hanok village in Korea and the country’s food capital, plus the colonial-era streets of Gunsan, the autumn colour of Naejangsan and the UNESCO dolmens of Gochang.',
    from: 'About 1 hour 40 minutes to Jeonju by KTX',
    stay: '1–2 days in Jeonju',
    best: 'Hanok stays, food, autumn colour',
  },
  Jeonnam: {
    intro: 'Korea’s deep south-west: the Suncheon Bay wetlands and national garden, Yeosu’s night sea, the green-tea terraces of Boseong, the bamboo forests of Damyang, and more than two thousand islands off the coast. Slow travel country.',
    from: '2 hours 30 minutes to 3 hours by KTX to Yeosu, Suncheon or Mokpo',
    stay: '2–3 days',
    best: 'Nature, islands, tea and bamboo, food',
  },
  Gwangju: {
    intro: 'The city of the Gwangju Biennale and of the 1980 democracy uprising, with the Asia Culture Center, the 18 May memorial sites and a food reputation far bigger than its size. The gateway to the south-west.',
    from: 'About 1 hour 50 minutes by KTX from Yongsan',
    stay: 'A day or a night',
    best: 'Contemporary art, modern history, food',
  },
  Jeju: {
    intro: 'Korea’s volcanic island, a UNESCO site: Hallasan at the centre, hundreds of small volcanic cones, lava tubes, black-rock coastlines, the Olle walking trails and the haenyeo women divers. Warmer than the mainland, and best explored by car.',
    from: 'About 1 hour by air from Seoul Gimpo or Busan',
    stay: '3–4 days',
    best: 'Nature, hiking, beaches, a relaxed pace',
  },
};
