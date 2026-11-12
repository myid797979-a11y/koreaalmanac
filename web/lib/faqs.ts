// 가이드별 Quick answers (components/GuideFaq). 본문에 있는 사실만 짧게 다시 말한다.
// 숫자·제도가 바뀌면 본문과 여기를 같이 고친다.
export const FAQS: Record<string, { q: string; a: string }[]> = {
  '/guides/seoul-palaces/': [
    { q: 'Which Seoul palace should I visit if I only have time for one?', a: 'Gyeongbokgung: it is the largest, has the guard-changing ceremony at the main gate, and sits next to Bukchon and the National Palace Museum. It is closed on Tuesdays.' },
    { q: 'Which palaces are closed on Monday and which on Tuesday?', a: 'Gyeongbokgung and Jongmyo close on Tuesdays. Changdeokgung, Changgyeonggung, Deoksugung and Gyeonghuigung close on Mondays, so there is always a palace open.' },
    { q: 'Is entry to the palaces free if you wear hanbok?', a: 'Yes. Visitors wearing hanbok get free entry to all five Seoul palaces and Jongmyo; very costume-like modern styles may not count.' },
    { q: 'Do I need to book the Secret Garden at Changdeokgung?', a: 'Yes. The Secret Garden (Huwon) is a separate, timed guided tour with limited places; book online a few days ahead in spring and autumn.' },
  ],
  '/guides/incheon-airport-to-seoul/': [
    { q: 'What is the fastest way from Incheon Airport to Seoul?', a: 'The AREX express train to Seoul Station takes about 43 minutes non-stop from Terminal 1. Whether it is the best choice depends on where your hotel is.' },
    { q: 'Is a taxi from Incheon Airport to Seoul expensive?', a: 'A standard taxi to central Seoul costs about ₩60,000–90,000 including the expressway toll, more at night. For three or more people with luggage it can be the best value.' },
    { q: 'What if I land after midnight?', a: 'Trains stop around midnight, but late-night airport buses and taxis run. Many travellers book an airport hotel for the first night.' },
  ],
  '/guides/korea-entry-requirements/': [
    { q: 'Do US, UK, Canadian and Australian citizens need a K-ETA in 2026?', a: 'No. Citizens of 22 countries including these are exempt from the K-ETA until 31 December 2026, but must file the e-Arrival Card instead.' },
    { q: 'When do I fill in the e-Arrival Card?', a: 'Online at the official site within the three days before you land in Korea. Every traveller needs one, including children.' },
    { q: 'How much does the K-ETA cost?', a: '₩10,000 on the official site, k-eta.go.kr. Look-alike agency sites charge several times more for the same form.' },
  ],
  '/guides/esim-and-apps-for-korea/': [
    { q: 'Does Google Maps work in Korea?', a: 'Only partly. Google Maps gives public transport directions but not walking or driving directions in Korea. Use Naver Map or KakaoMap instead.' },
    { q: 'Should I get an eSIM or a SIM card for Korea?', a: 'A data eSIM is the easiest if your phone supports it. Get a SIM or eSIM with a Korean phone number only if you need it for app sign-ups.' },
    { q: 'Which taxi app works in Korea?', a: 'Kakao T. You enter the destination and the driver sees it in Korean; you can pay in the app or in the car.' },
  ],
  '/guides/getting-around-seoul/': [
    { q: 'How much is the subway in Seoul?', a: 'A basic ride is ₩1,550 with a transport card such as T-money, more for longer distances. Transfers to buses within about 30 minutes are free if you tap out.' },
    { q: 'Can I top up T-money with a foreign credit card?', a: 'Usually not; T-money is topped up with cash at station machines and convenience stores. Travel cards such as WOWPASS take foreign cards.' },
    { q: 'What happens if I forget to tap out of the subway?', a: 'Since March 2026, leaving without tapping your card at the exit gate adds an extra charge of one base fare.' },
  ],
  '/guides/korea-on-a-budget/': [
    { q: 'How much money do I need per day in Seoul?', a: 'About ₩60,000 (US$45) on a tight budget, ₩130,000 (US$95) mid-range and ₩250,000 (US$185) comfortable, per person, according to 2026 prices.' },
    { q: 'Is Korea expensive for tourists?', a: 'Hotels and coffee cost what they do in Europe, while transport, museums, meals and bathhouses are cheap. Many of the best sights are free or nearly free.' },
  ],
  '/guides/where-to-stay-in-seoul/': [
    { q: 'Where should I stay in Seoul for a first visit?', a: 'Myeongdong for convenience, or Jongno and Insadong if the palaces are the point. Hongdae suits nightlife and has a direct train from the airport.' },
    { q: 'Is Gangnam a good area to stay in Seoul?', a: 'It is polished and convenient for K-pop agencies and shopping, but 30–40 minutes from the palaces, so it suits a second visit better than a first.' },
  ],
  '/guides/kpop-tickets/': [
    { q: 'Can foreigners buy K-pop concert tickets?', a: 'Yes, through the global sites of the Korean platforms (NOL World, YES24 Global, Melon Ticket Global), but popular shows sell out in minutes and some presales need a fan-club membership.' },
    { q: 'Are resold K-pop tickets safe?', a: 'No. Agencies cancel tickets they detect as resold and many shows check ID at the door; buy only through the platform named in the official announcement.' },
  ],
  '/guides/dmz-tour-from-seoul/': [
    { q: 'Can you visit the DMZ without a tour?', a: 'You can reach Imjingak, the Peace Gondola and Odusan Observatory on your own. The Third Tunnel, Dora Observatory and Dorasan Station need a registered tour or the local security tour.' },
    { q: 'Do I need my passport for a DMZ tour?', a: 'Yes, the original passport. Soldiers check it at the Civilian Control Line, and tours cannot take you in without it.' },
    { q: 'Is the DMZ open on Mondays?', a: 'No. The DMZ sites are closed on Mondays and some national holidays, and can close at short notice for security reasons.' },
  ],
  '/guides/korean-spa-jjimjilbang/': [
    { q: 'Do you have to be naked in a Korean spa?', a: 'Only on the bathing floors, which are separated by sex. The shared jjimjil sauna hall is clothed, in the T-shirt and shorts provided.' },
    { q: 'Can you stay overnight in a jjimjilbang?', a: 'Yes, at 24-hour spas, for a small surcharge. You sleep on mats in a shared hall, so it is cheap but not private.' },
  ],
  '/guides/seoul-in-december/': [
    { q: 'How cold is Seoul in December?', a: 'Around 4°C by day and −4°C at night on average, dry and often clear, with a few days of light snow. Wind makes it feel colder.' },
    { q: 'When is the Seoul Lantern Festival 2026?', a: '11 December 2026 to 31 January 2027, 18:00–23:00 along the Cheonggyecheon stream. Entry is free.' },
    { q: 'Is Christmas a holiday in Korea?', a: 'Yes, 25 December is a public holiday (a Friday in 2026), but shops, palaces, museums and theme parks are open; restaurants are busiest on the 24th.' },
    { q: 'When is the SBS Gayo Daejeon 2026?', a: '24 and 25 December 2026 at KINTEX in Ilsan, two nights for its 30th edition.' },
  ],
  '/guides/seoul-new-years-eve/': [
    { q: 'What time is the Bosingak bell-ringing on New Year’s Eve?', a: 'The ceremony starts at about 23:00 on 31 December and the bell is struck 33 times at midnight; it finishes by about 00:20.' },
    { q: 'Does the Seoul subway run late on New Year’s Eve?', a: 'Last year final trains on lines 1–9 reached the end of each line at about 02:00, and Jonggak station, next to the belfry, did not stop from 23:00 to 01:00. The 2026 plan is announced in late December.' },
    { q: 'What time is sunrise in Seoul on 1 January 2027?', a: 'About 07:47 at sea level, a minute or two earlier from a hilltop such as Achasan or Namsan. On the east coast at Jeongdongjin it is about 07:39.' },
    { q: 'Where is the best place to see the first sunrise in Seoul?', a: 'Achasan is the favourite: a 30–40 minute climb from Achasan station with a clear view east over the Han River. Namsan and Inwangsan are the central alternatives.' },
  ],
  '/guides/hwacheon-ice-festival-2027/': [
    { q: 'When is the Hwacheon Sancheoneo Ice Festival 2027?', a: '9 to 31 January 2027 on the frozen Hwacheoncheon stream in Gangwon. It opens only when the ice is thick enough, so check the official site the week before.' },
    { q: 'How much does ice fishing at Hwacheon cost?', a: 'In 2026 the fishing ticket was ₩15,000, with ₩5,000 returned as a local produce voucher, and a limit of three fish. The 2027 price was not yet published in November 2026.' },
    { q: 'Is there a foreigners-only area at the Hwacheon Ice Festival?', a: 'In 2026 there was a separate foreigners’ ice-fishing zone with its own ticket booth, rest area and grill. Bring your passport, and check the 2027 arrangements before you go.' },
    { q: 'How do I get to Hwacheon from Seoul?', a: 'Foreigner-only shuttle buses from central Seoul (about 2½ hours, ticket included), or an intercity bus from Dong Seoul Bus Terminal, about 2–2½ hours.' },
  ],
  '/guides/money-in-korea/': [
    { q: 'Do foreign credit cards work in Korea?', a: 'Visa and Mastercard work in almost all shops, restaurants, taxis and hotels; Amex in fewer places. They often fail on Korean websites and apps, and in Kakao Pay or Naver Pay.' },
    { q: 'How much cash should I carry in Korea?', a: 'About ₩50,000–100,000 for market stalls, street food and topping up a T-money card, which only takes cash.' },
    { q: 'Can I tap my foreign card on the Seoul subway?', a: 'Not at the gates or on buses. Since March 2026 the newer subway ticket machines accept foreign cards for single tickets and the Climate Card, with a fee of about 3.7%.' },
    { q: 'Do you tip in Korea?', a: 'No. There is no tipping in restaurants, taxis or hotels, and prices include VAT.' },
  ],
  '/guides/tax-refund-korea/': [
    { q: 'What is the minimum purchase for a tax refund in Korea?', a: '₩15,000 per receipt at one store showing a Tax Free or Tax Refund sign.' },
    { q: 'What are the instant tax refund limits in Korea?', a: 'Under ₩1,000,000 per purchase and up to ₩5,000,000 in total per trip. Above that, claim at a downtown booth or at the airport.' },
    { q: 'Where do I get my tax refund at Incheon Airport?', a: 'Scan your passport and slips at a kiosk in the 3F departures hall before checking your bags, see customs if the kiosk asks, then collect cash after security.' },
    { q: 'Can foreigners get a VAT refund on cosmetic surgery in Korea?', a: 'Not at the moment. The cosmetic-procedure refund ended on 31 December 2025, and no extension had passed as of November 2026.' },
  ],
};
