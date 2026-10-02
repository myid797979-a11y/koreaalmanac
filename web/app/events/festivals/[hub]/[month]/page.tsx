import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card from '@/app/components/Card';
import { rankShortFirst } from '@/lib/festival-rank';
import {
  MONTHS_FULL, MONTH_SLUGS, REGIONS, REGION_MONTH_MIN,
  regionMonthList, targetYear, today, type Festival,
} from '@/lib/data';
import { upcomingConcerts, concertDateRange } from '@/lib/concerts';
import { liveCulture, cultureDateRange, isLongRun } from '@/lib/culture';
import { GUIDES, REGION_GUIDES, FIRST_TRIP } from '@/lib/guides';
import { MONTH_FACTS } from '@/lib/month-facts';

// 지역×월은 축제 3건 이상인 조합만 생성 (얇은 페이지 방지)
export function generateStaticParams() {
  const params: { hub: string; month: string }[] = [];
  for (const r of REGIONS)
    for (let i = 0; i < 12; i++)
      if (regionMonthList(r, i).length >= REGION_MONTH_MIN)
        params.push({ hub: r.toLowerCase(), month: MONTH_SLUGS[i] });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ hub: string; month: string }> }) {
  const { hub, month } = await params;
  const region = REGIONS.find(r => r.toLowerCase() === hub);
  const mIdx = MONTH_SLUGS.indexOf(month);
  if (!region || mIdx < 0) return {};
  const year = targetYear(mIdx);
  const n = regionMonthList(region, mIdx).length;
  // 앞부분("Seoul Festivals in October 2026")은 이미 순위가 붙은 제목이라 그대로 두고 뒤를 넓힌다
  return {
    title: region + ' Festivals in ' + MONTHS_FULL[mIdx] + ' ' + year + ': week by week, plus concerts and shows',
    description: n + ' festivals in ' + region + ' in ' + MONTHS_FULL[mIdx] + ' ' + year +
      ', grouped by week, with the month’s concerts, exhibitions and stage shows, the weather and public holidays.',
  };
}

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ymd = (y: number, m: number, d: number) => String(y) + String(m + 1).padStart(2, '0') + String(d).padStart(2, '0');

