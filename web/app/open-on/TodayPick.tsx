'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

/** 방문자 기준 한국 시간의 오늘 요일 — 정적 페이지라 브라우저에서 계산한다 (서버 HTML 에는 아무것도 없다) */
export default function TodayPick() {
  const [day, setDay] = useState<string | null>(null);
  useEffect(() => {
    setDay(KEYS[new Date(Date.now() + 9 * 3600 * 1000).getUTCDay()]);
  }, []);
  if (!day) return null;
  const label = day[0].toUpperCase() + day.slice(1);
  return (
    <p style={{ fontWeight: 600 }}>
      <Link href={'/open-on/' + day + '/'}>Today in Korea is {label} — see what’s open →</Link>
    </p>
  );
}
