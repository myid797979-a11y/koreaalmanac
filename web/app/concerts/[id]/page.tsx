import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  concertById, concertParams, concertDateRange, KIND_LABEL, upcomingConcerts, CONCERTS_UPDATED,
} from '@/lib/concerts';
import { fmt, today } from '@/lib/data';

export function generateStaticParams() {
  return concertParams();
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = concertById(id);
  if (!c) return { title: 'Concert' };
  const who = c.artist === 'Various artists' ? '' : c.artist + ' — ';
  return {
    title: who + c.title + ' (' + fmt(c.start) + ')',
    description: `${c.title} at ${c.venue}, ${c.city} — ${concertDateRange(c)}. Dates, venue map, and ticket info for K-pop fans visiting Korea.`,
  };
}

export default async function ConcertDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = concertById(id);
  if (!c) notFound();

  const t = today();
  const mapQuery = encodeURIComponent(c.venue + ', South Korea');
  const others = upcomingConcerts(t).filter(x => x.id !== c.id).slice(0, 6);
  const showArtist = c.artist !== 'Various artists' && c.title.indexOf(c.artist) === -1;

  return (
    <>
      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/concerts/">Concerts</Link> › {c.title}
      </div>

      <div className="c-hero">
        <span className={'c-kind k-' + c.kind}>{KIND_LABEL[c.kind]}</span>
        <h1>{c.title}</h1>
        {showArtist && <p className="c-hero-artist">{c.artist}</p>}
        <p className="c-hero-when">{concertDateRange(c)} · {c.venue}, {c.city}</p>
      </div>

      {c.video && (
        <div className="c-video">
          <iframe
            src={'https://www.youtube.com/embed/' + c.video}
            title={c.title + ' — official video'}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <p className="meta">Official video via the artist&apos;s YouTube channel.</p>
        </div>
      )}

      {c.note && <p className="overview">{c.note}</p>}

      <table className="facts">
        <tbody>
          <tr><th>Dates</th><td>{concertDateRange(c)}</td></tr>
          <tr><th>Type</th><td>{KIND_LABEL[c.kind]}</td></tr>
          <tr><th>Venue</th><td>{c.venue}</td></tr>
          <tr><th>City</th><td><Link href={'/festivals/' + c.region.toLowerCase() + '/'}>{c.city}</Link></td></tr>
          {c.artist !== 'Various artists' && <tr><th>Artist</th><td>{c.artist}</td></tr>}
          {c.ticket && <tr><th>Official tickets</th><td><a href={c.ticket} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>Official ticketing ↗</a></td></tr>}
        </tbody>
      </table>

      <h2 className="sect">Getting there</h2>
      <div className="mapbox">
        <iframe
          src={'https://maps.google.com/maps?q=' + mapQuery + '&z=13&output=embed&hl=en'}
          loading="lazy"
          title={c.venue + ' map'}
        />
        <p className="maplinks strip">
          <a href={'https://www.google.com/maps/search/?api=1&query=' + mapQuery} target="_blank" rel="noopener">Open in Google Maps ↗</a>
          <a href={'https://map.kakao.com/?q=' + mapQuery} target="_blank" rel="noopener">Kakao Map for local directions ↗</a>
        </p>
      </div>

      <h2 className="sect">Tickets</h2>
      <p className="overview">
        K-pop tickets in Korea sell through Korean platforms (Interpark Global, Melon
        Ticket, Yes24) and popular shows sell out in minutes. Buy only from the seller
        named in the official announcement — resold tickets are routinely voided by
        identity checks at the door.
        {' '}<Link href="/concerts/tickets/">Read the full ticket-buying guide →</Link>
      </p>
      <p className="meta">
        Compiled by hand from official announcements and last checked {fmt(CONCERTS_UPDATED)};
        dates and venues can change, so confirm on the artist&apos;s or venue&apos;s official channels before booking travel.
      </p>

      {others.length > 0 && (
        <>
          <h2 className="sect">Other upcoming shows</h2>
          <ul className="agenda">
            {others.map(x => (
              <li key={x.id}>
                <span className="ad">{concertDateRange(x)}</span>
                <Link href={'/concerts/' + x.id + '/'}>{x.artist === 'Various artists' ? x.title : x.artist}</Link>
                {' · '}{x.city}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
