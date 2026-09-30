import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Rainy day in Seoul: 12 indoor things to do (many of them free)',
  description: 'What to do in Seoul when it rains or freezes: the free national museums, the War Memorial, Starfield Library and COEX, Lotte World and its aquarium, a jjimjilbang afternoon, underground shopping, and indoor day trips.',
};

export default function RainyDaySeoul() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Rainy day in Seoul', path: '/guides/rainy-day-seoul/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/rainy-day-seoul/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Rainy day in Seoul
      </div>

      <h1>Rainy day in Seoul: indoor things to do</h1>
      <p className="sub">
        Seoul gets most of its rain in the monsoon from late June to July, and its coldest days in
        January, when the palaces are bleak. Both are good days for the indoor city, which is huge:
        free national museums, malls you can walk between underground, and bathhouses you can spend
        an afternoon in.
      </p>

      <GuideHero slugs={[
        'national-museum-of-korea-268137',
        'starfield-library-2642344',
        'lotte-world-aquarium-2482037',
      ]} />

      <h2 className="sect">Museums, mostly free</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>National Museum of Korea</th>
            <td>
              One of the great museums of Asia, free, in Yongsan: Silla gold crowns, the meditating
              bodhisattvas in their own dark room, and a whole floor of celadon. Easily a half-day.
            </td>
          </tr>
          <tr>
            <th>The War Memorial of Korea</th>
            <td>
              Free, and the clearest account in English of the Korean War, with aircraft and tanks
              outside for a dry spell. Two stops from the National Museum.
            </td>
          </tr>
          <tr>
            <th>Seoul Museum of History</th>
            <td>
              Free, by Gyeonghuigung: how Joseon Seoul became the modern city, with a vast scale
              model of the capital.
            </td>
          </tr>
          <tr>
            <th>Museum Kimchikan</th>
            <td>A small museum of kimchi in Insadong, with a hands-on class if you book.</td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'the-war-memorial-of-korea-268131',
        'seoul-museum-of-history-268127',
        'museum-kimchikan-2490739',
      ]} />

      <h2 className="sect">Malls, towers and aquariums</h2>
      <ul className="tips">
        <li><strong>Starfield COEX</strong> in Gangnam: the two-storey Starfield Library under a glass roof, the COEX Aquarium, K-pop shops and food courts, all connected underground to the station.</li>
        <li><strong>Lotte World</strong> in Jamsil: the indoor theme park, the Lotte World Aquarium and the Seoul Sky observatory, which on a rainy day is often above the cloud. See <Link href="/guides/everland-vs-lotte-world/">Everland or Lotte World?</Link></li>
        <li><strong>Underground shopping</strong> at Gangnam Station and the Express Bus Terminal’s Goto Mall, kilometres of cheap fashion under the street.</li>
        <li><strong>Dongdaemun Design Plaza</strong> for exhibitions, with the fashion malls around it open late.</li>
      </ul>

      <BookBox
        offers={GUIDE_OFFERS.rainy}
        title="Indoor tickets"
        intro="The theme park, the aquarium and the observatory are the paid indoor staples; buying ahead is usually cheaper than the gate."
      />

      <h2 className="sect">Slow afternoons</h2>
      <ul className="tips">
        <li><strong>A jjimjilbang:</strong> hours of hot pools, kiln saunas, snacks and sleep. See <Link href="/guides/korean-spa-jjimjilbang/">Korean spas and jjimjilbang</Link>.</li>
        <li><strong>A cooking class</strong> or a market food tour under Gwangjang Market’s roof. See <Link href="/guides/korean-food-guide/">eating in Korea</Link>.</li>
        <li><strong>A café crawl</strong> in Seongsu or Ikseon-dong, where many of the cafés are in converted factories and hanok.</li>
        <li><strong>Makgeolli and pancakes</strong>: it is what Koreans eat when it rains.</li>
      </ul>

      <h2 className="sect">Out of the city</h2>
      <p>
        <Link href="/place/gwangmyeong-cave-3113166/">Gwangmyeong Cave</Link>, a lit former mine 45
        minutes away, is the classic rainy-day trip. See{' '}
        <Link href="/guides/day-trips-from-seoul/">day trips from Seoul</Link>.
      </p>

      <p className="strip">
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/korea-with-kids/">Korea with kids</Link>
        <Link href="/places/museums/">Museums &amp; galleries</Link>
        <Link href="/regions/seoul/">Everything in Seoul</Link>
      </p>

      <RelatedGuides href="/guides/rainy-day-seoul/" />

      <p className="meta">
        Opening days vary; most national museums close on New Year’s Day, Seollal and Chuseok.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
