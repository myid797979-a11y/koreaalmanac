import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Where to stay in Seoul: the best neighbourhoods for a first visit, nightlife, K-pop and day trips',
  description: 'Myeongdong, Jongno and Insadong, Hongdae, Gangnam, Seongsu, Itaewon, Dongdaemun, Jamsil and Seoul Station compared: what each is good for, what to watch out for, and how it connects to the airport and the sights.',
};

export default function WhereToStaySeoul() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Where to stay in Seoul', path: '/guides/where-to-stay-in-seoul/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/where-to-stay-in-seoul/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Where to stay in Seoul
      </div>

      <h1>Where to stay in Seoul: the neighbourhoods compared</h1>
      <p className="sub">
        Seoul is huge, and the river splits it into an older half north of the Han, with the palaces
        and markets, and a newer, richer half south of it. The subway is excellent, so no choice is a
        mistake, but the right neighbourhood can save you an hour a day. Choose by what you will do
        in the evenings and how you are arriving.
      </p>

      <GuideHero slugs={[
        'myeong-dong-264312',
        'ikseon-dong-hanok-street-2943972',
        'yeouido-hangang-park-1064767',
      ]} />

      <div className="callout">
        <strong>The short answer</strong>
        <ul>
          <li><strong>First visit:</strong> Myeongdong, or Jongno and Insadong if the palaces are the point.</li>
          <li><strong>Nightlife on a budget:</strong> Hongdae, with a direct train from the airport.</li>
          <li><strong>K-pop and concerts:</strong> Jamsil or Gangnam for the east-side venues; Hongdae for the small live clubs.</li>
          <li><strong>Lots of day trips:</strong> Seoul Station, where the KTX, the airport railway and Line 1 all meet.</li>
        </ul>
      </div>

      <h2 className="sect">North of the river</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Myeongdong<br /><span className="meta">Line 4 · airport bus</span></th>
            <td>
              The classic first-visit base: shopping streets, cosmetics, street food, and every chain
              hotel, with Namsan and the N Seoul Tower above. Walkable to City Hall and Deoksugung,
              one stop from Seoul Station. Crowded, touristy and a little soulless at night, but
              nothing is inconvenient from here.
            </td>
          </tr>
          <tr>
            <th>Jongno, Insadong and Ikseon-dong<br /><span className="meta">Lines 1, 3 and 5</span></th>
            <td>
              The old centre, between the palaces: tea houses, craft shops, Ikseon-dong’s tiny hanok
              lanes and the best choice of <strong>hanok guesthouses</strong>, where you sleep on a
              heated floor in a traditional house. Quieter in the evening than Myeongdong. See the{' '}
              <Link href="/guides/seoul-palaces/">palaces guide</Link>.
            </td>
          </tr>
          <tr>
            <th>Hongdae and Yeonnam<br /><span className="meta">Line 2 · AREX</span></th>
            <td>
              The university district: clubs, live music, cheap food and street performers, and
              Yeonnam-dong’s cafés next door. Hongik University Station is on the airport railway, so
              you can arrive without a change. Loud until late on weekends; pick a hotel on a side
              street.
            </td>
          </tr>
          <tr>
            <th>Dongdaemun<br /><span className="meta">Lines 1, 2, 4 and 5</span></th>
            <td>
              Night markets, fashion malls and Dongdaemun Design Plaza, with good-value hotels and
              four subway lines. Handy for Jangchung Arena and an easy run to the palaces.
            </td>
          </tr>
          <tr>
            <th>Itaewon and Hannam<br /><span className="meta">Line 6</span></th>
            <td>
              The international neighbourhood: bars, restaurants from everywhere, and Hannam-dong’s
              galleries and boutiques. Hilly, and on Line 6, which is slower to reach the rest of
              the city.
            </td>
          </tr>
          <tr>
            <th>Seoul Station<br /><span className="meta">Lines 1 and 4 · AREX · KTX</span></th>
            <td>
              Not charming, but the most practical base in the country: the AREX express to Incheon,
              the KTX to Busan, Gyeongju and Gangneung, and a walk to Namdaemun Market.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'insadong-cultural-street-3075115',
        'dongdaemun-history-culture-park-1924956',
        'itaewon-shopping-street-273721',
      ]} />

      <h2 className="sect">South of the river</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Gangnam and COEX<br /><span className="meta">Lines 2, 9 and Sinbundang</span></th>
            <td>
              The polished business and shopping district: department stores, Starfield COEX, the
              big entertainment agencies, and the most expensive hotels. It is 30–40 minutes from the
              palaces, so better for a second visit or a K-pop trip than a first one.
            </td>
          </tr>
          <tr>
            <th>Seongsu<br /><span className="meta">Line 2</span></th>
            <td>
              The fashionable one, on the river east of the centre: warehouse cafés, concept stores
              and pop-ups. Few big hotels, but good small ones, and one of the best neighbourhoods to
              wander. See the <Link href="/guides/seoul-shopping/">shopping guide</Link>.
            </td>
          </tr>
          <tr>
            <th>Jamsil<br /><span className="meta">Lines 2 and 8</span></th>
            <td>
              Lotte World, the Lotte World Tower and Olympic Park. The base for concerts at the KSPO
              Dome and the other Olympic Park halls, and for families.
            </td>
          </tr>
          <tr>
            <th>Yeouido<br /><span className="meta">Lines 5 and 9</span></th>
            <td>
              The island of banks and broadcasters in the Han, with the riverside park, The Hyundai
              Seoul department store and the cherry blossom road in April. Quiet at weekends.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.seoul}
        title="Hotels in Seoul"
        intro="Filter the map by the neighbourhood you have chosen above; prices rise sharply for concert weekends and the cherry blossom week."
      />

      <h2 className="sect">Practical notes</h2>
      <ul className="tips">
        <li><strong>Check the nearest station and its line.</strong> A hotel ten minutes from a transfer station beats one next to a single-line station.</li>
        <li><strong>Rooms are small</strong> in the mid-range, and many Korean hotels have glass-walled bathrooms. Read the room description.</li>
        <li><strong>Hanok stays</strong> in Jongno and Bukchon are memorable for a night or two, but usually have shared or small bathrooms and floor bedding.</li>
        <li><strong>Concert weekends</strong> fill the hotels around the venue first. The <Link href="/venues/">venue guides</Link> say which area to stay in for each.</li>
        <li>Coming from the airport, see <Link href="/guides/incheon-airport-to-seoul/">Incheon Airport to Seoul</Link> for which train or bus suits each area.</li>
      </ul>

      <BookBox
        offers={GUIDE_OFFERS.venueArrival}
        title="Before you land"
        intro="Data on arrival and the fastest train in make any neighbourhood easy to reach."
      />

      <p className="strip">
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/seoul-nightlife/">Seoul after dark</Link>
        <Link href="/guides/korea-on-a-budget/">Korea on a budget</Link>
        <Link href="/regions/seoul/">Everything in Seoul</Link>
      </p>

      <RelatedGuides href="/guides/where-to-stay-in-seoul/" />

      <p className="meta">
        Subway lines as of September 2026. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
