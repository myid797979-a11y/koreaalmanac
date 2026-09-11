import Link from 'next/link';
import { placeBySlug } from '@/lib/places';

export const metadata = {
  title: 'Korea Travel Guides — practical, checked, and current',
  description: 'Practical Korea guides: itineraries built around real opening hours and walking distances, plus how-tos for what trips up foreign visitors.',
};

const GUIDES = [
  {
    href: '/guides/seoul-3-days/',
    title: '3 days in Seoul',
    blurb: 'A first-timer route built around the palace closing days and Bukchon’s 5pm curfew — the two things that break most published itineraries.',
    tag: 'Itinerary',
    photo: 'gyeongbokgung-palace-264337',
  },
  {
    href: '/guides/jeju-3-days/',
    title: '3 days in Jeju',
    blurb: 'What to sort before you fly: the driving-licence rule that catches foreigners at the rental desk, Hallasan summit permits, and Manjanggul’s 2026 reopening that most guides missed.',
    tag: 'Itinerary',
    photo: 'hallasan-mountain-264172',
  },
  {
    href: '/guides/busan-2-days/',
    title: '2 days in Busan',
    blurb: 'Split the way the city is — old town west, beaches east. With the Taejongdae train suspension, Jagalchi’s Tuesday closures, and why the Sky Capsule price is per capsule, not per person.',
    tag: 'Itinerary',
    photo: 'busan-gamcheon-culture-village-1998211',
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

      <p className="intro">
        First trip? Start with <Link href="/korea-basics/">Korea basics</Link> — entry rules,
        why Google Maps cannot route you here, transport cards and when to go.
      </p>

      <div className="cult-list">
        {GUIDES.map(g => {
          const ph = 'photo' in g && g.photo ? placeBySlug(g.photo as string) : undefined;
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
