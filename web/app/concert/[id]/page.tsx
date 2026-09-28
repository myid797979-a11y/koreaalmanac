import { clampDesc } from '@/lib/site';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  concertById, concertParams, concertDateRange, KIND_LABEL, upcomingConcerts, CONCERTS_UPDATED,
} from '@/lib/concerts';
import { fmt, today } from '@/lib/data';
import { concertJsonLd, breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import { venueForConcert } from '@/lib/venues';

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
    description: clampDesc(`${c.title} at ${c.venue}, ${c.city} — ${concertDateRange(c)}. Dates, venue map and ticket info.`),
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
  const venue = venueForConcert(c);   // 가이드가 있는 공연장이면 링크 (9곳)

  const eventLd = concertJsonLd(c);
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Concerts', path: '/events/concerts/' },
    { name: c.title, path: '/concert/' + c.id + '/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(eventLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/events/concerts/">Concerts</Link> › {c.title}
      </div>

      {c.end < t && (
        <div className="ended-banner">
          This show has finished.
          {' '}<Link href="/events/concerts/">See what is coming up</Link>
          {' '}or <Link href="/plan/">plan around your dates</Link>.
        </div>
      )}

      <div className={c.poster ? 'c-hero has-poster' : 'c-hero'}>
        {c.poster && (
          <img className="c-poster" src={c.poster} alt={c.title + ' poster'} />
        )}
        <div className="c-hero-text">
          <span className={'c-kind k-' + c.kind}>{KIND_LABEL[c.kind]}</span>
          <h1>{c.title}</h1>
          {showArtist && <p className="c-hero-artist">{c.artist}</p>}
          <p className="c-hero-when">{concertDateRange(c)} · {c.venue}, {c.city}</p>
        </div>
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

      {(c.overview || c.note) && <p className="overview">{c.overview || c.note}</p>}

      <table className="facts">
        <tbody>
          <tr><th>Dates</th><td>{concertDateRange(c)}</td></tr>
          {c.showTimes && <tr><th>Show times</th><td>{c.showTimes}</td></tr>}
          <tr><th>Type</th><td>{KIND_LABEL[c.kind]}</td></tr>
          <tr><th>Venue</th><td>
            {c.venue}
            {venue && <> · <Link href={'/venue/' + venue.slug + '/'}>Venue guide: getting there, tips, hotels →</Link></>}
          </td></tr>
          <tr><th>City</th><td><Link href={'/events/festivals/' + c.region.toLowerCase() + '/'}>{c.city}</Link></td></tr>
          {c.artist !== 'Various artists' && <tr><th>Artist</th><td>{c.artist}</td></tr>}
          {c.ticketInfo && <tr><th>Tickets</th><td>{c.ticketInfo}</td></tr>}
          {c.price && <tr><th>Admission</th><td>{c.price}</td></tr>}
        </tbody>
      </table>

      {c.tip && (
        <p className="c-tip"><strong>For visitors:</strong> {c.tip}</p>
      )}

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
        Tickets in Korea sell through Korean platforms (Interpark Global, Melon Ticket,
        Yes24) and popular shows sell out fast. Buy only from the seller named in the
        official announcement — resold tickets are routinely voided by identity checks
        at the door.
        {c.kind === 'concert' && !c.intl && (
          <>{' '}<Link href="/guides/kpop-tickets/">Read the full K-pop ticket-buying guide →</Link></>
        )}
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
                <Link href={'/concert/' + x.id + '/'}>{x.artist === 'Various artists' ? x.title : x.artist}</Link>
                {' · '}{x.city}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
