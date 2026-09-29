import type { MetadataRoute } from 'next';
import {
  festivals, MONTH_SLUGS, REGIONS, REGION_MONTH_MIN, regionMonthList, CATEGORIES,
} from '@/lib/data';
import { concertParams } from '@/lib/concerts';
import { venueParams } from '@/lib/venues';
import { liveCulture } from '@/lib/culture';
import { PLACE_CATS, places } from '@/lib/places';
import { SITE_URL } from '@/lib/site';
import { today } from '@/lib/data';

export const dynamic = 'force-static';

// 사이트맵은 "크롤 우선순위 목록" 이다 (2026-09-29).
// GSC 에서 2,350페이지가 "발견됨 – 크롤 안 됨" — 새 도메인이라 Google 이 하루 150쪽쯤만 가져간다. 그 예산이
// 2025년 축제 회차나 시간·요금 없는 장소에 쓰이지 않게, 사이트맵에는 지금 가치 있는 것만 넣는다.
// 빠진 페이지도 사이트에 그대로 있고 내부 링크로 발견된다. 축제는 다시 열리면(같은 id) 자동으로 돌아온다.
//   - 축제: 종료 60일 이내 또는 예정   - 문화: 진행 중/예정만   - 장소: 시간·휴무·요금 중 하나라도 있는 것
function ymdMinus(days: number): string {
  const d = new Date(Date.now() + 9 * 3600 * 1000); d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const t = today();
  const festCutoff = ymdMinus(60);
  const urls: MetadataRoute.Sitemap = [
    { url: SITE_URL + '/', priority: 1.0 },
    { url: SITE_URL + '/plan/', priority: 0.9 },
    { url: SITE_URL + '/events/', priority: 0.95 },
    { url: SITE_URL + '/events/festivals/', priority: 0.9 },
    { url: SITE_URL + '/events/concerts/', priority: 0.9 },
    { url: SITE_URL + '/korea-basics/', priority: 0.9 },
    { url: SITE_URL + '/search/', priority: 0.5 },
    { url: SITE_URL + '/guides/', priority: 0.9 },
    { url: SITE_URL + '/guides/korea-in-winter/', priority: 0.9 },
    { url: SITE_URL + '/guides/christmas-new-year-seoul/', priority: 0.9 },
    { url: SITE_URL + '/guides/seollal-2027/', priority: 0.9 },
    { url: SITE_URL + '/guides/cherry-blossom-2027/', priority: 0.9 },
    { url: SITE_URL + '/guides/halloween-seoul-2026/', priority: 0.9 },
    { url: SITE_URL + '/guides/baseball-in-korea/', priority: 0.9 },
    { url: SITE_URL + '/guides/seoul-nightlife/', priority: 0.9 },
    { url: SITE_URL + '/guides/busan-fireworks-2026/', priority: 0.9 },
    { url: SITE_URL + '/guides/jinju-lantern-festival-2026/', priority: 0.9 },
    { url: SITE_URL + '/guides/incheon-airport-to-seoul/', priority: 0.9 },
    { url: SITE_URL + '/guides/dmz-tour-from-seoul/', priority: 0.9 },
    { url: SITE_URL + '/guides/nami-island-day-trip/', priority: 0.9 },
    { url: SITE_URL + '/guides/day-trips-from-seoul/', priority: 0.9 },
    { url: SITE_URL + '/guides/suwon-day-trip/', priority: 0.9 },
    { url: SITE_URL + '/guides/everland-vs-lotte-world/', priority: 0.9 },
    { url: SITE_URL + '/guides/korea-on-a-budget/', priority: 0.9 },
    { url: SITE_URL + '/guides/autumn-foliage/', priority: 0.9 },
    { url: SITE_URL + '/guides/gyeongju-2-days/', priority: 0.9 },
    { url: SITE_URL + '/guides/seoul-3-days/', priority: 0.9 },
    { url: SITE_URL + '/guides/jeju-3-days/', priority: 0.9 },
    { url: SITE_URL + '/guides/busan-2-days/', priority: 0.9 },
    { url: SITE_URL + '/guides/kpop-tickets/', priority: 0.8 },
    ...concertParams().map(c => ({ url: SITE_URL + '/concert/' + c.id + '/', priority: 0.7 })),
    { url: SITE_URL + '/venues/', priority: 0.85 },
    ...venueParams().map(v => ({ url: SITE_URL + '/venue/' + v.slug + '/', priority: 0.85 })),
    ...(liveCulture('traditional').length ? [{ url: SITE_URL + '/events/traditional/', priority: 0.9 }] : []),
    ...(liveCulture('exhibition').length ? [{ url: SITE_URL + '/events/exhibitions/', priority: 0.9 }] : []),
    ...liveCulture(undefined, t).map(c => ({ url: SITE_URL + '/culture/' + c.slug + '/', priority: 0.7 })),
    ...(places.length ? [{ url: SITE_URL + '/places/', priority: 0.95 }] : []),
    ...PLACE_CATS.map(c => ({ url: SITE_URL + '/places/' + c.slug + '/', priority: 0.85 })),
    ...REGIONS.map(r => ({ url: SITE_URL + '/regions/' + r.toLowerCase() + '/', priority: 0.9 })),
    ...places.filter(p => p.hours || p.closed || p.fee).map(p => ({ url: SITE_URL + '/place/' + p.slug + '/', priority: 0.7 })),
    { url: SITE_URL + '/calendar/', priority: 0.9 },
    { url: SITE_URL + '/regions/', priority: 0.8 },
    { url: SITE_URL + '/about/', priority: 0.3 },
  ];

  for (const m of MONTH_SLUGS)
    urls.push({ url: SITE_URL + '/events/festivals/' + m + '/', priority: 0.9 });

  for (const c of CATEGORIES)
    urls.push({ url: SITE_URL + '/events/festivals/' + c.slug + '/', priority: 0.8 });

  for (const r of REGIONS) {
    urls.push({ url: SITE_URL + '/events/festivals/' + r.toLowerCase() + '/', priority: 0.8 });
    for (let i = 0; i < 12; i++)
      if (regionMonthList(r, i).length >= REGION_MONTH_MIN)
        urls.push({ url: SITE_URL + '/events/festivals/' + r.toLowerCase() + '/' + MONTH_SLUGS[i] + '/', priority: 0.7 });
  }

  for (const f of festivals)
    if ((f.end ?? f.start ?? '') >= festCutoff)
      urls.push({ url: SITE_URL + '/festival/' + f.slug + '/', priority: 0.6 });

  return urls;
}
