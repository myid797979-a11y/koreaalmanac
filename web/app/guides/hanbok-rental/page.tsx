import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'Hanbok rental in Seoul: where, how much, what is included, and free palace entry',
  description: 'Renting hanbok in Korea: the shops by Gyeongbokgung and Bukchon, what two to four hours costs, what is included, traditional versus modern styles, hair and accessories, free entry to the palaces, winter layers, and doing it in Jeonju or Gyeongju instead.',
};

export default function HanbokRental() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Hanbok rental', path: '/guides/hanbok-rental/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/hanbok-rental/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Hanbok rental
      </div>

      <h1>Hanbok rental in Seoul: where, how much, and what you get</h1>
      <p className="sub">
        Hanbok, the traditional Korean dress, is everywhere around the palaces: visitors from all
        over the world rent it by the hour and wander the courtyards in it. It photographs
        beautifully, it gets you into the palaces free, and Koreans welcome foreigners wearing it.
        Here is how renting works.
      </p>

      <GuideHero slugs={[
        'gyeongbokgung-palace-264337',
        'hanboknam-gyeongbokgung-branch-2593860',
        'bukchon-hanok-village-561382',
      ]} />

      <div className="callout">
        <strong>The basics</strong>
        <ul>
          <li><strong>Price:</strong> roughly ₩15,000–30,000 for two to four hours for a standard set; premium silk and designer styles cost more.</li>
          <li><strong>Included:</strong> the skirt or trousers and jacket, a bag, and a locker for your clothes. Hair styling and extra accessories are usually extra.</li>
          <li><strong>Free palace entry:</strong> in hanbok you get into all five Seoul palaces and Jongmyo free.</li>
        </ul>
      </div>

      <h2 className="sect">Where to rent</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>By Gyeongbokgung</th>
            <td>
              The biggest cluster, around Gyeongbokgung and Anguk stations, with shops a few minutes
              from the palace gate. Go early on weekends; the popular shops queue by late morning.
            </td>
          </tr>
          <tr>
            <th>Bukchon and Insadong</th>
            <td>
              Smaller shops between the palaces, several with hair styling included, handy for
              Changdeokgung and the hanok lanes.
            </td>
          </tr>
          <tr>
            <th>Jeonju and Gyeongju</th>
            <td>
              Hanbok is part of the experience in both old towns, and cheaper than Seoul. See{' '}
              <Link href="/guides/jeonju-2-days/">Jeonju</Link> and{' '}
              <Link href="/guides/gyeongju-2-days/">Gyeongju</Link>.
            </td>
          </tr>
        </tbody>
      </table>

      <BookBox
        offers={GUIDE_OFFERS.hanbok}
        title="Book a hanbok rental"
        intro="Booking a set time means no queue for the popular sizes and styles at the weekend."
      />

      <h2 className="sect">Choosing a style</h2>
      <ul className="tips">
        <li><strong>Traditional</strong> sets have a long, full skirt and a short jacket for women, and trousers, jacket and vest for men. These are the ones the palaces mean by hanbok.</li>
        <li><strong>Modern or fusion</strong> styles are shorter, lacier and more colourful. Popular for photos, but palace staff may not count heavily costume-like sets for free entry.</li>
        <li><strong>Royal and court costumes</strong> are offered by some shops for photo shoots.</li>
        <li>Children’s sizes are widely available, and many shops do matching family and couple sets.</li>
      </ul>

      <h2 className="sect">Practical notes</h2>
      <ul className="tips">
        <li>Wear comfortable shoes you do not mind being seen with; most shops rent simple shoes or you keep your own.</li>
        <li>In winter, shops lend padded jackets, fur shawls and hand warmers to wear over the hanbok.</li>
        <li>Check the palace closing days before you book: Gyeongbokgung closes on Tuesdays, Changdeokgung on Mondays. See the <Link href="/guides/seoul-palaces/">palaces guide</Link>.</li>
        <li>Return on time; late returns are charged by the hour.</li>
      </ul>
      <PlaceRow slugs={[
        'changdeokgung-palace-complex-unesco-world-heritage-site-264348',
        'deoksugung-palace-264316',
        'namsangol-hanok-village-264116',
      ]} />

      <p className="strip">
        <Link href="/guides/seoul-palaces/">Seoul’s five palaces</Link>
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/guides/seollal-2027/">Seollal 2027</Link>
        <Link href="/regions/seoul/">Everything in Seoul</Link>
      </p>

      <RelatedGuides href="/guides/hanbok-rental/" />

      <p className="meta">
        Prices are typical in September 2026 and vary by shop and style. Photographs: Korea Tourism
        Organization.
      </p>
    </div>
  );
}
