import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: '7 days in Korea: Seoul, Gyeongju and Busan by KTX — a first-timer’s itinerary',
  description: 'A one-week Korea itinerary for a first visit: three days in Seoul, a day trip out, Gyeongju’s Silla tombs and temples, and two days on the coast in Busan, all by high-speed train. With the order that avoids the closing days, what the KTX costs, and variations for autumn, winter and K-pop trips.',
};

export default function SevenDays() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: '7 days in Korea', path: '/guides/korea-7-day-itinerary/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/korea-7-day-itinerary/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › 7 days in Korea
      </div>

      <h1>7 days in Korea: Seoul, Gyeongju and Busan</h1>
      <p className="sub">
        A week is enough to see the three places most first-time visitors want: the capital, the
        ancient Silla capital at Gyeongju, and Busan on the coast. The KTX makes it simple: Seoul to
        Gyeongju is about two hours, Gyeongju to Busan half an hour, and you can fly home from Busan
        or be back in Seoul in under three hours.
      </p>

      <GuideHero slugs={[
        'gyeongbokgung-palace-264337',
        'gyeongju-daereungwon-ancient-tomb-complex-2818690',
        'busan-gamcheon-culture-village-1998211',
      ]} />

      <div className="callout">
        <strong>The shape of the week</strong>
        <ul>
          <li><strong>Days 1–3, Seoul.</strong> Palaces, markets, neighbourhoods. Arrange the days around the palace closing days.</li>
          <li><strong>Day 4, a day out of Seoul.</strong> The DMZ, Suwon or Nami Island.</li>
          <li><strong>Days 5–6, Gyeongju,</strong> with one night there: tombs, temples and the lit pond.</li>
          <li><strong>Day 7, Busan.</strong> Old town and coast, then fly out from Gimhae or take the KTX back to Seoul.</li>
        </ul>
      </div>

      <h2 className="sect">Day by day</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Day 1</th>
            <td>
              Arrive, get connected and settle in. An evening in Myeongdong or Hongdae. See{' '}
              <Link href="/guides/incheon-airport-to-seoul/">Incheon Airport to Seoul</Link> and{' '}
              <Link href="/guides/where-to-stay-in-seoul/">where to stay</Link>.
            </td>
          </tr>
          <tr>
            <th>Days 2–3</th>
            <td>
              The palaces, Bukchon, Insadong and the markets, then the river and a night view. The{' '}
              <Link href="/guides/seoul-3-days/">3 days in Seoul</Link> route is built for this and
              handles the Monday and Tuesday closures.
            </td>
          </tr>
          <tr>
            <th>Day 4</th>
            <td>
              A day trip: the <Link href="/guides/dmz-tour-from-seoul/">DMZ</Link> for history,{' '}
              <Link href="/guides/suwon-day-trip/">Suwon</Link> for the fortress, or{' '}
              <Link href="/guides/nami-island-day-trip/">Nami Island</Link> in autumn. The{' '}
              <Link href="/guides/day-trips-from-seoul/">day trips guide</Link> has twelve to choose from.
            </td>
          </tr>
          <tr>
            <th>Day 5</th>
            <td>
              Morning KTX to Gyeongju, about two hours from Seoul Station. The tombs, Cheomseongdae
              and Hwangnidan-gil on foot, and Donggung Palace and Wolji Pond lit up after dark.
            </td>
          </tr>
          <tr>
            <th>Day 6</th>
            <td>
              Bulguksa and Seokguram in the morning, then the train to Busan in the afternoon. See{' '}
              <Link href="/guides/gyeongju-2-days/">2 days in Gyeongju</Link>.
            </td>
          </tr>
          <tr>
            <th>Day 7</th>
            <td>
              Gamcheon, Jagalchi and the coast at Haeundae or Gwangalli; see{' '}
              <Link href="/guides/busan-2-days/">2 days in Busan</Link>. Add a night here if you can.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.itinerary7}
        title="Trains and data"
        intro="The KR Pass is for foreign passport holders only; on this route it pays off mainly if you add more long train trips."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.itinerary7}
        title="Where to stay along the way"
        intro="Four nights in Seoul, one in Gyeongju, one or two in Busan."
      />

      <h2 className="sect">Variations</h2>
      <ul className="tips">
        <li><strong>Autumn:</strong> swap Day 4 for Seoraksan or Nami Island at the peak of the colour. See the <Link href="/guides/autumn-foliage/">autumn foliage guide</Link>.</li>
        <li><strong>Winter:</strong> replace Day 4 with a ski day. See <Link href="/guides/skiing-in-korea/">skiing in Korea</Link>.</li>
        <li><strong>K-pop trip:</strong> build the Seoul days around the show and check the <Link href="/venues/">venue guide</Link> for where to stay.</li>
        <li><strong>Food and hanok:</strong> swap Gyeongju for <Link href="/guides/jeonju-2-days/">Jeonju</Link>, under two hours from Seoul.</li>
        <li><strong>Ten days:</strong> add Jeju by a one-hour flight. See <Link href="/guides/jeju-3-days/">3 days in Jeju</Link>.</li>
      </ul>

      <h2 className="sect">Practical notes</h2>
      <ul className="tips">
        <li>Book KTX seats on the Korail app a few days ahead; weekend and holiday trains sell out.</li>
        <li>Gyeongju’s KTX station is outside the town centre. Allow 20–30 minutes by bus or taxi.</li>
        <li>Check the festival calendar for your dates in the <Link href="/plan/">Trip Planner</Link>. A lantern festival or fireworks night can be the highlight of the week.</li>
      </ul>

      <p className="strip">
        <Link href="/guides/getting-around-seoul/">Getting around Seoul</Link>
        <Link href="/guides/esim-and-apps-for-korea/">eSIM and apps</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <RelatedGuides href="/guides/korea-7-day-itinerary/" />

      <p className="meta">
        Train times are typical KTX journeys as of September 2026. Photographs: Korea Tourism
        Organization.
      </p>
    </div>
  );
}
