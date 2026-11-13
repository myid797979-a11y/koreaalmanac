import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, FestivalRow, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Lotus Lantern Festival 2027 in Seoul — Buddha’s Birthday on 13 May, the lantern parade and where to watch',
  description: 'Buddha’s Birthday 2027 is Thursday 13 May. How Seoul’s Lotus Lantern Festival (Yeondeunghoe) works: the night parade from Dongdaemun to Jogyesa, the street fair, temple lantern displays, free temple lunches on the day, and when the 2027 dates are announced.',
};

export default function LotusLantern2027() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Lotus Lantern Festival 2027', path: '/guides/lotus-lantern-festival-2027/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/lotus-lantern-festival-2027/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Lotus Lantern Festival 2027
      </div>

      <h1>Lotus Lantern Festival 2027: Buddha’s Birthday in Seoul</h1>
      <p className="sub">
        <strong>Buddha’s Birthday falls on Thursday 13 May 2027</strong>, a public holiday — the
        eighth day of the fourth lunar month. In the weeks before, Seoul’s temples and streets fill
        with paper lanterns, and one weekend the city closes Jongno, its main street, for{' '}
        <strong>Yeondeunghoe</strong>, the Lotus Lantern Festival: a night parade of some hundred
        thousand handmade lanterns that has been held in some form for over a thousand years and is
        on UNESCO’s list of intangible heritage. It is free, and it is one of the best nights of
        the year to be in Seoul.
      </p>

      <GuideHero slugs={[
        'jogyesa-temple-264352',
        'heunginjimun-gate-dongdaemun-gate-264315',
        'cheonggyecheon-stream-897540',
      ]} />

      <div className="callout callout-warn">
        <strong>2027 festival dates: not announced yet.</strong>
        <p>
          The festival weekend is set by the organisers, the Yeondeunghoe Preservation Committee,
          and announced in the spring. It is not tied to a fixed number of days before Buddha’s
          Birthday — in the last three years the parade came 4, 9 and 8 days before it (table
          below). For 2027 that points to <strong>one of the first two weekends of May</strong>, but
          that is our reading of the pattern, not a date. We will add the programme here when it is
          published.
        </p>
      </div>

      <h2 className="sect">Recent years</h2>
      <table className="facts">
        <tbody>
          <tr><th>2024</th><td>Parade Saturday 11 May · Buddha’s Birthday Wednesday 15 May</td></tr>
          <tr><th>2025</th><td>Parade Saturday 26 April · Buddha’s Birthday Monday 5 May</td></tr>
          <tr><th>2026</th><td>Parade Saturday 16 May · Buddha’s Birthday Sunday 24 May</td></tr>
          <tr><th>2027</th><td>Parade not yet announced · Buddha’s Birthday Thursday 13 May</td></tr>
        </tbody>
      </table>

      <h2 className="sect">How the weekend usually runs</h2>
      <p>
        The programme changes a little each year, but the shape has been the same for a long time.
      </p>
      <table className="facts">
        <tbody>
          <tr>
            <th>Before the weekend</th>
            <td>
              A lantern-lighting ceremony in Gwanghwamun Square starts the season, and traditional
              lantern exhibitions open at <strong>Jogyesa</strong>, in the centre of Seoul, and{' '}
              <strong>Bongeunsa</strong>, across from COEX in Gangnam, with a lantern display along
              the <strong>Cheonggyecheon</strong> stream. Jogyesa’s courtyard is roofed with
              thousands of lanterns through to Buddha’s Birthday; go after dark.
            </td>
          </tr>
          <tr>
            <th>Saturday afternoon</th>
            <td>
              A rally of the participating temples and groups at the stadium of Dongguk University
              (near Dongdaemun History &amp; Culture Park), with dances and music before they set
              off.
            </td>
          </tr>
          <tr>
            <th>Saturday 19:00 — the parade</th>
            <td>
              The lantern parade leaves <strong>Heunginjimun (Dongdaemun Gate)</strong> at about
              19:00 and walks west along Jongno to <strong>Jogyesa</strong>, finishing around
              21:30. Lanterns shaped like lotuses, dragons, elephants and tigers, many carried by
              monks, temple groups and Buddhist associations from other countries. In 2026 the
              organisers counted about 50,000 people walking and 100,000 lanterns.
            </td>
          </tr>
          <tr>
            <th>Sunday daytime</th>
            <td>
              A street fair on Ujeongguk-ro outside Jogyesa: lantern-making, temple food, Buddhist
              crafts, booths from Korean and foreign temples, and plenty in English. In 2026 it ran
              11:00–19:00.
            </td>
          </tr>
          <tr>
            <th>Sunday evening</th>
            <td>
              A closing party at the Jonggak junction where performers and the crowd dance together
              under the lanterns — informal and fun to join.
            </td>
          </tr>
        </tbody>
      </table>
      <FestivalRow slugs={['yeon-deung-hoe-972387']} />

      <h2 className="sect">Where to watch the parade</h2>
      <p>
        The whole route is lined on both sides, so anywhere along Jongno works; the stretch between
        Jongno 3-ga and Jonggak is the most crowded. Arrive by 18:00 for a kerbside spot, and
        bring something to sit on. Dongdaemun end is calmer early on and lets you see the parade
        set off; the Jogyesa end is where it finishes, and the most crowded. In recent years the
        organisers have also run a programme for foreign visitors to make a lantern and walk in the
        parade, booked in advance — watch the Yeondeunghoe site from March.
      </p>
      <p>
        Roads close from early afternoon: in 2026 Jongno was shut to traffic from 13:00 on the
        Saturday until 03:00 on Sunday, and buses were diverted. Use the subway — Dongdaemun,
        Jongno 3-ga, Jonggak and Anguk stations are all on the route.
      </p>
      <PlaceRow slugs={['jogyesa-temple-264352', 'heunginjimun-gate-dongdaemun-gate-264315']} />

      <h2 className="sect">On Buddha’s Birthday itself</h2>
      <p>
        The day is quieter and more religious than the parade. Temples hold a ceremony for the
        Buddha’s birth in the morning, and people queue to pour water over a small statue of the
        infant Buddha — visitors are welcome to join. Many temples serve a simple free lunch to
        anyone who comes, often bibimbap, from late morning while it lasts. Jogyesa and Bongeunsa
        are the easy ones in Seoul; in the mountains, a temple such as{' '}
        <Link href="/guides/templestay-korea/">one of the templestay temples</Link> is hung with
        lanterns down the whole approach. It is a public holiday, but in 2027 a Thursday, so
        palaces, museums and shops are open as usual.
      </p>

      <h2 className="sect">Outside Seoul</h2>
      <p>
        Most cities hold their own lantern events in the same weeks. The biggest is in Busan, where
        lanterns are hung around Samgwangsa temple and along the city’s main streets for most of
        May (1–17 May in 2026), with its own parade.
      </p>
      <FestivalRow slugs={['busan-lotus-lantern-festival-1553601']} />

      <BookBox
        offers={GUIDE_OFFERS.templestay}
        title="A night at a temple"
        intro="Templestay programmes fill up around Buddha’s Birthday; book a few weeks ahead."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.seollal}
        title="Staying near the parade"
        intro="Jongno, Insadong and Myeongdong hotels are within walking distance of the route."
      />

      <p className="strip">
        <Link href="/guides/korea-in-spring/">Korea in spring</Link>
        <Link href="/guides/templestay-korea/">Templestay in Korea</Link>
        <Link href="/guides/seoul-3-days/">Seoul in 3 days</Link>
        <Link href="/events/festivals/may/">Korea in May</Link>
        <Link href="/events/festivals/seoul/">All Seoul festivals</Link>
      </p>

      <RelatedGuides href="/guides/lotus-lantern-festival-2027/" />

      <p className="meta">
        Buddha’s Birthday 2027 is from the official almanac of the Korea Astronomy and Space Science
        Institute. Past festival dates, times and traffic closures are from Seoul Metropolitan
        Government notices and news reports for 2024–2026; the 2027 programme had not been
        published when this guide was written in November 2026. Photographs: Korea Tourism
        Organization.
      </p>
    </div>
  );
}
