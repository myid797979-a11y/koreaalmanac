import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import { GuideHero, Stop, DayHead, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Nami Island day trip from Seoul — by train or by tour, and what to pair it with',
  description: 'Getting to Nami Island on your own by ITX or subway, versus the Nami–Petite France–Garden of Morning Calm coach tour. The ferry and zip wire, when the island is at its best, and why the tour is the easier way to see more than one place.',
};

export default function NamiIsland() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Nami Island day trip', path: '/guides/nami-island-day-trip/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/nami-island-day-trip/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Nami Island day trip
      </div>

      <h1>A day trip to Nami Island from Seoul</h1>
      <p className="sub">
        Nami is a half-moon island in the North Han River, about 60 km east of Seoul, planted with
        long avenues of metasequoia, ginkgo and pine. It became famous abroad as a filming location
        for the 2002 drama <em>Winter Sonata</em> and has been one of the most visited places
        outside Seoul ever since. It is an easy day on your own by train. The question is what
        else you want to see, because the other places people pair it with are far apart and
        barely served by public transport.
      </p>

      <GuideHero slugs={[
        'nami-island-264244',
        'the-garden-of-morning-calm-264212',
        'petite-france-815994',
      ]} />

      <div className="callout">
        <strong>The short answer</strong>
        <ul>
          <li><strong>Nami Island only:</strong> go on your own by train. It is cheaper and you choose the hours.</li>
          <li><strong>Nami plus Petite France, the Garden of Morning Calm or Alpaca World:</strong> take a coach tour. The sites are 10–40 km apart and the buses between them are slow and infrequent.</li>
          <li><strong>Go on a weekday</strong> if you can. Weekend ferries from late morning onward mean queues, and the island feels a lot smaller.</li>
        </ul>
      </div>

      <h2 className="sect">Getting there on your own</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>ITX-Cheongchun train</th>
            <td>
              From Yongsan or Cheongnyangni to <strong>Gapyeong</strong>, about an hour on the
              fast service. Seats are reserved and sell out on autumn weekends, so book on the
              Korail app or site a few days ahead.
            </td>
          </tr>
          <tr>
            <th>Gyeongchun Line subway</th>
            <td>
              The same line as the ITX, stopping everywhere, about 90 minutes from Sangbong or
              Cheongnyangni. Pay with T-money, no booking.
            </td>
          </tr>
          <tr>
            <th>Gapyeong Station to the pier</th>
            <td>
              Gapyeong Wharf (Gapyeongnaru) is about 3 km from the station. A taxi is five minutes
              and roughly ₩5,000. The Gapyeong City Tour hop-on bus also stops at both.
            </td>
          </tr>
          <tr>
            <th>Direct shuttle from Seoul</th>
            <td>
              A daily shuttle bus runs from central Seoul (Insadong) to the pier. It must be booked
              in advance and fills on weekends.
            </td>
          </tr>
          <tr>
            <th>Ferry or zip wire</th>
            <td>
              The ferry runs every 10–20 minutes through the day and takes five. Admission to the
              island includes the return crossing, around ₩16,000 for an adult. The alternative
              way over is the <strong>zip wire</strong> from a tower by the pier, 940 m across the
              water, which includes the ferry back. Book it early in the day at weekends.
            </td>
          </tr>
        </tbody>
      </table>

      <DayHead
        day="The day"
        title="Nami on your own, with Chuncheon for dinner"
        sub="Early train out, the island before the crowds, and dakgalbi in Chuncheon 20 minutes up the line."
        avoid="arriving at the pier after 11:00 on a Saturday or Sunday"
      />

      <ol className="g-timeline">
        <Stop time="08:00" title="Train to Gapyeong">
          <p>
            Take an ITX from Yongsan or Cheongnyangni, or the subway earlier. The first ferries run
            from 08:00 and the island is at its quietest before ten.
          </p>
        </Stop>

        <Stop slug="nami-island-264244" time="09:30" title="Nami Island" walk="taxi 5 min + ferry">
          <p>
            Allow <strong>three to four hours</strong>. The metasequoia lane and the ginkgo avenue
            are the photographs everyone wants; the riverside path around the edge is quieter and
            takes about an hour. Bicycles and tandems are for hire on the island, and there are
            cafés and places to eat near the central lawn.
          </p>
          <p className="meta">
            The island treats itself as a tiny country, the “Naminara Republic”, with its own
            passport stamp at the pier. It is a theme, not a formality. Your normal passport is
            not checked.
          </p>
        </Stop>

        <Stop time="14:00" title="Back to Gapyeong, then Chuncheon">
          <p>
            Chuncheon is 20 minutes further along the same line. It is the city of{' '}
            <strong>dakgalbi</strong>, spicy chicken stir-fried at the table, and the street that
            made it famous is a short walk from the centre. With an hour to spare, the{' '}
            <Link href="/place/chuncheon-samaksan-mountain-lake-cable-car-2971541/">Samaksan lake cable car</Link>{' '}
            crosses Uiam Lake on the edge of the city.
          </p>
        </Stop>

        <Stop
          slug="chuncheon-myeongdong-dakgalbi-street-264433"
          time="16:00"
          title="Myeongdong Dakgalbi Street"
          walk="ITX 20 min"
        >
          <p>
            A lane of dakgalbi restaurants in central Chuncheon. Most portions start at two people;
            finish with fried rice made in the same pan. From Chuncheon the ITX back to Seoul takes
            about 70 minutes.
          </p>
        </Stop>
      </ol>

      <h2 className="sect">What tours add</h2>
      <p>
        The standard coach tour from Seoul does Nami Island with one or two of the places below,
        with hotel or station pick-up and the island ticket included. It is the only practical
        way to fit more than one of them into a day without a car.
      </p>
      <table className="facts">
        <tbody>
          <tr>
            <th>Petite France</th>
            <td>
              A small hillside village of pastel buildings built around <em>The Little Prince</em>,
              about 10 km from Nami. It is short, colourful and much photographed; it is also the
              stop people are least sorry to skip.
            </td>
          </tr>
          <tr>
            <th>Garden of Morning Calm</th>
            <td>
              A private arboretum in the hills 30 km away, with twenty themed gardens that change
              completely through the year. From December to March it becomes the{' '}
              <strong>Lighting Festival</strong>, open late into the evening, and the evening tours
              are the best way to see it.
            </td>
          </tr>
          <tr>
            <th>Alpaca World</th>
            <td>
              A farm in the hills of Hongcheon where you walk with alpacas. Children love it; it
              is an hour further east and realistically tour-only.
            </td>
          </tr>
          <tr>
            <th>Rail bike</th>
            <td>
              Pedal carts on a disused section of the old Gyeongchun Line near Gangchon, often
              bundled into the same tours. Booked in timed slots.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'alpaca-world-2813153',
        'chuncheon-samaksan-mountain-lake-cable-car-2971541',
      ]} />

      <BookBox
        offers={GUIDE_OFFERS.nami}
        title="Nami Island tours from Seoul"
        intro="The coach tours are the practical way to add Petite France, the Garden of Morning Calm or Alpaca World to the same day."
      />

      <h2 className="sect">When it is at its best</h2>
      <ul className="tips">
        <li><strong>Mid-October to early November</strong> is the peak: the ginkgo avenue turns gold and the metasequoias go rust-red. It is also the most crowded time, so a weekday matters most then. See the <Link href="/guides/autumn-foliage/">autumn foliage guide</Link> for the wider picture.</li>
        <li><strong>Spring</strong> brings cherry blossom along the riverbanks in mid-April, a week or so later than Seoul.</li>
        <li><strong>Winter</strong> is cold and bare but quiet, and snow on the tree lanes is the classic <em>Winter Sonata</em> image. Pair it with the Morning Calm lights in the evening.</li>
        <li><strong>Summer</strong> is green and humid, with the water sports on the river at Gapyeong.</li>
      </ul>

      <h2 className="sect">Staying the night</h2>
      <p>
        Gapyeong is a place of riverside pensions and glamping, most of which assume you arrive by
        car. Without one, <strong>Chuncheon</strong> is the easier base: a real city with hotels
        near the station, twenty minutes from Gapyeong by train.
      </p>
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.nami}
        title="Where to stay"
        intro="Only worth it if you want Nami at opening time or the Morning Calm lights without a late coach back."
      />

      <p className="strip">
        <Link href="/guides/day-trips-from-seoul/">More day trips from Seoul</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/dmz-tour-from-seoul/">DMZ tour from Seoul</Link>
        <Link href="/guides/suwon-day-trip/">Suwon day trip</Link>
        <Link href="/regions/gangwon/">Everything in Gangwon</Link>
        <Link href="/regions/gyeonggi/">Everything in Gyeonggi</Link>
      </p>

      <p className="meta">
        Admission, ferry times and shuttle arrangements are as published by Nami Island and Korail up
        to September 2026 and change with the season. Check the island’s site before you travel.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
