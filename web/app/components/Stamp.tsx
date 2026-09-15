import { today, daysUntil } from '@/lib/data';

// 행사 상태 배지 — 축제·공연·전통공연·전시가 모두 같은 문법으로 말하게 한다.
//
// 예전에는 축제 카드에만 `Now` / `D-4` / `Ended` 가 붙었다. 홈에서 축제 옆에 나란히
// 놓인 공연·전시에는 아무 표시가 없어서, 같은 "날짜 있는 행사"인데 무엇이 임박했는지
// 비교가 안 됐다. 타입마다 다른 컴포넌트를 쓰던 것을 시작·종료일 문자열 하나로 통일한다.
//
// 상설·장기 프로그램(1년짜리 상설 전시 등)에 D-day 를 붙이면 의미가 없으므로,
// 이미 시작했으면 Now 로 표시한다.

export type EventStatus = 'ongoing' | 'upcoming' | 'ended';

/** CSS 클래스명은 기존 축제 배지를 그대로 쓴다 (.stamp.now / .soon / .ended) */
const CLS: Record<EventStatus, string> = {
  ongoing: 'now', upcoming: 'soon', ended: 'ended',
};

export function eventStatus(start: string | null, end: string | null, t = today()): EventStatus {
  const e = end ?? start;
  if (e && e < t) return 'ended';
  if (start && start > t) return 'upcoming';
  return 'ongoing';
}

/**
 * @param inline 사진 위에 겹치지 않고 제목 옆에 붙일 때 (사진 없는 목록용)
 */
export default function Stamp({
  start, end, t = today(), inline = false,
}: {
  start: string | null; end: string | null; t?: string; inline?: boolean;
}) {
  const st = eventStatus(start, end, t);
  const label =
    st === 'ongoing' ? 'Now'
      : st === 'upcoming' ? 'D-' + daysUntil(start!, t)
        : 'Ended';
  return <span className={'stamp ' + CLS[st] + (inline ? ' inline' : '')}>{label}</span>;
}
