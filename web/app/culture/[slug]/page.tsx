import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  cultureBySlug, cultureParams, cultureDateRange, liveCulture, KIND_META, isLongRun, uniqueCultureTitle } from '@/lib/culture';
import { today } from '@/lib/data';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import { SITE_URL, clampDesc } from '@/lib/site';

export function generateStaticParams() {
  return cultureParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = cultureBySlug(slug);
  if (!c) return {};
  const where = [c.venue, c.region].filter(Boolean).join(', ');
  return {
    title: uniqueCultureTitle(c) + ' — ' + KIND_META[c.kind].label,
    description: clampDesc(c.title + ' at ' + where + ', ' + cultureDateRange(c) + '. ' + (c.overview ?? '')),
    openGraph: { title: c.title, images: c.image ? [c.image] : [] },
  };
}

export default async function CultureDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = cultureBySlug(slug);
  if (!c) notFound();

  const t = today();
  const isTrad = c.kind === 'traditional';
  const hubPath = isTrad ? '/events/traditional/' : '/events/exhibitions/';
  const hubName = isTrad ? 'Traditional' : 'Exhibitions';
  const hasMap = Boolean(c.gpsX && c.gpsY);
  const mapQ = hasMap ? c.gpsY + ',' + c.gpsX : encodeURIComponent((c.venue ?? '') + ', South Korea');

  const nearby = liveCulture(c.kind, t)
    .filter(x => x.id !== c.id && x.region === c.region)
    .slice(0, 6);

  const eventLd = {
    '@context': 'https://schema.org',
    '@type': isTrad ? 'TheaterEvent' : 'ExhibitionEvent',
    name: c.title,
    startDate: c.start.slice(0, 4) + '-' + c.start.slice(4, 6) + '-' + c.start.slice(6, 8),
    endDate: c.end.slice(0, 4) + '-' + c.end.slice(4, 6) + '-' + c.end.slice(6, 8),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: c.venue ?? c.region,
      address: c.addr ?? (c.region + ', South Korea'),
    },
    ...(c.image ? { image: [c.image] } : {}),
    ...(c.overview ? { description: c.overview.slice(0, 500) } : {}),
    url: SITE_URL + '/culture/' + c.slug + '/',
  };
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: hubName, path: hubPath },
    { name: c.title, path: '/culture/' + c.slug + '/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(eventLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href={hubPath}>{hubName}</Link> › {c.title}
      </div>

      {c.image && <div className="hero"><img src={c.image} alt={c.title} /></div>}

      <h1>{c.title}</h1>
      <p className="sub">
        {cultureDateRange(c)} · {c.region}{c.district ? ', ' + c.district : ''}
        {isLongRun(c) && ' · long-running'}
      </p>

      {c.overview && <p className="overview">{c.overview}</p>}

      <table className="facts">
        <tbody>
          <tr><th>Dates</th><td>{cultureDateRange(c)}</td></tr>
          <tr><th>Type</th><td>{KIND_META[c.kind].label}</td></tr>
          {c.venue && <tr><th>Venue</th><td>{c.venue}</td></tr>}
          {c.addr && <tr><th>Address</th><td>{c.addr}</td></tr>}
          {c.price && <tr><th>Admission</th><td>{c.price}</td></tr>}
          {c.tel && <tr><th>Contact</th><td>{c.tel}</td></tr>}
          {c.url && <tr><th>Booking</th><td><a href={c.url} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>Official booking ↗</a></td></tr>}
          {c.venueUrl && <tr><th>Venue site</th><td><a href={c.venueUrl} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>{c.venueUrl.replace(/^https?:\/\//, '').slice(0, 40)} ↗</a></td></tr>}
        </tbody>
      </table>

      <h2 className="sect">Getting there</h2>
      <div className="mapbox">
        <iframe
          src={'https://maps.google.com/maps?q=' + mapQ + '&z=15&output=embed&hl=en'}
          loading="lazy"
          title={'Map of ' + (c.venue ?? c.title)}
        />
        <p className="maplinks strip">
          <a href={'https://www.google.com/maps/search/?api=1&query=' + mapQ} target="_blank" rel="noopener">Open in Google Maps ↗</a>
          <a href={'https://map.kakao.com/?q=' + encodeURIComponent(c.venue ?? c.title)} target="_blank" rel="noopener">Kakao Map for local directions ↗</a>
        </p>
      </div>

      {c.mt && (
        <p className="meta">
          Translated from official Korean culture data. Details can change — confirm with the
          venue before you go.
        </p>
      )}

      {nearby.length > 0 && (
        <>
          <h2 className="sect">More in {c.region}</h2>
          <ul className="agenda">
            {nearby.map(x => (
              <li key={x.id}>
                <span className="ad">{cultureDateRange(x)}</span>
                <Link href={'/culture/' + x.slug + '/'}>{x.title}</Link>
                {x.venue && <span className="meta"> · {x.venue}</span>}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
