import Link from 'next/link';
import { type CultureEvent, cultureDateRange, isLongRun } from '@/lib/culture';
import Stamp from './Stamp';

// 전통공연·전시 카드. 홈(2곳)과 /events/[culture]/ 에 같은 마크업이 세 번 복사돼
// 있던 것을 하나로 모았다 — 상태 배지를 붙이려면 세 곳을 똑같이 고쳐야 했고,
// 그런 구조라서 애초에 배지가 빠져 있었다.
//
// heading: 목록이 페이지의 본문이면 h2, 섹션 안에 들어가면 h3.
// 홈은 섹션 제목이 이미 h2 라 카드까지 h2 면 구조가 평평해진다.
export default function CultureCard({
  c, t, heading = 'h3',
}: {
  c: CultureEvent; t: string; heading?: 'h2' | 'h3';
}) {
  const H = heading;
  const href = '/culture/' + c.slug + '/';
  return (
    <article className="cult">
      {c.image
        ? (
          <Link href={href} className="cu-ph">
            <img src={c.image} alt={c.title} loading="lazy" />
            <Stamp start={c.start} end={c.end} t={t} />
          </Link>
        )
        : <span className="cu-ph cu-noph" aria-hidden="true" />}
      <div className="cu-body">
        <div className="cu-when">
          {cultureDateRange(c)}
          {isLongRun(c) && <span className="cu-tag">Long run</span>}
          {!c.image && <Stamp start={c.start} end={c.end} t={t} inline />}
        </div>
        <H><Link href={href}>{c.title}</Link></H>
        <p className="cu-place">
          {c.venue ? c.venue + ' · ' : ''}{c.region}{c.district ? ', ' + c.district : ''}
        </p>
      </div>
    </article>
  );
}
