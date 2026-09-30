import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Shopping in Seoul: where to go for what, and how the tax refund works',
  description: 'Myeongdong, Hongdae, Seongsu, Dongdaemun, Gangnam and Insadong compared by what they are good for; K-beauty at Olive Young, K-pop albums, the instant tax refund and airport refund, duty free, and paying by card.',
};

export default function SeoulShopping() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Shopping in Seoul', path: '/guides/seoul-shopping/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/seoul-shopping/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Shopping in Seoul
      </div>

      <h1>Shopping in Seoul: where to go for what</h1>
      <p className="sub">
        Most visitors to Seoul leave with more luggage than they arrived with. K-beauty, fashion,
        K-pop merchandise and design goods are cheaper or only sold here, shops stay open late, and
        foreigners get the sales tax back. Each district is good for something different, so it pays
        to know which one you want.
      </p>

      <GuideHero slugs={[
        'myeong-dong-264312',
        'starfield-library-2642344',
        'seongsu-dong-handmade-shoes-street-2946682',
      ]} />

      <div className="callout">
        <strong>Before you buy</strong>
        <ul>
          <li><strong>Carry your passport.</strong> Shops with a “Tax Free” sign take the tax off at the till for foreign visitors, but only when you show it.</li>
          <li><strong>Cards work almost everywhere,</strong> including market stalls, though small traders prefer cash.</li>
          <li><strong>Keep receipts</strong> for anything you want refunded at the airport.</li>
        </ul>
      </div>

      <h2 className="sect">The districts</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Myeongdong</th>
            <td>
              The busiest shopping street for visitors: every cosmetics brand, the flagship Olive
              Young, a multi-storey Daiso, the Lotte department store and duty free, and street-food
              stalls from late afternoon. Crowded and a little touristy, but everything is in one
              place.
            </td>
          </tr>
          <tr>
            <th>Hongdae</th>
            <td>
              The university district. Young, cheap fashion, vintage, character shops, photo booths
              and busking. Busiest in the evening and at weekends.
            </td>
          </tr>
          <tr>
            <th>Seongsu</th>
            <td>
              Old factories and shoe workshops turned into concept stores, flagship boutiques and
              brand pop-ups that change every few weeks. The place for Korean designer labels and
              cafés.
            </td>
          </tr>
          <tr>
            <th>Dongdaemun</th>
            <td>
              Fashion malls and wholesale markets, some trading through the night, around the
              silver curves of Dongdaemun Design Plaza. Fabric and accessories by the metre.
            </td>
          </tr>
          <tr>
            <th>Gangnam and COEX</th>
            <td>
              Garosu-gil in Sinsa for boutiques; Starfield COEX Mall for the big library under its
              glass roof and for K-pop albums and merchandise at the music stores.
            </td>
          </tr>
          <tr>
            <th>Insadong and Ikseon-dong</th>
            <td>
              Traditional crafts, tea, hanji paper, ceramics and souvenirs worth taking home, in
              the lanes near the palaces.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'sinsa-dong-garosu-gil-road-1323377',
        'insadong-cultural-street-3075115',
        'dongdaemun-shopping-complex-dongdaemun-shopping-town-273734',
      ]} />

      <h2 className="sect">What people buy</h2>
      <ul className="tips">
        <li><strong>K-beauty.</strong> Olive Young is the chain everyone goes to, with large stores in Myeongdong and Seongsu and staff used to foreign customers. Sunscreen, sheet masks and toner are the staples.</li>
        <li><strong>K-pop.</strong> Albums, light sticks and merchandise at the music stores in COEX and Myeongdong, and at the agencies’ own shops. Official pop-ups announce themselves on social media.</li>
        <li><strong>Fashion.</strong> Korean labels in Seongsu and Hongdae, and cheap basics in the underground malls at Express Bus Terminal and Gangnam Station.</li>
        <li><strong>Everyday things.</strong> Daiso for stationery and kitchen gadgets, and the supermarkets for snacks, seaweed, instant noodles and coffee sticks to take home.</li>
        <li><strong>Crafts and heritage.</strong> Celadon, brassware and hanji from Insadong, and the museum shops at the National Museum and the palaces.</li>
      </ul>

      <BookBox
        offers={GUIDE_OFFERS.shopping}
        title="Before you go shopping"
        intro="A prepaid travel card saves exchange fees at the till; the eSIM keeps maps and translate running all day."
      />

      <h2 className="sect">Tax refund and duty free</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>At the till</th>
            <td>
              In shops showing a <strong>Tax Free</strong> sign, foreign visitors staying under
              six months get the tax taken off immediately when they show their passport, above a
              small minimum spend. There are limits per purchase and per trip.
            </td>
          </tr>
          <tr>
            <th>At the airport</th>
            <td>
              For purchases not refunded at the till, keep the refund receipt and use the kiosks
              at the airport before check-in, or in the departure area. Customs may ask to see the
              goods, so do not pack them in checked luggage until you have finished.
            </td>
          </tr>
          <tr>
            <th>Duty free</th>
            <td>
              The city duty-free stores, such as Lotte in Myeongdong, sell to departing travellers:
              you need your passport and flight details, and collect the goods at the airport after
              security.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'lotte-duty-free-shop-myeongdong-main-store-273801',
        'ktown4u-coex-3307357',
        'musinsa-standard-seongsu-3417814',
      ]} />

      <h2 className="sect">Practical notes</h2>
      <ul className="tips">
        <li>Most shops open around 10:30–11:00 and close at 21:00–22:00. Department stores close one weekday a month.</li>
        <li>Bargaining is expected only in markets, and gently. Not in shops.</li>
        <li>Sizes run small, especially shoes and women’s clothing. Try things on.</li>
        <li>The <Link href="/guides/incheon-airport-to-seoul/">airport guide</Link> covers leaving time for the refund kiosks on the way out.</li>
      </ul>

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.seoul}
        title="Where to stay in Seoul"
        intro="Jongno and Insadong put you walking distance from the palaces and markets; Myeongdong is central for everything else."
      />

      <p className="strip">
        <Link href="/guides/korean-food-guide/">Eating in Korea</Link>
        <Link href="/guides/seoul-nightlife/">Seoul after dark</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/places/shopping/">Shopping streets &amp; malls</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
      </p>

      <p className="meta">
        Tax-refund rules are set by the National Tax Service and change from time to time; the shop
        or refund kiosk will show the current limits. Opening hours vary by shop. Photographs: Korea
        Tourism Organization.
      </p>
    </div>
  );
}
