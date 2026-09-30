import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Korea with kids: where to go, what works, and what to bring',
  description: 'A family guide to Korea: the theme parks, the free children’s museums and zoo in Seoul, aquariums and Jeju, getting around with a stroller, children’s fares, family rooms, food for fussy eaters, and car seats in taxis.',
};

export default function KoreaWithKids() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Korea with kids', path: '/guides/korea-with-kids/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/korea-with-kids/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Korea with kids
      </div>

      <h1>Korea with kids</h1>
      <p className="sub">
        Korea is one of the easiest countries in Asia to travel with children: safe streets, clean
        toilets, nursing rooms in every department store, and people who go out of their way for
        small children. The cities are built for families, and many of the best things for kids are
        free.
      </p>

      <GuideHero slugs={[
        'seoul-children-s-grand-park-1051832',
        'lotte-world-264152',
        'snoopy-garden-2823618',
      ]} />

      <h2 className="sect">In Seoul</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Seoul Children’s Grand Park</th>
            <td>
              A big free park with a small zoo, playgrounds and rides, on Line 7. The easiest
              half-day with small children.
            </td>
          </tr>
          <tr>
            <th>Children’s museums</th>
            <td>
              The Children’s Museum of the National Museum of Korea and the Seoul Children’s Museum
              are hands-on, well designed and free or cheap. Book the timed sessions online ahead.
            </td>
          </tr>
          <tr>
            <th>Lotte World and aquariums</th>
            <td>
              Lotte World is indoors and works in any weather; the Lotte World and COEX aquariums
              suit younger children. See <Link href="/guides/everland-vs-lotte-world/">Everland or Lotte World?</Link>
            </td>
          </tr>
          <tr>
            <th>Seoul Forest and the Han River</th>
            <td>
              Seoul Forest has deer, playgrounds and cycle paths; the Han River parks have
              playgrounds, bike rental and summer swimming pools.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'childrens-museum-of-the-national-museum-of-korea-1215579',
        'seoul-forest-789696',
        'coex-aquarium-736274',
      ]} />

      <h2 className="sect">Further afield</h2>
      <ul className="tips">
        <li><strong>Everland</strong> for a full theme-park day with a safari, and <strong>Legoland Korea</strong> in Chuncheon for under-12s.</li>
        <li><strong>Alpaca World</strong> and <strong>Nami Island</strong> east of Seoul. See the <Link href="/guides/nami-island-day-trip/">Nami Island guide</Link>.</li>
        <li><strong>Jeju</strong> is the family island: beaches with shallow water, Snoopy Garden, tangerine picking in winter and short volcanic walks. See <Link href="/guides/jeju-3-days/">3 days in Jeju</Link>.</li>
        <li><strong>Busan</strong> has the Sea Life aquarium on Haeundae Beach and the Blueline Park beach train.</li>
      </ul>

      <BookBox
        offers={GUIDE_OFFERS.kids}
        title="Family tickets"
        intro="Theme parks sell cheaper tickets online, and children’s prices are well discounted."
      />

      <h2 className="sect">Getting around with children</h2>
      <ul className="tips">
        <li><strong>Strollers:</strong> subway stations have lifts, but not at every exit; the station maps show which. A light folding stroller is easier than a big one on buses and escalators.</li>
        <li><strong>Fares:</strong> children under six ride the subway free with a paying adult, and there are discounted children’s and youth transport cards.</li>
        <li><strong>Car seats</strong> are rarely available in taxis. If your child needs one, bring a travel seat or book a private transfer that supplies one.</li>
        <li><strong>The KTX</strong> has family seating and is far easier with children than long bus rides.</li>
      </ul>

      <h2 className="sect">Sleeping and eating</h2>
      <ul className="tips">
        <li><strong>Family rooms</strong> are common, including heated-floor ondol rooms where everyone sleeps on mattresses on the floor.</li>
        <li><strong>Food:</strong> kimbap, mild soups, fried chicken, bulgogi and dumplings are easy wins. Say “an maepge” (not spicy); many dishes can be made mild.</li>
        <li><strong>Convenience stores</strong> sell milk, fruit and snacks everywhere, round the clock.</li>
        <li><strong>Nursing and baby-changing rooms</strong> are in department stores, malls, big stations and museums.</li>
      </ul>

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.seoul}
        title="Family-friendly places to stay"
        intro="Filter for family rooms; Jamsil is handy for Lotte World and Olympic Park, and serviced apartments give you a kitchen."
      />

      <p className="strip">
        <Link href="/guides/rainy-day-seoul/">Rainy day in Seoul</Link>
        <Link href="/guides/where-to-stay-in-seoul/">Where to stay in Seoul</Link>
        <Link href="/guides/getting-around-seoul/">Getting around Seoul</Link>
        <Link href="/places/theme-parks/">Theme parks &amp; experiences</Link>
      </p>

      <RelatedGuides href="/guides/korea-with-kids/" />

      <p className="meta">
        Fare rules and museum booking systems change; check the official sites before you go.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
