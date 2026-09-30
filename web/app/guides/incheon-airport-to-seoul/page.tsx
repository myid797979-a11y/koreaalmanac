import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Incheon Airport to Seoul — train, bus or taxi, with 2026 prices and the late-night options',
  description: 'The AREX express, the all-stop train, airport limousine buses and taxis compared on price, time and luggage. Plus what to do in the first hour: e-Arrival card, a SIM or eSIM, T-money, and what happens if you land after midnight.',
};

export default function IncheonAirportToSeoul() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Incheon Airport to Seoul', path: '/guides/incheon-airport-to-seoul/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/incheon-airport-to-seoul/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Incheon Airport to Seoul
      </div>

      <h1>Incheon Airport to Seoul: which way, and what to do first</h1>
      <p className="sub">
        Incheon is 50 km west of central Seoul, on its own island, and there are four sensible
        ways in: the express train, the all-stop train, the airport limousine bus and a taxi.
        Which is right depends almost entirely on <strong>where your hotel is</strong> and{' '}
        <strong>how much luggage you have</strong>, not on price — the difference between the
        cheapest and the most comfortable is smaller than people expect. The short answer is at
        the top; the details and the first-hour checklist follow.
      </p>

      <div className="callout">
        <strong>The short answer</strong>
        <table className="facts" style={{ marginTop: 10 }}>
          <tbody>
            <tr><th>Hotel near Seoul Station, Hongdae or Gongdeok</th><td><strong>AREX train.</strong> The line goes straight there.</td></tr>
            <tr><th>Hotel in Myeongdong, Jongno, Gangnam or Jamsil</th><td><strong>Airport limousine bus</strong> — it stops at the hotels and avoids two subway changes with a suitcase.</td></tr>
            <tr><th>Three or more people, or heavy bags</th><td><strong>Taxi</strong>, which splits to about the same as the bus.</td></tr>
            <tr><th>Landing after 23:00</th><td>Late buses or a taxi; the trains will have stopped. See the end of this page.</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="sect">The four options compared</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>AREX Express</th>
            <td>
              Non-stop to <strong>Seoul Station in 43 minutes</strong> (about 51 from Terminal 2),
              every 20–40 minutes, reserved seats and luggage racks. About{' '}
              <strong>₩11,000</strong>, usually a little less bought online in advance. Ends at
              Seoul Station, where you change to the subway or take a short taxi.
            </td>
          </tr>
          <tr>
            <th>AREX All-stop</th>
            <td>
              The commuter train on the same line: <strong>about an hour</strong> to Seoul Station,
              every 6–12 minutes, stopping at Hongik University (Hongdae) and Gongdeok on the way.
              Under <strong>₩5,000</strong> with a T-money card. No luggage space, and standing
              room only at rush hour, but it is the cheapest way in by a distance.
            </td>
          </tr>
          <tr>
            <th>Limousine bus</th>
            <td>
              Coaches to almost every district and many major hotels, <strong>₩17,000–18,000</strong>,
              60–90 minutes depending on traffic. Buy at the ticket counters in arrivals or with a
              T-money card on board. Luggage goes underneath. The right choice for most hotels away
              from the train line.
            </td>
          </tr>
          <tr>
            <th>Taxi</th>
            <td>
              About <strong>₩60,000–90,000</strong> to central Seoul including the expressway toll,
              60–70 minutes, more at night with the surcharge. Use the official rank outside
              arrivals, or book an International Taxi (English-speaking drivers, fixed fares by zone)
              or a private transfer in advance. Ignore anyone offering a ride inside the terminal.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">The first hour after landing</h2>
      <ol className="steps">
        <li>
          <strong>Immigration.</strong> Have your e-Arrival card submitted before you fly (it is
          online, free, within three days of arrival). K-ETA is waived for most Western passports
          until 31 December 2026 and returns from 1 January 2027 — the{' '}
          <Link href="/korea-basics/">Korea basics</Link> page has the details.
        </li>
        <li>
          <strong>Data.</strong> If you bought an eSIM, switch it on before you leave the plane. If
          not, the telecom counters in arrivals sell SIMs, eSIMs and pocket wifi — expect a queue in
          the afternoon peak. Google Maps cannot give walking or driving directions in Korea, so
          install Naver Map or Kakao Map now, while you have wifi.
        </li>
        <li>
          <strong>T-money.</strong> Buy a transport card at any convenience store in arrivals and
          load ₩20,000–30,000 in cash. It pays for the all-stop train, the subway, buses, the
          limousine bus and most taxis for the whole trip.
        </li>
        <li>
          <strong>Money.</strong> Airport exchange rates are poor; change only what you need for
          the first day, or use a “Global” ATM. Cards work almost everywhere in Seoul.
        </li>
      </ol>

      <h2 className="sect">Terminal 1 or Terminal 2</h2>
      <p>
        Korean Air, Delta, Air France, KLM and most SkyTeam airlines use <strong>Terminal 2</strong>;
        almost everyone else uses Terminal 1. They are 15–20 minutes apart by the free shuttle bus,
        and every option above runs from both — the AREX stops at Terminal 2 first. It matters on
        the way home more than on arrival: check which terminal your departing flight uses.
      </p>

      <h2 className="sect">Landing late</h2>
      <p>
        The last AREX trains toward Seoul leave around <strong>23:30–midnight</strong> and the
        express stops earlier. After that, a handful of late-night limousine buses run to Seoul
        Station, Dongdaemun and Gangnam into the small hours, and taxis run all night with the
        night surcharge. If your flight lands after one in the morning, a night at one of the
        airport hotels — or the transit hotel inside Terminal 1 — is often cheaper than a
        surcharged taxi, and you reach Seoul the next morning rested.
      </p>

      <h2 className="sect">Going the other way</h2>
      <p>
        Give yourself <strong>three hours</strong> before an international flight: an hour into the
        airport from central Seoul, and the check-in and security queues at Incheon are long in the
        morning peak. If you are staying near Seoul Station, the Korean Air and Asiana city check-in
        desks there have in the past let you check bags before boarding the train; confirm for your
        airline, as the service has changed over the years. Tax refunds on shopping are handled at
        the kiosks before security.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.airport}
        title="Book before you fly"
        intro="Each is cheaper or quicker bought ahead than at the airport counters."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.airport}
        title="Near the airport, or on the line in"
        intro="Airport-island hotels for a late landing or an early flight; Seoul Station and Hongdae for the AREX."
      />

      <p className="strip">
        <Link href="/guides/korea-entry-requirements/">Entry requirements 2026</Link>
        <Link href="/guides/esim-and-apps-for-korea/">eSIM and apps</Link>
        <Link href="/korea-basics/">Korea basics</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
        <Link href="/venue/inspire-arena/">INSPIRE Arena (on the airport island)</Link>
      </p>

      <RelatedGuides href="/guides/incheon-airport-to-seoul/" />

      <p className="meta">
        Fares and journey times are 2026 figures rounded to typical values: AREX as published by
        Airport Railroad, limousine buses as published by the operators, taxi fares estimated with the
        Seoul metered rate and expressway tolls. Last-train and late-bus times change seasonally; check
        the day before. Entry rules as stated on the Korea basics page, checked September 2026.
      </p>
    </div>
  );
}
