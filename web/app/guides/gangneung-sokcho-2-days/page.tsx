import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, Stop, DayHead, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: '2 days on Korea’s east coast: Gangneung and Sokcho, with Seoraksan',
  description: 'Gangneung and Sokcho in two days from Seoul: the KTX to Gangneung, Gyeongpo Beach and the Anmok coffee street, Ojukheon, soft tofu in Chodang, then Sokcho’s fish market and the Seoraksan cable car, and the express bus home.',
};

export default function EastCoast() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Gangneung and Sokcho in 2 days', path: '/guides/gangneung-sokcho-2-days/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/gangneung-sokcho-2-days/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Gangneung and Sokcho in 2 days
      </div>

      <h1>2 days on the east coast: Gangneung and Sokcho</h1>
      <p className="sub">
        The east coast is where Seoul goes for the sea: long pale beaches, clear water, seafood
        markets and, behind Sokcho, the granite peaks of Seoraksan. Since the KTX reached Gangneung
        for the 2018 Olympics it is under two hours away. Two days lets you do the town and the
        mountain without rushing.
      </p>

      <GuideHero slugs={[
        'gangneung-gyeongpo-beach-264253',
        'seoraksan-ulsanbawi-rock-264169',
        'sokcho-beach-264130',
      ]} />

      <div className="callout">
        <strong>Getting there and between</strong>
        <ul>
          <li><strong>KTX</strong> from Seoul Station or Cheongnyangni to Gangneung, about 1 hour 50 minutes.</li>
          <li><strong>Gangneung to Sokcho</strong> is about an hour by intercity bus up the coast.</li>
          <li><strong>Back to Seoul</strong> from Sokcho by express bus, about 2 hours 30 minutes. There is no train yet.</li>
        </ul>
      </div>

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.eastCoast}
        title="Where to stay"
        intro="One night in either town works; Sokcho is the better base if Seoraksan is the priority, and it fills up on peak foliage weekends."
      />

      <DayHead
        day="Day 1"
        title="Gangneung: the lake, the coffee coast and tofu"
        sub="Morning train, the old house of a famous mother and son, the beach, and coffee by the sea."
      />

      <ol className="g-timeline">
        <Stop slug="ojukheon-house-264191" time="10:30" title="Ojukheon">
          <p>
            The birthplace of the scholar Yi I and his mother Shin Saimdang, who appear on the
            ₩5,000 and ₩50,000 notes. A small, elegant compound with black bamboo and a museum.
          </p>
        </Stop>

        <Stop slug="gangneung-jjamppong-sundubu-donghwa-garden-2693549" time="12:30" title="Lunch in Chodang" walk="taxi 10 min">
          <p>
            Chodang village is famous for sundubu, soft tofu made with seawater. The spicy
            jjamppong-style version here draws long queues; the plain white tofu is the traditional one.
          </p>
        </Stop>

        <Stop slug="gangneung-gyeongpo-beach-264253" time="14:00" title="Gyeongpo Lake and Beach" walk="15 min walk">
          <p>
            A lake lined with cherry trees and a pavilion, then one of the longest beaches on the
            coast. Rent a bicycle and ride round the lake.
          </p>
        </Stop>

        <Stop slug="gangneung-coffee-street-2475947" time="16:30" title="Anmok coffee street" walk="taxi 15 min">
          <p>
            A strip of cafés facing the sea that made Gangneung Korea’s coffee town, with a coffee
            festival every autumn. Stay for the sunset over the water.
          </p>
        </Stop>
      </ol>

      <DayHead
        day="Day 2"
        title="Sokcho and Seoraksan"
        sub="Early bus up the coast, the cable car before the queues, and the fish market for lunch."
        avoid="arriving at the cable car after 10:00 on autumn weekends"
      />

      <ol className="g-timeline">
        <Stop slug="seoraksan-gwongeumseong-fortress-264248" time="08:30" title="Seoraksan cable car" walk="bus 1 hr + local bus">
          <p>
            The cable car from Sogongwon climbs to the ruined Gwongeumseong fortress for a view over
            the peaks and down to the sea. Tickets are timed and sell out on busy days; go first
            thing. Sinheungsa temple and its giant bronze Buddha are at the foot of the path.
          </p>
        </Stop>

        <Stop slug="sokcho-tourist-fishery-market-formerly-jungang-market-1955432" time="12:30" title="Sokcho fish market" walk="bus 30 min">
          <p>
            The old central market, known for dakgangjeong (sweet crispy fried chicken to take
            away) and fresh seafood you pick downstairs and have cooked upstairs.
          </p>
        </Stop>

        <Stop slug="sokcho-beach-264130" time="15:00" title="Sokcho Beach and the Sokcho Eye" walk="taxi 10 min">
          <p>
            A walk along the beach under the Sokcho Eye Ferris wheel, then the express bus back to
            Seoul from the terminal, about two and a half hours.
          </p>
        </Stop>
      </ol>

      <BookBox
        offers={GUIDE_OFFERS.eastCoast}
        title="Tours and trains"
        intro="The Seoraksan tours from Seoul handle the cable-car timing for you; the rail pass helps if you are travelling on elsewhere."
      />

      <h2 className="sect">If you have more time</h2>
      <ul className="tips">
        <li><strong>Jumunjin</strong>, north of Gangneung, has the fish port and the breakwater from a famous drama scene.</li>
        <li><strong>Jeongdongjin</strong>, south of Gangneung, is the sunrise spot, with a station right on the beach.</li>
        <li><strong>Yangyang</strong>, between the two, is Korea’s surf coast.</li>
        <li>In winter, pair the coast with a ski day at Yongpyong or Alpensia. See <Link href="/guides/skiing-in-korea/">skiing in Korea</Link>.</li>
      </ul>
      <PlaceRow slugs={[
        'jumunjin-port-1761433',
        'jeongdongjin-time-museum-1064021',
        'yangyang-dongho-beach-2713494',
      ]} />

      <p className="strip">
        <Link href="/guides/autumn-foliage/">Autumn foliage</Link>
        <Link href="/guides/day-trips-from-seoul/">Day trips from Seoul</Link>
        <Link href="/guides/dmz-tour-from-seoul/">Goseong and the DMZ</Link>
        <Link href="/regions/gangwon/">Everything in Gangwon</Link>
      </p>

      <RelatedGuides href="/guides/gangneung-sokcho-2-days/" />

      <p className="meta">
        Train and bus times are typical as of September 2026. The Seoraksan cable car closes in high
        wind. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
