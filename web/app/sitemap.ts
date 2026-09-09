import type { MetadataRoute } from 'next';
import {
  festivals, MONTH_SLUGS, REGIONS, REGION_MONTH_MIN, regionMonthList, CATEGORIES,
} from '@/lib/data';
import { concertParams } from '@/lib/concerts';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: SITE_URL + '/', priority: 1.0 },
    { url: SITE_URL + '/plan/', priority: 0.9 },
    { url: SITE_URL + '/events/', priority: 0.95 },
    { url: SITE_URL + '/events/festivals/', priority: 0.9 },
    { url: SITE_URL + '/events/concerts/', priority: 0.9 },
    { url: SITE_URL + '/guides/kpop-tickets/', priority: 0.8 },
    ...concertParams().map(c => ({ url: SITE_URL + '/concert/' + c.id + '/', priority: 0.7 })),
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
    urls.push({ url: SITE_URL + '/festival/' + f.slug + '/', priority: 0.6 });

  return urls;
}
