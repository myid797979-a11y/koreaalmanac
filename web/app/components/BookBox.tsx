import type { Offer } from '@/lib/affiliate';

// 제휴 상자 — 사람이 고른 페이지에만 붙는다 (lib/affiliate.ts 참조).
//
// 왜 rel="sponsored": Google 은 대가가 오가는 링크에 sponsored 표시를 요구한다.
// 왜 data-aff: layout 의 GA4 스크립트가 이 속성으로 affiliate_click 이벤트를 보낸다.
// 왜 고지 문구가 상자 안에: 미국 FTC·영국 ASA 는 "링크 가까이" 를 요구한다.
export default function BookBox({
  offers, title = 'Book ahead', intro,
}: { offers: readonly Offer[]; title?: string; intro?: string }) {
  if (!offers || offers.length === 0) return null;
  return (
    <aside className="book" aria-label="Tours and tickets">
      <div className="book-head">
        <span className="book-title">{title}</span>
        <span className="book-via">on Klook</span>
      </div>
      {intro && <p className="book-intro">{intro}</p>}
      <ul>
        {offers.map(o => (
          <li key={o.url}>
            <a href={o.url} target="_blank" rel="sponsored nofollow noopener" data-aff="klook">{o.label} ↗</a>
            {o.note && <span className="book-note"> · {o.note}</span>}
          </li>
        ))}
      </ul>
      <p className="book-disc">
        Booking through these links earns Korea Almanac a small commission from Klook at no extra
        cost to you. Nothing on this site is ranked or chosen by commission.
      </p>
    </aside>
  );
}
