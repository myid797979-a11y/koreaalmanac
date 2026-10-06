import Link from 'next/link';
import CityWeekend from '@/app/components/CityWeekend';
import { today, weekendWindow } from '@/lib/data';

// "이번 주말 Gyeongju" — 매일 빌드 때 다시 계산되는 고정 주소.
export function generateMetadata() {
  const { label } = weekendWindow(today());
  return {
    title: `Things to do in Gyeongju this weekend (${label}): festivals, concerts and shows`,
    description: `What is on in Gyeongju this weekend, ${label}: festivals, concerts, exhibitions and traditional performances, plus the big festivals elsewhere in Korea. Updated every morning.`,
  };
}

export default function Page() {
  return (
    <CityWeekend
      city="Gyeongbuk"
      name="Gyeongju and Gyeongbuk"
      slug="gyeongju-this-weekend"
      near={["Daegu","Ulsan"]}
      nearIntro={<>In Daegu and Ulsan, both under an hour from Gyeongju. See <Link href="/guides/gyeongju-2-days/">2 days in Gyeongju</Link> and <Link href="/guides/andong-hahoe-village/">Andong</Link>.</>}
      links={[{"href":"/guides/gyeongju-2-days/","label":"2 days in Gyeongju"},{"href":"/guides/andong-hahoe-village/","label":"Andong and Hahoe"},{"href":"/regions/gyeongbuk/","label":"Everything in Gyeongbuk"}]}
    />
  );
}
