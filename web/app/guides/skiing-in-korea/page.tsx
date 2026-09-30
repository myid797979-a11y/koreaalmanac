import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Skiing in Korea 2026–27: which resort, how to get there from Seoul, and what it costs',
  description: 'Korea’s ski season runs from early December to mid-March. Yongpyong, High1 and Alpensia for a proper trip; Vivaldi Park, Elysian Gangchon and Gonjiam for a day from Seoul. Shuttle buses, the KTX, day tours with gear, lift and rental prices, and the Seollal week to avoid.',
};

export default function Skiing() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Skiing in Korea', path: '/guides/skiing-in-korea/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/skiing-in-korea/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Skiing in Korea
      </div>

      <h1>Skiing in Korea 2026–27: which resort, and how to get there</h1>
      <p className="sub">
        Korea hosted the 2018 Winter Olympics and has more than a dozen ski resorts, most of them in
        the mountains of Gangwon, two to three hours east of Seoul. The snow is mostly machine-made
        on a cold, dry base; the runs are shorter than in the Alps or Japan, but the resorts are
        well run, cheap to reach, and several are close enough to Seoul for a day trip.
      </p>

      <div className="callout">
        <strong>The short answer</strong>
        <ul>
          <li><strong>One day from Seoul:</strong> Vivaldi Park, Elysian Gangchon or Gonjiam. A day tour with gear and transport is the easiest way.</li>
          <li><strong>A proper ski trip of two nights or more:</strong> Yongpyong or High1, which have the longest runs and slope-side hotels.</li>
          <li><strong>Season:</strong> most resorts open in late November or early December and run to mid-March. Late December to mid-February has the most reliable snow.</li>
          <li><strong>Avoid Seollal week</strong>, 6–9 February 2027, when half of Seoul goes to the mountains. See the <Link href="/guides/seollal-2027/">Seollal guide</Link>.</li>
        </ul>
      </div>

      <h2 className="sect">The resorts</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Yongpyong<br /><span className="meta">Pyeongchang · 2.5 hr</span></th>
            <td>
              The largest and oldest resort, and the 2018 Olympic venue for the technical alpine
              events. A gondola climbs to Dragon Peak for the longest runs; plenty of intermediate
              terrain and slope-side hotels. The best all-round choice for a trip of several days.
            </td>
          </tr>
          <tr>
            <th>High1<br /><span className="meta">Jeongseon · 3 hr</span></th>
            <td>
              High in the southern Gangwon mountains, with long, wide runs from the summit and some
              of the best natural snow in the country. Further from Seoul, so it suits a stay rather
              than a day.
            </td>
          </tr>
          <tr>
            <th>Alpensia<br /><span className="meta">Pyeongchang · 2.5 hr</span></th>
            <td>
              Home of the Olympic ski jumps, next to Yongpyong, with a small, gentle ski area that
              suits beginners and families. Closest resort to the KTX.
            </td>
          </tr>
          <tr>
            <th>Vivaldi Park<br /><span className="meta">Hongcheon · 1.5 hr</span></th>
            <td>
              The most popular resort with day-trippers from Seoul, with lots of beginner slopes,
              ski schools used to foreigners, and a big snow-sledding area. Crowded at weekends.
            </td>
          </tr>
          <tr>
            <th>Elysian Gangchon<br /><span className="meta">Chuncheon · 1 hr 20</span></th>
            <td>
              Small, but the only resort you can reach easily by train: Baegyang-ri Station on the
              Gyeongchun Line and ITX, then a short shuttle. Good for a first try.
            </td>
          </tr>
          <tr>
            <th>Gonjiam<br /><span className="meta">Gwangju, Gyeonggi · 40 min</span></th>
            <td>
              The closest to Seoul, about 40 minutes from Gangnam: well-groomed, more expensive,
              and open into the night for skiing after work.
            </td>
          </tr>
          <tr>
            <th>Muju Deogyusan<br /><span className="meta">Jeonbuk · 3 hr</span></th>
            <td>
              The one big resort in the south, with a very long beginner-friendly run from the top
              of Deogyusan. Worth it if you are coming from Busan or Daejeon.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.ski}
        title="Ski day tours from Seoul"
        intro="Tours bundle the bus, lift ticket, gear and clothing rental, and often a lesson. For a first day on snow in Korea it is the simplest way."
      />

      <h2 className="sect">Getting there</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Resort shuttle buses</th>
            <td>
              Most resorts run winter shuttle buses from Seoul, with pick-ups at stations such as
              Jamsil, Gangnam and Hongdae, bookable online in advance. They are cheap and fill up at
              weekends.
            </td>
          </tr>
          <tr>
            <th>KTX to Pyeongchang</th>
            <td>
              The Gangneung Line reaches <strong>Pyeongchang</strong> and <strong>Jinbu</strong>{' '}
              stations in under two hours from Seoul Station or Cheongnyangni; resort shuttles and
              taxis cover the last stretch to Alpensia and Yongpyong.
            </td>
          </tr>
          <tr>
            <th>Day tours</th>
            <td>
              Leave Seoul around 07:00 and return in the evening, with gear, clothing, lift ticket
              and often a two-hour lesson included. The best value if you have no equipment.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">What it costs</h2>
      <ul className="tips">
        <li><strong>Lift tickets</strong> run roughly ₩80,000–110,000 for a full day at the gate, less for half-days and night sessions. Resorts sell cheaper tickets online and through travel platforms.</li>
        <li><strong>Rental</strong> of skis or a board with boots is around ₩30,000–50,000 a day. Clothing (jacket and trousers) is extra and widely available, including from rental shops on the road outside the resorts, which are usually cheaper than those inside.</li>
        <li><strong>Lessons</strong> in English are available at the bigger resorts and through the day tours; book ahead for weekends.</li>
        <li>Bring your own gloves, goggles and a hat. They are sold at the resorts but at resort prices.</li>
      </ul>

      <h2 className="sect">Good to know</h2>
      <ul className="tips">
        <li><strong>Night skiing</strong> is normal. Many resorts keep slopes open into the late evening, and the night session is often quieter than the afternoon.</li>
        <li><strong>Weekdays</strong> are far quieter than weekends, especially outside the school holidays from late December to February.</li>
        <li>It is cold: January mornings in Pyeongchang are often −15°C or lower. The <Link href="/guides/korea-in-winter/">winter guide</Link> covers what to pack.</li>
        <li>Pair a mountain stay with the east coast. Gangneung and its beaches are 30 minutes beyond Pyeongchang on the KTX.</li>
      </ul>

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.ski}
        title="Where to stay for a ski trip"
        intro="Slope-side at Yongpyong or Alpensia for the full ski days; Gangneung if you want the sea and the city as well."
      />

      <p className="strip">
        <Link href="/guides/korea-in-winter/">Korea in winter</Link>
        <Link href="/guides/christmas-new-year-seoul/">Christmas &amp; New Year in Seoul</Link>
        <Link href="/guides/seollal-2027/">Seollal 2027</Link>
        <Link href="/regions/gangwon/">Everything in Gangwon</Link>
        <Link href="/events/festivals/january/">Korea in January</Link>
      </p>

      <RelatedGuides href="/guides/skiing-in-korea/" />

      <p className="meta">
        Opening dates depend on the weather and snow-making, and prices change each season; check the
        resort’s own site before you travel. Travel times are from central Seoul by road.
      </p>
    </div>
  );
}
