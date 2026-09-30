import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Getting around Seoul: T-money, travel cards, the subway, buses and taxis',
  description: 'How to get around Seoul as a visitor: buying and topping up T-money, the WOWPASS and visitor travel cards, riding the subway and buses, free transfers, last trains and night buses, and taking taxis with Kakao T.',
};

export default function GettingAroundSeoul() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Getting around Seoul', path: '/guides/getting-around-seoul/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/getting-around-seoul/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Getting around Seoul
      </div>

      <h1>Getting around Seoul: cards, subway, buses and taxis</h1>
      <p className="sub">
        Seoul has one of the best public transport systems anywhere: more than twenty subway and
        rail lines, buses that go everywhere else, and taxis that are cheap by international
        standards. Everything runs on one tap card. Here is how to get it and use it.
      </p>

      <div className="callout">
        <strong>What to do on day one</strong>
        <ul>
          <li><strong>Get a transport card</strong> at the airport or any convenience store: T-money, or a travel card such as WOWPASS that also pays in shops.</li>
          <li><strong>Top it up with cash</strong> at subway machines or convenience stores. T-money itself does not take foreign cards for top-ups.</li>
          <li><strong>Tap in and tap out</strong> on the subway and on buses; tapping out on the bus is what gives you the free transfer.</li>
        </ul>
      </div>

      <h2 className="sect">The cards</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>T-money</th>
            <td>
              The standard tap card, sold for a few thousand won at convenience stores and station
              machines, and topped up with cash. Works on the subway, buses and most taxis across the
              country, and in convenience stores. Fares are slightly cheaper than single tickets.
            </td>
          </tr>
          <tr>
            <th>WOWPASS and travel cards</th>
            <td>
              Prepaid cards for visitors that combine a T-money transport chip with a debit card for
              shops, topped up with foreign cash or cards at their own machines in stations and
              hotels. Convenient if you would rather not carry won.
            </td>
          </tr>
          <tr>
            <th>Unlimited passes</th>
            <td>
              Seoul sells short-term unlimited passes for visitors on its own subway and buses. They
              pay off only if you ride a lot; most visitors spend less on a normal card.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.transit}
        title="Cards and passes"
        intro="Order the travel card or the airport train ahead and pick them up when you land."
      />

      <h2 className="sect">The subway</h2>
      <ul className="tips">
        <li>A basic ride costs ₩1,550 with a card, more for longer distances. Transfers between subway and bus are free within about 30 minutes if you tap out.</li>
        <li><strong>Always tap out of the subway.</strong> Since March 2026, leaving without tapping your card at the exit gate adds an extra charge of one base fare.</li>
        <li>Lines are numbered and colour-coded; station signs and announcements are in English. Each station has numbered exits, and directions always give the exit number.</li>
        <li>Trains run from about 05:30 to around midnight. The last train varies by line and direction; the subway app shows it.</li>
        <li>The seats at the ends of each carriage are for elderly and disabled passengers, and the pink seats are for pregnant women. Leave them empty.</li>
      </ul>

      <h2 className="sect">Buses and night buses</h2>
      <p>
        Blue buses run long routes across the city, green buses feed the subway, and red buses go
        out to the satellite cities. Board at the front, tap, and tap again at the back door when you
        get off. After the subway closes, <strong>night buses</strong> numbered with an N run the main
        corridors until the early morning.
      </p>

      <h2 className="sect">Taxis</h2>
      <ul className="tips">
        <li>Standard taxis (orange, white or silver) are the cheap ones; black deluxe taxis cost more. All take cards and T-money.</li>
        <li>A late-night surcharge applies roughly from 22:00 to 04:00, and taxis are hard to find in nightlife areas after midnight.</li>
        <li>Use <strong>Kakao T</strong> to book: the driver sees your destination in Korean. See the <Link href="/guides/esim-and-apps-for-korea/">apps guide</Link>.</li>
        <li>Otherwise, show the destination in Korean; drivers rarely know English place names.</li>
      </ul>

      <h2 className="sect">Further afield</h2>
      <p>
        For other cities, the <strong>KTX</strong> high-speed trains leave from Seoul Station, Yongsan
        and Suseo; see <Link href="/guides/day-trips-from-seoul/">day trips from Seoul</Link> and the{' '}
        <Link href="/guides/korea-7-day-itinerary/">7-day itinerary</Link>. From the airport, see{' '}
        <Link href="/guides/incheon-airport-to-seoul/">Incheon Airport to Seoul</Link>.
      </p>

      <p className="strip">
        <Link href="/guides/where-to-stay-in-seoul/">Where to stay in Seoul</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
        <Link href="/korea-basics/">Korea basics</Link>
      </p>

      <RelatedGuides href="/guides/getting-around-seoul/" />

      <p className="meta">
        Fares and pass options change; the figures here are approximate as of September 2026.
      </p>
    </div>
  );
}
