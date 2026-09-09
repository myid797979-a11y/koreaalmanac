import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card from '@/app/components/Card';
import { REGIONS, festivals, status, today, regionFestivals } from '@/lib/data';
import { placesByRegion, catMeta, PLACE_CATS, type Place } from '@/lib/places';
import { liveCulture } from '@/lib/culture';
import { upcomingConcerts } from '@/lib/concerts';

export function generateStaticParams() {
  return REGIONS.map(r => ({ region: r.toLowerCase() }));
}

function properName(slug: string): string | undefined {
  return REGIONS.find(r => r.toLowerCase() === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const name = properName(region);
  if (!name) return {};
  return {
    title: name + ', Korea — what to see and what’s on',
    description: `Places to visit and events happening in ${name}, Korea — attractions, festivals, performances and exhibitions with dates, maps and photos.`,
  };
}

function PlaceCard({ p }: { p: Place }) {
  return (
    <Link href={'/place/' + p.slug + '/'} className="card">
      <div className="phwrap"><img className="ph" src={p.image} alt={p.title} loading="lazy" /></div>
      <div className="body">
        <div className="when">{catMeta(p.cat).label}</div>
        <h3>{p.title.replace(/\s*\([^)]*\)\s*$/, '')}</h3>
      </div>
    </Link>
  );
}

export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const name = properName(region);
  if (!name) notFound();

  const t = today();
  const spots = placesByRegion(name);
  const fests = regionFestivals(name).filter(f => status(f, t) !== 'ended');
  const concerts = upcomingConcerts(t).filter(c => c.region === name);
  const culture = [...liveCulture('traditional', t), ...liveCulture('exhibition', t)]
    .filter(c => c.region === name);

  // 카테고리별로 묶어 보여준다 — 지역 안에서는 "무엇을 볼까"가 다음 질문
  const byCat = PLACE_CATS
    .map(c => ({ meta: c, items: spots.filter(p => p.cat === c.cat) }))
    .filter(g => g.items.length > 0)
    .sort((a, b) => b.items.length - a.items.length);

  return (
    <>
      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/regions/">Regions</Link> › {name}
      </div>
      <h1>{name}</h1>
      <p className="sub">
        {spots.length} places to visit
        {fests.length > 0 && ` · ${fests.length} festivals on or coming up`}
        {culture.length > 0 && ` · ${culture.length} shows and exhibitions`}
      </p>

      <p className="strip">
        {byCat.map(g => (
          <Link key={g.meta.slug} className="chip" href={'/places/' + g.meta.slug + '/'}>
            {g.meta.label} ({g.items.length})
          </Link>
        ))}
      </p>

      {byCat.slice(0, 4).map(g => (
        <section key={g.meta.slug}>
          <div className="sect-row">
            <h2 className="sect">{g.meta.label}</h2>
            <Link className="more" href={'/places/' + g.meta.slug + '/'}>all {g.meta.label.toLowerCase()} →</Link>
          </div>
          <div className="grid">{g.items.slice(0, 8).map(p => <PlaceCard key={p.id} p={p} />)}</div>
        </section>
      ))}

      {fests.length > 0 && (
        <>
          <div className="sect-row">
            <h2 className="sect">Festivals in {name}</h2>
            <Link className="more" href={'/events/festivals/' + region + '/'}>all {fests.length} →</Link>
          </div>
          <div className="grid">{fests.slice(0, 8).map(f => <Card key={f.id} f={f} t={t} />)}</div>
        </>
      )}

      {(culture.length > 0 || concerts.length > 0) && (
        <>
          <h2 className="sect">On stage &amp; on show</h2>
          <ul className="agenda">
            {concerts.slice(0, 4).map(c => (
              <li key={c.id}>
                <span className="ad">{c.start.slice(4, 6)}/{c.start.slice(6, 8)}</span>
                <Link href={'/concert/' + c.id + '/'}>{c.artist === 'Various artists' ? c.title : c.artist}</Link>
                <span className="meta"> · {c.venue}</span>
              </li>
            ))}
            {culture.slice(0, 8).map(c => (
              <li key={c.id}>
                <span className="ad">{c.start.slice(4, 6)}/{c.start.slice(6, 8)}</span>
                <Link href={'/culture/' + c.slug + '/'}>{c.title}</Link>
                {c.venue && <span className="meta"> · {c.venue}</span>}
              </li>
            ))}
          </ul>
        </>
      )}

      {byCat.length > 4 && (
        <>
          <h2 className="sect">More in {name}</h2>
          <div className="grid">
            {byCat.slice(4).flatMap(g => g.items).slice(0, 8).map(p => <PlaceCard key={p.id} p={p} />)}
          </div>
        </>
      )}

      <h2 className="sect">Other regions</h2>
      <p className="strip">
        {REGIONS.filter(r => r !== name).map(r => (
          <Link key={r} href={'/regions/' + r.toLowerCase() + '/'}>{r}</Link>
        ))}
      </p>
    </>
  );
}
