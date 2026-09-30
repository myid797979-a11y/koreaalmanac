import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, Stop, DayHead, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: '3 Days in Seoul — a first-timer itinerary that respects the closing days',
  description: 'A 3-day Seoul itinerary built around the palace closing days most guides ignore — and Bukchon’s 5pm curfew, which now carries a fine.',
};

export default function SeoulThreeDays() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: '3 Days in Seoul', path: '/guides/seoul-3-days/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/seoul-3-days/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › 3 Days in Seoul
      </div>

      <h1>3 days in Seoul, planned around what is actually open</h1>
      <p className="sub">
        Most three-day Seoul itineraries fall apart on contact with the city, because they
        ignore two things: the palaces close on different weekdays, and Bukchon Hanok Village
        now fines visitors who turn up after 5pm. This one is built around those facts — and
        around distances we measured rather than guessed.
      </p>

      <GuideHero slugs={[
        'gyeongbokgung-palace-264337',
        'bukchon-hanok-village-561382',
        'changdeokgung-palace-complex-unesco-world-heritage-site-264348',
      ]} />

      <div className="callout callout-warn">
        <strong>Read this before you fix your dates.</strong>
        <ul>
          <li><strong>Gyeongbokgung and Jongmyo close on Tuesdays.</strong></li>
          <li><strong>Changdeokgung, Changgyeonggung and Deoksugung close on Mondays.</strong></li>
          <li>
            <strong>Bukchon&apos;s main alley is off-limits from 17:00 to 10:00</strong> and the
            fine is ₩100,000. Enforcement began in March 2025 and is still running.
          </li>
        </ul>
        <p className="meta" style={{ margin: '8px 0 0' }}>
          If your trip lands on a Monday or Tuesday, swap Day 1 and Day 2 rather than losing a palace.
        </p>
      </div>

      <h2 className="sect">Four things worth knowing first</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Palace ticket</th>
            <td>
              Buy the <strong>integrated ticket, ₩6,000</strong> — all four palaces plus Jongmyo,
              valid six months. Single entry is ₩3,000, so it pays for itself at the second
              palace. Many English guides still quote ₩10,000 for three months; that version no
              longer exists. Changdeokgung&apos;s Huwon garden is <em>not</em> included.
            </td>
          </tr>
          <tr>
            <th>Wear hanbok, enter free</th>
            <td>
              Rental shops cluster around Gyeongbokgung, and a hanbok gets you into all four
              palaces and Jongmyo free, any nationality. It must be a real set — jeogori top
              with the ribbons tied, plus skirt or trousers. Jeogori over jeans is refused.
            </td>
          </tr>
          <tr>
            <th>Maps</th>
            <td>
              <strong>Google Maps cannot give walking or driving directions in Korea</strong> — a
              mapping-data export restriction, not a bug. Download <strong>Naver Map</strong>{' '}
              before you fly, and KakaoMap plus Kakao T if you plan to take taxis.
            </td>
          </tr>
          <tr>
            <th>Transport</th>
            <td>
              A T-money card from any convenience store costs ₩2,500–5,000 empty; load
              ₩30,000–40,000 for three days. Subway from ₩1,550, buses ₩1,500, transfers free
              within 30 minutes — but tap off when leaving a bus or you lose the discount.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.seoul3}
        title="Book ahead for Seoul"
        intro="The attraction pass pays off if you do the tower, a palace and a museum or two; hanbok gets you into the palaces free."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.seoul}
        title="Where to stay"
        intro="For this route, stay near Line 3 or Line 2: Jongno and Insadong for the palaces, Myeongdong for everything else, Hongdae for the evenings."
      />

      <DayHead
        day="Day 1"
        title="The palace quarter, entirely on foot"
        sub="Everything today sits inside a 1.5 km circle. You will walk between all of it."
        avoid="Tuesday (Gyeongbokgung closed)"
      />

      <ol className="g-timeline">
        <Stop slug="gwanghwamun-gate-264329" time="09:30" title="Gwanghwamun Gate">
          <p>
            Arrive ahead of the crowd for the <strong>Changing of the Royal Guard at 10:00</strong>{' '}
            — 20 minutes, free, outside the ticket gate, repeated at 14:00. It is cancelled in
            heavy rain, below −10 °C, above 30 °C, and on Tuesdays.
          </p>
        </Stop>

        <Stop slug="gyeongbokgung-palace-264337" time="10:20" title="Gyeongbokgung Palace">
          <p>
            The largest of the five palaces, founded 1395, burned during the Imjin War and
            rebuilt in the 1860s. Give it <strong>1.5–2 hours</strong>. The National Folk Museum
            and National Palace Museum are on the grounds and free.
          </p>
        </Stop>

        <Stop
          slug="bukchon-hanok-village-561382"
          time="12:30"
          title="Lunch, then Bukchon Hanok Village"
          walk="900 m walk"
        >
          <p>
            A residential hill of tiled-roof hanok between two palaces — people live here, which
            is exactly why the curfew exists. Come <strong>between 10:00 and 17:00</strong>, keep
            your voice down in the alleys, allow an hour. Only the Bukchon-ro 11-gil alley is
            restricted; the wider neighbourhood and its cafés are not.
          </p>
        </Stop>

        <Stop
          slug="changdeokgung-palace-complex-unesco-world-heritage-site-264348"
          time="14:30"
          title="Changdeokgung Palace"
          walk="400 m walk"
        >
          <p>
            UNESCO-listed, and the palace Joseon kings actually preferred — it follows the
            hillside instead of flattening it. The <strong>Huwon (Secret Garden) needs a separate
            ₩5,000 timed ticket</strong>: 100 people per session, half online from six days
            ahead, half on the day from 09:00. Unlike what most English guides say, the guided
            tour is <em>not</em> compulsory — since 2023 you may walk the route at your own pace.
            English commentary at 10:30, 11:30, 14:30, 15:30.
          </p>
        </Stop>

        <Stop
          slug="ikseon-dong-hanok-street-2943972"
          time="17:00"
          title="Ikseon-dong, then Insadong"
          walk="500 m walk"
        >
          <p>
            Ikseon-dong is a 1920s hanok district turned into a dense grid of small restaurants
            and coffee bars.{' '}
            <Link href="/place/insadong-cultural-street-3075115/">Insadong</Link> next door is the
            traditional crafts and tea street. Both are better in the evening, and both are a
            few minutes&apos; walk from where the day ends.
          </p>
        </Stop>
      </ol>

      <div className="callout">
        <strong>Arriving on a Monday?</strong> Changdeokgung is closed. Do Gyeongbokgung and
        Bukchon in the morning and{' '}
        <Link href="/place/jongmyo-shrine-unesco-world-heritage-264351/">Jongmyo Shrine</Link>{' '}
        after — but note Jongmyo runs <strong>timed guided entry Mon/Wed/Thu/Fri</strong>{' '}
        (English 10:00, 12:00, 14:00, 16:00, about 50 minutes). Saturdays you can roam freely.
      </div>

      <DayHead
        day="Day 2"
        title="The modern city, and the mountain in the middle of it"
        sub="This one spreads out, so it is a subway day. Nothing here depends on the weekday."
      />

      <ol className="g-timeline">
        <Stop slug="deoksugung-palace-264316" time="Morning" title="Deoksugung Palace">
          <p>
            The smallest palace and the strangest — Joseon halls standing beside Western stone
            buildings from the 1900s, the decade Korea was trying to modernise its way out of
            being carved up. ₩1,000, or free on your integrated ticket. Open until{' '}
            <strong>21:00</strong>, and free every Wednesday since August 2026.
          </p>
        </Stop>

        <Stop slug="myeong-dong-264312" time="Midday" title="Myeongdong" walk="700 m walk">
          <p>
            Cosmetics, street food, and the densest concentration of English-speaking retail in
            the country. Ninety minutes of walking and eating rather than a destination in itself.
          </p>
        </Stop>

        <Stop slug="seoul-namsan-park-264320" time="Afternoon" title="Namsan Park and N Seoul Tower" walk="1.2 km, or cable car">
          <p>
            The mountain in the middle of the city. Walk up through the park or take the cable
            car — the view is the point, and it is far better an hour before sunset than at noon.
          </p>
        </Stop>

        <Stop slug="cheonggyecheon-museum-268210" time="Evening" title="Cheonggyecheon stream walk">
          <p>
            A stream that was paved over, built on, and then dug back out in 2005 when the
            elevated expressway above it was demolished. Walking it after dark — below street
            level, traffic overhead — is the best free hour in central Seoul.
          </p>
        </Stop>
      </ol>

      <DayHead
        day="Day 3"
        title="Pick one direction"
        sub="By now you know what you like. Three routes that work — each a half-day plus dinner, each in a different part of the city."
      />

      <h3 className="g-opt">Parks and river</h3>
      <p>
        <Link href="/place/seoul-forest-789696/">Seoul Forest</Link> in the morning, then walk
        into Seongsu — a former shoe-factory district now full of converted-warehouse cafés —
        and finish at a Han River park in the evening.
      </p>
      <PlaceRow slugs={['seoul-forest-789696', 'seongsu-museum-3394605']} />

      <h3 className="g-opt">Markets and old streets</h3>
      <p>
        Start at <Link href="/place/gwangjang-market-273761/">Gwangjang Market</Link> — the
        oldest daily market in the country and the best eating in central Seoul, at its most
        alive around 11:00 before the queues build. Work west through
        <Link href="/place/dongdaemun-shopping-complex-dongdaemun-shopping-town-273734/">
        Dongdaemun</Link>&apos;s fabric and tool markets, and end in Euljiro&apos;s printing
        alleys, which turn into bars after dark.
      </p>
      <p>
        For something smaller, <Link href="/place/tongin-market-1823985/">Tongin Market</Link>
        beside Gyeongbokgung runs on brass tokens — buy a tray of them at the entrance and
        spend them stall to stall. It pairs naturally with Day 1.
      </p>
      <PlaceRow slugs={['gwangjang-market-273761', 'tongin-market-1823985']} />

      <h3 className="g-opt">With children</h3>
      <p>
        Lotte World is 12 km southeast and takes a full day — do not try to pair it with
        anything. Entry is around ₩64,000, the one case where a Discover Seoul Pass may pay for
        itself.
      </p>

      <h2 className="sect">What this leaves out, deliberately</h2>
      <p>
        Three days is not enough for the DMZ, which eats a full day including the drive, or for
        a day trip to Suwon Hwaseong. Both deserve a longer trip. Shopping is kept light here —
        if that is your priority, Myeongdong and Dongdaemun can each absorb a day on their own.
      </p>

      <h2 className="sect">Check what is on while you are here</h2>
      <p>
        Seoul runs festivals, traditional performances and museum exhibitions year round, and
        they change weekly. Put your actual dates into the{' '}
        <Link href="/plan/">Trip Planner</Link> to see what falls inside your trip, or browse{' '}
        <Link href="/regions/seoul/">everything in Seoul</Link>.
      </p>

      <p className="strip">
        <Link href="/guides/korean-food-guide/">Eating in Korea</Link>
        <Link href="/guides/seoul-palaces/">Seoul’s five palaces</Link>
        <Link href="/regions/seoul/">Seoul: places &amp; events</Link>
        <Link href="/places/palaces-heritage/">Palaces &amp; heritage</Link>
        <Link href="/events/traditional/">Traditional performances</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <RelatedGuides href="/guides/seoul-3-days/" />

      <p className="meta">
        Fees, hours and closing days verified against the Korea Heritage Service in September
        2026. Palace admission is under review and may rise on 1 January 2027. Photographs:
        Korea Tourism Organization. Rules change — check the official page for anything your
        trip depends on.
      </p>
    </div>
  );
}
