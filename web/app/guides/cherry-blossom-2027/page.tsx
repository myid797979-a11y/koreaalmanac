import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, FestivalRow, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Korea Cherry Blossom 2027 — forecast, typical dates by city, and how to book before it exists',
  description: 'The 2027 forecast is issued in late February. Until then: how Korea’s blossom front moves from Jeju to Seoul, what the last six years actually did, the festivals worth building around, and how to book without a date.',
};

export default function CherryBlossom2027() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Cherry Blossom 2027', path: '/guides/cherry-blossom-2027/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/cherry-blossom-2027/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Cherry Blossom 2027
      </div>

      <h1>Korea’s cherry blossom in 2027: planning before the forecast exists</h1>
      <p className="sub">
        Korea’s blossom is a front, not a date. It opens on Jeju in the last week of March,
        reaches Busan and Jinhae a few days later, and arrives in Seoul in the first week of
        April — with each city getting roughly a week of full bloom that one rainy night can
        end. <strong>No forecast for 2027 exists yet</strong>: the two private forecasters that
        issue them publish in late February and revise into March. This page explains how to
        book a trip anyway, and is updated the day the first forecast lands.
      </p>

      <GuideHero slugs={[
        'yeouido-hangang-park-1064767',
        'songpa-naru-park-seokchonhosu-lake-1542646',
        'yeojwacheon-stream-827151',
      ]} />

      <div className="callout callout-warn">
        <strong>Forecast status: not yet issued.</strong>
        <p>
          Korea’s national weather service stopped publishing blossom forecasts years ago; the
          dates everyone quotes come from two private forecasters, Weathernews Korea and
          Kweather, whose first 2027 forecasts are expected in the <strong>last week of
          February 2027</strong>. Expect a revision in mid-March. We will add the numbers here
          the day they appear.
        </p>
      </div>

      <h2 className="sect">How the front usually moves</h2>
      <p>
        The table gives the long-run average first-bloom date and the range the last six years
        actually produced. The gap is the point: since 2021 every season has run earlier than
        the 30-year average, sometimes by two weeks, and the year-to-year spread is about ten
        days. “Full bloom” — the week you want — follows first bloom by <strong>5 to 7
        days</strong>.
      </p>
      <table className="facts">
        <tbody>
          <tr><th>Jeju (Seogwipo)</th><td>Average around <strong>24 March</strong>; recent years 18–26 March. The first blossom in the country and the least crowded.</td></tr>
          <tr><th>Busan · Jinhae</th><td>Average around <strong>28 March</strong>; recent years 19–30 March. The Jinhae festival is timed to this and is the single largest blossom event in the country.</td></tr>
          <tr><th>Daegu · Gyeongju</th><td>Average around <strong>29–31 March</strong>; recent years 22 March – 2 April. Gyeongju’s Bomun Lake road and the royal tombs are among the best settings anywhere.</td></tr>
          <tr><th>Jeonju · Daejeon</th><td>Average around <strong>1–2 April</strong>; recent years 25 March – 3 April.</td></tr>
          <tr><th>Seoul</th><td>Average around <strong>8 April</strong>; recent years 24 March – 5 April. Yeouido and Seokchon Lake peak a few days after the official first bloom.</td></tr>
          <tr><th>Gangneung · east coast</th><td>Average around <strong>5–8 April</strong>; recent years 30 March – 8 April. Gyeongpo Lake is the classic, a week behind Seoul in a normal year and level with it in a warm one.</td></tr>
        </tbody>
      </table>

      <h2 className="sect">Where, in order of how much it is worth</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Jinhae</th>
            <td>
              A naval town near Busan with some 350,000 trees and a ten-day festival, the{' '}
              <strong>Gunhangje</strong>. The two photographs are the Yeojwacheon stream, with its
              small bridges, and Gyeonghwa Station, where the trees arch over a railway line.
              Hotels in Jinhae itself are effectively unbookable; everyone comes from Busan for
              the day, by KTX to Changwon Jungang or on a coach tour.
            </td>
          </tr>
          <tr>
            <th>Seoul</th>
            <td>
              <strong>Yeouido</strong>’s Yunjung-ro behind the National Assembly is the big one
              and closes to traffic for its festival; <strong>Seokchon Lake</strong> in Jamsil
              rings the water with trees under Lotte World Tower and is lit at night;
              Gyeongui Line Forest Park, Namsan’s northern road and the Jungnangcheon and
              Anyangcheon stream paths are the local alternatives with a tenth of the crowd.
            </td>
          </tr>
          <tr>
            <th>Gyeongju</th>
            <td>
              The road around <strong>Bomun Lake</strong>, the trees among the royal tombs at
              Daereungwon, and Heungmusa road. Blossom week is the one crowded week of Gyeongju’s
              year; see the <Link href="/guides/gyeongju-2-days/">Gyeongju guide</Link> for the
              rest of it.
            </td>
          </tr>
          <tr>
            <th>Jeju</th>
            <td>
              The king cherry, a broader-petalled native variety, along Jeonnong-ro in Jeju City
              and Noksan-ro in the south-east, where the trees run above fields of yellow
              rapeseed in flower at the same time. Late March.
            </td>
          </tr>
          <tr>
            <th>The south-west</th>
            <td>
              Hadong’s ten-li road to Ssanggyesa temple and the Seomjin river at Gurye, both
              inland from the south coast, both late March, both less known abroad than they
              deserve.
            </td>
          </tr>
          <tr>
            <th>Gangneung</th>
            <td>
              <strong>Gyeongpo Lake</strong>, a 4 km ring of trees round the water with the sea a
              few hundred metres away, in the second week of April most years.
            </td>
          </tr>
        </tbody>
      </table>
      <FestivalRow slugs={[
        'jinhae-gunhangje-festival-700520',
        'yeongdeungpo-yeouido-spring-flower-festival-700464',
        'seokchon-lake-cherry-blossom-festival-1592898',
      ]} />
      <FestivalRow slugs={[
        'gangneung-gyeongpo-cherry-blossom-festival-695592',
        'jecheon-cheongpung-lake-cherry-blossom-festival-141647',
        'gurye-300-ri-cherry-blossom-festival-3110031',
      ]} />

      <h2 className="sect">How to book a trip to a date that does not exist yet</h2>
      <p>
        The method that works, used by people who do this every year:
      </p>
      <ol className="steps">
        <li>
          <strong>Aim for the last days of March to the first week of April</strong> and plan to
          be in the south early and Seoul late. That order matches the front in almost every
          year on record, so a ten-day trip from Busan to Seoul catches full bloom somewhere
          whatever the season does.
        </li>
        <li>
          <strong>Book refundable</strong>: flights that allow date changes, hotels on free
          cancellation. When the late-February forecast arrives, shift by up to a week.
        </li>
        <li>
          <strong>Do not book the Jinhae festival dates as if they were the blossom dates.</strong>{' '}
          The festival is fixed months ahead; in an early year the trees are bare by the last
          weekend, in a late one they open after it. Watch the forecast, not the poster.
        </li>
        <li>
          <strong>Have a second region.</strong> Rain on a full-bloom weekend strips a city in a
          night. Seoul plus Gyeongju, or Busan plus Gangneung, gives you a fallback a train ride
          away.
        </li>
      </ol>

      <h2 className="sect">What the crowds are like</h2>
      <p>
        Yeouido on the festival weekend is one of the most crowded places in Korea, with the
        subway station managed by staff and the road a slow shuffle. Go on a weekday at 07:00
        and it is a different park. Jinhae’s Gyeonghwa Station is a queue for a photograph;
        Yeojwacheon is better and larger. Seokchon Lake at night is busy but moves. Everywhere
        else on the lists above is manageable, and the stream paths in Seoul are simply quiet.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.cherry}
        title="Jinhae without the hotel problem"
        intro="Day tours from Seoul and from Busan run through festival week, and the rail pass covers the Busan–Gyeongju–Seoul route the blossom follows."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.cherry}
        title="Book refundable, then move with the forecast"
        intro="Free-cancellation rates are the whole strategy in step 2 above."
      />

      <p className="strip">
        <Link href="/events/festivals/march/">March festivals</Link>
        <Link href="/events/festivals/april/">April festivals</Link>
        <Link href="/guides/gyeongju-2-days/">2 days in Gyeongju</Link>
        <Link href="/guides/busan-2-days/">2 days in Busan</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <RelatedGuides href="/guides/cherry-blossom-2027/" />

      <p className="meta">
        Average first-bloom dates are the 1991–2020 climatological normals for each city’s
        official observation tree; recent-year ranges cover 2021–2026 observations. Festival
        rows show the most recent registered edition and update when 2027 dates are registered,
        normally in February. Forecast status last checked 28 September 2026.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
