import Link from 'next/link';
import Card from '@/app/components/Card';
import { festivals, today, weekendWindow } from '@/lib/data';
import { rankShortFirst } from '@/lib/festival-rank';
import { upcomingConcerts, concertDateRange } from '@/lib/concerts';
import { liveCulture, cultureDateRange, isLongRun } from '@/lib/culture';
import { FIRST_TRIP } from '@/lib/guides';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';

// "이번 주말 서울" — 매일 빌드 때 다시 계산되는 고정 주소. "things to do in Seoul this weekend" 검색용.
// 데이터는 홈의 This weekend 와 같은 창(금~일, 일요일이면 그 주말)을 쓴다.
export function generateMetadata() {
  const { label } = weekendWindow(today());
  return {
    title: `Things to do in Seoul this weekend (${label}): festivals, concerts and shows`,
    description: `What is on in Seoul this weekend, ${label}: festivals, K-pop and live concerts, exhibitions and traditional performances, plus day trips and the big festivals elsewhere in Korea. Updated every morning.`,
  };
}

// 공연명에 아티스트가 이미 있으면 다시 붙이지 않는다 ("Zara Larsson: Zara Larsson: …")
const showName = (c: { artist: string; title: string }) =>
  c.artist === 'Various artists' || c.title.toLowerCase().includes(c.artist.toLowerCase()) ? c.title : c.artist + ': ' + c.title;

const overlaps = (s: string | null | undefined, e: string | null | undefined, from: string, to: string) =>
  !!s && s <= to && (e ?? s) >= from;

export default function SeoulThisWeekend() {
  const t = today();
  const { from, to, label } = weekendWindow(t);
  const on = festivals.filter(f => overlaps(f.start, f.end, from, to));
  const seoul = rankShortFirst(on.filter(f => f.region === 'Seoul'), 'rank');
  const near = rankShortFirst(on.filter(f => f.region === 'Gyeonggi' || f.region === 'Incheon'), 'rank').slice(0, 8);
  const far = rankShortFirst(on.filter(f => !['Seoul', 'Gyeonggi', 'Incheon'].includes(f.region)), 'rank').slice(0, 8);
  const concerts = upcomingConcerts(t).filter(c => overlaps(c.start, c.end, from, to));
  const seoulConcerts = concerts.filter(c => c.region === 'Seoul');
  const otherConcerts = concerts.filter(c => c.region !== 'Seoul');
  const shows = liveCulture(undefined, t).filter(c => c.region === 'Seoul' && overlaps(c.start, c.end, from, to));
  // 무대 공연을 먼저, 전시는 곧 끝나는 순으로 — 시작일 순이면 5월에 연 장기 전시가 맨 위로 온다
  const stage = shows.filter(c => c.kind === 'traditional').slice(0, 10);
  const exhibitions = shows.filter(c => c.kind === 'exhibition').sort((a, b) => a.end.localeCompare(b.end));
  const shortShows = [...stage, ...exhibitions.filter(c => !isLongRun(c))].slice(0, 14);
  const longShows = exhibitions.filter(c => isLongRun(c)).slice(0, 8);

  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Seoul this weekend', path: '/seoul-this-weekend/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <div className="crumb"><Link href="/">Home</Link> › Seoul this weekend</div>
      <h1>Things to do in Seoul this weekend: {label}</h1>
      <p className="sub">
        {seoul.length} festivals · {seoulConcerts.length} concerts · {shows.length} exhibitions and
        performances in Seoul, Friday to Sunday. Rebuilt every morning from official data.
      </p>

      <nav className="g-jump" aria-label="Sections">
        {seoul.length > 0 && <a href="#festivals">Festivals</a>}
        {seoulConcerts.length > 0 && <a href="#concerts">Concerts</a>}
        {shows.length > 0 && <a href="#shows">Exhibitions and stage</a>}
        {near.length > 0 && <a href="#day-trips">Day trips</a>}
        {far.length > 0 && <a href="#elsewhere">Elsewhere in Korea</a>}
      </nav>

      {seoul.length > 0 && (
        <section id="festivals">
          <h2 className="sect">Festivals in Seoul</h2>
          <div className="grid">{seoul.slice(0, 12).map(f => <Card key={f.id} f={f} t={t} />)}</div>
          {seoul.length > 12 && (
            <p className="meta">Plus {seoul.length - 12} more: see <Link href="/events/festivals/seoul/">all festivals in Seoul</Link>.</p>
          )}
        </section>
      )}

      {seoulConcerts.length > 0 && (
        <section id="concerts">
          <h2 className="sect">Concerts in Seoul</h2>
          <ul className="agenda">
            {seoulConcerts.map(c => (
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
          <h2 className="sect">Day trips: on near Seoul</h2>
          <p className="intro" style={{ marginTop: -4 }}>In Gyeonggi and Incheon, most of them on the subway or within an hour. See <Link href="/guides/day-trips-from-seoul/">day trips from Seoul</Link>.</p>
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
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/rainy-day-seoul/">Rainy day in Seoul</Link>
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
