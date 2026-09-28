import Link from 'next/link';
import { notFound } from 'next/navigation';
import { venueBySlug, venueParams, concertsAtVenue, venues } from '@/lib/venues';
import { today, fmt } from '@/lib/data';
import { concertDateRange } from '@/lib/concerts';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import { SITE_URL, clampDesc } from '@/lib/site';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, VENUE_STAY } from '@/lib/affiliate';

export function generateStaticParams() {
  return venueParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = venueBySlug(slug);
  if (!v) return { title: 'Venue' };
  return {
    title: v.name + ' — getting there, what to expect, where to stay',
    description: clampDesc(v.tagline + ' Nearest station, route from Incheon Airport, tips and upcoming shows at ' + v.name + '.'),
  };
}

export default async function VenuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = venueBySlug(slug);
  if (!v) notFound();

  const t = today();
  const { upcoming, past } = concertsAtVenue(v, t);
  const others = venues.filter(x => x.slug !== v.slug);

  const placeLd = {
    '@context': 'https://schema.org',
    '@type': 'StadiumOrArena',
    name: v.name,
    alternateName: v.korean,
    url: SITE_URL + '/venue/' + v.slug + '/',
    address: { '@type': 'PostalAddress', streetAddress: v.addr, addressCountry: 'KR' },
    geo: { '@type': 'GeoCoordinates', latitude: v.lat, longitude: v.lng },
    ...(v.image ? { image: v.image } : {}),
  };
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Concerts', path: '/events/concerts/' },
    { name: 'Venues', path: '/venues/' },
    { name: v.name, path: '/venue/' + v.slug + '/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(placeLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/events/concerts/">Concerts</Link> › <Link href="/venues/">Venues</Link> › {v.name}
      </div>

      {v.image && <div className="hero"><img src={v.image} alt={v.name} /></div>}

      <h1>{v.name}</h1>
      <p className="sub">{v.korean} · {v.city}</p>
      <p className="intro">{v.tagline}</p>

      <div className="overview">
        {v.intro.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <table className="facts">
        <tbody>
          <tr><th>Nearest station</th><td>{v.station}</td></tr>
          <tr><th>From Incheon Airport</th><td>{v.fromAirport}</td></tr>
          <tr><th>Capacity</th><td>{v.capacity}</td></tr>
          <tr><th>Address</th><td>{v.addr}</td></tr>
          {v.official && <tr><th>Official site</th><td><a href={v.official} target="_blank" rel="noopener" style={{ textDecoration: 'underline' }}>{v.official.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗</a></td></tr>}
        </tbody>
      </table>

      <h2 className="sect">Coming up here</h2>
      {upcoming.length > 0 ? (
        <ul className="agenda">
          {upcoming.map(c => (
            <li key={c.id}>
              <span className="ad">{concertDateRange(c)}</span>
              <Link href={'/concert/' + c.id + '/'}>{c.title}</Link>
              {c.artist !== 'Various artists' && c.title.indexOf(c.artist) === -1 && <span className="meta"> · {c.artist}</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="intro">
          Nothing on our list right now — big shows are announced one to three months ahead.
          {' '}<Link href="/events/concerts/">See everything coming up</Link>.
        </p>
      )}
      <p className="meta">
        Hand-picked shows only, not a full venue calendar. How overseas buyers get tickets:{' '}
        <Link href="/guides/kpop-tickets/">the K-pop tickets guide</Link>.
      </p>

      <h2 className="sect">Getting there</h2>
      <div className="mapbox">
        <iframe
          src={'https://maps.google.com/maps?q=' + v.lat + ',' + v.lng + '&z=15&output=embed&hl=en'}
          loading="lazy"
          title={'Map of ' + v.name}
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <p className="strip maplinks">
          <a href={'https://www.google.com/maps/search/?api=1&query=' + v.lat + ',' + v.lng} target="_blank" rel="noopener">Open in Google Maps ↗</a>
          <a href={'https://map.kakao.com/link/map/' + encodeURIComponent(v.korean.split(' · ')[0]) + ',' + v.lat + ',' + v.lng} target="_blank" rel="noopener">Kakao Map for local directions ↗</a>
        </p>
      </div>
      <ul className="tips">
        {v.tips.map((tip, i) => <li key={i}>{tip}</li>)}
      </ul>

      <h2 className="sect">Where to stay</h2>
      <p>{v.stay}</p>
      <BookBox provider="agoda" offers={VENUE_STAY[v.slug] ?? []} title={'Hotels for ' + v.name} />

      <BookBox
        offers={GUIDE_OFFERS.venueArrival}
        title="Sort out before you land"
        intro="Two things every visiting fan needs on arrival, cheaper booked before the flight."
      />

      {past.length > 0 && (
        <>
          <h2 className="sect">Recent shows here</h2>
          <ul className="agenda">
            {past.slice(0, 6).map(c => (
              <li key={c.id}>
                <span className="ad">{fmt(c.start)}</span>
                <Link href={'/concert/' + c.id + '/'}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {(v.slug === 'gocheok-sky-dome' || v.slug === 'jamsil') && (
        <p className="strip">
          <Link href="/guides/baseball-in-korea/">This is also a baseball stadium — how to see a game here →</Link>
        </p>
      )}

      <h2 className="sect">Other venues</h2>
      <p className="strip">
        {others.map(o => <Link key={o.slug} href={'/venue/' + o.slug + '/'}>{o.name}</Link>)}
      </p>

      <p className="meta">
        Transport details as of September 2026: the GTX-A line between Seoul Station and Ilsan opened in
        December 2024, and Jamsil Olympic Main Stadium has been closed for rebuilding since late 2023.
        Capacities are approximate and change with the stage layout. Photographs: Korea Tourism Organization.
      </p>
    </>
  );
}
