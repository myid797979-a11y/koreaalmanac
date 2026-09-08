import type { Metadata } from 'next';
import Link from 'next/link';
import { Hahmlet } from 'next/font/google';
import Logo from '@/app/components/Logo';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import './globals.css';

const hahmlet = Hahmlet({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: '%s | ' + SITE_NAME },
  description: 'Every festival in Korea, with real dates, fees, and locations — from official Korea Tourism Organization data, updated daily.',
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
            <nav className="nav">
              <Link href="/festivals/">Festivals</Link>
              <Link href="/calendar/">Calendar</Link>
              <Link href="/regions/">Regions</Link>
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="site">
          <div className="wrap">
            <p className="strip" style={{ margin: '0 0 10px' }}>
              <Link href="/festivals/">Festivals</Link>
              <Link href="/calendar/">Calendar</Link>
              <Link href="/regions/">Regions</Link>
              <Link href="/about/">About</Link>
              <Link href="/privacy/">Privacy</Link>
            </p>
            Data: Korea Tourism Organization (TourAPI) · Updated daily ·
            This site is not affiliated with KTO. Details can change — check official pages before you go.
          </div>
        </footer>
      </body>
    </html>
  );
}
