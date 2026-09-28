import type { Metadata } from 'next';
import Link from 'next/link';
import { Hahmlet } from 'next/font/google';
import Logo from '@/app/components/Logo';
import SearchBox from '@/app/components/SearchBox';
import Script from 'next/script';
import { SITE_URL, SITE_NAME, GA_ID } from '@/lib/site';
import { fmt, today } from '@/lib/data';
import './globals.css';

const hahmlet = Hahmlet({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: '%s | ' + SITE_NAME },
  description: "What's on in Korea — festivals, K-pop concerts and live shows with real dates, venues and fees. Festival data from the Korea Tourism Organization, refreshed daily.",
  alternates: { canonical: './' },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={hahmlet.variable}>
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
