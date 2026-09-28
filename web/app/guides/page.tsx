import Link from 'next/link';
import { placeBySlug } from '@/lib/places';
import { GUIDES } from '@/lib/guides';

export const metadata = {
  title: 'Korea Travel Guides — practical, checked, and current',
  description: 'Practical Korea guides: itineraries built around real opening hours and walking distances, plus how-tos for what trips up foreign visitors.',
};

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

      <div className="cult-list">
        {GUIDES.map(g => {
          const ph = g.photo ? placeBySlug(g.photo) : undefined;
          return (
          <article key={g.href} className="cult">
            {ph
              ? <Link href={g.href} className="cu-ph"><img src={ph.image} alt={g.title} loading="lazy" /></Link>
              : <span className="cu-ph cu-noph" aria-hidden="true" />}
            <div className="cu-body">
              <div className="cu-when">{g.tag}</div>
              <h2><Link href={g.href}>{g.title}</Link></h2>
              <p className="cu-place">{g.blurb}</p>
            </div>
          </article>
          );
        })}
      </div>

      <h2 className="sect">Planning around your own dates?</h2>
      <p>
        Guides cover what is always there. For what is on during your trip specifically —
        festivals, concerts, exhibitions — use the{' '}
        <Link href="/plan/">Trip Planner</Link>.
      </p>
    </>
  );
}
