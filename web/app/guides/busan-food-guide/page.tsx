import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'What to eat in Busan: dwaeji gukbap, milmyeon, ssiat hotteok and the fish markets',
  description: 'The dishes Busan is famous for and where to eat them: pork-and-rice soup, cold wheat noodles, seed-filled hotteok, fish cake, raw fish at Jagalchi and Gwangalli, and the market food streets of Nampo and Haeundae.',
};

export default function BusanFood() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'What to eat in Busan', path: '/guides/busan-food-guide/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/busan-food-guide/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › What to eat in Busan
      </div>

      <h1>What to eat in Busan</h1>
      <p className="sub">
        Busan’s food grew out of its port and its war years, when refugees from the north made do
        with what the city had. The result is some of the most distinctive cooking in Korea: rich
        pork soups, cold wheat noodles, the freshest seafood in the country, and the best street
        snacks. Most of it is cheap.
      </p>

      <GuideHero slugs={[
        'jagalchi-market-2382544',
        'gukje-market-food-street-1024670',
        'busan-haeundae-market-1468918',
      ]} />

      <h2 className="sect">The dishes</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Dwaeji gukbap</th>
            <td>
              Busan’s signature: a milky pork-bone soup with slices of pork, poured over rice, and
              seasoned at the table with salted shrimp, chives and chilli paste. Breakfast, lunch or
              a late-night cure.
            </td>
          </tr>
          <tr>
            <th>Milmyeon</th>
            <td>
              Cold wheat noodles in an icy, tangy broth, created by wartime refugees missing the
              buckwheat noodles of the north. A summer essential.
            </td>
          </tr>
          <tr>
            <th>Ssiat hotteok</th>
            <td>
              Fried sweet pancakes split open and stuffed with sunflower and pumpkin seeds, sold
              from stalls around BIFF Square.
            </td>
          </tr>
          <tr>
            <th>Eomuk (fish cake)</th>
            <td>
              Busan made Korean fish cake famous; eat it on a skewer with hot broth from a street
              stall, or browse the bakery-style fish-cake shops.
            </td>
          </tr>
          <tr>
            <th>Raw fish and seafood</th>
            <td>
              Choose your fish at Jagalchi market downstairs and eat it upstairs, or at the raw-fish
              restaurants facing the sea at Gwangalli and Millak.
            </td>
          </tr>
          <tr>
            <th>Dongnae pajeon</th>
            <td>A thick green-onion and seafood pancake from the old Dongnae district, with makgeolli.</td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'hyeongje-jeontong-dwaeji-gukbap-3074034',
        'haeundae-gaya-milmyeon-3078749',
        'biff-square-biff-789805',
      ]} />

      <BookBox
        offers={GUIDE_OFFERS.busanFood}
        title="Busan food tours"
        intro="A guided evening through the Nampo markets covers the snacks in one go; the Visit Busan Pass helps with the sights in between."
      />

      <h2 className="sect">Where to eat</h2>
      <ul className="tips">
        <li><strong>Nampo:</strong> Jagalchi for seafood, Gukje Market’s food street and BIFF Square’s stalls for snacks.</li>
        <li><strong>Seomyeon:</strong> the dwaeji gukbap alley and endless late-night restaurants.</li>
        <li><strong>Haeundae:</strong> Haeundae Market’s food alley just back from the beach.</li>
        <li><strong>Gwangalli and Millak:</strong> raw fish with a view of the bridge.</li>
      </ul>

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.busan}
        title="Where to stay"
        intro="Nampo and Seomyeon put the food streets on your doorstep. See where to stay in Busan for the areas."
      />

      <p className="strip">
        <Link href="/guides/busan-2-days/">2 days in Busan</Link>
        <Link href="/guides/where-to-stay-in-busan/">Where to stay in Busan</Link>
        <Link href="/guides/korean-food-guide/">Eating in Korea</Link>
        <Link href="/regions/busan/">Everything in Busan</Link>
      </p>

      <RelatedGuides href="/guides/busan-food-guide/" />

      <p className="meta">Photographs: Korea Tourism Organization.</p>
    </div>
  );
}
