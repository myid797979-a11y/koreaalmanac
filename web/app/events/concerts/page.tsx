import Link from 'next/link';
import { today, fmt } from '@/lib/data';
import { upcomingConcerts, concertDateRange, KIND_LABEL, CONCERTS_UPDATED } from '@/lib/concerts';

export const metadata = {
  title: 'Concerts & Music Festivals in Korea',
  description: 'Hand-picked upcoming concerts in Korea — K-pop, EDM and music festivals, awards shows, and international tours — with dates, venues, and practical notes for visitors planning a trip around a show.',
};

export default function ConcertsPage() {
  const t = today();
  const all = upcomingConcerts(t);
  const items = all.filter(c => !c.intl);
  const intl = all.filter(c => c.intl);

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Concerts</div>
      <h1>Concerts &amp; music festivals in Korea</h1>
      <p className="sub">
        A hand-picked list of major upcoming shows — not a complete database.
        We track the events worth planning a trip around: K-pop and arena concerts,
        EDM and music festivals, the big year-end awards nights, and international
        tours passing through. Curated {fmt(CONCERTS_UPDATED)}.
      </p>

      {items.length === 0 ? (
        <div className="ended-banner">
          Nothing confirmed right now — big shows are usually announced 1–3 months ahead.
          Meanwhile, see the <Link href="/events/festivals/music/">music festivals</Link> happening
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
                <h2>
                  <Link href={'/concert/' + c.id + '/'}>
                    {c.title}{c.artist !== 'Various artists' && c.title.indexOf(c.artist) === -1 ? ' — ' + c.artist : ''}
                  </Link>
                </h2>
                <p className="c-venue">
                  {c.venue} · <Link href={'/events/festivals/' + c.region.toLowerCase() + '/'}>{c.city}</Link>
                </p>
                {c.note && <p className="c-note">{c.note}</p>}
                <p className="c-more"><Link href={'/concert/' + c.id + '/'}>Details &amp; venue map →</Link></p>
              </div>
            </article>
          ))}
        </div>
      )}

      {intl.length > 0 && (
        <>
          <h2 className="sect">International tours stopping in Korea</h2>
          <p className="intro">
            Not K-pop, but if you are already here on these dates: major overseas acts
            playing Korean venues. Tickets follow the same Korean platforms and rules below.
          </p>
          <ul className="agenda">
            {intl.map(c => (
              <li key={c.id}>
                <span className="ad">{concertDateRange(c)}</span>
                <Link href={'/concert/' + c.id + '/'}><strong>{c.artist}</strong></Link> · {c.venue} ·{' '}
                <Link href={'/events/festivals/' + c.region.toLowerCase() + '/'}>{c.city}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="sect">Getting tickets</h2>
      <p className="intro">
        Tickets for shows in Korea are sold almost exclusively through Korean
        platforms — Interpark (Global), Melon Ticket, and Yes24 — and popular shows sell
        out in minutes. Most require an account made in advance, and for K-pop concerts
        fan-club presales open before general sale. Always buy from the official seller
        named in the announcement; secondary-market tickets are routinely cancelled at
        the door by identity checks.
        {' '}<Link href="/guides/kpop-tickets/">Read the full K-pop ticket-buying guide →</Link>
      </p>
      <p className="meta">
        Dates and venues are compiled by hand from official announcements and may change —
        always confirm on the artist&apos;s or venue&apos;s official channels before booking travel.
      </p>

      <h2 className="sect">More around your dates</h2>
      <p className="strip">
        <Link href="/plan/">Trip Planner</Link>
        <Link href="/events/festivals/music/">Music festivals</Link>
        <Link href="/events/festivals/">All festivals</Link>
        <Link href="/calendar/">Calendar</Link>
      </p>
    </>
  );
}
