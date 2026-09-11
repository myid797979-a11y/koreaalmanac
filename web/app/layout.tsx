import type { Metadata } from 'next';
import Link from 'next/link';
import { Hahmlet } from 'next/font/google';
import Logo from '@/app/components/Logo';
import SearchBox from '@/app/components/SearchBox';
import { SITE_URL, SITE_NAME } from '@/lib/site';
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
        <header className="site">
          <div className="wrap">
            <Link href="/" className="wordmark"><Logo />{SITE_NAME}</Link>
            <SearchBox />
            <nav className="nav">
              <Link href="/plan/">Plan</Link>
              <Link href="/events/">What&apos;s On</Link>
              <Link href="/places/">Places</Link>
              <Link href="/guides/">Guides</Link>
              <Link href="/calendar/">Calendar</Link>
              <Link href="/regions/">Regions</Link>
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
            Concerts are compiled by hand from official announcements.
            This site is not affiliated with KTO or any venue or promoter —
            details can change, so check official pages before you go.
          </div>
        </footer>
      </body>
    </html>
  );
}
