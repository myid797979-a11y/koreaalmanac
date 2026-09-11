import Link from 'next/link';
import Planner, { type SlimEvent } from './Planner';
import { festivals, today, REGIONS } from '@/lib/data';
import { culture } from '@/lib/culture';
import { concerts } from '@/lib/concerts';

export const metadata = {
  title: 'Trip Planner — what is on during your dates',
  description: 'Enter your arrival and departure dates and see every festival, concert, performance and exhibition on in Korea while you are there.',
};

export default function PlanPage() {
  // 클라이언트로 내려보내는 건 슬림 필드만. 축제만 보여주던 것을
  // 공연·전통공연·전시까지 넓혔다 — 장소 페이지가 "Trip Planner shows everything on"
  // 이라고 안내하는데 실제로는 축제만 보던 상태였다.
  const slim: SlimEvent[] = [
    ...festivals.filter(f => f.start).map(f => ({
      href: '/festival/' + f.slug + '/',
      title: f.title,
      start: f.start!, end: f.end ?? f.start!,
      region: f.region, image: f.image,
      kind: 'festival' as const,
      where: f.place ?? null,
    })),
    ...concerts.filter(c => c.start).map(c => ({
      href: '/concert/' + c.id + '/',
      title: c.artist === 'Various artists' ? c.title : c.artist,
      start: c.start, end: c.end ?? c.start,
      region: c.region, image: null,
      kind: 'concert' as const,
      where: c.venue,
    })),
    ...culture.filter(c => c.start).map(c => ({
      href: '/culture/' + c.slug + '/',
      title: c.title,
      start: c.start, end: c.end ?? c.start,
      region: c.region, image: c.image,
      kind: (c.kind === 'traditional' ? 'performance' : 'exhibition') as 'performance' | 'exhibition',
      where: c.venue,
    })),
  ];

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Trip Planner</div>
      <h1>What is on during your trip?</h1>
      <p className="sub">
        Pick your dates and see everything with confirmed dates in that window — festivals,
        concerts, traditional performances and exhibitions, including hundreds that never
        appear on English-language sites.
      </p>
      <Planner data={slim} regions={REGIONS} today={today()} />
    </>
  );
}
