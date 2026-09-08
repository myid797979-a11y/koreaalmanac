import Link from 'next/link';
import Card from '@/app/components/Card';
import {
  festivals, status, today,
  MONTHS_FULL, MONTH_SLUGS, REGIONS, regionFestivals,
} from '@/lib/data';

export const metadata = {
  title: 'All Festivals in Korea',
  description: 'Browse every festival in Korea with confirmed dates — filter by month or region. From official Korea Tourism Organization data, updated daily.',
};

export default function FestivalsPage() {
  const t = today();
  const ongoing = festivals
    .filter(f => status(f, t) === 'ongoing')
    .sort((a, b) => (a.end ?? '').localeCompare(b.end ?? ''));
  const upcoming = festivals
    .filter(f => status(f, t) === 'upcoming')
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''));

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Festivals</div>
      <h1>All festivals in Korea</h1>
      <p className="sub">
        {ongoing.length} happening now · {upcoming.length} upcoming ·
        {' '}{festivals.length} tracked in total · updated daily
      </p>

      <p className="strip">
        {MONTH_SLUGS.map((slug, i) => (
          <Link key={slug} href={'/festivals/' + slug + '/'}>{MONTHS_FULL[i].slice(0, 3)}</Link>
        ))}
      </p>
      <p className="strip">
        {REGIONS.map(r => {
          const n = regionFestivals(r).filter(f => status(f, t) !== 'ended').length;
          return n > 0
            ? <Link key={r} href={'/festivals/' + r.toLowerCase() + '/'}>{r} ({n})</Link>
            : null;
        })}
      </p>

      <h2 className="sect">Happening now</h2>
      <div className="grid">{ongoing.map(f => <Card key={f.id} f={f} t={t} />)}</div>

      <h2 className="sect">Upcoming</h2>
      <div className="grid">{upcoming.map(f => <Card key={f.id} f={f} t={t} />)}</div>
    </>
  );
}
