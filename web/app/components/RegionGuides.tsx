import Link from 'next/link';
import { GUIDES, REGION_GUIDES } from '@/lib/guides';

// 축제·장소 상세 하단의 "이 지역 가이드" 줄 — 4천 페이지에서 가이드로 가는 내부 링크.
// ⚠ 반드시 <nav class="g-related"> 로 감싼다. freshness.mjs 가 이 블록을 해시에서 빼므로,
//   가이드 목록을 바꿔도 축제·장소 수천 페이지가 "변경"으로 잡히지 않는다.
const FALLBACK = ['/guides/korea-7-day-itinerary/', '/guides/best-festivals-in-korea/', '/guides/day-trips-from-seoul/'];

export default function RegionGuides({ region }: { region: string }) {
  const hrefs = (REGION_GUIDES[region] ?? []).filter(h => h.startsWith('/guides/'));
  const list = (hrefs.length ? hrefs : FALLBACK).slice(0, 4)
    .map(h => GUIDES.find(g => g.href === h)).filter(Boolean);
  if (list.length === 0) return null;
  return (
    <nav className="g-related strip" aria-label={'Guides for ' + region}>
      <strong>{hrefs.length ? 'Plan your trip to ' + region : 'Plan your trip'}</strong>
      {list.map(g => <Link key={g!.href} href={g!.href}>{g!.title}</Link>)}
    </nav>
  );
}
