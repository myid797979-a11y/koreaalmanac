import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import { GuideHero, FestivalRow, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Busan Fireworks Festival 2026 — Saturday 7 November: where to watch, seats, and getting away',
  description: 'Korea’s biggest fireworks show is over Gwangalli Beach on Saturday 7 November 2026. The free viewing spots and when to claim them, whether the paid seats are worth it, the hotel question, and how to leave with a million other people.',
};

export default function BusanFireworks2026() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Busan Fireworks 2026', path: '/guides/busan-fireworks-2026/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/busan-fireworks-2026/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Busan Fireworks 2026
      </div>

      <h1>Busan Fireworks Festival 2026: how to actually see it</h1>
      <p className="sub">
        <strong>Saturday 7 November 2026</strong>, over the water at Gwangalli Beach. It is the
        largest fireworks display in Korea — about an hour of shells fired from barges in front of
        the Gwangan Bridge, with the bridge’s own lights choreographed into the show — and it
        draws a crowd that organisers put near a million. The show itself is the easy part. The
        hard parts are where you stand, where you sleep, and how you leave, and all three are
        decided days or weeks before the first shell goes up.
      </p>

      <GuideHero slugs={[
        'gwangalli-beach-264250',
        'busan-gwangandaegyo-bridge-1064834',
        'hwangnyeongsan-mountain-1918039',
      ]} />

      <div className="callout">
        <strong>The day at a glance</strong>
        <table className="facts" style={{ marginTop: 10 }}>
          <tbody>
            <tr><th>Date</th><td>Saturday 7 November 2026. If the weather forces a postponement, the organisers announce it a day or two before.</td></tr>
            <tr><th>Afternoon</th><td>Stages and side events along the beach from around 13:00. The crowd builds from late morning.</td></tr>
            <tr><th>Main show</th><td>Around 19:00 for roughly an hour, with a short opening programme before it.</td></tr>
            <tr><th>Cost</th><td>Free from the beach and the headlands. Paid seats in fenced zones on the sand are sold in advance.</td></tr>
            <tr><th>Weather</th><td>Early November evenings on the coast run 10–14 °C with wind off the sea. Bring a warm layer and something to sit on.</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="sect">Where to watch, from closest to calmest</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Gwangalli Beach</th>
            <td>
              Front row, loudest, and the most crowded place in Korea that night. The good free
              patches of sand between the paid zones are taken by early afternoon; people arrive
              in the morning with mats and food. Worth it once if you are willing to spend the day.
            </td>
          </tr>
          <tr>
            <th>Millak Waterfront Park</th>
            <td>
              The seawall at the north-east end of the beach, looking straight down the bridge.
              Slightly further from the barges, much easier to reach and to leave, and the raw-fish
              restaurants of Millak are right behind it.
            </td>
          </tr>
          <tr>
            <th>Igidae Coastal Park</th>
            <td>
              The cliffs across the bay to the south-west. You see the whole bridge and the show
              reflected in the water — the angle most of the famous photographs use. Arrive by mid-
              afternoon; the viewpoints are small.
            </td>
          </tr>
          <tr>
            <th>Dongbaekseom &amp; Marine City</th>
            <td>
              From the Haeundae side, looking back at the bridge end-on. Less crowded than the beach,
              with Haeundae’s hotels and restaurants a short walk away, which makes leaving easy.
            </td>
          </tr>
          <tr>
            <th>Hwangnyeongsan</th>
            <td>
              The mountain behind the city, a panoramic view over the whole bay and the city lights.
              A taxi or a steep walk up, and the fireworks look small — but you will have space.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'millak-waterfront-park-1392313',
        'dongbaekseom-island-264239',
        'marine-city-2657019',
      ]} />

      <h2 className="sect">Are the paid seats worth it?</h2>
      <p>
        The organisers sell reserved seats and table seats in fenced zones on the sand, released
        online several weeks before the festival and usually gone quickly. What you buy is not a
        better view than an early free spot — it is <strong>not having to arrive at noon</strong>{' '}
        and a guaranteed place to sit. If your time in Busan is short, that is a fair trade. If
        you have the whole day, the free headlands are as good. Watch for sales to foreign visitors
        opening separately, and ignore anyone reselling seats; resold tickets are not honoured.
      </p>
      <p>
        The other paid option is from the water. <strong>Yacht and cruise packages</strong> sail
        from Suyeong Bay and The Bay 101 and anchor off the beach for the show. They are expensive
        and sell out, but they solve the crowd and the getting-away problem at once.
      </p>

      <h2 className="sect">The hotel question</h2>
      <p>
        Rooms with a view of the bridge sell out months ahead at several times their normal
        price, and the few left in the last weeks are priced accordingly. If you are reading this in
        October, stop looking for Gwangalli and look instead at <strong>Haeundae</strong>{' '}
        (a walk or a short taxi from Dongbaekseom and Marine City), <strong>Seomyeon</strong>{' '}
        (the centre, on Line 2 without changes), or <strong>Busan Station</strong> (the KTX
        terminus, for leaving the next morning). Any of these puts you within reach of a viewing
        spot and gets you home without the Gwangalli crush.
      </p>

      <h2 className="sect">Getting there, and the harder part — leaving</h2>
      <ol className="steps">
        <li>
          <strong>Take the subway in, early.</strong> Line 2 to Gwangan or Geumnyeonsan for the
          beach; Kyungsung University–Pukyong National University for Igidae. Taxis cannot get
          near the beach from the afternoon, and roads around Gwangalli close to cars.
        </li>
        <li>
          <strong>Expect closed exits.</strong> Stations nearest the beach close exits or stop
          trains from stopping when the platforms fill. Know the next station along before you go.
        </li>
        <li>
          <strong>Do not leave with everyone.</strong> The hour after the finale is when the
          streets and stations lock solid. Book a late dinner nearby, or walk twenty minutes
          toward Suyeong or Namcheon and take the subway from there.
        </li>
        <li>
          <strong>Carry cash and a charged phone.</strong> Card terminals and mobile data both
          struggle in a crowd that size, and the phone is how you find your group again.
        </li>
      </ol>

      <FestivalRow slugs={['busan-fireworks-festival-235076']} />

      <BookBox
        offers={GUIDE_OFFERS.busanFireworks}
        title="Watch from the water, or make a weekend of it"
        intro="Cruise and yacht packages for the night are listed from October; the Busan pass covers the rest of the weekend."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.busanFireworks}
        title="Where to stay for the fireworks"
        intro="Haeundae or Seomyeon if Gwangalli is gone — which by October it usually is."
      />

      <p className="strip">
        <Link href="/guides/busan-2-days/">2 days in Busan</Link>
        <Link href="/events/festivals/november/">Korea in November</Link>
        <Link href="/events/festivals/busan/">All Busan festivals</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <p className="meta">
        The 2026 date is as registered by the organisers with the Korea Tourism Organization.
        Programme times, paid-seat sales and station arrangements follow recent editions and are
        confirmed by the organisers and Busan Transportation Corporation in the week before.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
