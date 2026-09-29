import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import { GuideHero, FestivalRow, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Jinju Lantern Festival 2026 — 3 to 18 October: how to visit, from Busan or Seoul',
  description: 'Thousands of lanterns on the Namgang River below Jinjuseong Fortress, 3–18 October 2026. When to go, what is free and what is not, floating a wish lantern, the day trip from Busan, and the hotel problem.',
};

export default function JinjuLantern2026() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Jinju Lantern Festival 2026', path: '/guides/jinju-lantern-festival-2026/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/jinju-lantern-festival-2026/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Jinju Lantern Festival 2026
      </div>

      <h1>Jinju Namgang Lantern Festival 2026: how to visit</h1>
      <p className="sub">
        <strong>3 to 18 October 2026</strong>, on the Namgang River below Jinjuseong Fortress
        in South Gyeongsang. After dark the river fills with thousands of lanterns — giant figures,
        animals, boats, whole scenes built on the water — and the fortress walls above are lit to
        match. It is one of Korea’s designated flagship festivals and, for most of its sixteen
        days, a manageable one: busy at weekends, genuinely pleasant midweek. It is also three and
        a half hours from Seoul and an hour and a half from Busan, which is the thing to plan.
      </p>

      <GuideHero slugs={[
        'jinjuseong-fortress-264596',
        'jinju-jungang-market-3510943',
      ]} />

      <div className="callout">
        <strong>Why lanterns, and why here</strong>
        <p>
          In 1592, during the Japanese invasions, Jinjuseong held out against a siege in one of
          the war’s decisive battles. The defenders floated lanterns on the river to stop the
          attackers crossing it and to send word to families outside. The city has kept the
          practice for four hundred years; the modern festival grew out of it in the 2000s.
          The fortress itself is worth the visit in daylight — the battle is told in the museum
          inside, and Chokseongnu pavilion on the wall above the river is the view in every
          photograph.
        </p>
      </div>

      <h2 className="sect">When to go</h2>
      <table className="facts">
        <tbody>
          <tr><th>Time of day</th><td>The lanterns light at sunset, around 18:00 in October, and the river is at its best from then until about 22:00. Arrive mid-afternoon, see the fortress in daylight, and stay for the lights.</td></tr>
          <tr><th>Weekday or weekend</th><td>Weekdays, by a distance. The two weekends and the Hangeul Day holiday (Friday 9 October) bring the crowds; Monday to Thursday you can walk the riverbank freely.</td></tr>
          <tr><th>Opening night</th><td>Saturday 3 October has the lighting ceremony and fireworks over the river, and the largest crowd of the festival. Go if you want the event; avoid it if you want the lanterns.</td></tr>
          <tr><th>Weather</th><td>Early to mid October in Jinju runs around 22 °C by day and 12 °C at night. Rain can cancel the floating events for an evening; the fixed lanterns stay lit.</td></tr>
        </tbody>
      </table>

      <h2 className="sect">What is free and what is not</h2>
      <p>
        Walking the riverbanks and seeing the lanterns is <strong>free</strong>. What costs money
        is small and optional: in recent years a modest charge to walk the floating bridges across
        the river and through the lantern tunnel, and a few thousand won to buy a{' '}
        <strong>wish lantern</strong>, write on it, and have it hung in the lantern tunnel or
        floated. Buy the wish lantern early in the evening — the lines lengthen after dark. The
        fortress charges its usual small admission during the day, and at night the Guardians of
        Jinju mission tour runs inside the walls, partly in English.
      </p>

      <h2 className="sect">Getting there</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>From Busan</th>
            <td>
              Intercity buses from Busan Seobu (Sasang) terminal to Jinju run every 15–30 minutes,
              about <strong>1 hour 30</strong>. This is the easiest way to do the festival: a day
              trip that leaves after lunch and returns on a late bus, or a night in Jinju.
            </td>
          </tr>
          <tr>
            <th>From Seoul</th>
            <td>
              KTX from Seoul Station to Jinju, about <strong>3 hours 30</strong>, a handful of
              trains a day; or express buses from Seoul Nambu terminal, about 3 hours 30 as well.
              Doable as a very long day trip; much better with a night.
            </td>
          </tr>
          <tr>
            <th>In Jinju</th>
            <td>
              Jinju Station is south of the river, about 15 minutes by taxi or bus to the fortress.
              The intercity and express bus terminals are closer. Once you are at the river,
              everything is walkable.
            </td>
          </tr>
          <tr>
            <th>By tour</th>
            <td>
              Day tours from Busan (and some from Seoul) run through the festival and handle the
              transport, which is the simplest option if you are not comfortable with Korean bus
              terminals.
            </td>
          </tr>
        </tbody>
      </table>
      <FestivalRow slugs={['jinju-namgang-yudeung-festival-697197', 'guardians-of-jinju-4113182']} />

      <h2 className="sect">The hotel problem</h2>
      <p>
        Jinju is a mid-sized city with a limited stock of hotels, and the weekends of lantern week
        sell out months ahead. Midweek rooms are usually still findable into September. If Jinju
        is full, <strong>stay in Busan</strong> and come for the evening: the last intercity buses
        back leave around 22:00, which fits a sunset-to-nine visit. Sacheon and Changwon are the
        other nearby fallbacks.
      </p>

      <h2 className="sect">What to eat</h2>
      <p>
        Jinju is famous for <strong>Jinju bibimbap</strong>, served with raw beef tartare
        (<em>yukhoe</em>) on top and a clear broth on the side, and for <em>naengmyeon</em> in a
        seafood-based broth. <strong>Jungang Market</strong> by the river is the place for both,
        and for the festival’s food stalls when the riverbank ones are packed.
      </p>
      <PlaceRow slugs={['jinjuseong-fortress-264596', 'jinju-jungang-market-3510943']} />

      <BookBox
        offers={GUIDE_OFFERS.jinju}
        title="Let someone else do the buses"
        intro="Guided day tours run through festival week; the departure city is chosen at checkout."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.jinju}
        title="Where to stay for lantern week"
        intro="Jinju first if there is anything left; Busan is the reliable fallback."
      />

      <p className="strip">
        <Link href="/guides/busan-2-days/">2 days in Busan</Link>
        <Link href="/guides/busan-fireworks-2026/">Busan Fireworks 2026</Link>
        <Link href="/events/festivals/october/">Korea in October</Link>
        <Link href="/events/festivals/gyeongnam/">All Gyeongnam festivals</Link>
      </p>

      <p className="meta">
        Dates are as registered by the organisers with the Korea Tourism Organization for 2026.
        Charges for the floating bridges and wish lanterns follow recent editions and are set each
        year. Bus and train times are typical and vary by departure. Photographs: Korea Tourism
        Organization.
      </p>
    </div>
  );
}
