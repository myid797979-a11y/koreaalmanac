// 축제 보강 노트 — 이번 회차를 공식 출처로 확인해 덧붙인 방문 팁 (2026-11-13 시작, 겨울 축제부터).
//
// 장소 노트(lib/place-notes)와 다른 점:
//   - hours/fee 는 KTO 값을 **덮어쓴다**. 조사해 보니 KTO 축제 값이 틀린 경우가 있었다
//     (예: 유료 마켓이 "Free", 23시까지인 축제가 22시). 회차별 사실 확인이 더 정확하다.
//   - 회차(edition = 그 회차의 시작일)와 데이터 시작일이 ±60일 안일 때만 쓴다. 축제는 같은 id 로 내년 회차가
//     다시 올라오므로 그때는 노트가 자동으로 꺼진다 — 작년 팁이 올해 페이지에 남지 않는다.
//     (±60일 여유: KTO 가 같은 회차 날짜를 며칠 고쳐 올려도 노트가 유지되게)
//   - start/end/place 는 KTO 가 작년 값을 그대로 둔 것을 확인했을 때만 (예: 해운대 빛축제 2026).
export type FestivalNote = {
  edition: string;   // 이 노트가 다루는 회차의 시작일 YYYYMMDD
  start?: string; end?: string; place?: string;
  hours?: string;
  fee?: string;
  tip: string;
  checked: string;   // YYYY-MM-DD
};

