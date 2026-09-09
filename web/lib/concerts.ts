import concertsJson from '@/data/concerts.json';
import { today, fmt } from '@/lib/data';

// 수동 큐레이션 데이터 (data/concerts.json) — API가 아니라 사람이 3일 주기로 갱신.
// 갱신이 늦어도 안전하도록: 지난 공연은 자동으로 숨기고, 갱신일을 페이지에 노출한다.
export type Concert = {
  id: string; artist: string; title: string;
  start: string; end: string;
  venue: string; city: string; region: string;
  kind: 'concert' | 'award' | 'festival';
  note: string;
};

type ConcertsFile = { updated: string; note: string; items: Concert[] };

const file = concertsJson as ConcertsFile;

export const CONCERTS_UPDATED = file.updated;

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
