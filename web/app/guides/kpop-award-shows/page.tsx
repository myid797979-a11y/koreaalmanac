import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, VENUE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'K-pop award shows 2026–27: which are in Korea, the dates, and how to get tickets',
  description: 'The year-end K-pop award season for visitors: KGMA and the Melon Music Awards at the Gocheok Sky Dome in November, the broadcasters’ December music festivals, and which big shows are abroad this year (MAMA in Osaka, AAA in Kaohsiung, Golden Disc in Hanoi). How tickets work and how to plan a trip around them.',
};

export default function AwardShows() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'K-pop award shows 2026–27', path: '/guides/kpop-award-shows/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/kpop-award-shows/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › K-pop award shows 2026–27
      </div>

      <h1>K-pop award shows 2026–27: dates and how to get in</h1>
      <p className="sub">
        From November to January, K-pop’s award shows turn into the biggest multi-artist concerts of
        the year: a dozen or more groups on one stage, special collaborations, and the only chance
        to see many of them live in a single night. Several of the biggest have moved abroad this
        season, so it matters which ones are actually in Korea.
      </p>

      <div className="callout">
        <strong>In Korea this season</strong>
        <ul>
          <li><Link href="/concert/kgma-2026/">Korea Grand Music Awards (KGMA)</Link>: <strong>7–8 November</strong>, Gocheok Sky Dome, Seoul.</li>
          <li><Link href="/concert/melon-music-awards-2026/">Melon Music Awards (MMA)</Link>: <strong>14–15 November</strong>, Gocheok Sky Dome, Seoul. Two days for the first time.</li>
          <li><strong>The broadcasters’ year-end music festivals</strong> in December: SBS Gayo Daejeon traditionally on Christmas Day, KBS Song Festival in the second half of December, MBC Gayo Daejejeon on New Year’s Eve. 2026 dates are usually announced in the autumn.</li>
        </ul>
      </div>

      <h2 className="sect">The season at a glance</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>KGMA<br /><span className="meta">7–8 Nov · Seoul</span></th>
            <td>
              Run by Ilgan Sports, in its third year. Two nights with different line-ups: Artist Day
              on the Saturday, Music Day on the Sunday. Broadcast on ENA.
            </td>
          </tr>
          <tr>
            <th>Melon Music Awards<br /><span className="meta">14–15 Nov · Seoul</span></th>
            <td>
              Built on Melon, Korea’s biggest streaming service, and one of the most important
              award nights of the year. Seats are sold, not allocated by lottery, and Melon Ticket
              has an English global site.
            </td>
          </tr>
          <tr>
            <th>MAMA Awards<br /><span className="meta">20–21 Nov · Osaka</span></th>
            <td>
              CJ ENM’s ceremony, the most international of them, is at the Kyocera Dome in{' '}
              <strong>Osaka, Japan</strong> this year, not in Korea.
            </td>
          </tr>
          <tr>
            <th>Asia Artist Awards<br /><span className="meta">5–6 Dec · Kaohsiung</span></th>
            <td>
              At the National Stadium in <strong>Kaohsiung, Taiwan</strong>. Both days sold out
              within minutes.
            </td>
          </tr>
          <tr>
            <th>Broadcaster festivals<br /><span className="meta">Dec · Korea</span></th>
            <td>
              SBS, KBS and MBC each stage a year-end music show with most of the year’s big acts.
              They are TV productions rather than ticketed concerts: audience places go mostly to
              the performing artists’ official fan clubs, with few or none on general sale.
            </td>
          </tr>
          <tr>
            <th>Golden Disc Awards<br /><span className="meta">9–10 Jan 2027 · Hanoi</span></th>
            <td>
              The oldest of the major awards, held in <strong>Hanoi, Vietnam</strong> for its 41st
              edition.
            </td>
          </tr>
        </tbody>
      </table>
      <p className="meta">
        Dates for the shows abroad are as announced by their organisers up to September 2026. Other
        Korean ceremonies, such as the Seoul Music Awards and Circle Chart Music Awards, usually
        fall between January and March.
      </p>

      <h2 className="sect">How tickets work</h2>
      <ul className="tips">
        <li><strong>Buy from the platform the organiser names</strong>, and nowhere else. For MMA that is Melon Ticket, which has an English site and takes international cards; set up the account before the sale opens.</li>
        <li><strong>Check which night your artist is on.</strong> The two-day shows split the line-up, and the full running order often comes out only a week or two before.</li>
        <li><strong>Expect four to five hours.</strong> Awards are handed out between performances, and the biggest acts usually close the night.</li>
        <li><strong>Resale is risky.</strong> Tickets are often tied to the buyer’s name and ID, and resold ones can be refused at the gate. The <Link href="/guides/kpop-tickets/">K-pop tickets guide</Link> covers the platforms and the queue.</li>
        <li><strong>For the broadcaster shows,</strong> watch the official fan-club channels of the artists you follow. Most places are allocated through them.</li>
      </ul>

      <h2 className="sect">Planning a trip around them</h2>
      <p>
        KGMA and MMA fall on consecutive weekends at the same venue, so one trip can cover both. The{' '}
        <Link href="/venue/gocheok-sky-dome/">Gocheok Sky Dome guide</Link> covers the station, the
        crowds after the show and where to stay. November is also the tail of the autumn colour in
        Seoul, and the <Link href="/guides/busan-fireworks-2026/">Busan Fireworks Festival</Link> is on
        7 November, the same Saturday as KGMA.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.venueArrival}
        title="Flying in for the show"
        intro="Data from the moment you land and the fastest train into Seoul."
      />
      <BookBox
        provider="agoda"
        offers={VENUE_STAY['gocheok-sky-dome']}
        title="Where to stay for Gocheok"
        intro="Line 1 runs straight to the dome, so anywhere along it works; book early for award weekends."
      />

      <p className="strip">
        <Link href="/events/concerts/">All concerts and award shows</Link>
        <Link href="/guides/kpop-tickets/">Buying K-pop tickets as a foreigner</Link>
        <Link href="/venues/">Concert venues</Link>
        <Link href="/events/festivals/november/">Korea in November</Link>
      </p>

      <RelatedGuides href="/guides/kpop-award-shows/" />

      <p className="meta">
        Line-ups, start times and ticket dates are announced by each organiser and change; check the
        official announcement before you book travel.
      </p>
    </div>
  );
}
