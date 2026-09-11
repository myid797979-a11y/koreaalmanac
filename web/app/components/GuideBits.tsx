import Link from 'next/link';
import { placeBySlug, displayTitle } from '@/lib/places';

/** 가이드 상단 히어로 — 대표 장소 사진 3장을 가로로 */
export function GuideHero({ slugs }: { slugs: string[] }) {
  const items = slugs.map(placeBySlug).filter(Boolean);
  if (items.length === 0) return null;
  return (
    <div className="g-hero">
      {items.map(p => (
        <figure key={p!.id}>
          <img src={p!.image} alt={displayTitle(p!.title)} loading="lazy" />
          <figcaption>{displayTitle(p!.title)}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * 타임라인 한 칸 — 사진이 왼쪽, 내용이 오른쪽.
 * time 은 시각, walk 은 직전 지점에서의 거리(선택).
 */
export function Stop({
  slug, time, title, walk, children,
}: {
  slug?: string; time: string; title: string; walk?: string; children: React.ReactNode;
}) {
  const p = slug ? placeBySlug(slug) : undefined;
  const href = p ? '/place/' + p.slug + '/' : undefined;
  return (
    <li className="g-stop">
      {p && (
        <Link href={href!} className="g-stop-ph">
          <img src={p.image} alt={displayTitle(p.title)} loading="lazy" />
        </Link>
      )}
      <div className="g-stop-body">
        <div className="g-stop-time">
          {time}
          {walk && <span className="g-walk">{walk}</span>}
        </div>
        <h3>{href ? <Link href={href}>{title}</Link> : title}</h3>
        <div className="g-stop-text">{children}</div>
      </div>
    </li>
  );
}

/** 하루를 여는 요약 배너 */
export function DayHead({
  day, title, sub, avoid,
}: { day: string; title: string; sub: string; avoid?: string }) {
  return (
    <div className="g-day">
      <span className="g-day-n">{day}</span>
      <div>
        <h2>{title}</h2>
        <p>{sub}</p>
        {avoid && <p className="g-avoid">Avoid: {avoid}</p>}
      </div>
    </div>
  );
}

/** 본문 중간에 넣는 장소 카드 묶음 */
export function PlaceRow({ slugs }: { slugs: string[] }) {
  const items = slugs.map(placeBySlug).filter(Boolean);
  if (items.length === 0) return null;
  return (
    <div className="grid">
      {items.map(p => (
        <Link key={p!.id} href={'/place/' + p!.slug + '/'} className="card">
          <div className="phwrap">
            <img className="ph" src={p!.image} alt={p!.title} loading="lazy" />
          </div>
          <div className="body">
            <h3>{displayTitle(p!.title)}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
