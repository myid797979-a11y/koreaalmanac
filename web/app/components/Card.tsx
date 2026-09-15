import Link from 'next/link';
import { type Festival, dateRange, today } from '@/lib/data';
import Stamp from './Stamp';

// 배지는 app/components/Stamp.tsx 로 옮겼다 — 축제·공연·전시가 같은 문법을 쓰도록.

export default function Card({ f, t = today() }: { f: Festival; t?: string }) {
  return (
    <Link href={'/festival/' + f.slug + '/'} className="card">
      <div className="phwrap">
        {f.image
          ? <img className="ph" src={f.image} alt={f.title} loading="lazy" />
          : <div className="noph">{f.region}</div>}
        <Stamp start={f.start} end={f.end} t={t} />
      </div>
      <div className="body">
        <div className="when">{dateRange(f)}</div>
        <h3>{f.title}</h3>
        <div className="meta">{f.region}</div>
      </div>
    </Link>
  );
}
