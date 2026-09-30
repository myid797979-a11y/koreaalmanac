import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, Stop, DayHead, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Suwon day trip from Seoul — Hwaseong Fortress, the palace and the walls at night',
  description: 'A day at Suwon Hwaseong, the UNESCO-listed fortress an hour south of Seoul by subway: which way round the 5.7 km wall, the palace martial-arts show, the trolley, Suwon galbi and chicken street, and the October festival.',
};

export default function SuwonDayTrip() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Suwon day trip', path: '/guides/suwon-day-trip/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/suwon-day-trip/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Suwon day trip
      </div>

      <h1>A day trip to Suwon: Hwaseong Fortress and the palace</h1>
      <p className="sub">
        Suwon is a city of a million people an hour south of Seoul on the subway, and at its
        centre is Hwaseong: a 5.7 km ring of stone walls, gates and watchtowers built in the 1790s
        by King Jeongjo, and a UNESCO World Heritage Site since 1997. You can walk the whole wall
        in an afternoon, most of it is free, and it needs no tour. It is the easiest good day trip
        from Seoul.
      </p>

      <GuideHero slugs={[
        'suwon-hwaseong-fortress-unesco-world-heritage-264204',
        'temporary-palace-at-hwaseong-fortress-hwaseong-haenggung-pal-264410',
        'banghwasuryujeong-pavilion-2617703',
      ]} />

      <div className="callout">
        <strong>This October</strong>
        <ul>
          <li>The <Link href="/festival/suwon-hwaseong-festival-978249/">Suwon Hwaseong Festival</Link> runs <strong>4–11 October 2026</strong>, with the re-enactment of King Jeongjo’s royal procession as its centrepiece.</li>
          <li>The <Link href="/festival/hwaseong-haenggung-palace-night-opening-2026-2657619/">Haenggung night opening</Link> continues on selected evenings until <strong>1 November</strong>.</li>
          <li>Festival week is also the busiest week of the year here. Go on a weekday if you want the walls to yourself.</li>
        </ul>
      </div>

      <h2 className="sect">Getting there and around</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>From Seoul</th>
            <td>
              <strong>Subway Line 1</strong> from Seoul Station or Jonggak to Suwon Station, about
              an hour, on T-money. Korail trains from Seoul Station take 30–40 minutes and cost a
              little more. The Sinbundang Line serves Gangnam.
            </td>
          </tr>
          <tr>
            <th>Suwon Station to the fortress</th>
            <td>
              Paldalmun, the south gate, is about 2 km from the station. Most buses heading up the
              main road stop there in 15 minutes; a taxi is around ₩6,000.
            </td>
          </tr>
          <tr>
            <th>Tickets</th>
            <td>
              The wall walk is a small fee of about <strong>₩1,000</strong>, paid at the booths by the main
              gates, and Hwaseong Haenggung is ₩1,500 for adults, free if you wear hanbok. Much of the wall and the streets around
              it are open at all hours and free.
            </td>
          </tr>
          <tr>
            <th>Hwaseong trolley</th>
            <td>
              A small dragon-headed road train loops from Yeonmudae to Paldalsan, saving the
              steepest climb. Tickets are timed and sell out at weekends. <strong>No service on
              Mondays.</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <DayHead
        day="The day"
        title="The palace, the wall, and the lights after dark"
        sub="Start at the palace in the morning, walk the wall anticlockwise, and finish by the pond when it is lit."
        avoid="Mondays if you want the trolley and the museum; they are closed"
      />

      <ol className="g-timeline">
        <Stop
          slug="temporary-palace-at-hwaseong-fortress-hwaseong-haenggung-pal-264410"
          time="10:00"
          title="Hwaseong Haenggung"
        >
          <p>
            The palace Jeongjo built to stay in on his visits to his father’s tomb, rebuilt after
            it was almost entirely destroyed in the 20th century. The courtyards are the setting
            of the royal procession and of the <strong>martial-arts demonstration</strong> held
            most mornings except Mondays; check the time at the gate.
          </p>
          <p className="meta">
            Hanbok rental shops line the streets outside, and hanbok wearers are often admitted
            free.
          </p>
        </Stop>

        <Stop
          slug="paldalmun-gate-264387"
          time="12:00"
          title="Paldalmun and the climb to Seonamdae"
          walk="600 m"
        >
          <p>
            The south gate stands in a traffic circle in the middle of the city. From here the wall
            climbs steeply up Paldalsan to the western command post, with the best view over the
            whole fortress. This is the hard part of the walk; do it first while you are fresh.
          </p>
        </Stop>

        <Stop time="13:00" title="The west and north wall to Janganmun" walk="about 2 km">
          <p>
            Downhill along the ridge past Hwaseomun to Janganmun, the north gate and the largest
            in Korea. Lunch in the streets just inside the gate, or carry on and eat later.
          </p>
        </Stop>

        <Stop
          slug="hwahongmun-gate-264395"
          time="14:30"
          title="Hwahongmun and Banghwasuryujeong"
          walk="600 m"
        >
          <p>
            The seven-arched water gate where the stream passes through the wall, and just above
            it <Link href="/place/banghwasuryujeong-pavilion-2617703/">Banghwasuryujeong</Link>,
            a pavilion over the lotus pond that is the prettiest building in the fortress. Come
            back here at dusk if you can. The pond is lit and it is the photograph of Suwon.
          </p>
        </Stop>

        <Stop time="15:00" title="Yeonmudae and the east wall" walk="700 m">
          <p>
            The training ground on the flat east side, where the <strong>traditional archery</strong>{' '}
            experience lets you shoot ten arrows for a few thousand won. The trolley starts here if
            your legs have had enough.
          </p>
        </Stop>

        <Stop
          slug="suwon-chicken-street-3010849"
          time="18:00"
          title="Dinner: galbi or chicken"
          walk="bus or taxi"
        >
          <p>
            Suwon is famous for two things to eat. <strong>Suwon galbi</strong> is beef short rib
            in huge salted cuts, grilled at the table; <Link href="/place/bonsuwon-galbi-1327063/">Bonsuwon
            Galbi</Link> is the best known. Cheaper and louder is <strong>Chicken Street</strong>{' '}
            by Paldalmun, where the fried chicken is still cooked whole in big iron pans.
          </p>
        </Stop>
      </ol>

      <BookBox
        offers={GUIDE_OFFERS.suwon}
        title="Tours and tickets"
        intro="You do not need a tour for Suwon. They help if you want Korean Folk Village on the same day, which is 20 km away."
      />

      <h2 className="sect">If you have more time</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Korean Folk Village</th>
            <td>
              A large open-air museum of traditional houses in Yongin, used as a set for many
              historical dramas, with farming shows, tightrope walking and horseback martial arts
              through the day. About 40 minutes by bus from Suwon Station. Open into the evening
              on Fridays and weekends.
            </td>
          </tr>
          <tr>
            <th>Haenggung-dong</th>
            <td>
              The streets between the palace and the north wall, full of workshops, cafés and
              murals. A good place to wait for the lights to come on.
            </td>
          </tr>
          <tr>
            <th>Suwon Hwaseong Museum</th>
            <td>
              A small museum by the fortress on how it was built, from the royal building record
              that let it be reconstructed exactly. Closed on Mondays.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'korean-folk-village-264121',
        'haenggung-dong-mural-village-3093062',
        'suwon-hwaseong-museum-2027261',
      ]} />

      <h2 className="sect">Practical notes</h2>
      <ul className="tips">
        <li>Wear walking shoes. The Paldalsan section is steep stone steps, and the full loop is 5.7 km with climbs.</li>
        <li>There is little shade on the wall. In summer, start early or walk it in the evening.</li>
        <li>Suwon works as a stop on the way south as well as a day trip. KTX trains to Busan and the south call at Suwon and nearby Gwangmyeong.</li>
      </ul>

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.suwon}
        title="Where to stay"
        intro="Most people come for the day. Stay over for festival week or to walk the walls lit up at night."
      />

      <p className="strip">
        <Link href="/guides/day-trips-from-seoul/">More day trips from Seoul</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/nami-island-day-trip/">Nami Island day trip</Link>
        <Link href="/guides/dmz-tour-from-seoul/">DMZ tour from Seoul</Link>
        <Link href="/events/festivals/gyeonggi/">Festivals in Gyeonggi</Link>
        <Link href="/regions/gyeonggi/">Everything in Gyeonggi</Link>
      </p>

      <RelatedGuides href="/guides/suwon-day-trip/" />

      <p className="meta">
        Admission, performance times and trolley schedules are as published by the Suwon Cultural
        Foundation up to September 2026 and change with the season and festival programme. Check on
        the day. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
