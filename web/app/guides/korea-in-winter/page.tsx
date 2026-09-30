import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { FestivalHero, FestivalRow, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Korea in Winter 2026–27 — how cold, what is on, and the week to avoid',
  description: 'Korean winter is cold and dry rather than snowy, the ice festivals run in January, and Seollal falls on 7 February 2027. What that means for your dates.',
};

export default function KoreaInWinter() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Korea in Winter', path: '/guides/korea-in-winter/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/korea-in-winter/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Korea in Winter
      </div>

      <h1>Korea in winter, and the difference between cold and snowy</h1>
      <p className="sub">
        Korean winter is <strong>colder and drier</strong> than most visitors expect. Seoul sits
        below freezing for most of January, but it does not sit under snow — the winter here is
        a hard, bright, continental cold with very little precipitation. If you are coming for
        snow, you are coming for <strong>Gangwon</strong>, and that is a different trip from a
        city one.
      </p>

      <FestivalHero slugs={[
        'lighting-festival-at-the-garden-of-morning-calm-1866962',
        'pyeongchang-trout-festival-661861',
        'daegwallyeong-snow-festival-679008',
      ]} />

      <div className="callout callout-warn">
        <strong>Three things that decide a winter trip.</strong>
        <ul>
          <li>
            <strong>Seollal falls on Sunday 7 February 2027</strong>, with the holiday running
            Saturday 6 to Tuesday 9. Intercity trains and buses sell out weeks ahead and a lot
            of small businesses shut. It is the one week to plan around, in either direction.
          </li>
          <li>
            <strong>The ice festivals are a January thing, not a winter thing.</strong>{' '}
            Hwacheon, the big one, runs <strong>9–31 January 2027</strong>. Come in December and
            the ice is not thick enough; come in February and it is over.
          </li>
          <li>
            <strong>Ski resorts open in November but are thin until late December.</strong>{' '}
            Opening day means one or two machine-made runs. For a full mountain, aim for the
            back half of the season.
          </li>
        </ul>
      </div>

      <h2 className="sect">How cold, actually</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Seoul</th>
            <td>
              January is the cold month: roughly <strong>−6&thinsp;°C at night and a degree or
              two above freezing by day</strong>. It is a dry cold with a lot of sun, which
              makes it more bearable than the same numbers in a damp climate — but the wind off
              the Han River is not.
            </td>
          </tr>
          <tr>
            <th>Gangwon</th>
            <td>
              The mountain east: several degrees colder again, and where the snow actually is.
              Pyeongchang, Hwacheon and the Daegwallyeong plateau hold snow cover for weeks at a
              time. This is where you go for a white landscape.
            </td>
          </tr>
          <tr>
            <th>Busan and the south</th>
            <td>
              Mild by comparison — usually above freezing in the day and it rarely snows. If you
              want winter without the cold, the southern coast is a real option, and it is
              nearly empty in February.
            </td>
          </tr>
          <tr>
            <th>Jeju</th>
            <td>
              Mildest of all at sea level, but Hallasan gets deep snow and the summit route
              closes on short notice. Do not plan a winter Hallasan day without a fallback.
            </td>
          </tr>
          <tr>
            <th>The pattern</th>
            <td>
              Koreans describe winter as <em>samhan-sa-on</em> — three cold days, four mild
              ones — and it is still broadly how the season moves. A brutal week is usually
              followed by a soft one, so a single bad forecast a fortnight out means very
              little.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">Seollal: the week to plan around</h2>
      <p>
        <strong>Seollal, the lunar new year, is Sunday 7 February 2027.</strong> The public
        holiday runs <strong>Saturday 6 to Tuesday 9 February</strong> — the 9th is a substitute
        day, because the holiday itself falls on a Sunday.
      </p>
      <p>
        What this means in practice is a mass migration: most of the country travels to a family
        home and back inside four days. KTX seats are released and taken far in advance,
        motorways are solid, and independent restaurants and smaller shops close for two or
        three days. Department stores, convenience stores and the major attractions stay open.
      </p>

      <div className="callout">
        <strong>The palace closing days flip during the holiday, and this catches people.</strong>
        <p>
          Under the rule published by the Royal Palaces and Tombs Centre, a palace&apos;s regular
          closing day <strong>does not apply when it falls on a public holiday</strong> — the
          palace opens, and the closure moves to the first non-holiday day afterwards.
        </p>
        <p>
          For 2027 that means Gyeongbokgung, which normally shuts on Tuesdays, should be{' '}
          <strong>open on Tuesday 9 February</strong>, and Changdeokgung and Deoksugung, which
          normally shut on Mondays, open on Monday 8 February — with the closures landing
          instead on <strong>Wednesday 10 February</strong>. If you are in Seoul that week, the
          Wednesday is the day to keep free for something else.
        </p>
        <p className="meta" style={{ margin: '8px 0 0' }}>
          The four palaces have also opened <strong>free of charge</strong> across the Seollal
          holiday in recent years. A specific notice is published each year, so confirm before
          you rely on it.
        </p>
      </div>

      <p>
        The upside is real, though: the palaces and the mountains are at their quietest in the
        days either side, and Seoul itself briefly empties out. If your dates are fixed and they
        overlap Seollal, <strong>stay in one city</strong> and stop trying to move around the
        country.
      </p>

      <h2 className="sect">Ice, and the festivals built on it</h2>
      <p>
        The <strong>Hwacheon Sancheoneo Ice Festival</strong> is the one that travels — CNN put
        it on a list of winter wonders and it has been drawing over a million visitors a year
        since. You cut a hole in a frozen river and fish for mountain trout through it, and if
        that fails there is a bare-hands pool where you get in the water after them.
      </p>
      <table className="facts">
        <tbody>
          <tr>
            <th>2027 dates</th>
            <td>
              <strong>Saturday 9 January to Sunday 31 January 2027</strong>, 23 days, in
              Hwacheon county in Gangwon.
            </td>
          </tr>
          <tr>
            <th>Foreign visitors</th>
            <td>
              There is a <strong>dedicated fishing area for foreign visitors</strong> with
              English-speaking staff, which is unusual enough among Korean festivals to be worth
              saying. Both reserved and walk-up fishing sections operate.
            </td>
          </tr>
          <tr>
            <th>Cost</th>
            <td>
              In 2026 a fishing ticket was <strong>₩15,000</strong> and came with a{' '}
              <strong>₩5,000 local voucher</strong> spendable at festival stalls and shops in
              town, so the real cost was ₩10,000. The 2027 prices had not been published when
              this was written.
            </td>
          </tr>
          <tr>
            <th>Getting there</th>
            <td>
              Hwacheon is about two hours from Seoul and awkward on public transport. Most
              visitors take a day-tour coach, which is the sensible choice unless you are
              driving.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        It is not the only one. Pyeongchang runs a trout festival on a similar footing, Hongcheon
        and Cheorwon hold river-ice events, and the inland reservoirs run smelt festivals through
        January. Most of them confirm dates only in October or November — our{' '}
        <Link href="/events/festivals/january/">January</Link> and{' '}
        <Link href="/events/festivals/december/">December</Link> pages fill in as they land, and
        the <Link href="/events/festivals/gangwon/">Gangwon page</Link> collects the region.
      </p>
      <FestivalRow slugs={[
        'hwacheon-sancheoneo-ice-festival-685135',
        'hongcheon-river-ice-festival-1769697',
        'cheorwon-hantangang-river-ice-trekking-festival-3310502',
      ]} />
      <BookBox
        offers={GUIDE_OFFERS.winterIce}
        title="Day-tour coaches to the ice"
        intro="Hwacheon has no rail link and the bus involves a change in Chuncheon; a coach tour from Seoul is what most visitors do."
      />

      <h2 className="sect">Skiing, and what opening day really means</h2>
      <p>
        Korea&apos;s resorts are close to Seoul by the standards of ski countries — Vivaldi Park
        and Konjiam are inside a couple of hours, and the Pyeongchang resorts that hosted the
        2018 Winter Olympics sit at the end of a KTX line.
      </p>
      <p>
        <strong>Read opening dates carefully.</strong> In the 2025–26 season Yongpyong opened on
        15 November and High1 and Vivaldi Park on 22 November, but an opening date means one or
        two runs on machine-made snow. The mountain is properly open from around late December,
        and the best conditions are January and early February. Resorts publish the coming
        season&apos;s dates in October.
      </p>
      <p>
        Night skiing is the local habit and it is genuinely good — slopes are lit late, and it is
        how you avoid the weekend crush.
      </p>
      <PlaceRow slugs={[
        'daegwallyeong-special-tourist-zone-1963043',
        'wondae-ri-birch-forest-whispering-birch-forest-2475952',
        'taebaeksan-national-park-791747',
      ]} />

      <h2 className="sect">The lights, which run all winter</h2>
      <p>
        Illumination is the other half of Korean winter, and unlike the ice festivals it runs
        for months rather than weeks — most displays open in early December and stay up into
        February or March. The{' '}
        <Link href="/festival/lighting-festival-at-the-garden-of-morning-calm-1866962/">Garden of Morning Calm</Link>,
        an hour and a half east of Seoul, lights its whole hillside garden after dark and pairs
        with Nami Island on the same day trip.
        In the cities, Seoul floats lantern displays along the Cheonggyecheon stream and
        projects onto Gwanghwamun, and Busan strings Gwangbok-ro end to end.
      </p>
      <FestivalRow slugs={[
        'seoul-lantern-festival-1095732',
        'gwangbok-ro-winter-light-tree-festival-3576410',
        'suseong-light-art-festival-3565768',
      ]} />
      <BookBox
        offers={GUIDE_OFFERS.winterSkiLights}
        title="Ski days and the lights, without a car"
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.winterSki}
        title="Staying in the mountains"
        intro="Pyeongchang for a ski week; Hwacheon only if you want the ice festival at opening time, because the rooms are few."
      />

      <h2 className="sect">Seoul, when it is too cold to be outside</h2>
      <p>
        Winter is the season the palaces are worth most. <Link href="/place/gyeongbokgung-palace-264337/">Gyeongbokgung</Link>{' '}
        under snow, with the mountains behind it, is the photograph everyone wants and almost
        nobody plans for; and <Link href="/place/changdeokgung-palace-complex-unesco-world-heritage-site-264348/">Changdeokgung</Link>&apos;s
        Huwon garden reads completely differently with the leaves gone. The{' '}
        <Link href="/guides/seoul-3-days/">Seoul 3-day guide</Link> plans around the closing days.
      </p>
      <p>
        When it turns genuinely cold, the answer is the Korean one: go indoors and get warm on
        purpose. A <em>jjimjilbang</em> — a public bathhouse with heated rooms and floor space,
        open around the clock — costs very little and is the single most characteristic winter
        experience the country has. Underfloor heating, <em>ondol</em>, is why Korean rooms are
        warm at the floor and cool at head height, and why shoes come off at the door.
      </p>
      <p>
        Street food is at its best now, because most of it is winter-only:{' '}
        <em>hotteok</em> (a griddled pancake with molten brown sugar inside),{' '}
        <em>bungeoppang</em> (a fish-shaped pastry with red bean), and roast sweet potatoes sold
        from drum ovens. <em>Bungeoppang</em> carts appear in December and vanish in March, and
        finding one is a small national obsession.
      </p>

      <h2 className="sect">Sunrise on the first of January</h2>
      <p>
        <strong>Haemaji</strong> — going to watch the first sunrise of the year — is a real mass
        custom rather than a tourist event, and the east coast fills up overnight for it. The
        well-known spots are{' '}
        <Link href="/place/jeongdongjin-time-museum-1064021/">Jeongdongjin</Link>, where the
        railway line runs along the beach,{' '}
        <Link href="/place/homigot-lighthouse-1767741/">Homigot</Link> with its bronze hand
        rising out of the sea, and{' '}
        <Link href="/place/ganjeolgot-lighthouse-264558/">Ganjeolgot</Link>, which claims the
        earliest sunrise on the mainland.
      </p>
      <p>
        Practically: accommodation on the east coast sells out for 31 December months ahead,
        trains run through the night, and it will be several degrees below freezing on an exposed
        shore before dawn. It is worth doing once, and it is not a casual outing.
      </p>
      <PlaceRow slugs={[
        'jeongdongjin-time-museum-1064021',
        'homigot-lighthouse-1767741',
        'ganjeolgot-lighthouse-264558',
      ]} />

      <h2 className="sect">What to bring</h2>
      <p>
        Layers, and a real coat. The temperature swing between a heated subway car and an
        exposed street is large and constant, so anything you cannot open or take off will make
        you miserable. Bring gloves and something over your ears — the wind does the damage, not
        the air temperature. Indoor heating is generous, so a heavy jumper under a coat is worse
        than a thin one under a warm coat.
      </p>
      <p>
        Skip the snow boots unless you are going to Gangwon. City pavements are cleared quickly
        and are dry more often than not.
      </p>
      <BookBox
        offers={GUIDE_OFFERS.arrival}
        title="Sort out before you land"
        intro="Three things that are cheaper or simpler bought before the flight than at the airport."
      />

      <p className="strip">
        <Link href="/guides/korean-spa-jjimjilbang/">Korean spas and jjimjilbang</Link>
        <Link href="/guides/skiing-in-korea/">Skiing in Korea</Link>
        <Link href="/guides/christmas-new-year-seoul/">Christmas &amp; New Year</Link>
        <Link href="/guides/seollal-2027/">Seollal 2027</Link>
        <Link href="/plan/">Trip Planner</Link>
        <Link href="/events/festivals/january/">January festivals</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/korea-basics/">Korea basics</Link>
      </p>

      <RelatedGuides href="/guides/korea-in-winter/" />

      <p className="meta">
        Seollal 2027 dates and the substitute holiday follow the published national holiday
        calendar. The palace closing-day rule is as stated by the Royal Palaces and Tombs Centre;
        each year&apos;s specific holiday notice is published shortly before the holiday, so
        confirm before building a day around it. Hwacheon festival dates are the organiser&apos;s
        published 2027 dates; the fee quoted is the 2026 figure, as 2027 pricing was not yet
        published. Ski opening dates are the 2025–26 season&apos;s actual openings.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
