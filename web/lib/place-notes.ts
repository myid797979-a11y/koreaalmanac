// 장소 보강 노트 — 사람이 공식 출처로 확인해 덧붙인 실용 정보와 방문 팁 (2026-11-13 시작).
//
// 배경: noindex 장소 384곳 중 300곳은 소개가 아니라 시간·휴무·요금이 데이터에 없어서 빠졌다.
// 명동·인사동·해운대·경주역사유적지구처럼 수요가 큰 곳이 여기 걸려 있어, 손으로 확인한 값을 얹는다.
//
// 규칙:
//   - hours/closed/fee 는 KTO 값이 비어 있을 때만 쓴다 (KTO 가 채우면 KTO 우선 — 매일 갱신되므로).
//   - tip 은 우리 문장. 소개(overview)를 반복하지 말고 보태는 내용만.
//   - closed 는 lib/open-days 파서가 읽는다 — 휴무 없음은 "Open every day" 로 쓸 것.
//   - checked 는 확인한 날짜. 오래되면 다시 확인 (시즌 갱신 메모 참고).

export type PlaceNote = {
  hours?: string;
  closed?: string;
  fee?: string;
  /** overview 가 비어 있는 곳만 */
  overview?: string;
  tip: string;
  checked: string;   // YYYY-MM-DD
};

