import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';
import { upcomingConcerts, concertDateRange } from '@/lib/concerts';
import { festivals, dateRange, today } from '@/lib/data';

export const metadata = {
  title: 'Seoul in December 2026: weather, Christmas lights, the Lantern Festival and what’s on',
  description: 'What Seoul is like in December 2026: around 4°C by day and below freezing at night, the Seoul Lantern Festival and Gwanghwamun Market from 11 December, SBS Gayo Daejeon on 24–25 December, ski resorts opening, Christmas on a Friday, and the concerts and festivals on through the month.',
};

const FROM = '20261201', TO = '20261231';
const NEAR_SEOUL = ['Seoul', 'Gyeonggi', 'Incheon'];
const days = (a: string, b: string) =>
  (Date.UTC(+b.slice(0, 4), +b.slice(4, 6) - 1, +b.slice(6, 8)) - Date.UTC(+a.slice(0, 4), +a.slice(4, 6) - 1, +a.slice(6, 8))) / 86400000;

export default function SeoulInDecember() {
  const t = today();
  // 이 목록은 데이터에서 매일 다시 만든다 — 12월 공연·축제가 등록되는 대로 늘어난다.
  // 12월은 킨텍스(경기)·인스파이어(인천) 공연이 많아 서울 근교까지 넣는다.
  const shows = upcomingConcerts(t).filter(c => NEAR_SEOUL.includes(c.region) && c.start <= TO && c.end >= FROM);
  const fests = festivals
    .filter(f => f.region === 'Seoul' && f.start && f.start <= TO && (f.end ?? f.start) >= FROM && days(f.start, f.end ?? f.start) <= 75)
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''));
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Seoul in December', path: '/guides/seoul-in-december/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/seoul-in-december/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Seoul in December
      </div>

      <h1>Seoul in December 2026</h1>
      <p className="sub">
        December is when Seoul switches on. The first half of the month is cold, quiet and cheap;
        from 11 December the Lantern Festival, Gwanghwamun Market and the light shows fill the
        centre every evening, and the last ten days — Christmas on a Friday, the year-end K-pop
        shows and New Year’s Eve — are the busiest of the winter.
      </p>

      <GuideHero slugs={[
        'cheonggyecheon-stream-897540',
        'myeongdong-cathedral-264138',
        'gwanghwamun-square-929909',
      ]} />

      <div className="callout">
        <strong>December at a glance</strong>
        <ul>
          <li><strong>Weather:</strong> around 4°C by day and −4°C at night, dry and often clear, with a handful of days of light snow. The wind off the Han makes it feel colder than the number.</li>
          <li><strong>What’s on:</strong> the Seoul Lantern Festival (11 December – 31 January), Gwanghwamun Market (11 December – 10 January), Seoul Light Gwanghwamun, the SBS Gayo Daejeon (24–25 December) and the Bosingak bell on New Year’s Eve.</li>
          <li><strong>Closures:</strong> one public holiday, Christmas Day (Friday 25 December). Almost everything a visitor wants stays open; the usual palace and museum closing days still apply.</li>
          <li><strong>Busy dates:</strong> the 24th–25th and the 31st. Book restaurants, ski trips and trains out of Seoul for those days well ahead.</li>
        </ul>
      </div>

      <h2 className="sect">What makes December worth it</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>The lights</th>
            <td>
              The <strong>Seoul Lantern Festival</strong> fills the Cheonggyecheon stream with lit
              sculptures from <strong>11 December to 31 January</strong>, 18:00–23:00.{' '}
              <strong>Gwanghwamun Market</strong> runs on the square above it from{' '}
              <strong>11 December to 10 January</strong>, and Seoul Light Gwanghwamun projects onto
              the palace gate. All are free and within ten minutes’ walk of each other; go on a
              weeknight after 19:00. Details in{' '}
              <Link href="/guides/christmas-new-year-seoul/">Christmas and New Year in Seoul</Link>.
            </td>
          </tr>
          <tr>
            <th>Seoul Winter Festa</th>
            <td>
              The city bundles the lights, the market and the New Year countdowns under one name,
              Seoul Winter Festa. The 2026 programme had not been published when this guide was
              written; last winter it opened with a parade on Gwanghwamun Square and ended with
              countdowns at Bosingak and DDP. We will add the 2026 details when the city announces them.
            </td>
          </tr>
          <tr>
            <th>Year-end K-pop shows</th>
            <td>
              The <strong>SBS Gayo Daejeon</strong> is on <strong>24 and 25 December</strong> at KINTEX
              in Ilsan this year — two nights for its 30th edition. KBS and MBC had not announced
              their 2026 dates; traditionally KBS is in the second half of December and MBC on New
              Year’s Eve. See <Link href="/guides/kpop-award-shows/">K-pop award shows</Link> for how
              tickets and audience places work.
            </td>
          </tr>
          <tr>
            <th>Skiing near Seoul</th>
            <td>
              The resorts an hour or two from Seoul — Konjiam, Vivaldi Park, Elysian Gangchon — usually
              open in late November or early December as soon as it is cold enough to make snow; the
              big Gangwon resorts follow. 2026–27 opening dates had not been announced in early
              November. See <Link href="/guides/skiing-in-korea/">skiing in Korea</Link> for day trips
              and shuttle buses.
            </td>
          </tr>
          <tr>
            <th>New Year’s Eve</th>
            <td>
              Seoul marks midnight with the Bosingak bell rather than fireworks. Where to stand, how
              late the subway runs and the sunrise spots for 1 January are in{' '}
              <Link href="/guides/seoul-new-years-eve/">New Year’s Eve in Seoul</Link>.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">Hotels and prices</h2>
      <p>
        The first ten days of December are one of the cheapest stretches of the year in Seoul. Prices
        climb from mid-month as the lights open and are at their highest over Christmas weekend and
        New Year’s Eve, when Myeongdong, Jongno and Gwanghwamun hotels — the ones within walking
        distance of the bell and the lantern festival — fill first. If your dates are flexible,
        arrive early in the month and leave before the 24th.
      </p>

      {shows.length > 0 && (
        <>
          <h2 className="sect">Concerts in and near Seoul in December</h2>
          <ul className="agenda">
            {shows.map(c => (
              <li key={c.id}>
                <span className="ad">{concertDateRange(c)}</span>
                <Link href={'/concert/' + c.id + '/'}>
                  {c.artist === 'Various artists' || c.title.toLowerCase().includes(c.artist.toLowerCase()) ? c.title : c.artist + ': ' + c.title}
                </Link>
                <span className="meta"> · {c.venue}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {fests.length > 0 && (
        <>
          <h2 className="sect">Festivals and events</h2>
          <ul className="agenda">
            {fests.map(f => (
              <li key={f.id}>
                <span className="ad">{dateRange(f)}</span>
                <Link href={'/festival/' + f.slug + '/'}>{f.title}</Link>
              </li>
            ))}
          </ul>
          <p className="meta">More December events are added as organisers register them. See <Link href="/events/festivals/december/">all festivals in December</Link>.</p>
        </>
      )}

      <h2 className="sect">When it is too cold to be outside</h2>
      <p>
        Seoul is built for winter indoors: a{' '}
        <Link href="/guides/korean-spa-jjimjilbang/">jjimjilbang</Link> for an evening, the
        underground malls at COEX and Starfield Library, the observation deck at Lotte World Tower on
        a clear cold day, and the museums. Our{' '}
        <Link href="/guides/rainy-day-seoul/">rainy-day Seoul</Link> list works just as well for a
        freezing one.
      </p>
      <PlaceRow slugs={[
        'lotte-world-tower-seoul-sky-2493015',
        'starfield-library-2642344',
        'bosingak-belfry-264135',
      ]} />

      <h2 className="sect">What to pack</h2>
      <ul className="tips">
        <li>A proper winter coat, hat and gloves — evenings at the lantern festival mean standing still outside below freezing.</li>
        <li>Thermal layers you can take off: shops, subways and restaurants are heated hard.</li>
        <li>Shoes with grip for icy pavements on the hills of Bukchon and Namsan.</li>
        <li>Hand cream and lip balm: the air is very dry. Disposable hand warmers are sold in every convenience store.</li>
      </ul>

      <BookBox
        offers={GUIDE_OFFERS.christmas}
        title="Book ahead"
        intro="The Garden of Morning Calm light festival trip, plus the data and airport-train tickets worth sorting before you land."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.seoul}
        title="Where to stay"
        intro="For the lights and the bell, stay around Jongno, Gwanghwamun or Myeongdong — and book the 24th and 31st early."
      />

      <p className="strip">
        <Link href="/events/festivals/december/">Korea in December</Link>
        <Link href="/seoul-this-weekend/">Seoul this weekend</Link>
        <Link href="/guides/korea-in-winter/">Korea in winter</Link>
        <Link href="/guides/where-to-stay-in-seoul/">Where to stay in Seoul</Link>
      </p>

      <RelatedGuides href="/guides/seoul-in-december/" />

      <p className="meta">
        Checked November 2026. Weather figures are Seoul 1991–2020 averages. Lantern Festival and
        Gwanghwamun Market dates from the festival’s official site (stolantern.com) and the Seoul
        Tourism Organization; SBS Gayo Daejeon dates as announced by SBS. KBS and MBC year-end shows,
        the Seoul Winter Festa programme and ski-resort opening dates had not been announced. Concert
        and festival lists update daily from our listings. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
