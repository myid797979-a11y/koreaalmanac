import Link from 'next/link';
import CityWeekend from '@/app/components/CityWeekend';
import { today, weekendWindow } from '@/lib/data';

// "이번 주말 Busan" — 매일 빌드 때 다시 계산되는 고정 주소 ("things to do in Busan this weekend" 검색용).
export function generateMetadata() {
  const { label } = weekendWindow(today());
  return {
    title: `Things to do in Busan this weekend (${label}): festivals, concerts and shows`,
    description: `What is on in Busan this weekend, ${label}: festivals, concerts, exhibitions and traditional performances, plus day trips and the big festivals elsewhere in Korea. Updated every morning.`,
  };
}

export default function Page() {
  return (
    <CityWeekend
      city="Busan"
      slug="busan-this-weekend"
      near={["Gyeongnam","Ulsan"]}
      nearIntro={<>In Gyeongnam and Ulsan, an hour or so from Busan by train or bus: Jinju, Tongyeong, Gimhae and the Ulsan coast. See <Link href="/guides/busan-2-days/">2 days in Busan</Link>.</>}
      links={[{"href":"/guides/busan-2-days/","label":"2 days in Busan"},{"href":"/guides/where-to-stay-in-busan/","label":"Where to stay in Busan"},{"href":"/guides/busan-food-guide/","label":"What to eat in Busan"},{"href":"/guides/busan-fireworks-2026/","label":"Busan Fireworks 2026"}]}
    />
  );
}
