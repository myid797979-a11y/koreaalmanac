import Link from 'next/link';
import CityWeekend from '@/app/components/CityWeekend';
import { today, weekendWindow } from '@/lib/data';

// "이번 주말 Seoul" — 매일 빌드 때 다시 계산되는 고정 주소 ("things to do in Seoul this weekend" 검색용).
export function generateMetadata() {
  const { label } = weekendWindow(today());
  return {
    title: `Things to do in Seoul this weekend (${label}): festivals, concerts and shows`,
    description: `What is on in Seoul this weekend, ${label}: festivals, concerts, exhibitions and traditional performances, plus day trips and the big festivals elsewhere in Korea. Updated every morning.`,
  };
}

export default function Page() {
  return (
    <CityWeekend
      city="Seoul"
      slug="seoul-this-weekend"
      near={["Gyeonggi","Incheon"]}
      nearIntro={<>In Gyeonggi and Incheon, most of them on the subway or within an hour. See <Link href="/guides/day-trips-from-seoul/">day trips from Seoul</Link>.</>}
      links={[{"href":"/guides/seoul-3-days/","label":"3 days in Seoul"},{"href":"/guides/rainy-day-seoul/","label":"Rainy day in Seoul"},{"href":"/guides/where-to-stay-in-seoul/","label":"Where to stay in Seoul"}]}
    />
  );
}
