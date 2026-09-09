import Link from 'next/link';

export const metadata = {
  title: 'How to Buy K-Pop Concert Tickets as a Foreigner',
  description: 'A practical guide to buying K-pop concert tickets from outside Korea — which platforms to use, how presales work, the queue, identity checks, and how to avoid cancelled scalper tickets.',
};

export default function TicketGuidePage() {
  return (
    <>
      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/concerts/">Concerts</Link> › Tickets
      </div>
      <h1>How to buy K-pop concert tickets as a foreigner</h1>
      <p className="sub">
        Korean concert ticketing is fast, Korean-language-first, and unforgiving —
        popular shows sell out in minutes. This guide covers how it actually works,
        what to set up before the sale, and the mistakes that get tickets cancelled.
      </p>

      <h2 className="sect">Where tickets are actually sold</h2>
      <p className="intro">
        Almost every K-pop concert in Korea sells through one of a handful of Korean
        platforms, and the artist&apos;s agency announces which one for each show.
        There is no Ticketmaster here.
      </p>
      <table className="facts">
        <tbody>
          <tr><th>Interpark Global</th><td>The platform most big tours use for international buyers. English interface, overseas cards accepted, account sign-up with email. If a show you want is on Interpark, use the Global site — the Korean site requires Korean identity verification.</td></tr>
          <tr><th>Melon Ticket</th><td>Common for major idol concerts. Historically harder for foreigners (Korean phone verification), though some shows open a global sale — follow the agency&apos;s announcement for the exact route.</td></tr>
          <tr><th>Yes24 Global</th><td>Frequent for mid-size shows and musicals. Has a working English storefront and takes international cards.</td></tr>
          <tr><th>Weverse / fan-club presale</th><td>Not a ticket seller itself — a paid official membership that unlocks the presale window before general sale. For high-demand groups, the presale is realistically the only chance.</td></tr>
        </tbody>
      </table>

      <h2 className="sect">The timeline: it is a race, not a purchase</h2>
      <p className="intro">
        A typical announcement-to-showtime sequence looks like this: the agency announces
        dates and the ticketing platform → paid fan-club members get a presale window
        (usually a day or two before) → general sale opens at a fixed minute — commonly
        20:00 KST — and the arena sells out within minutes. Cancellation tickets
        (returned seats) are re-released later, usually around a week before the show,
        often at midnight KST, and disappear just as fast.
      </p>

      <h2 className="sect">Set these up before the sale, not during</h2>
      <p className="intro">
        The sale itself is a countdown and a queue. Everything slow — accounts,
        verification, payment — must already be done. Make the platform account days in
        advance and log in before the sale opens. If the group has a fan-club presale
        and you are serious about going, join the membership weeks ahead — it is paid,
        and it needs your legal name exactly as in your passport. Register your birth
        date and name correctly everywhere: high-demand shows check ID at the door, and
        a mismatch means no entry, no refund. Have an internationally usable card ready,
        and know that seat selection runs on a first-click basis inside a waiting-room
        queue — joining the queue one minute early beats a faster connection.
      </p>

      <h2 className="sect">The scalper trap</h2>
      <p className="intro">
        Resold K-pop tickets are a minefield. Agencies actively cancel tickets they
        detect as resold, and identity-check shows make transferred tickets worthless —
        the name on the booking must match the ID presented at entry. Twitter/X and
        proxy-buying services are full of both scams and genuine tickets that will be
        void by showtime. The safe rule: buy only through the platform named in the
        official announcement, and treat anything else as a donation.
      </p>

      <h2 className="sect">If the show is sold out</h2>
      <p className="intro">
        Watch for the official cancellation-ticket release — the date is usually in the
        original ticketing notice. Set an alarm for midnight KST and expect a queue.
        Some tours also run official travel packages for international fans (ticket +
        hotel bundles) sold separately from the main sale; these are announced on the
        artist&apos;s official channels and are legitimate, if pricier. And if it truly
        does not work out: awards shows and festivals put dozens of artists on one
        stage and are announced months ahead — often the better bet for a trip.
      </p>

      <p className="meta">
        Practices vary by agency and show — the official ticketing notice for each
        concert is always the final word.
      </p>

      <h2 className="sect">Plan the rest of the trip</h2>
      <p className="strip">
        <Link href="/concerts/">Upcoming K-pop shows</Link>
        <Link href="/plan/">Trip Planner</Link>
        <Link href="/festivals/music/">Music festivals</Link>
      </p>
    </>
  );
}