export const PLACE_NOTES: Record<string, PlaceNote> = {
  // Myeong-dong — https://www.ktriptips.com/kor/tourspot/264311
  "264312": {
    hours: "Street open 24 hours; shop hours vary",
    closed: "Open every day",
    fee: "Free",
    tip: "Daytime Myeong-dong is mostly cosmetics and fashion shops; the street-food carts start setting up along the main lanes in the late afternoon and are busiest from about 17:00 to 21:00, so come in the early evening if food is the point. After complaints about overcharging, Jung-gu district made the stalls display prices, so check the posted price before you order. Myeong-dong Station (Line 4) is at one end of the district and Euljiro 1-ga Station (Line 2) at the other, by Lotte Department Store. Myeongdong Cathedral is a five-minute walk east and makes a quiet break from the crowds.",
    checked: '2026-11-13',
  },
  // Insa-dong — https://www.ktriptips.com/kor/tourspot/264353
  "264354": {
    hours: "Street open 24 hours; shop hours vary",
    closed: "Open every day",
    fee: "Free",
    tip: "Insa-dong-gil is closed to traffic on Saturdays and Sundays, so weekend afternoons are the most pleasant time to browse, though also the busiest. Start at Anguk Station (Line 3) Exit 6 at the northern end and walk south towards Jonggak Station (Line 1), so that the main street and its side alleys unfold in order. The better teahouses and small galleries are in the alleys rather than on the main road, so allow two hours and take a few turnings. Jogyesa Temple is a short walk to the west.",
    checked: '2026-11-13',
  },
  // Myeongdong Cathedral — https://mediahub.seoul.go.kr/archives/2000733
  "264138": {
    fee: "Free",
    tip: "Entry is free, but this is a working cathedral with several Masses a day, including an English-language Mass on Sunday mornings, so keep quiet inside and expect parts of the church to be in use during services. Many visitors miss the crypt chapel, where the relics of 19th-century martyrs are kept, and the 1898 Gwangjang cultural space built into the slope beneath the cathedral. The nearest stations are Myeong-dong (Line 4) and Euljiro 1-ga (Line 2) Exit 5. Allow 30 to 45 minutes and combine it with an evening walk through Myeong-dong.",
    checked: '2026-11-13',
  },
  // Heunginjimun Gate - Dongdaemun Gate — https://news.seoul.go.kr/culture/?p=505240
  "264315": {
    hours: "Viewable from outside at all times",
    fee: "Free",
    tip: "The gate stands on a traffic island, so you see it from the pavements around it rather than walking through. A better viewpoint is Heunginjimun Park on the slope just south, where a restored stretch of the Seoul City Wall begins. The Seoul City Wall Museum in the park (09:00–18:00, last entry 17:30, closed Mondays, free) explains how the wall and its gates fitted together, and the Naksan section of the wall walk climbs north from here. Use Dongdaemun Station (Lines 1 and 4); Dongdaemun Design Plaza is a few minutes' walk south.",
    checked: '2026-11-13',
  },
  // Nakseonjae Hall — https://royal.khs.go.kr/ROYAL/contents/R702000000.do?schGroupCode=cdg
  "1918896": {
    hours: "Nov–Jan 09:00–17:30 (last entry 16:30); Feb–May and Sep–Oct 09:00–18:00 (last entry 17:00); Jun–Aug 09:00–18:30 (last entry 17:30)",
    closed: "Mondays (if Monday is a public holiday, the next non-holiday day instead)",
    fee: "Changdeokgung ticket: ages 19–64 ₩3,000; under 19 and 65+ free; free in hanbok and on Wednesdays",
    tip: "Nakseonjae is covered by the ordinary Changdeokgung ticket; you do not need the separate Secret Garden tour. It sits at the eastern edge of the palace, so many visitors run out of time before they reach it. Head there first from Donhwamun Gate and then work back west. Its unpainted wood and lattice windows look very different from the colourful main halls, and members of the last royal family lived here until 1989. Anguk Station (Line 3) Exit 3 is the nearest. Hamyangmun Gate behind the complex leads into Changgyeonggung Palace, which needs its own ticket.",
    checked: '2026-11-13',
  },
  // Hwanghak-dong Flea Market (Dokkaebi Market / Manmul Market) — https://www.ktriptips.com/kor/shopping/273746
  "273747": {
    hours: "Hours vary by shop",
    closed: "Varies by shop",
    tip: "This is a loose cluster of second-hand, antique and junk shops in the backstreets of Hwanghak-dong rather than a single market hall, and each shop keeps its own hours, so come in the daytime. Do not confuse it with Seoul Pungmul Market, which grew out of the old Hwanghak-dong street stalls but is now a separate covered market in Sinseol-dong (Line 2, Sinseol-dong Station Exit 9) that closes on Tuesdays. Sindang Station (Lines 2 and 6) is the nearest stop, and Seoul Jungang Market and the Sindang-dong tteokbokki alley are a short walk away, which makes an easy half-day.",
    checked: '2026-11-13',
  },
  // Sindang-dong Tteokbokki Town — https://mediahub.seoul.go.kr/archives/700086
  "1838143": {
    hours: "Street open 24 hours; restaurant hours vary",
    tip: "The tteokbokki here is the jeukseok style: a shallow pan of rice cakes, fish cake, noodles and sauce is set on a burner at your table and cooks in front of you, so order for the table rather than per person, and ask for fried rice to be made in the leftover sauce at the end. Weekend evenings bring queues at the best-known shops; weekday evenings are calmer. Mabogi Halmeoni, credited with starting the alley, lists hours of 09:00–22:50 and closes on the second and fourth Mondays. Use Sindang Station (Lines 2 and 6); Seoul Jungang Market is nearby.",
    checked: '2026-11-13',
  },
  // Sinsa-dong Garosu-gil Road — https://korean.visitseoul.net/shopping/%EC%8B%A0%EC%82%AC%EB%8F%99-%EA%B0%80%EB%A1%9C%EC%88%98%EA%B8%B8/KOP000291
  "1323377": {
    hours: "Street open 24 hours; shop hours vary",
    closed: "Open every day",
    fee: "Free",
    tip: "The main avenue starts at Sinsa Station Exit 8 (Line 3 and the Shinbundang Line); Apgujeong Station (Line 3) Exit 4 brings you in from the other end. Many of the more interesting small shops and cafés are now in the parallel back lanes known as Serosu-gil, so step off the main road rather than walking only the avenue. Weekday mornings are the quietest time for photographs of the ginkgo trees in autumn. An hour or two is enough for most visitors.",
    checked: '2026-11-13',
  },
  // Yonseiro (Yonsei University Street) — https://news.seoul.go.kr/traffic/archives/513420
  "264376": {
    hours: "Street open 24 hours; shop hours vary",
    closed: "Open every day",
    fee: "Free",
    tip: "Yonsei-ro was a bus-only transit mall for years, but that designation was lifted on 1 January 2025 and ordinary traffic now uses it, so do not expect a car-free street except during festivals and events. Start at Sinchon Station (Line 2) and walk north for about ten minutes to Yonsei University's main gate, then carry on into the campus to see Underwood Hall. The street is liveliest in term time and in the evening, when students fill the side alleys. For a quieter detour, Bongwonsa Temple is on the hillside above the Ewha Womans University back gate.",
    checked: '2026-11-13',
  },
  // Seoul Former Russian Legation — https://mediahub.seoul.go.kr/archives/2013481
  "264475": {
    fee: "Free",
    tip: "Only the white three-storey tower of the legation survived the Korean War. It stands in the small Jeongdong Park above Jeongdong-gil and is seen from outside. The best approach is Gojong's Road, a 120-metre path from the Deoksugung stone-wall road to the park, recalling King Gojong's flight to the legation in 1896. The path is closed on Mondays and open 09:00–17:30 from November to February and 09:00–18:00 from March to October. Combine it with Chungdong First Methodist Church and the rest of Jeongdong; City Hall Station (Lines 1 and 2) is a short walk.",
    checked: '2026-11-13',
  },
  // Chungdong First Methodist Church — https://mediahub.seoul.go.kr/archives/2016440
  "264635": {
    fee: "Free",
    tip: "Many visitors photograph the red-brick Bethel Chapel from the courtyard and leave without realising they can often go inside. During opening hours, go to the church's history hall in the grounds and ask a volunteer, who will usually unlock the 1897 chapel and show you round. Avoid Sunday mornings, when services take priority. The church is about 400 metres from City Hall Station (Lines 1 and 2) Exit 10. Jung-gu district also runs resident-guided walks of Jeongdong that include the church (booking required; no walks in July–August or December–February).",
    checked: '2026-11-13',
  },
  // Seoul Seokchon-dong Ancient Tombs — https://mediahub.seoul.go.kr/archives/2003021
  "1747995": {
    hours: "Open 24 hours",
    closed: "Open every day",
    fee: "Free",
    tip: "The tombs sit in an open, lawned park in a residential part of Songpa, with flat paths and benches; a full loop takes 30 to 45 minutes. Seokchon Station (Line 8) Exit 6 is about 400 metres away, and Seokchon Gobun Station (Line 9) is about 500 metres from Exit 3. Lotte World Tower rises behind the stepped stone mounds, and the Songnidan-gil café street starts just outside the park. For background on Baekje before or after, the Hanseong Baekje Museum in Olympic Park has free permanent galleries.",
    checked: '2026-11-13',
  },
  // Bongwonsa Temple — https://thesoulofseoul.net/bongwonsa-temple-and-3000-buddhas/
  "1134541": {
    fee: "Free",
    tip: "Bongwonsa is on the lower slopes of Ansan, uphill from the Sinchon university area, and is much quieter than the big downtown temples. The simplest route is Sinchon Station (Line 2) Exit 3 and then bus 7024, which runs infrequently; you can also walk up about 500 metres from the road beyond Ewha Womans University's back gate. Look for the large Three Thousand Buddhas Hall. If you are in Seoul on 6 June, the temple holds Yeongsanjae, a day-long Buddhist ritual of chanting, music and dance that is on UNESCO's intangible heritage list, and visitors can watch.",
    checked: '2026-11-13',
  },
  // Hwanghakjeong Pavilion — https://mediahub.seoul.go.kr/archives/2014515
  "1909497": {
    closed: "Archery Exhibition Hall: Mondays, 1 January, Seollal and Chuseok",
    fee: "Exhibition hall free; archery experience ₩4,000 for 10 arrows (ages 8 and over)",
    tip: "Hwanghakjeong is still a working archery range used by club members, so stay behind the marked lines while people are shooting. Beside it, the Archery Exhibition Hall run by the Jongno Cultural Foundation explains Korean traditional archery and offers a short have-a-go session; book with the staff in the hall or by phone. It is about ten minutes' walk from Gyeongbokgung Station (Line 3) Exit 1, uphill past Sajik Park. Parking is very limited, so come by subway. The pavilion is at the foot of Inwangsan, so it pairs well with a walk on the mountain.",
    checked: '2026-11-13',
  },
  // Buramsan Mountain — https://mediahub.seoul.go.kr/archives/1185034
  "2357787": {
    hours: "Open 24 hours (some trail sections may close during forest-fire caution periods)",
    closed: "Open every day",
    fee: "Free",
    tip: "A popular approach starts from Sanggye Station (Line 4) Exit 1: walk about ten minutes to the Junggye 4-dong community centre, where the Buramsan Dulle-gil starts, then climb past Hakdoam and Cheonbosa temples. The summit is a bare granite dome, and the final stretch uses wooden stairs and fixed ropes, so wear shoes with good grip and avoid it in rain or ice. You can descend the far side via Bulam Falls and Gyeongsusa temple, then walk about 15 minutes to Danggogae Station (Line 4). Some trail sections may close from 1 November to 15 December, the autumn fire-prevention period.",
    checked: '2026-11-13',
  },
  // Suraksan Mountain — https://mediahub.seoul.go.kr/archives/1290690
  "1253587": {
    hours: "Open 24 hours (some trail sections may close during forest-fire caution periods)",
    closed: "Open every day",
    fee: "Free",
    tip: "Suraksan has three subway trailheads: Suraksan Station (Line 7), Jangam Station (Line 7) and Danggogae Station (Line 4). From Suraksan Station Exit 1 it is about ten minutes on foot to the Byeogun Valley entrance, then roughly 2.5 km to the main peak at about 640 m. The longer traverse from Jangam via Seongnimsa and the Gichabawi ridge to the summit and down to Suraksan Station takes around five hours. Gichabawi is steep slab climbing with ropes, so skip it if you are uneasy on exposed rock. Some sections may close from 1 November to 15 December, the autumn fire-prevention period.",
    checked: '2026-11-13',
  },
  // Namsan Outdoor Botanical Garden — https://mediahub.seoul.go.kr/archives/2018757
  "1751094": {
    closed: "Open every day",
    fee: "Free",
    tip: "The site was redeveloped and reopened on 27 June 2026 as the Namsan Korean Forest Garden, so look for that name on maps and signs. It now has 11 themed gardens over about 30,000 square metres, including a pond garden, a bamboo grove, a moss garden and the Namsan Maru viewpoint. Walking the main gardens takes about an hour. The car park is small, so come by public transport: walk up from Hangangjin Station (Line 6) or take bus 402. Parts of the garden have little shade, so bring water in warm weather.",
    checked: '2026-11-13',
  },
  // Bamseom Island (Ecosystem Conservation Area) — https://mediahub.seoul.go.kr/archives/179819
  "3488858": {
    closed: "Closed to the public",
    tip: "Bamseom is a protected wetland and nobody is allowed onto the island, so plan to watch it from the bridges or the river banks. The closest view is from the pavement of Seogang Bridge, which crosses the island: look upstream at the upper islet and downstream into the willow thickets of the lower one. The Mapo Bridge footway gives a full view of the upper islet, and Yeouido Hangang Park, near Yeouinaru Station (Line 5), looks across from the south bank. Winter is the best season for waterbirds such as cormorants and ducks, so bring binoculars; the bridge decks are windy and cold.",
    checked: '2026-11-13',
  },
  // Changgyeonggung Palace Honghwamun Gate — https://royal.khs.go.kr/ROYAL/contents/R702000000.do?schGroupCode=cgg
  "1991027": {
    hours: "09:00–21:00 (last entry 20:00)",
    closed: "Mondays (if Monday is a public holiday, the next non-holiday day instead)",
    fee: "Ages 19–64 ₩1,000; under 19 and 65+ free; free in hanbok and on Wednesdays",
    tip: "Honghwamun faces east, unlike the south-facing main gates of the other palaces, and is the main entrance to Changgyeonggung. The palace stays open until 21:00, which makes it a cheap, quiet evening visit. After 17:30 from November to January (18:00 in spring and autumn, 18:30 in summer) staff move visitors into the night zone: Honghwamun, Myeongjeongjeon Hall, Tongmyeongjeon, Chundangji pond and the glasshouse. Hyehwa Station (Line 4) Exit 4 is about ten minutes' walk. Changdeokgung can be reached through Hamyangmun Gate inside, but it needs a separate ticket.",
    checked: '2026-11-13',
  },
  // Haeundae Beach — https://www.ktriptips.com/kor/tourspot/126081
  "264155": {
    hours: "Open 24 hours (swimming 09:00–18:00 in season)",
    closed: "Open every day",
    fee: "Free",
    tip: "Swimming is only supervised during the official season, which in 2026 ran from late June to 15 September; outside it you can walk the sand at any hour but lifeguards and the swimming zone are gone. Haeundae Station on Busan Metro Line 2 is roughly a ten-minute walk from the beach along the pedestrianised Gunam-ro plaza. Early morning or a weekday evening is calmest in summer, when daily crowds run into six figures. In the cooler months, walk west to the Dongbaekseom island path or east up to Dalmaji Hill for views back along the bay; allow an hour or two for the beach and one of these.",
    checked: '2026-11-13',
  },
  // 168 Stairs — https://www.ktriptips.com/kor/tourspot/2605916
  "2401023": {
    hours: "Open 24 hours",
    closed: "Open every day",
    fee: "Free",
    tip: "The stairs are part of Choryang Ibagu-gil, a heritage walking route on the hillside above Busan Station, so it is easy to combine the two: start near the station, climb through the lanes and come down by a different path. If the climb is too much, an inclined elevator that replaced the old monorail began running alongside the steps in March 2025, stopping at the Kim Min-bu Observatory halfway up. The observatory is the best place to pause for a view over the port. There is no parking, so come on foot or by metro; allow about an hour for the stairs and the surrounding lanes.",
    checked: '2026-11-13',
  },
  // 40-step Culture & Tourism Theme Street — https://www.ktriptips.com/kor/culture/130663
  "1000428": {
    hours: "Open 24 hours (street)",
    closed: "Open every day",
    fee: "Free",
    tip: "The street is free to walk at any time, but the 40-Step Cultural Center beside the stairway (Donggwang-gil 49), which explains the area's refugee history with photographs and models, keeps its own hours: weekdays 10:00–18:00 and weekends 10:00–17:00, closed Mondays, national holidays, Seollal and Chuseok, with free entry. Plan around those hours if the exhibition is the reason you are coming. Jungang Station on Busan Metro Line 1 is the nearest stop. Allow 45 minutes to an hour for the street and the centre, and pair it with a walk to the 168 Stairs in neighbouring Choryang.",
    checked: '2026-11-13',
  },
  // Seomyeon 1beon-ga (Seomyeon First Street) — https://ktriptips.com/eng/tourspot/1065936
  "1065936": {
    hours: "Open 24 hours (street; shop hours vary)",
    closed: "Open every day",
    fee: "Free",
    tip: "The street is a few minutes' walk from Seomyeon Station, where Busan Metro Lines 1 and 2 meet. The station has a large number of exits and a long underground shopping arcade, so set your map app to the street itself rather than relying on an exit number. It is at its liveliest from early evening into the night, when the bars and restaurants fill up; daytime visits are quiet by comparison. For a calmer contrast, the Jeonpo Cafe Street area, around ten minutes' walk from Exit 6 of Seomyeon Station on Line 1, has small independent cafés in converted workshops.",
    checked: '2026-11-13',
  },
  // Jeonpo Gonggu Street — https://www.busannavi.net/eng/?p=180
  "3035570": {
    hours: "Open 24 hours (street; shop hours vary)",
    closed: "Open every day",
    fee: "Free",
    tip: "The closest stop is Jeonpo Station on Busan Metro Line 2: from Exit 7 the cafe area is about five minutes on foot. From Seomyeon Station on Line 1, use Exit 6 and allow about ten minutes. The cafés and shops are mostly small independent businesses that set their own opening hours and days off, so a mid-afternoon visit is the safest bet, and it is worth checking a particular café's hours before travelling for it. The lanes join up with Jeonpo Cafe Street, so treat them as one area and allow an hour or two to wander.",
    checked: '2026-11-13',
  },
  // Busan Healing Forest — https://www.ktriptips.com/kor/tourspot/2660770
  "3078807": {
    hours: "08:00–17:00",
    closed: "Seollal and Chuseok (the day itself)",
    fee: "Free",
    tip: "The forest is in Cheolma-myeon, Gijang-gun, in the hills north of central Busan, and sits within Pusan National University's research forest. It opened in November 2017. Walking the trails is free and needs no booking, but the guided forest-healing programmes must be reserved in advance through the Busan city integrated reservation website and are run in Korean. The car park takes about 60 cars. Public transport is limited, so check a route in a Korean map app before setting out or call the visitor centre on 051-976-2831. Arrive well before the 17:00 closing time to finish the trail.",
    checked: '2026-11-13',
  },
  // Incheon Chinatown — https://bravo.etoday.co.kr/view/atc_view/9543
  "264513": {
    hours: "Open 24 hours (street; restaurant and museum hours vary)",
    closed: "Open every day",
    fee: "Free",
    tip: "Chinatown begins directly across the road from Incheon Station, the terminus of Seoul Subway Line 1: the ornamental gate is about 50 metres from Exit 1. The Jajangmyeon Museum, in the former Gonghwachun restaurant building, explains the Korean-Chinese black-bean noodle dish and is a five-minute walk from the station. It opens 09:00–18:00 (last entry 17:30) and closes on Mondays, 1 January, Seollal and Chuseok; adults pay ₩1,000. Most labels are in Korean, so a translation app helps. Weekend lunchtimes are very busy. The colourful Songwol-dong Fairy Tale Village is next door, and the Wolmi Sea Train to Wolmido starts nearby.",
    checked: '2026-11-13',
  },
  // Wolmido Island — https://www.ktriptips.com/kor/tourspot/2706344
  "264305": {
    closed: "Open every day",
    fee: "Free",
    tip: "The easiest way to reach the island from Incheon Station is the Wolmi Sea Train, an elevated 6.1 km loop that takes about 40 minutes for a full circuit. You must first board at Wolmi Bada Station, and one re-boarding is allowed the same day at any of its four stations. It runs from 10:00 to 18:00 between November and March, with later closing at weekends from April to October, and does not run on Mondays (or on the next weekday when Monday is a public holiday). Fares were raised in 2024, so ignore older guides quoting ₩8,000. Late afternoon is a good time to walk the seafront promenade for sunset.",
    checked: '2026-11-13',
  },
  // Incheon Bridge — https://incheonbridge.com/eng/company/memorial
  "1002414": {
    fee: "Toll for cars ₩2,000 (no pedestrian access)",
    tip: "The bridge is part of an expressway: you can only cross it by vehicle, and most visitors see it on the airport limousine bus between Incheon Airport and Songdo. The car toll was cut from ₩5,500 to ₩2,000 in December 2025. For a closer look, the Incheon Bridge Memorial Hall on the Yeongjong Island side has exhibitions and a fourth-floor observatory with telescopes. According to the bridge operator it is free, opens 10:00–18:00 from April to October and 10:00–17:00 from November to March, closes on Seollal and Chuseok, and also closes on Mondays from December to March. It is reached by car via Yeongjong IC and the coastal road.",
    checked: '2026-11-13',
  },
  // Yeonan Pier — https://www.ktriptips.com/kor/shopping/132742
  "1733485": {
    tip: "Ferries to the West Sea islands, such as Deokjeokdo and Baengnyeongdo, leave from the Incheon Coastal Passenger Terminal here (Yeonanbudu-ro 70). Sailings are cancelled in poor weather, so check on the day and allow spare time on the return. For visitors without a ferry to catch, the main draw is the Incheon Complex Fish Market, around 700 metres from the terminal. It has about 500 stalls and trades roughly 05:00–21:00, though hours vary by stall; the salted-seafood section closes on the first Tuesday of the month and the dried-fish section on the first and third Wednesdays. Mornings are the liveliest time to visit.",
    checked: '2026-11-13',
  },
  // Wangsan Beach — https://kgnews.co.kr/news/article.html?no=899197
  "1905329": {
    hours: "Open 24 hours",
    closed: "Open every day",
    fee: "Free",
    tip: "Wangsan sits next to Eurwangni Beach on Yeongjongdo, the island that is home to Incheon Airport, and the two are separated by a small hill, so it is easy to visit both. The lifeguarded swimming season is summer only: in 2026 it began on 20 June, together with Eurwangni and Hanagae. Like other West Sea beaches it has a large tidal range, and the water can retreat a long way at low tide, so check the tide if you plan to swim or photograph the sunset over water. The neighbouring Wangsan Marina offers yacht trips. Its closeness to the airport makes it a realistic stop before a late-evening flight if you have a car or taxi.",
    checked: '2026-11-13',
  },
  // Bupyeong Haemultang (Seafood Stew) Street — https://www.ktriptips.com/kor/tourspot/749211
  "1553063": {
    tip: "The street is in Bupyeong-dong, under a kilometre north-east of Bupyeong Station (Seoul Subway Line 1 and Incheon Line 1), so it is easy to reach from Seoul without a car. Haemultang is a stew for sharing, cooked at the table in one large pot with clams, octopus, mussels, prawns and blue crab, and flavoured lightly with water dropwort and bean sprouts. It is best eaten in a group of two or more. Each restaurant's broth is slightly different: some are spicy and others milder. Restaurant hours vary, so go at a normal lunch or dinner time and check opening hours before travelling.",
    checked: '2026-11-13',
  },
  // Jebudo Island — https://www.hscity.go.kr/www/jebudo/BD_selectPassingTime.do
  "823350": {
    hours: "Road access depends on the tide (see tip)",
    closed: "Open every day",
    fee: "Free (public car park ₩1,000 for 5 hours, ₩3,000 all day)",
    tip: "Hwaseong City publishes a day-by-day timetable for the causeway road on its website (search 제부도 통행시간). On many days it is passable around the clock. Around spring tides it closes twice a day for a few hours near high water: on 6–10 November 2026, for example, it was shut for between 1½ and just over 3 hours each afternoon and again overnight. The times come from tidal forecasts, have no legal force and can shift with the weather, so check both your way in and your way out and leave a margin. Never drive onto a flooding road. The Seohaerang marine cable car from Jeongok Port is an alternative: 09:00–19:00 on weekdays and 09:00–20:00 at weekends.",
    checked: '2026-11-13',
  },
  // Jebudo Beach — https://www.hscity.go.kr/www/jebudo/BD_selectPassingTime.do
  "2946814": {
    closed: "Open every day",
    fee: "Free",
    tip: "You can only drive to the beach while the Jebudo causeway road is open, so check Hwaseong City's daily timetable (search 제부도 통행시간) before setting out. On many days the road is open all day, but near spring tides it closes for a few hours around each high tide. The public car park on the island costs ₩1,000 for five hours or ₩3,000 for the whole day. At low tide the sea drops back a long way, exposing mudflats. The beach faces west, so late afternoon is the time for sunset. If the road is closed, the Seohaerang marine cable car from Jeongok Port reaches the island instead.",
    checked: '2026-11-13',
  },
  // Silleuk Temple Resort — https://www.ktriptips.com/kor/tourspot/128926
  "822848": {
    hours: "Silleuksa Temple 08:00–18:00",
    closed: "Open every day",
    fee: "Free",
    tip: "Entry to Silleuksa Temple and parking at the resort car park are both free. The brick pagoda on the riverside rocks faces the Namhangang River, and late afternoon light is kindest for photographs. Since 1 May 2025, the 515-metre Yeoju Namhangang suspension bridge, a pedestrian-only crossing, has linked the resort with Geumeunmorae Riverside Park on the opposite bank, making a pleasant circular walk. Without a car, take the Gyeonggang Line to Yeoju Station, then a local bus; buses are infrequent, so check times in a Korean map app. Allow half a day.",
    checked: '2026-11-13',
  },
  // Yongmunsan Resort — https://www.ktriptips.com/kor/tourspot/126915
  "822791": {
    fee: "Free entry; parking ₩3,000 (small car), ₩1,500 (compact), ₩5,000 (medium/large)",
    tip: "Most visitors come for Yongmunsa Temple and its ginkgo tree, about 1,100 years old and 42 metres tall, which turns gold in late October and early November. Autumn weekends are very busy, so arrive early. Entry is free; only parking is charged, paid on exit. By public transport, take the Gyeongui–Jungang Line to Yongmun Station, then a local bus to the Yongmunsan stop and walk about 30 minutes uphill to the temple. Buses are infrequent, so check the last return bus before you set off. Hours vary between the facilities in the resort. Allow half a day, or a full day if you plan to hike towards the summit.",
    checked: '2026-11-13',
  },
  // Pocheon Idong Galbi Village — https://www.ktriptips.com/eng/tourspot/2041823
  "2041823": {
    tip: "The village is in Idong-myeon in northern Pocheon, close to the Gangwon border, and is realistically a car or tour trip from Seoul. The restaurants line Hwadong-ro around number 2078 and most have their own car parks. The ribs are sold by the portion, usually in marinated (yangnyeom) and plain (saeng) versions, and portions at the long-established houses are large. Prices differ from one restaurant to the next, so check the menu before ordering; rice and noodles are usually extra. Each restaurant sets its own hours and day off. Weekend lunchtimes are the busiest, so go early or on a weekday.",
    checked: '2026-11-13',
  },
  // Saebyeol Oreum Volcanic Cone — https://www.ktriptips.com/kor/tourspot/572973
  "1052215": {
    hours: "Open 24 hours",
    closed: "Open every day",
    fee: "Free",
    tip: "The climb from the car park to the summit takes about 20 minutes on a steep, unshaded path, so avoid the midday heat in summer and bring a layer for the wind on top. October is the best month, when the slopes turn silver with pampas grass; late afternoon light suits photographs. The oreum is also the stage for the Jeju Fire Festival in March. Since 2026 the organisers have dropped the burning of the hillside and replaced it with a digital media-art show projected across the slopes, so do not expect a real fire. Parking at the foot of the hill is free and there are toilets.",
    checked: '2026-11-13',
  },
  // Woljeongri Beach — https://www.ktriptips.com/kor/tourspot/1918639
  "2048244": {
    hours: "Open 24 hours (swimming only in the summer season)",
    closed: "Open every day",
    fee: "Free",
    tip: "Woljeong is one of Jeju's 12 designated beaches, so swimming is supervised only during the official season: in 2026 that ran from 24 June to 6 September, 10:00–19:00, with Woljeong staying open until 20:00 from 15 July to 15 August. Outside that season the beach is fine for walking but not for swimming. Steady waves make it a popular surf spot. The shore is part of Jeju Olle Route 20 (Gimnyeong–Hado), so you can walk the coast west to Gimnyeong Beach. The seafront cafés fill up fast on weekends; come early in the morning for a quieter visit.",
    checked: '2026-11-13',
  },
  // Gimnyeong Seongsegihaebyeon Beach — https://www.ktriptips.com/kor/tourspot/129400
  "778986": {
    hours: "Open 24 hours (swimming only in the summer season)",
    closed: "Open every day",
    fee: "Free",
    tip: "Gimnyeong is one of Jeju's 12 designated beaches, so lifeguards and swimming are limited to the official season (24 June to 6 September in 2026, 10:00–19:00). The sand sits on a broad, flat lava shelf, which keeps the water shallow and clear near shore; the wind turbines along this coast tell you how breezy it can be. Manjanggul lava tube, about ten minutes inland by car, reopened in May 2026 after more than two years of repairs: 09:00–18:00 (last entry 17:00), closed on the first Wednesday of each month, adults ₩4,000. Only a 1 km section is open and it stays around 10°C inside, so bring a jacket even in summer.",
    checked: '2026-11-13',
  },
  // Hwasun Golden Sand Beach — https://www.ktriptips.com/kor/tourspot/126443
  "1872259": {
    hours: "Open 24 hours (swimming only in the summer season)",
    closed: "Open every day",
    fee: "Free (parasol and other rentals charged in season)",
    tip: "Despite the 'golden sand' name, much of the beach is dark volcanic sand. It is one of Jeju's 12 designated swimming beaches; in 2026 the supervised season ran from 24 June to 6 September, 10:00–19:00. In summer an outdoor pool fed by cold spring water is set up right beside the beach, with slides for children, and the water is noticeably colder than the sea. Parking is free. The beach works well as a stop before or after Sanbangsan Mountain and the Yongmeori Coast nearby; note that the Yongmeori walkway is regularly closed at high tide and in rough seas, so check before you plan around it.",
    checked: '2026-11-13',
  },
  // Pyoseon Haevich Beach — https://www.ktriptips.com/kor/tourspot/128794
  "1056500": {
    hours: "Open 24 hours (swimming only in the summer season)",
    closed: "Open every day",
    fee: "Free",
    tip: "The look of this beach depends almost entirely on the tide. At high tide most of the sand is under water and the bay becomes a shallow, round lagoon; at low tide a wide white sandbar appears. Check a tide table and come near low tide if you want to walk across the flats. It is one of Jeju's 12 designated beaches (supervised swimming 24 June to 6 September in 2026, 10:00–19:00). The beach is the end of Jeju Olle Route 3 and the start of Route 4, and there are showers, changing rooms and a small park. Jeju Folk Village sits just behind the beach on the same coast road, so the two pair easily.",
    checked: '2026-11-13',
  },
  // Jeju Yakcheonsa Temple — https://www.ktriptips.com/kor/tourspot/127862
  "1348792": {
    closed: "Open every day",
    fee: "Free",
    tip: "The main hall, Daejeokgwangjeon, completed in 1996, is a concrete building around 30 metres high; inside, a single open space holds a seated Vairocana Buddha about 5 metres tall, so step in rather than only photographing the outside. Visitors are welcome to look around, but keep voices low and avoid photographing people at prayer. The temple runs temple-stay programmes (book in advance through the temple's templestay page; fees are paid by bank transfer, not card). Parking is free. The temple is in Daepo-dong, on the western edge of Seogwipo city, a short drive from the Jungmun resort area.",
    checked: '2026-11-13',
  },
  // Donnaeko Resort (Wonangpokpo Falls) — https://www.ktriptips.com/kor/tourspot/126441
  "264241": {
    hours: "Open 24 hours (closed for safety after heavy rain)",
    closed: "Open every day",
    fee: "Free",
    tip: "The falls are about a 20-minute walk from the entrance, along a roughly 700-metre forest path that ends in steep, narrow steps down into the valley; wear shoes with grip, as the rocks by the pool are slippery. Access may be closed when it rains or the stream rises, so a dry spell is the time to go. The water stays very cold even in August. Locals traditionally bathe here on Baekjung, the 15th day of the seventh lunar month, when it is at its busiest. Free parking, a campsite and cooking area are about 300 metres from the valley entrance, across the road.",
    checked: '2026-11-13',
  },
  // Namwon Keuneong Coast — https://www.ktriptips.com/kor/tourspot/128795
  "1889160": {
    hours: "Open 24 hours",
    closed: "Open every day",
    fee: "Free",
    tip: "The clifftop path runs for about 2 km and is mostly level, so an out-and-back walk takes under an hour at an easy pace. Look for the gap in the tree canopy along the path whose outline resembles the Korean peninsula; it is a popular photo stop, and the shape changes with the season and where you stand. The path is part of Jeju Olle Route 5, which continues west along the coast to Soesokkak, about 13 km in all. The cliffs are exposed, so stay away from the edge in strong wind and skip the walk in typhoon weather, when access can be closed.",
    checked: '2026-11-13',
  },
  // Sarabong Park — https://www.ktriptips.com/kor/tourspot/126454
  "1145250": {
    hours: "Open 24 hours",
    closed: "Open every day",
    fee: "Free",
    tip: "Come in the last hour before sunset: the evening view from here, known as Sabong Nakjo, is counted among the traditional Ten Scenic Views of Jeju. The walk up from the car park is short, and an octagonal pavilion sits on top. Byeoldobong, the next hill to the east, can be added on foot along the connecting ridge path and has a paragliding launch site. The park is close to Jeju Port and the Dongmun Market area, so it fits easily into an afternoon in Jeju City. Parking is limited to around 25 spaces, which fill on clear evenings.",
    checked: '2026-11-13',
  },
  // Hagosudong Beach — https://www.ktriptips.com/kor/tourspot/591798
  "2359127": {
    hours: "Open 24 hours",
    closed: "Open every day",
    tip: "Hagosudong is on Udo, so you need the ferry from Seongsan Port (about 15 minutes each way); boats stop in bad weather, so check before setting out. Rental cars are generally not allowed on Udo (exceptions include visitors staying overnight on the island), so leave the car at Seongsan and get around Udo by bus, rented electric bike or on foot. The beach is about 400 metres long and shallow, which suits children. It is not among the 12 beaches Jeju Province designated for supervised swimming in 2026, so do not count on lifeguards. Showers and toilets are available. On summer nights, the lights of squid boats offshore are worth staying for.",
    checked: '2026-11-13',
  },
  // Gimnyeongsagul Cave [UNESCO World Heritage] — https://www.newsis.com/view/NISX20250622_0003222361
  "778998": {
    closed: "Closed to the public",
    tip: "Gimnyeongsagul is not open for normal visits: it has been closed for years because of frequent rockfalls and to protect the cave formations. The only way in is through special pre-booked programmes run during the World Heritage Festival in Jeju (for example, small guided expeditions in July 2025), which must be reserved in advance through the festival website. For a lava tube you can actually walk through, go to Manjanggul nearby, which reopened in May 2026: 09:00–18:00 (last entry 17:00), closed on the first Wednesday of each month, adults ₩4,000. Only its first 1 km is open, and it is about 10°C inside.",
    checked: '2026-11-13',
  },
  // Sokcho Beach — https://www.ktriptips.com/kor/tourspot/125707
  "264130": {
    hours: "Open 24 hours (swimming only in the summer season)",
    closed: "Open every day",
    fee: "Free",
    tip: "The East Sea swimming season is short: in 2026 Sokcho Beach was officially open from 3 July to 23 August, with night swimming until 21:00 from 21 July to 12 August. Outside those dates you can walk the sand but not swim. Out of season the beach is quiet and makes a good sunrise spot, since it faces due east. Parking is free but the car park only takes about 100 cars, which fill quickly in summer; the express bus terminal is within walking distance. Look out for the photo frames and sculptures along the promenade.",
    checked: '2026-11-13',
  },
  // Seoraksan National Park (Southern Section) — https://www.ktriptips.com/kor/tourspot/125586
  "1758437": {
    hours: "Daecheongbong trail entry 03:00–12:00 (Apr–Oct), 04:00–11:00 (Nov–Mar)",
    closed: "Open every day",
    fee: "Free (parking charged)",
    tip: "Osaek is the shortest and steepest route to Daecheongbong, Seoraksan's summit; start early, as entry to the summit trail is cut off before noon. During the wildfire-prevention periods in spring and autumn (the autumn closure runs from 15 November to 15 December), the high trails to Daecheongbong are closed, while low-level valley walks such as Jujeongol have usually stayed open; check the Korea National Park Service website for current closures. Heullimgol valley works on timed entry, booked in advance through the KNPS reservation site. Parking at Osaek is charged (from ₩4,000 for a car off-peak). The Osaek mineral spring, with its iron-tasting water, is near the start of Jujeongol.",
    checked: '2026-11-13',
  },
  // Anbandegi Village — https://ktriptips.com/eng/tourspot/3060320
  "3060320": {
    tip: "At 1,100 metres, Anbandegi is much colder and windier than Gangneung on the coast, so bring a warm layer even in summer. The village has two lookouts: a sunrise viewpoint and the Meongae Observatory, which is known for night views of the Milky Way on clear, moonless nights. The cabbage fields are working farmland, so stay on the roads and paths. The village asks visitors not to camp, cook, park long-term or leave rubbish, and large vehicles cannot park. Parking is beside the road near the top. Plan to drive, and take care on the narrow mountain road after dark or in snow.",
    checked: '2026-11-13',
  },
  // Bongpyeong 5-day Market — https://www.ktriptips.com/kor/shopping/132549
  "2032431": {
    hours: "Market days: the 2nd, 7th, 12th, 17th, 22nd and 27th of each month (permanent shops open on other days); stall hours vary",
    fee: "Free",
    tip: "Time your visit for a market day (any date ending in 2 or 7); on other days only the permanent shops are open and the street is quiet. Buckwheat is the speciality: try cold buckwheat noodles, buckwheat pancakes, buckwheat crepes filled with kimchi, and buckwheat steamed buns. The market is about a 15-minute walk from the Lee Hyo-seok Literary Hall, so the two make an easy half-day together. In early September the Hyoseok Cultural Festival fills the town (4–13 September in 2026), when the buckwheat fields around Bongpyeong are in white flower and the market is much busier.",
    checked: '2026-11-13',
  },
  // Wonju Jungang Market — https://www.ktriptips.com/kor/shopping/132765
  "2002393": {
    tip: "Opening hours and closing days vary from shop to shop, so go on a weekday daytime or a Saturday rather than late evening. Head upstairs: the second floor, once largely empty, is now the Miro Art Market, a warren of small craft workshops, cafés and eateries run by young makers. On the second weekend of each month it hosts performances, a flea market and hands-on activities. Because Hoengseong, Korea's best-known beef county, is next door, the market also has an alley of butchers and beef restaurants. Parking is available; the nearest is the public car park for the traditional markets.",
    checked: '2026-11-13',
  },
  // Taebaeksan National Park — https://www.ktriptips.com/kor/tourspot/125590
  "791747": {
    closed: "Open every day",
    fee: "Free",
    overview: "Taebaeksan rises in the middle of the Baekdudaegan, the mountain range that forms the spine of the Korean peninsula, and has long been treated as a sacred mountain. On its summit ridge stands Cheonjedan, a stone altar at Yeongbong (1,560 m) used for rites to heaven, built as three platforms. The surrounding area is the source of the Han and Nakdong rivers. Protected as a provincial park for decades, Taebaeksan became a national park in 2016. It is known for old yew trees along the upper slopes, royal azaleas in late spring and snowy landscapes in winter. Danggol Plaza, at the foot of the main trail, has a coal museum, a campsite and a sledging hill, and hosts the Taebaeksan Snow Festival each winter.",
    tip: "The shortest climb starts at the Yuilsa trailhead: a loop up past the yew groves to Cheonjedan and back is about 8 km and takes roughly 4 hours. A popular longer option goes up from Yuilsa and down to Danggol Plaza (about 9 km, 5–5½ hours); arrange a taxi back to your car. Winter is the main season, so bring crampons and warm layers, as the summit is very exposed to wind. The 2026 snow festival ran from 31 January to 8 February at Danggol Plaza. Some trails close during the wildfire-prevention periods in spring and from 15 November to 15 December; check the Korea National Park Service website before you go.",
    checked: '2026-11-13',
  },
  // Yeongwol Donggang River — https://www.ktriptips.com/kor/leisure/131931
  "264626": {
    tip: "The best way to see the Donggang is from a raft. The classic route runs from Munsan through the Eorayeon gorge to Seopse (Geoun Bridge), about 13.5 km and three hours; operators also run a longer full-day trip of around 30 km. Rafting is mainly a summer activity and depends on water levels, so book ahead and confirm by phone. Prices for the standard route have been around ₩35,000 a person but change. Outside rafting season, Eorayeon is the stretch most worth seeing, with sheer cliffs above a deep green pool; plan to drive, and combine it with Yeongwol town.",
    checked: '2026-11-13',
  },
  // Birthplace of Lee Hyo-seok — https://www.ktriptips.com/kor/tourspot/2605276
  "2684275": {
    hours: "May–Sep 09:00–18:30, Oct–Apr 09:00–17:30 (tickets until 30 minutes before closing)",
    closed: "Mondays (Tuesday if Monday is a public holiday); 1 January; Seollal and Chuseok",
    fee: "Adults ₩3,000; combined ticket with Lee Hyo-seok Literary Hall ₩4,500; ages 6 and under and 65 and over free",
    tip: "The thatched house you see is a 2007 reconstruction built from the recollections of village elders; the original birthplace site lies about 600 metres further up in the village and the original house no longer survives. The reconstructed house is inside Hyoseok Dalbit Eondeok, a ticketed literary theme park, so buy the combined ticket if you also want the Literary Hall (combined tickets are sold only until 16:00). Allow two hours for both. The best time is early September, when the buckwheat fields around Bongpyeong bloom during the Hyoseok Cultural Festival. Bongpyeong market is about 15 minutes' walk away.",
    checked: '2026-11-13',
  },
  // Gyeongju Historic Area [UNESCO World Heritage] — https://apis.data.go.kr/B551011/KorService2/detailIntro2 (KTO Korean record 971032)
  "995361": {
    tip: "This is not a single site with one gate but a UNESCO umbrella for five separate districts – Namsan, Wolseong, the Tumuli Park area, Hwangnyongsa and Myeonghwal Mountain Fortress – each with its own opening hours and, in places, its own ticket. Plan by district rather than trying to 'do' the whole listing in a day. The Tumuli Park area (Daereungwon) has been free since May 2023, so it is an easy first stop on arrival. For maps and current hours for the individual sites, the tourist information centre at the bus terminal (054-772-9289) is the most practical starting point.",
    checked: '2026-11-13',
  },
  // Tomb of Queen Seondeok — https://apis.data.go.kr/B551011/KorService2/detailIntro2 (KTO Korean record 126211)
  "804337": {
    hours: "Open 24 hours",
    closed: "Open every day",
    fee: "Free",
    tip: "Unlike the tombs in the town centre, Queen Seondeok's tomb sits on the top of Nangsan, a low hill wrapped in pine forest, so expect a short uphill walk rather than a flat lawn. The clearest route starts at the entrance to the Sacheonwangsa Temple site: pass the stone flagpole supports, follow the fence around the temple site, and the path to the tomb begins there. Continue down the path behind the tomb to reach the Neungjitap pagoda and the rock-carved Buddha triad on Nangsan, which makes a satisfying loop of an hour or so. Wear proper shoes; the forest paths are uneven.",
    checked: '2026-11-13',
  },
  // Geumgwanchong Tomb — https://apis.data.go.kr/B551011/KorService2/detailInfo2 (KTO Korean record 126209)
  "264263": {
    hours: "09:00–18:00 (last entry 17:30)",
    closed: "1 January; Seollal and Chuseok days",
    fee: "Adults ₩3,000; ages 13–18 ₩2,000; children ₩1,500; free for under-7s and over-65s",
    tip: "Geumgwanchong now has an indoor conservation and exhibition space over the excavated tomb, with a reconstruction of the stone-mound, wooden-chamber burial typical of early Silla kings. The Silla Tomb Information Centre, opened in June 2023, stands directly opposite the tomb entrance and is designed as the second half of the visit: it displays a replica of the gold crown that gave the tomb its name, and its lobby windows look out over the mound. Allow about an hour for both. It sits in the Noseo-dong tomb group on the edge of the Daereungwon area, so it combines easily with a walk through the free Tumuli Park.",
    checked: '2026-11-13',
  },
  // Byeongsanseowon Confucian Academy [UNESCO World Heritage] — https://apis.data.go.kr/B551011/KorService2/detailIntro2 (KTO Korean record 126227)
  "264458": {
    hours: "09:00–18:00 (to 17:00 in winter)",
    closed: "Open every day",
    fee: "Free",
    tip: "The point of Byeongsanseowon is the view from Mandaeru, the long open pavilion that frames the Nakdong River and the cliff of Byeongsan opposite, so give yourself time to sit there rather than walking straight through. It is especially worth timing a visit for high summer, when the old crape myrtle trees in the grounds – one is around 390 years old – flower deep pink. Entry and parking are free. The academy lies a few kilometres from Hahoe Village, and the two are commonly visited together; with your own transport, do Hahoe in the morning and Byeongsan in the quieter late afternoon.",
    checked: '2026-11-13',
  },
  // Bongjeongsa Temple [UNESCO World Heritage] — https://www.ktriptips.com/kor/tourspot/126158
  "264144": {
    hours: "09:00–17:00",
    closed: "Open every day",
    fee: "Free",
    tip: "From the old ticket gate it is a walk of about ten minutes up a forest path to the temple, so do not expect to step straight off the bus into the courtyard. Geungnakjeon, the hall repaired in 1363 and among the oldest wooden buildings in Korea, is easy to miss: go round the main hall, Daeungjeon, and look between the Gogeumdang and Hwaeom Gangdang buildings. Then leave the main precinct and climb the few steps to Yeongsanam, the small hermitage beside it, whose enclosed courtyard many visitors prefer to the temple itself. Buses from central Andong take about an hour and are infrequent, so check return times before setting out.",
    checked: '2026-11-13',
  },
  // Jusanji Pond [National Geopark] — https://www.imaeil.com/page/view/2026101607092356634
  "264533": {
    fee: "Free",
    tip: "Jusanji lies inside Juwangsan National Park, so it is not open around the clock: entry times are set by the park, and going in outside them can bring a fine of up to ₩300,000 (in summer you may enter from 04:00). The famous mist forms only on still mornings and usually lifts within one to two hours of sunrise, so arrive at first light. Entry and parking are free, and it is about 1 km from the entrance to the viewing deck. Important: Maeil Shinmun reported in October 2026 that the trail would be fully closed from December 2026 for pipe works – check with the national park office (054-873-0019) before travelling.",
    checked: '2026-11-13',
  },
  // Andong Market Jjimdak Alley — https://apis.data.go.kr/B551011/KorService2/detailCommon2 (KTO Korean record 2611137)
  "2944525": {
    hours: "08:30–22:00 (varies by restaurant)",
    closed: "Open every day",
    tip: "Around 30 jjimdak restaurants are packed into this alley inside Andong's Old Market; prices and recipes are broadly similar, so there is no need to hunt for a particular shop. Jjimdak is served as a shared dish, so it suits two or more people; solo diners may find portions large. Do not overlook the barley-rice (boribap) alley right next door, which has been going for more than 50 years and serves a set of barley rice with seasoned greens and grilled saury – a lighter alternative if you are eating twice in Andong.",
    checked: '2026-11-13',
  },
  // Imcheonggak House — https://mobile.newsis.com/view/NISX20260804_0003736256
  "264449": {
    fee: "Free",
    tip: "Imcheonggak is in the middle of a long restoration project that Andong city plans to finish in 2027, including two reconstructed houses beside the main house, so expect some building work and possible restrictions; the family home can also be closed to visitors for private reasons. A new history and culture hall on the life of independence activist Yi Sang-ryong, who was born here, opened on a temporary basis in August 2026, with formal opening hours announced as 10:00–17:00 in summer and 10:00–16:30 in winter. The railway that once ran in front of the house was removed in 2021, and the seven-storey brick pagoda of the Beopheungsa temple site stands just behind it.",
    checked: '2026-11-13',
  },
  // Guryongpo Fifth-Day Market — https://apis.data.go.kr/B551011/KorService2/detailCommon2 (KTO Korean record 132115)
  "1917325": {
    hours: "Market days are dates ending in 3 or 8: the 3rd, 8th, 13th, 18th, 23rd and 28th of each month",
    tip: "On market days the stalls spill out from the permanent market across the Changjucheon stream area, so a market day is very different from an ordinary visit. Seafood dominates – dried fish, squid and, in winter, gwamegi (half-dried herring or saury), for which Guryongpo is known; the gwamegi season starts around November. Raw-fish restaurants line the inner side of the market if you want to eat what you have just seen. The Japanese House Street, a preserved quarter of colonial-era houses with a small modern history museum (11:00–17:00, closed Mondays), is on the same Guryongpo-gil road and makes a natural pairing.",
    checked: '2026-11-13',
  },
  // Baekdudaegan V-Train — https://apis.data.go.kr/B551011/KorService2/detailCommon2 (KTO Korean record 1923400)
  "2040594": {
    hours: "Usually two round trips a day on operating days: Yeongju–Cheoram and Buncheon–Cheoram; about 1 hour 10 minutes one way through the gorge",
    tip: "The V-Train does not run every day, and sources disagree on which weekdays it rests, so pick your date in the Korail booking calendar, where non-running days are greyed out. Seats go on sale at 07:00 one month before travel and can sell out within minutes for the autumn-foliage and snow seasons. Between Buncheon and Seokpo the train slows to about 30 km/h, and it stops for ten minutes at the roadless stations of Seungbu and Yangwon, where villagers sell snacks and produce. The carriages have no toilets and no air-conditioning; in winter they are heated by a wood stove, so dress for the weather. Buncheon Station doubles as the Santa Village in winter.",
    checked: '2026-11-13',
  },
  // Jindo Mysterious Sea Route — https://apis.data.go.kr/B551011/KorService2/detailCommon2 (KTO Korean record 126433)
  "264282": {
    hours: "Tide-dependent: the 2.8 km path between Hoedong village and Modo island is fully exposed for only about an hour at the largest spring tides, a few days a year; times shift daily (late afternoon during the 2026 festival)",
    tip: "The sea does not part on demand, so build your trip around the published dates rather than turning up on spec. The main event is the Jindo Miracle Sea Road Festival each spring – in 2026 it ran from 17 to 20 April and drew around 90,000 people – when the path between Hoedong and Modo opens and crowds walk out across the seabed. The route stays open for only about an hour before the tide closes it again, so start back in good time. Expect wet, muddy ground underfoot. If you cannot make the dates, the Sea Road experience centre on site explains the phenomenon year-round. Check dates and times with Jindo County tourism (061-540-3407).",
    checked: '2026-11-13',
  },
  // Gurye Seomjingang Cherry Blossom Trail — https://apis.data.go.kr/B551011/KorService2/detailInfo2 (KTO Korean record 2648994)
  "2713053": {
    hours: "Open 24 hours",
    closed: "Open every day",
    fee: "Free",
    tip: "The blossom on this stretch of the Seomjingang usually peaks in late March or early April, and Gurye times its 300-ri Cherry Blossom Festival to match – in 2026 it ran from 28 to 30 March, partly around the Muncheok-myeon community centre on this side of the river. Dates move with the weather each year, so check the forecast flowering date before booking. Because this is a road as much as a walk, weekend traffic at peak bloom is heavy; walking a section on a weekday morning is far more pleasant than queuing in a car. Parking is free. In the same weeks, the red plum at Hwaeomsa and the spring flowers around Gurye make a sensible pairing.",
    checked: '2026-11-13',
  },
  // Gaudo Suspension Bridge — https://apis.data.go.kr/B551011/KorService2/detailCommon2 (KTO Korean record 2514003)
  "3080384": {
    hours: "Open 24 hours",
    closed: "Open every day",
    fee: "Free",
    tip: "There are two bridges: the 438 m Jeodu bridge from the Daegu-myeon side and the 716 m Mangho bridge from the Doam-myeon side, so you can cross on one and leave on the other if transport allows. On the island, the Hamkkehae-gil coastal trail loops 2.5 km and takes about an hour and a half on foot. Both bridges are lit after dark, and sunset followed by the lights is the best time for photographs. The island also has a monorail with its own seasonal hours (in winter, October to February, 09:00–16:30, last tickets 16:00), separate from the free bridges.",
    checked: '2026-11-13',
  },
  // Wando-gun, Cheongsando Island [Slow City] — https://apis.data.go.kr/B551011/KorService2/detailCommon2 (KTO Korean record 126970)
  "264610": {
    hours: "Reached by ferry from Wando Port (about 50 minutes); several sailings a day, roughly 07:00–18:00",
    fee: "Free",
    tip: "Cheongsando is an island to walk, not a single sight: its Slow Road network has 11 courses totalling 42.195 km past terraced 'gudeuljang' rice fields, stone-walled lanes and coastal viewpoints, so pick one or two courses rather than trying to cover it all in a day trip. Spring is the classic season – the Slow Walking Festival runs through April (1–30 April in 2026). The ferry from Wando takes about 50 minutes; departures change with the season and are cancelled in bad weather, so check the timetable the day before and again that morning, and note the last boat back.",
    checked: '2026-11-13',
  },
  // Muwisa Temple — https://apis.data.go.kr/B551011/KorService2/detailIntro2 (KTO Korean record 126357)
  "1729203": {
    hours: "09:00–18:00",
    closed: "Open every day",
    tip: "The reason to come is Geungnakbojeon, the National Treasure hall built in 1430, one of the best surviving examples of early Joseon temple architecture; look closely at its plain, restrained exterior and the bracketing beneath the eaves. The temple also holds the stele of Seongak Daesa and a three-storey stone pagoda from the Goryeo period. In 2025 the hall was being covered with a protective structure and the museum that shows its wall paintings was under construction, so check with the temple (061-432-4974) before you go if seeing the interior paintings matters to you. It sits at the foot of Wolchulsan, so it pairs well with a hike.",
    checked: '2026-11-13',
  },
  // Seosan Gaesimsa Temple — https://www.ktriptips.com/kor/tourspot/125908
  "1919529": {
    hours: "Grounds always open",
    closed: "Open every day",
    tip: "Gaesimsa is at its best in mid to late April, when its rare green-tinged cherry blossom and double-flowered cherries bloom in front of the halls – these flower roughly two weeks after ordinary cherry blossom, so a visit after the main blossom season has passed elsewhere still pays off. Expect crowds on spring weekends. There is a car park near the temple entrance, from which a short forest walk leads up to the halls. Arame-gil, a waymarked walking route, links the temple with the Seosan rock-carved Buddha triad, and Haemi Fortress is in the same part of Seosan if you want a second stop.",
    checked: '2026-11-13',
  },
  // Guinsa Temple (Danyang) — https://www.ktriptips.com/kor/tourspot/127677
  "1634462": {
    hours: "Grounds always open; free shuttle bus from the car park 09:00–17:10",
    closed: "Open every day",
    fee: "Free (parking: cars ₩3,000; compact cars ₩1,500)",
    tip: "Guinsa, headquarters of the Cheontae order, is built up a steep, narrow valley, with dozens of buildings stacked one above another, so the visit is a climb. A free shuttle runs from the lower car park up towards the main gate, but only uphill – you walk back down. The highest building, Daejosajeon, is roughly 900 m above the shuttle drop-off and worth the effort for the view down the valley. The temple serves a free vegetarian lunch to all visitors, usually between 11:30 and 13:30; eat what you take and clear your own tray. Autumn colour in the valley is outstanding.",
    checked: '2026-11-13',
  },
  // Miryang Pyochungsa Temple — https://www.ktriptips.com/kor/tourspot/126174
  "264583": {
    hours: "Grounds always open",
    closed: "Open every day",
    fee: "Free",
    tip: "Pyochungsa is unusual in combining a Buddhist temple with a Confucian-style shrine honouring the warrior monk Samyeong Daesa, who led monk soldiers against the Japanese invasions of the 1590s – look for the shrine buildings within the temple grounds. The temple is also the usual starting point for hikes on Jaeyaksan, including the climb past Cheungcheung and Geumgang waterfalls towards the Sajapyeong highland, so walkers should start early. The public car park is free. By public transport, the Pyochungsa 1 bus runs from Miryang intercity bus terminal to the temple; the ride takes about an hour.",
    checked: '2026-11-13',
  },
  // German Village — https://apis.data.go.kr/B551011/KorService2/detailIntro2 (KTO Korean record 129489)
  "1941105": {
    fee: "Free (Paedok Exhibition Hall: ₩1,000)",
    tip: "The village itself is a hillside of private homes, guesthouses, cafés and German-style restaurants, so there is no entry fee and no fixed opening time, but individual businesses keep their own hours. The small Paedok Exhibition Hall (around ₩1,000, allow about 30 minutes) tells the story of the Korean miners and nurses sent to West Germany in the 1960s and 1970s, which gives the village its meaning. The main annual event is the German Village Beer Festival in October (9–11 October in 2026); entry to the festival grounds is free, with food and beer paid for. Please remember that many of the houses are homes – stay off private gardens.",
    checked: '2026-11-13',
  },
  // Namgyeseowon Confucian Academy [UNESCO World Heritage] — https://www.ktriptips.com/kor/tourspot/129700
  "3079139": {
    hours: "Grounds always open",
    closed: "Open every day",
    fee: "Free",
    tip: "Namgyeseowon is a good place to understand how a Confucian academy was laid out, because it sits on a gentle slope with the lecture hall, students' dormitories and shrine climbing one behind another, and the view opens out from the top towards the stream that gives it its name. Cheonggyeseowon, a smaller academy built for a fellow pupil of the same teacher, stands immediately beside it, so look at both. Entry and parking are free. A Korean-language guide can be booked by phone (055-760-4520); allow 30–45 minutes for the two academies together.",
    checked: '2026-11-13',
  },
};
