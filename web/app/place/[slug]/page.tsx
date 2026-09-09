import Link from 'next/link';
import { notFound } from 'next/navigation';
import { placeBySlug, placeParams, placesByRegion, catMeta } from '@/lib/places';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return placeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = placeBySlug(slug);
  if (!p) return {};
  const clean = p.title.replace(/\s*\([^)]*\)\s*$/, '');
  return {
    title: clean + ' — ' + p.region,
    description: (clean + ', ' + p.region + '. ' + (p.overview ?? catMeta(p.cat).blurb)).slice(0, 155),
    openGraph: { title: clean, images: [p.image] },
  };
}

export default async function PlaceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = placeBySlug(slug);
  if (!p) notFound();

  const meta = catMeta(p.cat);
  const clean = p.title.replace(/\s*\([^)]*\)\s*$/, '');
  const korean = p.title.match(/\(([^)]*[가-힣][^)]*)\)\s*$/)?.[1] ?? null;
  const hasMap = Boolean(p.mapx && p.mapy);
  const mapQ = hasMap ? p.mapy + ',' + p.mapx : encodeURIComponent(clean + ', South Korea');

  const nearby = placesByRegion(p.region).filter(x => x.id !== p.id).slice(0, 6);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: clean,
    ...(p.overview ? { description: p.overview.slice(0, 500) } : {}),
    image: [p.image],
    address: { '@type': 'PostalAddress', addressLocality: p.region, addressCountry: 'KR', ...(p.addr ? { streetAddress: p.addr } : {}) },
    ...(hasMap ? { geo: { '@type': 'GeoCoordinates', latitude: p.mapy, longitude: p.mapx } } : {}),
    url: SITE_URL + '/place/' + p.slug + '/',
  };
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Places', path: '/places/' },
    { name: meta.label, path: '/places/' + meta.slug + '/' },
    { name: clean, path: '/place/' + p.slug + '/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/places/">Places</Link> ›{' '}
        <Link href={'/places/' + meta.slug + '/'}>{meta.label}</Link> › {clean}
      </div>

      <div className="hero"><img src={p.image} alt={clean} /></div>

      <h1>{clean}</h1>
      <p className="sub">
        {korean && <span>{korean} · </span>}
        <Link href={'/regions/' + p.region.toLowerCase() + '/'}>{p.region}</Link>
        {' · '}<Link href={'/places/' + meta.slug + '/'}>{meta.label}</Link>
      </p>

      {p.overview && <p className="overview">{p.overview}</p>}

      <table className="facts">
        <tbody>
          <tr><th>Type</th><td>{meta.label}</td></tr>
          <tr><th>Region</th><td><Link href={'/regions/' + p.region.toLowerCase() + '/'}>{p.region}</Link></td></tr>
          {p.addr && <tr><th>Address</th><td>{p.addr}</td></tr>}
          {p.tel && <tr><th>Contact</th><td>{p.tel}</td></tr>}
        </tbody>
      </table>

      <h2 className="sect">Getting there</h2>
      <div className="mapbox">
        <iframe
          src={'https://maps.google.com/maps?q=' + mapQ + '&z=15&output=embed&hl=en'}
          loading="lazy"
          title={'Map of ' + clean}
        />
        <p className="maplinks strip">
          <a href={'https://www.google.com/maps/search/?api=1&query=' + mapQ} target="_blank" rel="noopener">Open in Google Maps ↗</a>
          <a href={'https://map.kakao.com/?q=' + encodeURIComponent(korean ?? clean)} target="_blank" rel="noopener">Kakao Map for local directions ↗</a>
        </p>
      </div>

      <p className="meta">
        From Korea Tourism Organization open data. Opening hours and admission can change —
        check the official page before you go.
      </p>

      {nearby.length > 0 && (
        <>
          <h2 className="sect">More in {p.region}</h2>
          <div className="grid">
            {nearby.map(x => (
              <Link key={x.id} href={'/place/' + x.slug + '/'} className="card">
                <div className="phwrap"><img className="ph" src={x.image} alt={x.title} loading="lazy" /></div>
                <div className="body">
                  <div className="when">{catMeta(x.cat).label}</div>
                  <h3>{x.title.replace(/\s*\([^)]*\)\s*$/, '')}</h3>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
