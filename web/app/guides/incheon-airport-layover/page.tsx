import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Incheon Airport layover: the free transit tour, Seoul in a few hours, or staying airside',
  description: 'What to do with a layover at Incheon: the airport’s free transit tours for 4–24 hour stopovers, whether you can reach central Seoul and back, the paperwork you need to leave the airport, and what to do if you stay inside.',
};

export default function Layover() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Incheon Airport layover', path: '/guides/incheon-airport-layover/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/incheon-airport-layover/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Incheon Airport layover
      </div>

      <h1>An Incheon Airport layover: what you can actually do</h1>
      <p className="sub">
        Incheon is one of the world’s great transit airports, and one of the few where a layover of
        a few hours can turn into a real taste of Korea. The airport runs free guided tours for
        transit passengers, and central Seoul is under an hour away by train. Whether it is worth
        leaving depends on how long you have.
      </p>

      <div className="callout">
        <strong>By layover length</strong>
        <ul>
          <li><strong>Under 4 hours:</strong> stay airside. There is not enough time to clear immigration, go anywhere and get back through security.</li>
          <li><strong>4–8 hours:</strong> join a free transit tour, or take the AREX express to Seoul Station for a couple of hours in the old centre.</li>
          <li><strong>8–24 hours:</strong> a proper half-day in Seoul, or one of the longer transit tours. With an overnight, book an airport hotel.</li>
        </ul>
      </div>

      <h2 className="sect">The free transit tours</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Who can join</th>
            <td>
              Transit passengers with a layover of roughly 4 to 24 hours and an onward boarding
              pass. Because you leave the airport, you must be allowed to enter Korea: a visa-free
              passport or visa, plus the K-ETA or the e-Arrival Card.
            </td>
          </tr>
          <tr>
            <th>What they are</th>
            <td>
              Guided bus tours of 1 to 5 hours, run by the airport, to temples, palaces, markets and
              coastal sights around Incheon and Seoul. The guide and transport are free; admission
              fees or meals on some tours are not.
            </td>
          </tr>
          <tr>
            <th>How to join</th>
            <td>
              Register at the transit tour desks in the arrivals hall of Terminal 1 or Terminal 2,
              which open in the morning. Places are limited and given out on the day, so go to the
              desk as soon as you land. Be back at the desk 30 minutes before the tour leaves.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">On your own to Seoul</h2>
      <ul className="tips">
        <li>The <strong>AREX express</strong> reaches Seoul Station in about 43 minutes from Terminal 1. From there, Namdaemun Market and Deoksugung Palace are a short walk, and Gyeongbokgung is a few stops away.</li>
        <li>Allow at least <strong>two and a half hours</strong> for the round trip and airport formalities, and aim to be back at the airport <strong>two hours</strong> before your onward flight.</li>
        <li>Luggage storage is available in the arrivals hall if your bags are not checked through.</li>
        <li>For the train and timings, see <Link href="/guides/incheon-airport-to-seoul/">Incheon Airport to Seoul</Link>; for the entry paperwork, see <Link href="/guides/korea-entry-requirements/">entry requirements 2026</Link>.</li>
      </ul>

      <BookBox
        offers={GUIDE_OFFERS.layover}
        title="Layover essentials"
        intro="Paid layover tours pick you up at the airport if the free ones are full; data and the AREX ticket save time on a tight schedule."
      />

      <h2 className="sect">If you stay airside</h2>
      <ul className="tips">
        <li>Both terminals have free showers, rest areas with loungers and nap zones, and Korean cultural displays with free craft activities.</li>
        <li>Duty-free shopping is huge, with K-beauty brands at airport prices.</li>
        <li>Terminal 2 serves Korean Air and its partners; Terminal 1 most other airlines. A free shuttle train links them.</li>
        <li>For a long wait, the transit hotels and the Paradise City spa near Terminal 1 are an option if you can enter Korea. See <Link href="/guides/korean-spa-jjimjilbang/">Korean spas</Link>.</li>
      </ul>

      <p className="strip">
        <Link href="/guides/incheon-airport-to-seoul/">Incheon Airport to Seoul</Link>
        <Link href="/guides/korea-entry-requirements/">Entry requirements 2026</Link>
        <Link href="/guides/esim-and-apps-for-korea/">eSIM and apps</Link>
        <Link href="/regions/incheon/">Everything in Incheon</Link>
      </p>

      <RelatedGuides href="/guides/incheon-airport-layover/" />

      <p className="meta">
        Transit tour rules as published by Incheon International Airport up to September 2026; tour
        routes and times change seasonally. Check with the airport before you plan around a tour.
      </p>
    </div>
  );
}
