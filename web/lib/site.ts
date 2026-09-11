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