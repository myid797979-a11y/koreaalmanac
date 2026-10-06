import { GUIDES, GUIDE_GROUPS, guideGroup } from '@/lib/guides';
import { MONTHS_FULL, MONTH_SLUGS, REGIONS, REGION_MONTH_MIN, regionMonthList, targetYear, today } from '@/lib/data';
import { SITE_URL, SITE_NAME } from '@/lib/site';

// llms.txt (llmstxt.org) — AI 어시스턴트가 사이트 구조를 한 번에 읽도록 하는 안내문.
// 왜: ChatGPT 유입(9/8~10/5 225세션)의 28%가 지역×월 허브로 들어온다. 어떤 페이지가
// 어떤 질문에 답하는지 목록으로 주면 인용 대상이 허브·가이드로 모인다.
// 가이드·허브 목록에서 생성하므로 가이드를 추가하면 자동으로 따라온다.
export const dynamic = 'force-static';

export function GET() {
  const t = today();
  const m0 = Number(t.slice(4, 6)) - 1;
  const months = [0, 1, 2].map(k => (m0 + k) % 12);

  const hubLines: string[] = [];
  for (const i of months) {
    const y = targetYear(i, t);
    hubLines.push(`- [Festivals in Korea, ${MONTHS_FULL[i]} ${y}](${SITE_URL}/events/festivals/${MONTH_SLUGS[i]}/): every festival with dates, grouped by week`);
    const regions = REGIONS.filter(r => regionMonthList(r, i).length >= REGION_MONTH_MIN);
    hubLines.push(`  - By region: ${regions.map(r => `[${r}](${SITE_URL}/events/festivals/${r.toLowerCase()}/${MONTH_SLUGS[i]}/)`).join(', ')}`);
  }

  const guideSections = GUIDE_GROUPS.map(gr => {
    const items = GUIDES.filter(g => guideGroup(g) === gr.id);
    if (!items.length) return '';
    return `## ${gr.label}\n\n` + items.map(g => `- [${g.title}](${SITE_URL}${g.href}): ${g.blurb}`).join('\n');
  }).filter(Boolean).join('\n\n');

  const body = `# ${SITE_NAME}

> English guide to what is on in South Korea: festivals, concerts, exhibitions and traditional performances with real dates, plus practical travel guides. Event data comes from the Korea Tourism Organization and KOPIS (Korea's performing arts box office network) and is refreshed daily.

Dates on event pages are the official dates for the current edition. When a festival has not announced this year's dates, pages say so and show last year's dates for reference.

## What's on, by month

${hubLines.join('\n')}

## Other indexes

- [Concerts in Korea](${SITE_URL}/events/concerts/): upcoming K-pop and international concerts with venues and ticket notes
- [Concert venues](${SITE_URL}/venues/): arenas and halls, how to get there, where to stay nearby
- [Calendar](${SITE_URL}/calendar/): all events by date
- [Seoul this weekend](${SITE_URL}/seoul-this-weekend/), [Busan this weekend](${SITE_URL}/busan-this-weekend/), [Jeju this weekend](${SITE_URL}/jeju-this-weekend/), [Gyeongju this weekend](${SITE_URL}/gyeongju-this-weekend/)
- [Regions](${SITE_URL}/regions/seoul/): festivals and places by province
- [Korea basics](${SITE_URL}/korea-basics/): money, transport, entry, phones

${guideSections}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
