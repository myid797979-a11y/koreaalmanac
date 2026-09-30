import { GUIDES, GUIDE_DATES } from '@/lib/guides';
import { SITE_URL, SITE_NAME } from '@/lib/site';

// RSS 피드 — 가이드 목록 (네이버 서치어드바이저·피드 리더용).
// 가이드가 사이트에서 가장 자주 늘어나는 페이지라 새 URL 발견 신호로 쓴다.
// 날짜는 GUIDE_DATES (본문을 고치면 updated 를 올린다).
export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// KST 자정 기준 RFC 822 날짜
const rfc822 = (ymd: string) => new Date(ymd + 'T00:00:00+09:00').toUTCString();

export function GET() {
  const items = GUIDES
    .filter(g => g.href.startsWith('/guides/'))
    .map(g => ({ ...g, date: GUIDE_DATES[g.href]?.updated ?? GUIDE_DATES[g.href]?.published ?? '2026-09-10' }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const latest = items[0]?.date ?? '2026-09-10';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(SITE_NAME)} — Korea travel guides</title>
<link>${SITE_URL}/guides/</link>
<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
<description>Guides to festivals, seasons, day trips and practical travel in Korea, with real dates.</description>
<language>en</language>
<lastBuildDate>${rfc822(latest)}</lastBuildDate>
${items.map(g => `<item>
<title>${esc(g.title)}</title>
<link>${SITE_URL}${g.href}</link>
<guid isPermaLink="true">${SITE_URL}${g.href}</guid>
<description>${esc(g.blurb)}</description>
<category>${g.tag}</category>
<pubDate>${rfc822(g.date)}</pubDate>
</item>`).join('\n')}
</channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
