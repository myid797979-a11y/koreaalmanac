import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Seoul café guide: the neighbourhoods, the bakeries and the bingsu',
  description: 'Seoul has more cafés per person than almost anywhere: where to find the best of them in Seongsu, Ikseon-dong, Yeonnam and Hannam, the bakery cafés worth a trip, bingsu in summer, and how café culture works.',
};

export default function SeoulCafes() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Seoul café guide', path: '/guides/seoul-cafes/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/seoul-cafes/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Seoul café guide
      </div>

      <h1>Seoul café guide</h1>
      <p className="sub">
        Cafés are where Seoul socialises, studies and works, and the competition between them has
        made them some of the most striking interiors in the city: converted factories, hanok
        courtyards, rooftop views and bakeries with queues around the block. A coffee often costs as
        much as lunch, and nobody minds you staying for hours.
      </p>

      <GuideHero slugs={[
        'seongsu-dong-handmade-shoes-street-2946682',
        'yeonnam-dong-2484384',
        'starbucks-gyeongdong-market-1960-3046389',
      ]} />

      <h2 className="sect">By neighbourhood</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Seongsu</th>
            <td>
              The warehouse district by the river, full of cafés in former factories and shoe
              workshops, alongside brand pop-ups. The place to start.
            </td>
          </tr>
          <tr>
            <th>Ikseon-dong</th>
            <td>
              Tiny hanok lanes near Jongno 3-ga, where cafés and dessert shops fill traditional
              houses with courtyards and skylights.
            </td>
          </tr>
          <tr>
            <th>Yeonnam-dong</th>
            <td>
              Next to Hongdae along the Gyeongui Line Forest Park, a linear park on an old railway,
              with small independent cafés and bakeries.
            </td>
          </tr>
          <tr>
            <th>Hannam-dong</th>
            <td>Smart roasters and concept stores on the hill between Itaewon and the river.</td>
          </tr>
          <tr>
            <th>Bukchon and Samcheong-dong</th>
            <td>Cafés with palace views and quiet tea houses between Gyeongbokgung and Changdeokgung.</td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'ikseon-dong-hanok-street-2943972',
        'seongsu-stage-35-35-3508511',
        'youngchive-seongsu-3418385',
      ]} />

      <h2 className="sect">How café culture works</h2>
      <ul className="tips">
        <li>Order and pay at the counter; you get a buzzer that goes off when your drink is ready.</li>
        <li>Most cafés expect one drink per person, and staying for hours is normal.</li>
        <li>In summer, try <strong>bingsu</strong>: shaved milk ice with fruit, red beans or injeolmi rice cake. In winter, sweet potato and grain lattes.</li>
        <li>Popular bakery cafés sell out of signature items by the afternoon; go in the morning.</li>
        <li>Many cafés open late in the morning, around 11:00, and close late at night.</li>
      </ul>

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.seoul}
        title="Stay near the café districts"
        intro="Seongsu, Ikseon-dong and Yeonnam are also good neighbourhoods to stay in. See where to stay in Seoul."
      />

      <p className="strip">
        <Link href="/guides/korean-food-guide/">Eating in Korea</Link>
        <Link href="/guides/seoul-shopping/">Shopping in Seoul</Link>
        <Link href="/guides/rainy-day-seoul/">Rainy day in Seoul</Link>
        <Link href="/guides/gangneung-sokcho-2-days/">Gangneung, the coffee town</Link>
      </p>

      <RelatedGuides href="/guides/seoul-cafes/" />

      <p className="meta">Photographs: Korea Tourism Organization.</p>
    </div>
  );
}
