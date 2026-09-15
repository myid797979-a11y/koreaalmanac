'use client';

// 달력 격자 — 모바일에서 날짜를 탭하면 그날 행사를 바텀시트로 띄운다.
//
// 왜 필요했나: 모바일 CSS 가 행사 링크를 `font-size:0` + 7px 원으로 바꿔 놓았다.
// 밀도 히트맵으로는 읽히지만 탭 대상으로는 못 쓴다 — 7px 은 권장 탭 타깃(44px)의 6분의 1이고,
// 글자가 없으니 눌러도 무엇으로 가는지 알 수 없었다. "+N more" 를 눌러 펼쳐도 점이 더 나올 뿐이었다.
// 그래서 모바일에서는 점을 장식으로 돌리고(`pointer-events:none`) 날짜 칸 전체를 버튼으로 덮는다.
//
// ⚠ 여기서 '@/lib/data' 를 import 하면 안 된다 — 축제 JSON 전체가 클라이언트 번들에 실린다.
//   필요한 값은 전부 props 로 받는다.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export type CalEvent = {
  key: string; start: string; title: string; href: string;
  kind: 'festival' | 'concert'; region: string;
};

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** 시작일까지 며칠 — 달력은 시작일 기준이라 지난 것은 '진행 중'으로 본다 */
function dday(start: string, t: string): string {
  if (start < t) return 'On now';
  if (start === t) return 'Today';
  const asDate = (s: string) =>
    new Date(Number(s.slice(0, 4)), Number(s.slice(4, 6)) - 1, Number(s.slice(6, 8)));
  const n = Math.round((asDate(start).getTime() - asDate(t).getTime()) / 86400000);
  return 'D-' + n;
}

export default function CalendarGrid({
  year, mIdx, monthName, t, list, monthHref,
}: {
  year: number; mIdx: number; monthName: string; t: string;
  list: CalEvent[]; monthHref: string;
}) {
  const [openDay, setOpenDay] = useState<number | null>(null);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (openDay !== null && !dlg.open) dlg.showModal();
    else if (openDay === null && dlg.open) dlg.close();
  }, [openDay]);

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
  const sheet = openDay === null ? [] : byDay.get(openDay) ?? [];

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
                  <Link key={e.key} className={'ev ev-' + e.kind} href={e.href} title={e.title}>
                    {e.title}
                  </Link>
                ))}
                {evs.length > 3 && (
                  // 데스크톱은 제자리에서 펼친다. 예전엔 월 페이지로 보냈는데,
                  // 특정 날짜를 눌러 놓고 그 달 전체로 가버리면 누른 의도와 어긋난다.
                  // 모바일에서는 아래 day-tap 버튼이 덮으므로 이 details 는 열리지 않는다.
                  <details className="daymore">
                    <summary className="ev ev-more">+{evs.length - 3} more</summary>
                    {evs.slice(3).map(e => (
                      <Link key={e.key} className={'ev ev-' + e.kind} href={e.href} title={e.title}>
                        {e.title}
                      </Link>
                    ))}
                  </details>
                )}
              </div>
              {evs.length > 0 && (
                <button
                  type="button"
                  className="day-tap"
                  onClick={() => setOpenDay(d)}
                  aria-label={`${evs.length} event${evs.length > 1 ? 's' : ''} on ${monthName} ${d}`}
                />
              )}
            </div>
          );
        })}
        {Array.from({ length: tail }).map((_, i) => <div key={'e' + i} className="day blank" />)}
      </div>

      <dialog
        ref={ref}
        className="daysheet"
        onClose={() => setOpenDay(null)}
        onClick={e => { if (e.target === ref.current) setOpenDay(null); }}
      >
        <div className="ds-panel">
          <div className="ds-head">
            <strong>{monthName} {openDay}, {year}</strong>
            <button type="button" onClick={() => setOpenDay(null)} aria-label="Close">×</button>
          </div>
          <ul className="ds-list">
            {sheet.map(e => (
              <li key={e.key}>
                <Link href={e.href} className="ds-item">
                  <span className={'ds-kind k-' + e.kind}>
                    {e.kind === 'concert' ? 'Concert' : 'Festival'}
                  </span>
                  <span className="ds-title">{e.title}</span>
                  <span className="ds-meta">{e.region} · {dday(e.start, t)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={monthHref} className="ds-all">See the whole month →</Link>
        </div>
      </dialog>
    </>
  );
}
