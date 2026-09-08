import Link from 'next/link';
import Planner, { type SlimFestival } from './Planner';
import { festivals, today, REGIONS } from '@/lib/data';

export const metadata = {
  title: 'Trip Planner — what is on during your dates',
  description: 'Enter your arrival and departure dates and see every festival happening in Korea during your trip — from official tourism data, updated daily.',
};

export default function PlanPage() {
  // 클라이언트로 내려보내는 건 슬림 필드만 (420건 ≈ 수십 KB)
  const slim: SlimFestival[] = festivals
    .filter(f => f.start)
    .map(f => ({
      slug: f.slug, title: f.title,
      start: f.start!, end: f.end ?? f.start!,
      region: f.region, image: f.image,
    }));

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Trip Planner</div>
      <h1>What is on during your trip?</h1>
      <p className="sub">
        Pick your dates and see every festival with confirmed dates in that window —
        including hundreds that never appear on English-language sites.
      </p>
      <Planner data={slim} regions={REGIONS} today={today()} />
    </>
  );
}
