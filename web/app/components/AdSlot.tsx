'use client';
import { useEffect, useRef } from 'react';
import { ADSENSE_PUB, ADS_ENABLED, AD_SLOTS, type AdPlacement } from '@/lib/site';

// AdSense 수동 광고 자리 (2026-09-29 준비, 승인 전이라 꺼 둠).
//
// 원칙
//   - 자동 광고는 쓰지 않는다. 레이아웃이 흔들리면(CLS) 재평가 시기에 순위에 해가 된다.
//   - 자리는 고정 높이로 미리 비워 둔다(min-height). 광고가 늦게 떠도 본문이 밀리지 않는다.
//   - 히어로·사실 표·제휴 상자 사이에는 넣지 않는다. 본문을 한 덩어리 읽은 뒤에만.
//
// 켜는 법: lib/site.ts 에서 ADS_ENABLED = true, AD_SLOTS 에 AdSense 가 준 광고 단위 번호를 채운다.
// 꺼져 있으면 아무것도 그리지 않는다 — HTML 이 바뀌지 않으니 freshness 해시도 움직이지 않는다.
// ⚠ 켜는 날은 전 페이지 HTML 이 바뀐다. freshness 의 strip 규칙에 .adslot 을 먼저 넣고 HASH_VERSION 을 올릴 것.

declare global { interface Window { adsbygoogle?: unknown[] } }

export default function AdSlot({ placement }: { placement: AdPlacement }) {
  const slot = AD_SLOTS[placement];
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADS_ENABLED || !slot || pushed.current) return;
    pushed.current = true;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { /* 차단기 등 — 조용히 무시 */ }
  }, [slot]);

  if (!ADS_ENABLED || !slot) return null;
  return (
    <div className="adslot" aria-label="Advertisement">
      <span className="adslot-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_PUB}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
