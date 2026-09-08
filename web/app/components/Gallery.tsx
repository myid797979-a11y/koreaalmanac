'use client';

import { useCallback, useEffect, useState } from 'react';

// 상세 페이지 사진 갤러리 — 클릭 시 새 탭 대신 같은 화면 라이트박스로 연다.
// 닫기: X 버튼 / 배경 클릭 / ESC. 이동: 좌우 버튼 / 방향키.
export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (d: number) =>
      setOpen(i => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') move(-1);
      else if (e.key === 'ArrowRight') move(1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, move]);

  return (
    <>
      <div className="gallery">
        {images.map((u, i) => (
          <button key={u} type="button" className="gallery-thumb" onClick={() => setOpen(i)} aria-label={`View photo ${i + 1} of ${images.length}`}>
            <img src={u} alt={alt} loading="lazy" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={close}>
          <img src={images[open]} alt={alt} onClick={e => e.stopPropagation()} />
          <button type="button" className="lb-close" onClick={close} aria-label="Close">×</button>
          {images.length > 1 && (
            <>
              <button type="button" className="lb-nav lb-prev" onClick={e => { e.stopPropagation(); move(-1); }} aria-label="Previous photo">‹</button>
              <button type="button" className="lb-nav lb-next" onClick={e => { e.stopPropagation(); move(1); }} aria-label="Next photo">›</button>
              <span className="lb-count">{open + 1} / {images.length}</span>
            </>
          )}
        </div>
      )}
    </>
  );
}
