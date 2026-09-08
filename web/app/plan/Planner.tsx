'use client';

// Trip Planner — 입국·출국일 사이에 열리는 축제 필터.
// 서버 없이 동작해야 하므로(정적 사이트) lib/data를 import하지 않고
// 서버 페이지가 내려준 슬림 데이터만 쓴다 (전체 JSON 번들 방지).

import { useEffect, useState } from 'react';
import Link from 'next/link';

export type SlimFestival = {
  slug: string; title: string; start: string; end: string;
  region: string; image: string | null;
};

const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const d8 = (iso: string) => iso.split('-').join('');
const nice = (d: string) => MO[Number(d.slice(4, 6)) - 1] + ' ' + Number(d.slice(6, 8));
const niceY = (d: string) => nice(d) + ', ' + d.slice(0, 4);
const range = (s: string, e: string) => (s === e ? niceY(s) : nice(s) + ' – ' + niceY(e));

export default function Planner({ data, regions, today }: {
  data: SlimFestival[]; regions: string[]; today: string;
}) {
  const iso = (d: string) => d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8);
  const plus = (d: string, days: number) => {
    const x = new Date(Number(d.slice(0, 4)), Number(d.slice(4, 6)) - 1, Number(d.slice(6, 8)) + days);
    const p = (n: number) => String(n).padStart(2, '0');
    return String(x.getFullYear()) + '-' + p(x.getMonth() + 1) + '-' + p(x.getDate());
  };

  const [from, setFrom] = useState(iso(today));
  const [to, setTo] = useState(plus(today, 7));
  const [region, setRegion] = useState('All');

  // 홈 폼(GET)이나 공유 링크로 들어온 쿼리 반영
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get('from')) setFrom(q.get('from')!);
    if (q.get('to')) setTo(q.get('to')!);
    if (q.get('region')) setRegion(q.get('region')!);
  }, []);

  // 상태를 URL에 반영 — 결과를 그대로 공유할 수 있게
  useEffect(() => {
    const q = new URLSearchParams({ from, to, ...(region !== 'All' ? { region } : {}) });
    window.history.replaceState(null, '', '?' + q.toString());
  }, [from, to, region]);

  const f = d8(from);
  const t = d8(to);
  const valid = from !== '' && to !== '' && f <= t;

  const results = !valid ? [] : data
    .filter(x => x.start <= t && x.end >= f)
    .filter(x => region === 'All' || x.region === region)
    .sort((a, b) => a.start.localeCompare(b.start));

  return (
    <>
      <div className="tripform">
        <label>Arrive
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} />
        </label>
        <label>Leave
          <input type="date" value={to} onChange={e => setTo(e.target.value)} />
        </label>
        <label>Region
          <select value={region} onChange={e => setRegion(e.target.value)}>
            <option>All</option>
            {regions.map(r => <option key={r}>{r}</option>)}
          </select>
        </label>
      </div>

      {!valid && <p className="sub">Pick your arrival and departure dates — departure needs to be after arrival.</p>}

      {valid && (
        <>
          <h2 className="sect">
            {results.length} festivals on between {nice(f)} and {nice(t)}
            {region !== 'All' ? ' in ' + region : ''}
          </h2>
          <div className="grid">
            {results.map(x => (
              <Link key={x.slug} href={'/festival/' + x.slug + '/'} className="card">
                <div className="phwrap">
                  {x.image
                    ? <img className="ph" src={x.image} alt={x.title} loading="lazy" />
                    : <div className="noph">{x.region}</div>}
                  {x.start < f
                    ? <span className="stamp now">Already on</span>
                    : <span className="stamp soon">{nice(x.start)}</span>}
                </div>
                <div className="body">
                  <div className="when">{range(x.start, x.end)}</div>
                  <h3>{x.title}</h3>
                  <div className="meta">{x.region}</div>
                </div>
              </Link>
            ))}
          </div>
          {results.length === 0 && (
            <p className="sub">
              Nothing registered for those dates yet — festivals are added daily, so check back.
              Or try <Link href="/calendar/" style={{ textDecoration: 'underline' }}>the calendar</Link> for nearby dates.
            </p>
          )}
        </>
      )}
    </>
  );
}
