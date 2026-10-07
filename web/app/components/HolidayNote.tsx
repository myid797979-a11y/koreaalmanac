import Link from 'next/link';
import { weekendHoliday } from '@/lib/holidays';
import { dateRange } from '@/lib/data';

/** 이번 주말(금~일, 월요일 포함)에 공휴일이 끼면 한 단락으로 알린다. 없으면 아무것도 그리지 않는다 */
export default function HolidayNote({ from, to }: { from: string; to: string }) {
  const h = weekendHoliday(from, to);
  if (!h) return null;
  return (
    <aside className="holiday-note" aria-label="Public holiday">
      <p>
        <b>{h.day} is {h.name}, a public holiday{h.long ? ', so this is a three-day weekend' : ''}.</b>{' '}
        {h.note}
      </p>
      {h.related.length > 0 && (
        <p className="meta">
          On for {h.name}:{' '}
          {h.related.slice(0, 5).map((f, i) => (
            <span key={f.id}>
              {i > 0 && ', '}
              <Link href={'/festival/' + f.slug + '/'}>{f.title}</Link> ({f.region}, {dateRange(f)})
            </span>
          ))}
          .
        </p>
      )}
    </aside>
  );
}
