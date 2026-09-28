import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Seollal 2027 in Korea — 6 to 9 February: what closes, what opens free, and how to travel',
  description: 'Korea’s lunar new year is Sunday 7 February 2027, with a four-day holiday from the 6th to the 9th. Trains sell out, small restaurants close, the palaces open free and flip their closing days. How to plan a trip that overlaps it.',
};

export default function Seollal2027() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Seollal 2027', path: '/guides/seollal-2027/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Seollal 2027
      </div>

      <h1>Seollal 2027: the four days that reorganise Korea</h1>
      <p className="sub">
        <strong>Seollal, the lunar new year, falls on Sunday 7 February 2027.</strong> The public
        holiday runs from <strong>Saturday 6 to Tuesday 9 February</strong> — the Tuesday is a
        substitute day because the holiday itself lands on a Sunday. It is the biggest family
        holiday of the year, half the country travels to a hometown and back inside those four
        days, and a trip that overlaps it needs planning that a normal week does not. It also
        has real upsides, if you know which ones.
      </p>

      <GuideHero slugs={[
        'gyeongbokgung-palace-264337',
        'namsangol-hanok-village-264116',
        'korean-folk-village-264121',
      ]} />

      <div className="callout callout-warn">
        <strong>One day later than Chinese New Year.</strong>
        <p>
          In 2027 the new moon falls just before midnight in Beijing but just after it in Seoul,
          so <strong>Chinese New Year is Saturday 6 February and Korean Seollal is Sunday 7
          February</strong>. If you are arriving from celebrations elsewhere in Asia, Korea’s
          calendar is a day behind, and the holiday closures run a day later than you might
          expect.
        </p>
      </div>

      <h2 className="sect">What happens</h2>
      <p>
        Families gather at the eldest son’s home on the morning of the 7th for <em>charye</em>,
        a rite of offerings to ancestors, then <em>sebae</em>, the formal new-year bow to elders
        that children are paid for in crisp notes, then <em>tteokguk</em>, the rice-cake soup
        that by tradition makes you a year older when you finish it. Many wear hanbok. The
        following days are for visiting the other side of the family and for the roads home.
      </p>
      <p>
        For a visitor, the visible effects are: the exodus out of Seoul on the 5th and 6th and
        back on the 8th and 9th, a city that is briefly quiet and traffic-free in between, and a
        wave of closures among small, family-run businesses that the chains and the big
        attractions do not follow.
      </p>

      <h2 className="sect">Open, closed, and free</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Palaces</th>
            <td>
              Open every day of the holiday, and in recent years <strong>free of charge</strong>{' '}
              throughout it. The regular closing day does not apply when it falls on a holiday,
              so Gyeongbokgung should open on Tuesday the 9th and Changdeokgung and Deoksugung on
              Monday the 8th, with the closures shifting to <strong>Wednesday 10 February</strong>.
              Keep the Wednesday for something else. The rule and the free-entry notice are
              published each year; confirm in late January.
            </td>
          </tr>
          <tr>
            <th>Museums</th>
            <td>
              The National Museum of Korea and the National Folk Museum (inside Gyeongbokgung)
              close on Seollal day itself, the 7th, and open on the other days — usually with
              free folk-game programmes in the courtyards. Private museums vary.
            </td>
          </tr>
          <tr>
            <th>Restaurants and shops</th>
            <td>
              Independent restaurants, cafés and shops close for two or three days, typically the
              6th to the 8th. Chains, convenience stores, hotel restaurants and the food halls of
              department stores stay open, though most department stores close on the 7th itself.
              Tourist districts — Myeongdong, Hongdae, Insadong — keep a majority of doors open.
            </td>
          </tr>
          <tr>
            <th>Markets</th>
            <td>
              Traditional markets are at their busiest in the days before and largely shut on
              the 7th. Gwangjang Market’s food alley runs a skeleton crew; do not build a day
              around it.
            </td>
          </tr>
          <tr>
            <th>Theme parks and ski</th>
            <td>
              Everland, Lotte World and every ski resort are open and at capacity. Book ski
              transport and lift passes ahead; walk-up on the 7th and 8th is a bad afternoon.
            </td>
          </tr>
          <tr>
            <th>Banks and offices</th>
            <td>Closed from the 6th to the 9th. Currency exchange at the airport and hotels works; bank branches do not.</td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">Getting around the country, or not</h2>
      <p>
        <strong>KTX</strong> seats for the holiday are released in a special sale about a month
        beforehand and are gone the same morning. The Korail Pass remains valid but seat
        reservations on the peak days are scarce, so expect to stand or to travel at odd hours.
        Domestic flights to Jeju fill weeks ahead. Motorways are famously solid — the Seoul to
        Busan drive can double — and express buses are the honest fallback, since they add
        departures and sell in the terminal on the day.
      </p>
      <p>
        The practical advice is simple: <strong>stay in one city</strong> across the four days
        and do the long-distance move before the 5th or after the 9th. Incheon Airport is at its
        busiest of the year for outbound Koreans on the 5th and 6th and inbound on the 9th and
        10th, which affects check-in queues more than immigration for foreign passports.
      </p>

      <h2 className="sect">Why it is a good week to be in Seoul</h2>
      <p>
        The city empties. The palaces are free and photograph better without crowds, the
        subway is quiet, taxis are available, and the folk programmes are genuinely charming:{' '}
        <strong>Namsangol Hanok Village</strong> and the <strong>Korean Folk Village</strong>{' '}
        south of the city run yut-nori board games, kite-flying, tteok-pounding and hanbok
        try-ons across the holiday, mostly free. Wear hanbok to a palace on the 7th and you will
        be photographed by strangers all afternoon. Mountain trails are empty; Bukhansan on
        Seollal morning is as close to solitude as Seoul gets.
      </p>
      <PlaceRow slugs={[
        'namsangol-hanok-village-264116',
        'korean-folk-village-264121',
        'bukchon-hanok-village-561382',
      ]} />

      <h2 className="sect">Two things to eat</h2>
      <p>
        <em>Tteokguk</em>, the new-year soup of sliced rice cake in a clear beef broth, is on
        every menu that is open and is the one dish to order that day. <em>Jeon</em>, the
        savoury pancakes fried for the ancestral table, are sold hot in the markets in the days
        before and are the best snack of the week. Both are cheap, everywhere, and briefly
        seasonal in a way little else in Korean food is.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.seollal}
        title="Worth sorting before the week"
        intro="Hanbok gets you into the palaces free and into every photograph; the eSIM saves the bank-branch problem."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.seollal}
        title="Stay in one city"
        intro="Seoul is the easy answer for the four days: everything that stays open is here, and nothing requires a train."
      />

      <p className="strip">
        <Link href="/guides/korea-in-winter/">Korea in winter</Link>
        <Link href="/guides/christmas-new-year-seoul/">Christmas &amp; New Year</Link>
        <Link href="/events/festivals/february/">February festivals</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <p className="meta">
        Holiday dates follow the published national calendar, including the substitute day on
        9 February. Palace opening and free-admission rules are as published by the Royal Palaces
        and Tombs Centre for recent holidays; each year’s specific notice appears shortly before
        Seollal. Closures of private businesses are typical patterns, not guarantees.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
