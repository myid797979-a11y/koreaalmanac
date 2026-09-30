import { concerts, type Concert } from '@/lib/concerts';

// 공연장 가이드 — 사람들은 아티스트가 아니라 공연장을 검색한다 (GSC 2026-09-27: "illit inspire arena",
// "coex artium"). 공연장 페이지 하나가 거기서 열리는 모든 공연의 수요를 받고, 호텔 제휴가 붙을 자리다.
//
// 좌표·주소·좌석은 db/kopis_venues.json (KOPIS 공연장 API) 에서 가져왔다. seatscale 은 시설 전체라
// 홀별 수용 인원은 손으로 적었다. 본문은 2026-09-28 기준으로 쓴 것 — 교통(GTX-A 2024-12 개통,
// 잠실주경기장 재건축 폐쇄)이 바뀌면 여기만 고친다.
//
// match: concerts.json 의 venue 문자열을 이 가이드에 잇는 정규식. 표기가 흔들려도 잡히게 느슨하게.

export type Venue = {
  slug: string;
  name: string;
  korean: string;
  city: string;
  region: string;
  addr: string;
  lat: number;
  lng: number;
  capacity: string;
  kopisId?: string;
  official?: string;
  placeSlug?: string;     // 같은 곳의 KTO 장소 페이지 (있으면 사진도 빌려 쓴다)
  image?: string;
  match: RegExp;
  tagline: string;
  station: string;
  fromAirport: string;
  intro: string[];
  tips: string[];
  stay: string;
};