export default async function RegionMonthPage({ params }: { params: Promise<{ hub: string; month: string }> }) {
  const { hub, month } = await params;
  const region = REGIONS.find(r => r.toLowerCase() === hub);
  const mIdx = MONTH_SLUGS.indexOf(month);
  if (!region || mIdx < 0) notFound();
  const list = regionMonthList(region!, mIdx);
  if (list.length < REGION_MONTH_MIN) notFound();
  const year = targetYear(mIdx);
  const t = today();
  const first = ymd(year, mIdx, 1);
  const lastDay = new Date(year, mIdx + 1, 0).getDate();
  const last = ymd(year, mIdx, lastDay);
  const facts = MONTH_FACTS[mIdx];

  // 주별로 묶는다 — "10월에 뭐가 있나" 다음 질문은 "내가 가는 주에 뭐가 있나" 다
  const weeks: { label: string; items: Festival[] }[] = [];
  // 1년 내내 하는 상설 프로그램(60일 넘게)은 맨 아래로 — 위에 두면 이달의 진짜 축제가 밀려난다
  const days = (f: Festival) => {
    const a = f.start ?? '', b = f.end ?? a;
    return (Date.UTC(+b.slice(0, 4), +b.slice(4, 6) - 1, +b.slice(6, 8)) - Date.UTC(+a.slice(0, 4), +a.slice(4, 6) - 1, +a.slice(6, 8))) / 86400000;
  };
  const longRun = list.filter(f => days(f) > 60);
  const running = list.filter(f => (f.start ?? '') < first && days(f) <= 60);
  if (running.length) weeks.push({ label: 'Already running as ' + MONTHS_FULL[mIdx] + ' begins', items: running });
  for (let d = 1; d <= lastDay; d += 7) {
    const e = Math.min(d + 6, lastDay);
    const a = ymd(year, mIdx, d), b = ymd(year, mIdx, e);
    const items = list.filter(f => (f.start ?? '') >= a && (f.start ?? '') <= b && days(f) <= 60);
    if (items.length) weeks.push({ label: 'Starting ' + MON[mIdx] + ' ' + d + '–' + e, items });
  }

  const overlaps = (s: string, e: string) => s <= last && e >= first;
  const concerts = upcomingConcerts(t).filter(c => c.region === region && overlaps(c.start, c.end));
  const stage = liveCulture(undefined, t)
    .filter(c => c.region === region && overlaps(c.start, c.end) && !isLongRun(c))
    .slice(0, 10);
  const guides = (REGION_GUIDES[region!] ?? []).map(h => GUIDES.find(g => g.href === h)).filter(Boolean);
  const isNow = t >= first && t <= last;

  return (
    <>
      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/events/festivals/">Festivals</Link> › <Link href={'/events/festivals/' + hub + '/'}>{region}</Link> › {MONTHS_FULL[mIdx]}
      </div>
      <h1>{region} Festivals in {MONTHS_FULL[mIdx]} {year}</h1>
      <p className="sub">
        {list.length} festivals with confirmed dates
        {concerts.length > 0 && <> · {concerts.length} concerts</>}
        {stage.length > 0 && <> · exhibitions and stage shows</>}
        {' '}· updated daily
      </p>

      <nav className="g-jump" aria-label="Weeks">
        {weeks.map((w, i) => <a key={i} href={'#w' + i}>{w.label.replace('Already running as ' + MONTHS_FULL[mIdx] + ' begins', 'Already on').replace('Starting ', '')} <span>{w.items.length}</span></a>)}
        {longRun.length > 0 && <a href="#year-round">All season <span>{longRun.length}</span></a>}
        {concerts.length > 0 && <a href="#concerts">Concerts</a>}
        {region === 'Seoul' && isNow && <a href="/seoul-this-weekend/">This weekend</a>}
      </nav>

      <table className="facts" style={{ maxWidth: 760 }}>
        <tbody>
          <tr><th>Weather</th><td>{facts.weather}</td></tr>
          <tr><th>Public holidays</th><td>{facts.holidays}</td></tr>
        </tbody>
      </table>

      {guides.length > 0 && (
        <p className="strip">
          <strong>Guides</strong>
          {guides.map(g => <Link key={g!.href} href={g!.href}>{g!.title}</Link>)}
        </p>
      )}

      {weeks.map((w, i) => (
        <section key={i} id={'w' + i}>
          <h2 className="sect">{w.label}</h2>
          <div className="grid">{rankShortFirst(w.items, 'date').map(f => <Card key={f.id} f={f} t={t} />)}</div>
        </section>
      ))}

      {longRun.length > 0 && (
        <section id="year-round">
          <h2 className="sect">Running all season</h2>
          <p className="intro" style={{ marginTop: -4 }}>Long-running programmes on throughout {MONTHS_FULL[mIdx]}: guard ceremonies, night tours and weekly performances.</p>
          <div className="grid">{rankShortFirst(longRun, 'rank').map(f => <Card key={f.id} f={f} t={t} />)}</div>
        </section>
      )}

      {concerts.length > 0 && (
        <section id="concerts">
          <h2 className="sect">Concerts in {region} in {MONTHS_FULL[mIdx]}</h2>
          <ul className="agenda">
            {concerts.map(c => (
              <li key={c.id}>
                <span className="ad">{concertDateRange(c)}</span>
                <Link href={'/concert/' + c.id + '/'}>
                  {c.artist === 'Various artists' || c.title.toLowerCase().includes(c.artist.toLowerCase()) ? c.title : c.artist + ': ' + c.title}
                </Link>
                <span className="meta"> · {c.venue}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {stage.length > 0 && (
        <>
          <h2 className="sect">Exhibitions and stage shows</h2>
          <ul className="agenda">
            {stage.map(c => (
              <li key={c.id}>
                <span className="ad">{cultureDateRange(c)}</span>
                <Link href={'/culture/' + c.slug + '/'}>{c.title}</Link>
                {c.venue && <span className="meta"> · {c.venue}</span>}
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="strip" style={{ marginTop: 24 }}>
        <Link href={'/events/festivals/' + hub + '/'}>All {region} festivals</Link>
        <Link href={'/events/festivals/' + month + '/'}>All Korea in {MONTHS_FULL[mIdx]}</Link>
        <Link href={'/regions/' + hub + '/'}>Places to visit in {region}</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>
      <p className="strip">
        <strong>First trip to Korea?</strong>
        {FIRST_TRIP.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
      </p>
    </>
  );
}
