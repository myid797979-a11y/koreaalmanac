import concertsJson from '@/data/concerts.json';
import { today, fmt } from '@/lib/data';

// 수동 큐레이션 데이터 (data/concerts.json) — API가 아니라 사람이 3일 주기로 갱신.
// 갱신이 늦어도 안전하도록: 지난 공연은 자동으로 숨기고, 갱신일을 페이지에 노출한다.
export type Concert = {
  id: string; artist: string; title: string;
  start: string; end: string;
  venue: string; city: string; region: string;
  kind: 'concert' | 'award' | 'festival';
  note?: string;        // 목록 카드용 짧은 소개
  overview?: string;    // 상세페이지용 상세 소개 (조사·자체작성, 사실 기반)
  showTimes?: string;   // 공연 시간 (발표된 경우)
  ticketInfo?: string;  // 예매처·방법 안내 텍스트
  price?: string;       // 가격대
  tip?: string;         // 외국인 방문 팁
  intl?: boolean;       // 내한공연 — 컴팩트 섹션에 노출
  video?: string;       // 검증된 공식 유튜브 영상 ID만 (저작권자 배포). 없으면 지도만.
  ticket?: string;      // 공식 예매처 URL (있을 때만)
};

/** id 로 단건 조회 (상세페이지 generateStaticParams용) — 지난 공연도 조회 가능 */
export function concertById(id: string): Concert | undefined {
  return (file.items as Concert[]).find(c => c.id === id);
}

/** 상세페이지를 생성할 대상: 진행중/예정만 (지난 공연은 정적 생성 안 함) */
export function concertParams(t = today()): { id: string }[] {
  return file.items.filter(c => c.end >= t).map(c => ({ id: c.id }));
}

type ConcertsFile = { updated: string; note: string; items: Concert[] };

const file = concertsJson as ConcertsFile;

export const CONCERTS_UPDATED = file.updated;
/** 전체 목록 — Trip Planner 처럼 지난 공연까지 포함해야 하는 곳에서 쓴다 */
export const concerts = file.items as Concert[];


/** 오늘 이후(진행 중 포함)의 공연만, 시작일 순 — 지난 공연 자동 만료 */
export function upcomingConcerts(t = today()): Concert[] {
  return file.items
    .filter(c => c.end >= t)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function concertDateRange(c: Concert): string {
  if (c.start === c.end) return fmt(c.start);
  return fmt(c.start) + ' – ' + fmt(c.end);
}

export const KIND_LABEL: Record<Concert['kind'], string> = {
  concert: 'Concert',
  award: 'Awards show',
  festival: 'Festival',
};
