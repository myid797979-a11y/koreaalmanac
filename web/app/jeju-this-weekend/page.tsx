import Link from 'next/link';
import CityWeekend from '@/app/components/CityWeekend';
import { today, weekendWindow } from '@/lib/data';

// "이번 주말 Jeju" — 매일 빌드 때 다시 계산되는 고정 주소.
export function generateMetadata() {
  const { label } = weekendWindow(today());
  return {
    title: `Things to do in Jeju this weekend (${label}): festivals, concerts and shows`,
    description: `What is on in Jeju this weekend, ${label}: festivals, concerts, exhibitions and traditional performances, plus the big festivals elsewhere in Korea. Updated every morning.`,
  };
}

export default function Page() {
  return (
    <CityWeekend
      city="Jeju"
      slug="jeju-this-weekend"
      near={[]}
      nearIntro={<>Jeju is an island, so the day trips are on it. See <Link href="/guides/jeju-3-days/">3 days in Jeju</Link>.</>}
      links={[{"href":"/guides/jeju-3-days/","label":"3 days in Jeju"},{"href":"/regions/jeju/","label":"Everything on Jeju"}]}
    />
  );
}
