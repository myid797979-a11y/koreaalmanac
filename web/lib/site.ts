// 브랜드 상수 — sitemap·canonical·OG가 전부 이 값을 따른다 (온담 컨벤션)
// 2026-09-09 koreaalmanac.com 구매 완료 → 정식 도메인 반영
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://koreaalmanac.com';
export const SITE_NAME = 'Korea Almanac';
export const TAGLINE = "What's on in Korea, with real dates";

/**
 * meta description 길이 맞추기 — Bing 은 25~160자를 요구하고, 검색 결과에는
 * 150~160자만 표시된다. 155자를 넘으면 단어 경계에서 끊고 말줄임표를 붙인다.
 * 문장 중간에서 잘리는 것보다 낫다.
 */
export function clampDesc(text: string, max = 155): string {
  const s = text.replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const at = cut.lastIndexOf(' ');
  return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[,;:.\s]+$/, '') + '…';
}

// Google Analytics 4 — Mediavine Journey 심사가 GA4 로 트래픽을 검증한다
// (Tier 1 기준 30일 1,000세션). 트래픽이 오기 전에 붙여야 이력이 남는다.
export const GA_ID = 'G-QK9J11YDBN';

// Google AdSense 게시자 ID — 2026-09-29 사이트 추가, 심사 대기. 사용자 개인 계정(2023년 티스토리로 개설).
// 페이지 소스에 노출되는 공개값이라 코드에 둔다. ads.txt(public/ads.txt) 와 같은 값이어야 한다.
export const ADSENSE_PUB = 'ca-pub-5585592855648237';
