import Link from 'next/link';
import {
  MONTHS_FULL, MONTH_SLUGS, festivals, status, today, dateRange, fmt, type Festival,
} from '@/lib/data';

export const metadata = {
  title: 'Korea Festival Calendar — next 12 months',
  description: 'Monthly calendar of every festival in Korea for the next 12 months, with dates and regions. Updated daily from official tourism data.',
};

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const GRID_MIN = 4;   // 시작 축제가 이보다 적은 달은 그리드 대신 목록으로

function monthStarts(year: number, mIdx: number): Festival[] {
  const mm = String(mIdx + 1).padStart(2, '0');
  return festivals
    .filter(f => f.start && f.start.slice(0, 6) === String(year) + mm)
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''));
}

function MonthHead({ year, mIdx, n }: { year: number; mIdx: number; n: number }) {
  return (
    <div className="sect-row">
      <h2 className="sect">
        <Link href={'/festivals/' + MONTH_SLUGS[mIdx] + '/'}>{MONTHS_FULL[mIdx]} {year}</Link>
      </h2>
      <span className="meta">{n} starting · <Link className="more" href={'/festivals/' + MONTH_SLUGS[mIdx] + '/'}>month page →</Link></span>
    </div>
  );
}

function MonthList({ list }: { list: Festival[] }) {
  return (
    <ul className="agenda">
      {list.map(f => (
        <li key={f.id}>
          <span className="ad">{fmt(f.start)}</span>
          <Link href={'/festival/' + f.slug + '/'}>{f.title}</Link>
          <span className="meta"> · {f.region}</span>
        </li>
      ))}
    </ul>
  );
}

function MonthGrid({ year, mIdx, t, starting }: { year: number; mIdx: number; t: string; starting: Festival[] }) {
  const mm = String(mIdx + 1).padStart(2, '0');
  const byDay = new Map<number, Festival[]>();
  for (const f of starting) {
    const d = Number(f.start!.slice(6, 8));
    const arr = byDay.get(d) ?? [];
    arr.push(f);
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
                {evs.slice(0, 3).map(f => (
                  <Link key={f.id} className="ev" href={'/festival/' + f.slug + '/'} title={f.title}>{f.title}</Link>
                ))}
                {evs.length > 3 && (
                  <Link className="ev ev-more" href={'/festivals/' + MONTH_SLUGS[mIdx] + '/'}>+{evs.length - 3} more</Link>
                )}
              </div>
            </div>
          );
        })}
        {Array.from({ length: tail }).map((_, i) => <div key={'e' + i} className="day blank" />)}
      </div>

      <ul className="agenda cal-list">
        {starting.map(f => (
          <li key={f.id}>
            <span className="ad">{fmt(f.start)}</span>
            <Link href={'/festival/' + f.slug + '/'}>{f.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function CalendarPage() {
  const t = today();
  const curY = Number(t.slice(0, 4));
  const curM = Number(t.slice(4, 6)) - 1;

  const ongoing = festivals.filter(f => status(f, t) === 'ongoing')
    .sort((a, b) => (a.end ?? '').localeCompare(b.end ?? ''));

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Calendar</div>
      <h1>Festival Calendar</h1>
      <p className="sub">Festivals by start date, next 12 months</p>

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
        const starting = monthStarts(year, mIdx);
        if (starting.length === 0) return null;
        return (
          <section className="cal-month" key={year + '-' + mIdx}>
            <MonthHead year={year} mIdx={mIdx} n={starting.length} />
            {starting.length >= GRID_MIN
              ? <MonthGrid year={year} mIdx={mIdx} t={t} starting={starting} />
              : <MonthList list={starting} />}
          </section>
        );
      })}
    </>
  );
}
