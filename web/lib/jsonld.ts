import { SITE_URL, SITE_NAME } from '@/lib/site';
import type { Festival } from '@/lib/data';
import type { Concert } from '@/lib/concerts';

// 구조화 데이터(JSON-LD) — 구글 Event 리치결과 대상.
// 새 도메인의 색인 속도를 좌우하는 요소 중 우리가 통제할 수 있는 것:
// "이 페이지가 무엇인지"를 기계가 즉시 알게 하는 것. (온담 교훈: 템플릿 페이지라는
// 인상을 주면 '발견됨-색인 안 됨'에 수백 페이지가 갇힌다)

const iso = (d: string) => d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8);

/**
 * 입장료를 Offer 로. Search Console 이 권장 항목으로 offers 누락을 알려준다.
 *
 * ⚠ 값을 지어내지 않는다. 원문이 "Free"·"무료" 계열이면 0원으로 쓰고,
 *   "30,000 won" 처럼 금액이 하나만 분명하면 그 값을 쓴다.
 *   "Varies by program" 처럼 단정할 수 없는 표기는 offers 를 아예 넣지 않는다 —
 *   구조화 데이터는 화면에 보이는 사실과 어긋나면 안 된다(구글·Bing 공통 지침).
 */
function offersOf(fee: string | null, url: string, start: string): object | null {
  if (!fee) return null;
  const base = {
    '@type': 'Offer',
    priceCurrency: 'KRW',
    availability: 'https://schema.org/InStock',
    url,
    validFrom: iso(start),
  };
  // 입장이 무료인 표기 — 일부 프로그램이 유료여도 입장료 자체는 0원이다
  if (/^free\b|free entry|free admission|^무료/i.test(fee.trim())) {
    return { ...base, price: '0' };
  }
  // 금액이 딱 하나일 때만 신뢰한다.
  // "won" 이 한 번만 나오는지로는 부족했다 — "R 30,000 · S 20,000 won" 은 won 이
  // 하나지만 금액은 둘이고, 그중 하나만 집으면 화면과 어긋난다.
  // "From 49,500 won" 같은 하한 표기도 단일 가격으로 단정할 수 없으므로 뺀다.
  if (/\bfrom\b|\bstarts?\b|~/i.test(fee)) return null;
  const amounts = fee.match(/[0-9][0-9,]{2,}/g);
  if (amounts && amounts.length === 1) {
    const n = amounts[0].replace(/[^0-9]/g, '');
    if (n) return { ...base, price: n };
  }
  return null;
}

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
    ...(f.sponsor ? { organizer: { '@type': 'Organization', name: f.sponsor } } : {}),
  };
  if (f.fee && /free|무료/i.test(f.fee)) ld.isAccessibleForFree = true;
  const offers = offersOf(f.fee, SITE_URL + '/festival/' + f.slug + '/', f.start);
  if (offers) ld.offers = offers;
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
    // 공연은 예매처가 값을 쥐고 있다 — 가격은 단정하지 않고 예매 링크만 준다
    ...(c.ticket
      ? { offers: { '@type': 'Offer', url: c.ticket, availability: 'https://schema.org/InStock', validFrom: iso(c.start) } }
      : {}),
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
