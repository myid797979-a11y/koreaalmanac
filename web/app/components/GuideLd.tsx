import { GUIDES, GUIDE_DATES } from '@/lib/guides';
import { placeBySlug } from '@/lib/places';
import { articleJsonLd, ldStr } from '@/lib/jsonld';

// 가이드 페이지의 Article 구조화 데이터 — Google Discover·검색의 기사형 노출 자격 (큰 이미지 + 날짜 + 저자).
// 제목·설명·사진은 lib/guides.ts 의 목록에서, 날짜는 GUIDE_DATES 에서 가져온다. 한 줄로 끼운다:
//   <GuideLd href="/guides/korea-in-winter/" />
export default function GuideLd({ href }: { href: string }) {
  const g = GUIDES.find(x => x.href === href);
  const d = GUIDE_DATES[href];
  if (!g || !d) return null;
  const image = g.photo ? placeBySlug(g.photo)?.image : undefined;
  const ld = articleJsonLd({
    title: g.title, description: g.blurb, path: href, image,
    published: d.published, modified: d.updated,
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(ld) }} />;
}
