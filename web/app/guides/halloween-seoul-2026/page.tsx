import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Halloween in Seoul 2026 — where it happens now, and how the city manages the crowds',
  description: 'Halloween 2026 falls on a Saturday. Since 2022 the night has moved: Hongdae is the street party, the theme parks run horror seasons, the clubs sell tickets, and Itaewon is quiet. What to expect from the crowd controls, and how to do the night well.',
};

export default function HalloweenSeoul2026() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Halloween in Seoul 2026', path: '/guides/halloween-seoul-2026/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/halloween-seoul-2026/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Halloween in Seoul 2026
      </div>

      <h1>Halloween in Seoul, 2026: where it happens now</h1>
      <p className="sub">
        Halloween is not a holiday in Korea, but for fifteen years it has been one of Seoul’s
        biggest nights out — a costume street party that grew up in Itaewon and spread to
        Hongdae and Gangnam. Since the crowd crush of October 2022 the night has changed shape:
        the city now manages it as a public-safety event, Itaewon has stepped back, and the
        energy has moved to Hongdae, to the theme parks and to ticketed parties.{' '}
        <strong>In 2026 Halloween falls on a Saturday</strong>, the first time since 2022 that
        the date itself lands on a weekend night, so expect the largest crowds and the tightest
        controls yet.
      </p>

      <GuideHero slugs={[
        'itaewon-shopping-street-273721',
        'everland-264235',
        'lotte-world-264152',
      ]} />

      <div className="callout callout-warn">
        <strong>Read this before anything else.</strong>
        <p>
          On the night of 29 October 2022, 159 people died in a crowd crush in a narrow sloping
          alley beside the Hamilton Hotel in Itaewon. Since then Seoul’s Halloween weekends have
          run under crowd-management rules: police and district staff on the main streets,{' '}
          <strong>one-way pedestrian flows</strong> in the busiest lanes, subway exits closed
          when platforms fill, and real-time crowd-density monitoring. If you are asked to move
          or to go a particular way, do it. Do not stop in a packed alley for a photograph. If a
          street feels too full to move freely, it is — leave it.
        </p>
      </div>

      <h2 className="sect">Where the night happens now</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Hongdae</th>
            <td>
              The street party moved here and stayed. The pedestrian streets around Hongik
              University Station fill with costumes from early evening, the clubs and bars run
              parties, and Mapo district and the police manage the flow with barriers and
              one-way lanes. It is the place to go if you want the scene — and the place to
              arrive early, before 20:00, while you can still choose where you stand.
            </td>
          </tr>
          <tr>
            <th>Itaewon</th>
            <td>
              Bars and restaurants open as usual, but there has been no organised street
              celebration since 2022 and most businesses keep the decorations down. The alley
              where the crush happened is now a memorial path with information boards. People
              still come, quietly; treat it as what it is.
            </td>
          </tr>
          <tr>
            <th>Gangnam and Cheongdam</th>
            <td>
              Halloween is a ticketed club night here — international DJs, costume contests,
              cover charges well above a normal Saturday. Buy tickets in advance, bring your
              passport (age 19 and over, checked at the door), and expect queues even with a
              ticket.
            </td>
          </tr>
          <tr>
            <th>Seongsu</th>
            <td>
              Brand pop-ups and bars do Halloween decor and themed menus through the last week
              of October, with less of a crowd problem than Hongdae. A good early-evening stop
              before heading west.
            </td>
          </tr>
          <tr>
            <th>Theme parks</th>
            <td>
              <strong>Everland</strong> has run a Halloween horror season every autumn for years
              — haunted zones, night parades, costumed staff — from September into November, and
              it is the most fun you can have on the night without a crowd-safety worry.{' '}
              <strong>Lotte World</strong> runs its own Halloween programme indoors and out, and
              Legoland Korea in Chuncheon does a family version. All three are at their busiest
              on the 31st itself; the weekends before are calmer.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'itaewon-shopping-street-273721',
        'everland-264235',
        'lotte-world-264152',
      ]} />

      <h2 className="sect">A plan for the Saturday</h2>
      <ol className="steps">
        <li>
          <strong>Decide between the street and a ticket.</strong> Hongdae is free and
          spectacular but you do not control the crowd. A club ticket or a theme-park evening
          gives you a fixed place to be. On a Saturday-night Halloween, the second is the
          better bet for most visitors.
        </li>
        <li>
          <strong>If it is Hongdae, go early and leave early.</strong> Arrive by 19:00, eat
          first, walk the streets while the costumes come out, and be on the subway by 23:00.
          The hour after midnight is the one the crowd controls are designed for.
        </li>
        <li>
          <strong>Stay within walking distance.</strong> Taxis are effectively unavailable in
          Hongdae, Itaewon and Gangnam after midnight on Halloween, and station exits may be
          closed. A hotel you can walk to solves the whole evening.
        </li>
        <li>
          <strong>Keep your costume practical.</strong> Full-face masks get you refused at club
          doors that check ID, long props do not fit in a crowd, and late October is cold after
          dark. Cheap costumes and face paint are at any Daiso from early October; the Hongdae
          rental shops have better ones.
        </li>
      </ol>

      <h2 className="sect">Getting home</h2>
      <p>
        The subway runs until around midnight on Saturdays, later on the lines that extend
        hours for the night, and the last trains are announced in the week before. Hongik
        University Station has exits on three lines (2, AREX, Gyeongui-Jungang), and when one
        is closed for crowd control the others usually are not — walk to the next one rather
        than waiting. Night buses (the N-routes) run through the small hours along the main
        roads, but they are slow and full on this night.
      </p>

      <h2 className="sect">The alley</h2>
      <p>
        The memorial path in Itaewon is a few metres from the Hamilton Hotel, on the alley
        that leads uphill from the main road. It is marked, small, and usually has flowers. If
        you are in Itaewon on the night, the right thing to do is to walk past it quietly and to
        keep moving on the streets around it. The families of the victims have asked for exactly
        that.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.halloween}
        title="The controlled options"
        intro="Theme-park Halloween is the one version of the night with a ticket, a gate and a crowd limit."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.halloween}
        title="Stay where you can walk home"
        intro="Hongdae for the street party, Gangnam for the club nights. Either way, no taxi needed."
      />

      <p className="strip">
        <Link href="/guides/seoul-nightlife/">Seoul after dark, neighbourhood by neighbourhood</Link>
        <Link href="/events/concerts/">Concerts and club nights this month</Link>
        <Link href="/events/festivals/october/">October festivals</Link>
        <Link href="/guides/christmas-new-year-seoul/">Christmas &amp; New Year</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <p className="meta">
        Crowd-management measures are as applied in the Halloween weekends since 2023; the
        specific arrangements for 2026 (station closures, road closures, one-way streets) are
        published by the Seoul Metropolitan Government and the police in the last week of
        October. Theme-park programmes and dates are announced by each park in September.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
