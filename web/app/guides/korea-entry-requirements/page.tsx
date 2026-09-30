import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Korea entry requirements 2026: K-ETA, the e-Arrival Card and customs',
  description: 'What you need to enter South Korea in 2026: who is exempt from the K-ETA until 31 December 2026, the e-Arrival Card to file within three days of landing, the official sites (and the look-alike agents to avoid), and the customs allowances.',
};

export default function EntryRequirements() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Korea entry requirements', path: '/guides/korea-entry-requirements/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/korea-entry-requirements/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Korea entry requirements
      </div>

      <h1>Korea entry requirements 2026: K-ETA, e-Arrival Card and customs</h1>
      <p className="sub">
        Most visitors from Europe, North America and Oceania can enter Korea visa-free as tourists.
        What changes year to year is the paperwork around it: the K-ETA travel authorisation, and the
        e-Arrival Card that replaced the paper form. This is the situation as announced up to
        September 2026. Rules change, so check the official sites before you fly.
      </p>

      <div className="callout callout-warn">
        <strong>For trips in 2026</strong>
        <ul>
          <li><strong>K-ETA exemption:</strong> citizens of 22 countries, including the US, UK, Canada, Australia, New Zealand, Japan and most of western Europe, do not need a K-ETA until <strong>31 December 2026</strong>.</li>
          <li><strong>e-Arrival Card:</strong> if you enter without a K-ETA, you must file the online arrival card within the <strong>three days before you land</strong>. It applies to every traveller, including children.</li>
          <li><strong>Travelling in 2027?</strong> Check whether the exemption has been extended before you book; if not, you will need a K-ETA again.</li>
        </ul>
      </div>

      <h2 className="sect">The K-ETA</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>What it is</th>
            <td>
              An online travel authorisation for visa-free visitors, approved before you board. It is
              not a visa, and it does not change how long you may stay.
            </td>
          </tr>
          <tr>
            <th>Who needs it</th>
            <td>
              Visa-free nationals not on the temporary exemption list. Exempt travellers may still
              apply voluntarily; holding a K-ETA means you do not have to file the e-Arrival Card.
            </td>
          </tr>
          <tr>
            <th>How to apply</th>
            <td>
              Only on the official site, <strong>k-eta.go.kr</strong>, at least 72 hours before
              departure. The fee is ₩10,000. Look-alike agency sites charge several times that for
              the same form.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">The e-Arrival Card</h2>
      <ul className="tips">
        <li>File it on the official site, <strong>e-arrivalcard.go.kr</strong>, in the three days before arrival. You will need your passport, flight number and the address where you are staying.</li>
        <li>One card per traveller and per trip, including children and infants.</li>
        <li>Keep the confirmation; immigration can see it against your passport.</li>
      </ul>

      <h2 className="sect">At immigration and customs</h2>
      <ul className="tips">
        <li>Foreign visitors are photographed and fingerprinted at immigration.</li>
        <li><strong>Duty-free allowance:</strong> goods up to about US$800 in value, plus limited alcohol and tobacco. Declare anything above it.</li>
        <li><strong>Cash</strong> over US$10,000 or its equivalent must be declared.</li>
        <li><strong>Meat, fruit and plants</strong> are restricted, and dogs at the airport are trained to find them. Declare food if in doubt.</li>
        <li>Some common medicines, including certain decongestants and ADHD drugs, are controlled in Korea. Carry prescriptions and check before you travel with them.</li>
      </ul>

      <BookBox
        offers={GUIDE_OFFERS.entry}
        title="After immigration"
        intro="Data from the moment you land, and the train into Seoul."
      />

      <h2 className="sect">After you land</h2>
      <p>
        From here, see <Link href="/guides/incheon-airport-to-seoul/">Incheon Airport to Seoul</Link>{' '}
        for the train or bus into the city, and{' '}
        <Link href="/guides/esim-and-apps-for-korea/">eSIM and apps</Link> for getting online.
      </p>

      <p className="strip">
        <Link href="/guides/incheon-airport-to-seoul/">Incheon Airport to Seoul</Link>
        <Link href="/guides/esim-and-apps-for-korea/">eSIM and apps</Link>
        <Link href="/guides/korea-7-day-itinerary/">7 days in Korea</Link>
        <Link href="/korea-basics/">Korea basics</Link>
      </p>

      <RelatedGuides href="/guides/korea-entry-requirements/" />

      <p className="meta">
        Based on announcements by the Ministry of Justice and the Korea Customs Service up to
        September 2026. This is general travel information, not legal advice; your airline and the
        official sites have the final word.
      </p>
    </div>
  );
}
