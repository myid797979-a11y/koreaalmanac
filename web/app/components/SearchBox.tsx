'use client';

// 헤더 검색 — 인덱스(/search-index.json, ~50KB)는 첫 포커스에만 로드
import { useState } from 'react';

type Row = { t: string; s: string; r: string; d: string | null; e: string | null };

export default function SearchBox() {
  const [q, setQ] = useState('');
  const [rows, setRows] = useState<Row[] | null>(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    if (rows) return;
    try {
      const res = await fetch('/search-index.json');
      setRows(await res.json());
    } catch {
      setRows([]);
    }
  };

  const hits = q.trim().length >= 2 && rows
    ? rows.filter(x => x.t.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 8)
    : [];

  return (
    <div className="searchbox">
      <input
        type="search"
        placeholder="Search events"
        aria-label="Search festivals and concerts"
        value={q}
        onFocus={() => { load(); setOpen(true); }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onChange={e => setQ(e.target.value)}
      />
      {open && hits.length > 0 && (
        <ul className="search-drop">
          {hits.map(h => (
            <li key={h.s}>
              <a href={'/festival/' + h.s + '/'}>
                {h.t} <span className="meta">{h.r}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
