import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';

export const metadata = {
  title: 'Korea Basics — the things to sort before you fly',
  description: 'Entry rules for 2026, why Google Maps cannot route you in Korea, transport cards, paying for things, and when to go. Groundwork for a first trip.',
};

export default function KoreaBasics() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Korea Basics', path: '/korea-basics/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />

      <div className="crumb"><Link href="/">Home</Link> › Korea Basics</div>

      <h1>Korea basics: what to sort before you fly</h1>
      <p className="sub">
        Most of a Korea trip is easy. A handful of things are not obvious, and two of them
        will genuinely catch you out on day one — the mapping apps and the entry paperwork.
        This is the groundwork, separate from any particular city.
      </p>

      <div className="callout callout-warn">
        <strong>The two that trip people up.</strong>
        <ul>
          <li>
            <strong>Google Maps cannot give you walking or driving directions in Korea.</strong>{' '}
            It is not a bug and a better signal will not fix it — mapping data cannot legally be
            exported, so the routing engine has nothing to work with. Download{' '}
            <strong>Naver Map</strong> before you fly.
          </li>
          <li>
            <strong>The e-Arrival Card is mandatory</strong> and has to be submitted online
            within three days before you land. It is free. K-ETA is a separate thing — and the
            rule changes on 1 January 2027 (below).
          </li>
        </ul>
      </div>

      <h2 className="sect">Getting in</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Visa</th>
            <td>
              Citizens of the US, UK, Canada, Australia, the EU and around 110 other countries
              enter <strong>visa-free for up to 90 days</strong> as tourists.
            </td>
          </tr>
          <tr>
            <th>K-ETA</th>
            <td>
              Waived through <strong>31 December 2026</strong> for 67 countries including the US,
              UK, Canada and Australia. <strong>From 1 January 2027 it comes back</strong> and
              every visa-free nationality will need approval before boarding. If your trip
              straddles the new year, check which side of it your departure falls on.
            </td>
          </tr>
          <tr>
            <th>e-Arrival Card</th>
            <td>
              Required, free, submitted online <strong>within three days before arrival</strong>.
              It replaces the paper card you used to fill in on the plane.
            </td>
          </tr>
        </tbody>
      </table>
      <p className="meta">
        Entry rules change. Confirm on the official K-ETA and Korea Immigration sites before you
        book — this page was last checked in September 2026.
      </p>

      <h2 className="sect">Maps and getting around</h2>
      <p>
        <strong>Naver Map</strong> is the one to install. It does public transport, walking and
        driving, in English, and its subway directions include which carriage to board for the
        fastest transfer. <strong>KakaoMap</strong> is the main alternative and some people
        prefer its interface; <strong>Kakao T</strong> is what you use to call a taxi. Google
        Maps still works for searching and for saving pins, so it is worth keeping — it just
        cannot route you.
      </p>
      <table className="facts">
        <tbody>
          <tr>
            <th>Transport card</th>
            <td>
              A <strong>T-money</strong> card from any convenience store (GS25, CU, 7-Eleven,
              Emart24) costs about <strong>₩2,500</strong> empty. It works on subways, city
              buses, airport buses and most taxis, nationwide — your Seoul card works in Busan.
              Load ₩30,000–40,000 for a few days. Tap off when leaving a bus or you lose the
              transfer discount.
            </td>
          </tr>
          <tr>
            <th>Between cities</th>
            <td>
              KTX is the fast train — Seoul to Busan in about 2h 20m. Express buses are cheaper
              and go more places. For a simple return trip a rail pass rarely pays for itself;
              it needs a multi-city route to make sense.
            </td>
          </tr>
          <tr>
            <th>Staying connected</th>
            <td>
              An <strong>eSIM</strong> bought before you fly is the least hassle if your phone
              supports one. Otherwise pick up a SIM or a pocket wifi at the airport. Public wifi
              is genuinely everywhere — cafés, subway stations, buses.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">Paying for things</h2>
      <p>
        Korea is close to cashless. <strong>Visa and Mastercard work almost everywhere</strong>,
        down to convenience stores and small cafés; American Express is accepted in noticeably
        fewer places. Carry <strong>₩50,000 or so in cash</strong> anyway — traditional market
        stalls, street food and a few older restaurants are cash-only, and those are exactly the
        places worth eating at.
      </p>
      <p>
        <strong>There is no tipping.</strong> Not in restaurants, not in taxis, not in hotels.
        Leaving money on the table will more likely cause confusion than pleasure. The one
        exception is a private guide, where ₩10,000–30,000 a day is a generous gesture and still
        not expected.
      </p>
      <p>
        VAT is 10% and already in the price you see. On purchases at participating
        <strong> tax-free</strong> shops you can claim it back; for anything under ₩500,000 the
        shop can usually deduct it at the till, which saves queueing at the airport.
      </p>

      <h2 className="sect">When to go</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Spring · Apr–May</th>
            <td>
              Cherry blossom late March to mid-April, moving south to north. Mild and busy.
              The blossom window is about a week in any given place and shifts with the weather.
            </td>
          </tr>
          <tr>
            <th>Summer · Jun–Aug</th>
            <td>
              Hot and humid, with the monsoon through late June and July. Beaches and water
              festivals are at their best; mountain hiking is not.
            </td>
          </tr>
          <tr>
            <th>Autumn · Sep–Nov</th>
            <td>
              The best of it. Clear skies, comfortable temperatures, and foliage running from
              the northern mountains in mid-October down to the south by early November. Also
              the densest festival season — which is what the{' '}
              <Link href="/calendar/">calendar</Link> is for.
            </td>
          </tr>
          <tr>
            <th>Winter · Dec–Feb</th>
            <td>
              Cold and dry, sometimes well below freezing. Fewer crowds, ski resorts, ice
              fishing festivals, and palaces in the snow.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Two dates to plan around: <strong>Seollal</strong> (lunar new year) and{' '}
        <strong>Chuseok</strong> (harvest festival). Both move each year, both empty the cities
        as people travel to family, and both shut a lot of small businesses for several days
        while transport sells out. Palaces and major attractions usually stay open and are
        sometimes free.
      </p>

      <h2 className="sect">Small things worth knowing</h2>
      <ul>
        <li>
          <strong>Shoes come off</strong> in homes, guesthouses, temple halls and some
          traditional restaurants. Wear socks you do not mind being seen in.
        </li>
        <li>
          <strong>Convenience stores are infrastructure</strong>, not a last resort — decent
          food, seating, ATMs, transport card top-ups, umbrellas.
        </li>
        <li>
          <strong>Tap water is safe</strong>, though most Koreans drink filtered water.
        </li>
        <li>
          <strong>Emergency numbers:</strong> 119 for fire and ambulance, 112 for police.{' '}
          <strong>1330</strong> is the Korea Travel Hotline — free, 24 hours, and staffed in
          English, Japanese and Chinese. It is the single most useful number to save.
        </li>
      </ul>

      <h2 className="sect">Next</h2>
      <p>
        With the groundwork done, the two questions left are where to go and what is on while
        you are there. The <Link href="/guides/">city guides</Link> cover routes that already
        account for closing days, <Link href="/places/">Places</Link> is what to see, and the{' '}
        <Link href="/plan/">Trip Planner</Link> shows the festivals, concerts and exhibitions
        that fall inside your dates.
      </p>

      <p className="strip">
        <Link href="/guides/incheon-airport-to-seoul/">Incheon Airport to Seoul</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
        <Link href="/guides/">City guides</Link>
        <Link href="/places/">Places to visit</Link>
        <Link href="/plan/">Trip Planner</Link>
        <Link href="/calendar/">Calendar</Link>
      </p>

      <p className="meta">
        Checked September 2026 against Korea Immigration, the K-ETA portal and Korea Tourism
        Organization guidance. Entry rules and fares change — confirm anything your trip
        depends on.
      </p>
    </div>
  );
}
