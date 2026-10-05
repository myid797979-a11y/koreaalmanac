'use client';

import { useEffect, useState } from 'react';

// 홈 책력의 날짜 — 빌드 시각이 아니라 "지금 한국(KST)" 날짜를 보여준다.
// 정적 사이트라 빌드가 늦으면(GitHub 예약 실행은 몇 시간씩 밀린다) 어제 날짜가 남아 있었다 (2026-10-06).
// 서버 렌더는 빌드 날짜로 그리고, 브라우저에서 KST 로 바로 고친다. 숫자(축제 수 등)는 빌드 기준 그대로.
type D = { month: string; year: string; day: string; weekday: string };

function nowKst(): D {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Seoul', year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
    }).formatToParts(new Date()).map(p => [p.type, p.value]),
  );
  return { month: parts.month, year: parts.year, day: parts.day, weekday: parts.weekday };
}

export default function AlmanacDate({ initial }: { initial: D }) {
  const [d, setD] = useState<D>(initial);
  useEffect(() => {
    const k = nowKst();
    if (k.day !== initial.day || k.month !== initial.month) setD(k);
  }, [initial.day, initial.month]);
  return (
    <>
      <div className="alm-mon">{d.month} {d.year}</div>
      <div className="alm-day">{d.day}</div>
      <div className="alm-wd">{d.weekday}, Korea</div>
    </>
  );
}
