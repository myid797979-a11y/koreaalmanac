import { SITE_URL, SITE_NAME } from '@/lib/site';
import type { Festival } from '@/lib/data';
import type { Concert } from '@/lib/concerts';

// 구조화 데이터(JSON-LD) — 구글 Event 리치결과 대상.
// 새 도메인의 색인 속도를 좌우하는 요소 중 우리가 통제할 수 있는 것:
// "이 페이지가 무엇인지"를 기계가 즉시 알게 하는 것. (온담 교훈: 템플릿 페이지라는
// 인상을 주면 '발견됨-색인 안 됨'에 수백 페이지가 갇힌다)

const iso = (d: string) => d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8);

export function festivalJsonLd(f: Festival): object | null {
  if (!f.start || !(f.place || f.addr)) return null;   // 구글 필수 필드 미달이면 아예 내보내지 않는다
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Festival',
    name: f.title,
    startDate: iso(f.start),
    ...(f.end ? { endDate: iso(f.end) } : {}),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: f.place || f.addr,
      address: f.addr || f.region + ', South Korea',
    },
    ...(f.image ? { image: [f.image] } : {}),
    ...(f.overview ? { description: f.overview.slice(0, 500) } : {}),
    url: SITE_URL + '/festival/' + f.slug + '/',
  };
  if (f.fee && /free|무료/i.test(f.fee)) ld.isAccessibleForFree = true;
  return ld;
}

export function concertJsonLd(c: Concert): object {
  return {
    '@context': 'https://schema.org',
    '@type': c.kind === 'festival' ? 'Festival' : 'MusicEvent',
    name: c.title,
    startDate: iso(c.start),
    endDate: iso(c.end),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: c.venue,
      address: c.city + ', South Korea',
    },
    ...(c.artist !== 'Various artists'
      ? { performer: { '@type': 'MusicGroup', name: c.artist } }
      : {}),
    ...(c.overview ? { description: c.overview.slice(0, 500) } : {}),
    url: SITE_URL + '/concert/' + c.id + '/',
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: SITE_URL + it.path,
    })),
  };
}

export function websiteJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL + '/',
  };
}

/** <script type="application/ld+json"> 안에 넣을 직렬화 — </script> 이탈 방지 */
export function ldStr(obj: object): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}
