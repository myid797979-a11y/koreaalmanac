import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card from '@/app/components/Card';
import { rankShortFirst } from '@/lib/festival-rank';
import {
  MONTHS_FULL, MONTH_SLUGS, REGIONS, REGION_MONTH_MIN, CATEGORIES,
  monthFestivals, lastYearMonth, regionFestivals, regionMonthList, categoryFestivals, categoryLabel,
  status, today,
} from '@/lib/data';
import { MONTH_INTROS, REGION_INTROS, CATEGORY_INTROS } from '@/lib/editorial';
import { MONTH_FACTS } from '@/lib/month-facts';
import { concerts, concertDateRange } from '@/lib/concerts';
import { liveCulture, isLongRun, cultureDateRange } from '@/lib/culture';
import { GUIDES, MONTH_GUIDES, REGION_GUIDES } from '@/lib/guides';
import { placeBySlug } from '@/lib/places';
import BookBox from '@/app/components/BookBox';
import AdSlot from '@/app/components/AdSlot';
import { monthOffers, monthStay } from '@/lib/affiliate';

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
    // "Korea in October" 계열 검색을 받도록 제목을 넓혔다 (2026-09-29). 'Festivals' 는 남겨 기존 순위를 지킨다.
    return {
      title: 'Korea in ' + MONTHS_FULL[mIdx] + ' ' + year + ' — Festivals, Concerts & What to Expect',
      description: list.length + ' festivals plus the month’s concerts, exhibitions, weather and holidays for ' +
        MONTHS_FULL[mIdx] + ' ' + year + ' in Korea — from official data, updated daily.',
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

  // "Korea in October" 로 오는 사람은 축제 276장보다 먼저 "그 달이 어떤 달인지" 를 원한다 (2026-09-29).
  // 날씨·공휴일 표, 그 달의 가이드, 공연, 전시를 축제 그리드 앞에 짧게 둔다.
  const t = today();
  const mm = String(monthIdx + 1).padStart(2, '0');
  const m0 = year + mm + '01', m1 = year + mm + '31';
  const monthConcerts = concerts
    .filter(c => c.start <= m1 && c.end >= m0 && c.end >= t)
    .sort((a, b) => a.start.localeCompare(b.start)).slice(0, 8);
  const monthCulture = liveCulture(undefined, t)
    .filter(c => c.start <= m1 && c.end >= m0)
    .sort((a, b) => (isLongRun(a) ? 1 : 0) - (isLongRun(b) ? 1 : 0) || a.start.localeCompare(b.start))
    .slice(0, 6);
  const guides = MONTH_GUIDES[monthIdx].map(h => GUIDES.find(g => g.href === h)).filter(Boolean);
  const facts = MONTH_FACTS[monthIdx];

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › <Link href="/events/festivals/">Festivals</Link> › {name}</div>
      <h1>Korea in {name} {year}</h1>
      <p className="sub">
        {list.length} festivals with confirmed dates
        {monthConcerts.length > 0 && <> · {monthConcerts.length} concerts</>}
        {monthCulture.length > 0 && <> · exhibitions and performances</>}
        {' '}· updated daily from official data
      </p>
      <p className="intro">{MONTH_INTROS[monthIdx]}</p>
      <MonthStrip current={monthIdx} />

      <table className="facts">
        <tbody>
          <tr><th>Weather</th><td>{facts.weather}</td></tr>
          <tr><th>The season</th><td>{facts.season}</td></tr>
          <tr><th>Public holidays</th><td>{facts.holidays}</td></tr>
        </tbody>
      </table>

      {guides.length > 0 && (
        <>
          <h2 className="sect">Guides for {name}</h2>
          <div className="cult-list">
            {guides.map(g => {
              const ph = g!.photo ? placeBySlug(g!.photo) : undefined;
              return (
                <article key={g!.href} className="cult">
                  {ph
                    ? <Link href={g!.href} className="cu-ph"><img src={ph.image} alt={g!.title} loading="lazy" /></Link>
                    : <span className="cu-ph cu-noph" aria-hidden="true" />}
                  <div className="cu-body">
                    <div className="cu-when">{g!.tag}</div>
                    <h3><Link href={g!.href}>{g!.title}</Link></h3>
                    <p className="cu-place">{g!.blurb}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

      {monthConcerts.length > 0 && (
        <>
          <h2 className="sect">Concerts in {name}</h2>
          <ul className="agenda">
            {monthConcerts.map(c => (
              <li key={c.id}>
                <span className="ad">{concertDateRange(c)}</span>
                <Link href={'/concert/' + c.id + '/'}>{c.title}</Link>
                <span className="meta"> · {c.venue}, {c.city}</span>
              </li>
            ))}
          </ul>
          <p className="meta"><Link href="/events/concerts/">All concerts and venue guides →</Link></p>
        </>
      )}

      {monthCulture.length > 0 && (
        <>
          <h2 className="sect">Exhibitions and performances in {name}</h2>
          <ul className="agenda">
            {monthCulture.map(c => (
              <li key={c.id}>
                <span className="ad">{cultureDateRange(c)}</span>
                <Link href={'/culture/' + c.slug + '/'}>{c.title}</Link>
                <span className="meta"> · {c.venue ?? c.region}</span>
              </li>
            ))}
          </ul>
          <p className="meta">
            <Link href="/events/exhibitions/">All exhibitions →</Link>{' · '}
            <Link href="/events/traditional/">All traditional performances →</Link>
          </p>
        </>
      )}

      <BookBox offers={monthOffers(monthIdx)} title={'Book ahead for ' + name} />
      <BookBox provider="agoda" offers={monthStay(monthIdx)} title={'Where to stay in ' + name} />

      <AdSlot placement="hub" />

      <h2 className="sect">{list.length} festivals in {name} {year}</h2>
      <div className="grid">{rankShortFirst(list, 'date').map(f => <Card key={f.id} f={f} />)}</div>
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
  const live = rankShortFirst(all.filter(f => status(f, t) !== 'ended'), 'date');
  const ended = all.length - live.length;
  const months = MONTH_SLUGS
    .map((slug, i) => ({ slug, i, n: regionMonthList(region, i).length }))
    .filter(x => x.n >= REGION_MONTH_MIN);

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › <Link href="/events/festivals/">Festivals</Link> › {region}</div>
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

      <p className="intro">
        Looking for more than festivals?{' '}
        <Link href={'/regions/' + region.toLowerCase() + '/'}>
          Everything in {region} →
        </Link>{' '}
        — places to visit, concerts and exhibitions on the same page.
      </p>

      {(REGION_GUIDES[region] ?? []).length > 0 && (
        <p className="strip">
          <strong>Guides</strong>
          {REGION_GUIDES[region].map(h => {
            const g = GUIDES.find(x => x.href === h);
            return g ? <Link key={h} href={h}>{g.title}</Link> : null;
          })}
        </p>
      )}

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
  const live = rankShortFirst(all.filter(f => status(f, t) !== 'ended'), 'date');
  const label = categoryLabel(slug);

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › <Link href="/events/festivals/">Festivals</Link> › {label}</div>
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
