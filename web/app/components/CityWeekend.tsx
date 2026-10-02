import Link from 'next/link';
import Card from '@/app/components/Card';
import { festivals, today, weekendWindow } from '@/lib/data';
import { rankShortFirst } from '@/lib/festival-rank';
import { upcomingConcerts, concertDateRange } from '@/lib/concerts';
import { liveCulture, cultureDateRange, isLongRun } from '@/lib/culture';
import { FIRST_TRIP } from '@/lib/guides';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';

// 공연명에 아티스트가 이미 있으면 다시 붙이지 않는다 ("Zara Larsson: Zara Larsson: …")
const showName = (c: { artist: string; title: string }) =>
  c.artist === 'Various artists' || c.title.toLowerCase().includes(c.artist.toLowerCase()) ? c.title : c.artist + ': ' + c.title;

const overlaps = (s: string | null | undefined, e: string | null | undefined, from: string, to: string) =>
  !!s && s <= to && (e ?? s) >= from;

export type WeekendCity = {
  city: string;                 // 지역명 (festivals.region 과 같은 값)
  slug: string;                 // /<slug>/
  near: string[];               // 당일치기 권역
  nearIntro: React.ReactNode;
  links: { href: string; label: string }[];
};

/** 도시별 "이번 주말" 페이지 본문 — app/seoul-this-weekend, app/busan-this-weekend */
export default function CityWeekend({ city, slug, near: nearRegions, nearIntro, links }: WeekendCity) {
  const t = today();
  const { from, to, label } = weekendWindow(t);
  const on = festivals.filter(f => overlaps(f.start, f.end, from, to));
  const local = rankShortFirst(on.filter(f => f.region === city), 'rank');
  const near = rankShortFirst(on.filter(f => nearRegions.includes(f.region)), 'rank').slice(0, 8);
  const far = rankShortFirst(on.filter(f => f.region !== city && !nearRegions.includes(f.region)), 'rank').slice(0, 8);
  const concerts = upcomingConcerts(t).filter(c => overlaps(c.start, c.end, from, to));
  const localConcerts = concerts.filter(c => c.region === city);
  const otherConcerts = concerts.filter(c => c.region !== city);
  const shows = liveCulture(undefined, t).filter(c => c.region === city && overlaps(c.start, c.end, from, to));
  // 무대 공연을 먼저, 전시는 곧 끝나는 순으로 — 시작일 순이면 5월에 연 장기 전시가 맨 위로 온다
  const stage = shows.filter(c => c.kind === 'traditional').slice(0, 10);
  const exhibitions = shows.filter(c => c.kind === 'exhibition').sort((a, b) => a.end.localeCompare(b.end));
  const shortShows = [...stage, ...exhibitions.filter(c => !isLongRun(c))].slice(0, 14);
  const longShows = exhibitions.filter(c => isLongRun(c)).slice(0, 8);

  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: city + ' this weekend', path: '/' + slug + '/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <div className="crumb"><Link href="/">Home</Link> › {city} this weekend</div>
      <h1>Things to do in {city} this weekend: {label}</h1>
      <p className="sub">
        {local.length} {local.length === 1 ? 'festival' : 'festivals'} · {localConcerts.length} {localConcerts.length === 1 ? 'concert' : 'concerts'} · {shows.length} exhibitions and
        performances in {city}, Friday to Sunday. Rebuilt every morning from official data.
      </p>

      <nav className="g-jump" aria-label="Sections">
        {local.length > 0 && <a href="#festivals">Festivals</a>}
        {localConcerts.length > 0 && <a href="#concerts">Concerts</a>}
        {shows.length > 0 && <a href="#shows">Exhibitions and stage</a>}
        {near.length > 0 && <a href="#day-trips">Day trips</a>}
        {far.length > 0 && <a href="#elsewhere">Elsewhere in Korea</a>}
      </nav>

      {local.length > 0 && (
        <section id="festivals">
          <h2 className="sect">Festivals in {city}</h2>
          <div className="grid">{local.slice(0, 12).map(f => <Card key={f.id} f={f} t={t} />)}</div>
          {local.length > 12 && (
            <p className="meta">Plus {local.length - 12} more: see <Link href={'/events/festivals/' + city.toLowerCase() + '/'}>all festivals in {city}</Link>.</p>
          )}
        </section>
      )}

      {localConcerts.length > 0 && (
        <section id="concerts">
          <h2 className="sect">Concerts in {city}</h2>
          <ul className="agenda">
            {localConcerts.map(c => (
              <li key={c.id}>
                <span className="ad">{concertDateRange(c)}</span>
                <Link href={'/concert/' + c.id + '/'}>{showName(c)}</Link>
                <span className="meta"> · {c.venue}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {shows.length > 0 && (
        <section id="shows">
          <h2 className="sect">Exhibitions and traditional performances</h2>
          {shortShows.length > 0 && (
            <ul className="agenda">
              {shortShows.map(c => (
                <li key={c.id}>
                  <span className="ad">{cultureDateRange(c)}</span>
                  <Link href={'/culture/' + c.slug + '/'}>{c.title}</Link>
                  {c.venue && <span className="meta"> · {c.venue}</span>}
                </li>
              ))}
            </ul>
          )}
          {longShows.length > 0 && (
            <>
              <p className="meta" style={{ margin: '14px 0 6px' }}>Running for weeks, and on this weekend too:</p>
              <ul className="agenda">
                {longShows.map(c => (
                  <li key={c.id}>
                    <span className="ad">until {cultureDateRange(c).split('–').pop()?.trim()}</span>
                    <Link href={'/culture/' + c.slug + '/'}>{c.title}</Link>
                    {c.venue && <span className="meta"> · {c.venue}</span>}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {near.length > 0 && (
        <section id="day-trips">
          <h2 className="sect">Day trips: on near {city}</h2>
          <p className="intro" style={{ marginTop: -4 }}>{nearIntro}</p>
          <div className="grid">{near.map(f => <Card key={f.id} f={f} t={t} />)}</div>
        </section>
      )}

      {(far.length > 0 || otherConcerts.length > 0) && (
        <section id="elsewhere">
          <h2 className="sect">Elsewhere in Korea this weekend</h2>
          {far.length > 0 && <div className="grid">{far.map(f => <Card key={f.id} f={f} t={t} />)}</div>}
          {otherConcerts.length > 0 && (
            <ul className="agenda" style={{ marginTop: 14 }}>
              {otherConcerts.map(c => (
                <li key={c.id}>
                  <span className="ad">{concertDateRange(c)}</span>
                  <Link href={'/concert/' + c.id + '/'}>{showName(c)}</Link>
                  <span className="meta"> · {c.venue}, {c.city}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <p className="strip" style={{ marginTop: 28 }}>
        <Link href="/plan/">Trip Planner: your own dates</Link>
        <Link href="/calendar/">Full calendar</Link>
        {links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
      </p>
      <p className="strip">
        <strong>First trip to Korea?</strong>
        {FIRST_TRIP.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
      </p>
      <p className="meta">
        Festival data from the Korea Tourism Organization; concerts compiled from official
        announcements and KOPIS. Dates can change, so check the official listing before you go.
      </p>
    </>
  );
}
