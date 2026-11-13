import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, FestivalRow, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Korea in spring 2027 — what blooms when after the cherry blossom, May holidays, yellow dust and what to pack',
  description: 'April and May in Korea after the cherry blossom: azaleas, Jeju canola, royal azaleas on Hwangmaesan, Boseong green tea and roses, with typical dates; the 2027 May holidays and crowds; Jongmyo Daeje; fine dust; and what to pack.',
};

export default function KoreaInSpring() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Korea in spring', path: '/guides/korea-in-spring/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/korea-in-spring/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Korea in spring
      </div>

      <h1>Korea in spring 2027: what to see after the cherry blossom</h1>
      <p className="sub">
        The cherry blossom gets the attention, but it lasts about a week in each city. What follows
        is two months of steadily better weather and a run of flowers that moves from the south
        coast and Jeju up into the mountains: azaleas in April, royal azaleas on the high ridges in
        May, the first green-tea harvest in Boseong, and roses in the city parks by late May. April
        and May are, with October, the most comfortable months to travel Korea. This guide covers
        the season after the blossom; for the blossom itself see{' '}
        <Link href="/guides/cherry-blossom-2027/">cherry blossom 2027</Link>.
      </p>

      <GuideHero slugs={[
        'daehan-dawon-tea-plantation-264293',
        'seogwipo-gasiri-village-noksan-ro-canola-flower-road-3079500',
        'hwangmaesan-county-park-1810588',
      ]} />

      <div className="callout">
        <strong>Spring 2027 at a glance</strong>
        <ul>
          <li><strong>Weather:</strong> Seoul averages highs of about 18 °C in April and 24 °C in May, with cold mornings in early April. The rainy season does not start until late June.</li>
          <li><strong>Public holidays:</strong> Labour Day, Saturday 1 May; Children’s Day, Wednesday 5 May; Buddha’s Birthday, Thursday 13 May. Unlike 2025 and 2026, there is no long holiday weekend in May 2027.</li>
          <li><strong>The catch:</strong> spring is yellow-dust season. Some days the sky over Seoul turns beige — check the air quality the night before (below).</li>
          <li><strong>Dates below are typical:</strong> flower festivals set their dates by the bloom and announce them a few weeks ahead. Where we give a date, it is the 2026 one unless it says otherwise.</li>
        </ul>
      </div>

      <h2 className="sect">What blooms when</h2>
      <p>
        Flowers in Korea move north and uphill. The same species opens on the south coast and Jeju
        one to two weeks before Seoul, and on the mountain ridges two to three weeks after the
        valleys. These are the typical windows from recent years — a warm March pulls everything
        earlier, as it has in most years since 2021.
      </p>
      <table className="facts">
        <tbody>
          <tr>
            <th>Canola on Jeju<br /><span className="meta">mid-March to mid-April</span></th>
            <td>
              Yellow canola fields across the island, at their best when they overlap with the
              cherry blossom. The best-known stretch is Noksan-ro near Gasi-ri, a road lined with
              both; the Seogwipo Canola Flower Festival is held there in early April (4–5 April in
              2026, free). Off the south coast,{' '}
              <Link href="/place/wando-gun-cheongsando-island-slow-city-264610/">Cheongsando</Link>{' '}
              holds its Slow Walking Festival through April (1–30 April in 2026), with walking
              trails past terraced fields.
            </td>
          </tr>
          <tr>
            <th>Azaleas (jindallae)<br /><span className="meta">late March to late April</span></th>
            <td>
              The pale-pink wild azalea that covers Korean hillsides before the leaves come out.
              It flowers in early April on the south coast — Yeongchwisan in Yeosu is famous for
              it — and mid-April around Seoul. The magenta royal-azalea gardens on{' '}
              <Link href="/place/buramsan-mountain-2357787/">Buramsan</Link> in
              north-east Seoul hold their festival in the second half of April (16–26 April in 2026),
              a subway ride from the centre.
            </td>
          </tr>
          <tr>
            <th>Royal azaleas (cheoljjuk) on the ridges<br /><span className="meta">late April to late May</span></th>
            <td>
              The big mountain displays come later. Hwangmaesan in South Gyeongsang turns its
              upper meadows pink in early May (the festival ran 1–10 May in 2026); Sobaeksan, on
              the border of North Chungcheong and North Gyeongsang, flowers last, in late May
              (22–24 May in 2026 on the Danyang side). Both mean a proper hike or a long drive.
            </td>
          </tr>
          <tr>
            <th>Green tea in Boseong and Hadong<br /><span className="meta">late April to May</span></th>
            <td>
              The first and most prized pick of the year happens from late April. The terraced
              plantations of Boseong are at their greenest in May, and both Boseong and Hadong hold
              their tea festivals over the Children’s Day holiday (1–5 May in 2026). Daehan Dawon,
              the plantation in most photographs, is open year-round.
            </td>
          </tr>
          <tr>
            <th>Roses<br /><span className="meta">mid-May to early June</span></th>
            <td>
              City rose gardens open the summer. In Seoul the long rose tunnel along the Jungnangcheon
              stream holds the Seoul Rose Festival in mid-May (it opened on 15 May in 2026); Ulsan
              Grand Park and Gokseong follow in the last week of May.
            </td>
          </tr>
          <tr>
            <th>Wisteria and fresh green<br /><span className="meta">late April to early May</span></th>
            <td>
              Wisteria arbours flower in parks and temple courtyards for a week or so around the
              turn of the month. Early May is also when the hills go from bare to bright green — the
              Koreans call it <em>sinnok</em>, new green, and it is the best time of year for the
              palace gardens and the hiking trails around Seoul.
            </td>
          </tr>
        </tbody>
      </table>
      <FestivalRow slugs={[
        'jeju-canola-flower-festival-292976',
        'seoul-buramsan-azalea-festival-4053719',
        'boseong-green-tea-festival-700867',
        'danyang-sobaeksan-royal-azalea-festival-557329',
      ]} />

      <p>
        One spring event has nothing to do with flowers. At the largest spring tides, the sea off
        Jindo in the far south-west draws back to expose a 2.8 km path between Hoedong village
        and Modo island for about an hour, and the{' '}
        <Link href="/place/jindo-mysterious-sea-route-264282/">Jindo sea road</Link> festival is
        timed to it (17–20 April in 2026). The dates follow the tide tables, so check them before
        you plan around it.
      </p>

      <h2 className="sect">Seoul in April and May</h2>
      <p>
        After the cherry blossom, Seoul is at its easiest. The Han River parks fill with picnics
        and rented bikes in the evenings, the baseball season is under way (see{' '}
        <Link href="/guides/baseball-in-korea/">baseball in Korea</Link>), and palace gardens such as
        Changdeokgung’s Secret Garden are at their best — book that tour a few days ahead. For a
        green half-day, take the trails on Bukhansan or Inwangsan (see{' '}
        <Link href="/guides/hiking-in-seoul/">hiking in Seoul</Link>), or Seoul Forest at the
        weekend. Remember that palaces and museums close on different weekdays —{' '}
        <Link href="/open-on/">what’s open on each day</Link> lists them.
      </p>
      <PlaceRow slugs={['seoul-forest-789696', 'bukhansan-national-park-seoul-district-1747593', 'olympic-park-789703']} />

      <h2 className="sect">Jongmyo Daeje: the royal rite, first Sunday of May</h2>
      <p>
        Once a year in spring, the Joseon royal ancestral rite is performed in full at{' '}
        <Link href="/place/jongmyo-shrine-unesco-world-heritage-264351/">Jongmyo Shrine</Link>, with
        court music and dance listed by UNESCO. It is held on the <strong>first Sunday of May</strong>{' '}
        — 3 May in 2026, which would make it <strong>Sunday 2 May in 2027</strong>, though the 2027
        date had not been announced in November 2026. In 2026 the rite at Yeongnyeongjeon ran
        10:00–12:00, a royal procession walked from Gwanghwamun to Jongmyo, and the main rite at
        Jeongjeon ran 14:00–16:30. Watching was free; seats around the main hall go early, so
        arrive an hour before the afternoon rite.
      </p>
      <FestivalRow slugs={['jongmyo-daeje-royal-ancestral-rite-141759']} />

      <h2 className="sect">The May holidays and crowds</h2>
      <p>
        Early May is the busiest stretch of spring. Korea’s own holidays fall here — Labour Day
        became a public holiday for everyone in 2026, Children’s Day is 5 May, and Buddha’s
        Birthday is usually in May too — and Japan’s Golden Week and China’s May Day holiday land in
        the same days. In 2025 and 2026 these joined up into long weekends; <strong>in 2027 they do
        not</strong>: Labour Day is a Saturday, Children’s Day a Wednesday and Buddha’s Birthday a
        Thursday. Expect busy weekends rather than a week-long rush.
      </p>
      <table className="facts">
        <tbody>
          <tr><th>Children’s Day, 5 May</th><td>The one day to avoid theme parks, zoos and aquariums: Everland, Lotte World and Seoul Grand Park are at their most crowded of the year. Palaces and the big parks are busy with families but manageable.</td></tr>
          <tr><th>Buddha’s Birthday, 13 May</th><td>Temples are hung with lanterns, many serve visitors a free lunch, and Seoul’s Lotus Lantern Festival takes place in the weeks before — see the{' '}<Link href="/guides/lotus-lantern-festival-2027/">Lotus Lantern Festival guide</Link>.</td></tr>
          <tr><th>Prices</th><td>Hotels in Seoul and Busan and KTX tickets rise in the first week of May and around the long weekends; Jeju flights and hotels fill earliest. Book trains as soon as they go on sale — a month ahead.</td></tr>
        </tbody>
      </table>

      <h2 className="sect">Yellow dust and fine dust</h2>
      <p>
        Spring is the season of <em>hwangsa</em>, yellow dust blown in from the deserts of northern
        China and Mongolia, on top of the ordinary fine-dust pollution that peaks in the cooler
        months. Most days are clear; on bad days visibility drops and the air tastes of grit. Koreans
        check the forecast the way others check for rain: the government’s AirKorea service and
        weather apps show the PM2.5 and PM10 levels by district. On a “bad” or “very bad” day, plan
        indoor sights (see{' '}<Link href="/guides/rainy-day-seoul/">a rainy day in Seoul</Link>) and
        wear a KF94 mask — sold at every convenience store and pharmacy — if you are outdoors for
        long. If you have asthma, bring your inhaler.
      </p>

      <h2 className="sect">What to pack</h2>
      <p>
        Layers. In April mornings can be 5–8 °C and afternoons near 20 °C, so a light down or
        fleece jacket you can carry is worth more than a heavy coat. By late May it is short-sleeve
        weather by day with a light jacket for the evening. Bring comfortable walking shoes with
        some grip if you plan to hike for the azaleas, sunscreen (the May sun is strong), a few
        masks for dusty days, and a small umbrella for the occasional spring shower.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.itinerary7}
        title="Getting around in spring"
        intro="A rail pass makes a south-coast flower trip easy; the eSIM and airport train are the same whatever the season."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.cherry}
        title="Where to stay"
        intro="Book early May dates first — that is when Korea, Japan and China are all on holiday."
      />

      <p className="strip">
        <Link href="/guides/cherry-blossom-2027/">Cherry blossom 2027</Link>
        <Link href="/guides/lotus-lantern-festival-2027/">Lotus Lantern Festival 2027</Link>
        <Link href="/events/festivals/april/">Korea in April</Link>
        <Link href="/events/festivals/may/">Korea in May</Link>
        <Link href="/open-on/">What’s open today</Link>
      </p>

      <RelatedGuides href="/guides/korea-in-spring/" />

      <p className="meta">
        Festival dates are the 2026 editions as registered with the Korea Tourism Organization and
        reported by the organisers; 2027 dates are set nearer the bloom and are added when announced.
        The 2027 public holidays are from the official almanac published by the Korea Astronomy and
        Space Science Institute; Labour Day became a public holiday under a 2026 amendment to the
        Public Holidays Act. Jongmyo Daeje times are the 2026 programme from the Korea Heritage
        Service. Temperatures are long-run averages for Seoul. Photographs: Korea Tourism
        Organization.
      </p>
    </div>
  );
}
