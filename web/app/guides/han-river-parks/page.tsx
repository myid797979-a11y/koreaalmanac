import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Seoul’s Han River parks: which one, ramyeon by the water, bikes, cruises and the rainbow fountain',
  description: 'The Han River parks are Seoul’s back garden: Yeouido, Banpo and the Moonlight Rainbow Fountain, Ttukseom, Mangwon, Nodeul Island and Seonyudo. What each is for, convenience-store ramyeon and chicken delivered to the riverbank, bike rental, cruises, and the season’s events.',
};

export default function HanRiver() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Han River parks', path: '/guides/han-river-parks/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/han-river-parks/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Han River parks
      </div>

      <h1>Seoul’s Han River parks</h1>
      <p className="sub">
        The Han River runs for 40 km through the middle of Seoul, and both banks are lined with
        free parks: lawns, cycle paths, swimming pools in summer, and convenience stores selling
        ramyeon you cook yourself by the water. On a warm evening half the city is here, sitting on
        mats with chicken and beer while the bridges light up. It costs almost nothing and it is one
        of the best things to do in Seoul.
      </p>

      <GuideHero slugs={[
        'banpo-hangang-park-1013338',
        'mangwon-hangang-park-1064349',
        'nodeul-island-2813573',
      ]} />

      <div className="callout">
        <strong>How the river evening works</strong>
        <ul>
          <li><strong>Bring or rent a mat.</strong> Convenience stores near the parks sell cheap ones, and tents are allowed in marked areas in the daytime.</li>
          <li><strong>Han River ramyeon:</strong> buy a cup or packet at the riverside convenience store and cook it in the instant-noodle machine there. It is a Seoul ritual.</li>
          <li><strong>Order chicken to the river.</strong> Delivery riders meet you at numbered delivery zones in each park; the hotel or a local friend can order if you have no Korean app.</li>
          <li><strong>Drinking is allowed</strong> on the lawns, but take your rubbish home or to the bins.</li>
        </ul>
      </div>

      <h2 className="sect">Which park</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Banpo<br /><span className="meta">Express Bus Terminal</span></th>
            <td>
              Home of the <strong>Moonlight Rainbow Fountain</strong>, which sprays from both sides
              of Banpo Bridge in shows of about 20 minutes in the evening from spring to autumn, and
              the floating Some Sevit islands. The classic river evening.
            </td>
          </tr>
          <tr>
            <th>Yeouido<br /><span className="meta">Yeouinaru, Line 5</span></th>
            <td>
              The biggest and busiest park, with the cruise piers, bike rental, food trucks and the
              cherry-blossom road in April. The venue for the Seoul International Fireworks
              Festival.
            </td>
          </tr>
          <tr>
            <th>Ttukseom<br /><span className="meta">Jayang, Line 7</span></th>
            <td>
              Wide lawns, a summer swimming pool, water sports and the station right at the park, on
              the east side near Seongsu.
            </td>
          </tr>
          <tr>
            <th>Mangwon<br /><span className="meta">Mangwon, Line 6</span></th>
            <td>
              The local favourite near Hongdae, with a walk through Mangwon Market first for food
              to take down to the river.
            </td>
          </tr>
          <tr>
            <th>Nodeul Island<br /><span className="meta">Nodeul, Line 9</span></th>
            <td>
              A small island in the middle of the river with a music hall, rooftop lawn and the
              best sunset view of the city. Free concerts on autumn weekends.
            </td>
          </tr>
          <tr>
            <th>Seonyudo<br /><span className="meta">Seonyudo, Line 9</span></th>
            <td>
              A former water-treatment plant turned into a garden park, linked by a footbridge.
              Quiet and photogenic.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'jamsil-hangang-park-1000299',
        'seonyudo-park-3006542',
        'nanji-hangang-park-767100',
      ]} />

      <BookBox
        offers={GUIDE_OFFERS.nightlife}
        title="Cruises and night views"
        intro="The evening cruise from Yeouido is timed for the sunset and the Banpo fountain; book ahead at weekends."
      />

      <h2 className="sect">Getting around the river</h2>
      <ul className="tips">
        <li><strong>Bikes:</strong> Seoul’s public bikes, Ttareungyi, have docks at every park. Pay by app with a foreign card, or rent from the riverside rental shops. The cycle path runs the whole length of the river on both banks.</li>
        <li><strong>River buses</strong> now run between several parks as commuter boats. Check the current timetable before relying on them.</li>
        <li>Most parks are a 5–10 minute walk from the nearest subway exit; follow the “Hangang Park” signs.</li>
      </ul>

      <h2 className="sect">When to go</h2>
      <ul className="tips">
        <li><strong>April</strong> for the cherry blossoms at Yeouido. See the <Link href="/guides/cherry-blossom-2027/">cherry blossom guide</Link>.</li>
        <li><strong>May to June and September to October</strong> are perfect evenings outdoors.</li>
        <li><strong>July and August</strong> bring the pools and night markets but also humidity and monsoon rain.</li>
        <li>In winter the parks are empty and cold, but the bridges are still lit; a short walk at Banpo or a cruise is enough.</li>
      </ul>

      <p className="strip">
        <Link href="/guides/seoul-nightlife/">Seoul after dark</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
        <Link href="/guides/seoul-markets/">Seoul’s markets</Link>
        <Link href="/seoul-this-weekend/">Seoul this weekend</Link>
      </p>

      <RelatedGuides href="/guides/han-river-parks/" />

      <p className="meta">
        Fountain show times and river-bus timetables change by season; check before you go.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
