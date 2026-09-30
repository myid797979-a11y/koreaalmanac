import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Templestay in Korea: what a night in a Buddhist temple is like, and how to book',
  description: 'A Korean templestay explained: day programmes and overnight stays, the 4am dawn service, 108 bows and the monastic meal, what it costs, what to bring, and which temples to choose, from central Seoul to Haeinsa, Woljeongsa and Songgwangsa.',
};

export default function Templestay() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Templestay in Korea', path: '/guides/templestay-korea/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/templestay-korea/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Templestay in Korea
      </div>

      <h1>Templestay in Korea: a night in a Buddhist temple</h1>
      <p className="sub">
        Korea’s mountain temples have taken in overnight guests since the programme opened to the
        public in 2002, and today more than a hundred temples offer a templestay: a day or a night
        following the monks’ routine, eating their food and sleeping on the floor of a guest hall.
        You do not need to be Buddhist, and many of the programmes are run in English.
      </p>

      <GuideHero slugs={[
        'hapcheon-haeinsa-temple-264238',
        'woljeongsa-temple-needle-fir-forest-264189',
        'suncheon-songgwangsa-temple-264304',
      ]} />

      <div className="callout">
        <strong>The three kinds</strong>
        <ul>
          <li><strong>Day programme:</strong> two to three hours of tea with a monk, meditation and a temple tour. Easy from Seoul; no overnight stay.</li>
          <li><strong>Experience stay:</strong> one night on a fixed schedule with the evening and dawn services, 108 bows and the formal monastic meal. The one most people mean.</li>
          <li><strong>Rest stay:</strong> one night or more with only meals fixed, for quiet and hiking. Better for a second visit.</li>
        </ul>
      </div>

      <h2 className="sect">A typical overnight</h2>
      <table className="facts">
        <tbody>
          <tr><th>14:00–15:00</th><td>Arrive and change into the loose temple clothes provided; an orientation on bowing and how to move around the temple.</td></tr>
          <tr><th>17:30</th><td>An early vegetarian dinner, eaten in silence.</td></tr>
          <tr><th>18:30</th><td>The evening service, with the great drum and temple bell rung at dusk.</td></tr>
          <tr><th>19:30</th><td>Tea with a monk, or seated meditation; 108 bows, sometimes while threading a string of prayer beads.</td></tr>
          <tr><th>21:00</th><td>Lights out, on thin mattresses on a heated floor, usually in shared rooms by sex.</td></tr>
          <tr><th>03:00–04:00</th><td>The dawn service. It is optional at some temples, and the reason most people remember the stay.</td></tr>
          <tr><th>06:00</th><td><strong>Balwoo gongyang</strong>, the formal monastic meal with four bowls, where you eat everything and rinse the bowls with water and a slice of pickled radish. Walking meditation or community work, then departure around 11:00.</td></tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.templestay}
        title="Templestays and temple tours"
        intro="Most temples take bookings through the official templestay site; tours bundle the transport for the mountain temples."
      />

      <h2 className="sect">Which temple</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>In Seoul</th>
            <td>
              Jogyesa, the head temple in the centre, and Bongeunsa, opposite COEX in Gangnam, run
              short day programmes that fit around sightseeing, and are the easiest way to try it.
            </td>
          </tr>
          <tr>
            <th>Haeinsa</th>
            <td>
              In the Gayasan mountains near Daegu, home of the Tripitaka Koreana, the 80,000 carved
              woodblocks of the Buddhist canon and a UNESCO site. One of the three “jewel” temples.
            </td>
          </tr>
          <tr>
            <th>Woljeongsa</th>
            <td>
              In Odaesan National Park in Gangwon, reached through a forest of old fir trees. Pairs
              naturally with the autumn colour or a winter trip to Pyeongchang.
            </td>
          </tr>
          <tr>
            <th>Songgwangsa</th>
            <td>
              In the far south-west near Suncheon, the monastic training temple of the Jogye Order
              and one of the most serious and beautiful stays.
            </td>
          </tr>
          <tr>
            <th>Golgulsa</th>
            <td>
              Near Gyeongju, known for seonmudo, a Buddhist martial art, which guests practise. See
              the <Link href="/guides/gyeongju-2-days/">Gyeongju guide</Link>.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'tongdosa-temple-unesco-world-heritage-264216',
        'buseoksa-temple-unesco-world-heritage-264145',
        'boeun-beopjusa-temple-unesco-world-heritage-264271',
      ]} />

      <h2 className="sect">Booking and practical notes</h2>
      <ul className="tips">
        <li><strong>Book</strong> through the official templestay website run by the Cultural Corps of Korean Buddhism, which has an English version and lists which temples run English programmes. Weekends fill up in spring and autumn.</li>
        <li><strong>Cost:</strong> an overnight is usually around ₩60,000–100,000 including meals and the clothes; day programmes cost much less.</li>
        <li><strong>Bring</strong> toiletries, a towel, warm socks and a layer for the dawn service. Mountain temples are cold at night even in autumn.</li>
        <li>No alcohol, no meat, and quiet after lights out. Couples sleep in separate rooms.</li>
        <li>Mountain temples are often an hour or more by bus from the nearest town; check the last bus before you set off.</li>
      </ul>

      <p className="strip">
        <Link href="/guides/seoul-palaces/">Seoul’s five palaces</Link>
        <Link href="/guides/gyeongju-2-days/">2 days in Gyeongju</Link>
        <Link href="/guides/autumn-foliage/">Autumn foliage</Link>
        <Link href="/places/temples/">All temples</Link>
      </p>

      <RelatedGuides href="/guides/templestay-korea/" />

      <p className="meta">
        Programme times and prices vary by temple and season; each temple publishes its own schedule
        on the templestay site. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
