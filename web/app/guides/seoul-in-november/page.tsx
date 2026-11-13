import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';
import { upcomingConcerts, concertDateRange } from '@/lib/concerts';
import { festivals, dateRange, today } from '@/lib/data';

export const metadata = {
  title: 'Seoul in November 2026: weather, the last autumn colour, K-pop award shows and what’s on',
  description: 'What Seoul is like in November 2026: around 12°C by day, ginkgo streets turning gold in the first half, the KGMA and Melon Music Awards, kimjang season, the first Christmas lights, what to pack, and the concerts and festivals on through the month.',
};

const FROM = '20261101', TO = '20261130';
const days = (a: string, b: string) =>
  (Date.UTC(+b.slice(0, 4), +b.slice(4, 6) - 1, +b.slice(6, 8)) - Date.UTC(+a.slice(0, 4), +a.slice(4, 6) - 1, +a.slice(6, 8))) / 86400000;

export default function SeoulInNovember() {
  const t = today();
  // 이 목록은 데이터에서 매일 다시 만든다 — 11월 공연·축제가 등록되는 대로 늘어난다
  const shows = upcomingConcerts(t).filter(c => c.region === 'Seoul' && c.start <= TO && c.end >= FROM);
  const fests = festivals
    .filter(f => f.region === 'Seoul' && f.start && f.start <= TO && (f.end ?? f.start) >= FROM && days(f.start, f.end ?? f.start) <= 60)
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''));
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Seoul in November', path: '/guides/seoul-in-november/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/seoul-in-november/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Seoul in November
      </div>

      <h1>Seoul in November 2026</h1>
      <p className="sub">
        Days around 12°C, no public holidays and lower hotel prices than October. In 2026 the
        autumn colour reached Seoul late (first colour 27 October), so the ginkgo streets are at
        their best in mid-November; the Melon Music Awards fill the Gocheok Sky Dome on 14–15
        November; and from late in the month the Christmas lights go up ahead of the Seoul
        Lantern Festival, which opens on 11 December.
      </p>

      <GuideHero slugs={[
        'deoksugung-stone-wall-path-1748351',
        'seoul-forest-789696',
        'naksan-park-264478',
      ]} />

      <div className="callout">
        <strong>November at a glance</strong>
        <ul>
          <li><strong>Weather:</strong> around 12°C by day and 2°C at night, dry, with the first frosts and sometimes the first snow flurries late in the month.</li>
          <li><strong>Autumn colour:</strong> in most years Seoul’s ginkgo streets and palace gardens peak around the end of October and the first week of November. 2026 ran about two weeks late — first colour on 27 October — so mid-November is the window this year, with more brown leaves than usual after a hot, dry September.</li>
          <li><strong>No public holidays</strong>, so trains and hotels are easier to book than in October.</li>
        </ul>
      </div>

      <h2 className="sect">What makes November worth it</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>The last of the leaves</th>
            <td>
              The ginkgo avenues of Deoksugung’s stone-wall path, Samcheong-dong and the Seoul
              Forest usually turn gold in the first week; in 2026 the colour came late, so the
              middle of the month is the time. See the{' '}
              <Link href="/guides/autumn-foliage/">autumn foliage guide</Link> and{' '}
              <Link href="/guides/seoul-palaces/">the palaces</Link>.
            </td>
          </tr>
          <tr>
            <th>K-pop award season</th>
            <td>
              The <Link href="/concert/kgma-2026/">KGMA</Link> took place on 7–8 November; the{' '}
              <Link href="/concert/melon-music-awards-2026/">Melon Music Awards</Link> follow on
              14–15 November, also at the Gocheok Sky Dome. See{' '}
              <Link href="/guides/kpop-award-shows/">K-pop award shows</Link>.
            </td>
          </tr>
          <tr>
            <th>Busan’s fireworks</th>
            <td>
              The 2026 Busan Fireworks Festival over Gwangalli Beach took place on 7 November; it
              returns each autumn. See the <Link href="/guides/busan-fireworks-2026/">Busan Fireworks guide</Link>.
            </td>
          </tr>
          <tr>
            <th>Kimjang season</th>
            <td>
              Late November is when Korean families make the winter’s kimchi together; markets fill
              with cabbages, and several places run kimchi-making classes for visitors.
            </td>
          </tr>
          <tr>
            <th>First lights</th>
            <td>
              Department-store facades in Myeongdong light up from mid-November, ahead of the
              December festivals. See <Link href="/guides/christmas-new-year-seoul/">Christmas and New Year</Link>.
            </td>
          </tr>
        </tbody>
      </table>

      {shows.length > 0 && (
        <>
          <h2 className="sect">Concerts in Seoul in November</h2>
          <ul className="agenda">
            {shows.map(c => (
              <li key={c.id}>
                <span className="ad">{concertDateRange(c)}</span>
                <Link href={'/concert/' + c.id + '/'}>
                  {c.artist === 'Various artists' || c.title.toLowerCase().includes(c.artist.toLowerCase()) ? c.title : c.artist + ': ' + c.title}
                </Link>
                <span className="meta"> · {c.venue}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {fests.length > 0 && (
        <>
          <h2 className="sect">Festivals and events</h2>
          <ul className="agenda">
            {fests.map(f => (
              <li key={f.id}>
                <span className="ad">{dateRange(f)}</span>
                <Link href={'/festival/' + f.slug + '/'}>{f.title}</Link>
              </li>
            ))}
          </ul>
          <p className="meta">More November festivals are added as organisers register them. See <Link href="/events/festivals/seoul/november/">all Seoul festivals in November</Link>.</p>
        </>
      )}

      <h2 className="sect">What to pack</h2>
      <ul className="tips">
        <li>A warm jacket for the evenings and layers for the day; it can be 15°C at lunch and near freezing at night.</li>
        <li>Comfortable shoes for the palaces and the hills of Bukchon.</li>
        <li>Lip balm and hand cream: the air turns very dry.</li>
      </ul>
      <PlaceRow slugs={[
        'ginkgo-tree-at-the-fortress-well-site-3537107',
        'haneul-park-2944084',
        'gwanaksan-mountain-1562674',
      ]} />

      <BookBox
        offers={GUIDE_OFFERS.seoul3}
        title="Book ahead"
        intro="The attraction pass and a hanbok rental for the palaces in their autumn colour."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.seoul}
        title="Where to stay"
        intro="Hotels near Gocheok and Olympic Park fill on the award-show weekends; elsewhere November is one of the cheaper months."
      />

      <p className="strip">
        <Link href="/events/festivals/november/">Korea in November</Link>
        <Link href="/seoul-this-weekend/">Seoul this weekend</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/where-to-stay-in-seoul/">Where to stay in Seoul</Link>
      </p>

      <RelatedGuides href="/guides/seoul-in-november/" />

      <p className="meta">
        Weather figures are Seoul averages. Concert and festival lists update daily from our listings.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
