import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card from '@/app/components/Card';
import {
  MONTHS_FULL, MONTH_SLUGS, REGIONS, REGION_MONTH_MIN, CATEGORIES,
  monthFestivals, lastYearMonth, regionFestivals, regionMonthList, categoryFestivals, categoryLabel,
  status, today,
} from '@/lib/data';
import { MONTH_INTROS, REGION_INTROS, CATEGORY_INTROS } from '@/lib/editorial';

export function generateStaticParams() {
  return [
    ...MONTH_SLUGS.map(hub => ({ hub })),
    ...REGIONS.map(r => ({ hub: r.toLowerCase() })),
    ...CATEGORIES.map(c => ({ hub: c.slug })),
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
  if (region) {
    const n = regionFestivals(region).filter(f => status(f) !== 'ended').length;
    return {
      title: 'Festivals in ' + region + ' — ' + n + ' happening or upcoming',
      description: 'Every festival in ' + region + ', Korea with real dates, venues, and fees — from official Korea Tourism Organization data, updated daily.',
    };
  }
  const cat = CATEGORIES.find(c => c.slug === hub);
  if (!cat) return {};
  const cn = categoryFestivals(cat.slug).filter(f => status(f) !== 'ended').length;
  return {
    title: cat.label + ' Festivals in Korea — ' + cn + ' happening or upcoming',
    description: cn + ' ' + cat.label.toLowerCase() + ' festivals across Korea with real dates and venues — from official tourism data, updated daily.',
  };
}

function MonthStrip({ current }: { current?: number }) {
  return (
    <p className="strip">
      {MONTH_SLUGS.map((slug, i) =>
        i === current
          ? <strong key={slug}>{MONTHS_FULL[i].slice(0, 3)}</strong>
          : <Link key={slug} href={'/events/festivals/' + slug + '/'}>{MONTHS_FULL[i].slice(0, 3)}</Link>
      )}
    </p>
  );
}

/** 확정분이 없는 달 — 지난해 같은 달을 보여준다. 빈 페이지로 돌려보내지 않기 위해서다. */
function LastYear({ monthIdx, name, year }: { monthIdx: number; name: string; year: number }) {
  const past = lastYearMonth(monthIdx);
  if (past.length === 0) return null;
  return (
    <>
      <h2 className="sect">What ran last {name}</h2>
      <p className="intro" style={{ marginTop: -4 }}>
        Few dates for {name} {year} are published yet — the Korea Tourism Organization
        registers most festivals a few months ahead. These {past.length} ran in {name} {year - 1};
        the great majority are annual, so they give you a fair picture of the month.
        {' '}<Link href="/plan/">Trip Planner</Link> will pick up the new dates as they land.
      </p>
      <div className="grid">{past.slice(0, 24).map(f => <Card key={f.id} f={f} />)}</div>
      {past.length > 24 && (
        <p className="meta">+{past.length - 24} more ran that month.</p>
      )}
    </>
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
      {/* 확정분이 한두 건뿐인 달도 사실상 막다른 길이다 — 6건 미만이면 지난해를 곁들인다 */}
      {list.length < 6 && <LastYear monthIdx={monthIdx} name={name} year={year} />}
      {regionLinks.length > 0 && (
        <>
          <h2 className="sect">By region in {name}</h2>
          <p className="strip">
            {regionLinks.map(x => (
              <Link key={x.r} href={'/events/festivals/' + x.r.toLowerCase() + '/' + MONTH_SLUGS[monthIdx] + '/'}>
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
        {live.length} happening or upcoming · {ended} past editions tracked · updated daily ·
        {' '}<a href={'/feeds/' + region.toLowerCase() + '.ics'} style={{ textDecoration: 'underline' }}>subscribe (.ics)</a>
      </p>
      <p className="intro">{REGION_INTROS[region]}</p>
      {months.length > 0 && (
        <p className="strip">
          {months.map(x => (
            <Link key={x.slug} href={'/events/festivals/' + region.toLowerCase() + '/' + x.slug + '/'}>
              {MONTHS_FULL[x.i].slice(0, 3)} ({x.n})
            </Link>
          ))}
        </p>
      )}
      <div className="grid">{live.map(f => <Card key={f.id} f={f} t={t} />)}</div>
      <h2 className="sect">Other regions</h2>
      <p className="strip">
        {REGIONS.filter(r => r !== region).map(r => (
          <Link key={r} href={'/events/festivals/' + r.toLowerCase() + '/'}>{r}</Link>
        ))}
      </p>
    </>
  );
}

function CategoryHub({ slug }: { slug: string }) {
  const t = today();
  const all = categoryFestivals(slug);
  const live = all.filter(f => status(f, t) !== 'ended')
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''));
  const label = categoryLabel(slug);

  return (
    <>
      <div className="crumb"><Link href="/">Festivals</Link> › {label}</div>
      <h1>{label} Festivals in Korea</h1>
      <p className="sub">{live.length} happening or upcoming · {all.length - live.length} past editions tracked · updated daily</p>
      <p className="intro">{CATEGORY_INTROS[slug]}</p>
      <div className="grid">{live.map(f => <Card key={f.id} f={f} t={t} />)}</div>
      <h2 className="sect">Other interests</h2>
      <p className="strip">
        {CATEGORIES.filter(c => c.slug !== slug).map(c => (
          <Link key={c.slug} href={'/events/festivals/' + c.slug + '/'}>{c.label}</Link>
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
  if (CATEGORIES.some(c => c.slug === hub)) return <CategoryHub slug={hub} />;
  notFound();
}
