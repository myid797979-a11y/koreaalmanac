import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Day trips from Seoul: 12 that work without a car',
  description: 'Twelve day trips from Seoul by subway, train or tour, sorted by how far they are: Suwon, Nami Island, the DMZ, Everland, Namhansanseong, Incheon, Yangpyeong and more, and the KTX trips to Gangneung and Jeonju.',
};

type Trip = { name: string; time: string; how: string; what: React.ReactNode };

const NEAR: Trip[] = [
  {
    name: 'Suwon', time: '1 hr', how: 'Subway Line 1',
    what: <>A UNESCO-listed fortress wall you can walk in an afternoon, a rebuilt royal palace, and galbi for dinner. The easiest good day trip there is. <Link href="/guides/suwon-day-trip/">Suwon guide</Link></>,
  },
  {
    name: 'Namhansanseong', time: '1 hr', how: 'Line 8 + bus',
    what: <>A mountain fortress on the south-east edge of the city, another UNESCO site, with a wall-top trail through pine forest and duck and chicken restaurants inside the walls. A half-day walk more than a sightseeing trip.</>,
  },
  {
    name: 'Incheon Chinatown and Wolmido', time: '1 hr', how: 'Subway Line 1',
    what: <>Korea’s only official Chinatown, where jajangmyeon was invented, the painted Fairy Tale Village next door, and the seafront at Wolmido. The end of Line 1, so no changes.</>,
  },
  {
    name: 'Gwangmyeong Cave', time: '45 min', how: 'KTX station + bus',
    what: <>A disused gold mine turned into a lit cave park with an underground wine cellar and aquarium. Good on a rainy or very hot day.</>,
  },
  {
    name: 'Bukhansan', time: '1 hr', how: 'Subway + bus',
    what: <>The granite national park on the city’s northern edge. The climb to Baegundae, the summit, takes about three hours up and needs proper shoes; the views over Seoul are the reward.</>,
  },
  {
    name: 'Yangpyeong', time: '1 hr', how: 'Gyeongui–Jungang Line',
    what: <>Dumulmeori, where the North and South Han rivers meet under an old zelkova tree, famous for morning mist. Flat riverside cycle paths start at Yangsu Station.</>,
  },
];

const FAR: Trip[] = [
  {
    name: 'DMZ', time: '1 hr', how: 'Tour',
    what: <>The border zone north of Seoul: Imjingak, the Third Tunnel and Dora Observatory. Most of it can only be seen on a tour, and you need your passport. <Link href="/guides/dmz-tour-from-seoul/">DMZ guide</Link></>,
  },
  {
    name: 'Nami Island', time: '1–1.5 hr', how: 'ITX train or tour',
    what: <>The tree-lined river island from <em>Winter Sonata</em>, best in October and November. Easy by train on its own; a tour if you want to add the Garden of Morning Calm. <Link href="/guides/nami-island-day-trip/">Nami Island guide</Link></>,
  },
  {
    name: 'Everland', time: '1 hr', how: 'Shuttle bus',
    what: <>Korea’s biggest theme park, with the T Express coaster and a safari. A full day. <Link href="/guides/everland-vs-lotte-world/">Everland or Lotte World?</Link></>,
  },
  {
    name: 'Gangneung', time: '2 hr', how: 'KTX',
    what: <>The east coast by high-speed train: Gyeongpo Beach, the coffee street at Anmok, and the sea. A long day, but the train makes it easy.</>,
  },
  {
    name: 'Jeonju', time: '1 hr 40', how: 'KTX from Yongsan',
    what: <>The largest hanok village in the country, the home of bibimbap, and a street-food market at night. Better as an overnight, but it works as a day.</>,
  },
  {
    name: 'Seoraksan', time: '2.5 hr', how: 'Express bus to Sokcho',
    what: <>The most dramatic mountains in Korea, and the peak of the autumn colour in mid to late October. Tours save a lot of time. <Link href="/guides/autumn-foliage/">Autumn foliage guide</Link></>,
  },
];

function TripTable({ trips }: { trips: Trip[] }) {
  return (
    <table className="facts">
      <tbody>
        {trips.map(t => (
          <tr key={t.name}>
            <th>
              {t.name}
              <br />
              <span className="meta">{t.time} · {t.how}</span>
            </th>
            <td>{t.what}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function DayTrips() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Day trips from Seoul', path: '/guides/day-trips-from-seoul/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/day-trips-from-seoul/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Day trips from Seoul
      </div>

      <h1>Day trips from Seoul: 12 that work without a car</h1>
      <p className="sub">
        Seoul’s subway reaches well beyond the city, and the KTX puts the east coast and Jeonju
        within two hours. These are the day trips that work by public transport or with a
        simple tour, with travel times from central Seoul.
      </p>

      <GuideHero slugs={[
        'suwon-hwaseong-fortress-unesco-world-heritage-264204',
        'nami-island-264244',
        'yangpyeong-dumulmeori-1272552',
      ]} />

      <div className="callout">
        <strong>Choosing</strong>
        <ul>
          <li><strong>First trip to Korea, one free day:</strong> Suwon on your own, or the DMZ on a tour.</li>
          <li><strong>October and November:</strong> Nami Island or Seoraksan for the colour.</li>
          <li><strong>Rain or heat:</strong> Gwangmyeong Cave, or Lotte World inside the city.</li>
          <li><strong>Mondays:</strong> the DMZ and many museums are closed, while Suwon’s wall and Nami stay open.</li>
        </ul>
      </div>

      <h2 className="sect">On the subway, no booking needed</h2>
      <p>Pay with T-money and go when you like. All of these are within about an hour.</p>
      <TripTable trips={NEAR} />
      <PlaceRow slugs={[
        'namhansanseong-provincial-park-unesco-world-heritage-264362',
        'wolmido-island-264305',
        'gwangmyeong-cave-3113166',
      ]} />

      <h2 className="sect">By train, bus or tour</h2>
      <p>
        These need a reserved seat or a tour booking, especially at weekends. Book KTX and ITX
        seats on the Korail app a few days ahead.
      </p>
      <TripTable trips={FAR} />
      <PlaceRow slugs={[
        'gangneung-gyeongpo-beach-264253',
        'jeonju-hanok-village-slow-city-264285',
        'seoraksan-ulsanbawi-rock-264169',
      ]} />

      <BookBox
        offers={GUIDE_OFFERS.dayTrips}
        title="Day tours and rail passes"
        intro="Tours make most sense for the DMZ and for combining several places around Nami. The rail pass pays off if you take two or more KTX trips."
      />

      <h2 className="sect">Practical notes</h2>
      <ul className="tips">
        <li>Travel times are from central Seoul (City Hall or Seoul Station). Add 30 minutes or more from Gangnam or Hongdae for trips north or south of the river.</li>
        <li>Weekend trains and express buses out of Seoul fill up on Friday evenings and Saturday mornings. Coming back on Sunday evening is the slowest part of the trip.</li>
        <li>Around Chuseok and Seollal, everything out of Seoul is booked weeks ahead. See the <Link href="/guides/seollal-2027/">Seollal guide</Link>.</li>
      </ul>

      <p className="strip">
        <Link href="/guides/jeonju-2-days/">2 days in Jeonju</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/busan-2-days/">2 days in Busan</Link>
        <Link href="/guides/gyeongju-2-days/">2 days in Gyeongju</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <RelatedGuides href="/guides/day-trips-from-seoul/" />

      <p className="meta">
        Travel times are typical journeys by the route given and vary with connections and traffic.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
