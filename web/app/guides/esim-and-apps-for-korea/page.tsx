import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'eSIM, SIM or pocket Wi-Fi for Korea — and the apps that actually work there',
  description: 'How to get online in Korea: data eSIM versus a SIM with a Korean number versus pocket Wi-Fi, which to choose, and the apps to install before you fly — Naver Map and KakaoMap (Google Maps does not give walking directions), Kakao T for taxis, Papago for translation, and the subway app.',
};

export default function EsimApps() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'eSIM and apps for Korea', path: '/guides/esim-and-apps-for-korea/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/esim-and-apps-for-korea/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › eSIM and apps for Korea
      </div>

      <h1>eSIM, SIM or pocket Wi-Fi for Korea, and the apps to install</h1>
      <p className="sub">
        Korea has some of the fastest mobile data in the world and free Wi-Fi on the subway, but you
        will want your own connection from the airport onward: the maps, the taxi app and translation
        all run on it. Sort it before you fly, and install the Korean apps at home, because the one
        you are used to may not work the way you expect.
      </p>

      <div className="callout callout-warn">
        <strong>The surprise for most visitors</strong>
        <ul>
          <li><strong>Google Maps does not give walking or driving directions in Korea</strong>, only public transport, because of restrictions on exporting Korean map data. Use Naver Map or KakaoMap instead.</li>
          <li><strong>Many Korean apps want a Korean phone number</strong> to sign up. A data-only eSIM has no number; if you need one, get a SIM or eSIM that includes it.</li>
        </ul>
      </div>

      <h2 className="sect">Which connection</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Data eSIM</th>
            <td>
              The easiest option if your phone supports eSIM: buy online, scan the QR code at home,
              and it connects when you land. Unlimited-data plans on the Korean networks are cheap
              for a week or two. Usually data only, with no Korean phone number.
            </td>
          </tr>
          <tr>
            <th>SIM or eSIM with a number</th>
            <td>
              Sold at the airport counters and online, and the choice if you want a Korean number
              for app sign-ups, restaurant queues and delivery. Needs your passport at pick-up.
            </td>
          </tr>
          <tr>
            <th>Pocket Wi-Fi</th>
            <td>
              A small router picked up at the airport, shared by a whole group over Wi-Fi. Good for
              families; one more thing to charge and to return before you fly home.
            </td>
          </tr>
          <tr>
            <th>Roaming</th>
            <td>
              Simplest and usually the most expensive. Check your own carrier’s daily pass before you
              dismiss it; some are reasonable.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.connect}
        title="Get connected before you land"
        intro="Booked online, the eSIM is ready when the plane lands; SIMs and pocket Wi-Fi are collected at the airport counters."
      />

      <h2 className="sect">The apps to install</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Naver Map</th>
            <td>
              The map most Koreans use, with walking, transit and driving directions, subway exits,
              and restaurant listings. English interface available. Search in English or paste the
              Korean name.
            </td>
          </tr>
          <tr>
            <th>KakaoMap</th>
            <td>
              The alternative, with equally good transit directions and a clean interface. Having
              both helps when one does not find a place.
            </td>
          </tr>
          <tr>
            <th>Kakao T</th>
            <td>
              The taxi app. Enter the destination, and the driver sees it in Korean; you can pay in
              the app or in the car. Late at night in busy districts it is much faster than hailing.
            </td>
          </tr>
          <tr>
            <th>Papago</th>
            <td>
              Naver’s translation app, better than most at Korean. The camera mode reads menus,
              signs and kiosk screens.
            </td>
          </tr>
          <tr>
            <th>A subway app</th>
            <td>
              Kakao Metro or a similar app shows the full network, the fastest transfer and the
              best carriage to board for a quick exit.
            </td>
          </tr>
          <tr>
            <th>Ticketing apps</th>
            <td>
              For concerts, install the platform named for your show and set up the account days
              ahead. The <Link href="/guides/kpop-tickets/">K-pop tickets guide</Link> explains which.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">Practical notes</h2>
      <ul className="tips">
        <li>Free Wi-Fi is on the subway, in most cafés and at many tourist sites, but it is not reliable enough to navigate by.</li>
        <li>Save your hotel’s address in Korean. Taxi drivers and delivery staff work from the Korean address, not the English one.</li>
        <li>Most shops take foreign cards. For transport, see <Link href="/guides/getting-around-seoul/">getting around Seoul</Link> for T-money and the travel cards.</li>
      </ul>

      <p className="strip">
        <Link href="/guides/incheon-airport-to-seoul/">Incheon Airport to Seoul</Link>
        <Link href="/guides/getting-around-seoul/">Getting around Seoul</Link>
        <Link href="/guides/korea-entry-requirements/">Entry requirements</Link>
        <Link href="/korea-basics/">Korea basics</Link>
      </p>

      <RelatedGuides href="/guides/esim-and-apps-for-korea/" />

      <p className="meta">
        App features and plan types change; check what your chosen eSIM includes before buying.
        Written in September 2026.
      </p>
    </div>
  );
}
