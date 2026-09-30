import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Korean spas and jjimjilbang: how they work, what to expect, and where to go',
  description: 'A first-timer’s guide to the Korean bathhouse: what happens at the door, the nude bathing floors and the clothed sauna hall, the body scrub, staying the night, tattoos and etiquette, prices, and the best spas in Seoul, Incheon and Busan.',
};

export default function KoreanSpa() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Korean spas and jjimjilbang', path: '/guides/korean-spa-jjimjilbang/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/korean-spa-jjimjilbang/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Korean spas and jjimjilbang
      </div>

      <h1>Korean spas and jjimjilbang: how they work</h1>
      <p className="sub">
        A jjimjilbang is a Korean bathhouse and sauna, open late or all night, where families,
        couples and office workers spend an evening soaking, sweating, eating and sleeping on the
        floor. It is one of the most Korean things you can do, it costs less than a cinema ticket,
        and it is much less intimidating once you know the order of things.
      </p>

      <GuideHero slugs={[
        'spaland-centum-city-1000306',
        'paradise-city-cimer-3108186',
        'aquafield-goyang-3107207',
      ]} />

      <div className="callout">
        <strong>The two halves</strong>
        <ul>
          <li><strong>The bathing floors</strong> are separated by sex and fully nude: hot and cold pools, showers, steam rooms. No swimsuits.</li>
          <li><strong>The jjimjil hall</strong> is shared and clothed, in the loose T-shirt and shorts they give you at the door: dry saunas at different temperatures, an ice room, a snack bar and floor space to lie down.</li>
          <li>You can do only one half. Plenty of visitors skip the baths and just use the saunas and hall.</li>
        </ul>
      </div>

      <h2 className="sect">What happens, in order</h2>
      <ol className="steps">
        <li><strong>Pay at the desk.</strong> You get a key on a wristband, towels and the uniform. The key also runs a tab for anything you buy inside, paid on the way out.</li>
        <li><strong>Shoes first.</strong> Put them in the small locker by the entrance; the wristband key opens it.</li>
        <li><strong>Changing room.</strong> In your own sex’s area, undress completely and lock your things in the main locker.</li>
        <li><strong>Shower before the pools,</strong> properly, with soap, at the rows of seated showers. This is the one rule everyone notices.</li>
        <li><strong>Soak and steam</strong> as long as you like. Tie up long hair and keep the small towel out of the water.</li>
        <li><strong>Put on the uniform</strong> and go up to the shared hall for the saunas, a meal and a rest.</li>
      </ol>

      <h2 className="sect">Inside the jjimjil hall</h2>
      <ul className="tips">
        <li><strong>The kiln saunas</strong> are domed rooms lined with clay, jade, salt or charcoal, at different heats. Sit on a mat and stay only a few minutes in the hottest.</li>
        <li><strong>Sikhye and baked eggs</strong> are the ritual snack: sweet cold rice drink and eggs roasted brown in the kiln. Most halls also serve ramen, noodles and bingsu.</li>
        <li><strong>The towel hat</strong> rolled into two “sheep’s ears” is from a popular drama. You will see it everywhere.</li>
        <li><strong>Staying the night</strong> is allowed at 24-hour places, with a surcharge after late evening. You sleep on mats in the shared hall, with separate quiet rooms at the better spas. It is the cheapest bed in the city, but not a private one.</li>
      </ul>

      <h2 className="sect">The scrub</h2>
      <p>
        On the bathing floor you can pay for a <strong>seshin</strong>, the full-body exfoliating scrub
        done by an attendant with rough mitts, typically ₩20,000–35,000 and booked at the counter
        inside the bath area. Soak for twenty minutes first. It is thorough, a little brutal, and you
        will feel remarkably clean afterwards.
      </p>

      <BookBox
        offers={GUIDE_OFFERS.spa}
        title="Spa tickets"
        intro="Buying entry in advance is usually a little cheaper than the desk, and the big resort spas sell out at weekends."
      />

      <h2 className="sect">Where to go</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Spa Land, Centum City<br /><span className="meta">Busan</span></th>
            <td>
              Inside the Shinsegae department store in Haeundae, and the most polished big spa in the
              country: natural hot-spring water, a long row of themed sauna rooms and an outdoor foot
              bath. The best first jjimjilbang there is.
            </td>
          </tr>
          <tr>
            <th>Paradise City Cimer<br /><span className="meta">Incheon</span></th>
            <td>
              A design-led resort spa beside Incheon Airport with an indoor-outdoor pool. The place to
              spend a long layover or the last evening before an early flight.
            </td>
          </tr>
          <tr>
            <th>Aquafield<br /><span className="meta">Goyang</span></th>
            <td>
              In the Starfield mall north-west of Seoul, with an infinity pool and a large jjimjil
              hall. Swimsuits are worn in the pool area, which makes it easy for mixed groups.
            </td>
          </tr>
          <tr>
            <th>Central Seoul</th>
            <td>
              Neighbourhood jjimjilbang are everywhere. Dragon Hill Spa by Yongsan Station is the
              classic big one with foreigners used to it; Park Habio in Songpa has a water park and
              spa together; Spa Lei in Gangnam is a smart women-only spa.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'park-habio-water-kingdom-water-park-jjimjil-spa-3405270',
        'spa-lei-610302',
        'onyang-hot-springs-264270',
      ]} />

      <h2 className="sect">Etiquette and practical notes</h2>
      <ul className="tips">
        <li><strong>Prices:</strong> roughly ₩12,000–20,000 for a neighbourhood jjimjilbang in Seoul, more for overnight; ₩25,000 upward at the big resort spas.</li>
        <li><strong>Tattoos</strong> are usually tolerated, but some spas refuse large or visible ones. The resort spas are the safest bet.</li>
        <li><strong>No phones or photos</strong> on the bathing floors.</li>
        <li>Keep your voice down in the sleeping areas, and do not lie down in the walkways.</li>
        <li>Hot-spring towns such as Onyang, Suanbo and Bugok have older, simpler spas fed by natural springs, and make an easy winter day trip.</li>
      </ul>

      <p className="strip">
        <Link href="/guides/korea-in-winter/">Korea in winter</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
        <Link href="/guides/incheon-airport-to-seoul/">Incheon Airport to Seoul</Link>
        <Link href="/places/theme-parks/">Theme parks &amp; experiences</Link>
      </p>

      <RelatedGuides href="/guides/korean-spa-jjimjilbang/" />

      <p className="meta">
        Prices are typical in September 2026 and vary by spa, time of day and weekday or weekend.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
