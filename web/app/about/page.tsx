import Link from 'next/link';
import { festivals } from '@/lib/data';
import { places } from '@/lib/places';
import { GUIDES } from '@/lib/guides';
import { concerts } from '@/lib/concerts';
import { venueParams } from '@/lib/venues';
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/site';

export const metadata = {
  title: 'About — who runs this site, where the data comes from, how it is checked',
  description: 'Who runs Korea Almanac, where its festival, place and concert data comes from, how translations and guides are made and checked, and how to get in touch.',
};

// Cloudflare 이메일 난독화가 mailto 를 /cdn-cgi/l/email-protection 링크로 바꾸면 크롤러가 404 로 잡는다
// (온담에서 겪음). email_off 주석 안의 주소는 난독화하지 않는다.
const mail = `<!--email_off--><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a><!--/email_off-->`;

export default function AboutPage() {
  return (
    <div className="overview" style={{ paddingBottom: 24 }}>
      <div className="crumb"><Link href="/">Home</Link> › About</div>
      <h1>About {SITE_NAME}</h1>

      <h2 className="sect">What this site is</h2>
      <p>
        {SITE_NAME} is a practical reference for travellers who want to know what is actually
        happening in Korea while they are there, and how to get to it. It brings together{' '}
        {festivals.length.toLocaleString('en-US')} festivals, {places.length.toLocaleString('en-US')} places
        to visit, {concerts.length} hand-picked concerts and shows, {venueParams().length} venue guides
        and {GUIDES.length} trip guides — with the details that matter when you are planning:
        real dates, opening hours, closed days, admission fees and how to get there.
      </p>

      <h2 className="sect">Who runs it</h2>
      <p>
        The site is built and run independently by one person — a software developer living in
        Korea. It is not a company, an agency or a tourism board, and it is not affiliated with the
        Korea Tourism Organization or any venue listed here. It started from a simple frustration:
        most of Korea&apos;s festival and venue information exists only in Korean, so visitors
        never hear about it.
      </p>

      <h2 className="sect">Where the data comes from</h2>
      <p>
        Festival and place data comes from the Korea Tourism Organization&apos;s official open-data
        service (TourAPI), published through Korea&apos;s public data portal. We merge the official
        English dataset with the much larger Korean one and translate the entries that have never
        been available in English — which is why many festivals and places here do not appear on
        other English-language sites. Exhibitions and traditional performances come from the open
        data of the Korea Culture Information Service Agency (part of the Ministry of Culture,
        Sports and Tourism), and concerts from the KOPIS performing-arts
        database plus official announcements and venue schedules.
      </p>

      <h2 className="sect">How it is written and checked</h2>
      <p>
        Translations are made with the help of AI and then checked against the Korean original —
        names of places and people, dates, fees and addresses are kept exactly as the official
        record gives them. Translated entries are labeled at the bottom of their description.
      </p>
      <p>
        Trip guides are also drafted with AI assistance, but every practical fact in them — prices,
        dates, opening hours, transport routes — is checked against an official source (the venue,
        the organizer, the transport operator or the tourism organization), and the date of the
        last update is shown on each guide. Seasonal guides such as the autumn foliage page are
        revised as conditions change. Concert listings are picked by hand: we only add shows a
        visitor from abroad could realistically attend.
      </p>

      <h2 className="sect">How it stays current</h2>
      <p>
        The whole site is regenerated every morning (KST) from the latest official data. Dates
        shown here reflect what organizers have registered — festivals do get rescheduled or
        cancelled, so for a long trip we recommend double-checking with the organizer contact
        listed on each page. Pages for events that ended long ago stay online for reference but
        are kept out of search results.
      </p>

      <h2 className="sect">Accuracy principles</h2>
      <p>
        We show only what the data supports: no invented ratings, no fake review counts, no
        sponsored placement. When a number is missing from the official record, the row simply is
        not shown.
      </p>
      <p>
        Official records are not always right, so for the busiest pages we check them ourselves.
        Where our check finds the record out of date, the checked value replaces it and the page
        says when it was checked. In November 2026, checking the winter festival season against
        organisers&apos; and city announcements corrected eight festival listings — among them a
        Christmas market listed as free that charges ₩10,000 at the door, a lantern festival that
        stays lit an hour later than listed, a light festival still showing last year&apos;s dates,
        and a fireworks festival that had moved to a different beach. The same round added checked
        opening hours, admission and visitor notes to 75 well-known places whose official record
        had none.
      </p>

      <h2 className="sect">How the site is funded</h2>
      <p>
        Some pages carry a box of booking links to Klook (tours and tickets) or Agoda (hotels),
        marked &ldquo;on Klook&rdquo; or &ldquo;on Agoda&rdquo;. If you book through one of those
        links we earn a commission from that platform; you pay the same price either way. The boxes are added by hand
        only where a tour or ticket is the practical way to visit, and they have no bearing on
        what is listed or how it is ranked. The site may also show advertising. Details are in the{' '}
        <Link href="/privacy/">privacy policy</Link>.
      </p>

      <h2 className="sect" id="contact">Contact</h2>
      <p>
        Found a wrong date, a closed venue or a translation that reads oddly? Corrections are
        always welcome and are usually fixed within a day or two. Write to{' '}
        <span dangerouslySetInnerHTML={{ __html: mail }} />.
      </p>
    </div>
  );
}
