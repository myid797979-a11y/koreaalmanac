import Link from 'next/link';
import Card, { Stamp } from '@/app/components/Card';
import RegionCard from '@/app/components/RegionCard';
import {
  festivals, status, today, dateRange, onWeekend, weekendWindow,
  MONTHS_FULL, MONTH_SLUGS, REGIONS, type Festival,
} from '@/lib/data';
import { FEATURED_IDS } from '@/lib/editorial';

function SectionHead({ title, href, more }: { title: string; href: string; more: string }) {
  return (
    <div className="sect-row">
      <h2 className="sect">{title}</h2>
      <Link className="more" href={href}>{more} →</Link>
    </div>
  );
}

// 랜딩은 큐레이션 — 같은 섹션 안에서 사진 있는 축제를 앞세운다 (허브·목록은 시간순 유지)
function photoFirst<T extends { image: string | null }>(list: T[]): T[] {
  return [...list.filter(f => f.image), ...list.filter(f => !f.image)];
}

export default function Home() {
  const t = today();
  const ongoing = photoFirst(festivals
    .filter(f => status(f, t) === 'ongoing')
    .sort((a, b) => (a.end ?? '').localeCompare(b.end ?? '')));
  const upcoming = photoFirst(festivals
    .filter(f => status(f, t) === 'upcoming')
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? '')));

  const featured = FEATURED_IDS
    .map(id => festivals.find(f => f.id === id))
    .filter((f): f is Festival => Boolean(f && f.image && status(f, t) !== 'ended'));
  const pick = featured[0];

  const weekend = photoFirst(onWeekend(t));
  const wkLabel = weekendWindow(t).label;

  const day = Number(t.slice(6, 8));
  const mIdx = Number(t.slice(4, 6)) - 1;
  const weekday = new Date(Number(t.slice(0, 4)), mIdx, day)
    .toLocaleDateString('en-US', { weekday: 'long' });
  const startingThisMonth = festivals
    .filter(f => f.start && f.start.slice(0, 6) === t.slice(0, 6) && f.start >= t).length;

  return (
    <>
      <section className="hero-home">
        <div className="hero-copy">
          <h1>Every festival in Korea, with real dates</h1>
          <p className="sub">
            {festivals.length} festivals from official Korea Tourism Organization data,
            refreshed every morning — dates, fees, venues, and what to expect.
            Hundreds of them appear in English only here.
          </p>
          <p className="strip">
            {MONTH_SLUGS.map((slug, i) => (
              <Link key={slug} href={'/festivals/' + slug + '/'}>{MONTHS_FULL[i].slice(0, 3)}</Link>
            ))}
          </p>
        </div>
        <aside className="almanac">
          <div className="alm-mon">{MONTHS_FULL[mIdx]} {t.slice(0, 4)}</div>
          <div className="alm-day">{day}</div>
          <div className="alm-wd">{weekday}, Korea</div>
          <div className="alm-facts">
            <Link href="/festivals/"><b>{ongoing.length}</b> festivals on today</Link>
            <Link href={'/festivals/' + MONTH_SLUGS[mIdx] + '/'}><b>{startingThisMonth}</b> more start this month</Link>
          </div>
        </aside>
      </section>

      {pick && (
        <Link href={'/festival/' + pick.slug + '/'} className="featured">
          <div className="f-ph">
            <img src={pick.image!} alt={pick.title} />
            <Stamp f={pick} t={t} />
          </div>
          <div className="f-body">
            <div className="when">{dateRange(pick)} · {pick.region}</div>
            <h2>{pick.title}</h2>
            <p>{(pick.overview ?? '').slice(0, 230)}…</p>
            <span className="more">Read more →</span>
          </div>
        </Link>
      )}

      <SectionHead title={'This weekend, ' + wkLabel} href="/calendar/" more="full calendar" />
      <div className="grid">{weekend.slice(0, 8).map(f => <Card key={f.id} f={f} t={t} />)}</div>

      <SectionHead title="Happening now" href="/festivals/" more={'all ' + ongoing.length} />
      <div className="grid">{ongoing.slice(0, 8).map(f => <Card key={f.id} f={f} t={t} />)}</div>

      <SectionHead title="Starting soon" href="/festivals/" more={'all ' + upcoming.length + ' upcoming'} />
      <div className="grid">{upcoming.slice(0, 8).map(f => <Card key={f.id} f={f} t={t} />)}</div>

      <SectionHead title="Browse by region" href="/regions/" more="all regions" />
      <div className="grid">
        {REGIONS.slice(0, 8).map(r => <RegionCard key={r} region={r} t={t} />)}
      </div>

      <section className="about-strip">
        <p>
          <strong>What this site is:</strong> every festival registered with the Korea Tourism
          Organization, merged from Korean and English official data and refreshed every morning —
          including hundreds of festivals that never appear on English-language sites.
          {' '}<Link href="/about/" style={{ textDecoration: 'underline' }}>More about the data</Link>
        </p>
      </section>
    </>
  );
}
