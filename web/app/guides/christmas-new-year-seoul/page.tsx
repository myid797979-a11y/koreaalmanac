import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, FestivalRow, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Christmas and New Year in Seoul 2026–27 — the bell, the lights, the first sunrise',
  description: 'Christmas Day and 1 January both fall on a Friday this year. What is actually on in Seoul: the Bosingak bell at midnight, the lantern and light festivals, ice rinks, the east-coast sunrise trains, and what closes.',
};

export default function ChristmasNewYearSeoul() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Christmas & New Year in Seoul 2026–27', path: '/guides/christmas-new-year-seoul/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/christmas-new-year-seoul/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Christmas &amp; New Year 2026–27
      </div>

      <h1>Christmas and New Year in Seoul, 2026–27: what actually happens</h1>
      <p className="sub">
        Korea does the season differently. Christmas is a public holiday but a couples’ night
        out rather than a family day; the big family holiday is the lunar new year in February.
        What Seoul does brilliantly is <strong>light</strong> — a month of lantern and
        illumination festivals — and the turn of the year itself: a bronze bell struck 33 times
        at midnight, and a national pilgrimage to the east coast for the first sunrise.
        <strong> Both 25 December 2026 and 1 January 2027 fall on a Friday</strong>, which
        makes two long weekends and means the coast, the ski resorts and the trains fill early.
      </p>

      <GuideHero slugs={[
        'bosingak-belfry-264135',
        'cheonggyecheon-stream-897540',
        'lotte-world-tower-seoul-sky-2493015',
      ]} />

      <div className="callout">
        <strong>The dates that matter</strong>
        <table className="facts" style={{ marginTop: 10 }}>
          <tbody>
            <tr><th>Thu 24 Dec</th><td>Christmas Eve. <strong>Not</strong> a holiday — offices work, shops open late, restaurants are fully booked.</td></tr>
            <tr><th>Fri 25 Dec</th><td>Christmas Day, public holiday. Palaces, museums, department stores and attractions open; banks and government offices closed.</td></tr>
            <tr><th>Thu 31 Dec</th><td>Bosingak bell-ringing at midnight in Jongno. Subway hours are normally extended into the early hours for it.</td></tr>
            <tr><th>Fri 1 Jan</th><td>New Year’s Day, public holiday. Sunrise in Seoul is about 07:47; on the east coast about 15 minutes earlier. The national museums close for the day.</td></tr>
            <tr><th>Sat 6 – Tue 9 Feb</th><td>Seollal, the lunar new year, is the holiday that really moves the country — <Link href="/guides/seollal-2027/">separate guide</Link>.</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="sect">What Christmas is here, and what it is not</h2>
      <p>
        Around a third of Koreans are Christian, so churches are full on the night of the 24th
        and Myeongdong Cathedral’s midnight Mass is open to anyone who arrives early enough.
        For everyone else Christmas Eve is a date night: the restaurants and hotel buffets that
        take reservations are booked out days ahead, the streets of Myeongdong, Hongdae and
        Seongsu are packed until late, and the department stores compete on facade lighting —
        Shinsegae’s main store opposite Myeongdong has been the postcard for years, and The
        Hyundai Seoul in Yeouido builds an indoor Christmas village that draws queues of its own.
      </p>
      <p>
        What you will not find is a shutdown. On the 25th almost everything a visitor wants is
        open: the palaces (Friday is not a closing day for any of them), the big museums, Lotte
        World and Everland, the markets. Treat it as a busy Saturday with lights.
      </p>

      <h2 className="sect">The lights, which run into January</h2>
      <p>
        Seoul’s winter illuminations are not a Christmas thing so much as a season. The{' '}
        <strong>Seoul Lantern Festival</strong> fills the Cheonggyecheon stream with lit
        sculptures from mid-December into mid-January, <strong>Seoul Light Gwanghwamun</strong>{' '}
        projects onto the palace gate and the square from <strong>11 December 2026 to 3 January
        2027</strong> (17:30–22:00) with a countdown on New Year’s Eve, the European-style{' '}
        <strong>Gwanghwamun Market</strong> fills the square in December, and the stream’s
        own <strong>winter lights</strong> run alongside. All three are free, ten minutes’ walk
        apart, and best after 18:00 when the crowds thin a little on weeknights.
      </p>
      <p>
        Out of town, the <strong>Garden of Morning Calm</strong> lights its whole hillside
        garden from early December to mid-March and pairs with Nami Island on a day trip;
        Everland runs its Christmas programme through the holidays; and in Busan,
        Gwangbok-ro’s tree festival strings the old downtown end to end until February.
      </p>
      <FestivalRow slugs={[
        'seoul-lantern-festival-1095732',
        'seoul-light-gwanghwamun-3073454',
        'lighting-festival-at-the-garden-of-morning-calm-1866962',
      ]} />

      <h2 className="sect">Christmas Eve and Day: a plan that works</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Dinner</th>
            <td>
              Book before you fly. If you have not, hotel buffets and department-store food
              halls are the reliable fallback, and barbecue restaurants in non-tourist
              neighbourhoods rarely take reservations at all.
            </td>
          </tr>
          <tr>
            <th>Midnight Mass</th>
            <td>
              Myeongdong Cathedral, 24 December. Seats go early; the courtyard fills with people
              who could not get in and stay anyway. Dress warmly — it is largely outdoors.
            </td>
          </tr>
          <tr>
            <th>Skating</th>
            <td>
              The <strong>Seoul Plaza ice rink</strong> in front of City Hall opens in
              mid-December and charges around <strong>1,000 won an hour</strong> including
              skates — the best-value hour in the city. Sessions sell out on the 24th and 25th;
              go on a weekday morning instead.
            </td>
          </tr>
          <tr>
            <th>Theme parks</th>
            <td>
              Lotte World is indoors and Everland runs a Christmas Fantasy season; both are at
              their busiest of the year on the 24th and 25th. If you must, arrive at opening.
            </td>
          </tr>
          <tr>
            <th>Palaces</th>
            <td>
              Open on the 25th. Gyeongbokgung in snow is the photograph everyone wants and
              nobody can plan; Deoksugung’s stone-wall path is lit and lovely regardless.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'myeongdong-cathedral-264138',
        'deoksugung-palace-264316',
        'everland-264235',
      ]} />

      <h2 className="sect">New Year’s Eve: the bell</h2>
      <p>
        Seoul’s midnight is not fireworks but a bell. At <strong>Bosingak</strong>, the belfry
        on Jongno that once signalled the opening and closing of the city gates, the bell is
        struck <strong>33 times</strong> as the year turns, by a rota of civic guests, in front
        of a crowd that runs to six figures. Roads around Jonggak close from the evening, there
        is a stage with performances from around 22:00, and the subway keeps running well past
        its normal last train so people can get home — the extension is announced each year in
        late December.
      </p>
      <p>
        Practicalities: arrive by 22:30 for any view of the belfry, wear more than you think you
        need (it is usually around −5 °C by midnight), and know that leaving takes an hour. If
        the crowd is not for you, <strong>Lotte World Tower</strong> in Jamsil has fired a
        fireworks and light show from the tower at midnight in recent years, watched from
        Seokchon Lake and the river parks; and Busan runs a countdown at Gwangalli Beach with a
        drone show over the water on the night of the 1st.
      </p>
      <FestivalRow slugs={[
        'countdown-busan-2702333',
        'gwangalli-m-drone-light-show-3115770',
        'jeonju-new-year-s-eve-festival-2642299',
      ]} />

      <h2 className="sect">The first sunrise, and the trains that go to it</h2>
      <p>
        <em>Haemaji</em> — going to watch the first sunrise of the year — is a genuine national
        habit, and on the night of 31 December the east coast fills up. The earliest sunrise on
        the mainland is at <strong>Ganjeolgot</strong> near Ulsan, a little after 07:30;{' '}
        <strong>Jeongdongjin</strong> north of Gangneung is the classic, with the train line
        running along the beach; <strong>Homigot</strong> at Pohang has the giant bronze hand
        rising from the sea; and in the south-west <strong>Hyangiram</strong>, a hermitage on
        the cliffs at Yeosu, holds a festival around it.
      </p>
      <p>
        Korail runs special overnight sunrise trains and every seat on the regular services
        is gone within minutes of release, so if this is the plan, book the moment tickets
        open (about a month ahead) or take a coach tour, which is how most visitors do it. The
        alternative is to stay in Seoul and climb: Namsan, Achasan or the Haneul Park hill all
        take the first light, with a fraction of the travel.
      </p>
      <FestivalRow slugs={[
        'ulju-ganjeolgot-sunrise-festival-141375',
        'jeongdongjin-sunrise-festival-1117592',
        'homigot-sunrise-festival-293277',
      ]} />
      <PlaceRow slugs={[
        'ganjeolgot-lighthouse-264558',
        'homigot-lighthouse-1767741',
        'yeosu-hyangiram-hermitage-264598',
      ]} />

      <h2 className="sect">Open and closed</h2>
      <table className="facts">
        <tbody>
          <tr><th>Open on both holidays</th><td>Palaces, Lotte World, Everland, department stores, convenience stores, most restaurants in tourist districts, the subway on a holiday timetable.</td></tr>
          <tr><th>Closed 25 Dec</th><td>Banks, post offices, government offices, many independent shops outside the centre.</td></tr>
          <tr><th>Closed 1 Jan</th><td>The above, plus the National Museum of Korea and the other national museums, which take New Year’s Day off. Check any specific museum before you go.</td></tr>
          <tr><th>Full</th><td>Ski resorts, east-coast hotels on the 31st, KTX to Gangneung and Busan on the 31st and 1st. Book those first and build the rest around them.</td></tr>
        </tbody>
      </table>

      <h2 className="sect">What to wear</h2>
      <p>
        Late December in Seoul averages just below freezing and drops to −10 °C in cold snaps,
        with dry air and a wind that does more damage than the thermometer suggests. The full
        briefing — layers, why snow boots are unnecessary in the city, and what Seollal does to
        the palace closing days — is in the{' '}
        <Link href="/guides/korea-in-winter/">Korea in winter guide</Link>.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.christmas}
        title="Book ahead for the season"
        intro="The lighting-festival coach and the two things worth sorting before you land."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.christmas}
        title="Where to stay over the holidays"
        intro="Seoul for the bell, Gangneung for the sunrise, Busan for the countdown. The coast books out first."
      />

      <p className="strip">
        <Link href="/guides/korea-in-winter/">Korea in winter</Link>
        <Link href="/guides/seollal-2027/">Seollal 2027</Link>
        <Link href="/events/festivals/december/">December festivals</Link>
        <Link href="/events/festivals/january/">January festivals</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <RelatedGuides href="/guides/christmas-new-year-seoul/" />

      <p className="meta">
        Holiday dates follow the published national calendar. Festival dates shown in the rows
        above are the most recent registered edition; 2026–27 editions are added as organisers
        register them, usually in November. Sunrise times are for 1 January 2027 to the nearest
        few minutes. Bosingak subway extensions, the Seoul Plaza rink price and the Lotte World
        Tower show are as run in recent years and are confirmed each December.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
