import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Seoul’s traditional markets: what to eat at each, and when to go',
  description: 'Gwangjang, Namdaemun, Tongin, Mangwon, Gyeongdong and the Noryangjin fish market: what each is known for, the dish to order, opening hours and closing days, and how to eat at a market stall.',
};

export default function SeoulMarkets() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Seoul’s markets', path: '/guides/seoul-markets/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/seoul-markets/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Seoul’s markets
      </div>

      <h1>Seoul’s traditional markets: what to eat at each</h1>
      <p className="sub">
        Seoul’s covered markets are where the city eats cheaply and well, and each is known for
        something different. You sit at a stall counter, point, and the food is made in front of
        you. These are the ones worth crossing the city for.
      </p>

      <GuideHero slugs={[
        'gwangjang-market-273761',
        'mangwon-market-2592401',
        'tongin-market-1823985',
      ]} />

      <div className="callout">
        <strong>How to eat at a market</strong>
        <ul>
          <li><strong>Sit where there is space</strong> at a stall counter, and point at what you want; many stalls have picture menus.</li>
          <li><strong>Bring cash</strong> for the smallest stalls, though most now take cards.</li>
          <li><strong>Many market shops close one day a week</strong>, often Sunday; the food stalls usually stay open.</li>
        </ul>
      </div>

      <table className="facts">
        <tbody>
          <tr>
            <th>Gwangjang Market<br /><span className="meta">Jongno 5-ga</span></th>
            <td>
              The famous one: bindaetteok mung-bean pancakes fried in front of you, mayak mini
              kimbap and yukhoe beef tartare, with makgeolli. Busiest in the evening.
            </td>
          </tr>
          <tr>
            <th>Namdaemun Market<br /><span className="meta">Hoehyeon</span></th>
            <td>
              The biggest and oldest general market, a maze of clothes, kitchenware and ginseng,
              with an alley of kalguksu noodle stalls and hotteok stands. Mornings are best; many
              shops close on Sundays.
            </td>
          </tr>
          <tr>
            <th>Tongin Market<br /><span className="meta">Gyeongbokgung</span></th>
            <td>
              The coin lunch box: buy brass coins and fill a tray from the stalls, with oil
              tteokbokki as the local speciality. Right after the palace.
            </td>
          </tr>
          <tr>
            <th>Mangwon Market<br /><span className="meta">Mangwon · near Hongdae</span></th>
            <td>
              Where locals shop: cheap fried chicken, croquettes and fruit, then a walk to the Han
              River park at the end of the road.
            </td>
          </tr>
          <tr>
            <th>Gyeongdong Market<br /><span className="meta">Jegi-dong</span></th>
            <td>
              The herbal-medicine market, with ginseng, dried roots and a Starbucks in an old
              cinema. Unlike anywhere else in the city.
            </td>
          </tr>
          <tr>
            <th>Noryangjin Fish Market<br /><span className="meta">Noryangjin</span></th>
            <td>
              Choose live seafood downstairs, then have it prepared as raw fish or stew in the
              restaurants upstairs, paying a small table charge. Best at lunch or dinner.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.food}
        title="Market food tours"
        intro="A guided night at Gwangjang is the easiest way past the ordering problem on your first evening."
      />

      <PlaceRow slugs={[
        'starbucks-gyeongdong-market-1960-3046389',
        'dongdaemun-dak-hanmari-alley-2590278',
        'sindang-dong-tteokbokki-town-1838143',
      ]} />

      <h2 className="sect">After dark: night markets</h2>
      <ul className="tips">
        <li><strong>Myeongdong street food</strong> sets up from late afternoon along the main shopping streets: grilled lobster tails, egg bread, tornado potatoes and skewers, at tourist prices.</li>
        <li><strong>Gwangjang Market</strong> is at its liveliest in the evening, when the pancake stalls are packed with office workers.</li>
        <li><strong>Dongdaemun</strong>’s fashion malls trade late into the night, and the Dak Hanmari alley serves until after midnight.</li>
        <li><strong>Seoul Bamdokkaebi Night Market</strong> is a seasonal weekend market of food trucks and craft stalls, usually from spring to autumn at Yeouido and other Han River sites. Check the current season’s dates. See <Link href="/guides/han-river-parks/">the Han River parks</Link>.</li>
      </ul>

      <p className="strip">
        <Link href="/guides/korean-food-guide/">Eating in Korea</Link>
        <Link href="/guides/seoul-shopping/">Shopping in Seoul</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
        <Link href="/places/markets/">All traditional markets</Link>
      </p>

      <RelatedGuides href="/guides/seoul-markets/" />

      <p className="meta">
        Opening hours and closing days vary by stall; the food streets generally keep longer hours
        than the shops. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
