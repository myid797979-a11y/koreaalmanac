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
};
