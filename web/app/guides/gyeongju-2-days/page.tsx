import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import { GuideHero, Stop, DayHead, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: '2 Days in Gyeongju — the Silla capital, mostly free and mostly on foot',
  description: 'Gyeongju’s headline sites stopped charging in 2023 and most guides never updated. A 2-day route: downtown on foot, Bulguksa and Seokguram by bus.',
};

export default function GyeongjuTwoDays() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: '2 Days in Gyeongju', path: '/guides/gyeongju-2-days/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/gyeongju-2-days/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › 2 Days in Gyeongju
      </div>

      <h1>2 days in Gyeongju, where the tickets stopped in 2023</h1>
      <p className="sub">
        Gyeongju was the capital of Silla for close to a thousand years, and the tombs of its
        kings are still sitting in the middle of the modern town — grass mounds the size of
        small hills, with a coffee street running along one edge. It is usually described as a
        museum without walls. What almost no English guide has caught up with is that{' '}
        <strong>most of it is now free</strong>.
      </p>

      <GuideHero slugs={[
        'gyeongju-daereungwon-ancient-tomb-complex-2818690',
        'gyeongju-bulguksa-temple-unesco-world-heritage-264261',
        'donggung-palace-and-wolji-pond-264367',
      ]} />

      <div className="callout callout-warn">
        <strong>Three things that are wrong in most published guides.</strong>
        <ul>
          <li>
            <strong>Bulguksa, Seokguram, Daereungwon and Cheomseongdae no longer charge
            admission.</strong> Sixty-five temples holding state-designated heritage dropped
            their fees on <strong>4 May 2023</strong>, and Gyeongju city dropped
            Daereungwon&apos;s ₩3,000 ticket on the same day. Guides still quoting ₩5,000 or
            ₩6,000 are three years out of date.
          </li>
          <li>
            <strong>The bus up to Seokguram runs once an hour.</strong> Bus 12 leaves from
            across the Bulguksa car park at roughly <strong>40 minutes past the hour</strong>.
            Miss it and the next one is an hour away, on a mountain with nothing to do at the
            stop.
          </li>
          <li>
            <strong>Gyeongju has no closing day.</strong> After Seoul, where every palace shuts
            on a different weekday, this is worth saying plainly: the sites below open every day
            of the year, including Mondays and Tuesdays.
          </li>
        </ul>
      </div>

      <h2 className="sect">Getting there, and getting around</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>From Seoul</th>
            <td>
              KTX from Seoul Station, about <strong>2 hours 15 minutes</strong>. Note the
              station: the old town-centre station closed in 2021 and all KTX services now use{' '}
              <strong>Gyeongju Station</strong> (the former Singyeongju), which is{' '}
              <strong>8.2 km outside the centre</strong>. Budget 20 minutes and a bus or taxi on
              each end — it is not a walk.
            </td>
          </tr>
          <tr>
            <th>From Busan</th>
            <td>
              Close enough to do as a day trip, and many people do. The night at Donggung Palace
              below is the argument for staying over instead.
            </td>
          </tr>
          <tr>
            <th>Getting around town</th>
            <td>
              <strong>Walk.</strong> The measured distances between Day 1&apos;s stops are 200 m
              to 900 m — Daereungwon to Hwangnidan Street is <strong>200 m</strong>,
              Cheomseongdae to the Wolseong palace site is <strong>630 m</strong>, and Wolseong
              to Donggung Palace is <strong>450 m</strong>. The whole of Day 1 is about 3 km of
              walking spread over a day.
            </td>
          </tr>
          <tr>
            <th>Bicycles</th>
            <td>
              Gyeongju is flat and rents bicycles everywhere — there are shops by the bus
              terminal and around Daereungwon. The city&apos;s public scheme, Tashilla, is
              app-based and set up for Korean phone numbers, so a shop rental is the simpler
              option for visitors.
            </td>
          </tr>
          <tr>
            <th>Getting to Bulguksa</th>
            <td>
              Bulguksa is <strong>11.4 km</strong> from the tombs — the one part of Gyeongju you
              cannot walk to. City buses <strong>10, 11, 700 and 711</strong> run there from
              downtown, about 40 minutes.
            </td>
          </tr>
        </tbody>
      </table>
      <BookBox
        offers={GUIDE_OFFERS.gyeongju}
        title="Book ahead"
        intro="If Gyeongju is one stop of several, the rail pass usually pays for itself on the Seoul–Gyeongju–Busan triangle alone."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.gyeongju}
        title="Where to stay"
        intro="Two nights in town is the point of this guide; Busan is the alternative if Gyeongju is full."
      />

      <DayHead
        day="Day 1"
        title="The old capital, on foot"
        sub="Tombs, an observatory, a palace site and a pond — all within 2 km, finishing after dark."
      />

      <ol className="g-timeline">
        <Stop
          slug="gyeongju-daereungwon-ancient-tomb-complex-2818690"
          time="09:00"
          title="Daereungwon Tomb Complex"
        >
          <p>
            Twenty-three royal tombs of the Silla kings, grassed over into smooth green mounds
            up to twenty metres high, with paths winding between them. It reads as a park until
            you register the scale of what you are walking around.{' '}
            <strong>Free since May 2023</strong> — the ₩3,000 gate is gone.
          </p>
          <p>
            The exception:{' '}
            <Link href="/place/cheonmachong-tomb-daereungwon-ancient-tombs-264117/">Cheonmachong</Link>,
            the one tomb that has been excavated and opened up so you can walk inside, still
            charges separately. It is worth it — the grave goods found here included a gold
            crown and the birch-bark saddle flap painted with a white horse that gives the tomb
            its name.
          </p>
          <p className="meta">
            Go early. This is the most photographed spot in the city and the light is better
            before the coach groups arrive.
          </p>
        </Stop>

        <Stop
          slug="gyeongju-hwangnidan-street-2992224"
          time="10:30"
          title="Hwangnidan Street"
          walk="200 m"
        >
          <p>
            A lane of single-storey traditional houses converted into cafés, dessert shops and
            hanbok rentals, running right along the tomb park&apos;s edge. The name is a joke —
            Hwangnam-dong crossed with Seoul&apos;s Gyeongnidan-gil — and it is the reason
            Gyeongju now reads as a weekend city rather than a school-trip stop.
          </p>
          <p>
            It is also where the <strong>hanbok rental</strong> shops are, if you want the
            photographs. Unlike Seoul, there is no palace discount to chase here; nothing you
            are visiting today charges anything to begin with.
          </p>
        </Stop>

        <Stop
          slug="hwangnambbang-2992462"
          time="11:30"
          title="Hwangnam-bbang"
          walk="300 m"
        >
          <p>
            A thin pastry filled almost entirely with red bean paste, made in Gyeongju since
            1939 and still sold from the original shop. Expect a queue and a box rather than a
            café — most people buy ten to take home. It is the one food souvenir the city is
            actually known for.
          </p>
        </Stop>

        <Stop
          slug="cheomseongdae-observatory-264256"
          time="13:00"
          title="Cheomseongdae"
          walk="850 m"
        >
          <p>
            A 9-metre bottle-shaped tower of cut granite, built in the 630s under Queen Seondeok
            and generally called the oldest surviving astronomical observatory in East Asia. It
            is small, it is out in the open, and it takes ten minutes — but it has stood on that
            spot for fourteen centuries without being rebuilt, which is rarer in Korea than
            people realise.
          </p>
          <p className="meta">
            Free, in open parkland, and lit at night — worth passing again on the way back from
            dinner.
          </p>
        </Stop>

        <Stop
          slug="gyeongju-wolseong-palace-site-banwolseong-fortress-264632"
          time="15:00"
          title="Wolseong Palace Site"
          walk="630 m"
        >
          <p>
            The Silla royal palace stood here for most of the dynasty. What survives is the
            earthwork — a long crescent ridge, which is what <em>banwolseong</em>, half-moon
            fortress, means — with excavation still going on across the flats. There is not much
            to see in the conventional sense, and that is rather the point: you are walking
            across the floor of a palace.
          </p>
        </Stop>

        <Stop
          slug="donggung-palace-and-wolji-pond-264367"
          time="17:00"
          title="Donggung Palace and Wolji Pond"
          walk="450 m"
        >
          <p>
            <strong>This is why you stay the night.</strong> The Silla crown prince&apos;s
            secondary palace, with reconstructed halls set around an artificial pond dug so that
            no single viewpoint shows you the whole of it. After dark the halls are lit and the
            reflection doubles them.
          </p>
          <p>
            <strong>Open 09:00 to 22:00, last entry 21:30, ₩3,000 for an adult.</strong> A
            heritage site open until ten at night is unusual in Korea, and it is what makes
            Gyeongju an evening city rather than a day trip. Arrive around sunset so you get the
            site in daylight and then watch the lights come up.
          </p>
        </Stop>

        <Stop
          slug="gyeongju-jungang-market-1945431"
          time="Evening"
          title="Dinner — Jungang Market or the ssambap street"
          walk="2.2 km"
        >
          <p>
            <Link href="/place/gyeongju-jungang-market-1945431/">Jungang Market</Link> is the
            working market, with a street-food alley attached. For a sit-down meal,{' '}
            <Link href="/place/gyeongju-ssambap-street-3098018/">Ssambap Street</Link> near the
            tombs serves the local set meal — a dozen-odd small dishes with leaves to wrap them
            in. Both are a short taxi ride from Donggung, or a 25-minute walk back the way you
            came.
          </p>
        </Stop>
      </ol>

      <PlaceRow slugs={[
        'gyeongju-five-royal-tombs-1696365',
        'gyeongju-seongdong-market-1862991',
        'gyeongbuk-millennium-forest-garden-3423603',
      ]} />

      <DayHead
        day="Day 2"
        title="Bulguksa and Seokguram, up Tohamsan"
        sub="Two UNESCO sites on one mountain, 11 km out of town. Both free. The connecting bus is the thing to plan around."
        avoid="Arriving at Seokguram after 15:00"
      />

      <ol className="g-timeline">
        <Stop
          slug="gyeongju-bulguksa-temple-unesco-world-heritage-264261"
          time="09:00"
          title="Bulguksa Temple"
        >
          <p>
            Built in 751 and the most complete surviving expression of Silla Buddhist
            architecture — twin stone pagodas in the main courtyard, Dabotap and Seokgatap, that
            are deliberately opposite in character: one ornate, one austere. The stone terraces
            and bridges below the halls are original eighth-century work.
          </p>
          <p>
            <strong>Free, and open every day of the year.</strong> Gates open at{' '}
            <strong>09:00</strong>; last admission is <strong>17:00</strong> from November to
            January, <strong>17:30</strong> in February and October, and <strong>18:00</strong>{' '}
            from March to September.
          </p>
          <p className="meta">
            Buses 10, 11, 700 and 711 from downtown, about 40 minutes. If you drive, parking is
            charged separately.
          </p>
        </Stop>

        <Stop
          time="11:40"
          title="Bus 12 up to Seokguram"
          walk="Across the car park"
        >
          <p>
            <strong>The bus leaves at about 40 minutes past the hour</strong>, from the stop
            across from the main Bulguksa car park, and takes around 20 minutes to wind up
            Tohamsan. It runs roughly hourly, the midday departure sometimes slips while the
            driver eats, and there is no alternative short of a long uphill walk or a taxi.
          </p>
          <p>
            <strong>Check the posted timetable when you arrive at Bulguksa, not before.</strong>{' '}
            Then plan your time in the temple around the bus rather than the other way round.
          </p>
        </Stop>

        <Stop
          time="12:00"
          title="Seokguram Grotto"
        >
          <p>
            A granite dome built into the hillside around a 3.5-metre seated Buddha, facing east
            over the sea. It is the single finest object in Korean Buddhist art, and it is now{' '}
            <strong>free to enter</strong> as of May 2023.
          </p>
          <p>
            <strong>Manage your expectations about the view.</strong> The chamber has been
            sealed behind a glass wall since conservation work in the 1960s, so you see the
            Buddha from the antechamber rather than walking around it, and{' '}
            <strong>photography inside is prohibited</strong>. The approach path along the
            hillside, and the view east from the terrace, are a real part of the visit.
          </p>
          <p className="meta">
            Aim to be up here by <strong>15:00 at the latest</strong> — the site closes earlier
            than you would expect for a mountain, and the last bus down is not late.
          </p>
        </Stop>

        <Stop
          slug="gyeongju-namsan-mountain-806320"
          time="Afternoon"
          title="Then pick one: Namsan, Yangdong, or Bomun"
        >
          <p>
            <Link href="/place/gyeongju-namsan-mountain-806320/">Namsan</Link> is the serious
            option — a whole mountain of Buddhas carved into the rock and pagodas left where
            they fell, essentially an open-air sculpture park you have to hike. Allow half a day
            and proper shoes.
          </p>
          <p>
            <Link href="/place/gyeongju-yangdong-village-unesco-world-heritage-804281/">Yangdong Village</Link>{' '}
            is a UNESCO-listed Joseon aristocratic village 24 km north, still lived in. It is a
            different period and a different Korea from everything else on this page.
          </p>
          <p>
            <Link href="/place/bomun-tourist-complex-264264/">Bomun</Link> is the lakeside
            resort district, 7 km from the centre, and is where most of the larger hotels are —
            useful to know when you book, since staying there puts you outside walking distance
            of Day 1.
          </p>
        </Stop>
      </ol>

      <PlaceRow slugs={[
        'gyeongju-namsan-mountain-806320',
        'gyeongju-yangdong-village-unesco-world-heritage-804281',
        'gyeongju-national-park-264265',
      ]} />

      <h2 className="sect">When to come</h2>
      <p>
        Gyeongju peaks twice. In <strong>early April</strong> the whole town goes under cherry
        blossom, and the road around Bomun Lake is one of the best-known blossom drives in the
        country — it is also the single most crowded week of the Gyeongju year. In{' '}
        <strong>early November</strong> the colour arrives; the southern peak window runs{' '}
        <strong>5–13 November</strong>, and the tombs and temple grounds hold it well. The{' '}
        <Link href="/guides/autumn-foliage/">autumn foliage guide</Link> has the regional
        timings.
      </p>
      <p>
        Winter is cold and quiet and every site here stays open — which, given that almost none
        of them charge, makes Gyeongju a genuinely good off-season city.
      </p>

      <h2 className="sect">What else is on</h2>
      <p>
        Gyeongju runs festivals through the year, and the historic area hosts night-opening
        events that do not follow a fixed schedule. Put your dates into the{' '}
        <Link href="/plan/">Trip Planner</Link> to see what falls inside your trip, or browse{' '}
        <Link href="/regions/gyeongbuk/">everything we have in Gyeongbuk</Link>.
      </p>

      <p className="strip">
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/busan-2-days/">2 days in Busan</Link>
        <Link href="/plan/">Trip Planner</Link>
        <Link href="/korea-basics/">Korea basics</Link>
      </p>

      <p className="meta">
        Admission changes verified against Gyeongju City&apos;s announcement of 20 April 2023
        (Daereungwon free from 4 May 2023, Cheonmachong charged as before) and the national
        waiver of temple heritage admission that took effect the same day. Bulguksa opening
        hours as published by the temple; Donggung Palace hours and fee as published by Gyeongju
        City Facilities Management Corporation. Distances are straight-line, measured from the
        coordinates on each site&apos;s page. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
