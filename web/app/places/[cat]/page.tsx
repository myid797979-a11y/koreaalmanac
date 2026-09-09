import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PLACE_CATS, catBySlug, placesByCat, regionsRanked, type Place,
} from '@/lib/places';

export function generateStaticParams() {
  return PLACE_CATS.map(c => ({ cat: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const meta = catBySlug(cat);
  if (!meta) return {};
  return {
    title: meta.label + ' in Korea',
    description: meta.blurb.slice(0, 155),
  };
}

function Card({ p }: { p: Place }) {
  return (
    <Link href={'/place/' + p.slug + '/'} className="card">
      <div className="phwrap"><img className="ph" src={p.image} alt={p.title} loading="lazy" /></div>
      <div className="body">
        <div className="when">{p.region}</div>
        <h3>{p.title.replace(/\s*\([^)]*\)\s*$/, '')}</h3>
      </div>
    </Link>
  );
}

export default async function PlaceCatPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const meta = catBySlug(cat);
  if (!meta) notFound();

  const list = placesByCat(meta.cat);
  // 지역별로 묶어 보여준다 — 여행자는 "무엇을" 고른 뒤 "어디서"를 본다
  const ranked = regionsRanked().map(r => ({
    region: r.region,
    items: list.filter(p => p.region === r.region),
  })).filter(r => r.items.length > 0);

  return (
    <>
      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/places/">Places</Link> › {meta.label}
      </div>
      <h1>{meta.label} in Korea</h1>
      <p className="sub">{list.length} places · {meta.blurb}</p>

      {ranked.map(r => (
        <section key={r.region}>
          <div className="sect-row">
            <h2 className="sect">{r.region}</h2>
            <span className="meta">{r.items.length}</span>
          </div>
          <div className="grid">{r.items.slice(0, 12).map(p => <Card key={p.id} p={p} />)}</div>
          {r.items.length > 12 && (
            <p className="meta" style={{ marginTop: 8 }}>
              +{r.items.length - 12} more in {r.region} —{' '}
              <Link href={'/regions/' + r.region.toLowerCase() + '/'} style={{ textDecoration: 'underline' }}>
                see the region page
              </Link>
            </p>
          )}
        </section>
      ))}

      <h2 className="sect">Other categories</h2>
      <p className="strip">
        {PLACE_CATS.filter(c => c.slug !== meta.slug).map(c => (
          <Link key={c.slug} href={'/places/' + c.slug + '/'}>{c.label}</Link>
        ))}
      </p>
    </>
  );
}
