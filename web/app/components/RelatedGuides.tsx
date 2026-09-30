import Link from 'next/link';
import { GUIDES, REGION_GUIDES, MONTH_GUIDES, type Guide } from '@/lib/guides';
import { placeBySlug } from '@/lib/places';

/**
 * 가이드 하단 "관련 가이드" — 같은 지역(REGION_GUIDES)·같은 달(MONTH_GUIDES)에 함께 묶인 횟수로
 * 점수를 매기고, 같은 분류(tag)면 가산한다. 가이드가 30편을 넘으면서 서로를 찾아 들어가는
 * 내부 링크가 새 가이드 색인 속도를 좌우한다.
 */
// 지역·달로는 안 묶이는데 독자가 이어서 볼 짝 (양방향)
const PAIRS: [string, string][] = [
  ['/guides/kpop-tickets/', '/guides/kpop-award-shows/'],
  ['/guides/kpop-tickets/', '/guides/incheon-airport-to-seoul/'],
  ['/guides/kpop-award-shows/', '/guides/incheon-airport-to-seoul/'],
  ['/guides/korean-food-guide/', '/guides/seoul-nightlife/'],
  ['/guides/korean-food-guide/', '/guides/korea-on-a-budget/'],
  ['/guides/seoul-shopping/', '/guides/korean-food-guide/'],
  ['/guides/korean-spa-jjimjilbang/', '/guides/korea-in-winter/'],
  ['/guides/templestay-korea/', '/guides/seoul-palaces/'],
  ['/guides/skiing-in-korea/', '/guides/korea-in-winter/'],
];

function related(href: string, n: number): Guide[] {
  const self = GUIDES.find(g => g.href === href);
  const score = new Map<string, number>();
  const bump = (h: string, by: number) => { if (h !== href) score.set(h, (score.get(h) ?? 0) + by); };
  for (const list of Object.values(REGION_GUIDES)) if (list.includes(href)) list.forEach(h => bump(h, 3));
  for (const list of MONTH_GUIDES) if (list.includes(href)) list.forEach(h => bump(h, 1));
  if (self) for (const g of GUIDES) if (g.tag === self.tag) bump(g.href, 1);
  for (const [a, b] of PAIRS) { if (a === href) bump(b, 5); if (b === href) bump(a, 5); }
  return GUIDES
    .filter(g => g.href !== href && g.href.startsWith('/guides/') && score.has(g.href))
    .sort((a, b) => (score.get(b.href)! - score.get(a.href)!) || GUIDES.indexOf(a) - GUIDES.indexOf(b))
    .slice(0, n);
}

export default function RelatedGuides({ href }: { href: string }) {
  const list = related(href, 4);
  if (list.length === 0) return null;
  return (
    <>
      <h2 className="sect">More guides</h2>
      <div className="grid">
        {list.map(g => {
          const p = g.photo ? placeBySlug(g.photo) : undefined;
          return (
            <Link key={g.href} href={g.href} className="card">
              <div className="phwrap">
                {p
                  ? <img className="ph" src={p.image} alt="" loading="lazy" />
                  : <div className="noph">{g.tag}</div>}
              </div>
              <div className="body">
                <div className="when">{g.tag}</div>
                <h3>{g.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
