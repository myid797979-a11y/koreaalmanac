import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card, { Stamp } from '@/app/components/Card';
import Gallery from '@/app/components/Gallery';
import {
  festivals, bySlug, status, dateRange, daysUntil, today,
  icsHref, MONTH_SLUGS, MONTHS_FULL, categoryLabel, uniqueTitle } from '@/lib/data';
import { festivalJsonLd, breadcrumbJsonLd, ldStr } from '@/lib/jsonld';

export function generateStaticParams() {
  return festivals.map(f => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = bySlug(slug);
  if (!f) return {};
  const description = (f.title + ', ' + f.region + ', ' + dateRange(f) + '. ' + (f.overview ?? '')).slice(0, 155);
  return {
    title: uniqueTitle(f) + ' — dates, fees, location',
    description,
    openGraph: {
      title: f.title,
      description,
      images: f.image ? [f.image] : [],
    },
  };
}

export default async function FestivalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = bySlug(slug);
  if (!f) notFound();

  const t = today();
  const badge = <Stamp f={f} t={t} inline />;
  const nearby = festivals
    .filter(x => x.id !== f.id && x.region === f.region && status(x, t) !== 'ended')
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''))
    .slice(0, 4);

  const hasMap = Boolean(f.mapx && f.mapy);

  const eventLd = festivalJsonLd(f);
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Festivals', path: '/events/festivals/' },
    { name: f.region, path: '/events/festivals/' + f.region.toLowerCase() + '/' },
    { name: f.title, path: '/festival/' + f.slug + '/' },
  ]);

  return (
    <>
      {eventLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(eventLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <div className="crumb">
        <Link href="/">Festivals</Link> › <Link href={'/events/festivals/' + f.region.toLowerCase() + '/'}>{f.region}</Link> › {f.title}
      </div>

      {f.image && <div className="hero"><img src={f.image} alt={f.title} /></div>}

      <h1>{f.title} {badge}</h1>
      <p className="sub">{dateRange(f)} · {f.region}</p>

      {(f.tags ?? []).length > 0 && (
        <p className="strip" style={{ marginTop: -10 }}>
          {f.tags!.map(tg => (
            <Link key={tg} className="chip" href={'/events/festivals/' + tg + '/'}>{categoryLabel(tg)}</Link>
          ))}
        </p>
      )}

      {status(f, t) === 'ended' && (
        <div className="ended-banner">
          This festival has ended — many return annually, so it may come back next year.
          {' '}<Link href={'/events/festivals/' + f.region.toLowerCase() + '/'}>See current festivals in {f.region}</Link>
          {' '}or <Link href="/plan/">plan around your dates</Link>.
        </div>
      )}

      <table className="facts">
        <tbody>
          <tr><th>Dates</th><td>{dateRange(f)}</td></tr>
          {f.place && <tr><th>Venue</th><td>{f.place}</td></tr>}
          {f.addr && <tr><th>Address</th><td>{f.addr}</td></tr>}
          {f.fee && <tr><th>Admission</th><td>{f.fee}</td></tr>}
          {f.hours && <tr><th>Hours</th><td>{f.hours}</td></tr>}
          {f.duration && <tr><th>Duration</th><td>{f.duration}</td></tr>}
          {f.tel && <tr><th>Contact</th><td>{f.tel}</td></tr>}
          {f.homepage && <tr><th>Website</th><td><a href={f.homepage} target="_blank" style={{ textDecoration: 'underline' }}>{f.homepage.replace('https://', '').replace('http://', '').slice(0, 50)} ↗</a></td></tr>}
        </tbody>
      </table>

      <p className="strip">
        {icsHref(f) && <a href={icsHref(f)!} download={f.slug + '.ics'}>Add to calendar (.ics)</a>}
        {f.start && (
          <Link href={'/events/festivals/' + MONTH_SLUGS[Number(f.start.slice(4, 6)) - 1] + '/'}>
            All Korea festivals in {MONTHS_FULL[Number(f.start.slice(4, 6)) - 1]}
          </Link>
        )}
        <Link href={'/events/festivals/' + f.region.toLowerCase() + '/'}>All {f.region} festivals</Link>
      </p>

      {hasMap && (
        <div className="mapbox">
          <iframe
            src={'https://maps.google.com/maps?q=' + f.mapy + ',' + f.mapx + '&z=14&output=embed&hl=en'}
            loading="lazy"
            title={'Map of ' + f.title}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <p className="strip maplinks">
            <a href={'https://www.google.com/maps/search/?api=1&query=' + f.mapy + ',' + f.mapx} target="_blank" rel="noopener">Open in Google Maps ↗</a>
            <a href={'https://map.kakao.com/link/map/' + encodeURIComponent(f.title) + ',' + f.mapy + ',' + f.mapx} target="_blank" rel="noopener">Kakao Map for local directions ↗</a>
          </p>
        </div>
      )}

      {f.overview && (
        <div className="overview">
          <h2 className="sect">About</h2>
          {f.overview.split('. ').reduce<string[][]>((acc, s, i) => {
            const gi = Math.floor(i / 4);
            (acc[gi] ??= []).push(s);
            return acc;
          }, []).map((g, i) => <p key={i}>{g.join('. ')}</p>)}
          {f.mt && (
            <p className="meta">
              Description translated from official Korean tourism data. Details can change — verify with the organizer before you go.
            </p>
          )}
        </div>
      )}

      {(f.images ?? []).filter(u => u !== f.image).length > 0 && (
        <>
          <h2 className="sect">Photos</h2>
          <Gallery images={f.images!.filter(u => u !== f.image)} alt={f.title} />
          <p className="meta">Photos: Korea Tourism Organization</p>
        </>
      )}

      {nearby.length > 0 && (
        <>
          <h2 className="sect">More festivals in {f.region}</h2>
          <div className="grid">
            {nearby.map(x => <Card key={x.id} f={x} t={t} />)}
          </div>
        </>
      )}
    </>
  );
}
