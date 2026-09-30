import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, Stop, DayHead, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: '2 Days in Busan — the old town and the coast, split the way the city is',
  description: 'A 2-day Busan itinerary split the way the city is: old town west, beaches 15 km east. With the Sky Capsule and Jagalchi’s Tuesday closures.',
};

export default function BusanTwoDays() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: '2 Days in Busan', path: '/guides/busan-2-days/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/busan-2-days/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › 2 Days in Busan
      </div>

      <h1>2 days in Busan, split the way the city actually is</h1>
      <p className="sub">
        Busan is not a city you cross casually. The old town in the west and the beach districts
        in the east sit <strong>15 km apart</strong>, and trying to mix them wastes an hour on
        the subway each way. So this splits cleanly: one day west, one day east.
      </p>

      <GuideHero slugs={[
        'busan-gamcheon-culture-village-1998211',
        'haeundae-blueline-park-2812440',
        'gwangalli-beach-264250',
      ]} />

      <div className="callout callout-warn">
        <strong>Three things that catch people out.</strong>
        <ul>
          <li>
            <strong>Jagalchi Market closes on Tuesdays</strong> — the 1st and 3rd of each month,
            sometimes the 5th. Not Sundays, which is what most guides say.
          </li>
          <li>
            <strong>The Sky Capsule sells out.</strong> Book ahead, and note the price is{' '}
            <em>per capsule</em>, not per person — ₩50,000 split four ways is ₩12,500 each.
          </li>
          <li>
            <strong>Taejongdae&apos;s Danubi train has been suspended</strong> since July 2026
            after two accidents. A free shuttle bus runs instead — check before you go and be
            ready to walk the 4.3 km loop.
          </li>
        </ul>
      </div>

      <h2 className="sect">Getting there and getting around</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>From Seoul</th>
            <td>
              KTX from <strong>Seoul Station to Busan Station</strong>, about{' '}
              <strong>2h 20m</strong> and around <strong>₩59,800</strong> one way, over a hundred
              departures a day. Book 5–7 days out for Friday evenings, Sunday afternoons and
              holidays. Busan Station is in the old town and on Metro Line 1, so Day 1 below
              starts within walking distance of where you arrive.
            </td>
          </tr>
          <tr>
            <th>Rail pass?</th>
            <td>
              The foreigner-only KORAIL Pass does <strong>not</strong> pay for itself on a simple
              Seoul–Busan return — two tickets come to about ₩120,000 against a pass starting
              higher. It only makes sense across a multi-city route.
            </td>
          </tr>
          <tr>
            <th>Transport card</th>
            <td>
              Your Seoul T-money works in Busan — do not buy a second card. Busan Metro is{' '}
              <strong>₩1,600</strong> for the first 10 km, ₩1,800 beyond (many guides still say
              ₩1,300 — that rose in 2024). A <strong>₩6,000 day pass</strong> breaks even at four
              rides, which Day 2 will exceed. Children under 13 ride free.
            </td>
          </tr>
          <tr>
            <th>Visit Busan Pass</th>
            <td>
              ₩55,000 for 24 hours, ₩85,000 for 48. Worth it only if you are doing two or three
              paid attractions a day — and much of this itinerary (Gamcheon, Jagalchi, Taejongdae,
              Yonggungsa) is free. It starts to pay off if you pair the Beach Train with
              BUSAN X the Sky.
            </td>
          </tr>
        </tbody>
      </table>

      <DayHead
        day="Day 1"
        title="The old town: Gamcheon, the market, the port"
        sub="Everything today is in the west, within about 2 km. Metro Line 1 links it all, and much of it is walkable."
        avoid="1st and 3rd Tuesday (Jagalchi closed)"
      />

      <ol className="g-timeline">
        <Stop
          slug="busan-gamcheon-culture-village-1998211"
          time="09:00"
          title="Gamcheon Culture Village"
        >
          <p>
            Pastel houses stacked up a hillside in terraces — originally a refugee settlement
            from the Korean War, repainted as an art project in 2009. <strong>Free, no gates</strong>;
            the 09:00–18:00 hours you see published are for the information centre and shops.
            Arrive at opening to beat the tour buses. Buy the <strong>₩2,000 stamp map</strong> at
            the information centre — it walks you through the alleys you would otherwise miss.
          </p>
          <p>
            <strong>People live here.</strong> Keep your voice down, stay out of private
            staircases, do not photograph into doorways, and note that drones are prohibited.
          </p>
          <p className="meta">
            Metro Line 1 to Toseong Station, Exit 6, then village bus Saha 1-1 or Seo-gu 2 to
            Gamjeong Elementary School.
          </p>
        </Stop>

        <Stop slug="biff-square-biff-789805" time="12:00" title="BIFF Square and Gukje Market" walk="1.7 km">
          <p>
            BIFF Square is where the Busan International Film Festival began, its pavement set
            with directors&apos; handprints, and it is one of the country&apos;s best street-food
            alleys — try the <em>ssiat hotteok</em>, a seed-stuffed pancake that is a Busan
            speciality.{' '}
            <Link href="/place/gukje-market-food-street-1024670/">Gukje Market</Link> runs
            straight into it: a sprawling traditional market that grew out of postwar trading.
          </p>
        </Stop>

        <Stop slug="jagalchi-market-2382544" time="14:00" title="Jagalchi Market" walk="600 m">
          <p>
            Korea&apos;s largest seafood market, run largely by women — the{' '}
            <em>jagalchi ajumma</em> are a Busan institution. Open 05:00–22:00; pick something
            downstairs and they will cook it for you upstairs.{' '}
            <strong>Closed the 1st and 3rd Tuesday of each month.</strong>
          </p>
        </Stop>

        <Stop slug="bosu-dong-book-street-cultural-center-1973370" time="16:00" title="Bosu-dong Book Street">
          <p>
            An alley of second-hand bookshops that started when refugees sold off their libraries
            to survive. Quiet, narrow, and one of the few places in Korea where that period is
            still physically visible rather than commemorated.
          </p>
        </Stop>

        <Stop slug="168-stairs-168-2401023" time="Late afternoon" title="168 Stairs, or Huinnyeoul" walk="2.1 km">
          <p>
            The 168 Stairs climb the hillside above the port in a single straight flight — there
            is a monorail if you would rather not. Alternatively cross to{' '}
            <Link href="/place/huinnyeoul-culture-village-2835497/">Huinnyeoul Culture Village</Link>{' '}
            on Yeongdo, a clifftop row of houses above the sea that was the setting for several
            Korean films.
          </p>
        </Stop>
      </ol>

      <div className="callout">
        <strong>Taejongdae, if you have a spare half-day.</strong> A forested headland on Yeongdo
        with sea cliffs and a lighthouse, free to enter, about 20–30 minutes by bus from Nampo
        Station. The <strong>Danubi road train that normally loops the 4.3 km circuit has been
        suspended since July 2026</strong> after two accidents; a free shuttle runs in its place,
        boarding by time slot from the Danubi ticket office. On foot the loop takes 1.5–2 hours.
        Check the current status before committing your afternoon.
      </div>

      <DayHead
        day="Day 2"
        title="The coast: Haeundae, the Sky Capsule, Gwangalli"
        sub="The east side. Beaches, a coastal railway on a disused track, and the bridge that defines the city’s skyline."
      />

      <ol className="g-timeline">
        <Stop slug="haeundae-beach-264155" time="Morning" title="Haeundae Beach">
          <p>
            Korea&apos;s most famous beach, 1.5 km of sand backed by high-rises. Fifteen minutes
            on foot from Haeundae Station (Line 2). Walk east along the sand to Mipo, where the
            next stop starts.
          </p>
        </Stop>

        <Stop
          slug="haeundae-blueline-park-2812440"
          time="Midday"
          title="Blueline Park: Sky Capsule and Beach Train"
        >
          <p>
            A disused coastal railway reborn as two rides. The{' '}
            <strong>Sky Capsule</strong> is a four-seat pod running 2 km between Mipo and
            Cheongsapo at walking pace, about 30 minutes.{' '}
            <strong>Priced per capsule, not per head</strong> — ₩40,000 for two up to ₩50,000 for
            four, one way. <strong>Book ahead;</strong> it sells out.
          </p>
          <p>
            Book <strong>Mipo → Cheongsapo</strong> if you can: that track runs on the seaward
            outer edge with unbroken ocean views (sit on the right). If it is sold out, the
            reverse direction is a real fallback — easier to get, and it faces the sunset.
          </p>
          <p>
            The <strong>Beach Train</strong> continues past Cheongsapo to Songjeong, 4.8 km in
            all. ₩8,000 one ride, or <strong>₩16,000 for the all-station pass</strong>, which is
            the one to buy if you want to hop off at the skywalk and the observatory along the way.
            Ride it to the far end and you are within a short bus ride of{' '}
            <Link href="/place/haedong-yonggungsa-temple-264404/">Haedong Yonggungsa</Link>, the
            cliffside temple below.
          </p>
        </Stop>

        <Stop slug="busan-x-the-sky-2815428" time="Afternoon" title="BUSAN X the Sky">
          <p>
            An observation deck on the 98th to 100th floors of the tallest building in the city,
            back at Haeundae. Worth it for the view down the coast you have just travelled — and
            it is one of the attractions the Visit Busan Pass covers, if you bought one.
          </p>
        </Stop>

        <Stop slug="gwangalli-beach-264250" time="Evening" title="Gwangalli Beach" walk="3.8 km">
          <p>
            The evening beach. Gwangalli faces the{' '}
            <Link href="/place/busan-gwangandaegyo-bridge-1064834/">Gwangan Bridge</Link>, which
            lights up after dark, and the seafront is a solid line of bars and restaurants.
            Drone light shows run over the water on many weekend evenings. This is where Busan
            residents actually go.
          </p>
        </Stop>
      </ol>

      <h2 className="sect">If you have a third day</h2>
      <p>
        The obvious addition is{' '}
        <Link href="/place/haedong-yonggungsa-temple-264404/">Haedong Yonggungsa</Link>, a
        temple built onto the rocks at the water&apos;s edge on the north-east coast — almost every
        Korean temple is inland and up a mountain, which is exactly what makes this one worth
        the trip. It is free, opens around dawn, and sits <strong>4 km past Cheongsapo</strong>,
        so it pairs naturally with the Beach Train if you ride to the end of the line rather
        than turning back.
      </p>
      <p>
        Inland, <Link href="/place/geumjeongsanseong-fortress-264108/">Geumjeongsanseong
        Fortress</Link> is the longest fortress wall in Korea, running along the ridge above the
        city. Beomeosa, a 7th-century mountain temple with a well-known foreigner-friendly
        templestay, sits on the same mountain at the northern end of Metro Line 1 — free, and
        about an hour from the centre. Aim to arrive before 16:00.
      </p>
      <PlaceRow slugs={[
        'haedong-yonggungsa-temple-264404',
        'geumjeongsanseong-fortress-264108',
        'oryukdo-islets-busan-national-geopark-264193',
      ]} />

      <BookBox
        offers={GUIDE_OFFERS.busan}
        title="Book ahead in Busan"
        intro="The Sky Capsule sells out days ahead in good weather; the Visit Busan Pass pays off if you do three or more paid sights in a day."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.busan}
        title="Where to stay"
        intro="Stay on the side you will spend the evenings: Haeundae or Gwangalli for the coast, Nampo or Seomyeon for the old town and the trains."
      />

      <h2 className="sect">Check what is on while you are here</h2>
      <p>
        This autumn the <Link href="/guides/busan-fireworks-2026/">Busan Fireworks Festival</Link>{' '}
        fills Gwangalli Beach on <strong>7 November</strong>, and the{' '}
        <Link href="/guides/jinju-lantern-festival-2026/">Jinju Lantern Festival</Link> is an easy day
        trip until 18 October. Busan also hosts the country&apos;s biggest film festival each autumn
        and a steady run of concerts and exhibitions. Put your dates into
        the <Link href="/plan/">Trip Planner</Link>, or browse{' '}
        <Link href="/regions/busan/">everything in Busan</Link>.
      </p>

      <p className="strip">
        <Link href="/guides/busan-fireworks-2026/">Busan Fireworks 2026</Link>
        <Link href="/regions/busan/">Busan: places &amp; events</Link>
        <Link href="/places/beaches-islands/">Beaches &amp; islands</Link>
        <Link href="/places/markets/">Traditional markets</Link>
        <Link href="/places/neighbourhoods/">Neighbourhoods</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <RelatedGuides href="/guides/busan-2-days/" />

      <p className="meta">
        Fares, hours and closing days checked against Busan Metro, Blueline Park, Visit Busan and
        the Busan Facilities Corporation in September 2026. The Taejongdae Danubi train
        suspension was still in force at the time of writing. Photographs: Korea Tourism
        Organization.
      </p>
    </div>
  );
}
