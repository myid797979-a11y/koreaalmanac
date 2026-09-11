'use client';

// 통합 검색 — 우리가 가진 걸 한 화면에 다 보여준다.
// "서울" 을 치면 서울 지역 페이지와 서울에 있는 것들이, "시장" 을 치면
// 전통시장 카테고리와 시장 이름을 가진 것들이 함께 나온다.

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Row = {
  k: 'place' | 'festival' | 'performance' | 'exhibition';
  t: string; u: string; r: string; d: string | null; e: string | null;
};

type Shortcut = { label: string; sub: string; href: string };

const GROUPS: { k: Row['k']; label: string; all: string }[] = [
  { k: 'place', label: 'Places', all: '/places/' },
  { k: 'festival', label: 'Festivals', all: '/events/festivals/' },
  { k: 'performance', label: 'Traditional performances', all: '/events/traditional/' },
  { k: 'exhibition', label: 'Exhibitions', all: '/events/exhibitions/' },
];

const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const nice = (d: string) => MO[Number(d.slice(4, 6)) - 1] + ' ' + Number(d.slice(6, 8)) + ', ' + d.slice(0, 4);
const dates = (r: Row) => (r.d ? (r.e && r.e !== r.d ? nice(r.d) + ' – ' + nice(r.e) : nice(r.d)) : null);

/** 표시용 이름 — 뒤에 붙은 (한글 원제) 를 뗀다. 원제 안에 괄호가 또 있는 경우가 있다. */
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

const PER_GROUP = 12;

export default function SearchResults({ regions, cats }: {
  regions: string[];
  cats: { slug: string; label: string }[];
}) {
  const [q, setQ] = useState('');
  const [rows, setRows] = useState<Row[] | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);

  // 첫 진입 시 ?q= 를 읽고 인덱스를 받는다
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('q');
    if (p) setQ(p);
    fetch('/search-index.json')
      .then(r => r.json())
      .then(setRows)
      .catch(() => setRows([]));
  }, []);

  useEffect(() => {
    const s = new URLSearchParams(q ? { q } : {}).toString();
    window.history.replaceState(null, '', s ? '?' + s : window.location.pathname);
  }, [q]);

  const term = q.trim().toLowerCase();

  // 지역·분류 이름을 그대로 친 경우 — 목록보다 해당 허브로 보내는 게 빠르다
  const shortcuts = useMemo<Shortcut[]>(() => {
    if (term.length < 2) return [];
    const out: Shortcut[] = [];
    for (const r of regions) {
      if (r.toLowerCase().includes(term)) {
        out.push({ label: r, sub: 'Everything in this region', href: '/regions/' + r.toLowerCase() + '/' });
      }
    }
    for (const c of cats) {
      if (c.label.toLowerCase().includes(term) || c.slug.includes(term)) {
        out.push({ label: c.label, sub: 'Browse this category', href: '/places/' + c.slug + '/' });
      }
    }
    return out.slice(0, 6);
  }, [term, regions, cats]);

  const hits = useMemo(() => {
    if (!rows || term.length < 2) return [];
    return rows.filter(x => x.t.toLowerCase().includes(term) || x.r.toLowerCase() === term);
  }, [rows, term]);

  const grouped = GROUPS.map(g => ({ ...g, items: hits.filter(x => x.k === g.k) }))
    .filter(g => g.items.length > 0);

  return (
    <>
      <div className="searchpage">
        <input
          type="search"
          autoFocus
          placeholder="Try Seoul, market, temple, Gwangjang…"
          aria-label="Search everything on Korea Almanac"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      {term.length > 0 && term.length < 2 && (
        <p className="sub">Type at least two characters.</p>
      )}

      {term.length >= 2 && rows === null && <p className="sub">Searching…</p>}

      {term.length >= 2 && rows !== null && (
        <>
          {shortcuts.length > 0 && (
            <>
              <h2 className="sect">Jump straight to</h2>
              <div className="catrow">
                {shortcuts.map(s => (
                  <Link key={s.href} href={s.href} className="cattile">
                    <span className="ct-body">
                      <strong>{s.label}</strong>
                      <span className="ct-n">{s.sub}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}

          <h2 className="sect">
            {hits.length} {hits.length === 1 ? 'result' : 'results'} for “{q.trim()}”
          </h2>

          {grouped.length === 0 && (
            <p className="sub">
              Nothing matched. Try a shorter word — a city (Busan), a kind of place (temple,
              market, beach) or part of a name.
            </p>
          )}

          {grouped.map(g => {
            const open = expanded.includes(g.k);
            const shown = open ? g.items : g.items.slice(0, PER_GROUP);
            return (
              <section key={g.k}>
                <div className="sect-row">
                  <h3 className="sect">{g.label}</h3>
                  <span className="meta">{g.items.length}</span>
                </div>
                <ul className="reslist">
                  {shown.map(x => (
                    <li key={x.u}>
                      <Link href={x.u}>{display(x.t)}</Link>
                      <span className="meta">
                        {' '}{x.r}{dates(x) ? ' · ' + dates(x) : ''}
                      </span>
                    </li>
                  ))}
                </ul>
                {g.items.length > PER_GROUP && !open && (
                  <p className="meta">
                    <button type="button" className="kf" onClick={() => setExpanded(e => [...e, g.k])}>
                      Show all {g.items.length}
                    </button>
                  </p>
                )}
              </section>
            );
          })}
        </>
      )}
    </>
  );
}
