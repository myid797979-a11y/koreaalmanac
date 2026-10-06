import Link from 'next/link';
import Card from '@/app/components/Card';
import Stamp from '@/app/components/Stamp';
import RegionCard from '@/app/components/RegionCard';
import {
  festivals, status, today, dateRange, onWeekend, weekendWindow,
  MONTHS_FULL, MONTH_SLUGS, REGIONS, CATEGORIES, categoryFestivals, type Festival,
} from '@/lib/data';
import { FEATURED_IDS } from '@/lib/editorial';
import { rankFestivals, rankShortFirst } from '@/lib/festival-rank';
import { upcomingConcerts, concertDateRange, KIND_LABEL } from '@/lib/concerts';
import { liveCulture } from '@/lib/culture';
import CultureCard from '@/app/components/CultureCard';
import { placeBySlug } from '@/lib/places';
import AlmanacDate from '@/app/components/AlmanacDate';
import { GUIDES, nowGuideHrefs, FIRST_TRIP } from '@/lib/guides';

// 홈 제목이 사이트명뿐(13자)이라 Bing URL 검사가 "너무 짧은 제목" 오류를 냈다.
// 무엇을 찾는 사람이 오는 페이지인지 제목에 담는다.
export const metadata = {
  title: "What's On in Korea — Festivals, Concerts & Places to Visit",
  description:
    'Festivals, concerts, traditional performances and exhibitions on in Korea now — ' +
    'with real dates, venues and fees. Plus 2,300+ places to visit.',
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
  // 히어로는 갤러리 사진이 있는 것을 먼저 고른다 — 대표 이미지가 포스터뿐인 축제를
  // 크게 띄우면 여백만 큰 카드가 된다 (광주비엔날레 포스터가 그랬다).
  const pick = featured.find(f => (f.images?.length ?? 0) >= 3) ?? featured[0];

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
          <AlmanacDate initial={{ month: MONTHS_FULL[mIdx], year: t.slice(0, 4), day: String(day), weekday }} />
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
            <Stamp start={pick.start} end={pick.end} t={t} />
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
      <div className="grid">{take(rankShortFirst(weekend), 4).map(f => <Card key={f.id} f={f} t={t} />)}</div>
      <p className="strip" style={{ marginTop: 12 }}><Link href="/seoul-this-weekend/">Everything on in Seoul this weekend: festivals, concerts and shows</Link></p>

      {concerts.length > 0 && (
        <>
          <SectionHead title="Concerts &amp; live music" href="/events/concerts/" more={'all ' + concerts.length} />
          <div className="concert-list">
            {concerts.slice(0, 4).map(c => (
              <article key={c.id} className="concert">
                <div className="c-date">
                  <span className="c-when">{concertDateRange(c)}</span>
                  <span className={'c-kind k-' + c.kind}>{KIND_LABEL[c.kind]}</span>
                  <Stamp start={c.start} end={c.end} t={t} inline />
                </div>
                <div className="c-body">
                  <h3>
                    <Link href={'/concert/' + c.id + '/'}>
                      {c.artist === 'Various artists' ? c.title : c.artist}
                    </Link>
                  </h3>
                  <p className="c-venue">{c.venue} · {c.city}</p>
                  {c.note && <p className="c-note">{c.note}</p>}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {/*
        예전에는 "Happening now" 와 "Starting soon" 을 8장씩 따로 뒀다. 둘 다 시작일 순이라
        여행자 눈에는 같은 목록이 두 번 나오는 것으로 보였고, 왜 이 축제가 저쪽이 아니라
        이쪽에 있는지 설명되지 않았다. 하나로 합치고 순위를 매긴다 — 지금 갈 수 있는 것 중
        '큰 것'을 먼저 보여주는 편이 날짜로 쪼개는 것보다 쓸모 있다.
      */}
      <SectionHead
        title="On now and coming up"
        href="/events/festivals/"
        more={'all ' + (ongoing.length + upcoming.length)}
      />
      <div className="grid">
        {take(rankFestivals([...ongoing, ...upcoming]), 8).map(f => <Card key={f.id} f={f} t={t} />)}
      </div>

      {trad.length > 0 && (
        <>
          <SectionHead title="Traditional performance" href="/events/traditional/" more={'all ' + trad.length} />
          <p className="intro" style={{ marginTop: -4 }}>
            Gugak, pansori and mask dance run as regular weekend programmes at Korea&apos;s national
            centres — cheap, rarely sold out, and the easiest authentic performance to slot into a trip.
          </p>
          <div className="cult-list">
            {trad.slice(0, 4).map(c => <CultureCard key={c.id} c={c} t={t} />)}
          </div>
        </>
      )}

      {exhibitions.length > 0 && (
        <>
          <SectionHead title="Exhibitions" href="/events/exhibitions/" more={'all ' + liveCulture('exhibition', t).length} />
          <div className="cult-list">
            {exhibitions.slice(0, 4).map(c => <CultureCard key={c.id} c={c} t={t} />)}
          </div>
        </>
      )}

      {/* 가이드 — 홈에서 가이드로 가는 링크가 없었다 (2026-09-28). 시즌에 맞는 넷만, lib/guides.ts 가 고른다. */}
      <SectionHead title="Plan around the season" href="/guides/" more="all guides" />
      <div className="cult-list">
        {nowGuideHrefs(t).map(h => GUIDES.find(g => g.href === h)).filter(Boolean).map(g => {
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

      <p className="strip" style={{ marginTop: 18 }}>
        <strong>First trip to Korea?</strong>
        {FIRST_TRIP.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
      </p>

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
