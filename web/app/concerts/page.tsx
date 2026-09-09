import Link from 'next/link';
import { today, fmt } from '@/lib/data';
import { upcomingConcerts, concertDateRange, KIND_LABEL, CONCERTS_UPDATED } from '@/lib/concerts';

export const metadata = {
  title: 'K-Pop Concerts & Awards in Korea',
  description: 'Hand-picked upcoming K-pop concerts, awards shows, and music festivals in Korea — dates, venues, and practical notes for visitors planning a trip around a show.',
};

export default function ConcertsPage() {
  const t = today();
  const items = upcomingConcerts(t);

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › K-Pop</div>
      <h1>K-pop concerts &amp; awards in Korea</h1>
      <p className="sub">
        A hand-picked list of major upcoming shows — not a complete database.
        We track the events worth planning a trip around: arena and stadium concerts,
        the big year-end awards nights, and multi-artist festivals.
        Curated {fmt(CONCERTS_UPDATED)}.
      </p>

      {items.length === 0 ? (
        <div className="ended-banner">
          Nothing confirmed right now — big shows are usually announced 1–3 months ahead.
          Meanwhile, see the <Link href="/festivals/music/">music festivals</Link> happening
          across Korea, or plan around dates with the <Link href="/plan/">Trip Planner</Link>.
        </div>
      ) : (
        <div className="concert-list">
          {items.map(c => (
            <article key={c.id} className="concert">
              <div className="c-date">
                <span className="c-when">{concertDateRange(c)}</span>
                <span className={'c-kind k-' + c.kind}>{KIND_LABEL[c.kind]}</span>
              </div>
              <div className="c-body">
                <h2>{c.title}{c.artist !== 'Various artists' && c.title.indexOf(c.artist) === -1 ? ' — ' + c.artist : ''}</h2>
                <p className="c-venue">
                  {c.venue} · <Link href={'/festivals/' + c.region.toLowerCase() + '/'}>{c.city}</Link>
                </p>
                <p className="c-note">{c.note}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      <h2 className="sect">Getting tickets</h2>
      <p className="intro">
        Tickets for K-pop shows in Korea are sold almost exclusively through Korean
        platforms — Interpark (Global), Melon Ticket, and Yes24 — and popular shows sell
        out in minutes. Most require an account made in advance, and fan-club presales
        open before general sale. Always buy from the official seller announced by the
        artist&apos;s agency; secondary-market tickets are routinely cancelled at the door
        by identity checks.
        {' '}<Link href="/concerts/tickets/">Read the full ticket-buying guide →</Link>
      </p>
      <p className="meta">
        Dates and venues are compiled by hand from official announcements and may change —
        always confirm on the artist&apos;s or venue&apos;s official channels before booking travel.
      </p>

      <h2 className="sect">More around your dates</h2>
      <p className="strip">
        <Link href="/plan/">Trip Planner</Link>
        <Link href="/festivals/music/">Music festivals</Link>
        <Link href="/festivals/">All festivals</Link>
        <Link href="/calendar/">Calendar</Link>
      </p>
    </>
  );
}
