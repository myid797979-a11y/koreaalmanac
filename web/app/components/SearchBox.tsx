'use client';

// 헤더 검색 — 인덱스(/search-index.json)는 첫 포커스에만 로드.
// 드롭다운은 맛보기고, 전체는 /search/ 로 보낸다 (축제만 찾던 것을 관광지·문화까지 넓혔다).
import { useState } from 'react';

type Row = {
  k: 'place' | 'festival' | 'performance' | 'exhibition';
  t: string; u: string; r: string; d: string | null; e: string | null;
};

const KIND: Record<Row['k'], string> = {
  place: 'Place', festival: 'Festival', performance: 'Performance', exhibition: 'Exhibition',
};

/** 표시용 이름 — 뒤에 붙은 (한글 원제) 를 뗀다 */
function display(title: string): string {
  const s = title.trimEnd();
  if (!s.endsWith(')')) return s;
  let depth = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ')') depth++;
    else if (s[i] === '(') {
      depth--;
      if (depth > 0) continue;
      const inner = s.slice(i + 1, s.length - 1);
      return /[가-힣]/.test(inner) ? display(s.slice(0, i)) : s;
    }
  }
  return s;
}

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

  const term = q.trim().toLowerCase();
  const all = term.length >= 2 && rows
    ? rows.filter(x => x.t.toLowerCase().includes(term) || x.r.toLowerCase() === term)
    : [];
  const hits = all.slice(0, 7);

  const go = () => { if (term) window.location.href = '/search/?q=' + encodeURIComponent(q.trim()); };

  return (
    <div className="searchbox">
      <input
        type="search"
        placeholder="Search places & events"
        aria-label="Search places and events in Korea"
        value={q}
        onFocus={() => { load(); setOpen(true); }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onChange={e => setQ(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') go(); }}
      />
      {open && term.length >= 2 && (
        <ul className="search-drop">
          {hits.map(h => (
            <li key={h.u}>
              <a href={h.u}>
                {display(h.t)} <span className="meta">{KIND[h.k]} · {h.r}</span>
              </a>
            </li>
          ))}
          {all.length === 0 && rows !== null && (
            <li><span className="meta" style={{ padding: '7px 10px', display: 'block' }}>No matches</span></li>
          )}
          {all.length > hits.length && (
            <li><a href={'/search/?q=' + encodeURIComponent(q.trim())}>
              See all {all.length} results <span className="meta">↵</span>
            </a></li>
          )}
        </ul>
      )}
    </div>
  );
}
