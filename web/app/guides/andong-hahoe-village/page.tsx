import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Andong and Hahoe Village: the mask dance, a night in a hanok and jjimdak',
  description: 'Andong in a day or two: the UNESCO folk village of Hahoe and its mask dance, Byeongsan Seowon, the Mask Dance Festival, Andong jjimdak and soju, getting there from Seoul, and why to stay the night in a village house.',
};

export default function Andong() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Andong and Hahoe Village', path: '/guides/andong-hahoe-village/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/andong-hahoe-village/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Andong and Hahoe Village
      </div>

      <h1>Andong and Hahoe Village</h1>
      <p className="sub">
        Andong, in the hills of Gyeongbuk, is Korea’s capital of Confucian tradition: old clan
        villages, scholars’ academies and a mask dance that has been performed here for centuries.
        At its heart is Hahoe, a village of tiled and thatched houses in a bend of the river, still
        lived in and listed by UNESCO. It is quieter and more real than the hanok villages of the
        big cities.
      </p>

      <GuideHero slugs={[
        'andong-hahoe-village-unesco-world-heritage-264148',
        'byeongsanseowon-confucian-academy-unesco-world-heritage-264458',
        'woryeonggyo-bridge-1767851',
      ]} />

      <div className="callout">
        <strong>Getting there</strong>
        <ul>
          <li><strong>From Seoul</strong>, the KTX-Eum from Cheongnyangni reaches Andong in about 2 hours; express buses take about 2 hours 50 minutes.</li>
          <li><strong>Hahoe</strong> is about 40 minutes from central Andong by city bus or 30 by taxi. Buses are infrequent; check the timetable.</li>
          <li><strong>The Mask Dance Festival</strong> runs from late September into early October. See the <Link href="/festival/andong-maskdance-festival-697123/">festival listing</Link>.</li>
        </ul>
      </div>

      <h2 className="sect">What to see</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Hahoe Folk Village</th>
            <td>
              The Ryu clan village, lived in for six centuries, with lanes of mud walls, noble houses
              and thatched cottages. The <strong>Hahoe Byeolsingut mask dance</strong> is performed
              at the village theatre on a regular schedule, most generously at weekends and during
              the festival. Climb Buyongdae cliff across the river for the view of the whole bend.
            </td>
          </tr>
          <tr>
            <th>Byeongsan Seowon</th>
            <td>
              A Confucian academy a few kilometres from Hahoe, with a pavilion looking over the
              river, one of the most beautiful buildings in Korea. Also UNESCO-listed.
            </td>
          </tr>
          <tr>
            <th>Hahoe Mask Museum</th>
            <td>Masks from Korea and around the world, by the village entrance.</td>
          </tr>
          <tr>
            <th>Woryeonggyo Bridge</th>
            <td>A long wooden footbridge over the lake in town, lit at night.</td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'hahoe-mask-museum-268220',
        'andong-folk-village-264452',
        'andong-gunja-village-ocheon-historic-site-264453',
      ]} />

      <h2 className="sect">What to eat and drink</h2>
      <ul className="tips">
        <li><strong>Andong jjimdak</strong>: chicken braised with glass noodles and vegetables in a sweet soy sauce. The market’s jjimdak alley is where it comes from.</li>
        <li><strong>Heotjesatbap</strong>: “fake ritual food”, the rice and dishes of an ancestral rite, served at restaurants near the dam.</li>
        <li><strong>Andong soju</strong>: a strong traditional distilled soju with its own museum.</li>
        <li><strong>Mackerel</strong>, salted in the old way for the inland journey from the coast.</li>
      </ul>
      <PlaceRow slugs={[
        'andong-market-jjimdak-alley-2944525',
        'andong-soju-traditional-food-museum-268166',
        'wonjo-andong-jjimdak-2688155',
      ]} />

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.andong}
        title="Where to stay"
        intro="A night in a Hahoe village house is the point; book early for the festival and autumn weekends. Downtown Andong has modern hotels."
      />
      <BookBox
        offers={GUIDE_OFFERS.andong}
        title="Tours and trains"
        intro="Day tours from Seoul handle the bus connection to Hahoe; the rail pass helps if Andong is one stop of several."
      />

      <p className="strip">
        <Link href="/guides/gyeongju-2-days/">2 days in Gyeongju</Link>
        <Link href="/guides/templestay-korea/">Templestay in Korea</Link>
        <Link href="/guides/best-festivals-in-korea/">Korea’s best festivals</Link>
        <Link href="/regions/gyeongbuk/">Everything in Gyeongbuk</Link>
      </p>

      <RelatedGuides href="/guides/andong-hahoe-village/" />

      <p className="meta">
        Train and bus times as of September 2026; mask dance performance days vary by season.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
