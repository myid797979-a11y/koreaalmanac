import Link from 'next/link';
import { regionFestivals, status, today, fmt } from '@/lib/data';
import { placesByRegion } from '@/lib/places';
import { rankPlaces } from '@/lib/place-rank';
import { rankShortFirst } from '@/lib/festival-rank';

/**
 * 지역 카드 — /regions/{지역}/ 으로 보낸다.
 * 예전엔 축제 허브로 보내고 축제만 셌는데, 그러면 서울을 눌러도 관광지 386곳을 못 본다.
 * 축제가 하나도 없는 지역이 목록에서 통째로 사라지던 것도 같은 이유로 고쳤다.
 */
export default function RegionCard({ region, t = today() }: { region: string; t?: string }) {
  // 카드에는 두세 건만 들어간다 — 연중 상설이 아니라 곧 열리는 것을 보여줘야 한다
  const live = rankShortFirst(regionFestivals(region).filter(f => status(f, t) !== 'ended'));
  const spots = placesByRegion(region);
  const next = live.find(f => status(f, t) === 'upcoming') ?? live[0];

  // 사진은 대표 명소를 먼저 쓴다 — 축제 사진보다 오래 가고 그 지역을 더 잘 보여준다
  const img = rankPlaces(spots, region)[0]?.image ?? live.find(f => f.image)?.image;

  return (
    <Link href={'/regions/' + region.toLowerCase() + '/'} className="card rcard">
      {img ? <img className="ph" src={img} alt={region + ', Korea'} loading="lazy" /> : <div className="noph">{region}</div>}
      <div className="body">
        <h3>{region}</h3>
        <div className="meta">
          {spots.length > 0 && `${spots.length} places`}
          {spots.length > 0 && live.length > 0 && ' · '}
          {live.length > 0 && `${live.length} ${live.length === 1 ? 'event' : 'events'} on now or coming up`}
        </div>
        {/* 2026-11-13 청약각 회의 지적: 예정 행사가 없으면 진행 중인 행사를 "Next … Apr 30, 2026" 으로
            지난 시작일과 함께 보여 줬다. 진행 중이면 "On now … until 끝나는 날" 로 쓴다. */}
        {next && (
          <div className="meta">
            {status(next, t) === 'upcoming' ? 'Next: ' : 'On now: '}
            {next.title.slice(0, 34)}{next.title.length > 34 ? '…' : ''} ·{' '}
            {status(next, t) === 'upcoming' ? fmt(next.start) : 'until ' + fmt(next.end ?? next.start)}
          </div>
        )}
      </div>
    </Link>
  );
}
