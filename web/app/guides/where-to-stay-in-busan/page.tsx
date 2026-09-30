import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Where to stay in Busan: Haeundae, Gwangalli, Seomyeon or Nampo?',
  description: 'Busan’s neighbourhoods compared for a first visit: Haeundae for the beach and resorts, Gwangalli for the bridge and the fireworks, Seomyeon for transport and nightlife, Nampo for the old port and markets, and Busan Station for the KTX.',
};

export default function WhereToStayBusan() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Where to stay in Busan', path: '/guides/where-to-stay-in-busan/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/where-to-stay-in-busan/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Where to stay in Busan
      </div>

      <h1>Where to stay in Busan</h1>
      <p className="sub">
        Busan stretches for 30 km along the coast, and the two halves visitors want are far apart:
        the old port and markets in the west, the beaches in the east. The subway joins them in
        about 40 minutes. Pick the side where you will spend your evenings.
      </p>

      <GuideHero slugs={[
        'haeundae-beach-264155',
        'biff-square-biff-789805',
        'songjeong-beach-264198',
      ]} />

      <div className="callout">
        <strong>The short answer</strong>
        <ul>
          <li><strong>Beach holiday or first visit:</strong> Haeundae.</li>
          <li><strong>The view, the bars and the fireworks:</strong> Gwangalli.</li>
          <li><strong>Getting around easily, food and nightlife:</strong> Seomyeon.</li>
          <li><strong>Markets, Gamcheon and the old town:</strong> Nampo, or Busan Station if you arrive by KTX.</li>
        </ul>
      </div>

      <table className="facts">
        <tbody>
          <tr>
            <th>Haeundae<br /><span className="meta">Line 2</span></th>
            <td>
              Korea’s most famous beach, lined with big hotels, with the Blueline Park sky capsule,
              the Busan X the Sky observatory, Centum City and BEXCO close by. Expensive and busy in
              July and August, lovely out of season. The easiest base for a first visit.
            </td>
          </tr>
          <tr>
            <th>Gwangalli<br /><span className="meta">Line 2</span></th>
            <td>
              A smaller beach facing the lit-up Gwangan Bridge, with cafés, bars and seafood
              restaurants along the front. The best place to stay for the{' '}
              <Link href="/guides/busan-fireworks-2026/">fireworks on 7 November</Link>, if you can
              get a room: sea-view rooms sell out months ahead.
            </td>
          </tr>
          <tr>
            <th>Seomyeon<br /><span className="meta">Lines 1 and 2</span></th>
            <td>
              Busan’s downtown, where the two main subway lines cross: shopping streets,
              underground malls, late-night food and the best choice of mid-range hotels. No sea,
              but twenty minutes from everything.
            </td>
          </tr>
          <tr>
            <th>Nampo and Jung-gu<br /><span className="meta">Line 1</span></th>
            <td>
              The old port district: Jagalchi fish market, Gukje Market, BIFF Square and the ferry
              terminal, with Gamcheon Culture Village and Yeongdo close by. Older, cheaper hotels
              and the most character.
            </td>
          </tr>
          <tr>
            <th>Busan Station<br /><span className="meta">Line 1 · KTX</span></th>
            <td>
              Practical for a short stay or an early train, a few stops from Nampo, with Chinatown
              and the Texas Street area opposite.
            </td>
          </tr>
          <tr>
            <th>Songjeong and Gijang<br /><span className="meta">Donghae Line</span></th>
            <td>
              Further east and quieter: a surf beach, the seaside Haedong Yonggungsa temple and
              resort hotels. Good for a relaxed stay, far from the old town.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.busan}
        title="Hotels in Busan"
        intro="Filter the map by the neighbourhood above; prices jump for summer weekends, the film festival and the fireworks."
      />
      <BookBox
        offers={GUIDE_OFFERS.busan}
        title="Book ahead in Busan"
        intro="The Sky Capsule sells out days ahead in good weather; the Visit Busan Pass pays off if you do three or more paid sights in a day."
      />

      <h2 className="sect">Practical notes</h2>
      <ul className="tips">
        <li>From Gimhae Airport, the light rail and Line 2 or 3 reach every area in about an hour; the airport limousine buses go direct to Haeundae.</li>
        <li>From Seoul, the KTX arrives at Busan Station in about 2 hours 30 minutes. Some trains stop at Gupo, handier for the west.</li>
        <li>For concerts at BEXCO or the Asiad stadium, see the <Link href="/venue/bexco-busan/">BEXCO</Link> and <Link href="/venue/busan-asiad-main-stadium/">Asiad</Link> venue guides.</li>
      </ul>
      <PlaceRow slugs={[
        'gwangalli-beach-264250',
        'jagalchi-market-2382544',
        'haeundae-green-railway-mipo-songjeong-2990076',
      ]} />

      <p className="strip">
        <Link href="/guides/busan-2-days/">2 days in Busan</Link>
        <Link href="/guides/busan-fireworks-2026/">Busan Fireworks 2026</Link>
        <Link href="/guides/korean-spa-jjimjilbang/">Spa Land and Korean spas</Link>
        <Link href="/regions/busan/">Everything in Busan</Link>
      </p>

      <RelatedGuides href="/guides/where-to-stay-in-busan/" />

      <p className="meta">
        Subway lines as of September 2026. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
