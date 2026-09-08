import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card from '@/app/components/Card';
import {
  MONTHS_FULL, MONTH_SLUGS, REGIONS, REGION_MONTH_MIN,
  monthFestivals, regionFestivals, regionMonthList,
  status, today,
} from '@/lib/data';
import { MONTH_INTROS, REGION_INTROS } from '@/lib/editorial';

export function generateStaticParams() {
  return [
    ...MONTH_SLUGS.map(hub => ({ hub })),
    ...REGIONS.map(r => ({ hub: r.toLowerCase() })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ hub: string }> }) {
  const { hub } = await params;
  const mIdx = MONTH_SLUGS.indexOf(hub);
  if (mIdx >= 0) {
    const { year, list } = monthFestivals(mIdx);
    return {
      title: 'Korea Festivals in ' + MONTHS_FULL[mIdx] + ' ' + year,
      description: list.length + ' festivals across Korea in ' + MONTHS_FULL[mIdx] + ' ' + year +
        ' — dates, locations, and admission from official tourism data, updated daily.',
    };
  }
  const region = REGIONS.find(r => r.toLowerCase() === hub);
  if (!region) return {};
  const n = regionFestivals(region).filter(f => status(f) !== 'ended').length;
  return {
    title: 'Festivals in ' + region + ' — ' + n + ' happening or upcoming',
    description: 'Every festival in ' + region + ', Korea with real dates, venues, and fees — from official Korea Tourism Organization data, updated daily.',
  };
}

function MonthStrip({ current }: { current?: number }) {
  return (
    <p className="strip">
      {MONTH_SLUGS.map((slug, i) =>
        i === current
          ? <strong key={slug}>{MONTHS_FULL[i].slice(0, 3)}</strong>
          : <Link key={slug} href={'/festivals/' + slug + '/'}>{MONTHS_FULL[i].slice(0, 3)}</Link>
      )}
    </p>
  );
}

function MonthHub({ monthIdx }: { monthIdx: number }) {
  const { year, list } = monthFestivals(monthIdx);
  const name = MONTHS_FULL[monthIdx];
  const regionLinks = REGIONS
    .map(r => ({ r, n: regionMonthList(r, monthIdx).length }))
    .filter(x => x.n >= REGION_MONTH_MIN);

  return (
    <>
      <div className="crumb"><Link href="/">Festivals</Link> › {name}</div>
      <h1>Korea Festivals in {name} {year}</h1>
      <p className="sub">{list.length} festivals with confirmed dates · updated daily from official tourism data</p>
      <p className="intro">{MONTH_INTROS[monthIdx]}</p>
      <MonthStrip current={monthIdx} />
      <div className="grid">{list.map(f => <Card key={f.id} f={f} />)}</div>
      {regionLinks.length > 0 && (
        <>
          <h2 className="sect">By region in {name}</h2>
          <p className="strip">
            {regionLinks.map(x => (
              <Link key={x.r} href={'/festivals/' + x.r.toLowerCase() + '/' + MONTH_SLUGS[monthIdx] + '/'}>
                {x.r} ({x.n})
              </Link>
            ))}
          </p>
        </>
      )}
    </>
  );
}

function RegionHub({ region }: { region: string }) {
  const t = today();
  const all = regionFestivals(region);
  const live = all.filter(f => status(f, t) !== 'ended')
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''));
  const ended = all.length - live.length;
  const months = MONTH_SLUGS
    .map((slug, i) => ({ slug, i, n: regionMonthList(region, i).length }))
    .filter(x => x.n >= REGION_MONTH_MIN);

  return (
    <>
      <div className="crumb"><Link href="/">Festivals</Link> › {region}</div>
      <h1>Festivals in {region}</h1>
      <p className="sub">
        {live.length} happening or upcoming · {ended} past editions tracked · updated daily
      </p>
      <p className="intro">{REGION_INTROS[region]}</p>
      {months.length > 0 && (
        <p className="strip">
          {months.map(x => (
            <Link key={x.slug} href={'/festivals/' + region.toLowerCase() + '/' + x.slug + '/'}>
              {MONTHS_FULL[x.i].slice(0, 3)} ({x.n})
            </Link>
          ))}
        </p>
      )}
      <div className="grid">{live.map(f => <Card key={f.id} f={f} t={t} />)}</div>
      <h2 className="sect">Other regions</h2>
      <p className="strip">
        {REGIONS.filter(r => r !== region).map(r => (
          <Link key={r} href={'/festivals/' + r.toLowerCase() + '/'}>{r}</Link>
        ))}
      </p>
    </>
  );
}

export default async function HubPage({ params }: { params: Promise<{ hub: string }> }) {
  const { hub } = await params;
  const mIdx = MONTH_SLUGS.indexOf(hub);
  if (mIdx >= 0) return <MonthHub monthIdx={mIdx} />;
  const region = REGIONS.find(r => r.toLowerCase() === hub);
  if (region) return <RegionHub region={region} />;
  notFound();
}
