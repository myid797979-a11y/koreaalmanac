import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Everland or Lotte World? Choosing a Seoul theme park, and how to beat the queues',
  description: 'Everland and Lotte World compared honestly: getting there, what each is best at, rain and cold, the paid queue passes, cheaper tickets, the seasonal Halloween and Christmas programmes, and when to go to avoid the school trips.',
};

export default function ThemeParks() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Everland or Lotte World?', path: '/guides/everland-vs-lotte-world/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/everland-vs-lotte-world/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Everland or Lotte World?
      </div>

      <h1>Everland or Lotte World? Choosing a Seoul theme park</h1>
      <p className="sub">
        Seoul has two big theme parks and they are very different days. Everland is a huge
        outdoor resort in the hills of Yongin, an hour out of the city, with Korea’s best
        roller coaster and a safari. Lotte World is mostly indoors, under a glass roof in the
        middle of Seoul, with a subway station at the door. Most visitors only have time for one.
      </p>

      <GuideHero slugs={[
        'everland-264235',
        'lotte-world-264152',
        'lotte-world-tower-seoul-sky-2493015',
      ]} />

      <div className="callout">
        <strong>The short answer</strong>
        <ul>
          <li><strong>Everland</strong> if you want big rides, animals and a full day out, and the weather is good.</li>
          <li><strong>Lotte World</strong> if it is raining, freezing or very hot, if you have half a day, or if you want to add the Seoul Sky observatory next door.</li>
          <li><strong>Buy tickets online in advance.</strong> Resellers such as Klook usually sell below the gate price, with QR entry.</li>
        </ul>
      </div>

      <h2 className="sect">Side by side</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Where</th>
            <td>
              <strong>Everland:</strong> Yongin, Gyeonggi, about an hour south-east of central Seoul.{' '}
              <strong>Lotte World:</strong> Jamsil, south-east Seoul, directly off Jamsil Station
              on subway Lines 2 and 8.
            </td>
          </tr>
          <tr>
            <th>Indoor or outdoor</th>
            <td>
              Everland is almost entirely outdoors and hilly. Lotte World’s main park,{' '}
              <strong>Adventure</strong>, is indoors; <strong>Magic Island</strong> is the outdoor
              section on the lake, reached by a bridge, and some of its rides close in bad weather.
            </td>
          </tr>
          <tr>
            <th>Best for</th>
            <td>
              Everland: <strong>T Express</strong>, one of the steepest wooden coasters in the
              world, the bus safari, and the pandas. Lotte World: a compact day of mid-sized
              rides, parades and the castle, easy with children and in any weather.
            </td>
          </tr>
          <tr>
            <th>Time needed</th>
            <td>
              Everland is a full day once you count the journey. Lotte World works as an
              afternoon and evening, and a cheaper after-4pm ticket is sold for exactly that.
            </td>
          </tr>
          <tr>
            <th>Ticket price</th>
            <td>
              Both charge roughly ₩60,000–70,000 for an adult one-day ticket at the gate, varying
              by date. Online resellers are usually cheaper, and both parks sell discounted
              evening tickets.
            </td>
          </tr>
          <tr>
            <th>Queue passes</th>
            <td>
              Everland sells a limited paid express pass and runs free virtual queuing for some
              rides through its app. Lotte World sells the <strong>Magic Pass</strong>, which
              reserves ride times. Both sell out on busy days, so decide early.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.themeParks}
        title="Theme park tickets"
        intro="Buying ahead is usually cheaper than the gate, and the QR code gets you straight to the turnstile."
      />

      <h2 className="sect">Everland: getting there and the day</h2>
      <p>
        The simplest way from central Seoul is a <strong>direct shuttle bus</strong> from Hongdae,
        Myeongdong or Dongdaemun, which must be booked ahead. By public transport, take the
        Suin–Bundang Line to Giheung, change to the Everland Line light rail to Jeondae–Everland,
        and ride the free shuttle bus up to the gate. That takes about 90 minutes from Gangnam.
      </p>
      <p>
        Go straight to <strong>T Express</strong> and the <strong>Safari World</strong> bus at
        opening, before the queues build, then spend the middle of the day in the garden and the
        smaller zones. The <strong>panda house</strong> is included in the ticket; timed entry
        applies on busy days. The park is famous for its seasonal gardens, with tulips in spring
        and roses in early summer. In summer the water park next door,{' '}
        <strong>Caribbean Bay</strong>, needs its own ticket.
      </p>
      <PlaceRow slugs={[
        'caribbean-bay-264361',
      ]} />

      <h2 className="sect">Lotte World: getting there and the day</h2>
      <p>
        Take subway Line 2 or 8 to <strong>Jamsil</strong> and follow the signs underground. The
        indoor park is on several floors around a central ice rink, and the parades run through it
        in the afternoon and evening. Magic Island, the outdoor part with the tallest drops, sits
        on Seokchon Lake and is prettiest at night.
      </p>
      <p>
        Lotte World is part of a larger complex. The <Link href="/place/lotte-world-aquarium-2482037/">aquarium</Link>{' '}
        and the <strong>Seoul Sky</strong> observatory in Lotte World Tower are a five-minute walk
        away, and many visitors do the park in the afternoon and the tower after dark. The lake
        walk around Seokchon is free and lovely in cherry blossom season.
      </p>
      <PlaceRow slugs={[
        'lotte-world-aquarium-2482037',
        'songpa-naru-park-seokchonhosu-lake-1542646',
      ]} />

      <h2 className="sect">When to go</h2>
      <ul className="tips">
        <li><strong>Weekdays in term time</strong> are quietest, with one catch. In April–May and September–October, school trips fill both parks on weekday mornings. They thin out after about 3pm.</li>
        <li><strong>Weekends and public holidays</strong> are the busiest days. Chuseok and Children’s Day on 5 May are the worst.</li>
        <li><strong>Halloween season</strong>, from September into early November, is when both parks are at their most fun and most crowded. See the <Link href="/guides/halloween-seoul-2026/">Halloween in Seoul guide</Link>.</li>
        <li><strong>Winter</strong> belongs to Lotte World. Everland stays open and runs Christmas events, but its outdoor queues are bitterly cold in January.</li>
        <li><strong>The rainy season</strong> from late June to July also favours Lotte World.</li>
      </ul>

      <h2 className="sect">The other parks</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Legoland Korea</th>
            <td>
              On an island in Chuncheon, Gangwon, for families with children under about 12. It
              pairs with a <Link href="/guides/nami-island-day-trip/">Nami Island day</Link> in the
              same area.
            </td>
          </tr>
          <tr>
            <th>Seoul Land</th>
            <td>
              An older, smaller and cheaper park in Gwacheon, next to{' '}
              <Link href="/place/seoul-grand-park-264199/">Seoul Grand Park</Link> and its zoo, on
              subway Line 4.
            </td>
          </tr>
          <tr>
            <th>Lotte World Adventure Busan</th>
            <td>
              An outdoor sister park on the coast north of Haeundae, if you are in Busan rather than
              Seoul.
            </td>
          </tr>
        </tbody>
      </table>

      <p className="strip">
        <Link href="/guides/halloween-seoul-2026/">Halloween in Seoul</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/suwon-day-trip/">Suwon day trip</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <RelatedGuides href="/guides/everland-vs-lotte-world/" />

      <p className="meta">
        Prices, queue systems and opening hours are as published by Everland and Lotte World up to
        September 2026 and change by season and date. Check the park’s own site for the day you
        go. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
