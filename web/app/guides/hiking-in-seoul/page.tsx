import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Hiking in Seoul: Bukhansan, Inwangsan, Achasan and the city wall',
  description: 'Seoul’s mountains start at the subway: Bukhansan’s granite summit, the short sunset climb up Inwangsan, easy Achasan above the Han, the Bugaksan section of the city wall, and Gwanaksan. Routes, difficulty, how to get there and what to bring.',
};

export default function HikingSeoul() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Hiking in Seoul', path: '/guides/hiking-in-seoul/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/hiking-in-seoul/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Hiking in Seoul
      </div>

      <h1>Hiking in Seoul</h1>
      <p className="sub">
        Seoul is ringed by granite mountains, and hiking is a national pastime: on weekend
        mornings the subway fills with people in bright outdoor gear heading for the trails. You can
        be on a summit an hour after leaving your hotel, with the whole city below.
      </p>

      <GuideHero slugs={[
        'bukhansan-national-park-seoul-district-1747593',
        'inwangsan-mountain-1348417',
        'achasan-mountain-1349267',
      ]} />

      <table className="facts">
        <tbody>
          <tr>
            <th>Bukhansan<br /><span className="meta">Hard · 4–5 hr return</span></th>
            <td>
              The national park on the northern edge of the city. The climb to <strong>Baegundae</strong>,
              the 836 m summit, finishes on bare granite with cables and steps; the views take in
              the whole capital. Start from Bukhansanseong or Ui-dong.
            </td>
          </tr>
          <tr>
            <th>Inwangsan<br /><span className="meta">Easy–moderate · 1.5–2 hr</span></th>
            <td>
              A rocky peak beside Gyeongbokgung, following the old city wall, with a shamanist
              shrine on the way up. The best short climb for a sunset view over the palaces.
            </td>
          </tr>
          <tr>
            <th>Achasan<br /><span className="meta">Easy · 1–2 hr</span></th>
            <td>
              A gentle ridge in the east with views over the Han River, and the classic place to
              watch the first sunrise of the year.
            </td>
          </tr>
          <tr>
            <th>Bugaksan and the city wall<br /><span className="meta">Moderate · 2–3 hr</span></th>
            <td>
              The Joseon city wall behind the old presidential palace at Cheong Wa Dae, fully opened
              to hikers in 2022 after decades behind a security fence. Steep steps, big views.
            </td>
          </tr>
          <tr>
            <th>Gwanaksan<br /><span className="meta">Moderate · 3–4 hr</span></th>
            <td>A steep rocky mountain south of the river, busy with students from Seoul National University.</td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'bugaksan-mountain-1061818',
        'gwanaksan-mountain-1562674',
        'seoul-hiking-tourism-center-bugaksan-branch-3107903',
      ]} />

      <BookBox
        offers={GUIDE_OFFERS.hiking}
        title="Guided hikes"
        intro="A guided Bukhansan hike handles the route and the start; for the big mountains further out, the Seoraksan day tours do the transport."
      />

      <h2 className="sect">Practical notes</h2>
      <ul className="tips">
        <li><strong>Seoul Hiking Tourism Centers</strong> near the main trailheads rent boots and gear to visitors and have English maps.</li>
        <li>Wear real shoes with grip; the granite is slippery when wet, and Bukhansan’s summit is steep.</li>
        <li>Weekends are crowded. Weekday mornings are quiet.</li>
        <li>Carry water; there are few shops above the trailheads.</li>
        <li>For bigger mountains, see Seoraksan in the <Link href="/guides/gangneung-sokcho-2-days/">east coast guide</Link> and the <Link href="/guides/autumn-foliage/">autumn foliage guide</Link>.</li>
      </ul>

      <p className="strip">
        <Link href="/guides/day-trips-from-seoul/">Day trips from Seoul</Link>
        <Link href="/guides/autumn-foliage/">Autumn foliage</Link>
        <Link href="/places/hiking/">Hiking &amp; mountains</Link>
        <Link href="/regions/seoul/">Everything in Seoul</Link>
      </p>

      <RelatedGuides href="/guides/hiking-in-seoul/" />

      <p className="meta">
        Times are typical return hikes for a fit walker. Trails can close in bad weather or for fire
        prevention in spring and autumn. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
