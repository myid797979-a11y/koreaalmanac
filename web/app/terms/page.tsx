import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

// 이용약관 (2026-11-13) — 청약각 공동 회의에서 "푸터에 Terms 가 없다" 지적. 짧고 사실대로:
// 정보 사이트, 공공데이터 출처, 정확성 한계, 제휴·광고, 외부 링크, 연락처.
export const metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for Korea Almanac — an independent information site about festivals, events and places in Korea.',
};

export default function TermsPage() {
  return (
    <div className="overview" style={{ paddingBottom: 24 }}>
      <div className="crumb"><Link href="/">Home</Link> › Terms</div>
      <h1>Terms of Use</h1>
      <p className="meta">Last updated 13 November 2026</p>

      <p>
        {SITE_NAME} is a free, independent information website about festivals, events, concerts
        and places to visit in South Korea. By using the site you agree to the terms below. If you
        do not agree, please do not use the site.
      </p>

      <h2 className="sect">Information, not a booking service</h2>
      <p>
        Listings are compiled from official public data — the Korea Tourism Organization&apos;s
        TourAPI, the Korea Culture Information Service Agency and the KOPIS performing-arts
        database — together with organisers&apos; and venues&apos; own announcements. We check the
        busiest pages ourselves (see <Link href="/about/">how the site is written and checked</Link>),
        but dates, opening hours, prices and programmes change, sometimes at short notice. Always
        confirm with the organiser or venue before you travel or buy anything. {SITE_NAME} is not
        responsible for losses arising from changes, cancellations or errors in third-party data.
      </p>

      <h2 className="sect">Third-party links and bookings</h2>
      <p>
        Pages link to official sites, maps and, in clearly marked boxes, to booking platforms
        (Klook and Agoda). Anything you book is a contract between you and that platform or
        provider, under their terms; we do not handle payments, tickets or refunds. Some of these
        links earn us a commission, as explained in the <Link href="/privacy/">privacy policy</Link>.
        We are not responsible for the content or practices of external sites.
      </p>

      <h2 className="sect">Use of the content</h2>
      <p>
        You are welcome to read, link to and share pages. The guides and other text written for
        this site may not be copied wholesale or republished without permission; quoting a short
        passage with a link back is fine. Photos on festival and place pages come from the Korea
        Tourism Organization and organisers and remain subject to their terms.
      </p>

      <h2 className="sect">Changes</h2>
      <p>
        We may update these terms; the date at the top shows the latest version. Continued use of
        the site after a change means you accept the updated terms.
      </p>

      <h2 className="sect">Contact</h2>
      <p>
        Questions or corrections: see the <Link href="/about/#contact">contact details on the About page</Link>.
      </p>
    </div>
  );
}
