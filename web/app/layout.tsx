import type { Metadata } from 'next';
import Link from 'next/link';
import { Hahmlet } from 'next/font/google';
import Logo from '@/app/components/Logo';
import SearchBox from '@/app/components/SearchBox';
import Script from 'next/script';
import { SITE_URL, SITE_NAME, GA_ID, ADSENSE_PUB } from '@/lib/site';
import { fmt, today } from '@/lib/data';
import './globals.css';

const hahmlet = Hahmlet({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: '%s | ' + SITE_NAME },
  description: "What's on in Korea — festivals, K-pop concerts and live shows with real dates, venues and fees. Festival data from the Korea Tourism Organization, refreshed daily.",
  alternates: { canonical: './', types: { 'application/rss+xml': [{ url: '/rss.xml', title: 'Korea Almanac guides' }] } },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  // AdSense 사이트 소유 확인용 메타 태그 (심사 시 head 에서 찾는다). 게시자 ID 는 공개값.
  other: {
    'google-adsense-account': ADSENSE_PUB,
    'naver-site-verification': 'da4641f4fc396724f92145527f92173b0abd5ab1',   // 네이버 서치어드바이저 소유 확인
  },
  // Discover 자격: 큰 이미지 미리보기 허용 (기본값은 작은 썸네일만). KTO 사진은 대부분 1,000px 이상.
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={hahmlet.variable}>
      <head>
        {/* AdSense — 심사 크롤러가 원본 HTML 의 head 에서 이 태그를 찾으므로 next/script 가 아니라
            평문 <script async> 로 둔다 (afterInteractive 는 하이드레이션 뒤에 붙어 크롤러가 못 본다).
            승인 전에는 아무것도 그리지 않는다. 승인 후 자동 광고는 끄고 고정 높이 수동 슬롯만 쓴다. */}
        <script
          async
          src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_PUB}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* GA4 — 정적 내보내기라 next/script 로 붙인다. 페이지 렌더를 막지 않도록 afterInteractive. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QK9J11YDBN');
            document.addEventListener('click', function (e) {
              var el = e.target instanceof Element ? e.target.closest('a[data-aff]') : null;
              if (el) gtag('event', 'affiliate_click', {
                provider: el.getAttribute('data-aff'),
                link_text: (el.textContent || '').trim().slice(0, 80),
                page_path: location.pathname });
            }, true);`}
        </Script>
        <header className="site">
          <div className="wrap">
            <Link href="/" className="wordmark"><Logo />{SITE_NAME}</Link>
            <SearchBox />
            {/*
              메뉴는 네 개까지만 — 여행자의 질문은 "언제 / 무엇이 열리나 / 어디를 / 어떻게"
              네 가지다. Calendar 와 Regions 는 각각 What's On 과 Places 첫 화면에서
              링크하므로 상단에서 빼도 닿는 길이 끊기지 않는다(푸터에도 남겨 둔다).
            */}
            <nav className="nav">
              <Link href="/plan/">Plan</Link>
              <Link href="/events/">What&apos;s On</Link>
              <Link href="/places/">Places</Link>
              <Link href="/guides/">Guides</Link>
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="site">
          <div className="wrap">
            <p className="strip" style={{ margin: '0 0 10px' }}>
              <Link href="/plan/">Trip Planner</Link>
              <Link href="/korea-basics/">Korea Basics</Link>
              <Link href="/search/">Search</Link>
              <Link href="/events/">What&apos;s On</Link>
              <Link href="/calendar/">Calendar</Link>
              <Link href="/regions/">Regions</Link>
              <Link href="/about/">About</Link>
              <Link href="/privacy/">Privacy</Link>
            </p>
            Festival data: Korea Tourism Organization (TourAPI), refreshed {fmt(today())} (KST).
            Concert listings are compiled by hand from official announcements, using data from
            the Korea Performing Arts Box Office Information System (KOPIS,
            {' '}<a href="https://www.kopis.or.kr" target="_blank" rel="noopener">www.kopis.or.kr</a>)
            provided by the Korea Arts Management Service.
            This site is not affiliated with KTO or any venue or promoter —
            details can change, so check official pages before you go.
          </div>
        </footer>
      </body>
    </html>
  );
}
