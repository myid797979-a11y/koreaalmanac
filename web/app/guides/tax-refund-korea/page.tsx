import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Tax refunds in Korea 2026: instant refunds, limits and the Incheon Airport routine',
  description: 'How tourists get the VAT back in Korea: the ₩15,000 minimum, instant refunds at the till (under ₩1 million per purchase, ₩5 million per trip), downtown refund booths, the airport kiosk and customs steps at Incheon, hotel refunds, and the mistakes that cost people their refund.',
};

export default function TaxRefundKorea() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Tax refunds in Korea', path: '/guides/tax-refund-korea/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/tax-refund-korea/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Tax refunds in Korea
      </div>

      <h1>Tax refunds in Korea: how to get the VAT back</h1>
      <p className="sub">
        Prices in Korea include 10% VAT, and as a tourist you can get most of it back on shopping
        you take home. Most of the time it happens at the till, in a few seconds, with your passport.
        For bigger purchases there is a short routine at the airport. Here are the rules as they
        stand in November 2026.
      </p>

      <GuideHero slugs={[
        'lotte-duty-free-shop-myeongdong-main-store-273801',
        'starfield-coex-mall-1984968',
        'hyundai-department-store-trade-center-273771',
      ]} />

      <div className="callout">
        <strong>The rules in one box</strong>
        <ul>
          <li><strong>Who:</strong> foreign visitors staying in Korea less than six months.</li>
          <li><strong>Minimum:</strong> <strong>₩15,000</strong> per receipt at one store showing a Tax Free / Tax Refund sign.</li>
          <li><strong>Instant refund at the till:</strong> purchases from ₩15,000 to under <strong>₩1,000,000</strong> per receipt, up to <strong>₩5,000,000</strong> in total per trip.</li>
          <li><strong>Above that:</strong> claim at a downtown refund booth (up to ₩6,000,000 per receipt) or at the airport (no upper limit).</li>
          <li><strong>Deadline:</strong> take the goods out of Korea, unused, within three months of purchase.</li>
        </ul>
      </div>

      <h2 className="sect">1. Instant refund at the till (most purchases)</h2>
      <p>
        At department stores, Olive Young and the big cosmetics chains, pharmacies, and many other
        shops with an <strong>Immediate Tax Refund</strong> sign, show your passport when you pay. The
        cashier scans it and charges you the price minus the refund — you never pay the tax in the
        first place. Keep the receipt.
      </p>
      <ul className="tips">
        <li>It works per receipt: ₩15,000 or more, and under ₩1,000,000.</li>
        <li>Across the whole trip you can take up to ₩5,000,000 of purchases this way. Beyond that, shops issue a refund slip instead.</li>
        <li>Some small shops apply their own lower limits or still use the old ₩30,000 minimum — ask before you pay if it matters.</li>
        <li>Expect a little less than the full 10% back on slips claimed later: the refund companies keep a handling fee.</li>
      </ul>

      <h2 className="sect">2. Refund slip, claimed downtown or at the airport</h2>
      <p>
        For anything over the instant-refund limits, or at shops that do not do instant refunds, ask
        for a <strong>tax refund receipt</strong> with your passport. You then claim it either:
      </p>
      <table className="facts">
        <tbody>
          <tr>
            <th>Downtown booths</th>
            <td>
              Refund counters in Myeongdong, department stores and shopping districts pay out before
              you leave, in cash or to a card, for up to ₩6,000,000 per receipt. Each booth only
              handles slips from its own refund company (Global Tax Free, Easy Tax Refund and so on).
              You need the goods, the slip, your passport and an international credit card as a
              guarantee — and you still confirm the export at the airport.
            </td>
          </tr>
          <tr>
            <th>At the airport</th>
            <td>
              Airport and port counters accept slips from every company, with no purchase limit.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">3. The airport routine at Incheon</h2>
      <ol className="steps">
        <li><strong>Before you check your bags</strong>, go to a tax refund kiosk in the departures hall (3F) and scan your passport and slips. Arrive with an extra 30 minutes in hand.</li>
        <li><strong>If the kiosk sends you to customs</strong>, show the goods — unopened and unused — with the receipts at the customs desk for the export stamp. This is why the shopping must still be in your bag, not in a checked suitcase you already dropped off.</li>
        <li><strong>Check in your luggage.</strong> If customs inspected something you want to check in, they will direct you to the oversized baggage counter.</li>
        <li><strong>After security</strong>, collect a cash refund at a counter or kiosk in the duty-free area, or have it paid to your card. At Terminal 1 the counter is on 3F near Gate 28; at Terminal 2 near Gate 253, with kiosks near Gates 250 and 253.</li>
      </ol>
      <p>
        If no counter is open, write your details on the slip and drop it in the refund box; card
        refunds take one to two months. Locations do move, so follow the Tax Refund signs.
      </p>

      <h2 className="sect">Hotels and clinics</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Hotel stays</th>
            <td>
              Foreign tourists staying up to 30 nights at hotels designated by the culture ministry
              — 118 of them in late 2026, in Seoul, Jeju and other cities — can claim
              the VAT on the room rate (breakfast included in the rate counts; extra meals and
              services do not). Ask for the refund form at check-in, get the slip at check-out, and
              claim at the hotel, a downtown booth or the airport. The scheme currently runs to the
              end of 2028, but the government has proposed ending it early, in June 2027.
            </td>
          </tr>
          <tr>
            <th>Cosmetic procedures</th>
            <td>
              The VAT refund on cosmetic surgery and skin treatments for foreign patients{' '}
              <strong>ended on 31 December 2025</strong>. Bills to revive it are before the
              National Assembly but none has passed as of November 2026, so budget for the full price.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.shopping}
        title="Before a shopping trip"
        intro="A WOWPASS for paying in shops, and data so the refund apps and maps work."
      />

      <h2 className="sect">Mistakes that cost people the refund</h2>
      <ul className="tips">
        <li><strong>Checking the shopping in before the kiosk.</strong> If customs asks to see it and it is already in the hold, you lose the refund.</li>
        <li><strong>Opening or using the goods.</strong> Cosmetics you have started using no longer qualify.</li>
        <li><strong>Skipping the airport kiosk with a refund slip in your bag.</strong> An unclaimed slip is simply lost; if you used a card as a guarantee at a downtown booth, the refund is charged back to it.</li>
        <li><strong>Going over ₩5,000,000 in instant refunds</strong> without noticing — after that, the till switches to slips you must claim at the airport.</li>
        <li><strong>Leaving it to the last ten minutes.</strong> The kiosk queue before security can be long in the evening rush.</li>
      </ul>

      <p className="strip">
        <Link href="/guides/seoul-shopping/">Seoul shopping</Link>
        <Link href="/guides/money-in-korea/">Money in Korea</Link>
        <Link href="/guides/incheon-airport-to-seoul/">Incheon Airport</Link>
        <Link href="/guides/korea-entry-requirements/">Entry and customs</Link>
      </p>

      <RelatedGuides href="/guides/tax-refund-korea/" />

      <p className="meta">
        Checked as of November 2026 against VISITKOREA’s duty-free and tax refund page (limits,
        downtown booths and Incheon counter locations), Korea Customs Service announcements on the
        2024 limit increase, and news reports on the hotel refund (SBS Biz, 7 October 2026) and the
        end of the cosmetic-procedure refund. Rules change — check before a large purchase.
      </p>
    </div>
  );
}
