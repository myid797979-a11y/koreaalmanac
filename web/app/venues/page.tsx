import Link from 'next/link';
import { venues, concertsAtVenue } from '@/lib/venues';
import { today } from '@/lib/data';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';

export const metadata = {
  title: 'Korea concert venues — how to get there, what to expect, where to stay',
  description: 'Guides to the venues where international tours and K-pop concerts play in Korea: Goyang Stadium, INSPIRE Arena, Olympic Park, KINTEX, Gocheok Sky Dome and more. Nearest station, route from the airport, tips.',
};

export default function VenuesIndex() {
  const t = today();
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Concerts', path: '/events/concerts/' },
    { name: 'Venues', path: '/venues/' },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <div className="crumb"><Link href="/">Home</Link> › <Link href="/events/concerts/">Concerts</Link> › Venues</div>
      <h1>Concert venues in Korea</h1>
      <p className="sub">
        The nine places where the shows on this site actually happen — which station, how far from
        Incheon Airport, what the room is like, and where fans stay. Written for people flying in for
        one show.
      </p>

      <ul className="venue-list">
        {venues.map(v => {
          const { upcoming } = concertsAtVenue(v, t);
          return (
            <li key={v.slug}>
              <h2><Link href={'/venue/' + v.slug + '/'}>{v.name}</Link></h2>
              <p className="meta">{v.korean} · {v.city}</p>
              <p>{v.tagline}</p>
              <p className="venue-station">{v.station}</p>
              {upcoming.length > 0 && (
                <p className="meta">
                  {upcoming.length === 1 ? '1 show' : upcoming.length + ' shows'} coming up:{' '}
                  {upcoming.slice(0, 3).map(c => c.artist === 'Various artists' ? c.title : c.artist).join(', ')}
                  {upcoming.length > 3 ? '…' : ''}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <p className="strip">
        <Link href="/events/concerts/">All concerts</Link>
        <Link href="/guides/kpop-tickets/">How to buy K-pop tickets</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>
    </>
  );
}
