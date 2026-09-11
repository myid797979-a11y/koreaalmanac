import Link from 'next/link';
import Card, { Stamp } from '@/app/components/Card';
import RegionCard from '@/app/components/RegionCard';
import {
  festivals, status, today, dateRange, onWeekend, weekendWindow,
  MONTHS_FULL, MONTH_SLUGS, REGIONS, CATEGORIES, categoryFestivals, type Festival,
} from '@/lib/data';
import { FEATURED_IDS } from '@/lib/editorial';
import { upcomingConcerts, concertDateRange, KIND_LABEL } from '@/lib/concerts';
import { liveCulture, cultureDateRange, isLongRun } from '@/lib/culture';

// 홈 제목이 사이트명뿐(13자)이라 Bing URL 검사가 "너무 짧은 제목" 오류를 냈다.
// 무엇을 찾는 사람이 오는 페이지인지 제목에 담는다.
export const metadata = {
  title: "What's On in Korea — Festivals, Concerts & Places to Visit",
  description:
    "Every festival, concert, traditional performance and exhibition on in Korea right now, " +
    "with real dates, venues and fees — plus 2,300+ places to visit. Official Korea Tourism " +
    "Organization data, refreshed every morning, much of it in English only here.",
};

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

// YYYYMMDD + n일 → input[type=date]용 YYYY-MM-DD
function isoDay(t: string, days: number): string {
  const x = new Date(Number(t.slice(0, 4)), Number(t.slice(4, 6)) - 1, Number(t.slice(6, 8)) + days);
  const p = (n: number) => String(n).padStart(2, '0');
  return String(x.getFullYear()) + '-' + p(x.getMonth() + 1) + '-' + p(x.getDate());
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

  // 주말·진행중·예정은 서로 겹친다. 히어로까지 합치면 같은 축제가 한 화면에 세 번 나온다.
  // 위에서 이미 보여준 것은 아래 섹션에서 건너뛴다.
  const shown = new Set<string>(pick ? [pick.id] : []);
  const take = (list: Festival[], n: number) => {
    const out: Festival[] = [];
    for (const f of list) {
      if (shown.has(f.id)) continue;
      shown.add(f.id);
      out.push(f);
      if (out.length === n) break;
    }
    return out;
  };
  const wkLabel = weekendWindow(t).label;
  const concerts = upcomingConcerts(t);
  // 전통공연은 상시 프로그램이 많아 시작일이 과거인 것도 '지금 볼 수 있는' 공연이다.
  // 사진 있는 것을 앞세우되 곧 시작하는 것 우선.
  const trad = liveCulture('traditional', t);
  const exhibitions = liveCulture('exhibition', t).filter(c => c.image);

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
          <h1>What&apos;s on in Korea, with real dates</h1>
          <p className="sub">
            Festivals, K-pop concerts and live shows across all 17 regions — dates, venues,
            fees and what to expect. Festival data comes straight from the Korea Tourism
            Organization and refreshes every morning; hundreds of them appear in English
            only here.
          </p>
          <form className="tripform" action="/plan/" method="get">
            <label>Arrive
              <input type="date" name="from" defaultValue={isoDay(t, 0)} />
            </label>
            <label>Leave
              <input type="date" name="to" defaultValue={isoDay(t, 7)} />
            </label>
            <button type="submit">Find events</button>
          </form>
          <p className="strip">
            {MONTH_SLUGS.map((slug, i) => (
              <Link key={slug} href={'/events/festivals/' + slug + '/'}>{MONTHS_FULL[i].slice(0, 3)}</Link>
            ))}
          </p>
        </div>
        <aside className="almanac">
          <div className="alm-mon">{MONTHS_FULL[mIdx]} {t.slice(0, 4)}</div>
          <div className="alm-day">{day}</div>
          <div className="alm-wd">{weekday}, Korea</div>
          <div className="alm-facts">
            <Link href="/events/festivals/"><b>{ongoing.length}</b> festivals on today</Link>
            <Link href={'/events/festivals/' + MONTH_SLUGS[mIdx] + '/'}><b>{startingThisMonth}</b> more start this month</Link>
            <Link href="/events/concerts/"><b>{concerts.length}</b> concerts coming up</Link>
            <Link href="/events/exhibitions/"><b>{trad.length + exhibitions.length}</b> shows &amp; exhibitions</Link>
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
      <div className="grid">{take(weekend, 8).map(f => <Card key={f.id} f={f} t={t} />)}</div>

      {concerts.length > 0 && (
        <>
          <SectionHead title="Concerts &amp; live music" href="/events/concerts/" more={'all ' + concerts.length} />
          <div className="concert-list">
            {concerts.slice(0, 4).map(c => (
              <article key={c.id} className="concert">
                <div className="c-date">
                  <span className="c-when">{concertDateRange(c)}</span>
                  <span className={'c-kind k-' + c.kind}>{KIND_LABEL[c.kind]}</span>
                </div>
                <div className="c-body">
                  <h2>
                    <Link href={'/concert/' + c.id + '/'}>
                      {c.artist === 'Various artists' ? c.title : c.artist}
                    </Link>
                  </h2>
                  <p className="c-venue">{c.venue} · {c.city}</p>
                  {c.note && <p className="c-note">{c.note}</p>}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <SectionHead title="Happening now" href="/events/festivals/" more={'all ' + ongoing.length} />
      <div className="grid">{take(ongoing, 8).map(f => <Card key={f.id} f={f} t={t} />)}</div>

      <SectionHead title="Starting soon" href="/events/festivals/" more={'all ' + upcoming.length + ' upcoming'} />
      <div className="grid">{take(upcoming, 8).map(f => <Card key={f.id} f={f} t={t} />)}</div>

      {trad.length > 0 && (
        <>
          <SectionHead title="Traditional performance" href="/events/traditional/" more={'all ' + trad.length} />
          <p className="intro" style={{ marginTop: -4 }}>
            Gugak, pansori and mask dance run as regular weekend programmes at Korea&apos;s national
            centres — cheap, rarely sold out, and the easiest authentic performance to slot into a trip.
          </p>
          <div className="cult-list">
            {trad.slice(0, 4).map(c => (
              <article key={c.id} className="cult">
                {c.image
                  ? <Link href={'/culture/' + c.slug + '/'} className="cu-ph"><img src={c.image} alt={c.title} loading="lazy" /></Link>
                  : <span className="cu-ph cu-noph" aria-hidden="true" />}
                <div className="cu-body">
                  <div className="cu-when">
                    {cultureDateRange(c)}
                    {isLongRun(c) && <span className="cu-tag">Long run</span>}
                  </div>
                  <h2><Link href={'/culture/' + c.slug + '/'}>{c.title}</Link></h2>
                  <p className="cu-place">{c.venue ? c.venue + ' · ' : ''}{c.region}</p>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {exhibitions.length > 0 && (
        <>
          <SectionHead title="Exhibitions" href="/events/exhibitions/" more={'all ' + liveCulture('exhibition', t).length} />
          <div className="cult-list">
            {exhibitions.slice(0, 4).map(c => (
              <article key={c.id} className="cult">
                <Link href={'/culture/' + c.slug + '/'} className="cu-ph"><img src={c.image!} alt={c.title} loading="lazy" /></Link>
                <div className="cu-body">
                  <div className="cu-when">
                    {cultureDateRange(c)}
                    {isLongRun(c) && <span className="cu-tag">Long run</span>}
                  </div>
                  <h2><Link href={'/culture/' + c.slug + '/'}>{c.title}</Link></h2>
                  <p className="cu-place">{c.venue ? c.venue + ' · ' : ''}{c.region}</p>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <h2 className="sect" style={{ marginTop: 36 }}>Browse by interest</h2>
      <p className="strip">
        {CATEGORIES.map(c => {
          const n = categoryFestivals(c.slug).filter(f => status(f, t) !== 'ended').length;
          return n > 0
            ? <Link key={c.slug} className="chip" href={'/events/festivals/' + c.slug + '/'}>{c.label} ({n})</Link>
            : null;
        })}
      </p>

      <SectionHead title="Browse by region" href="/regions/" more="all regions" />
      <div className="grid">
        {REGIONS.slice(0, 8).map(r => <RegionCard key={r} region={r} t={t} />)}
      </div>

      <section className="about-strip">
        <p>
          <strong>What this site is:</strong> a practical reference for what is on in Korea while
          you are there — every festival registered with the Korea Tourism Organization, merged
          from Korean and English official data and refreshed every morning, plus traditional
          performances and museum exhibitions from Korea&apos;s culture data, and hand-picked
          concerts. Most of it is translated here and appears in English nowhere else.
          {' '}<Link href="/about/" style={{ textDecoration: 'underline' }}>More about the data</Link>
        </p>
      </section>
    </>
  );
}
