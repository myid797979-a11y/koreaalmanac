import Link from 'next/link';

export const metadata = {
  title: 'Korea Travel Guides — practical, checked, and current',
  description: 'Practical guides for visiting Korea: itineraries built around real opening hours and walking distances, and how-tos for the things that trip up foreign visitors.',
};

const GUIDES = [
  {
    href: '/guides/seoul-3-days/',
    title: '3 days in Seoul',
    blurb: 'A first-timer route built around the palace closing days and Bukchon’s 5pm curfew — the two things that break most published itineraries.',
    tag: 'Itinerary',
  },
  {
    href: '/guides/kpop-tickets/',
    title: 'How to buy K-pop concert tickets as a foreigner',
    blurb: 'Which platforms actually sell to overseas buyers, how the presale queue works, and why resold tickets get voided at the door.',
    tag: 'How-to',
  },
];

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

      <div className="cult-list">
        {GUIDES.map(g => (
          <article key={g.href} className="cult">
            <span className="cu-ph cu-noph" aria-hidden="true" />
            <div className="cu-body">
              <div className="cu-when">{g.tag}</div>
              <h2><Link href={g.href}>{g.title}</Link></h2>
              <p className="cu-place">{g.blurb}</p>
            </div>
          </article>
        ))}
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