export const venues: Venue[] = [
  {
    slug: 'goyang-stadium',
    name: 'Goyang Stadium',
    korean: '고양종합운동장',
    city: 'Goyang',
    region: 'Gyeonggi',
    addr: '1601 Jungang-ro, Ilsanseo-gu, Goyang, Gyeonggi-do',
    lat: 37.676387, lng: 126.742072,
    capacity: 'About 41,000 for football; concert layouts vary with the stage',
    kopisId: 'FC003577',
    match: /goyang (stadium|sports complex)/i,
    tagline: 'Where the biggest international tours play while Jamsil is closed: Post Malone, The Weeknd, Charlie Puth, Bruno Mars.',
    station: 'Daehwa Station (Line 3), exit 2 — about 10 minutes on foot. Kintex Station on the GTX-A express line is a 20-minute walk and the faster route from Seoul Station.',
    fromAirport: 'Taxi 45–60 minutes. By rail, AREX to Seoul Station and then GTX-A to Kintex Station, about 1 hour 20 minutes in all.',
    intro: [
      'Goyang Stadium is an open-air football ground in Ilsan, a planned satellite city on the north-west edge of Seoul. With Seoul’s Jamsil Olympic Stadium closed for rebuilding, it has become the default venue for stadium-scale international tours, and most of the 40,000-capacity shows on this site in 2026 and 2027 are here.',
      'It is further out than it looks on a map: Line 3 from central Seoul takes about an hour to Daehwa, and the walk from the station is another ten minutes along a wide, well-lit road. The GTX-A express line changed that in December 2024 — Seoul Station to Kintex Station is now under 20 minutes, though Kintex Station is a longer walk to the stadium than Daehwa is.',
      'Shows here are open-air. Summer dates mean heat and sudden rain; late-autumn dates mean a cold wind across the pitch after dark. There is no roof over the standing sections.',
    ],
    tips: [
      'Line 3 is the safe way home: trains keep running well past a 22:00 finish, and Daehwa is the terminus, so you get a seat. Taxis are scarce at the gate; walk to Jungang-ro or the Kintex side if you need one.',
      'Standing tickets (the G sections) are entered in ticket-number order and queues form in the afternoon. Seated tickets can arrive at the gate 30 minutes before.',
      'Bag checks and a ban on professional cameras are standard. Water is sold inside; bring a light layer for after dark even in September.',
      'The KINTEX exhibition centre next door is where the arena-sized tours play. Check which one your ticket says before you set off.',
    ],
    stay: 'Ilsan is a real city with its own hotels around KINTEX and Daehwa, which saves the late-night trip back to Seoul. Sono Calm Goyang sits beside KINTEX; the business hotels around Jeongbalsan and Daehwa stations are cheaper. If you would rather stay in Seoul, anywhere on Line 3 (Jongno 3-ga, Anguk, Apgujeong) is a single train.',
  },
  {
    slug: 'inspire-arena',
    name: 'INSPIRE Arena',
    korean: '인스파이어 아레나',
    city: 'Incheon',
    region: 'Incheon',
    addr: '127 Gonghangmunhwa-ro, Jung-gu, Incheon (Yeongjong Island)',
    lat: 37.465530, lng: 126.389117,
    capacity: 'About 15,000',
    kopisId: 'FC003670',
    official: 'https://www.inspirekorea.com/',
    match: /inspire/i,
    tagline: 'Korea’s first purpose-built concert arena, on the airport island — which is exactly the point.',
    station: 'No station. Free INSPIRE shuttle buses run from Incheon Airport Terminal 1 and Terminal 2, about 15 minutes. From Seoul, take AREX to Terminal 1 and change to the shuttle.',
    fromAirport: 'You are already there. The arena is a free 15-minute shuttle from either terminal, which makes this the one Korean venue where landing on the day of the show is realistic.',
    intro: [
      'INSPIRE Arena opened in December 2023 inside the INSPIRE Entertainment Resort on Yeongjong Island, a few minutes from Incheon Airport. It was built for concerts rather than sport, so sightlines and sound are the best of the big Korean venues, and it has pulled a steady run of international and Japanese tours since — Vaundy, Takuya Kimura, ILLIT and YUURI on this site alone.',
      'The catch is geography. Yeongjong is an island joined to the mainland by two long bridges, and the arena is about an hour from central Seoul by the airport railway plus shuttle. Plan the journey home before you go, not after the encore.',
    ],
    tips: [
      'From Seoul, take AREX from Seoul Station or Hongik University Station to Incheon Airport Terminal 1, then the resort shuttle from the terminal bus bays. Allow 90 minutes door to door.',
      'Going back, the last AREX trains toward Seoul leave the airport a little before midnight and the express finishes earlier, so a 22:00 finish plus the shuttle queue is tight. Many overseas fans stay on the island instead.',
      'The resort has a food hall, restaurants and a casino (foreign passports only), so arriving early is no hardship. Merch usually opens in the afternoon.',
      'Promoters sometimes run paid coaches from Seoul for the biggest shows; check the event page when tickets go on sale.',
    ],
    stay: 'The resort’s own hotel is the obvious choice and the walk to the arena is indoors. Paradise City and the Grand Hyatt are beside Terminal 1, one shuttle stop away, and there is a strip of cheaper airport hotels in Unseo-dong. If your flight out is the next morning, this is the rare concert where staying at the airport is the smart itinerary rather than the sad one.',
  },
  {
    slug: 'olympic-park',
    name: 'Olympic Park venues',
    korean: '올림픽공원 KSPO돔 · 올림픽홀 · 핸드볼경기장',
    city: 'Seoul',
    region: 'Seoul',
    addr: '424 Olympic-ro, Songpa-gu, Seoul',
    lat: 37.521120, lng: 127.128363,
    capacity: 'KSPO Dome up to 15,000 · SK Handball Gymnasium about 5,000 · Olympic Hall about 3,000',
    kopisId: 'FC001247',
    official: 'https://www.olympicpark.co.kr/',
    placeSlug: 'olympic-park-789703',
    image: 'https://tong.visitkorea.or.kr/cms/resource/39/2650439_image2_1.jpg',
    match: /olympic park|kspo|olympic hall|handball/i,
    tagline: 'Seoul’s home arena for K-pop: three halls in one park, each with its own gate.',
    station: 'KSPO Dome and the Handball Gymnasium: Olympic Park Station (Line 5), exit 3, about 7 minutes. Olympic Hall: Mongchontoseong Station (Line 8), exit 1, through the Peace Gate, about 5 minutes.',
    fromAirport: 'AREX to Seoul Station, Line 4 to Dongdaemun History & Culture Park, then Line 5 east — about 1 hour 40 minutes. A taxi is 60–80 minutes outside rush hour.',
    intro: [
      'Olympic Park in south-east Seoul holds three concert venues left over from the 1988 Games, and between them they host more K-pop concerts than anywhere else in the country. KSPO Dome — still “the Gymnastics Arena” to locals — is the big one, where NCT 127, AKMU and &TEAM play on this site; Olympic Hall and the SK Handball Gymnasium take mid-sized tours and fan concerts.',
      'The park is large and the three halls are on different sides of it. Check the hall name on your ticket and use the matching station: Line 5 for KSPO Dome and the Handball Gymnasium on the north side, Line 8 for Olympic Hall by the Peace Gate on the west.',
    ],
    tips: [
      'Both stations get very crowded for 20 minutes after a show. Walking to the other line (10–15 minutes across the park) usually beats waiting.',
      'Bangi-dong’s restaurant alley is directly outside Olympic Park Station exit 3 and stays open late. It is the standard post-concert dinner.',
      'The park itself is worth an hour before doors: the Mongchontoseong earthen fortress, the sculpture park and the lake are all free.',
    ],
    stay: 'Jamsil (two stops west on Line 8, or a short taxi) has the big hotels around Lotte World; the streets around Olympic Park and Bangi stations have mid-range business hotels. Gangnam is 20–30 minutes by taxi.',
  },
  {
    slug: 'kintex',
    name: 'KINTEX',
    korean: '킨텍스',
    city: 'Goyang',
    region: 'Gyeonggi',
    addr: '217-60 Kintex-ro, Ilsanseo-gu, Goyang, Gyeonggi-do',
    lat: 37.669307, lng: 126.745684,
    capacity: 'Exhibition halls: Hall 10 takes roughly 10,000 standing; Halls 1 and 9 are smaller',
    official: 'https://www.kintex.com/',
    match: /kintex/i,
    tagline: 'An exhibition centre that moonlights as Seoul’s overflow arena: Maroon 5, Benson Boone, Jason Mraz, Khalid, FKJ and 5 Seconds of Summer all play here this season.',
    station: 'Kintex Station (GTX-A), about 10 minutes to Exhibition Center 2. Daehwa Station (Line 3), exit 2, is 15–20 minutes on foot or a short shuttle ride.',
    fromAirport: 'AREX to Seoul Station, then GTX-A to Kintex — around 1 hour 15 minutes. Airport limousine buses to Ilsan also stop near KINTEX; a taxi is 40–60 minutes.',
    intro: [
      'KINTEX is Korea’s largest exhibition centre, two enormous hall complexes in Ilsan on the north-west edge of Seoul. Its flat-floored halls — Hall 10 in the second building most often — are used as standing arenas for tours too big for Olympic Park and too small for a stadium, which in practice means most Western pop and rock acts visiting Korea.',
      'Since the GTX-A express line opened in December 2024, KINTEX is under 20 minutes from Seoul Station, which removes the old objection to venues out here. Line 3 from central Seoul still works but takes an hour.',
    ],
    tips: [
      'The hall number matters: Exhibition Center 1 (Halls 1–5) and Exhibition Center 2 (Halls 6–10) are separate buildings about 10 minutes apart. Your ticket says which.',
      'Exhibition halls have no fixed seating and no rake, so in seated layouts the back rows see less than the ticket price suggests; standing tickets reward arriving early.',
      'Sound in a hall built for trade shows is variable. The middle of the floor is usually better than the sides.',
      'GTX-A trains toward Seoul run until around midnight. Line 3 from Daehwa is the fallback, and the terminus means a seat.',
    ],
    stay: 'Sono Calm Goyang is inside the KINTEX complex and fills on show weekends; Ilsan’s business hotels around Jeongbalsan and Daehwa are the budget option. From Seoul, anywhere near Seoul Station puts you one GTX ride away.',
  },
  {
    slug: 'gocheok-sky-dome',
    name: 'Gocheok Sky Dome',
    korean: '고척스카이돔',
    city: 'Seoul',
    region: 'Seoul',
    addr: '430 Gyeongin-ro, Guro-gu, Seoul',
    lat: 37.498415, lng: 126.867219,
    capacity: 'About 16,000 for baseball; concert layouts reach roughly 20,000',
    kopisId: 'FC001901',
    official: 'https://www.sisul.or.kr/open_content/skydome/',
    placeSlug: 'gocheok-sky-dome-3006386',
    image: 'https://tong.visitkorea.or.kr/cms/resource/72/2591872_image2_1.gif',
    match: /gocheok/i,
    tagline: 'Korea’s only domed stadium. The roof is why the biggest K-pop shows book it in summer and in winter.',
    station: 'Guil Station (Line 1), exit 1, about 5 minutes. Sindorim (Lines 1 and 2) is a 20-minute walk and a better bet after the show.',
    fromAirport: 'AREX to Seoul Station, then Line 1 to Guil — about 1 hour 20 minutes. Taxi 60–80 minutes.',
    intro: [
      'Gocheok Sky Dome opened in 2015 as the home of the Kiwoom Heroes baseball team, and its roof makes it Seoul’s weatherproof big venue: this is where Fujii Kaze plays in January and where a run of K-pop world tours open their Seoul legs. Capacity for concerts runs to around 20,000 with the floor in use.',
      'It is in Guro, an unglamorous western district, and the venue’s known weakness is getting out: one main station, a few exits, and a shortage of taxis. Plan for a slow 30 minutes after the encore.',
    ],
    tips: [
      'Guil Station is right there but backs up badly; walking 20 minutes to Sindorim gives you Line 2 and a much emptier platform.',
      'Upper-tier seats are steep and far, but the dome’s sightlines are unobstructed; the floor is standing or seated depending on the show.',
      'Baseball is the other reason to come. Kiwoom Heroes home games run from late March to October, and tickets are far easier than concerts.',
      'Merch queues start in the morning for big K-pop dates; lines form in the large car park in front.',
    ],
    stay: 'Yeongdeungpo (the Times Square mall and the hotels around it) is two stops away on Line 1 and has the most options west of the river. Hongdae is 25 minutes by taxi.',
  },
  {
    slug: 'jangchung-arena',
    name: 'Jangchung Arena',
    korean: '장충체육관',
    city: 'Seoul',
    region: 'Seoul',
    addr: '241 Dongho-ro, Jung-gu, Seoul',
    lat: 37.558171, lng: 127.006717,
    capacity: 'About 4,500',
    kopisId: 'FC001823',
    official: 'https://www.sisul.or.kr/open_content/jangchung/',
    match: /jangchung/i,
    tagline: 'A 4,500-seat arena in the middle of the city, three minutes from the subway and next to the famous jokbal alley.',
    station: 'Dongguk University Station (Line 3), exit 5, about 3 minutes.',
    fromAirport: 'AREX to Seoul Station, Line 4 to Chungmuro, then Line 3 one stop to Dongguk University — about 1 hour 10 minutes.',
    intro: [
      'Jangchung Arena is Korea’s first indoor arena, opened in 1963 and rebuilt in 2015 into a compact, modern 4,500-seater. Its size makes it the venue for solo debut tours and fan concerts — Park Jinyoung of GOT7 and HIGHLIGHT play here this season — and its location, on the edge of Namsan between Dongdaemun and Itaewon, makes it the easiest big-show venue in Seoul to reach.',
      'Every seat is close. The steep bowl means even the top row is a good view, which is why fan concerts that feel remote in an arena feel intimate here.',
    ],
    tips: [
      'Jangchung-dong’s jokbal (braised pig’s trotter) alley is across the road and the classic pre-show meal; the old-school restaurants have been there since the 1960s.',
      'Dongdaemun Design Plaza and the night markets are a 15-minute walk, so a late finish still has somewhere to go.',
      'Line 3 runs late and Dongguk University Station copes with the crowd better than the big arenas’ stations do.',
    ],
    stay: 'The Shilla is next door; Dongdaemun’s hotels are a 15-minute walk; Myeongdong is 10 minutes by taxi.',
  },
  {
    slug: 'yes24-live-hall',
    name: 'YES24 Live Hall',
    korean: '예스24 라이브홀 (구 악스코리아)',
    city: 'Seoul',
    region: 'Seoul',
    addr: '20 Gucheonmyeon-ro, Gwangjin-gu, Seoul',
    lat: 37.545688, lng: 127.107967,
    capacity: 'About 2,000 standing, fewer seated',
    kopisId: 'FC000205',
    official: 'http://www.yes24livehall.com/',
    match: /yes24 live hall/i,
    tagline: 'The 2,000-capacity room where international bands and rising idols play their first Seoul headline shows.',
    station: 'Gwangnaru Station (Line 5), exit 2, about 7 minutes on foot.',
    fromAirport: 'AREX to Seoul Station, Line 4 to Dongdaemun History & Culture Park, then Line 5 east to Gwangnaru — about 1 hour 30 minutes.',
    intro: [
      'YES24 Live Hall — the venue long known as AX-Korea — is the standard Seoul stop for touring bands a step below arena size: Ezra Collective, ELLEGARDEN, KANA-BOON and FLOW all play here this autumn, and K-pop groups use it for fan concerts and early solo shows. It sits in a quiet residential district in eastern Seoul, so there is not much around it; the fun is inside.',
      'The room is a wide, flat standing floor with a balcony. Most international shows are all-standing, and Korean standing shows are entered strictly in ticket-number order, so your number matters more than your arrival time — though the queue to line up by number forms an hour or two before doors.',
    ],
    tips: [
      'If you bought through a global ticketing site, find the overseas pick-up desk and have the passport you booked with ready; it is separate from the domestic queue.',
      'Lockers are limited. Come with a small bag; large luggage is not allowed on the floor.',
      'Gwangnaru Station is a short walk and Line 5 runs late, so getting back to central Seoul after 22:00 is straightforward.',
      'The streets between the hall and the station have kimbap and chicken places; for a proper dinner go one stop to Cheonho or across to Konkuk University.',
    ],
    stay: 'There are few hotels in Gwangjang-dong itself. Stay near Konkuk University (Line 2, one change) or anywhere on Line 5; central Seoul is 30–40 minutes.',
  },
  {
    slug: 'hongdae-live-venues',
    name: 'Hongdae live venues',
    korean: '홍대 라이브홀 · 무신사 개러지 · 상상마당 · 웨스트브릿지',
    city: 'Seoul',
    region: 'Seoul',
    addr: '32 Jandari-ro, Mapo-gu, Seoul (Musinsa Garage)',
    lat: 37.551578, lng: 126.919828,
    capacity: 'Musinsa Garage about 1,000 standing · Sangsangmadang Live Hall about 500 · West Bridge about 600',
    match: /musinsa|sangsangmadang|west ?bridge|hongdae/i,
    tagline: 'The club-sized rooms where international indie acts play Seoul: yung kai, Benny Sings, Paul Gilbert, Touché Amoré, parannoul.',
    station: 'Hongik University Station (Line 2, AREX, Gyeongui-Jungang), exit 9 — all three venues are within 10 minutes. Sangsu Station (Line 6) is closer to Sangsangmadang.',
    fromAirport: 'AREX straight to Hongik University Station, 50 minutes on the all-stop train. This is the easiest venue cluster in Korea to reach from a flight.',
    intro: [
      'Hongdae, the university district in western Seoul, is where Korea’s live music scene lives, and three rooms take most of the international bookings. Musinsa Garage (the former V-Hall and Watcha Hall) is the largest, a basement standing venue for around a thousand; KT&G Sangsangmadang Live Hall is the 500-capacity basement of the arts centre on Eoulmadang-ro; West Bridge is a similar-sized room a few streets north. Rolling Hall and a dozen smaller clubs fill in the rest.',
      'Shows here are standing, start on time (usually 19:00 or 20:00) and finish by 22:00, which drops you into Hongdae’s bars and street food at exactly the right hour.',
    ],
    tips: [
      'Entry is in ticket-number order, called out in Korean; watch for the numbered line forming about an hour before doors and ask staff where your number goes.',
      'Overseas pick-up is a separate table with the passport you booked under. Arrive before the general line moves.',
      'These are basements with limited cloakrooms: no suitcases, small bags only.',
      'Merch is sold in the room and often only for cash or Korean cards; bring some won.',
    ],
    stay: 'Hongdae itself has more hotels than any district outside Myeongdong, from hostels to RYSE and L7, and you can walk home. It is also the AREX stop, so an early flight the next day is painless.',
  },
  {
    slug: 'jamsil',
    name: 'Jamsil Sports Complex',
    korean: '잠실종합운동장 · 잠실실내체육관',
    city: 'Seoul',
    region: 'Seoul',
    addr: '25 Olympic-ro, Songpa-gu, Seoul',
    lat: 37.514092, lng: 127.074953,
    capacity: 'Jamsil Arena about 11,000 · Olympic Main Stadium about 69,000 (closed for rebuilding)',
    kopisId: 'FC001837',
    official: 'https://stadium.seoul.go.kr/',
    match: /jamsil/i,
    tagline: 'The old home of stadium K-pop, half of which is a building site until the main stadium reopens.',
    station: 'Sports Complex Station (Lines 2 and 9), exits 6 to 8, directly outside.',
    fromAirport: 'AREX to Seoul Station, Line 1 one stop to City Hall, then Line 2 to Sports Complex — about 1 hour 20 minutes. A taxi is 60–90 minutes.',
    intro: [
      'Jamsil is the sports complex built for the 1988 Olympics in south-east Seoul: the 69,000-seat Olympic Main Stadium, the 11,000-seat indoor Jamsil Arena, and the baseball stadium shared by the LG Twins and Doosan Bears. For two decades the main stadium was where the largest K-pop and Western stadium tours played in Korea.',
      'The main stadium has been closed for a complete rebuild since late 2023 and was not due to reopen before the end of 2026, which is why the stadium-scale tours on this site are at Goyang Stadium or Incheon instead. Jamsil Arena next door stays open and still hosts mid-sized K-pop concerts and fan meetings; check the exact venue name on any Jamsil listing.',
    ],
    tips: [
      'Sports Complex Station is on Lines 2 and 9, so it clears faster than most concert stations, and Line 2 gets you anywhere central.',
      'The baseball stadium is a genuinely good night out from late March to October, with easy walk-up tickets for most games.',
      'Lotte World, Seoul Sky and the Lotte World Mall are one stop east at Jamsil Station, which fills the afternoon before a show.',
    ],
    stay: 'Jamsil Station has the Lotte hotels (Signiel at the top of the tower, Lotte Hotel World beside the park) and a spread of mid-range options; Samseong and COEX are one stop west.',
  },
  {
    slug: 'sejong-center',
    name: 'Sejong Center for the Performing Arts',
    korean: '세종문화회관',
    city: 'Seoul',
    region: 'Seoul',
    addr: '175 Sejong-daero, Jongno-gu, Seoul',
    lat: 37.572525, lng: 126.975643,
    capacity: 'Main hall about 3,000 · M Theater about 600',
    kopisId: 'FC000020',
    official: 'https://www.sejongpac.or.kr/',
    placeSlug: 'sejong-center-268132',
    match: /sejong center/i,
    tagline: 'Seoul’s grand concert hall on Gwanghwamun Square, with the palaces on the doorstep.',
    station: 'Gwanghwamun Station (Line 5), exit 1 or 8, connected underground; Gyeongbokgung Station (Line 3) is a 10-minute walk.',
    fromAirport: 'The airport limousine bus to Gwanghwamun stops outside; by rail, AREX to Gimpo Airport then Line 5 to Gwanghwamun, about 1 hour 10 minutes.',
    intro: [
      'The Sejong Center opened in 1978 and is the country’s best-known arts centre, a monumental stone building on Gwanghwamun Square facing the statue of King Sejong. The main hall seats about 3,000 over three levels and hosts orchestras, musicals and, increasingly, pop and jazz concerts; the smaller M Theater and chamber hall sit alongside.',
      'It is a seated hall with proper acoustics, so concerts here feel very different from arena shows: this autumn it hosts the Seoul Jazz Festival’s SJF at the Theater series and a three-night run by the rapper CHANGMO.',
    ],
    tips: [
      'Doors and the foyer open about an hour before the start; there is a cloakroom, and latecomers are held until a break.',
      'Gyeongbokgung is at the end of the square and open until 17:00–18:00 (closed Tuesdays), so a palace visit before an evening show is easy.',
      'After the show, the restaurants of Gwanghwamun and the lanes of Seochon, west of the palace, are a short walk.',
    ],
    stay: 'Hotels around Gwanghwamun and City Hall are walking distance; Myeongdong is 10 minutes by taxi or two stops on the subway.',
  },
  {
    slug: 'lg-arts-center-seoul',
    name: 'LG Arts Center Seoul',
    korean: 'LG아트센터 서울',
    city: 'Seoul',
    region: 'Seoul',
    addr: '136 Magokjungang-ro, Gangseo-gu, Seoul',
    lat: 37.565363, lng: 126.829389,
    capacity: 'LG Signature Hall about 1,300 · U+ Stage about 360',
    kopisId: 'FC003045',
    official: 'https://www.lgart.com/',
    match: /lg arts/i,
    tagline: 'A Tadao Ando concert hall in Magok, and the easiest serious venue to reach from Incheon Airport.',
    station: 'Magongnaru Station (Line 9 and the Airport Railroad), connected to the building; Magok Station (Line 5) is a short walk.',
    fromAirport: 'AREX all-stop train to Magongnaru, about 35–40 minutes with no change.',
    intro: [
      'LG Arts Center moved from Gangnam to a new building in Magok, on the western edge of Seoul, in 2022. The architect was Tadao Ando, and the concrete, glass and long curved tube of a lobby are worth seeing in their own right. The main LG Signature Hall seats about 1,300 and programmes international jazz, classical, dance and theatre.',
      'Magok is a new business district next to Seoul Botanic Park, and it is on the airport railway, which makes this the venue to choose if you are flying in or out the day of the show.',
    ],
    tips: [
      'Seoul Botanic Park, with its large glasshouse, is next door and fills an afternoon before a show.',
      'Gimpo Airport is two stops away on the same lines, handy for domestic flights to Jeju or Busan the next morning.',
      'Magok is quiet at night; for dinner after the show, Hongdae is about 20 minutes away on AREX.',
    ],
    stay: 'Magok has business hotels right by the station; Hongdae is 20 minutes on AREX; for an early flight, the Incheon Airport hotels are 40 minutes away.',
  },
  {
    slug: 'kyung-hee-grand-peace-palace',
    name: 'Grand Peace Palace, Kyung Hee University',
    korean: '경희대학교 평화의전당',
    city: 'Seoul',
    region: 'Seoul',
    addr: '26 Kyungheedae-ro, Dongdaemun-gu, Seoul',
    lat: 37.598682, lng: 127.052773,
    capacity: 'About 4,500',
    kopisId: 'FC001291',
    official: 'http://khugpp.khu.ac.kr/',
    match: /kyung hee|peace palace/i,
    tagline: 'A Gothic-style cathedral of a concert hall on a hillside campus in north-east Seoul.',
    station: 'Hoegi Station (Line 1 and the Gyeongui–Jungang Line), then about 15–20 minutes on foot uphill, or a short taxi ride.',
    fromAirport: 'AREX to Seoul Station, then Line 1 to Hoegi, about 1 hour 20 minutes, plus the walk up the campus.',
    intro: [
      'The Grand Peace Palace is the stone, cathedral-like hall at the top of Kyung Hee University’s campus, one of the most photographed university buildings in Korea. With about 4,500 seats it is one of the largest seated halls in Seoul, and it is a favourite for K-pop solo tours, ballad concerts and graduations.',
      'The campus is hilly and the hall is at the top, so allow time to get there; the walk through the grounds is pleasant in daylight, especially in the cherry blossom and autumn seasons.',
    ],
    tips: [
      'Taxis from Hoegi Station take five minutes and save the climb; after the show, walk down with the crowd rather than waiting for a taxi.',
      'The student streets around Hoegi Station have cheap places to eat before the show.',
      'Line 1 is slow and busy after a show; the Gyeongui–Jungang Line from the same station can be quicker to central Seoul.',
    ],
    stay: 'There are few hotels nearby. Dongdaemun, 20 minutes by taxi, or anywhere along Line 1 in central Seoul works.',
  },
  {
    slug: 'yonsei-university',
    name: 'Yonsei University concert halls',
    korean: '연세대학교 대강당 · 백주년기념관',
    city: 'Seoul',
    region: 'Seoul',
    addr: '50 Yonsei-ro, Seodaemun-gu, Seoul',
    lat: 37.564312, lng: 126.938918,
    capacity: 'Grand Auditorium about 1,600 · Centennial Hall about 800',
    kopisId: 'FC001792',
    official: 'https://www.yonsei.ac.kr/',
    match: /yonsei/i,
    tagline: 'Two campus halls in Sinchon, ten minutes from Hongdae, for jazz, fan concerts and touring acts.',
    station: 'Sinchon Station (Line 2), exit 2 or 3, then 10–15 minutes on foot up Yonsei-ro to the main gate.',
    fromAirport: 'AREX to Hongik University, then Line 2 one stop to Sinchon, about 1 hour.',
    intro: [
      'Yonsei is one of Korea’s oldest and best-known universities, and two of its buildings double as concert halls. The Grand Auditorium, about 1,600 seats, sits near the top of the main avenue; the Centennial Hall, about 800, is inside the main gate. Both host touring jazz and pop acts, K-pop fan concerts and classical recitals.',
      'The campus, with its stone Underwood Hall and tree-lined avenue, is worth a walk before a show, and Sinchon and Hongdae around it are two of Seoul’s liveliest student districts.',
    ],
    tips: [
      'Check which hall is on your ticket: the Centennial Hall is just inside the gate on the left, the Grand Auditorium five to ten minutes further up.',
      'Sinchon’s restaurants and bars start right outside the gate, and Hongdae is one stop away for a late night.',
      'Taxis queue badly outside the gate after a show; walk down to Sinchon Station instead.',
    ],
    stay: 'Sinchon and Hongdae both have plenty of hotels and guesthouses within 15 minutes’ walk or one subway stop.',
  },
];

export function venueBySlug(slug: string): Venue | undefined {
  return venues.find(v => v.slug === slug);
}

/** concerts.json 의 venue 문자열로 가이드를 찾는다 (없으면 undefined — 링크를 안 건다) */
export function venueForConcert(c: Pick<Concert, 'venue'>): Venue | undefined {
  return venues.find(v => v.match.test(c.venue));
}

/** 이 공연장에서 열리는 공연 — 예정은 날짜순, 지난 것은 최근순 */
export function concertsAtVenue(v: Venue, t: string): { upcoming: Concert[]; past: Concert[] } {
  const here = concerts.filter(c => v.match.test(c.venue));
  return {
    upcoming: here.filter(c => c.end >= t).sort((a, b) => a.start.localeCompare(b.start)),
    past: here.filter(c => c.end < t).sort((a, b) => b.start.localeCompare(a.start)),
  };
}

export function venueParams(): { slug: string }[] {
  return venues.map(v => ({ slug: v.slug }));
}
