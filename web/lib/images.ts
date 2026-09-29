import broken from './broken-images.json';

// KTO 원본에서 사라진 이미지 (scripts/image-audit.mjs 가 갱신한다).
const BROKEN = new Set<string>(broken.urls);

/** 사진이 없을 때 쓰는 한지 무늬 대체 이미지 */
export const NO_PHOTO = '/no-photo.svg';

/** 대표 사진: 깨졌으면 대체 이미지로 */
export function okImage(u: string): string;
export function okImage(u: string | null): string | null;
export function okImage(u: string | null): string | null {
  return u && BROKEN.has(u) ? NO_PHOTO : u;
}

/** 갤러리: 깨진 것은 뺀다 */
export function okImages(list: string[] | undefined): string[] | undefined {
  return list?.filter(u => !BROKEN.has(u));
}
