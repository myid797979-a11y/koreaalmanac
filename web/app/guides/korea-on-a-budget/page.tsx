import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import BudgetCalculator from '@/app/components/BudgetCalculator';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Korea on a budget — what things cost in 2026, and where the money actually goes',
  description: 'Korea is cheaper than its reputation if you eat where Koreans eat and ride what Koreans ride. Real 2026 prices for transport, food, beds and sights, three daily budgets, and the handful of passes that pay for themselves.',
};

export default function KoreaOnABudget() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Korea on a budget', path: '/guides/korea-on-a-budget/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/korea-on-a-budget/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Korea on a budget
      </div>

      <h1>Korea on a budget: what things cost, and where the money goes</h1>
      <p className="sub">
        Korea sits in an odd place on the price map: hotels and coffee cost what they cost in
        Europe, while transport, museums, a full lunch and a night in a bathhouse cost what
        they cost in Southeast Asia. The difference between an expensive trip and a cheap one
        is almost entirely about which of those two Koreas you live in. This page gives real
        2026 prices, three daily budgets, and the short list of passes that are actually worth
        buying.
      </p>

      <GuideHero slugs={[
        'gwangjang-market-273761',
        'gyeongbokgung-palace-264337',
        'seoul-namsan-park-264320',
      ]} />

      <div className="callout">
        <strong>Three daily budgets, Seoul, per person</strong>
        <table className="facts" style={{ marginTop: 10 }}>
          <tbody>
            <tr><th>₩60,000 · about US$45</th><td>Hostel dorm, subway and bus, market and gukbap meals, palaces and free museums, convenience-store beer by the river. Entirely doable and not grim.</td></tr>
            <tr><th>₩130,000 · about US$95</th><td>A business hotel or good guesthouse room, two sit-down meals including one barbecue, a paid attraction or a day trip by coach, a café stop, a taxi home once.</td></tr>
            <tr><th>₩250,000 · about US$185</th><td>A four-star hotel, restaurants you chose on purpose, a theme park or a KTX day out, a night in Hongdae or Itaewon. Comfortable without trying.</td></tr>
          </tbody>
        </table>
        <p className="meta" style={{ margin: '8px 0 0' }}>
          Exchange rate assumed at roughly ₩1,350 to the dollar. Busan and the provinces run
          10–20% cheaper on beds and food; Jeju runs dearer on cars and seafood.
        </p>
      </div>

      <h2 className="sect">Work out your own trip</h2>
      <p>Set the length of your trip, how many of you are travelling and your style; add the big-ticket days out. The figures use the daily budgets above.</p>
      <BudgetCalculator />

      <h2 className="sect">Transport: the biggest saving is not taking taxis</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Subway and bus</th>
            <td>
              A Seoul subway ride is about <strong>₩1,550</strong> and a city bus about{' '}
              <strong>₩1,500</strong> with a T-money card, with free transfers between them
              within 30 minutes. A day of moving around the city costs ₩5,000–7,000. The card
              itself is ₩3,000–5,000 from any convenience store and works in every city.
            </td>
          </tr>
          <tr>
            <th>Climate Card</th>
            <td>
              Seoul’s unlimited subway-and-bus pass has short-term versions for visitors —
              roughly <strong>₩5,000 for one day up to ₩20,000 for seven</strong>. It pays off
              from about four rides a day. It does not cover the airport express or trains
              outside Seoul.
            </td>
          </tr>
          <tr>
            <th>From the airport</th>
            <td>
              The all-stop AREX train to Seoul Station is under <strong>₩5,000</strong> and takes
              an hour; the express is about ₩11,000 for 43 minutes; airport buses are
              ₩17,000–18,000 and go to more neighbourhoods; a taxi is ₩70,000 and up. The
              all-stop train is the budget answer unless you have a lot of luggage.
            </td>
          </tr>
          <tr>
            <th>Between cities</th>
            <td>
              Seoul to Busan is about <strong>₩60,000 by KTX</strong> (2 h 40), ₩30,000 by
              express bus (4 h 30), and ₩28,000 on the slow Mugunghwa train (5 h 30). Buses go
              everywhere, leave every 10–30 minutes on the main routes, and rarely need booking
              on a weekday. The <strong>Korail Pass</strong> only pays if you take three or more
              long KTX legs.
            </td>
          </tr>
          <tr>
            <th>Jeju</th>
            <td>
              Flights from Seoul’s Gimpo start around ₩20,000–40,000 one way midweek on the
              budget airlines, less than the KTX to Busan. The cost on the island is the rental
              car; see the <Link href="/guides/jeju-3-days/">Jeju guide</Link> for the licence rule.
            </td>
          </tr>
          <tr>
            <th>Taxis</th>
            <td>
              Cheap by Western standards — about ₩4,800 to start and ₩10,000–15,000 across a
              district — but a 20–40% surcharge applies after 22:00, and a week of them adds up
              faster than anything else on this page.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">Food: the ₩10,000 lunch is still there</h2>
      <p>
        Prices have risen since 2022, but the structure of Korean eating still favours the
        visitor: a bowl of <em>gukbap</em> (rice in soup) or a set lunch with side dishes runs{' '}
        <strong>₩9,000–12,000</strong>, a roll of kimbap ₩3,500–5,000, convenience-store
        kimbap and triangle rice balls ₩1,500–2,500, and everything comes with free water and
        refills of the side dishes. There is no tipping and no service charge.
      </p>
      <table className="facts">
        <tbody>
          <tr><th>Markets</th><td>Gwangjang, Tongin, Namdaemun in Seoul; Gukje and Bupyeong in Busan. Bindaetteok, tteokbokki, mung-bean pancakes and noodles at ₩4,000–8,000 a plate, and the atmosphere is the attraction.</td></tr>
          <tr><th>Barbecue</th><td>The one meal that is not cheap: ₩15,000–20,000 per portion of pork belly and you order two, so ₩40,000–50,000 for two people with drinks. Worth it once; ruinous nightly.</td></tr>
          <tr><th>Coffee</th><td>₩4,500–6,000 at the big chains and the pretty cafés; ₩1,500–2,500 at the budget chains (Mega Coffee, Compose, Paik’s) on every corner, and the coffee is fine. This is the single easiest ₩20,000-a-week saving.</td></tr>
          <tr><th>Drinks</th><td>Soju or beer ₩5,000–7,000 in a restaurant, ₩1,800–3,000 in a convenience store, and the plastic tables outside the store are a legitimate Korean bar.</td></tr>
          <tr><th>Breakfast</th><td>Hotels charge ₩20,000–40,000 for it; the bakery chain or the convenience store charges ₩5,000. Skip the hotel breakfast.</td></tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'gwangjang-market-273761',
        'euljiro-nogari-alley-3013976',
        'jeonju-hanok-village-slow-city-264285',
      ]} />

      <h2 className="sect">Beds: where the price range is widest</h2>
      <table className="facts">
        <tbody>
          <tr><th>Hostel dorm</th><td>₩25,000–40,000 in Hongdae, Myeongdong or Busan Station; private rooms from ₩60,000.</td></tr>
          <tr><th>Guesthouse or business hotel</th><td>₩60,000–120,000 for a clean double with a bathroom. The chains near big stations are reliable and unromantic.</td></tr>
          <tr><th>Motels</th><td>Korea’s “love motels” are, in practice, cheap hotels: ₩50,000–80,000, large rooms, often the best value in a provincial city. Book on the same sites as hotels.</td></tr>
          <tr><th>Jjimjilbang</th><td>A bathhouse with sleeping halls, ₩15,000–25,000 for the night, a mat and a communal room. Fine for one night after a late one; not a base.</td></tr>
          <tr><th>Templestay</th><td>₩50,000–100,000 a night including meals and the programme. Not cheap per se, but it replaces dinner, breakfast and a day’s sightseeing.</td></tr>
          <tr><th>Hanok stays</th><td>₩80,000–200,000. Jeonju and Bukchon are the classic places; Gyeongju’s are quieter and cheaper.</td></tr>
        </tbody>
      </table>
      <p>
        Prices double for the cherry-blossom weeks in early April, the autumn-foliage weekends
        in October, and around the holidays. Seoul midweek in January is the cheapest the
        country gets.
      </p>

      <h2 className="sect">Sights: most of the best things are free or nearly</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Palaces</th>
            <td>
              Gyeongbokgung and Changdeokgung <strong>₩3,000</strong> each, Deoksugung and
              Changgyeonggung ₩1,000, Jongmyo ₩1,000. The combined ticket for all of them is
              ₩10,000 and lasts three months. Entry is <strong>free in hanbok</strong> (rental
              ₩15,000–30,000 for a few hours, which is its own outing) and free for everyone on
              the last Wednesday of the month.
            </td>
          </tr>
          <tr>
            <th>Museums</th>
            <td>
              The National Museum of Korea, the National Folk Museum and the War Memorial are{' '}
              <strong>free</strong>; most national and municipal museums are free or ₩2,000–5,000.
              The private art museums charge ₩15,000–25,000 for their big shows.
            </td>
          </tr>
          <tr>
            <th>Mountains and rivers</th>
            <td>
              Every national park in the country is free to enter, including Bukhansan inside
              Seoul, and the Han River parks are free all night. The whole temple-admission
              system was abolished in 2023 — see the{' '}
              <Link href="/guides/gyeongju-2-days/">Gyeongju guide</Link> for what that did to a
              city that used to live on tickets.
            </td>
          </tr>
          <tr>
            <th>Festivals</th>
            <td>
              Almost every festival on this site is free to enter. Fireworks, lanterns, cherry
              blossom, ice fishing (a small fee), the palace night openings (a few thousand
              won) — the events calendar is the cheapest itinerary you can build.
            </td>
          </tr>
          <tr>
            <th>The expensive ones</th>
            <td>
              Theme parks (₩60,000–70,000 gate price, less online), observation decks
              (₩25,000–30,000), the aquariums, DMZ tours (₩50,000–90,000). These are where a
              day’s budget goes, so pick one, not three.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'gyeongbokgung-palace-264337',
        'bukchon-hanok-village-561382',
        'yeouido-hangang-park-1064767',
      ]} />

      <h2 className="sect">Passes: the honest verdicts</h2>
      <ol className="steps">
        <li>
          <strong>T-money card — buy it.</strong> ₩3,000–5,000, top up in cash at any
          convenience store, works on every bus, subway and most taxis nationwide.
        </li>
        <li>
          <strong>Climate Card (Seoul) — buy it if you move a lot.</strong> Four or more rides a
          day for several days, and it wins. A two-day visit spent walking, it does not.
        </li>
        <li>
          <strong>Discover Seoul Pass and the attraction bundles — usually not.</strong> They pay
          only if you do two or three paid attractions a day, which is a more expensive day than
          most people want in Seoul. Do the maths against the gate prices above.
        </li>
        <li>
          <strong>Korail Pass — only for a real rail itinerary.</strong> Seoul to Busan and back
          alone is cheaper on ordinary tickets; Seoul–Gyeongju–Busan–Jeonju–Seoul is where the
          pass starts to win.
        </li>
        <li>
          <strong>An eSIM before you land — yes.</strong> A week of unlimited data is
          ₩10,000–20,000 bought online and several times that at the airport counters.
        </li>
      </ol>

      <h2 className="sect">Money itself</h2>
      <p>
        Foreign cards work almost everywhere, including market stalls and taxis, so carry only
        a little cash — for T-money top-ups and the occasional old restaurant. ATMs marked
        “Global” take foreign cards; the ones in convenience stores charge a few thousand won
        a withdrawal. Shops refund the 10% VAT on purchases over ₩15,000 on the spot when you
        show a passport, which makes pharmacy and cosmetics shopping cheaper than the ticket
        price. And again: there is no tipping anywhere, and nobody is expecting it.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.arrival}
        title="The three things worth buying before the flight"
        intro="Each is cheaper online than at the airport, and the eSIM saves the counter queue on arrival."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.budget}
        title="Cheap beds, compared"
        intro="Filter by price and you will find the motels and business hotels this page is talking about."
      />

      <p className="strip">
        <Link href="/guides/korean-food-guide/">Eating in Korea</Link>
        <Link href="/korea-basics/">Korea basics</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/seoul-nightlife/">Seoul after dark</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <RelatedGuides href="/guides/korea-on-a-budget/" />

      <p className="meta">
        Prices are 2026 figures rounded to typical ranges: Seoul transit fares as set in 2025,
        palace admissions as published by the Royal Palaces and Tombs Centre, train and bus
        fares as published by Korail and the express-bus operators. Everything else is what
        things cost in the shops and restaurants in September 2026, and will drift.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
