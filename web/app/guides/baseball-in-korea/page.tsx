import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'How to see a baseball game in Korea — tickets, stadiums, and the cheering',
  description: 'KBO baseball is the best cheap night out in Korea: ₩15,000 seats, bring-your-own chicken and beer, and a cheer squad for every batter. Which stadium, how a foreigner actually gets a ticket, and when the season runs. Plus K League football.',
};

export default function BaseballInKorea() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Baseball in Korea', path: '/guides/baseball-in-korea/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Baseball in Korea
      </div>

      <h1>How to see a baseball game in Korea</h1>
      <p className="sub">
        The KBO League is the thing visitors most often say they wish they had known about
        sooner. It is cheap, it is loud in a way American baseball is not — every batter has a
        song, a cheer captain and a squad of dancers leading 20,000 people through it — and you
        can bring in your own food and beer. The regular season runs from late March to early
        October and the postseason through October into early November, so autumn visitors get
        the best of it. This page covers how to get in, which stadium to pick, and what the
        night is like.
      </p>

      <GuideHero slugs={[
        'gocheok-sky-dome-3006386',
        'olympic-park-789703',
        'haeundae-beach-264155',
      ]} />

      <div className="callout">
        <strong>The season at a glance</strong>
        <table className="facts" style={{ marginTop: 10 }}>
          <tbody>
            <tr><th>Late March – early October</th><td>Regular season, 144 games a team. Weekday games start around 18:30, weekend games in the afternoon or at 17:00. Mondays are off.</td></tr>
            <tr><th>October – early November</th><td>Postseason: Wild Card, Semi-Playoff, Playoff, then the best-of-seven Korean Series. Tickets are the hardest of the year.</td></tr>
            <tr><th>November – March</th><td>Off-season. The stadiums host concerts instead — see the venue guides for <Link href="/venue/gocheok-sky-dome/">Gocheok Sky Dome</Link> and <Link href="/venue/jamsil/">Jamsil</Link>.</td></tr>
            <tr><th>Rain</th><td>Open-air games are called off for rain, often late; Gocheok’s dome is the only guarantee. Cancelled tickets refund automatically.</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="sect">Ten teams, nine stadiums</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Seoul · Jamsil</th>
            <td>
              <strong>LG Twins</strong> and <strong>Doosan Bears</strong> share Jamsil Baseball
              Stadium, so there is a home game here most nights of the week. Sports Complex
              Station, Lines 2 and 9. The loudest crowd in Seoul when LG are winning.
            </td>
          </tr>
          <tr>
            <th>Seoul · Gocheok</th>
            <td>
              <strong>Kiwoom Heroes</strong> at Gocheok Sky Dome, the country’s only domed
              stadium. Guil Station, Line 1. The rain-proof choice, and usually the easiest
              Seoul ticket.
            </td>
          </tr>
          <tr>
            <th>Incheon</th>
            <td><strong>SSG Landers</strong> at Incheon SSG Landers Field, next to Munhak Stadium. Munhak Sports Complex Station on Incheon Line 1.</td>
          </tr>
          <tr>
            <th>Suwon</th>
            <td><strong>KT Wiz</strong> at Suwon KT Wiz Park, an hour south of Seoul on Line 1.</td>
          </tr>
          <tr>
            <th>Busan</th>
            <td>
              <strong>Lotte Giants</strong> at Sajik Stadium — the most famous crowd in the
              league, known for the orange plastic bags worn as hats and the collective shout of
              “Ma!” at opposing pitchers. Sajik Station, Busan Line 3.
            </td>
          </tr>
          <tr>
            <th>Daegu</th>
            <td><strong>Samsung Lions</strong> at Daegu Samsung Lions Park, one of the newest and best-designed grounds.</td>
          </tr>
          <tr>
            <th>Daejeon</th>
            <td><strong>Hanwha Eagles</strong>, in a brand-new ballpark that opened in 2025 and has been sold out most nights since.</td>
          </tr>
          <tr>
            <th>Gwangju</th>
            <td><strong>KIA Tigers</strong> at Champions Field. The league’s most decorated club and a serious, passionate crowd.</td>
          </tr>
          <tr>
            <th>Changwon</th>
            <td><strong>NC Dinos</strong> at Changwon NC Park, a short ride from Busan.</td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={['gocheok-sky-dome-3006386']} />

      <h2 className="sect">Tickets: the honest version</h2>
      <p>
        Every club sells through one Korean platform — Interpark, Ticketlink or its own app —
        and most of them assume a Korean phone number and ID at sign-up. Overseas visitors have
        three realistic routes, in order of how often they work.
      </p>
      <ol className="steps">
        <li>
          <strong>The box office on the day.</strong> For most weekday games and many weekend
          ones there are seats at the stadium ticket windows an hour or two before first pitch,
          ₩10,000–25,000 for ordinary seats and less in the outfield. This is how most foreign
          visitors actually get in. It does not work for the big sellouts: LG or Doosan at
          Jamsil on a weekend, Lotte in Busan, Hanwha in Daejeon, and anything in the
          postseason.
        </li>
        <li>
          <strong>Packages sold to overseas visitors.</strong> Tour platforms list tickets for
          Seoul games in the foreign-visitor market, sometimes with a guide who explains the
          cheering. Dearer than the window, but bookable from abroad with a foreign card and
          worth it for a weekend game.
        </li>
        <li>
          <strong>A Korean friend.</strong> Anyone with a Korean account can buy on your behalf
          and hand over the tickets on the platform or in person. Postseason tickets are
          released online and sell out in minutes, so this is the only way in for October.
        </li>
      </ol>
      <p>
        Resold tickets on unofficial sites carry the same risk as concert tickets: clubs void
        them. If a price looks too easy for a sold-out game, it is.
      </p>

      <h2 className="sect">What the night is like</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>The cheering</th>
            <td>
              Each team has a cheer captain with a microphone and a squad of cheerleaders on a
              stage in the stands. Every batter has his own song; the crowd sings all of them.
              Inflatable thundersticks are sold at the gate for a few thousand won and are
              compulsory in spirit. Sit in your team’s section (home first base, away third
              base) to be in it.
            </td>
          </tr>
          <tr>
            <th>Food</th>
            <td>
              You can bring in anything except glass. The convention is fried chicken — the
              delivery riders wait at the gates — and canned beer or draught from the
              concourse. Convenience stores inside the stadiums sell the rest.
            </td>
          </tr>
          <tr>
            <th>Length</th>
            <td>Three hours and a bit. Nobody leaves early; the late innings are when the songs get loudest.</td>
          </tr>
          <tr>
            <th>Weather</th>
            <td>April and October evenings are cold once the sun goes; July and August are hot and humid and the rain calls come late. Bring a layer either way.</td>
          </tr>
          <tr>
            <th>Getting out</th>
            <td>The stations cope better than at concerts, because the crowd leaves over half an hour rather than all at once. Jamsil and Gocheok both empty in 20–30 minutes.</td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">Which stadium to pick</h2>
      <p>
        For a first game in Seoul, <strong>Jamsil</strong> on a weeknight: the Twins or the
        Bears at home, tickets at the window, and the cheering at full strength. If rain is in
        the forecast or the visit is short, <strong>Gocheok</strong>: the dome guarantees play
        and the Heroes rarely sell out. If you are in <strong>Busan</strong>, Sajik is the one
        stadium worth planning a trip around — the Giants’ crowd is the league’s spectacle
        whatever the score — and the <Link href="/guides/busan-2-days/">Busan guide</Link>{' '}
        fits it into two days.
      </p>

      <h2 className="sect">Football, briefly</h2>
      <p>
        K League 1 runs from late February or March to November with twelve clubs. In Seoul,{' '}
        <strong>FC Seoul</strong> play at Seoul World Cup Stadium in Sangam (World Cup Stadium
        Station, Line 6), where the national team also plays its home qualifiers; tickets for
        league games are easy on the day and cheap, and the atmosphere is friendlier than the
        stadium’s size suggests. Incheon United, Suwon FC and Ulsan HD are the other
        visitor-friendly grounds. It is a good second night if the baseball has got under your
        skin.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.baseball}
        title="Tickets from abroad"
        intro="The foreign-visitor listings for Seoul games — the second route above."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.baseball}
        title="Where to stay for a game"
        intro="Jamsil and Gangnam put you on Line 2 for Jamsil; Haeundae or Seomyeon for Sajik."
      />

      <p className="strip">
        <Link href="/venue/gocheok-sky-dome/">Gocheok Sky Dome</Link>
        <Link href="/venue/jamsil/">Jamsil Sports Complex</Link>
        <Link href="/guides/kpop-tickets/">How Korean ticketing works</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <p className="meta">
        Season structure, ticket prices and stadium details as of September 2026; the KBO
        publishes each season’s schedule in January and the postseason dates in September.
        Start times vary by club and month — check the fixture. Photographs: Korea Tourism
        Organization.
      </p>
    </div>
  );
}
