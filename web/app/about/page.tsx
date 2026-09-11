import Link from 'next/link';
import { festivals } from '@/lib/data';
import { SITE_NAME } from '@/lib/site';

export const metadata = {
  title: 'About — where the data comes from and how it stays current',
  description: 'What this site is, where the data comes from, and how it stays accurate.',
};

export default function AboutPage() {
  return (
    <div className="overview" style={{ paddingBottom: 24 }}>
      <div className="crumb"><Link href="/">Home</Link> › About</div>
      <h1>About {SITE_NAME}</h1>

      <h2 className="sect">What this site is</h2>
      <p>
        {SITE_NAME} is a practical reference for what is actually happening in Korea while
        you are there. It covers {festivals.length} festivals registered with the Korea
        Tourism Organization plus hand-picked concerts and live shows, with the details
        that matter when you are planning a trip: real dates, venues, admission fees,
        closed days, and how to get there. Filter by month or region, or browse the
        full calendar.
      </p>

      <h2 className="sect">Where the data comes from</h2>
      <p>
        Festival data comes from the Korea Tourism Organization&apos;s official open-data
        service (TourAPI), published through Korea&apos;s public data portal. We merge the
        official English dataset with the much larger Korean dataset, translating entries
        that have never been available in English — which is why you will find hundreds of
        festivals here that do not appear on other English-language sites. Translated pages
        are labeled at the bottom of their description.
      </p>
      <p>
        Concerts and live shows are a different case: no open dataset covers commercial
        shows in Korea, so we compile them by hand from official announcements and venue
        schedules, and note on each page when the listing was last checked. That list is
        deliberately selective rather than exhaustive, and past events disappear from the
        site automatically.
      </p>

      <h2 className="sect">How it stays current</h2>
      <p>
        The whole site is regenerated every morning (KST) from the latest official data.
        Dates shown here reflect what organizers have registered — festivals do get
        rescheduled or cancelled, so for a long trip we recommend double-checking with the
        organizer contact listed on each page.
      </p>

      <h2 className="sect">Accuracy principles</h2>
      <p>
        We show only what the data supports: no invented ratings, no fake review counts,
        no sponsored placement. When a number is missing from the official record, the row
        simply is not shown. This site is independent and not affiliated with the Korea
        Tourism Organization.
      </p>
    </div>
  );
}
