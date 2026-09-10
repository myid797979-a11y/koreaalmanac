// 좌표 거리 계산 — 관광지는 mapx(경도)·mapy(위도)를 100% 보유한다.
// "같은 지역" 보다 "걸어서 갈 수 있는 거리"가 여행자에게 훨씬 쓸모 있다.

export type Coord = { mapx: string | null; mapy: string | null };

/** 하버사인 거리 (km). 좌표가 없으면 null */
export function distanceKm(a: Coord, b: Coord): number | null {
  if (!a.mapx || !a.mapy || !b.mapx || !b.mapy) return null;
  const lat1 = Number(a.mapy), lon1 = Number(a.mapx);
  const lat2 = Number(b.mapy), lon2 = Number(b.mapx);
  if ([lat1, lon1, lat2, lon2].some(n => !Number.isFinite(n))) return null;

  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** 여행자가 바로 판단할 수 있는 표현으로 — 도보권인지가 핵심 */
export function distanceLabel(km: number): string {
  if (km < 0.4) return 'right next door';
  if (km < 1.2) return `${Math.round(km * 1000 / 100) * 100} m walk`;
  if (km < 15) return `${km.toFixed(1)} km away`;
  return `${Math.round(km)} km away`;
}

/** 도보로 갈 만한가 (같은 나들이에 묶을 수 있는 거리) */
export function isWalkable(km: number): boolean {
  return km < 1.5;
}

/**
 * 기준점에서 가까운 순으로. 같은 지역이라도 100km 떨어진 것은 의미가 없어
 * maxKm 으로 잘라낸다 (강원도 같은 넓은 도는 지역만으로 묶으면 엉뚱해진다).
 */
export function nearest<T extends Coord>(
  origin: Coord, list: T[], limit: number, maxKm = 40,
): (T & { km: number })[] {
  return list
    .map(x => ({ item: x, km: distanceKm(origin, x) }))
    .filter((x): x is { item: T; km: number } => x.km !== null && x.km <= maxKm)
    .sort((a, b) => a.km - b.km)
    .slice(0, limit)
    .map(x => ({ ...x.item, km: x.km }));
}
