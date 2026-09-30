import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Eating in Korea: what to order, how it works, and where to start in Seoul',
  description: 'A first-timer’s guide to Korean food: the dishes worth ordering, how a Korean restaurant works (free side dishes, the call bell, paying at the counter, the two-portion rule), what things cost, the Seoul food markets, and eating as a vegetarian.',
};

export default function KoreanFood() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Eating in Korea', path: '/guides/korean-food-guide/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/korean-food-guide/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Eating in Korea
      </div>

      <h1>Eating in Korea: what to order and how it works</h1>
      <p className="sub">
        Food is one of the best reasons to come to Korea, and one of the most confusing parts of
        the first few days. Restaurants tend to do one thing, menus are often only in Korean, and
        there are small rules nobody explains. Here is what to order and how to order it.
      </p>

      <GuideHero slugs={[
        'gwangjang-market-273761',
        'dongdaemun-dak-hanmari-alley-2590278',
        'tongin-market-1823985',
      ]} />

      <div className="callout">
        <strong>How a Korean restaurant works</strong>
        <ul>
          <li><strong>Side dishes are free</strong> and refilled if you ask. Water is usually free too, often self-service from a fridge or dispenser.</li>
          <li><strong>Press the bell</strong> on the table to call staff, or call out “jeogiyo” (excuse me). Nobody will come otherwise.</li>
          <li><strong>Pay at the counter</strong> on your way out. There is no tipping.</li>
          <li><strong>Barbecue and hot-pot places</strong> usually sell by the portion with a minimum of two. Eating alone, pick dishes that come as one bowl.</li>
          <li><strong>Kiosks</strong> are common and often Korean-only. Point your phone’s translate camera at the screen.</li>
        </ul>
      </div>

      <h2 className="sect">What to order</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Korean barbecue</th>
            <td>
              <strong>Samgyeopsal</strong> (pork belly) is the everyday one; <strong>galbi</strong>{' '}
              is marinated short rib. You grill it at the table, staff cut it with scissors, and you
              wrap it in lettuce with garlic and ssamjang paste. Expect about ₩16,000–20,000 per
              portion in Seoul.
            </td>
          </tr>
          <tr>
            <th>Fried chicken and beer</th>
            <td>
              <strong>Chimaek</strong>: crisp fried chicken, plain or in a sweet-spicy glaze, with
              draught beer. A whole chicken is roughly ₩20,000–25,000 and feeds two. The classic
              evening in Korea, especially at a baseball game or by the Han River.
            </td>
          </tr>
          <tr>
            <th>Stews and soups</th>
            <td>
              <strong>Kimchi jjigae</strong> and <strong>sundubu</strong> (soft tofu stew) are the
              reliable solo lunch, bubbling in a stone pot with rice, around ₩9,000–11,000.{' '}
              <strong>Dak hanmari</strong> is a whole chicken simmered at the table for sharing.
            </td>
          </tr>
          <tr>
            <th>Rice and noodles</th>
            <td>
              <strong>Bibimbap</strong>, rice with vegetables and chilli paste, best in a hot stone
              bowl. <strong>Naengmyeon</strong>, cold buckwheat noodles, in summer.{' '}
              <strong>Jajangmyeon</strong>, black-bean noodles, the Korean-Chinese comfort food.
            </td>
          </tr>
          <tr>
            <th>Street and market food</th>
            <td>
              <strong>Tteokbokki</strong> (chewy rice cakes in red sauce), <strong>kimbap</strong>{' '}
              (rice rolls), <strong>bindaetteok</strong> (mung-bean pancakes), <strong>hotteok</strong>{' '}
              (sweet filled pancakes, in winter) and fish cake on a stick with its broth.
            </td>
          </tr>
          <tr>
            <th>Drinks</th>
            <td>
              <strong>Soju</strong> is the national drink, about ₩5,000–6,000 a bottle in a
              restaurant. <strong>Makgeolli</strong>, cloudy rice wine, goes with pancakes, and
              Koreans drink it on rainy days. Pour for others, never for yourself.
            </td>
          </tr>
          <tr>
            <th>Dessert</th>
            <td>
              <strong>Bingsu</strong>, shaved milk ice with toppings, is the summer treat, and
              Korea’s café culture is extraordinary. A coffee often costs as much as lunch.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.food}
        title="Food tours and cooking classes"
        intro="A market tour on your first night is the fastest way past the menu problem. After that you will know what to point at."
      />

      <h2 className="sect">Where to start in Seoul</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Gwangjang Market</th>
            <td>
              The famous one, in Jongno. Sit at a stall for bindaetteok fried in front of you,
              mayak (“addictive”) mini kimbap and yukhoe, Korean beef tartare. The food alley stays
              open when the fabric shops close on Sundays.
            </td>
          </tr>
          <tr>
            <th>Tongin Market</th>
            <td>
              Near Gyeongbokgung. Buy brass coins and use them to fill a lunch tray from the stalls,
              the “coin dosirak”. A good lunch after the palace.
            </td>
          </tr>
          <tr>
            <th>Mangwon Market</th>
            <td>
              Near Hongdae and cheaper, where locals shop: fried chicken, croquettes and
              tteokbokki, then a walk to the Han River park.
            </td>
          </tr>
          <tr>
            <th>Dak Hanmari Alley</th>
            <td>
              By Dongdaemun, a lane of restaurants serving whole chicken in broth at the table,
              finished with noodles.
            </td>
          </tr>
          <tr>
            <th>Euljiro and Jongno 3-ga</th>
            <td>
              Plastic stools on the pavement after dark: dried pollack and beer in Nogari Alley,
              and the pojangmacha tent bars by Jongno 3-ga.
            </td>
          </tr>
          <tr>
            <th>Sindang-dong</th>
            <td>
              Tteokbokki Town, where the rice cakes are cooked in a pan at your table with ramen,
              egg and cheese.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'mangwon-market-2592401',
        'euljiro-nogari-alley-3013976',
        'sindang-dong-tteokbokki-town-1838143',
      ]} />

      <h2 className="sect">Vegetarian, vegan and allergies</h2>
      <ul className="tips">
        <li><strong>Vegetarian is harder than it looks.</strong> Kimchi usually contains fish sauce or salted shrimp, and most soups start from anchovy or beef stock. “Gogi ppaego juseyo” means “without meat, please”, but it will not remove the stock.</li>
        <li><strong>Temple food</strong> is fully plant-based and there are temple-food restaurants in Insadong and Jogyesa.</li>
        <li><strong>Halal restaurants</strong> cluster around the Seoul Central Mosque in Itaewon.</li>
        <li><strong>For allergies</strong>, carry a card written in Korean. Peanut, sesame and shellfish turn up in unexpected places.</li>
      </ul>

      <h2 className="sect">Practical notes</h2>
      <ul className="tips">
        <li>Convenience stores are a real meal option: triangle kimbap, instant ramen cooked at the in-store water machine, and banana milk, for a few thousand won.</li>
        <li>Delivery apps need a Korean phone number and payment card. Hotel front desks will often order for you.</li>
        <li>Lunch sets between about 11:30 and 14:00 are the cheapest way to eat well. Many small restaurants close between lunch and dinner.</li>
        <li>For what food costs across a whole trip, see <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>.</li>
      </ul>

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.seoul}
        title="Where to stay in Seoul"
        intro="Jongno and Insadong put you walking distance from the palaces and markets; Myeongdong is central for everything else."
      />

      <p className="strip">
        <Link href="/guides/seoul-nightlife/">Seoul after dark</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/seoul-shopping/">Shopping in Seoul</Link>
        <Link href="/places/restaurants/">Where to eat</Link>
        <Link href="/places/markets/">Traditional markets</Link>
      </p>

      <RelatedGuides href="/guides/korean-food-guide/" />

      <p className="meta">
        Prices are typical for central Seoul in September 2026 and vary by neighbourhood; they are
        lower outside the capital. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
