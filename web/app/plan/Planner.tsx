'use client';

// Trip Planner — 입국·출국일 사이에 볼 수 있는 것 전부.
// 서버 없이 동작해야 하므로(정적 사이트) lib/* 를 import 하지 않고
// 서버 페이지가 내려준 슬림 데이터만 쓴다 (전체 JSON 번들 방지).

import { useEffect, useState } from 'react';
import Link from 'next/link';

export type PlanKind = 'festival' | 'concert' | 'performance' | 'exhibition';

export type SlimEvent = {
  href: string; title: string; start: string; end: string;
  region: string; image: string | null; kind: PlanKind;
  where: string | null;
};

const KIND_LABEL: Record<PlanKind, string> = {
  festival: 'Festival',
  concert: 'Concert',
  performance: 'Performance',
  exhibition: 'Exhibition',
};

const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const d8 = (iso: string) => iso.split('-').join('');
const nice = (d: string) => MO[Number(d.slice(4, 6)) - 1] + ' ' + Number(d.slice(6, 8));
const niceY = (d: string) => nice(d) + ', ' + d.slice(0, 4);
const range = (s: string, e: string) => (s === e ? niceY(s) : nice(s) + ' – ' + niceY(e));

/** 며칠짜리인가 — 날짜 문자열 두 개의 간격 */
function spanDays(start: string, end: string): number {
  const asDate = (d: string) =>
    new Date(Number(d.slice(0, 4)), Number(d.slice(4, 6)) - 1, Number(d.slice(6, 8)));
  return Math.round((asDate(end).getTime() - asDate(start).getTime()) / 86400000) + 1;
}

/**
 * 여행자가 알고 싶은 건 "내가 있는 동안에만 볼 수 있는 것" 이다.
 * 1년 내내 하는 상설 프로그램이 주말 축제보다 위로 오면 안 된다.
 * 기간이 짧은 순으로 묶고, 그 안에서 시작일 순으로 둔다.
 */
function bucket(span: number): number {
  if (span <= 14) return 0;    // 주말 축제·단기 공연
  if (span <= 60) return 1;    // 한두 달짜리 전시
  if (span <= 180) return 2;   // 시즌 프로그램
  return 3;                    // 상설 — 언제 와도 볼 수 있으니 맨 아래
}

export default function Planner({ data, regions, today }: {
  data: SlimEvent[]; regions: string[]; today: string;
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
  const [kinds, setKinds] = useState<PlanKind[]>([]);

  // 홈 폼(GET)이나 공유 링크로 들어온 쿼리 반영
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get('from')) setFrom(q.get('from')!);
    if (q.get('to')) setTo(q.get('to')!);
    if (q.get('region')) setRegion(q.get('region')!);
  }, []);

  // 상태를 URL 에 반영 — 결과를 그대로 공유할 수 있게
  useEffect(() => {
    const q = new URLSearchParams({ from, to, ...(region !== 'All' ? { region } : {}) });
    window.history.replaceState(null, '', '?' + q.toString());
  }, [from, to, region]);

  const f = d8(from);
  const t = d8(to);
  const valid = from !== '' && to !== '' && f <= t;

  const inWindow = !valid ? [] : data
    .filter(x => x.start <= t && x.end >= f)
    .filter(x => region === 'All' || x.region === region);

  const results = inWindow
    .filter(x => kinds.length === 0 || kinds.includes(x.kind))
    .sort((a, b) => {
      const ba = bucket(spanDays(a.start, a.end));
      const bb = bucket(spanDays(b.start, b.end));
      if (ba !== bb) return ba - bb;
      return a.start.localeCompare(b.start);
    });

  const countOf = (k: PlanKind) => inWindow.filter(x => x.kind === k).length;
  const toggle = (k: PlanKind) =>
    setKinds(ks => (ks.includes(k) ? ks.filter(x => x !== k) : [...ks, k]));

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
          <p className="kindfilter">
            {(Object.keys(KIND_LABEL) as PlanKind[]).map(k => {
              const n = countOf(k);
              if (n === 0) return null;
              return (
                <button
                  key={k}
                  type="button"
                  className={kinds.includes(k) ? 'kf on' : 'kf'}
                  onClick={() => toggle(k)}
                >
                  {KIND_LABEL[k]} <span>{n}</span>
                </button>
              );
            })}
            {kinds.length > 0 && (
              <button type="button" className="kf clear" onClick={() => setKinds([])}>Clear</button>
            )}
          </p>

          <h2 className="sect">
            {results.length} on between {nice(f)} and {nice(t)}
            {region !== 'All' ? ' in ' + region : ''}
          </h2>
          <p className="meta" style={{ marginTop: -6, marginBottom: 14 }}>
            Shortest runs first — a festival on only while you are here beats a programme that
            runs all year.
          </p>

          <div className="grid">
            {results.map(x => (
              <Link key={x.href} href={x.href} className="card">
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
                  <div className="meta">
                    {KIND_LABEL[x.kind]} · {x.where ?? x.region}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {results.length === 0 && (
            <p className="sub">
              Nothing registered for those dates yet — events are added daily, so check back.
              Or try <Link href="/calendar/" style={{ textDecoration: 'underline' }}>the calendar</Link> for nearby dates.
            </p>
          )}
        </>
      )}
    </>
  );
}
