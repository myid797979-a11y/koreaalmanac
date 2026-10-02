import Link from 'next/link';
import { placeBySlug, displayTitle } from '@/lib/places';
import { bySlug as festivalBySlug, status, dateRange } from '@/lib/data';

/** 가이드 상단 히어로 — 대표 장소 사진 3장을 가로로 */
export function GuideHero({ slugs }: { slugs: string[] }) {
  const items = slugs.map(placeBySlug).filter(Boolean);
  if (items.length === 0) return null;
  return (
    <div className="g-hero">
      {/* 첫 장은 화면 맨 위의 가장 큰 그림(LCP)이다 — 지연 로드하면 늘 늦게 받는다 (2026-10-02 Lighthouse) */}
      {items.map((p, i) => (
        <figure key={p!.id}>
          <img
            src={p!.image}
            alt={displayTitle(p!.title)}
            {...(i === 0 ? { fetchPriority: 'high' as const, loading: 'eager' as const } : { loading: 'lazy' as const })}
          />
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

/**
 * 축제 사진은 계절이 맞는 유일한 소스다 — 장소 사진은 KTO가 한 장만 주고
 * 대개 여름에 찍혀 있어서, 겨울·봄 가이드에서는 축제 쪽을 써야 그림이 맞는다.
 */
function festivalWhen(f: NonNullable<ReturnType<typeof festivalBySlug>>) {
  // 지난 회차 데이터가 남아 있는 축제(KTO가 10~11월에야 갱신)는 작년 날짜를 보여주면 안 된다
  return status(f) === 'ended' ? 'Annual — next dates to be confirmed' : dateRange(f);
}

/** 가이드 상단 히어로 — 축제 사진 버전 */
export function FestivalHero({ slugs }: { slugs: string[] }) {
  const items = slugs.map(festivalBySlug).filter(Boolean);
  if (items.length === 0) return null;
  return (
    <div className="g-hero">
      {items.map(f => (
        <figure key={f!.id}>
          <img src={f!.image ?? ''} alt={f!.title} loading="lazy" />
          <figcaption>{f!.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/** 본문 중간 축제 카드 묶음 — 날짜가 확정된 것만 날짜를 보여준다 */
export function FestivalRow({ slugs }: { slugs: string[] }) {
  const items = slugs.map(festivalBySlug).filter(Boolean);
  if (items.length === 0) return null;
  return (
    <div className="grid">
      {items.map(f => (
        <Link key={f!.id} href={'/festival/' + f!.slug + '/'} className="card">
          <div className="phwrap">
            {f!.image
              ? <img className="ph" src={f!.image} alt={f!.title} loading="lazy" />
              : <div className="noph">{f!.region}</div>}
          </div>
          <div className="body">
            <div className="when">{festivalWhen(f!)}</div>
            <h3>{f!.title}</h3>
            <div className="meta">{f!.region}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
