import Link from 'next/link';
import { type Festival, status, dateRange, daysUntil, today } from '@/lib/data';

export function Stamp({ f, t = today(), inline = false }: { f: Festival; t?: string; inline?: boolean }) {
  const st = status(f, t);
  const cls = 'stamp ' + (st === 'ongoing' ? 'now' : st === 'upcoming' ? 'soon' : 'ended') + (inline ? ' inline' : '');
  const label = st === 'ongoing' ? 'Now' : st === 'upcoming' ? 'D-' + daysUntil(f.start!, t) : 'Ended';
  return <span className={cls}>{label}</span>;
}

export default function Card({ f, t = today() }: { f: Festival; t?: string }) {
  return (
    <Link href={'/festival/' + f.slug + '/'} className="card">
      <div className="phwrap">
        {f.image
          ? <img className="ph" src={f.image} alt={f.title} loading="lazy" />
          : <div className="noph">{f.region}</div>}
        <Stamp f={f} t={t} />
      </div>
      <div className="body">
        <div className="when">{dateRange(f)}</div>
        <h3>{f.title}</h3>
        <div className="meta">{f.region}</div>
      </div>
    </Link>
  );
}
