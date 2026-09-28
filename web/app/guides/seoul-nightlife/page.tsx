import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Seoul after dark — nightlife by neighbourhood, what it costs, and how to get home',
  description: 'Hongdae for clubs and live music, Itaewon for international bars, Gangnam for the big clubs, Seongsu for techno and wine, Euljiro for beer on plastic stools, the river for a picnic at midnight. The 19+ passport rule, prices, last trains and night taxis.',
};

export default function SeoulNightlife() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Seoul after dark', path: '/guides/seoul-nightlife/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Seoul after dark
      </div>

      <h1>Seoul after dark: where to go, neighbourhood by neighbourhood</h1>
      <p className="sub">
        Seoul is a late city. Restaurants serve until midnight, bars until three or four, clubs
        until the first trains, and a whole layer of the place — convenience-store tables,
        24-hour soup kitchens, coin karaoke rooms, bathhouses you can sleep in — exists for the
        hours in between. The trick is that each neighbourhood does one kind of night well, and
        the distances between them are real. Pick one, go there, and stay.
      </p>

      <GuideHero slugs={[
        'banpo-bridge-rainbow-fountain-1011983',
        'euljiro-nogari-alley-3013976',
        'itaewon-shopping-street-273721',
      ]} />

      <div className="callout">
        <strong>Three rules that apply everywhere</strong>
        <ul>
          <li>
            <strong>19 and over, passport in hand.</strong> Clubs and many bars check ID at the
            door and a photo of your passport is not accepted. Korean drinking age is 19 by
            international count.
          </li>
          <li>
            <strong>The subway stops around midnight</strong> — a little later on Fridays and
            Saturdays on some lines, earlier on Sundays. After that it is night buses (the
            N-numbered routes) or taxis, which carry a 20–40% surcharge between 22:00 and 04:00
            and are hard to find outside the big districts.
          </li>
          <li>
            <strong>No tipping, no smoking indoors,</strong> and in most bars you are expected to
            order a plate of something (<em>anju</em>) with the first round.
          </li>
        </ul>
      </div>

      <h2 className="sect">The neighbourhoods</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Hongdae</th>
            <td>
              The default. Students, indie bands in basement live houses, hip-hop and EDM clubs
              with ₩10,000–30,000 covers, street performers until late, and food at every
              price. Around Hongik University Station (Line 2, AREX) and spreading into{' '}
              <strong>Yeonnam-dong</strong> for quieter bars along the old railway park. The one
              area where the night genuinely runs until the first train.
            </td>
          </tr>
          <tr>
            <th>Itaewon</th>
            <td>
              International Seoul: the bars where the menus are in English by default, a
              well-established gay strip on the hill behind the station, and craft beer and
              rooftops in <strong>Gyeongnidan</strong> and <strong>Haebangchon</strong> up the
              slope toward Namsan. Quieter than it was — the district has been careful with
              crowds since 2022 — and better for it on an ordinary weekend. Itaewon Station,
              Line 6.
            </td>
          </tr>
          <tr>
            <th>Gangnam &amp; Cheongdam</th>
            <td>
              The big clubs — multi-floor, international DJs, dress codes, covers of ₩30,000 and
              up on weekends and table service in the hundreds of thousands. Cheongdam’s clubs
              host the touring names (see <Link href="/events/concerts/">the concert list</Link>{' '}
              for who is playing). Be warned that a few Gangnam doors have turned away visitors
              on a foreign passport alone; Hongdae and Itaewon do not do this.
            </td>
          </tr>
          <tr>
            <th>Seongsu</th>
            <td>
              Converted warehouses and shoe factories east of the river: natural-wine bars,
              late cafés, and the techno club <strong>UNDERCITY</strong>, which books the
              Berlin and Amsterdam circuit. The most current-feeling night in the city, and the
              one that ends earliest — many places close by one. Seongsu Station, Line 2.
            </td>
          </tr>
          <tr>
            <th>Euljiro</th>
            <td>
              Old print-shop alleys behind the office towers. <strong>Nogari Alley</strong> is
              draught beer and dried pollock on plastic stools across a whole street from early
              evening; the surrounding blocks hide bars in unmarked upstairs rooms that the city
              calls “hip-jiro”. Cheap, local, and closes around midnight. Euljiro 3-ga Station,
              Lines 2 and 3.
            </td>
          </tr>
          <tr>
            <th>Ikseon-dong</th>
            <td>
              Hanok alleys turned into cocktail bars, tea houses and tiny restaurants, five
              minutes from Jongno 3-ga. Beautiful and early — most doors shut by 23:00, which
              makes it a first stop rather than a last one.
            </td>
          </tr>
          <tr>
            <th>The river</th>
            <td>
              Seoul’s cheapest and most local night out: a mat on the grass at{' '}
              <strong>Yeouido</strong> or <strong>Banpo</strong> Hangang Park, fried chicken
              delivered to the park gate, ramyeon from the convenience-store machines, and the{' '}
              <strong>Banpo Bridge fountain</strong> playing coloured water to music on spring
              and summer evenings. Drinking is allowed in most of the parks; a few zones are now
              marked alcohol-free, so read the signs.
            </td>
          </tr>
          <tr>
            <th>Namsan</th>
            <td>
              Not a party, but the night view everyone wants. The tower and the walking paths
              stay open late, and the walk down through Haebangchon into Itaewon is the best
              route into the evening.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'yeonnam-dong-2484384',
        'ikseon-dong-hanok-street-2943972',
        'apgujeong-rodeo-street-264107',
      ]} />

      <h2 className="sect">What things cost</h2>
      <table className="facts">
        <tbody>
          <tr><th>Beer or soju in a restaurant</th><td>₩5,000–9,000 a bottle. Convenience-store prices are a third of that, and drinking at the tables outside is normal.</td></tr>
          <tr><th>Cocktails</th><td>₩15,000–22,000 in Itaewon and Seongsu; more in Cheongdam hotel bars.</td></tr>
          <tr><th>Club entry</th><td>₩10,000–30,000 in Hongdae, usually with a drink; ₩30,000–50,000 in Gangnam on weekends; special nights with touring DJs are ticketed separately.</td></tr>
          <tr><th>Karaoke</th><td>Coin <em>noraebang</em> booths from ₩1,000 for a few songs; a private room ₩15,000–30,000 an hour.</td></tr>
          <tr><th>Taxi across town after midnight</th><td>₩15,000–30,000 with the night surcharge. Use the Kakao T app to hail; if it will not take a foreign card, pay the driver by card in the cab.</td></tr>
        </tbody>
      </table>

      <h2 className="sect">How a Korean night is shaped</h2>
      <p>
        Locals move in rounds: <em>il-cha</em> is dinner with drinks, <em>i-cha</em> a bar or
        a beer place, <em>sam-cha</em> karaoke or a late soup. Nobody stays in one venue for
        five hours, which is why the streets are as lively as the bars. Joining in is easy —
        the anju rule means every bar is half a restaurant — and the soup at the end is the
        secret to the next morning: <em>gukbap</em> or <em>haejangguk</em> places in every
        district serve it 24 hours.
      </p>
      <p>
        When the trains have stopped and the taxis are gone, a <em>jjimjilbang</em>, the
        Korean bathhouse with sleeping halls, costs ₩15,000–25,000 for the night and is a
        perfectly respectable place to wake up. The larger ones in Yongsan and Gangnam are
        used exactly this way every weekend.
      </p>

      <h2 className="sect">Getting home, honestly</h2>
      <ol className="steps">
        <li>
          <strong>Know your last train.</strong> The station boards show it; the app Naver Map
          does too. Plan to be on the platform ten minutes before, because the last train is
          the one everyone else is also aiming for.
        </li>
        <li>
          <strong>Night buses run all night on the main roads</strong> — the N routes, roughly
          every 30–40 minutes. Slow but dependable between Hongdae, City Hall, Dongdaemun and
          Gangnam.
        </li>
        <li>
          <strong>Or stay in the neighbourhood.</strong> Hongdae and Itaewon have hotels at
          every price within walking distance of the bars; Gangnam’s are a taxi ride from its
          clubs. Choosing a hotel in the district you plan to go out in removes the whole
          problem.
        </li>
      </ol>

      <h2 className="sect">Halloween and the big nights</h2>
      <p>
        Halloween in Hongdae, the last Friday before Christmas, and New Year’s Eve around
        Bosingak are the nights the city manages with crowd controls, one-way streets and
        closed station exits. They are worth seeing and worth reading about first — the{' '}
        <Link href="/guides/halloween-seoul-2026/">Halloween guide</Link> and the{' '}
        <Link href="/guides/christmas-new-year-seoul/">Christmas and New Year guide</Link>{' '}
        cover what changes.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.nightlife}
        title="Easy first nights"
        intro="For the first evening, or if you are on your own."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.nightlife}
        title="Sleep where you go out"
        intro="Hongdae or Itaewon for walking home; Gangnam if the clubs are the plan."
      />

      <p className="strip">
        <Link href="/events/concerts/">Concerts and club nights</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/place/gwangjang-market-273761/">Gwangjang Market</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <p className="meta">
        Prices are typical ranges as of September 2026 and vary by venue and night. Last-train
        times differ by line and are posted in stations; the taxi night surcharge is the Seoul
        rate in force since late 2022. Alcohol-free zones in the Han River parks are marked on
        site. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
