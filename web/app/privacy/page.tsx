import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy — what this site collects and what it does not.',
};

export default function PrivacyPage() {
  return (
    <div className="overview" style={{ paddingBottom: 24 }}>
      <div className="crumb"><Link href="/">Home</Link> › Privacy</div>
      <h1>Privacy Policy</h1>

      <p>
        {SITE_NAME} is a static informational website. We do not require accounts,
        and we do not collect names, email addresses, or any personal information you type.
      </p>

      <h2 className="sect">Analytics</h2>
      <p>
        We use <strong>Google Analytics 4</strong> to understand which pages are useful —
        page views, the site you arrived from, and country-level location. Google Analytics
        sets cookies and processes this data under
        {' '}<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google&apos;s privacy policy</a>.
        We do not use it to identify individuals, and we do not sell or share the data.
      </p>
      <p>
        To opt out, install
        {' '}<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google&apos;s opt-out browser add-on</a>,
        or block analytics cookies in your browser settings. The site works exactly the same
        either way.
      </p>

      <h2 className="sect">Advertising</h2>
      <p>
        If advertising is enabled on this site, the ad provider may use cookies to serve
        relevant ads. This page will be updated with provider details and opt-out
        instructions before that happens.
      </p>

      <h2 className="sect">Maps</h2>
      <p>
        Festival pages embed Google Maps to show locations. When a map loads, Google may
        set cookies and collect usage data under its own privacy policy. Maps are loaded
        lazily — only when you scroll to them.
      </p>

      <h2 className="sect">External links</h2>
      <p>
        Festival pages link to official organizer websites and map services. Those sites
        have their own privacy policies.
      </p>

      <p className="meta">Last updated: September 2026</p>
    </div>
  );
}
