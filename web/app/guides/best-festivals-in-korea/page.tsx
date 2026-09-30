import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';
import { festivals, status, dateRange, today } from '@/lib/data';

export const metadata = {
  title: 'Korea’s best festivals: 20 worth planning a trip around, season by season',
  description: 'The Korean festivals worth building a trip around, from the Jinhae cherry blossoms and the Boryeong Mud Festival to the Jinju lanterns, Busan fireworks and the Hwacheon ice-fishing festival. Dates, why each is special, and where to find the rest.',
};

// 날짜는 데이터에서 읽는다 — 다음 회차가 등록되면 저절로 바뀐다. 끝난 회차는 "보통 이맘때" 로 쓴다.
const PICKS: { season: string; items: [string, string][] }[] = [
  { season: 'Spring', items: [
    ['700520', 'The biggest cherry blossom festival in Korea: a naval port town under hundreds of thousands of cherry trees, with the Yeojwacheon stream and Gyeonghwa Station the famous spots.'],
    ['667418', 'Jeju’s fire festival at Saebyeol Oreum, which traditionally set a whole hillside alight to bless the farming year. The burning has been scaled back in recent years for wildfire safety, so check the year’s programme.'],
    ['697182', 'Butterfly gardens, flower fields and hands-on nature in the far south-west, very popular with families.'],
    ['700867', 'The terraced green-tea fields of Boseong at the first picking of the year.'],
    ['292954', 'The bamboo groves of Damyang in their fresh May green, with the Juknokwon forest paths.'],
    ['697189', 'Asia’s biggest mime and physical-theatre festival, ending in an all-night street party.'],
  ] },
  { season: 'Summer', items: [
    ['697135', 'Korea’s most famous summer party: mineral mud slides, mud pools and wrestling on Daecheon Beach. Very international and very messy.'],
    ['697205', 'Fireflies at night in the clean valleys of Muju, in the last warm weeks of summer.'],
  ] },
  { season: 'Autumn', items: [
    ['697123', 'Masked dance-dramas from across Korea and the world, next to the UNESCO village of Hahoe.'],
    ['293155', 'The flat rice plains of Gimje, where the horizon meets the fields, at harvest time.'],
    ['697197', 'Tens of thousands of lanterns on the river below Jinjuseong Fortress. One of the most beautiful sights of the Korean year.'],
    ['1057670', 'The lost Baekje kingdom brought back with processions and lanterns on the river at Gongju and Buyeo.'],
    ['978249', 'King Jeongjo’s royal procession re-enacted at the UNESCO fortress, an hour from Seoul.'],
    ['1718137', 'Gyeongju’s flagship festival among the actual Silla monuments.'],
    ['1675246', 'The coffee town of Gangneung celebrating its roasters by the sea.'],
    ['2874909', 'Fireworks over Yeosu’s famous night sea at the end of October.'],
    ['235076', 'Korea’s biggest fireworks over Gwangalli Beach and the Gwangan Bridge, with a million people watching.'],
  ] },
  { season: 'Winter', items: [
    ['685135', 'Ice fishing for mountain trout through holes in a frozen river, then eating your catch. The best-known winter festival in Korea.'],
    ['661861', 'Ice fishing and snow sledding in the high country of Pyeongchang.'],
    ['679008', 'Snow sculptures and winter games in the Daegwallyeong highlands.'],
  ] },
];

const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function BestFestivals() {
  const t = today();
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Korea’s best festivals', path: '/guides/best-festivals-in-korea/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/best-festivals-in-korea/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Korea’s best festivals
      </div>

      <h1>Korea’s best festivals: 20 worth planning a trip around</h1>
      <p className="sub">
        Korea holds well over a thousand festivals a year, most of them local. These are the ones
        worth crossing the country, or the world, for: the cherry blossoms of spring, the mud of
        summer, the lanterns and fireworks of autumn and the frozen rivers of winter. Each links to
        its full listing with dates, fees and directions.
      </p>

      <div className="callout">
        <strong>How to use this list</strong>
        <ul>
          <li>Dates change every year. Where this year’s festival has already passed, we show when it usually falls; the listing updates when the next dates are announced.</li>
          <li>For everything on during your own dates, use the <Link href="/plan/">Trip Planner</Link> or the <Link href="/calendar/">calendar</Link>.</li>
        </ul>
      </div>

      {PICKS.map(sec => (
        <section key={sec.season}>
          <h2 className="sect">{sec.season}</h2>
          <div className="grid">
            {sec.items.map(([id, why]) => {
              const f = festivals.find(x => x.id === id);
              if (!f) return null;
              const ended = status(f, t) === 'ended';
              const when = ended && f.start
                ? 'Usually ' + MON[Number(f.start.slice(4, 6)) - 1] + ' · last held ' + dateRange(f)
                : dateRange(f);
              return (
                <Link key={id} href={'/festival/' + f.slug + '/'} className="card">
                  <div className="phwrap">
                    {f.image
                      ? <img className="ph" src={f.image} alt="" loading="lazy" />
                      : <div className="noph">{f.region}</div>}
                  </div>
                  <div className="body">
                    <div className="when">{when}</div>
                    <h3>{f.title}</h3>
                    <p className="meta" style={{ margin: '0 0 6px' }}>{f.region}</p>
                    <p className="g-blurb" style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--muted)', margin: 0 }}>{why}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <h2 className="sect">Guides to the big ones</h2>
      <p className="strip">
        <Link href="/guides/jinju-lantern-festival-2026/">Jinju Lantern Festival</Link>
        <Link href="/guides/busan-fireworks-2026/">Busan Fireworks</Link>
        <Link href="/guides/suwon-day-trip/">Suwon Hwaseong Festival</Link>
        <Link href="/guides/cherry-blossom-2027/">Cherry blossom 2027</Link>
        <Link href="/guides/korea-in-winter/">The winter ice festivals</Link>
      </p>

      <BookBox
        offers={GUIDE_OFFERS.itinerary7}
        title="Getting to the festivals"
        intro="Most of these are outside Seoul; the KTX and a rail pass make a festival day trip easy."
      />

      <p className="strip">
        <Link href="/events/festivals/">All festivals</Link>
        <Link href="/calendar/">Festival calendar</Link>
        <Link href="/plan/">Trip Planner</Link>
        <Link href="/guides/korea-7-day-itinerary/">7 days in Korea</Link>
      </p>

      <RelatedGuides href="/guides/best-festivals-in-korea/" />

      <p className="meta">
        Festival dates and details from the Korea Tourism Organization, refreshed daily. Photographs
        supplied with each festival listing.
      </p>
    </div>
  );
}