export const FESTIVAL_NOTES: Record<string, FestivalNote> = {
  // Winter Lights of Cheonggyecheon — https://www.devtimes.co.kr/news/554282
  "2785797": {
    edition: "20261211",
    hours: "18:00–22:00 daily",
    fee: "Free",
    tip: "The 2026 display is the 12th, themed 'Light Up Tomorrow', so expect a new set-up rather than last year's golden cake tree: a large tree, LED sculptures and photo spots on Cheonggye Plaza, a small 'Dreamlight Train' ride for children and a big screen showing visitors' dream messages. It is free and lit 18:00–22:00 daily; the lighting ceremony is on Saturday 12 December. The plaza is compact, so 20–30 minutes is enough. Use it as the starting point for the Seoul Lantern Festival, which runs east along the stream from the same plaza until 31 January. This display closes earlier, on 31 December. Closest station: Gwanghwamun (Line 5) Exit 5; Jonggak (Line 1) and Euljiro 1-ga (Line 2) are about five minutes' walk.",
    checked: '2026-11-13',
  },
  // Seoul Light Gwanghwamun — https://festival.seoul.go.kr/festival/main/festivalView.do?festacode=372
  "4135897": {
    edition: "20261211",
    fee: "Free",
    tip: "The centrepiece is a media-façade projection onto Gwanghwamun Gate, so position yourself in the square facing north towards the gate. Last year the show ran in 24-minute cycles, eight or nine times a night, including an interactive segment started by visitors beating a drum. Arriving soon after the 17:30 start makes it easy to catch a full cycle before the evening crowds build, and weekdays are calmer than weekends. It is free and needs no booking. Gwanghwamun Station (Line 5) is directly beneath the square. Gwanghwamun Market runs on the same square, and the Seoul Lantern Festival starts a short walk south at Cheonggye Plaza. A New Year countdown is held here on 31 December; expect very heavy crowds that night.",
    checked: '2026-11-13',
  },
  // Seoul Lantern Festival — https://www.stolantern.com/
  "1121607": {
    edition: "20261211",
    hours: "18:00–23:00 daily",
    fee: "Free",
    tip: "The 18th edition is themed 'Romance of Seoul: Symphony of Light', with four zones of hanji (traditional paper) lanterns and media-art pieces along Cheonggyecheon from Cheonggye Plaza to Samilgyo Bridge. Lanterns are lit 18:00–23:00 daily, an hour later than many listings say, and entry is free. Start at Cheonggye Plaza and walk downstream (east) so you see the zones in order; last year's course was about 1.2 km. Last year the busiest time was 19:00–21:00 at weekends, while weekday evenings before 19:00 or after 21:00 were noticeably calmer. The path runs beside the water below street level and gets windy, so wear a warm coat, gloves and flat shoes. Nearest stations: Gwanghwamun (Line 5) Exit 5, Jonggak (Line 1) or Euljiro 1-ga (Line 2).",
    checked: '2026-11-13',
  },
  // Gwanghwamun Market — https://www.stolantern.com/
  "3043397": {
    edition: "20261211",
    fee: "Free",
    tip: "A European-style Christmas market on Gwanghwamun Square run by the Seoul Tourism Organization. Small businesses sell handmade goods, seasonal decorations and winter snacks. Entry is free and you pay at the stalls. The 2026 market runs from 11 December to 10 January, longer than last year's, which closed on 31 December. This year's opening hours had not been published at the time of writing. Last year it opened 17:30–22:00, staying open until midnight on New Year's Eve. Last year's photo spots (a carousel, a neon 'Merry Christmas' set and a wish wall) drew long queues, so go early on a weekday if photos matter. Gwanghwamun Station (Line 5) is directly beneath the square, and the Seoul Light façade show plays on the gate at the north end.",
    checked: '2026-11-13',
  },
  // Korea Grand Sale — https://www.asiatoday.co.kr/kn/view.php?key=20261005010001157
  "2758139": {
    edition: "20261223",
    hours: "Myeong-dong Welcome Center 11:00–20:00 daily (as listed by KTO)",
    fee: "Free",
    tip: "This is not a single-site event but a 53-day nationwide discount campaign for foreign visitors, run by the Visit Korea Committee. Participating businesses cover shopping, accommodation, food and drink, experiences, transport, beauty and wellness, and convenience services. Offers and their conditions are listed on the official site (koreagrandsale.co.kr), so check before you book or shop. The main hub is the Welcome Center on the ground floor of Noon Square in Myeong-dong (14 Myeongdong-gil), listed as open 11:00–20:00 daily. Last edition it offered travel information, English/Chinese/Japanese interpretation, free Wi-Fi and prize draws. Organisers also plan welcome centres in Busan and Gangwon, plus a touring pop-up truck.",
    checked: '2026-11-13',
  },
  // Lighting Festival at The Garden of Morning Calm — https://www.morningcalm.co.kr/
  "1866962": {
    edition: "20261204",
    hours: "10:00–21:00 during the festival (Saturdays to 23:00); lights from dusk",
    fee: "Adults ₩11,000 · Teenagers ₩8,500 · Children ₩7,500",
    tip: "The 2026–27 season runs from 4 December to 14 March. During the festival the garden stays open until 21:00 (23:00 on Saturdays). Last season the lights came on at 17:00, so arrive mid-afternoon to see the garden in daylight, then stay for the illuminations. One ticket covers both: ₩11,000 for adults, ₩8,500 for teenagers and ₩7,500 for children aged 36 months and over. The garden sits in the hills of Gapyeong, colder than central Seoul, and the paths slope, so wear warm, grippy shoes. Without a car, take the Gyeongchun Line to Cheongpyeong or Gapyeong, then a local bus or taxi for the last stretch. Check your return bus, or how to get a taxi back, before you go in, because the lights stay on into the evening.",
    checked: '2026-11-13',
  },
  // Oh Slow Vintage Christmas Market — https://ohslowmarket.com
  "3536904": {
    edition: "20261204",
    hours: "Fri–Sun only, 11:00–19:00",
    fee: "₩10,000 on site; ₩5,000 early-bird online until 30 Nov; primary-school age and under free",
    tip: "This is a ticketed event, not free: ₩10,000 at the door, or ₩5,000 if bought online by 30 November through Naver booking (in Korean). Primary-school children and younger go free. Tickets are valid for one day, with re-entry allowed on that day only. It opens on Fridays, Saturdays and Sundays only (4–6, 11–13 and 18–20 December), 11:00–19:00, across Sangsang Platform halls 1 and 2 and the Lounge. Expect vintage clothing, homewares and crafts, live music from jazz to city pop and DJ sets, and a Christmas ornament workshop. Carry some cash for smaller sellers. The venue is about three minutes' walk from Incheon Station Exit 1, at the end of Seoul Subway Line 1, and Incheon Chinatown is just across from the station.",
    checked: '2026-11-13',
  },
  // Unjeong Lake Park Fireworks Festival — https://www.atpaju.com/news/articleView.html?idxno=46922
  "2789700": {
    edition: "20261031",
    hours: "Light Garden: dusk–22:00 daily until 31 Dec",
    fee: "Free",
    tip: "The fireworks night itself (the 8th edition, on 31 October 2026) is over. What remains until 31 December is the free Light Garden around Unjeong Lake Park, lit every day from dusk, when the street lights come on, until 22:00. It is a neighbourhood display in Paju's Unjeong new town rather than a major attraction, so it suits visitors already staying in north-west Gyeonggi; 30–60 minutes is enough for a lakeside walk. The organisers advise public transport over driving: the nearest rail stop is Unjeong Station on the Gyeongui–Jungang Line, then walk or take a local bus, so check the route on Naver Map or Kakao Map. Wrap up well, as it can be windy by the water. The 14:00–22:00 hours in the listing applied to the fireworks day only.",
    checked: '2026-11-13',
  },
  // Jemulpo Wave Market — https://www.culturegb.com/news/view.php?idx=2506
  "3507211": {
    edition: "20261121",
    hours: "11:00–18:00 both days",
    tip: "This weekend's edition, the fourth of 2026, is a 'Farmers Market', so expect food and produce rather than the vintage-and-lifestyle mix described above. About 20 Incheon farm and village-enterprise stalls join 36 local brands, selling discounted produce, Hanwoo beef from a truck, Ganghwa Island produce, handmade desserts, local liquor and crafts. It runs 11:00–18:00 on both days in Sangsang Platform's Wave Hall. Market specials are held at 13:00 and 16:00 each day, and there are six hands-on workshops, including glassware, syrup-making and mini succulent pots. Spending ₩10,000 earns a stamp, and three stamps get a ₩3,000 coupon. The venue is about three minutes' walk from Incheon Station Exit 1 (Line 1), opposite Chinatown.",
    checked: '2026-11-13',
  },
  // The Souvenir Fair — https://www.specialtimes.co.kr/news/articleView.html?idxno=485100
  "3554627": {
    edition: "20261120",
    hours: "20–21 Nov 10:00–19:00; 22 Nov 10:00–18:00 (last entry 30 min before closing)",
    fee: "Free",
    tip: "Run by the Korea Tourism Organization, this is a good place to see what Korea's better souvenir makers produce beyond the usual tourist-street stock. About 140 companies and local governments fill DDP's Art Halls 1 and 2, and the 25 winning entries from the 2026 Korea Tourism souvenir competition are on display. Entry is free and many goods are on sale. It opens 10:00–19:00 on 20–21 November and 10:00–18:00 on Sunday 22 November, with last entry 30 minutes before closing. There is also a stamp tour. Part of the fair is trade-focused, with B2B meetings, so not every booth sells to the public. DDP connects to Dongdaemun History & Culture Park Station (Lines 2, 4 and 5) via Exit 1, and Dongdaemun's late-night fashion malls are across the road.",
    checked: '2026-11-13',
  },
  // Pohang International Fireworks Festival — https://www.wikitree.co.kr/articles/1173136
  "1037621": {
    edition: "20261119",
    place: "Yeongildae Beach and the Songdo area, Pohang",
    tip: "In 2026 the festival is centred on Yeongildae Beach and the Songdo area, not Hyeongsangang Sports Park as older listings say. The main international fireworks (Korea, France and Japan) start at 20:00 on Saturday 21 November over the sea off Yeongildae, followed by an EDM after-party. Thursday 19th has a smaller citizens' fireworks show and the Songdo silo media-façade lighting; Friday 20th brings the light parade and a night walk over Haeoreum Bridge. Over 150,000 people are expected and roads around Yeongildae will be controlled, so arrive by late afternoon, avoid driving and expect a slow exit. Watching from the sand has traditionally been free. The seafront is cold and windy, so bring gloves and something to sit on.",
    checked: '2026-11-13',
  },
  // Busan Christmas Village — https://mom-mom.net/travel/places/6ae15fdf9e14a73a93a9f039
  "4135883": {
    edition: "20261126",
    hours: "Thu–Fri 16:00–22:00; Sat–Sun and 24–25 Dec 11:00–22:00. Closed Mon–Wed until 20 Dec; open daily 21–25 Dec",
    fee: "7,900 won (weekday, or weekend daytime entry 11:00–15:00); 9,900 won weekend evening (entry from 16:00); 16,900 won on 24–25 Dec; under 36 months free with proof of age",
    tip: "Until 20 December the village opens only Thursday to Sunday (closed Monday to Wednesday), then daily from 21 to 25 December. Tickets are timed: a weekend daytime ticket admits you only between 11:00 and 15:00, there is no entry from 15:00 to 16:00, and evening entry starts at 16:00. Buying ahead on YES24 is cheaper than at the gate. Food and drink are paid for separately and outside food is not allowed (baby food excepted). At set times a bell rings, artificial snow falls and a parade and choir follow, so check the schedule on arrival. Go by metro: Centum City Station (Line 2) is about a five-minute walk from exits 6 or 12, and parking fills at weekends. Pair it with the Haeundae Light Festival a few stops east on Line 2.",
    checked: '2026-11-13',
  },
  // Haeundae Light Festival — https://www.kmunews.co.kr/news/articleView.html?idxno=435186
  "3565954": {
    edition: "20261129",
    start: "20261128",
    end: "20270110",
    tip: "The 13th edition, themed 'Deep Dive Haeundae', opens with a lighting ceremony on 28 November and runs until 10 January 2027. The route starts at Haeundae Square on Gunam-ro, a short walk from Haeundae Station (Line 2), and continues onto the beach: a 30 m light tunnel and 11 Christmas trees on the street, then a 12 m ship, a whale, a submarine and a lighthouse with a 2027 wish zone on the sand. Weekend workshops include glow-in-the-dark bracelets and fishbowl lamps, and a snow machine runs at Christmas. Last winter the lights ran from 18:00 to 23:00 with free entry; daily hours for this edition have not yet been published. Allow about an hour, wrap up against the sea wind and avoid Christmas Eve and New Year's Eve if you dislike crowds.",
    checked: '2026-11-13',
  },
  // E-World Illumination — https://www.ktriptips.com/eng/festival/2513248
  "2513248": {
    edition: "20261121",
    tip: "The lights are inside E-World, a paid theme park, so you need a park ticket. Admission and hours for this season were not on E-World's site at the time of writing. In past seasons the park sold a cheaper evening ticket valid from 17:00, but check before you go. It is dark by about 17:30 in late November, so an evening visit gives you the most light for your money. The observatory in 83 Tower, which overlooks the park, has been charged separately from park tickets. Take Daegu Metro Line 2 to Duryu Station, then walk; driving and parking can be slow on weekend evenings and on 24–25 December. Weekday evenings are the quietest. Wear warm layers, because most of the light displays are outdoors.",
    checked: '2026-11-13',
  },
  // Ulsan Christmas Market — https://www.ktriptips.com/kor/festival/3578130
  "3583850": {
    edition: "20261127",
    hours: "18:00–22:00, Fridays and Saturdays, plus 23–26 Dec",
    fee: "Free",
    tip: "The market is open on Fridays and Saturdays only, plus every evening from 23 to 26 December, so a weekday visit before Christmas week will find it closed. It is set up around the windmill near the main gate of Ulsan Grand Park, with craft and food stalls, food trucks, a merry-go-round, Santa's House, a snow zone and busking. Entry is free. Last year visitors reserved free timed entry slots online in advance and many filled up, so check the organiser's channels to see whether booking applies again. An hour or so is enough. Ulsan's KTX station is well outside the city centre, so allow plenty of time to get there by bus or taxi. December nights are cold, so dress warmly.",
    checked: '2026-11-13',
  },
  // Jeongdongjin Sunrise Festival — https://www.yugacrew.com/crewletter/jeongdongjin-sunrise
  "1117592": {
    edition: "20261231",
    tip: "As of mid-November 2026, Gangneung City had not announced its 2027 programme, traffic controls or special trains. The pattern last year was free stage performances from 20:00 to 00:30 on 31 December, with the giant sandglass turned at midnight and fireworks, then a sunrise programme from 06:00 to 08:00 on 1 January. Sunrise in Gangneung on 1 January 2027 is calculated at 07:40 (at sea level). Jeongdongjin Station sits right beside the beach, and Korail has run special sunrise trains from Seoul in past years. Seats sell out, so book as soon as any go on sale. Roads into Jeongdongjin jam badly overnight. Expect sub-zero wind on the shore: wear thermals, a hat and gloves, and bring a hot drink. Check Gangneung City notices before travelling.",
    checked: '2026-11-13',
  },
  // Yeosu Hyangiram Sunrise Festival — https://www.yugacrew.com/crewletter/yeosu-sunrise-time
  "1490063": {
    edition: "20261231",
    tip: "Yeosu had not published the 2027 programme or traffic plan by mid-November 2026, so treat the following as last year's pattern. The opening was at 23:00 on 31 December, the bell was struck 33 times at midnight, fireworks went up from Impo breakwater at 00:10, and sunrise viewing ran from about 07:30 to 07:50. Sunrise on 1 January 2027 is calculated at 07:36 in Yeosu. Cars were held at temporary car parks with shuttle buses to Impo, and early city buses 111 and 111-1 ran from Yeosu Expo Station. The final climb is up steep stone steps and through narrow rock passages, so wear proper shoes and use a torch. Viewing spots fill hours before dawn. Last year oyster tteokguk cost 3,000 won.",
    checked: '2026-11-13',
  },
  // Homigot Sunrise Festival — https://www.hankyung.com/article/2025121058181
  "293277": {
    edition: "20261231",
    tip: "Pohang had not announced the 2027 festival schedule, shuttle buses or traffic controls by mid-November 2026. At the last edition (the 28th), the site at Homigot Haemaji Square opened at 14:00 on 31 December with mask-making, a food zone, tteokguk and fortune-telling. Performances began at 23:00, a media-façade show was projected on the lighthouse at midnight, and a final performance ran just before sunrise. Sunrise in Pohang on 1 January 2027 is calculated at 07:33 at sea level. The square is free and normally has parking, but more than 50,000 people came last time and the roads onto the cape jam, so arrive the evening before. Expect a long, freezing night by the sea: bring thermals, a blanket and a hot drink.",
    checked: '2026-11-13',
  },
  // Pyeongchang Trout Festival — https://festival700.or.kr/
  "661861": {
    edition: "20270101",
    tip: "The 2027 dates are listed by the Korea Tourism Organization but had not been confirmed by the organiser in mid-November 2026. Last season's opening slipped from 1 January to 9 January because warm weather delayed the ice, so check festival700.or.kr before you travel. Last season the gates were open 09:00–17:00 and ticket sales stopped at 16:00. Prices were 25,000 won for ice fishing, 39,000 won for tent fishing (book online) and 20,000 won for bare-hand trout catching; rods were sold on site and under-school-age children got in free. KTX to Jinbu (Odaesan) Station takes about 1 h 40 min from Seoul Station, then it is a short taxi ride. Wear waterproof boots and warm gloves, and allow most of a day.",
    checked: '2026-11-13',
  },
  // Cheorwon Hantangang River Ice Trekking Festival — https://www.ktriptips.com/eng/festival/3310502
  "3310502": {
    edition: "20270116",
    tip: "The Korea Tourism Organization's dates are based on last year's information, and the 2027 festival had not been announced by mid-November 2026. The last edition ran for nine days, 17–25 January 2026. The Mulwit-gil floating trail itself opens in stages. The full 8.5 km route from Jiktang Falls to Sundam is scheduled from 12 December 2026 at 10,000 won for adults, with 5,000 won returned in Cheorwon local vouchers. Opening times are 09:00–17:00, with last entry at 16:00, and the trail is closed on Tuesdays and 1 January. The festival stage is below Seungilgyo Bridge. Last year a free shuttle for ticket holders ran every 30 minutes between Taebong Bridge, Goseokjeong and Sundam. It got close to -20°C last January: wear grippy boots.",
    checked: '2026-11-13',
  },
  // Taebaeksan Mountain Snow Festival — https://www.heraldk.com/article/2026012516015010616
  "892611": {
    edition: "20270131",
    tip: "Taebaek had not announced the 2027 (34th) edition by mid-November 2026, and the KTO dates mirror last year's, so check before booking. Last year's festival ran 31 January to 8 February 2026 around Danggol Square in Taebaeksan National Park. The grounds were open 10:00–17:00, with the snow sculptures lit until 22:00, so you can see them both by day and after dark. Activities included large snow and ice sled runs, smelt ice-fishing, chestnut roasting and an indoor zone at car park No. 1. Taebaek sits at about 700 m and is one of the coldest towns in Korea, so wear thermals, waterproof boots and gloves. Trains run to Taebaek Station from Seoul's Cheongnyangni Station. Allow half a day, longer if you plan to hike up Taebaeksan.",
    checked: '2026-11-13',
  },
  // Sunchang Korea Tteokbokki Festa — https://xn--ok0b236bp0a.com/place/28559
  "3395188": {
    edition: "20261121",
    hours: "10:00–17:00",
    fee: "Free entry; food and some programmes charged",
    tip: "Held over the weekend of 21–22 November around the Sunchang Fermentation Theme Park and Traditional Gochujang Folk Village. Entry is free; you pay for food. Tteokbokki stalls are grouped into Sunchang village booths using local gochujang, university booths and well-known 'alley tteokbokki' shops from around the country, plus side dishes such as fried snacks and sundae. Highlights include a cooking show by chef Jo Kwang-hyo and a sauce-making class with gochujang master Kang Soon-ok, which must be booked in advance on the festival website. Arrive before noon, when queues are shorter. Sunchang has no railway station, so plan on an intercity bus or a car. Leave time to buy gochujang in the Folk Village shops before you leave.",
    checked: '2026-11-13',
  },
  // Dan-Dan-Dan Festival — https://supple.kr/news/cmw8lt4v4jwbwal9p4rgtjuo0
  "2853386": {
    edition: "20261126",
    hours: "26 Nov 18:30; 27 Nov 10:30 and 18:30; 28 Nov 16:30 (performance start times)",
    fee: "Free",
    tip: "This is a short series of free performances rather than an all-day fair, so plan around the start times. On Thursday 26 November at 18:30, singer-songwriter An Ye-eun and Chudahye Chagis play shaman songs mixed with psychedelic rock. Friday 27th has a children's and youth traditional showcase at 10:30, then a joint show by four Gangwon troupes at 18:30 based on the Gangneung Danoje rites. On Saturday 28th at 16:30, the Yeongsanhong Concert features pansori singer Nam Sang-il and the street-dance group Animation Crew. Seats can be reserved free from 10 November at 10:00 on the Gangneung Danoje Heritage Education Center website (gn.go.kr/dano), and on-site registration is also offered. Gangneung is about two hours from Seoul by KTX.",
    checked: '2026-11-13',
  },
};
