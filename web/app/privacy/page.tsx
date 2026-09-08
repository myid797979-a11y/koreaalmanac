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
        We may use privacy-conscious analytics to understand which pages are useful
        (page views, referring site, country-level location). This data is aggregated and
        is not used to identify individuals. This section will be updated with the specific
        provider before any analytics is enabled.
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
