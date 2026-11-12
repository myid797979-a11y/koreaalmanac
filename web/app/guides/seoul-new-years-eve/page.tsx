import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, FestivalRow, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'New Year’s Eve in Seoul 2026–27: the Bosingak bell, countdowns and the first sunrise',
  description: 'How New Year’s Eve 2026 works in Seoul: the Bosingak bell at midnight, road closures and late trains, the Gwanghwamun and Lotte World Tower countdowns, and where to watch the first sunrise of 2027 in Seoul, on the east coast and in Busan.',
};

export default function SeoulNewYearsEve() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'New Year’s Eve in Seoul 2026–27', path: '/guides/seoul-new-years-eve/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/seoul-new-years-eve/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › New Year’s Eve in Seoul 2026–27
      </div>

      <h1>New Year’s Eve in Seoul, 2026–27: the bell, the countdowns and the first sunrise</h1>
      <p className="sub">
        Seoul sees the year out with a bronze bell rather than a fireworks spectacular, and then
        half the country goes to watch the first sunrise. Both are worth doing once, and both
        reward a little planning: where to stand, which station is closed, and how you get home
        at 1 a.m. in −5 °C. <strong>31 December 2026 is a Thursday and 1 January 2027 a
        Friday</strong>, so New Year turns into a long weekend and the coast fills up.
      </p>

      <GuideHero slugs={[
        'bosingak-belfry-264135',
        'gwanghwamun-square-929909',
        'haneul-park-2944084',
      ]} />

      <div className="callout">
        <strong>The night at a glance</strong>
        <table className="facts" style={{ marginTop: 10 }}>
          <tbody>
            <tr><th>Bell</th><td>Bosingak, Jongno. Ceremony from about 23:00; 33 strokes at midnight; finished by about 00:20.</td></tr>
            <tr><th>Roads</th><td>Last year Jongno, Cheonggyecheon-ro and Ujeongguk-ro around the belfry closed from 18:00 on the 31st until 07:00 on the 1st.</td></tr>
            <tr><th>Trains</th><td>Last year the subway ran late so that final trains reached the end of each line at about 02:00. Jonggak station was closed from 23:00 to 01:00.</td></tr>
            <tr><th>Sunrise</th><td>1 January 2027: about 07:47 in Seoul, 07:39 at Jeongdongjin, 07:31 at Ganjeolgot near Ulsan (sea level; earlier from a hilltop).</td></tr>
            <tr><th>Holiday</th><td>1 January is a public holiday. Most attractions open; the national museums close for the day.</td></tr>
          </tbody>
        </table>
        <p className="meta" style={{ margin: '8px 0 0' }}>
          The 2026 transport arrangements are announced by Seoul in late December. The details
          above are what applied on 31 December 2025, and the pattern rarely changes.
        </p>
      </div>

      <h2 className="sect">The Bosingak bell</h2>
      <p>
        <strong>Bosingak</strong>, the belfry at Jonggak crossroads, once rang to open and close
        the city gates. Since 1953 it has rung in the new year: the bell is struck{' '}
        <strong>33 times</strong> at midnight by a rota of city officials and ordinary citizens
        chosen for the year — people who rescued someone, or worked through a disaster. The
        ceremony runs from about 23:00 with music on a stage beside the belfry, and it is
        broadcast live, so the crowd is part of the show.
      </p>
      <p>
        It is big. Police planned for around <strong>100,000 people</strong> around the belfry
        last year, and about 220,000 at events across the city. Since the Itaewon crowd crush in
        2022 the event is policed closely: there are marshalled zones, one-way walking routes and
        crowd-density monitoring, and officers will stop people moving into full sections.
        That makes it calmer than it looks on television, but it also means you may not reach
        the belfry at all.
      </p>
      <table className="facts">
        <tbody>
          <tr>
            <th>Getting a view</th>
            <td>
              Be on Jongno by <strong>22:00–22:30</strong>. The sides of Jongno 1-ga and the
              Cheonggye-gwangjang end fill first; the big screens mean you can follow the count
              from further away.
            </td>
          </tr>
          <tr>
            <th>Which station</th>
            <td>
              Jonggak (Line 1), right by the belfry, did not stop from 23:00 to 01:00 last year.
              Use <strong>City Hall</strong>, <strong>Gwanghwamun</strong>,{' '}
              <strong>Euljiro 1-ga</strong> or <strong>Jongno 3-ga</strong> and walk.
            </td>
          </tr>
          <tr>
            <th>Getting home</th>
            <td>
              Leaving the area takes up to an hour. Last year lines 1–9, the Ui-Sinseol and the
              Sillim lines ran extra trains, with the last ones arriving at about 02:00; many
              night buses also ran later. Taxis near Jongno are almost impossible before 01:30 —
              walk a couple of stations first, or wait it out in a café.
            </td>
          </tr>
          <tr>
            <th>Cold</th>
            <td>
              Expect around −5 °C at midnight, and colder in a wind. You will be standing still for
              two hours: thermal layers, hat, gloves, hand warmers from a convenience store.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'bosingak-belfry-264135',
        'cheonggyecheon-stream-897540',
        'gwanghwamun-gate-264329',
      ]} />

      <h2 className="sect">Other countdowns</h2>
      <p>
        <strong>Gwanghwamun Square</strong>, ten minutes’ walk from the bell, ends the{' '}
        <strong>Seoul Light Gwanghwamun</strong> projection season with a countdown on the palace
        gate and the buildings around the square. It is often a little less packed than Jongno,
        and the Gwanghwamun Market stalls (11 December – 10 January) give you somewhere to stand
        near a heater.
      </p>
      <p>
        In Jamsil, <strong>Lotte World Tower</strong> has held a countdown with a media façade,
        lasers and fireworks from the top of the tower every year since 2018, except during the
        pandemic and national mourning. The 2025–26 show went ahead, but some of the crowd were
        disappointed: the fireworks lasted about a minute before it switched to lasers, in a
        wind chill near −14 °C. Watch from <strong>Seokchon Lake</strong> or the Han River parks
        rather than at the foot of the tower, and treat it as a nice extra, not a reason to
        cross the city. The 2026 show had not been confirmed when this guide was updated.
      </p>
      <p>
        Outside Seoul, Busan holds a countdown at <strong>Gwangalli Beach</strong> with a drone
        show over the water, and Jeonju has its own new year’s eve festival.
      </p>
      <PlaceRow slugs={[
        'gwanghwamun-square-929909',
        'lotte-world-tower-seoul-sky-2493015',
        'songpa-naru-park-seokchonhosu-lake-1542646',
      ]} />
      <FestivalRow slugs={[
        'countdown-busan-2702333',
        'jeonju-new-year-s-eve-festival-2642299',
      ]} />

      <h2 className="sect">The first sunrise in Seoul</h2>
      <p>
        <em>Haemaji</em> — going out to greet the first sun of the year — is a genuine national
        habit, and you do not need to leave the city for it. Sunrise on 1 January 2027 is at
        about <strong>07:47</strong> in Seoul; the sky is light from about 07:20. Hilltops see
        the sun a minute or two earlier and, more importantly, see it clear the far ridges.
      </p>
      <table className="facts">
        <tbody>
          <tr>
            <th>Achasan</th>
            <td>
              The city’s favourite: an easy 30–40 minute climb on the east side (Achasan station,
              Line 5) with a clear view across the Han River to the sunrise. Thousands go, so set
              off by 06:45 and take a head torch.
            </td>
          </tr>
          <tr>
            <th>Namsan</th>
            <td>
              Central and open 24 hours; walk up from Namsan’s north side or the Namsangol
              hanok village. Crowded at the top, but you can be back in bed in Myeongdong by nine.
            </td>
          </tr>
          <tr>
            <th>Inwangsan</th>
            <td>
              Steeper and rockier, along the old city wall, with the whole of central Seoul
              below you as the light comes up. Icy steps in a cold year — good shoes only.
            </td>
          </tr>
          <tr>
            <th>Haneul Park</th>
            <td>
              The hill above the World Cup Stadium in the west. The park opens at 07:00 in
              January and there are about 290 steps to the top, so it is tight but doable; the
              view east is down the river towards the city.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'achasan-mountain-1349267',
        'seoul-namsan-park-264320',
        'inwangsan-mountain-1348417',
      ]} />

      <h2 className="sect">The east coast and Busan</h2>
      <p>
        The classic is <strong>Jeongdongjin</strong> on the coast south of Gangneung, where the
        railway line runs right along the beach; sunrise is about <strong>07:39</strong> and the
        town holds a sunrise festival on the night of the 31st. Korail runs special overnight
        sunrise trains from Seoul, and regular KTX seats to Gangneung for the 31st sell out
        within minutes of release about a month ahead. If you miss them, a coach tour is the
        usual way visitors go — you sleep on the bus and come back the same day.
      </p>
      <p>
        The earliest mainland sunrise is at <strong>Ganjeolgot</strong> near Ulsan, about{' '}
        <strong>07:31</strong>; <strong>Homigot</strong> at Pohang has the giant bronze hand in
        the sea. In <strong>Busan</strong>, Haeundae Beach and Dongbaekseom island are the
        easy choices — the sun comes up over the sea at around 07:30, and you can combine it with
        the Gwangalli countdown the night before.
      </p>
      <FestivalRow slugs={[
        'jeongdongjin-sunrise-festival-1117592',
        'ulju-ganjeolgot-sunrise-festival-141375',
        'homigot-sunrise-festival-293277',
      ]} />
      <PlaceRow slugs={[
        'haeundae-beach-264155',
        'haeundae-dongbaekseom-island-1751530',
        'gwangalli-beach-264250',
      ]} />

      <h2 className="sect">New Year’s Day itself</h2>
      <p>
        Koreans eat <strong>tteokguk</strong>, a clear soup of sliced rice cakes, on new year’s
        morning — eating a bowl is said to make you a year older. Restaurants near the sunrise
        spots serve it from dawn. But 1 January is the small new year: the big family holiday,
        with ancestral rites and travel home, is <Link href="/guides/seollal-2027/">Seollal</Link>,
        the lunar new year, on 6–9 February 2027. On 1 January almost everything a visitor wants
        is open, apart from banks, government offices and the national museums.
      </p>
      <p>
        For the rest of the season — the lantern festival, Christmas in Seoul, ice rinks and what
        closes on the 25th — see <Link href="/guides/christmas-new-year-seoul/">Christmas and New
        Year in Seoul</Link>, and for clothes and cold-weather practicalities the{' '}
        <Link href="/guides/korea-in-winter/">Korea in winter guide</Link>.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.christmas}
        title="Book ahead for the season"
        intro="Sunrise and lighting-festival coach tours sell out before the trains do."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.christmas}
        title="Where to stay for New Year"
        intro="Jongno or Gwanghwamun if you want to walk back from the bell; Gangneung or Busan for the sunrise. The coast books out first."
      />

      <p className="strip">
        <Link href="/guides/christmas-new-year-seoul/">Christmas &amp; New Year in Seoul</Link>
        <Link href="/guides/korea-in-winter/">Korea in winter</Link>
        <Link href="/guides/gangneung-sokcho-2-days/">Gangneung &amp; Sokcho</Link>
        <Link href="/events/festivals/january/">January festivals</Link>
      </p>

      <RelatedGuides href="/guides/seoul-new-years-eve/" />

      <p className="meta">
        Bell times, road closures, station closures and subway extensions are as announced by
        the Seoul Metropolitan Government for 31 December 2025; the 2026 arrangements are
        published in late December. Crowd figures from Seoul Metropolitan Police forecasts for
        2025–26. Sunrise times for 1 January 2027 are calculated for sea level after the Korea
        Astronomy and Space Science Institute method and are accurate to a minute or two.
        Lotte World Tower details from Lotte’s 2026 countdown announcement and press reports.
        Updated November 2026. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
