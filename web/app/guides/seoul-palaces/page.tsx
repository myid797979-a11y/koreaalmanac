import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, Stop, DayHead, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Seoul’s five palaces: which to see, closing days, hanbok entry and the guard ceremony',
  description: 'Gyeongbokgung, Changdeokgung and the Secret Garden, Changgyeonggung, Deoksugung and Gyeonghuigung, plus Jongmyo: which to choose, the Monday/Tuesday closing split, free entry in hanbok, the guard-changing times, the combined ticket and the palaces open after dark.',
};

export default function SeoulPalaces() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Seoul’s five palaces', path: '/guides/seoul-palaces/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/seoul-palaces/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Seoul’s five palaces
      </div>

      <h1>Seoul’s five palaces: which to see, and when</h1>
      <p className="sub">
        The Joseon kings ruled from Seoul for five centuries and left five palaces within walking
        distance of each other, plus the royal ancestral shrine at Jongmyo. They are cheap, central
        and beautiful. Two things trip visitors up: the palaces close on different days of the week,
        and each one feels different enough that the choice matters if you only have time for one
        or two.
      </p>

      <GuideHero slugs={[
        'gyeongbokgung-palace-264337',
        'changdeokgung-palace-complex-unesco-world-heritage-site-264348',
        'deoksugung-palace-264316',
      ]} />

      <div className="callout">
        <strong>Three rules that save a wasted trip</strong>
        <ul>
          <li><strong>Tuesday:</strong> Gyeongbokgung and Jongmyo are closed. <strong>Monday:</strong> Changdeokgung, Changgyeonggung and Deoksugung are closed. There is always a palace open.</li>
          <li><strong>Wear hanbok and you get in free</strong> at all of them. Rental shops by every palace gate charge by the hour.</li>
          <li><strong>The Secret Garden</strong> at Changdeokgung is a separate, timed ticket with limited numbers. Book it online a few days ahead in spring and autumn.</li>
        </ul>
      </div>

      <h2 className="sect">The palaces at a glance</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Gyeongbokgung<br /><span className="meta">Closed Tue · ₩3,000</span></th>
            <td>
              The main palace and the biggest, with the mountain behind the throne hall and the
              guard ceremony at the gate. It is the one to see if you see one, and the busiest.
              Most of it is a 20th-century reconstruction of what the Japanese colonial government
              tore down.
            </td>
          </tr>
          <tr>
            <th>Changdeokgung<br /><span className="meta">Closed Mon · ₩3,000</span></th>
            <td>
              The UNESCO-listed palace, built to follow the hillside rather than a grid, and the one
              the kings actually preferred to live in. Behind it is the <strong>Secret Garden</strong>{' '}
              (Huwon), a wooded valley of pavilions and ponds seen on a guided walk of about 90
              minutes.
            </td>
          </tr>
          <tr>
            <th>Changgyeonggung<br /><span className="meta">Closed Mon · ₩1,000</span></th>
            <td>
              Next door to Changdeokgung and joined to it by a gate. Quieter, with a lake and a
              white Victorian-style glasshouse. <strong>Open until 21:00</strong>, so it works in the
              evening.
            </td>
          </tr>
          <tr>
            <th>Deoksugung<br /><span className="meta">Closed Mon · ₩1,000</span></th>
            <td>
              In the middle of the modern city by City Hall, a small palace with stone
              Western-style halls from the last years of the dynasty. Also <strong>open until
              21:00</strong>, and the stone-wall path outside is one of the loveliest walks in Seoul.
            </td>
          </tr>
          <tr>
            <th>Gyeonghuigung<br /><span className="meta">Closed Mon · Free</span></th>
            <td>
              The least restored and least visited. Worth it only if you have seen the others.
            </td>
          </tr>
          <tr>
            <th>Jongmyo<br /><span className="meta">Closed Tue · ₩1,000</span></th>
            <td>
              Not a palace but the royal ancestral shrine, and a UNESCO site: a single enormously
              long hall in a silent forest. On weekdays entry is by guided tour at set times,
              including tours in English; on weekends you can wander freely.
            </td>
          </tr>
        </tbody>
      </table>
      <p className="meta">
        A combined ticket covers the four paid palaces, the Secret Garden and Jongmyo, and pays for
        itself if you visit three. Entry is also free on the last Wednesday of each month. The fees are due to rise from 1 January 2027, the first increase in more than twenty years; the prices above are for 2026.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.palaces}
        title="Hanbok and palace tours"
        intro="Hanbok rental covers your palace ticket and is the reason half the photographs look the way they do."
      />

      <DayHead
        day="One day"
        title="Three palaces and the Secret Garden"
        sub="Gyeongbokgung for the ceremony, Changdeokgung for the garden, and Deoksugung in the evening. Not on a Monday or Tuesday."
        avoid="Mondays and Tuesdays. One of the three is closed on each"
      />

      <ol className="g-timeline">
        <Stop slug="gyeongbokgung-palace-264337" time="09:30" title="Gyeongbokgung">
          <p>
            Arrive before the <strong>10:00 guard-changing ceremony</strong> at Gwanghwamun, the
            main gate; it runs again at 14:00, about 20 minutes each time. Then walk the axis
            north through the throne hall to Gyeonghoeru, the pavilion on its lake, and on to the
            smaller residential courts at the back.
          </p>
          <p className="meta">
            The <Link href="/place/national-palace-museum-of-korea-268178/">National Palace Museum</Link>{' '}
            by the west gate is free and has the royal carriages and seals.
          </p>
        </Stop>

        <Stop time="12:30" title="Lunch in Bukchon or Samcheong-dong" walk="15 min walk">
          <p>
            The hanok neighbourhood between the two palaces. Residents live here and the lanes of
            Bukchon are closed to tourists after 17:00, so it fits best in the middle of the day.
          </p>
        </Stop>

        <Stop
          slug="changdeokgung-palace-complex-unesco-world-heritage-site-264348"
          time="14:00"
          title="Changdeokgung and the Secret Garden"
          walk="10 min walk"
        >
          <p>
            Book the Secret Garden tour for mid-afternoon and see the palace first. The English
            tours run at fixed times; the tickets sell out first in the spring blossom and autumn
            foliage weeks. From here, the gate into{' '}
            <Link href="/place/changgyeonggung-palace-264350/">Changgyeonggung</Link> is a short walk
            if you still have energy.
          </p>
        </Stop>

        <Stop slug="deoksugung-palace-264316" time="18:00" title="Deoksugung after dark" walk="subway 10 min">
          <p>
            The palace stays open until 21:00 and is lit in the evening. Walk the stone-wall path
            round the outside afterwards. The guard ceremony here runs at the Daehanmun gate
            several times a day.
          </p>
        </Stop>
      </ol>

      <h2 className="sect">The palaces at night</h2>
      <p>
        Beyond the late opening at Deoksugung and Changgyeonggung, several palaces run special
        night programmes in spring and autumn. They need tickets, sell out within minutes of
        release, and some hold places for foreign visitors.
      </p>
      <ul className="tips">
        <li><Link href="/festival/gyeongbokgung-palace-starlight-tour-2648460/">Gyeongbokgung Starlight Tour</Link>, a guided night walk with a royal-kitchen meal, until 24 October.</li>
        <li><Link href="/festival/deoksugung-palace-night-at-seokjojeon-hall-2756396/">Night at Seokjojeon Hall</Link> in Deoksugung, until 18 October.</li>
        <li><Link href="/festival/changgyeonggung-palace-night-banquet-2818138/">Changgyeonggung Night Banquet</Link>, until 4 October.</li>
        <li><Link href="/festival/moonlight-tour-at-changdeokgung-palace-1331175/">Changdeokgung Moonlight Tour</Link>, by lantern through the Secret Garden, each spring and autumn.</li>
      </ul>

      <h2 className="sect">Hanbok, in practice</h2>
      <ul className="tips">
        <li>Rental shops cluster around the Gyeongbokgung and Changdeokgung gates. Two to four hours is typical; hair styling and accessories cost extra.</li>
        <li>Free entry is for traditional-style hanbok. Staff at the gate decide what counts, so very costume-like versions may still pay.</li>
        <li>In winter, shops rent padded jackets and fur shawls to wear over it.</li>
        <li>Wearing hanbok as a foreigner is welcomed, not seen as costume.</li>
      </ul>
      <PlaceRow slugs={[
        'gwanghwamun-gate-264329',
        'jongmyo-shrine-unesco-world-heritage-264351',
        'deoksugung-stone-wall-path-1748351',
      ]} />

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.seoul}
        title="Where to stay in Seoul"
        intro="Jongno and Insadong put you walking distance from the palaces and markets; Myeongdong is central for everything else."
      />

      <p className="strip">
        <Link href="/guides/templestay-korea/">Templestay in Korea</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/seollal-2027/">Seollal: palaces free, closing days flip</Link>
        <Link href="/guides/suwon-day-trip/">Suwon’s fortress palace</Link>
        <Link href="/guides/day-trips-from-seoul/">Day trips from Seoul</Link>
        <Link href="/regions/seoul/">Everything in Seoul</Link>
      </p>

      <RelatedGuides href="/guides/seoul-palaces/" />

      <p className="meta">
        Prices, opening hours and ceremony times are as published by the Korea Heritage Service up to
        September 2026. Hours change by season; closing days move when a public holiday falls on
        them. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
