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
        This site does not currently run display advertising. If that changes, this page will
        name the provider and explain the cookies involved and how to opt out before any ads
        appear.
      </p>

      <h2 className="sect">Affiliate links</h2>
      <p>
        Some pages include booking links to <strong>Klook</strong>, a travel booking platform,
        in a box marked &ldquo;on Klook&rdquo;. These are affiliate links: if you book through one,
        {SITE_NAME} earns a small commission from Klook at no extra cost to you. The links
        carry a partner identifier so Klook can attribute the booking; when you click one,
        Klook may set a cookie on its own site under
        {' '}<a href="https://www.klook.com/privacy/" target="_blank" rel="noopener">Klook&apos;s privacy policy</a>.
        We receive aggregate statistics only (clicks and bookings), never your name or
        payment details.
      </p>
      <p>
        Affiliate links never affect which festivals, places or events appear on this site or
        the order they appear in. Boxes are added by hand to a small number of pages where a
        tour or ticket is genuinely the practical way to visit.
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
