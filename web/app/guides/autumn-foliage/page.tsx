import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Korea Autumn Foliage 2026 — when and where, region by region',
  description: 'Peak dates for 2026 run late: Seoraksan Oct 16–25, the centre Oct 31–Nov 5, Seoul and the south to mid-November. Where to go, and when to arrive.',
};

export default function AutumnFoliage() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Autumn Foliage 2026', path: '/guides/autumn-foliage/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/autumn-foliage/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Autumn Foliage 2026
      </div>

      <h1>Korea&apos;s autumn colour in 2026, and why &lsquo;late October&rsquo; is the wrong answer</h1>
      <p className="sub">
        Korean autumn runs on a schedule you can actually plan around: the colour front lands on
        the northeast mountains first and moves south at roughly 20–25 km a day, reaching Seoul
        and the southern parks weeks later. <strong>2026 is running late</strong> — a warm
        September and October pushed every window back, so the advice you will read on most
        sites is out by a week or more.
      </p>

      <GuideHero slugs={[
        'seoraksan-ulsanbawi-rock-264169',
        'nami-island-264244',
        'the-garden-of-morning-calm-264212',
      ]} />

      <div className="callout callout-warn">
        <strong>Two words that decide your trip.</strong>
        <ul>
          <li>
            <strong>First foliage</strong> (<em>cheot danpung</em>) is declared when about{' '}
            <strong>20%</strong> of a mountain&apos;s canopy has turned. It looks patchy in photos.
          </li>
          <li>
            <strong>Peak</strong> (<em>danpung jeoljeong</em>) is about <strong>80%</strong>, and
            lands roughly <strong>two weeks after</strong> first foliage. This is the one to book
            around.
          </li>
        </ul>
        <p className="meta" style={{ margin: '8px 0 0' }}>
          Forecasts are reissued through the season. Treat the dates below as a planning window,
          not a promise — a cold snap pulls everything forward by days.
        </p>
      </div>

      <h2 className="sect">The 2026 window, north to south</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Seoraksan · Odaesan</th>
            <td>
              First colour around <strong>27–30 September</strong>, peak{' '}
              <strong>16–25 October</strong>. The northeast goes first every year, which is why
              Seoraksan is the one place worth a dedicated trip rather than a detour.
            </td>
          </tr>
          <tr>
            <th>The centre</th>
            <td>
              Peak <strong>31 October – 5 November</strong>. Nami Island, the Garden of Morning
              Calm and the Gyeonggi mountains sit in this band.
            </td>
          </tr>
          <tr>
            <th>Seoul</th>
            <td>
              Peak <strong>5–15 November</strong>. City trees run later than the mountains — the
              ginkgo avenues and palace grounds are usually at their best when Seoraksan is
              already bare.
            </td>
          </tr>
          <tr>
            <th>Jirisan · the south</th>
            <td>
              Peak <strong>5–13 November</strong>, with Naejangsan&apos;s maples at their
              strongest across the <strong>first two weekends of November</strong>.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        The practical consequence: <strong>a single trip cannot catch both ends.</strong> If you
        have one week, mid-to-late October gets you the mountains, and the second week of
        November gets you Seoul and the southern parks. Pick one.
      </p>

      <h2 className="sect">Seoraksan — the one worth the journey</h2>
      <p>
        Granite spires with colour running up the gullies, about 2.5 hours from Seoul by express
        bus to Sokcho. <Link href="/place/seoraksan-ulsanbawi-rock-264169/">Ulsanbawi Rock</Link>{' '}
        is the classic hard walk; <Link href="/place/seoraksan-gwongeumseong-fortress-264248/">Gwongeumseong</Link>{' '}
        is the cable-car ridge for everyone else.
      </p>
      <div className="callout">
        <strong>The cable car is the bottleneck, and you cannot book it.</strong> Around{' '}
        ₩16,000 return, no advance sales, no one-way ticket. On peak autumn weekends the queue
        runs well over an hour. The only reliable fix is to be at the window near opening — the
        06:00 first bus from Seoul Express Bus Terminal gets you there in time.{' '}
        <strong>The Saturdays of 24 and 31 October and 7 November</strong> are the worst days of
        the year; a weekday in the same window is a different park.
      </div>
      <PlaceRow slugs={[
        'seoraksan-ulsanbawi-rock-264169',
        'seoraksan-osaek-jujeongol-valley-658326',
        'seoraksan-heullimgol-valley-3095205',
      ]} />

      <h2 className="sect">The centre — day trips from Seoul</h2>
      <p>
        <Link href="/place/nami-island-264244/">Nami Island</Link> is the famous one, and its
        metasequoia avenue is genuinely worth it — but it is also the most crowded place on this
        page. Admission already includes the return ferry, so there is nothing to buy on the way
        back. Tour groups land between 09:00 and 10:00; the first ferry beats them, and the far
        end of the tree avenue is quiet even when the entrance is not. Eat at the{' '}
        <em>dakgalbi</em> and <em>makguksu</em> places clustered around the mainland ferry
        terminal rather than on the island.
      </p>
      <p>
        <Link href="/place/the-garden-of-morning-calm-264212/">The Garden of Morning Calm</Link>{' '}
        pairs with Nami on the same route and stays open after dark in autumn for its lighting
        season, which is a different photograph entirely.
      </p>
      <PlaceRow slugs={[
        'nami-island-264244',
        'the-garden-of-morning-calm-264212',
        'hwadam-botanic-garden-2525539',
      ]} />

      <h2 className="sect">Seoul, in the second week of November</h2>
      <p>
        You do not need to leave the city. The palace grounds are the easiest colour in Korea to
        reach — <Link href="/place/changdeokgung-palace-complex-unesco-world-heritage-site-264348/">Changdeokgung</Link>{' '}
        and its Huwon garden above all, since the garden was laid out to follow the hillside
        rather than flatten it. <Link href="/place/deoksugung-palace-264316/">Deoksugung</Link>{' '}
        has the stone-wall road beside it, and{' '}
        <Link href="/place/seoul-forest-789696/">Seoul Forest</Link> is the large open option.
      </p>
      <p className="meta">
        Palace closing days still apply in autumn — Gyeongbokgung shuts Tuesdays, Changdeokgung
        and Deoksugung Mondays. The <Link href="/guides/seoul-3-days/">Seoul 3-day guide</Link>{' '}
        plans around them.
      </p>
      <PlaceRow slugs={[
        'changdeokgung-palace-complex-unesco-world-heritage-site-264348',
        'deoksugung-palace-264316',
        'seoul-forest-789696',
      ]} />

      <h2 className="sect">The south — Naejangsan and the temples</h2>
      <p>
        Naejangsan is the maple park, and the approach road under the trees is as much of the
        point as the ridge. The first two weekends of November are genuinely crowded — full car
        parks, trail queues, long cable-car waits — so come on a weekday, arrive early, and plan
        to walk at least one direction rather than queue twice.
      </p>
      <p>
        Further east, <Link href="/place/hapcheon-haeinsa-temple-264238/">Haeinsa</Link> on
        Gayasan holds the Tripitaka Koreana, and{' '}
        <Link href="/place/gyeongju-bulguksa-temple-unesco-world-heritage-264261/">Bulguksa</Link>{' '}
        in Gyeongju is at its best with colour behind the stonework. Both are UNESCO sites that
        happen to sit in the November band.
      </p>
      <PlaceRow slugs={[
        'naejangsan-maple-ecology-park-3468443',
        'hapcheon-haeinsa-temple-264238',
        'gyeongju-bulguksa-temple-unesco-world-heritage-264261',
      ]} />

      <h2 className="sect">Going in autumn anyway</h2>
      <p>
        Autumn is the densest festival season in the Korean calendar, and most of it has nothing
        to do with leaves. Put your dates into the{' '}
        <Link href="/plan/">Trip Planner</Link> to see what falls inside your trip, or browse the{' '}
        <Link href="/events/festivals/october/">October</Link> and{' '}
        <Link href="/events/festivals/november/">November</Link> pages.
      </p>
      <p>
        One thing to book early: <strong>accommodation near Seoraksan and Naejangsan sells out</strong>{' '}
        for the peak weekends months ahead, and it is the single most common way a foliage trip
        goes wrong. If you are reading this in September, that is the thing to do today.
      </p>
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.foliage}
        title="Book the mountain nights first"
        intro="Sokcho for Seoraksan, Gangneung for the coast road; Seoul for the second week of November."
      />
      <BookBox
        offers={GUIDE_OFFERS.foliage}
        title="If the hotels are gone"
        intro="A day-tour coach from Seoul gets you to Seoraksan and back without the room; the rail pass covers the rest of the route."
      />

      <p className="strip">
        <Link href="/plan/">Trip Planner</Link>
        <Link href="/places/hiking/">Hiking &amp; mountains</Link>
        <Link href="/places/parks-nature/">Parks &amp; nature</Link>
        <Link href="/korea-basics/">Korea basics</Link>
      </p>

      <p className="meta">
        Forecast windows reflect the 2026 season outlook as published in September 2026, which
        runs later than the historical average because of a warm September and October. Foliage
        forecasts are revised through the season — check the Korea Forest Service or Korea
        Meteorological Administration before committing to a date. Photographs: Korea Tourism
        Organization.
      </p>
    </div>
  );
}
