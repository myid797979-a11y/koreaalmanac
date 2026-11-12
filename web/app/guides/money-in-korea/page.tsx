import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Money in Korea 2026: cards, cash, WOWPASS, ATMs and exchanging money',
  description: 'How to pay in Korea as a visitor: where foreign Visa and Mastercard work and where they fail, how much cash to carry, WOWPASS and T-money, which ATMs take foreign cards, where to exchange money, and why there is no tipping.',
};

export default function MoneyInKorea() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Money in Korea', path: '/guides/money-in-korea/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/money-in-korea/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Money in Korea
      </div>

      <h1>Money in Korea: cards, cash, WOWPASS and ATMs</h1>
      <p className="sub">
        Korea runs on cards. A foreign Visa or Mastercard will pay for almost everything you do in
        person — but it fails in a few specific places, and those are the ones that catch visitors
        out. Here is what works, what does not, and how much cash you actually need.
      </p>

      <GuideHero slugs={[
        'gwangjang-market-273761',
        'lotte-duty-free-shop-myeongdong-main-store-273801',
        'starfield-coex-mall-1984968',
      ]} />

      <div className="callout">
        <strong>The short version</strong>
        <ul>
          <li><strong>Bring a Visa or Mastercard</strong> (ideally two, from different banks). Amex works in hotels and department stores, much less elsewhere.</li>
          <li><strong>Carry ₩50,000–100,000 in cash</strong> for market stalls, street food and topping up a T-money card.</li>
          <li><strong>Get cash from ATMs marked “Global”</strong> at bank branches, or exchange cash in Myeongdong — not at the airport if you can avoid it.</li>
          <li><strong>No tipping</strong>, anywhere. Prices include tax.</li>
        </ul>
      </div>

      <h2 className="sect">Where foreign cards work, and where they do not</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Works</th>
            <td>
              Hotels, restaurants, cafés, convenience stores, department stores, Olive Young and
              cosmetics shops, museums and palaces, standard and deluxe taxis, KTX tickets bought at
              the station. Contactless (tap) payment is accepted at most newer terminals; otherwise
              the card is inserted. You are rarely asked for a PIN or a signature for small amounts.
            </td>
          </tr>
          <tr>
            <th>Often fails</th>
            <td>
              <strong>Korean websites and apps.</strong> Many Korean shopping sites, delivery apps
              and some booking pages only accept Korean-issued cards. Kakao Pay and Naver Pay, the
              wallets locals use, generally will not take a foreign card for a short-term visitor.
              Book trains on the Korail English site, and use global platforms for tickets and tours.
            </td>
          </tr>
          <tr>
            <th>Cash only</th>
            <td>
              Many traditional market stalls and street-food carts, some small old restaurants, and
              <strong> topping up a T-money card</strong> at convenience stores and station machines.
            </td>
          </tr>
          <tr>
            <th>Subway machines</th>
            <td>
              Since 17 March 2026, the newer ticket machines in Seoul subway stations (Lines 1–8)
              take foreign Visa and Mastercard for single tickets, the Climate Card and its short-term
              passes, with a service fee of about 3.7%. You still <strong>cannot tap a foreign card
              at the gates</strong> or on buses — you need a transport card.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">Transport cards and WOWPASS</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>T-money</th>
            <td>
              The tap card for subway, buses and most taxis nationwide, a few thousand won at any
              convenience store. Top it up <strong>with cash</strong>. Full details in{' '}
              <Link href="/guides/getting-around-seoul/">getting around Seoul</Link>.
            </td>
          </tr>
          <tr>
            <th>Climate Card</th>
            <td>
              Seoul’s unlimited subway-and-bus pass, with 1-, 2-, 3-, 5- and 7-day versions for
              visitors. Worth it only if you ride four or more times a day; see{' '}
              <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link> for the maths.
            </td>
          </tr>
          <tr>
            <th>WOWPASS</th>
            <td>
              A prepaid card for visitors. You load it at WOW Exchange machines — in more than 70
              Seoul subway stations, some hotels and Gimpo Airport (not Incheon) — with foreign cash
              in around 16 currencies, and then pay with it in shops like a Korean debit card. It
              also has a T-money chip for transport, but that part is a <strong>separate balance
              topped up with won cash</strong>; the shop money does not pay your bus fare. Useful if
              your home card charges heavy foreign-transaction fees; pointless if it does not.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.transit}
        title="Cards to collect when you land"
        intro="Pre-order a WOWPASS or T-money card and pick it up on arrival."
      />

      <h2 className="sect">Getting cash: ATMs</h2>
      <ul className="tips">
        <li>Look for machines marked <strong>Global ATM</strong> or showing the Visa/Plus and Mastercard/Cirrus logos. Bank branches of Woori, KB Kookmin, Shinhan and Hana are the usual choices; most have an English menu.</li>
        <li>Expect a Korean-side fee of roughly <strong>₩2,000–4,000 per withdrawal</strong>, on top of whatever your own bank charges. Convenience-store machines are open all night but tend to charge more and allow smaller withdrawals.</li>
        <li>If the machine offers to convert the amount into your home currency, <strong>decline</strong> and be charged in won — the machine’s rate is worse than your bank’s.</li>
        <li>If one machine rejects your card, try another bank before assuming the card is blocked. Tell your bank you are travelling.</li>
      </ul>

      <h2 className="sect">Exchanging cash</h2>
      <ul className="tips">
        <li><strong>Myeongdong’s licensed exchange shops</strong> usually give the best rates in Seoul for US dollars, euros, yen and other major currencies. Compare two or three; the rate board is outside.</li>
        <li><strong>Banks</strong> give fair rates on weekdays but keep office hours and take longer.</li>
        <li><strong>Airport counters</strong> are the most convenient and usually the worst rate. Change only what you need for the first day.</li>
        <li>Bring clean, recent notes — damaged or very old bills may be refused or get a lower rate.</li>
      </ul>

      <h2 className="sect">What things cost</h2>
      <table className="facts">
        <tbody>
          <tr><th>Subway ride</th><td>₩1,550 with a transport card (base fare, Seoul)</td></tr>
          <tr><th>Coffee</th><td>₩2,000–6,500, from chain takeaway to a smart café</td></tr>
          <tr><th>Market or street food</th><td>₩4,000–8,000 a plate</td></tr>
          <tr><th>Restaurant meal</th><td>₩10,000–20,000 a person for an ordinary Korean dinner</td></tr>
          <tr><th>Palace entry</th><td>₩1,000–3,000; free if you wear hanbok</td></tr>
        </tbody>
      </table>
      <p>
        For a full day-by-day budget, see <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>.
      </p>

      <h2 className="sect">Paying in restaurants</h2>
      <ul className="tips">
        <li>You usually pay at the counter on the way out, not at the table. Some places have a tablet or kiosk at the table or by the door.</li>
        <li><strong>There is no tipping</strong> and no service charge in ordinary restaurants, taxis or hotels. Leaving money on the table will more likely confuse than please.</li>
        <li>Splitting the bill is fine — say how many ways at the counter, or let one person pay and settle up later.</li>
        <li>Prices on menus and price tags already include the 10% VAT.</li>
      </ul>

      <h2 className="sect">Getting the VAT back</h2>
      <p>
        Tourists can claim back most of the 10% VAT on shopping of ₩15,000 or more at stores
        showing a Tax Free or Tax Refund sign — often instantly at the till. The rules and the
        airport routine are in <Link href="/guides/tax-refund-korea/">tax refunds in Korea</Link>.
      </p>

      <p className="strip">
        <Link href="/guides/tax-refund-korea/">Tax refunds</Link>
        <Link href="/guides/getting-around-seoul/">Getting around Seoul</Link>
        <Link href="/guides/esim-and-apps-for-korea/">eSIM and apps</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
        <Link href="/korea-basics/">Korea basics</Link>
      </p>

      <RelatedGuides href="/guides/money-in-korea/" />

      <p className="meta">
        Checked as of November 2026 against Seoul Metropolitan Government announcements on foreign
        cards at subway ticket machines (March 2026), the WOWPASS operator’s FAQ and VISITKOREA.
        ATM fees and exchange rates vary by bank and by day; treat the figures as a guide.
      </p>
    </div>
  );
}
