// 축제 소개 다시 쓰기 (2026-11-13, 청약각 공동 회의 지적: 축제 상세 영어가 번역투).
// 노출이 많은 축제만 자연스러운 영어로 다시 쓴 소개를 얹는다. 회차와 무관한 설명이라
// festival-notes 와 달리 회차 조건 없이 적용한다 — KTO 가 행사 성격 자체를 바꾸면 손으로 지울 것.
// 다시 쓴 글은 기계번역이 아니므로 mt(번역 고지)를 끈다.
// hours/fee 를 null 로 두면 KTO 값을 지운다 — 확인해 보니 작년 값이거나 근거가 없을 때 (예: HUG RUN 요금).
export type FestivalOverview = { overview: string; place?: string; hours?: null; fee?: null; checked: string };

export const FESTIVAL_OVERVIEWS: Record<string, FestivalOverview> = {
  // Royal Guard-Changing Ceremony at Deoksugung Palace
  "292961": {
    overview: "The Royal Guard-Changing Ceremony takes place in front of Daehanmun Gate, the main entrance to Deoksugung Palace, at 11:00 and 14:00 every day except Monday. It re-creates the changing of the sumungun, the guards who kept the palace gates during the Joseon dynasty, with costumes, banners and drill based on historical records.\n\nA drum signal opens the ceremony, and the outgoing guards hand over the gate to the incoming watch in a formal procession. You watch from the pavement in front of the gate, so there is no ticket and no charge.\n\nAround the ceremony you can have a go at beating the drum, try on a guard's uniform or pose for photos in Joseon-era dress. Daehanmun Gate is opposite Seoul Plaza, a short walk from City Hall Station.",
    checked: '2026-11-13',
  },
  // Sungnyemun Gate Guard Ceremony 2026
  "3107059": {
    overview: "At Sungnyemun Gate (Namdaemun), guards in Joseon-dynasty uniform reenact pasu, the watch kept over the gates of the old city wall. The ceremony runs from 10:00 to 15:40 every day except Monday on the plaza in front of the gate, and it is free to watch.\n\nThe day opens with the guards forming up and the timekeeper announcing the hour. Conch and horn signals sound, and on the commander's order the gate-opening ritual begins. Six rounds of guard duty and shift changes follow through the day before the closing ritual.\n\nSungnyemun is a National Treasure and sits between Seoul Station and Myeong-dong, so it is easy to stop by for a few minutes on a walk through central Seoul, or to time your visit for the opening or closing ritual.",
    checked: '2026-11-13',
  },
  // Namsan Beacon Ceremony and Traditional Culture Events
  "2809535": {
    overview: "During the Joseon dynasty, the beacon mound on Namsan was the last link in a nationwide chain of signal fires that carried news to the capital. This year-round Seoul programme recreates that system with a beacon-lighting ceremony at the Namsan beacon site, explained by a commentator, alongside other traditional events in the city centre.\n\nAt Bosingak Pavilion in Jongno, there is a bell-ringing ceremony at noon, and the plaza around Palgakjeong near N Seoul Tower hosts samulnori percussion and traditional martial-arts demonstrations. Some sessions let visitors take on the role of night watchman or beacon keeper.\n\nEvents run between 11:00 and 15:40 and are free to watch. If you are heading up Namsan to N Seoul Tower anyway, check the schedule on the official website first so you can catch the ceremony.",
    place: "Namsan Beacon Mound (Namsan Bongsudae) and Bosingak Pavilion",
    checked: '2026-11-13',
  },
  // Palsaek Chanran: Regions Full of K
  "4082595": {
    overview: "Palsaek Chanran: Regions Full of K is a free exhibition on the first floor of Cheong Wa Dae Sarangchae, the visitor building next to the former presidential compound in Seoul. It sets out to show that the 'K' in K-culture comes from Korea's regions as much as from Seoul.\n\nRegional displays and media art pieces show how the history, arts and heritage of each province have fed into today's Korean films, dramas, music and design. It suits visitors who have already seen K-culture on screen and want to know more about the places behind it.\n\nThe exhibition runs until 31 December, from 09:00 to 18:00, and is closed on Tuesdays. It combines easily with a visit to Cheong Wa Dae or Gyeongbokgung Palace, both a short walk away.",
    checked: '2026-11-13',
  },
  // Gugak Performance Jinyeon — https://v.daum.net/v/20260415175512962
  "4060947": {
    overview: "Jinyeon is a small traditional music theatre on the second floor of a building at the Insadong crossroads in Seoul. It stages a daily gugak (traditional Korean music) show inspired by royal banquets, with performances at 11:00, 14:00 and 16:00. There are no shows on public holidays.\n\nThe show is in three parts. The first is a blessing for the audience. The second features court-style performances and pieces of jeongak (court and aristocratic music) and sanjo (solo instrumental music). The finale has performers playing familiar tunes on traditional instruments, including K-pop, classical pieces and folk songs from around the world. The hanok-style room is intimate, and you can talk to the musicians.\n\nThe listed general admission price is 65,000 won, and children under 24 months go free. Prices vary between booking sites, so it is worth comparing before you buy.",
    checked: '2026-11-13',
  },
  // DDP Architecture Tour
  "3473295": {
    overview: "The DDP Architecture Tour is a 60-minute guided walk around Dongdaemun Design Plaza (DDP), the curving building designed by Zaha Hadid. It covers the architecture itself and the history of the Dongdaemun area, including the site's past as a baseball and football stadium.\n\nThe English-language tour starts at 13:30, with Korean-language tours at 10:30 and 15:30, from Tuesday to Sunday. There are no tours on Mondays, New Year's Day, Seollal or Chuseok. Meet at the tour desk on the first floor of the DDP Museum. The tour is for ages 13 and up, and younger children must be accompanied by an adult.\n\nTickets cost 10,000 won for adults and 5,000 won for children, with discounts for some groups. Book through the DDP website, or join on the day if places are left. Unsold places are released 10 minutes before the start.",
    checked: '2026-11-13',
  },
  // The Painters
  "3481597": {
    overview: "The Painters is a non-verbal stage show in which performers paint, dance and do comedy at the same time, often finishing a picture in a few minutes. Projection mapping adds moving images to the live art. It runs at The Painters Gwanghwamun Theater in Jeong-dong, near Deoksugung Palace.\n\nActs include light carving (drawing with light), action painting across four panels, dust drawing, where the full picture only appears at the end, speed drawing, marbling on water and glow-in-the-dark drawing. With no dialogue at all, it works for visitors who don't speak Korean and for families with older children.\n\nShows are usually at 14:00, 17:00 and 20:00, but the schedule can change, so check the official website. Tickets cost 70,000 won (VIP), 60,000 won (R) and 50,000 won (S).",
    checked: '2026-11-13',
  },
  // 2026 Culture Day: Cheongchun Mic (Jeolla & Jeju) — https://www.wikitree.co.kr/articles/1172605
  "3488655": {
    overview: "Cheongchun Mic is a free busking programme that puts young performers, alongside some senior groups, on outdoor stages across the Jeolla provinces and Jeju. It is part of Korea's Culture Day (Munhwaga Inneun Nal) initiative, run by the Ministry of Culture, Sports and Tourism and the Korea Local Culture Agency, and gives emerging artists regular shows in everyday public spaces.\n\nThe 2026 season runs until 11 December, with dozens of performances in parks, plazas and streets around the region, including Jungoe Park in Gwangju. Genres range from classical and pop to gugak (traditional Korean music) and multidisciplinary work.\n\nTimes and locations change from show to show, so check the programme website before you go. You don't need a ticket, and you can drop in or move on whenever you like.",
    checked: '2026-11-13',
  },
  // Ssokssokdeul-i Festival — https://xn--ok0b236bp0a.com/place/28817
  "4070501": {
    overview: "The Ssokssokdeul-i Festival is a free performance series at the National Theater of Korea's Stage Arts Support Center in Heyri Art Village, Paju. Shows take place on the second and fourth Saturdays of the month at 14:00 in the 'Ssok' Experience Theatre on the ground floor, and last about an hour.\n\nThe line-up changes each time, covering bands, gugak (traditional Korean music), musical theatre and world music, and is chosen to suit all ages. Coming up are the National Orchestra of Korea's 'NOK Choice' on 14 November and the Latin group Latin Kitchen Luna on 28 November. The programmes for 12 and 26 December are still to be announced.\n\nFree tickets are handed out at the ground-floor information desk from 12:00 on the day, first come, first served, and can run out early. Schedules can change, so check the National Theater of Korea website before travelling.",
    checked: '2026-11-13',
  },
  // 20th Century Photography Masters: Light, Stopping Time
  "4101384": {
    overview: "This exhibition brings together 80 original prints by 17 photographers who shaped 20th-century photography, including Henri Cartier-Bresson, Tina Modotti and William Klein. The works come from the collection of Gallery Lumiere and are on show at Art Chosun Space near City Hall from 20 November 2026 to 28 March 2027.\n\nThe focus is on the physical print. Silver gelatin and platinum prints show textures and tones that a screen image can't, and seeing them in person is the point of the show. It suits anyone interested in photography or looking for a quiet indoor visit in central Seoul.\n\nThe gallery is open from 10:00 to 18:00, with last entry at 17:30. Tickets cost 12,000 won for adults and 9,000 won for young people and seniors, and infants go free. There is a 50% discount on Culture Day, the last Wednesday of each month.",
    checked: '2026-11-13',
  },
  // Walk of the Royal Family — https://www.ktriptips.com/kor/festival/2433596
  "2433596": {
    overview: "The Walk of the Royal Family is a free daily reenactment of Joseon-dynasty court life inside Incheon International Airport. It takes place in the departure area after security, so it is for passengers waiting for a flight rather than for people meeting arrivals.\n\nIn Terminal 1, a king and queen in full court dress stroll through the duty-free area at 11:00 and 14:00, as if walking in the palace grounds. In Terminal 2, a royal and military procession reenacts a late-Joseon visit to a martial arts examination. It sets out near the Korean Traditional Culture Center (East) at 11:00 and 14:00 from Sunday to Tuesday, and at 13:00 and 14:00 on Wednesday and Thursday. Each walk lasts about 30 minutes.\n\nAfter each procession, you can take photos with the cast in costume. The programme runs until 31 December and is organised by the Korea Heritage Service.",
    checked: '2026-11-13',
  },
  // 2026 Visit Korean Islands Year — https://news.mtn.co.kr/article/2026110504333240738
  "4067214": {
    overview: "The Korean government has made 2026 a year of island travel, promoting the nature and culture of the country's many islands through travel discounts, cultural events and regional programmes that run until the end of the year. The visitisland.kr website is the central hub for the campaign.\n\nThe campaign was built around the 2026 Yeosu World Island Expo, which ran from 5 September to 4 November in Yeosu, Jeollanam-do. The expo has now closed, but the national programme continues until December. Island events and discounts are run by regional governments, so check visitisland.kr and the local tourism websites for what is open.\n\nIf you are planning a trip to the islands off Korea's south coast, such as those around Yeosu, Tongyeong or Mokpo, start with the hub site. Check ferry schedules before you set off, as sailings can be cancelled in bad weather.",
    place: "Nationwide",
    checked: '2026-11-13',
  },
  // MATERIALISM | Curated Exhibition by the Bjarke Ingels Group — https://mediahub.seoul.go.kr/archives/2019950
  "4149562": {
    overview: "MATERIALISM is the first exhibition in Korea devoted to BIG (Bjarke Ingels Group), the Copenhagen-founded architecture practice led by Bjarke Ingels. It is on at the Seoul Urban Architecture Exhibition Hall, opposite Deoksugung Palace, from 7 November 2026 to 28 February 2027, and admission is free.\n\nThe show is organised around ten materials: stone, earth, concrete, metal, glass, wood, textiles, plastic, plants and recycled materials. About 50 project models, around 60 study models, photographs and drawings show how BIG uses each one. You can touch the material samples. The exhibition is on the two basement floors and ends with a film about the studio's working methods.\n\nThe hall is open from 10:00 to 18:00, until 21:00 on Saturdays, and closed on Mondays. A guided tour programme is planned, with details to be announced on the hall's website and Instagram.",
    checked: '2026-11-13',
  },
  // Yuseong On-Day
  "4098134": {
    overview: "Yuseong On-Day is a series of easy-going activities in the Yuseong Hot Springs district of Daejeon, aimed at visitors who want a slower day than a sightseeing schedule allows. Programmes run until 11 December, and you sign up on the official website.\n\nActivities include yoga classes that combine aromatherapy and tea on the lawn at Kyeryong Spatel, an outdoor cinema with a big screen and wireless headphones, and small classical and film-music concerts in the front garden of Biryongjae, a former presidential villa. There is also a self-timed running challenge along the Gapcheon stream that you can do whenever suits you.\n\nParticipants receive coupons for hotels, cafés and bakeries in the hot-springs area. Fees and times vary by programme, so check yu-on.com for details.",
    checked: '2026-11-13',
  },
  // QUAD, Questions of Theatre: Incendies — https://www.quad.or.kr/product/performance/1278
  "4115275": {
    overview: "Daehangno Theatre QUAD presents a Korean-language production of Incendies, by the Lebanese-Canadian playwright Wajdi Mouawad, from 14 November to 6 December as part of its 'Questions of Theatre' series. The play was also the basis for Denis Villeneuve's 2010 film.\n\nWhen their mother Nawal dies after five years of silence, twins Jeanne and Simon find two requests in her will: deliver a letter to a father they thought was dead and another to a brother they never knew existed. As they trace her past in the Middle East, they uncover the truth behind her silence.\n\nPerformances are at 19:30 on weekdays and 15:00 at weekends, with an extra 18:00 show on Saturday 14 November and none on Mondays. All seats cost 50,000 won, with discounts on the theatre's website. It is performed in Korean and is best suited to people who already know the play.",
    checked: '2026-11-13',
  },
  // QUAD, Questions of Theatre: Train to Xi'an
  "4115260": {
    overview: "Train to Xi'an is a Korean-language play at Daehangno Theatre QUAD, running from 16 to 27 December as part of the theatre's 'Questions of Theatre' series.\n\nA Korean man with a Chinese mother is on a train heading for the tomb of the First Emperor near Xi'an. On the way, he thinks about the terracotta army he is about to see and about a ruler who wanted to live forever. Against that huge ambition, he looks at his own smaller unanswered hopes, above all a love that was never fully returned.\n\nPerformances are at 19:30 on weekdays and 15:00 at weekends, with none on Mondays. All seats cost 50,000 won, with discounts available on the theatre's website. It is performed in Korean, so it suits Korean speakers or regular theatregoers who want to see new Korean writing.",
    checked: '2026-11-13',
  },
  // Culture Lounge Gyeonggi-Jang — https://www.dailian.co.kr/news/view/1632476/
  "4058556": {
    overview: "Culture Lounge Gyeonggi, Jang is a free pop-up cultural space in Suwon that showcases Gyeonggi Province's culture and travel in one room. It is underground on the pedestrian mall at Gyeonggi Convergence Town in Gwanggyo, next to the Gyeonggi Library, and stays open until 15 December.\n\nIt has four zones. Local Radar suggests a Gyeonggi itinerary based on a short personality quiz. The Gyeonggi Ceramics Shop sells local pottery and offers tea tastings and craft sessions. Art & Goods has small exhibitions and souvenirs, and Play Gyeonggi hosts short performances and film screenings.\n\nOpening hours are 10:00 to 18:00, Tuesday to Sunday. Entry is free, but the craft and tea sessions need booking in advance through Naver Booking. It is a useful place to plan day trips beyond Seoul if you are visiting Suwon's Hwaseong Fortress.",
    place: "Culture Lounge Gyeonggi, Jang",
    checked: '2026-11-13',
  },
  // Seoul Street Performance: Every Corner Live 2026
  "2720203": {
    overview: "Every Corner Live is Seoul's city-run street performance programme. About 150 acts selected through an open call play free sets in public spaces across the city, including station exits, plazas and park corners. There is no ticket or stage to find, as the shows take place where people are already walking.\n\nThe line-up varies by location and day. Because the shows are free and outdoors, you can stop for one song or stay for the whole set.\n\nPerformances run into late autumn. Times and locations change every week, so check the programme's Instagram account (@seoulbusking) to see who is playing near you.",
    checked: '2026-11-13',
  },
  // Culture Flows at Seoul Plaza
  "2598331": {
    overview: "Culture Flows at Seoul Plaza is a season of free open-air evening concerts on the outdoor stage at Seoul Plaza, the lawn in front of Seoul City Hall. The 2026 season opened on 6 May, and shows usually run from 18:00 to 19:30.\n\nEach month has its own theme, covering pop, hip-hop, jazz, bands and other performances. You don't need to book, so you can join the crowd on the lawn for part or all of the show.\n\nThe plaza is next to City Hall Station (Lines 1 and 2) and across the road from Deoksugung Palace, so a concert fits easily into an evening in central Seoul. Line-ups and dates are posted on cultureseoul.co.kr. Check the schedule before you go, as outdoor shows can change with the weather.",
    checked: '2026-11-13',
  },
  // Busan Bridge Marathon — https://busanmarathon.com/guide/mainpoints
  "4095478": {
    overview: "The Busan Bridge Marathon takes place on Sunday 6 December, starting and finishing at BEXCO in Haeundae, with runners gathering in BEXCO Exhibition Hall 1. Both the full course and a 10km race run on roads normally open only to traffic, including the upper deck of Gwangan Bridge.\n\nThe full marathon (42.195km) crosses Gwangan Bridge, Busan Harbor Bridge and Namhang Bridge before turning near Chungmu-dong and returning the same way, with a five-hour time limit. It is only open to runners with a certified finish of 4:30 or faster from another race. The 10km starts on Gwangan Bridge and finishes at BEXCO via Gwangalli Beach. Both races are for adults aged 18 and over.\n\nEntry cost 80,000 won for the full marathon and 60,000 won for the 10km, with places capped at 12,000. Registration sold out on its first day, so this is mainly worth knowing if you are in Busan that weekend and want to watch.",
    place: "BEXCO Exhibition Hall 1",
    hours: null,
    checked: '2026-11-13',
  },
  // Goesan Space City: Star Explorers
  "4062805": {
    overview: "Goesan Space City: Star Explorers is a free hands-on exhibition for children at the Goesan Eco Museum in Goesan, Chungcheongbuk-do. It is set in an imagined 'space ecology' where fruits and plants are explored through looking, touching and moving.\n\nChildren follow an interactive course and invent their own stories as they go, while parents are encouraged to act as fellow guides rather than watch from the side. It is aimed at young children and their families.\n\nThe exhibition runs until 6 December, from 10:00 to 18:00, and is closed on Mondays. It is a useful indoor stop for families travelling through the Chungbuk countryside, especially on a cold or wet day.",
    checked: '2026-11-13',
  },
  // HUG RUN 2026 — https://hugrun.kr/
  "4108260": {
    overview: "HUG RUN is a charity run on Saturday 5 December at Peace Plaza in Sangam World Cup Park, western Seoul. It raises money for children affected by abuse, abandonment and neglect, and the whole entry fee is donated to support programmes. The organiser is the Eastern Social Welfare Society.\n\nThere are two courses, 5km and 10km. The stage programme begins at 07:30 and the run starts at 08:00, with booths for participants on site. Every runner gets a commemorative kit and a medal featuring Beni, a character by illustrator Gu Kyung-sun, and the kit is posted out about two weeks before the race. Super Junior's Eunhyuk is the event's official ambassador.\n\nRegistration is through the Leisure DY app or website, linked from hugrun.kr. Check there for the current entry fee and whether places are still available.",
    fee: null,
    checked: '2026-11-13',
  },
  // APAP Artwork Tour — https://xn--ok0b236bp0a.com/place/28036
  "3113698": {
    overview: "The APAP Artwork Tour is a guided walk around the public art created for the Anyang Public Art Project (APAP), which has commissioned works for the city's streets and parks in each edition since 2005. A docent leads the tour and covers works from all seven editions so far.\n\nThere are two main routes: one through Anyang Art Park, home to the Anyang Pavilion, and one around Jungang Park in Pyeongchon. Special evening tours also run, when the works are lit up. Tours start at 10:30 and 14:00 from Tuesday to Sunday, take 60 to 90 minutes and are not held on Mondays. Children aged 12 and under must be accompanied by an adult.\n\nTickets cost 3,000 won for adults and 1,000 won for under-19s, and special tours are priced separately. The 2026 season ends on 30 November. For bookings and details, see apap.or.kr.",
    checked: '2026-11-13',
  },
  // K-Gugak Stage — https://www.ktriptips.com/kor/festival/3435554
  "3435554": {
    overview: "The K-Gugak Stage is a series of performances at the National Gugak Center Namwon, Jeonbuk-do. Namwon is the setting of the Chunhyang story, and the centre's changgeuk company, orchestra and dance company perform in a programme lasting about 70 minutes.\n\nThe programme includes excerpts from pansori, the traditional sung storytelling, such as Chunhyangga, Simcheongga and Heungboga, together with salpuri dance, short changgeuk (Korean musical drama) scenes and samdo nongak, farmers' percussion. Slow, emotional pieces alternate with up-tempo rhythms that invite the audience to join in. The show is for ages 8 and up.\n\nThe 2026 series runs until 12 December. Yewondang, the main hall, is closed for refurbishment in the second half of the year, so some performances may move to another hall on the site. Check the dates, venue and booking details at namwon.gugak.go.kr or call 063-620-2329.",
    place: "National Folk Gugak Center (Namwon), Yewondang Hall",
    checked: '2026-11-13',
  },
  // Vegan & Halal Beauty Fair — https://www.ktriptips.com/kor/festival/3367405
  "3390251": {
    overview: "The Vegan & Halal Beauty Fair is a three-day trade and consumer show in COEX Hall B in Gangnam, Seoul, from 12 to 14 May 2027. Exhibitors present skincare, make-up and inner-beauty products that meet vegan, halal and other ethical or religious standards, many from smaller Korean brands that are hard to find in high-street shops.\n\nAlongside the stands, there are hands-on product trials and on-site events, and it is a good place to see where K-beauty is heading. It will interest anyone who follows vegan or halal cosmetics.\n\nThe fair is open from 10:00 to 18:00, with last entry at 17:30, and closes at 17:00 on the final day. Entry is free if you register online in advance (until 11 May) and costs 10,000 won on the door. Note that a separate Vegan & Clean Beauty Fair is held in the same hall around the same dates.",
    checked: '2026-11-13',
  },
};
