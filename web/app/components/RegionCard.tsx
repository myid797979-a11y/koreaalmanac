import Link from 'next/link';
import { regionFestivals, status, today, fmt } from '@/lib/data';

export default function RegionCard({ region, t = today() }: { region: string; t?: string }) {
  const live = regionFestivals(region)
    .filter(f => status(f, t) !== 'ended')
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''));
  if (live.length === 0) return null;
  const next = live.find(f => status(f, t) === 'upcoming') ?? live[0];
  const img = live.find(f => f.image)?.image;
  return (
    <Link href={'/festivals/' + region.toLowerCase() + '/'} className="card rcard">
      {img ? <img className="ph" src={img} alt={region} loading="lazy" /> : <div className="noph">{region}</div>}
      <div className="body">
        <h3>{region}</h3>
        <div className="meta">{live.length} happening or upcoming</div>
        <div className="meta">Next: {next.title.slice(0, 34)}{next.title.length > 34 ? '…' : ''} · {fmt(next.start)}</div>
      </div>
    </Link>
  );
}
