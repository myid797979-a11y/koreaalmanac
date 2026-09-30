import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import { GuideHero, Stop, DayHead, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: '3 Days in Jeju — what to book before you fly, and what a car really costs',
  description: 'A 3-day Jeju itinerary: Hallasan permits, Manjanggul’s 2026 reopening, and the driving-licence rule that catches foreign visitors out.',
};

export default function JejuThreeDays() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: '3 Days in Jeju', path: '/guides/jeju-3-days/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/jeju-3-days/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › 3 Days in Jeju
      </div>

      <h1>3 days in Jeju, and the two things to sort before you fly</h1>
      <p className="sub">
        Jeju is a volcanic island 73 km across with its sights scattered around the rim, so how
        you move matters more than what you see. Two things decide your trip and both have to be
        handled before departure: whether you can legally drive, and whether you want the
        Hallasan summit.
      </p>

      <GuideHero slugs={[
        'hallasan-mountain-264172',
        'manjanggul-lava-tube-national-geopark-264236',
        'daepo-jusangjeolli-cliff-264179',
      ]} />

      <div className="callout callout-warn">
        <strong>Book or check these before you leave home.</strong>
        <ul>
          <li>
            <strong>Driving licence:</strong> you need your home licence <em>plus</em> an
            International Driving Permit <em>plus</em> your passport — all three, physical
            copies. An IDP on its own is not valid, and photos of documents are refused.
          </li>
          <li>
            <strong>Hallasan summit:</strong> free, but the summit sections are capped and must
            be reserved. Bookings open on the 1st of each month at visithalla.jeju.go.kr.
          </li>
          <li>
            <strong>Typhoon season runs late June to early October</strong> — flights and ferries
            cancel en masse. October and November are the island&apos;s best months.
          </li>
        </ul>
      </div>

      <h2 className="sect">Do you actually need a car?</h2>
      <p>
        Not strictly — but it roughly doubles what you can fit into a day. Buses reach the
        headline sights on a decent frequency; they do not reach the oreum, the coastal cafés,
        or most viewpoints, and rural routes can run three or four times a day.
      </p>

      <table className="facts">
        <tbody>
          <tr>
            <th>Renting</th>
            <td>
              Budget <strong>₩120,000–160,000 a day all-in</strong> for a mid-size car in shoulder
              season — the ₩45,000 base rate you see advertised does not include insurance, and
              your credit-card cover will not be accepted. Take the zero-excess option: Jeju has
              narrow lanes, stone walls and a poor accident record.
            </td>
          </tr>
          <tr>
            <th>The licence trap</th>
            <td>
              Korean law recognises IDPs issued under both the 1949 Geneva and 1968 Vienna
              conventions — but <strong>many Jeju rental desks accept only the 1949 Geneva
              booklet</strong>, and travellers from Vienna-only countries have been turned away at
              the counter. Confirm with your rental company in writing before you fly.
            </td>
          </tr>
          <tr>
            <th>Not driving?</th>
            <td>
              Buses are genuinely usable — route 201 links Jeju City, Seongsan and Seogwipo every
              15–30 minutes, ₩1,150 with a transit card. The best compromise is one private
              day tour (about US$170 for a car, US$240 for a van, 8 hours) for the scattered
              east, and buses for the rest. Use <strong>Kakao Map or Naver Map</strong>; Google
              Maps does not do transit routing here.
            </td>
          </tr>
          <tr>
            <th>Getting there</th>
            <td>
              Gimpo to Jeju is 70–80 minutes and one of the busiest air routes on earth. Booked
              ahead on a budget carrier it can be ₩20,000–40,000 one-way. It is a domestic
              flight, but bring your passport — it is the ID foreign visitors check in with.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.jeju}
        title="Book ahead for Jeju"
        intro="Rental cars sell out for holiday weekends; a day tour is the alternative if you do not want to drive."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.jeju}
        title="Where to stay"
        intro="Jeju City for the airport and restaurants, Seogwipo for the south coast and the waterfalls; with a car, split the nights between them."
      />

      <DayHead
        day="Day 1"
        title="The east: sunrise peak, lava tube, and the divers"
        sub="The east coast holds the island’s two UNESCO sites and its most photographed silhouette. This is the day a car or a tour earns its cost."
      />

      <ol className="g-timeline">
        <Stop time="Before dawn" title="Seongsan Ilchulbong (Sunrise Peak)">
          <p>
            A 182 m tuff cone thrown up by a shallow-water eruption, and the first of Jeju&apos;s
            three UNESCO World Heritage components. The gates open before sunrise year-round —
            04:30 in summer, 06:00 in winter — so the sunrise climb needs no special ticket, just
            an early alarm. Allow <strong>20–35 minutes up</strong> a built staircase with
            handrails, and about 1.5 hours in total. Admission ₩5,000.{' '}
            <strong>Closed the first Monday of each month.</strong> In November and December
            sunrise falls around 07:00–07:30, which makes this far more civilised than in summer.
          </p>
        </Stop>

        <Stop time="Late morning" title="Haenyeo diving demonstration">
          <p>
            Below the peak at Umutgae Beach, Jeju&apos;s women free-divers perform most days at
            roughly 13:30 and 15:00 — about twenty minutes of diving song and actual diving, free
            to watch and no Seongsan ticket needed. Their culture went onto UNESCO&apos;s
            Intangible Heritage list in 2016 and the divers now number a few thousand, most of
            them over sixty. Times shift with season and sea state, so ask at the ticket booth
            that morning; rough seas cancel it outright.
          </p>
        </Stop>

        <Stop
          slug="manjanggul-lava-tube-national-geopark-264236"
          time="Afternoon"
          title="Manjanggul Lava Tube"
        >
          <p>
            <strong>Reopened on 30 May 2026 after two and a half years closed</strong> for
            rockfall repair — almost every English guide still says it is shut. About a kilometre
            of a 7.4 km tube is walkable, ending at a 7.6 m lava column, the largest known
            anywhere. Allow an hour. It holds <strong>11–15 °C year-round</strong>, so bring a
            layer even in August, and wear closed shoes — the floor is wet and uneven.
            ₩4,000, closed the <strong>first Wednesday</strong> of the month.
          </p>
        </Stop>

        <Stop slug="bijarim-forest-264224" time="Late afternoon" title="Bijarim Forest">
          <p>
            A forest of several thousand nutmeg yews, some of them eight hundred years old, on
            flat gravel paths. A quiet, level counterweight to a morning of stairs — and a good
            fallback if the weather turns, which on Jeju it does within a single day.
          </p>
        </Stop>
      </ol>

      <DayHead
        day="Day 2"
        title="The south: waterfalls and the basalt coast"
        sub="Seogwipo and the south shore. Everything here is close together, which makes it the easiest day to do without a car."
      />

      <ol className="g-timeline">
        <Stop
          slug="cheonjiyeonpokpo-falls-unesco-global-geopark-264588"
          time="Morning"
          title="Cheonjiyeon Falls"
        >
          <p>
            A short paved walk from central Seogwipo through subtropical forest to a 22 m fall.
            Part of the island&apos;s UNESCO Global Geopark. Easy enough for any fitness level and
            a natural first stop of the day.
          </p>
        </Stop>

        <Stop slug="jeongbangpokpo-falls-264181" time="Late morning" title="Jeongbang Falls">
          <p>
            The only waterfall in Asia that drops directly into the sea — 23 m onto rocks with
            the ocean immediately beyond. A steep flight of steps down and back up; not step-free.
          </p>
        </Stop>

        <Stop
          slug="daepo-jusangjeolli-cliff-264179"
          time="Afternoon"
          title="Daepo Jusangjeolli Cliff"
        >
          <p>
            Hexagonal basalt columns rising from the sea, formed as lava from Hallasan met the
            water and fractured as it cooled. Ten minutes on a boardwalk, then as long as you
            want watching the swell hit them. Near the Jungmun resort area, so easy to pair with
            lunch.
          </p>
        </Stop>

        <Stop time="Rest of the day" title="Olle Trail Route 6, or the beaches">
          <p>
            Route 6 runs about 11 km from Soesokkak into Seogwipo — the Olle organisation&apos;s
            own pick as the gentlest introduction, finishing in the middle of a town with food and
            buses. The 437 km Olle network is waymarked with blue arrows and pony markers rather
            than words, so it works without any Korean. If you would rather swim,{' '}
            <Link href="/place/hyeopjae-beach-264170/">Hyeopjae Beach</Link> on the west coast has
            the clearest water on the island.
          </p>
        </Stop>
      </ol>

      <DayHead
        day="Day 3"
        title="Hallasan — or a gentler alternative"
        sub="South Korea’s highest mountain at 1,947 m. The summit is a full day and needs a permit; the lower trails need neither."
        avoid="Winter without crampons"
      />

      <div className="callout">
        <strong>The summit rules changed in May 2025 and most guides have not caught up.</strong>{' '}
        You now only need a reservation for the <em>summit sections</em>, not the whole trail.
        On Seongpanak you can walk freely to Jindallaebat shelter (7.3 km) and need a booking
        only beyond it; on Gwaneumsa the free section runs to Samgakbong (6 km). Bookings are
        free at visithalla.jeju.go.kr, open on the 1st of each month, and there is a guest option
        for foreigners that needs only a name and email — no Korean phone number.{' '}
        <strong>Bring photo ID</strong>: they check it against the booking at the gate.
      </div>

      <ol className="g-timeline">
        <Stop slug="hallasan-mountain-264172" time="Full day" title="Hallasan summit">
          <p>
            Only two trails reach the Baengnokdam crater lake. <strong>Seongpanak</strong> is
            9.6 km each way and gentler, 8–9 hours round trip; <strong>Gwaneumsa</strong> is
            8.7 km, steeper and more dramatic, 9–10 hours. Trailhead entry cut-offs are strict —
            12:00 in winter, 12:30 in spring and autumn, 13:00 in summer — and it is day-hiking
            only, no camping. From December through February you need crampons; snow here is
            serious and trails close at short notice.
          </p>
        </Stop>

        <Stop slug="camellia-hill-1624990" time="Alternative" title="If the summit is not for you">
          <p>
            The Eorimok, Yeongsil and Donnaeko trails climb the mountain to Witseoreum without
            reaching the summit, and need no reservation at all — half the scenery for a third of
            the effort. Or skip the mountain: Camellia Hill in the west flowers from late autumn
            through winter, when most of Korea has nothing in bloom.
          </p>
        </Stop>
      </ol>

      <h2 className="sect">More on the island</h2>
      <PlaceRow slugs={[
        'hyeopjae-beach-264170',
        'sanbanggulsa-grotto-jeju-264221',
        'dodu-dong-rainbow-coastal-road-2949197',
      ]} />

      <h2 className="sect">When to come</h2>
      <p>
        <strong>October is the strongest month</strong> — mild, dry, clear, with autumn colour on
        Hallasan. Mid-April to early June is the other good window, adding canola and cherry
        blossom. November is cool and quiet with excellent hiking. December turns cold and
        relentlessly windy, though Jeju is still the warmest part of Korea at 5–8 °C, and snow on
        Hallasan is a genuine draw — just note that snow can close the airport for hours, so keep
        slack before any onward flight. Avoid August and September if you can: that is peak
        typhoon season and Jeju sits directly on the track.
      </p>

      <h2 className="sect">Check what is on while you are here</h2>
      <p>
        Jeju runs its own festivals and exhibitions through the year. Put your dates into the{' '}
        <Link href="/plan/">Trip Planner</Link>, or browse{' '}
        <Link href="/regions/jeju/">everything on Jeju</Link>.
      </p>

      <p className="strip">
        <Link href="/regions/jeju/">Jeju: places &amp; events</Link>
        <Link href="/places/parks-nature/">Parks &amp; nature</Link>
        <Link href="/places/beaches-islands/">Beaches &amp; islands</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <p className="meta">
        Hours, fees and permit rules checked against Jeju Province, Hallasan National Park and
        the Korea Tourism Organization in September 2026. Note that the Gwaneumsa summit section
        was closed for repairs through September 2026 and was due to reopen on 1 October —
        confirm before you plan around it. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
