import { ldStr } from '@/lib/jsonld';

// 가이드 하단 Q&A. 구글은 2023-08 부터 FAQ 리치결과를 정부·의료 사이트에만 보여주므로
// 검색결과 펼침은 기대하지 않는다. 목적은 (1) 질문형 검색에 답이 페이지에 그대로 있는 것,
// (2) ChatGPT·Bing 이 인용하기 좋은 짧은 문답. 마크업(FAQPage)은 Bing 등이 읽으므로 같이 둔다.
// ⚠ 답은 본문과 같은 사실만. 본문에 없는 새 주장을 여기서 하지 않는다.
export default function GuideFaq({ items }: { items: { q: string; a: string }[] }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(i => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
  return (
    <section className="g-faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(ld) }} />
      <h2 className="sect">Quick answers</h2>
      {items.map(i => (
        <details key={i.q}>
          <summary>{i.q}</summary>
          <p>{i.a}</p>
        </details>
      ))}
    </section>
  );
}
