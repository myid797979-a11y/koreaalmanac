import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DAYS, DAY_LABEL, OPEN_REGIONS, openOn, closedOn, type Day, type OpenPlace } from '@/lib/open-days';
import { catMeta, displayTitle } from '@/lib/places';
import { rankPlaces } from '@/lib/place-rank';
import { HOLIDAYS } from '@/lib/holidays';
import { today } from '@/lib/data';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';

// 요일별 "여는 곳" (2026-11-12). 궁궐·박물관 휴무가 월요일·화요일로 갈려 여행 일정이 자주 꼬인다 —
// KTO 휴무일 문장을 요일 규칙으로 읽어(lib/open-days) 그 요일에 여는 곳만 지역·분류별로 보여 준다.
// 매일 다시 빌드되므로 공휴일 안내도 그날 기준으로 바뀐다.

export function generateStaticParams() {
  return DAYS.map(day => ({ day }));
}

const isDay = (d: string): d is Day => (DAYS as readonly string[]).includes(d);

export async function generateMetadata({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  if (!isDay(day)) return {};
  const L = DAY_LABEL[day];
  const shut = closedOn(day).filter(p => p.region === 'Seoul' && (p.cat === 'heritage' || p.cat === 'museums')).length;
  return {
    title: `What’s open on ${L} in Seoul and Korea — palaces, museums and markets`,
    description: `Palaces, museums, markets and viewpoints open on a ${L} in Seoul, Busan, Jeju and beyond, from official opening data — and the ${shut} Seoul palaces and museums that close every ${L}.`,
  };
}

/** 개관 시간 원문을 한 줄로 짧게 */
function shortHours(h: string | null): string {
  if (!h) return '';
  const one = h.replace(/\s+/g, ' ').replace(/※.*$/, '').trim();
  return one.length > 70 ? one.slice(0, 67).replace(/\s\S*$/, '') + '…' : one;
}

/** 휴무 문장에서 그 요일이 들어 있는 구절만 — "[Permanent hall] 1st Monday of March, June…" */
function dayClause(closed: string, day: Day): string {
  const s = closed.replace(/\s+/g, ' ');
  const i = s.toLowerCase().indexOf(day);
  if (i < 0) return s.slice(0, 80);
  // 구절 시작 = 그 앞의 마지막 쉼표·마침표·세미콜론·대괄호 닫힘 뒤
  const start = Math.max(s.lastIndexOf(',', i), s.lastIndexOf(';', i), s.lastIndexOf('·', i), s.lastIndexOf(']', i), s.lastIndexOf('.', i)) + 1;
  const out = s.slice(start, Math.min(s.length, i + 70)).trim();
  return out.length < s.length - start ? out.replace(/\s\S*$/, '') + '…' : out;
}

function Row({ p, day }: { p: OpenPlace; day: Day }) {
  return (
    <li>
      <Link href={'/place/' + p.slug + '/'}>{displayTitle(p.title)}</Link>
      <span className="meta">
        {' '}· {catMeta(p.cat).label}
        {p.hours ? ' · ' + shortHours(p.hours) : ''}
      </span>
      {p.rule.some.includes(day) && (
        <span className="openlist-warn"> Closed on some {DAY_LABEL[day]}s: {dayClause(p.closed!, day)}</span>
      )}
    </li>
  );
}

const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dowOf = (ymd: string) => DAYS[(new Date(Date.UTC(+ymd.slice(0, 4), +ymd.slice(4, 6) - 1, +ymd.slice(6, 8))).getUTCDay() + 6) % 7];

export default async function OpenOnDay({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  if (!isDay(day)) notFound();
  const L = DAY_LABEL[day];
  const t = today();

  const open = openOn(day);
  const shutSeoul = rankPlaces(closedOn(day).filter(p => p.region === 'Seoul'), 'Seoul').slice(0, 10);
  // 앞으로 90일 안에 이 요일에 걸리는 공휴일
  const limit = String(Number(t) + 300);   // 대략 3개월 (YYYYMMDD 비교용 여유값)
  const holi = HOLIDAYS.filter(h => h.date >= t && h.date <= limit && dowOf(h.date) === day);

  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Open today', path: '/open-on/' },
    { name: 'Open on ' + L, path: '/open-on/' + day + '/' },
  ]);

  return (
    <div className="overview">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/open-on/">Open today</Link> › {L}
      </div>
      <h1>What’s open on {L} in Korea</h1>
      <p className="sub">
        Korea’s palaces and museums don’t share a closing day — some shut on Mondays, others on
        Tuesdays — so the day you pick decides what you can see. Below: {open.length} palaces,
        museums, markets, viewpoints and theme parks open on a {L}, read from each place’s
        official closing-day record.
      </p>

      <p className="strip">
        {DAYS.map(d => d === day
          ? <strong key={d}>{DAY_LABEL[d]}</strong>
          : <Link key={d} href={'/open-on/' + d + '/'}>{DAY_LABEL[d]}</Link>)}
      </p>

      {holi.map(h => (
        <div key={h.date} className="ended-banner" style={{ borderLeftColor: 'var(--seal)' }}>
          <strong>{h.name} falls on {L} {Number(h.date.slice(6, 8))} {MO[Number(h.date.slice(4, 6)) - 1]}.</strong>{' '}
          {h.note} Places that close on public holidays will be shut that day — check the closing note on each place page.
        </div>
      ))}

      {shutSeoul.length > 0 && (
        <div className="callout">
          <strong>Closed every {L} in Seoul</strong>
          <ul>
            {shutSeoul.map(p => (
              <li key={p.id}>
                <Link href={'/place/' + p.slug + '/'}>{displayTitle(p.title)}</Link>
                <span className="meta"> · {catMeta(p.cat).label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {OPEN_REGIONS.map(r => {
        const items = rankPlaces(open.filter(p => p.region === r), r);
        if (!items.length) return null;
        return (
          <section key={r}>
            <div className="sect-row">
              <h2 className="sect">{r}</h2>
              <span className="meta">{items.length} open</span>
            </div>
            <ul className="openlist">
              {items.map(p => <Row key={p.id} p={p} day={day} />)}
            </ul>
          </section>
        );
      })}

      <p className="meta" style={{ marginTop: 28 }}>
        Closing days come from the Korea Tourism Organization’s official records for each place and
        are refreshed every morning. Places whose record says only “varies” or “check the website”,
        or that close for a whole season, are left out rather than guessed. Most palaces and museums
        that close on a {L} open the next day instead when it is a public holiday — and a few close
        on Seollal and Chuseok. When a visit matters, confirm on the place’s own site.
        See also <Link href="/guides/seoul-palaces/">Seoul’s five palaces</Link> and{' '}
        <Link href="/guides/rainy-day-seoul/">a rainy day in Seoul</Link>.
      </p>
    </div>
  );
}
