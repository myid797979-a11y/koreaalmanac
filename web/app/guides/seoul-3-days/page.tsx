import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';

export const metadata = {
  title: '3 Days in Seoul — a first-timer itinerary that respects the closing days',
  description: 'A practical 3-day Seoul itinerary built around real walking distances and the palace closing days most guides ignore: Gyeongbokgung shuts Tuesdays, Changdeokgung Mondays, and Bukchon has a 5pm curfew with a ₩100,000 fine.',
};

const P = (slug: string, label: string) => (
  <Link href={'/place/' + slug + '/'}>{label}</Link>
);

export default function SeoulThreeDays() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: '3 Days in Seoul', path: '/guides/seoul-3-days/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › 3 Days in Seoul
      </div>

      <h1>3 days in Seoul, planned around what is actually open</h1>
      <p className="sub">
        Most three-day Seoul itineraries fall apart on contact with the city, because they
        ignore two things: the palaces close on different weekdays, and Bukchon Hanok Village
        now fines visitors who turn up after 5pm. This one is built around those facts and
        around real walking distances.
      </p>

      <div className="callout callout-warn">
        <strong>Read this before you fix your dates.</strong>
        <ul>
          <li><strong>Gyeongbokgung and Jongmyo close on Tuesdays.</strong></li>
          <li><strong>Changdeokgung, Changgyeonggung and Deoksugung close on Mondays.</strong></li>
          <li>
            <strong>Bukchon Hanok Village&apos;s main alley is off-limits from 17:00 to 10:00</strong>{' '}
            and the fine is ₩100,000. Enforcement started in March 2025 and is still running.
          </li>
        </ul>
        <p className="meta" style={{ margin: '8px 0 0' }}>
          If your trip lands on a Monday or Tuesday, swap Day 1 and Day 3 below rather than
          losing a palace.
        </p>
      </div>

      <h2 className="sect">Before you go: four things worth knowing</h2>

      <table className="facts">
        <tbody>
          <tr>
            <th>Palace ticket</th>
            <td>
              Buy the <strong>integrated ticket, ₩6,000</strong> — it covers all four palaces
              plus Jongmyo and is valid six months. Individual entry is ₩3,000 for Gyeongbokgung
              or Changdeokgung, so it pays for itself at the second palace. Many English guides
              still quote ₩10,000 for three months; that version is gone. Note that
              Changdeokgung&apos;s Huwon garden is <em>not</em> included.
            </td>
          </tr>
          <tr>
            <th>Wear hanbok, enter free</th>
            <td>
              Hanbok rental shops cluster around Gyeongbokgung, and wearing one gets you into
              all four palaces and Jongmyo free, whatever your nationality. It has to be a real
              set — a jeogori top with its ribbons tied, plus a skirt or trousers. Jeogori over
              jeans will be refused at the gate.
            </td>
          </tr>
          <tr>
            <th>Maps</th>
            <td>
              <strong>Google Maps cannot give you walking or driving directions in Korea</strong> and
              its transit routing is patchy — a mapping-data export restriction, not a bug.
              Download <strong>Naver Map</strong> before you fly; add KakaoMap and Kakao T if you
              plan to take taxis.
            </td>
          </tr>
          <tr>
            <th>Transport card</th>
            <td>
              A T-money card from any convenience store costs about ₩2,500–5,000 empty; load
              ₩30,000–40,000 for three days. Subway starts at ₩1,550, buses at ₩1,500, and
              transfers within 30 minutes are free — but you must tap off when you leave a bus
              or you lose the discount.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">Day 1 — the palace quarter, on foot</h2>
      <p>
        Everything on this day sits inside a 1.5 km circle, so you will walk it rather than
        ride. Avoid a Tuesday.
      </p>

      <ol className="timeline">
        <li>
          <strong>09:30 — {P('gwanghwamun-gate-264329', 'Gwanghwamun Gate')}</strong>
          <p>
            Arrive before the crowd and stand at the gate for the{' '}
            <strong>Changing of the Royal Guard at 10:00</strong> (again at 14:00, about 20
            minutes, free — it happens outside the ticket gate). It is cancelled in heavy rain,
            below −10 °C, above 30 °C, and on Tuesdays when the palace is shut.
          </p>
        </li>
        <li>
          <strong>10:20 — {P('gyeongbokgung-palace-264337', 'Gyeongbokgung Palace')}</strong>
          <p>
            The largest of the five palaces, built in 1395, burned in the Imjin War and rebuilt
            in the 1860s. Give it 1.5–2 hours. The National Folk Museum and the National Palace
            Museum sit on the same grounds and are free.
          </p>
        </li>
        <li>
          <strong>12:30 — lunch, then {P('bukchon-hanok-village-561382', 'Bukchon Hanok Village')}</strong>{' '}
          <span className="meta">900 m from the palace</span>
          <p>
            A residential neighbourhood of tiled-roof hanok on the hill between two palaces —
            people live here, which is exactly why the curfew exists. Come between 10:00 and
            17:00, keep your voice down in the alleys, and give it an hour. The wider
            neighbourhood and its cafés have no time limit; only the Bukchon-ro 11-gil alley
            does.
          </p>
        </li>
        <li>
          <strong>14:30 — {P('changdeokgung-palace-complex-unesco-world-heritage-site-264348', 'Changdeokgung Palace')}</strong>{' '}
          <span className="meta">400 m from Bukchon</span>
          <p>
            The UNESCO-listed palace, and the one Joseon kings actually preferred to live in
            because it follows the hillside instead of flattening it. Its{' '}
            <strong>Huwon (Secret Garden) needs a separate ₩5,000 timed ticket</strong> — 100
            people per session, half sold online from six days ahead, half on the day from
            09:00. Contrary to most English guides, you no longer have to join the guided tour:
            since 2023 you can walk the open route at your own pace. English commentary runs
            10:30, 11:30, 14:30 and 15:30.
          </p>
        </li>
        <li>
          <strong>17:00 — {P('ikseon-dong-hanok-street-2943972', 'Ikseon-dong')} and{' '}
          {P('insadong-cultural-street-3075115', 'Insadong')}</strong>{' '}
          <span className="meta">500 m and 800 m away</span>
          <p>
            Ikseon-dong is a 1920s hanok district that became a dense grid of small restaurants
            and coffee bars; Insadong next door is the traditional-crafts and tea street. Both
            are at their best in the evening, and both are a short walk from where Day 1 ends.
          </p>
        </li>
      </ol>

      <div className="callout">
        <strong>If you are here on a Monday</strong> — Changdeokgung is closed. Do Gyeongbokgung
        and Bukchon in the morning, then {P('jongmyo-shrine-unesco-world-heritage-264351', 'Jongmyo Shrine')}{' '}
        instead. Note that Jongmyo runs <strong>timed guided entry on Mon/Wed/Thu/Fri</strong>{' '}
        (English at 10:00, 12:00, 14:00, 16:00, about 50 minutes); Saturdays are free-roaming.
      </div>

      <h2 className="sect">Day 2 — the modern city</h2>
      <p>
        Day 2 spreads out, so this is a subway day. None of it is weekday-dependent.
      </p>

      <ol className="timeline">
        <li>
          <strong>Morning — {P('deoksugung-palace-264316', 'Deoksugung Palace')} and the city centre</strong>
          <p>
            The smallest palace and the strangest, because it mixes Joseon halls with
            Western-style stone buildings from the 1900s — the period when Korea was trying to
            modernise its way out of being carved up. Entry ₩1,000, or free with your integrated
            ticket. It is open until 21:00, unusually late, and free every Wednesday from
            August 2026.
          </p>
        </li>
        <li>
          <strong>Midday — {P('myeong-dong-264312', 'Myeongdong')}</strong>{' '}
          <span className="meta">700 m from Deoksugung</span>
          <p>
            Cosmetics, street food and the densest concentration of English-speaking retail in
            the country. Best treated as ninety minutes of walking and eating rather than a
            destination in itself.
          </p>
        </li>
        <li>
          <strong>Afternoon — {P('seoul-namsan-park-264320', 'Namsan Park')} and N Seoul Tower</strong>{' '}
          <span className="meta">1.2 km, or take the cable car</span>
          <p>
            The mountain in the middle of the city. Walk up through the park or ride the cable
            car; the view is the point, and it is better an hour before sunset than at noon.
          </p>
        </li>
        <li>
          <strong>Evening — {P('cheonggyecheon-museum-268210', 'Cheonggyecheon')} stream walk</strong>
          <p>
            A covered-over stream that was dug back out in 2005 after an elevated expressway on
            top of it was demolished. Walking it after dark, below street level with the traffic
            overhead, is the best free hour in central Seoul.
          </p>
        </li>
      </ol>

      <h2 className="sect">Day 3 — pick one direction</h2>
      <p>
        By the third day you know what you like. Rather than one fixed route, here are three
        that work — each is a half-day plus dinner, and each sits in a different part of the city.
      </p>

      <div className="hubgrid">
        <div className="hubcard" style={{ cursor: 'default' }}>
          <h2>If you like parks and river</h2>
          <p>
            {P('seoul-forest-789696', 'Seoul Forest')} in the morning, then walk into Seongsu —
            a former shoe-factory district now full of converted-warehouse cafés — and finish at
            a Han River park for the evening.
          </p>
        </div>
        <div className="hubcard" style={{ cursor: 'default' }}>
          <h2>If you like markets and old streets</h2>
          <p>
            Start at {P('dongdaemun-dak-hanmari-alley-2590278', 'Dongdaemun')}, work west through
            the fabric and tool markets, and end at Euljiro&apos;s printing alleys, which turn
            into bars after dark.
          </p>
        </div>
        <div className="hubcard" style={{ cursor: 'default' }}>
          <h2>If you have children</h2>
          <p>
            Lotte World is 12 km southeast and takes a full day — do not try to pair it with
            anything else. Entry is around ₩64,000, which is the one case where a{' '}
            Discover Seoul Pass may pay for itself.
          </p>
        </div>
      </div>

      <h2 className="sect">What this itinerary deliberately leaves out</h2>
      <p>
        Three days is not enough for the DMZ, which eats a full day including the drive, or for
        a day trip to Suwon Hwaseong. Both are worth doing on a longer trip. We have also kept
        shopping light — if that is your priority, Myeongdong and Dongdaemun can each absorb a
        whole day on their own.
      </p>

      <h2 className="sect">Check what is on while you are here</h2>
      <p>
        Seoul runs festivals, traditional performances and museum shows year round, and they
        change every week. Put your actual dates into the{' '}
        <Link href="/plan/">Trip Planner</Link> to see what falls inside your trip, or browse{' '}
        <Link href="/regions/seoul/">everything in Seoul</Link>.
      </p>

      <p className="strip">
        <Link href="/regions/seoul/">Seoul: places &amp; events</Link>
        <Link href="/places/palaces-heritage/">Palaces &amp; heritage</Link>
        <Link href="/events/traditional/">Traditional performances</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <p className="meta">
        Fees, hours and closing days verified against the Korea Heritage Service in September
        2026. Palace admission is under review and may rise on 1 January 2027. Rules change —
        check the official page for anything your trip depends on.
      </p>
    </div>
  );
}
