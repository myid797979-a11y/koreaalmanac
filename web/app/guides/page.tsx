import Link from 'next/link';
import { placeBySlug } from '@/lib/places';
import { GUIDES } from '@/lib/guides';

export const metadata = {
  title: 'Korea Travel Guides — practical, checked, and current',
  description: 'Practical Korea guides: itineraries built around real opening hours and walking distances, plus how-tos for what trips up foreign visitors.',
};

const SECTIONS = [
  { tag: 'Seasonal', id: 'seasonal', label: 'Seasons and events' },
  { tag: 'Itinerary', id: 'itineraries', label: 'Itineraries' },
  { tag: 'How-to', id: 'how-to', label: 'How-to' },
] as const;

export default function GuidesHub() {
  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Guides</div>
      <h1>Guides</h1>
      <p className="sub">
        Written and checked by hand, with sources. Where a fee or a closing day matters, we
        verify it against the operator rather than repeating what other guides say — several
        widely copied facts about Seoul&apos;s palaces are years out of date.
      </p>

      <p className="intro">
        First trip? Start with <Link href="/korea-basics/">Korea basics</Link> — entry rules,
        why Google Maps cannot route you here, transport cards and when to go.
      </p>

      {/* 종류별로 한 페이지 안에서 묶는다. 카테고리별 URL 은 가이드가 30편을 넘기 전에는 만들지 않는다
          (얇은 목록 페이지가 크롤 예산만 먹는다 — 2026-09-29 판단). */}
      <p className="strip">
        {SECTIONS.map(s => <a key={s.tag} href={'#' + s.id}>{s.label}</a>)}
      </p>
      {SECTIONS.map(s => {
        const list = GUIDES.filter(g => g.tag === s.tag);
        if (list.length === 0) return null;
        return (
          <section key={s.tag} id={s.id}>
            <h2 className="sect">{s.label}</h2>
            <div className="cult-list">
              {list.map(g => {
                const ph = g.photo ? placeBySlug(g.photo) : undefined;
                return (
                <article key={g.href} className="cult">
                  {ph
                    ? <Link href={g.href} className="cu-ph"><img src={ph.image} alt={g.title} loading="lazy" /></Link>
                    : <span className="cu-ph cu-noph" aria-hidden="true" />}
                  <div className="cu-body">
                    <h3><Link href={g.href}>{g.title}</Link></h3>
                    <p className="cu-place">{g.blurb}</p>
                  </div>
                </article>
                );
              })}
            </div>
          </section>
        );
      })}

      <h2 className="sect">Planning around your own dates?</h2>
      <p>
        Guides cover what is always there. For what is on during your trip specifically —
        festivals, concerts, exhibitions — use the{' '}
        <Link href="/plan/">Trip Planner</Link>.
      </p>
    </>
  );
}
