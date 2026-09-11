import Link from 'next/link';
import {
  MONTHS_FULL, MONTH_SLUGS, festivals, status, today, dateRange, fmt,
} from '@/lib/data';
import { upcomingConcerts } from '@/lib/concerts';

export const metadata = {
  title: 'Korea Festival & Concert Calendar — next 12 months',
  description: 'A 12-month calendar of festivals and concerts in Korea, with dates and regions. Festivals update daily from official tourism data.',
};

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const GRID_MIN = 4;   // 이벤트가 이보다 적은 달은 그리드 대신 목록으로

// 축제와 공연을 하나의 달력 이벤트로 통합. kind 로 색을 구분한다.
type CalEvent = {
  key: string; start: string; title: string; href: string;
  kind: 'festival' | 'concert'; region: string;
};

const festEvents: CalEvent[] = festivals
  .filter(f => f.start)
  .map(f => ({
    key: 'f' + f.id, start: f.start!, title: f.title,
    href: '/festival/' + f.slug + '/', kind: 'festival', region: f.region,
  }));

function concertEvents(t: string): CalEvent[] {
  return upcomingConcerts(t).map(c => ({
    key: 'c' + c.id, start: c.start,
    title: c.artist === 'Various artists' ? c.title : c.artist,
    href: '/concert/' + c.id + '/', kind: 'concert', region: c.region,
  }));
}

function monthEvents(all: CalEvent[], year: number, mIdx: number): CalEvent[] {
  const ym = String(year) + String(mIdx + 1).padStart(2, '0');
  return all
    .filter(e => e.start.slice(0, 6) === ym)
    .sort((a, b) => a.start.localeCompare(b.start));
}

function MonthHead({ year, mIdx, n }: { year: number; mIdx: number; n: number }) {
  return (
    <div className="sect-row">
      <h2 className="sect">
        <Link href={'/events/festivals/' + MONTH_SLUGS[mIdx] + '/'}>{MONTHS_FULL[mIdx]} {year}</Link>
      </h2>
      <span className="meta">{n} events · <Link className="more" href={'/events/festivals/' + MONTH_SLUGS[mIdx] + '/'}>month page →</Link></span>
    </div>
  );
}

function EventRow({ e }: { e: CalEvent }) {
  return (
    <li>
      <span className="ad">{fmt(e.start)}</span>
      <span className={'dot dot-' + e.kind} aria-hidden="true" />
      <Link href={e.href}>{e.title}</Link>
      <span className="meta"> · {e.region}</span>
    </li>
  );
}

function MonthList({ list }: { list: CalEvent[] }) {
  return <ul className="agenda">{list.map(e => <EventRow key={e.key} e={e} />)}</ul>;
}

function MonthGrid({ year, mIdx, t, list }: { year: number; mIdx: number; t: string; list: CalEvent[] }) {
  const mm = String(mIdx + 1).padStart(2, '0');
  const byDay = new Map<number, CalEvent[]>();
  for (const e of list) {
    const d = Number(e.start.slice(6, 8));
    const arr = byDay.get(d) ?? [];
    arr.push(e);
    byDay.set(d, arr);
  }

  const first = new Date(year, mIdx, 1).getDay();
  const days = new Date(year, mIdx + 1, 0).getDate();
  const tail = (7 - (first + days) % 7) % 7;

  return (
    <>
      <div className="cal">
        {DOW.map(d => <div key={d} className="dow">{d}</div>)}
        {Array.from({ length: first }).map((_, i) => <div key={'b' + i} className="day blank" />)}
        {Array.from({ length: days }).map((_, i) => {
          const d = i + 1;
          const ds = String(year) + mm + String(d).padStart(2, '0');
          const evs = byDay.get(d) ?? [];
          const dow = (first + i) % 7;
          return (
            <div key={d} className={'day' + (ds === t ? ' today' : '')}>
              <span className={'dn' + (dow === 0 ? ' sun' : dow === 6 ? ' sat' : '')}>{d}</span>
              <div className="evs">
                {evs.slice(0, 3).map(e => (
                  <Link key={e.key} className={'ev ev-' + e.kind} href={e.href} title={e.title}>{e.title}</Link>
                ))}
                {evs.length > 3 && (
                  <Link className="ev ev-more" href={'/events/festivals/' + MONTH_SLUGS[mIdx] + '/'}>+{evs.length - 3} more</Link>
                )}
              </div>
            </div>
          );
        })}
        {Array.from({ length: tail }).map((_, i) => <div key={'e' + i} className="day blank" />)}
      </div>

      <ul className="agenda cal-list">{list.map(e => <EventRow key={e.key} e={e} />)}</ul>
    </>
  );
}

export default function CalendarPage() {
  const t = today();
  const curY = Number(t.slice(0, 4));
  const curM = Number(t.slice(4, 6)) - 1;

  const allEvents = [...festEvents, ...concertEvents(t)];

  const ongoing = festivals.filter(f => status(f, t) === 'ongoing')
    .sort((a, b) => (a.end ?? '').localeCompare(b.end ?? ''));

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Calendar</div>
      <h1>Festival &amp; concert calendar</h1>
      <p className="sub">
        Festivals and concerts by start date, next 12 months ·
        {' '}<a href="/feeds/all.ics" style={{ textDecoration: 'underline' }}>subscribe to festivals (.ics)</a>
      </p>
      <p className="cal-legend">
        <span className="lg"><span className="dot dot-festival" /> Festivals</span>
        <span className="lg"><span className="dot dot-concert" /> Concerts &amp; shows</span>
      </p>

      {ongoing.length > 0 && (
        <details className="ongoing-box">
          <summary>Happening right now — {ongoing.length} festivals <span className="meta">(tap to expand)</span></summary>
          <ul className="agenda">
            {ongoing.map(f => (
              <li key={f.id}>
                <span className="ad">until {dateRange(f).split('–').pop()}</span>
                <Link href={'/festival/' + f.slug + '/'}>{f.title}</Link>
                <span className="meta"> · {f.region}</span>
              </li>
            ))}
          </ul>
        </details>
      )}

      {Array.from({ length: 12 }).map((_, k) => {
        const mIdx = (curM + k) % 12;
        const year = curY + Math.floor((curM + k) / 12);
        const list = monthEvents(allEvents, year, mIdx);
        if (list.length === 0) return null;
        return (
          <section className="cal-month" key={year + '-' + mIdx}>
            <MonthHead year={year} mIdx={mIdx} n={list.length} />
            {list.length >= GRID_MIN
              ? <MonthGrid year={year} mIdx={mIdx} t={t} list={list} />
              : <MonthList list={list} />}
          </section>
        );
      })}
    </>
  );
}
