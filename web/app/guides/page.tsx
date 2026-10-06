import Link from 'next/link';
import { placeBySlug } from '@/lib/places';
import { GUIDES, GUIDE_GROUPS, nowGuideHrefs, guideGroup, type Guide } from '@/lib/guides';
import { today } from '@/lib/data';

export const metadata = {
  title: 'Korea Travel Guides — practical, checked, and current',
  description: 'Practical Korea guides: itineraries built around real opening hours and walking distances, seasonal event guides, what to sort before you fly, and how-tos for what trips up foreign visitors.',
};

function GuideCard({ g }: { g: Guide }) {
  const ph = g.photo ? placeBySlug(g.photo) : undefined;
  return (
    <Link href={g.href} className="card g-card">
      <div className="phwrap">
        {ph
          ? <img className="ph" src={ph.image} alt="" loading="lazy" />
          : <div className="noph">{g.tag}</div>}
      </div>
      <div className="body">
        <h3>{g.title}</h3>
        <p className="g-blurb">{g.blurb}</p>
      </div>
    </Link>
  );
}

export default function GuidesHub() {
  // 맨 위 "지금 시즌" — 홈과 같은 목록을 쓴다. 아래 구역에서는 중복으로 보이지 않게 뺀다.
  const nowHrefs = nowGuideHrefs(today());
  const now = nowHrefs.map(h => GUIDES.find(g => g.href === h)).filter(Boolean) as Guide[];
  const rest = GUIDES.filter(g => !nowHrefs.includes(g.href));
  const groups = GUIDE_GROUPS.map(gr => ({ ...gr, list: rest.filter(g => guideGroup(g) === gr.id) }))
    .filter(gr => gr.list.length > 0);

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Guides</div>
      <h1>Guides</h1>
      <p className="sub">
        Written and checked by hand, with sources. Where a fee or a closing day matters, we
        verify it against the operator rather than repeating what other guides say.
      </p>

      {/* 한 페이지 안의 구역 이동. 분류별 URL 은 만들지 않는다 (lib/guides.ts GUIDE_GROUPS 주석) */}
      <nav className="g-jump" aria-label="Guide sections">
        <a href="#now">Right now</a>
        {groups.map(gr => <a key={gr.id} href={'#' + gr.id}>{gr.label} <span>{gr.list.length}</span></a>)}
      </nav>

      <section id="now">
        <h2 className="sect">Right now</h2>
        <div className="grid g-grid">
          {now.map(g => <GuideCard key={g.href} g={g} />)}
        </div>
      </section>

      {groups.map(gr => (
        <section key={gr.id} id={gr.id}>
          <h2 className="sect">{gr.label}</h2>
          <div className="grid g-grid">
            {gr.list.map(g => <GuideCard key={g.href} g={g} />)}
          </div>
        </section>
      ))}

      <h2 className="sect">Planning around your own dates?</h2>
      <p>
        Guides cover what is always there. For what is on during your trip specifically —
        festivals, concerts, exhibitions — use the{' '}
        <Link href="/plan/">Trip Planner</Link>. First trip? Start with{' '}
        <Link href="/korea-basics/">Korea basics</Link>.
      </p>
    </>
  );
}
