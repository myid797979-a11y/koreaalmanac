import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card from '@/app/components/Card';
import { rankShortFirst } from '@/lib/festival-rank';
import {
  MONTHS_FULL, MONTH_SLUGS, REGIONS, REGION_MONTH_MIN,
  regionMonthList, targetYear, today, festivals, overlapsMonth, isFree, fmt, dateRange, type Festival,
} from '@/lib/data';
import { upcomingConcerts, concertDateRange } from '@/lib/concerts';
import { liveCulture, cultureDateRange, isLongRun } from '@/lib/culture';
import { GUIDES, REGION_GUIDES, FIRST_TRIP, MONTH_GUIDES } from '@/lib/guides';
import { MONTH_FACTS } from '@/lib/month-facts';
import BookBox from '@/app/components/BookBox';
import GuideFaq from '@/app/components/GuideFaq';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/site';
import { regionMonthOffers } from '@/lib/affiliate';

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

  // 관광공사 등록은 행사 2~4주 전에 몰린다. 몇 주 뒤의 달은 진짜 축제가 몇 개뿐이라(2026-10-06 서울 11월: 2개)
  // ChatGPT·검색으로 들어온 사람이 빈 페이지를 본다. 그런 달에는
  //   · 그 달 가이드 링크와 공연 목록을 위로 올리고
  //   · "작년 이달에 열린 축제(올해 날짜 미정)"를 보여 준다 — 같은 이름의 올해 회차가 이미 있으면 뺀다.
  const shortCount = list.filter(f => days(f) <= 60).length;
  const thin = shortCount < 8;
  const titlesNow = new Set(list.map(f => f.title));
  const lastYear = thin
    ? festivals
        .filter(f => f.region === region && overlapsMonth(f, year - 1, mIdx) && days(f) <= 60 && !titlesNow.has(f.title))
        .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''))
        .slice(0, 12)
    : [];
  const monthGuides = (MONTH_GUIDES[mIdx] ?? []).map(h => GUIDES.find(g => g.href === h)).filter(Boolean);

  // 맨 위 요약 문단 — ChatGPT 유입의 28%가 이 페이지(서울 10월)로 들어온다(2026-10-06 GA).
  // 답으로 인용되기 좋게 "이달의 대표 축제 3개 + 무료 개수 + 대표 공연" 을 한 문단으로, 데이터에서 매일 만든다.
  const shortList = list.filter(f => days(f) <= 60);
  // "대표"를 고를 근거가 데이터에 없으므로 중요도라 하지 않는다 — 지금부터 가장 먼저 시작하는 3개(사진 있는 것 우선)
  const from = t > first ? t : first;
  const top = shortList
    .filter(f => (f.start ?? '') >= from)
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? '') || Number(!a.image) - Number(!b.image))
    .slice(0, 3);
  const nFreeShort = shortList.filter(isFree).length;
  const topShows = concerts.filter(c => c.kind !== 'festival' && c.end >= t).slice(0, 2);
  const showName = (c: { artist: string; title: string }) =>
    c.artist === 'Various artists' || c.title.toLowerCase().includes(c.artist.toLowerCase()) ? c.title : c.artist;

  // 구조화 데이터 + 짧은 문답 — AI·Bing 이 "서울 10월 축제" 같은 질문에 이 페이지를 인용하도록.
  // 답은 이 페이지에 이미 있는 사실만, 그리고 오늘 날짜에 따라 바뀌지 않는 값만 쓴다
  // (위 요약 문단은 매일 바뀌지만 이 문답까지 매일 바뀌면 허브 전부가 매일 '변경'으로 잡힌다).
  const byStart = [...shortList].sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''));
  const named = rankShortFirst(shortList, 'rank').slice(0, 3);
  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${region} festivals in ${MONTHS_FULL[mIdx]} ${year}`,
    numberOfItems: byStart.length,
    itemListElement: byStart.slice(0, 30).map((f, i) => ({
      '@type': 'ListItem', position: i + 1, name: f.title, url: SITE_URL + '/festival/' + f.slug + '/',
    })),
  };
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Festivals', path: '/events/festivals/' },
    { name: region, path: '/events/festivals/' + hub + '/' },
    { name: MONTHS_FULL[mIdx], path: '/events/festivals/' + hub + '/' + month + '/' },
  ]);
  const nameList = (xs: string[]) => xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1];
  const faq: { q: string; a: string }[] = [];
  if (named.length > 0) faq.push({
    q: `What festivals are on in ${region} in ${MONTHS_FULL[mIdx]} ${year}?`,
    a: `${shortList.length} festivals in ${region} have confirmed dates in ${MONTHS_FULL[mIdx]} ${year}` +
      (list.length > shortList.length ? `, plus ${list.length - shortList.length} long-running programmes` : '') + ', including ' +
      nameList(named.map(f => `${f.title} (${dateRange(f)})`)) + '. They are listed on this page week by week.',
  });
  if (shortList.length > 0) faq.push({
    q: `Are festivals in ${region} free to attend?`,
    a: nFreeShort > 0
      ? `${nFreeShort * 2 > shortList.length ? 'Most are. ' : 'Some are. '}${nFreeShort} of the ${shortList.length} festivals listed for ${MONTHS_FULL[mIdx]} are free to enter; some charge for individual programmes or hands-on activities. Each festival page gives the fee.`
      : `Each festival page gives the entry fee as published by the organiser.`,
  });
  const monthConcerts = concerts.filter(c => c.kind !== 'festival');
  if (monthConcerts.length > 0) faq.push({
    q: `What concerts are in ${region} in ${MONTHS_FULL[mIdx]} ${year}?`,
    a: `${concerts.length} concerts and music events are scheduled, including ` +
      nameList(monthConcerts.slice(0, 3).map(c => `${showName(c)} (${concertDateRange(c)}, ${c.venue})`)) + '.',
  });
  faq.push({ q: `What is the weather like in Korea in ${MONTHS_FULL[mIdx]}?`, a: facts.weather });
  faq.push({ q: `Are there public holidays in Korea in ${MONTHS_FULL[mIdx]}?`, a: facts.holidays });

  const concertsBlock = concerts.length > 0 && (
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
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(listLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/events/festivals/">Festivals</Link> › <Link href={'/events/festivals/' + hub + '/'}>{region}</Link> › {MONTHS_FULL[mIdx]}
      </div>
      <h1>{region} Festivals in {MONTHS_FULL[mIdx]} {year}</h1>
      <p className="sub">
        {list.length} festivals with confirmed dates
        {concerts.length > 0 && <> · {concerts.length} concerts</>}
        {stage.length > 0 && <> · exhibitions and stage shows</>}
        {' '}· updated {fmt(t)}
      </p>
      {(top.length > 0 || topShows.length > 0) && (
        <p className="intro">
          {top.length > 0 && <>
            Starting next in {region}:{' '}
            {top.map((f, i) => (
              <span key={f.id}>
                {i > 0 && (i === top.length - 1 ? ' and ' : ', ')}
                <Link href={'/festival/' + f.slug + '/'}>{f.title}</Link> ({dateRange(f)})
              </span>
            ))}.{' '}
            {nFreeShort > 0 && <>{nFreeShort} of the {shortList.length} festivals listed here are free to enter. </>}
          </>}
          {topShows.length > 0 && <>
            Next on stage: {topShows.map((c, i) => (
              <span key={c.id}>{i > 0 && ' and '}<Link href={'/concert/' + c.id + '/'}>{showName(c)}</Link> ({concertDateRange(c)})</span>
            ))}{concerts.length > topShows.length && <>, among {concerts.length} concerts this month</>}.
          </>}
        </p>
      )}

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

      {thin && monthGuides.length > 0 && (
        <p className="strip">
          <strong>{MONTHS_FULL[mIdx]} guides</strong>
          {monthGuides.map(g => <Link key={g!.href} href={g!.href}>{g!.title}</Link>)}
        </p>
      )}
      {guides.length > 0 && (
        <p className="strip">
          <strong>Guides</strong>
          {guides.map(g => <Link key={g!.href} href={g!.href}>{g!.title}</Link>)}
        </p>
      )}

      {thin && concertsBlock}

      {weeks.map((w, i) => (
        <section key={i} id={'w' + i}>
          <h2 className="sect">{w.label}</h2>
          <div className="grid">{rankShortFirst(w.items, 'date').map(f => <Card key={f.id} f={f} t={t} />)}</div>
        </section>
      ))}

      {lastYear.length > 0 && (
        <section id="last-year">
          <h2 className="sect">Usually held in {MONTHS_FULL[mIdx]}: dates for {year} not yet announced</h2>
          <p className="intro" style={{ marginTop: -4 }}>
            These ran in {MONTHS_FULL[mIdx]} {year - 1}. Organisers usually confirm the new dates a few weeks
            ahead; this page updates every morning when they do.
          </p>
          <div className="grid">{lastYear.map(f => <Card key={f.id} f={f} t={t} />)}</div>
        </section>
      )}

      {longRun.length > 0 && (
        <section id="year-round">
          <h2 className="sect">Running all season</h2>
          <p className="intro" style={{ marginTop: -4 }}>Long-running programmes on throughout {MONTHS_FULL[mIdx]}: guard ceremonies, night tours and weekly performances.</p>
          <div className="grid">{rankShortFirst(longRun, 'rank').map(f => <Card key={f.id} f={f} t={t} />)}</div>
        </section>
      )}

      {/* 축제 목록을 다 본 뒤, 공연 앞 — 일정을 정한 사람이 표·투어를 고르는 자리 */}
      <BookBox offers={regionMonthOffers(region, mIdx)} title={'Book ahead for ' + region + ' in ' + MONTHS_FULL[mIdx]} />

      {!thin && concertsBlock}

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

      <GuideFaq items={faq} />

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
