import Link from 'next/link';
import {
  places, PLACE_CATS, CAT_GROUPS, placesByCat, placeById, regionsRanked, type PlaceCat,
} from '@/lib/places';
import { NATIONAL_PICKS, rankPlaces } from '@/lib/place-rank';

export const metadata = {
  title: 'Places to Visit in Korea — attractions by type and region',
  description: 'Palaces, temples, hanok villages, mountains, beaches, markets and neighbourhoods across Korea — with photos, maps and practical detail from official tourism data.',
};

/** 표시용 이름 — 괄호 안 한글 원제와 [UNESCO World Heritage] 꼬리표를 뗀다 */
const clean = (t: string) =>
  t.replace(/\s*\([^)]*\)\s*$/, '').replace(/\s*\[[^\]]*\]\s*$/, '').trim();

/** 카테고리 대표 사진 — 그 분류에서 가장 앞에 오는 곳 */
function catThumb(cat: PlaceCat): string | undefined {
  const top = rankPlaces(placesByCat(cat), 'Seoul')[0] ?? placesByCat(cat)[0];
  return top?.image;
}

export default function PlacesHub() {
  const regions = regionsRanked();
  const picks = NATIONAL_PICKS.map(placeById).filter(Boolean);
  const headline = regions.slice(0, 3);
  const rest = regions.slice(3);

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Places</div>
      <h1>Places to visit in Korea</h1>
      <p className="sub">
        {places.length.toLocaleString()} places worth going out of your way for — palaces and
        temples, mountains and coastline, market alleys and observation decks. Everything here
        comes from official Korea Tourism Organization data, with photos and maps.
      </p>

      <h2 className="sect">Start here</h2>
      <p className="intro" style={{ marginTop: -4 }}>
        If it is your first trip, these eight are the ones people come back talking about.
      </p>
      <div className="pickgrid">
        {picks.map(p => (
          <Link key={p!.id} href={'/place/' + p!.slug + '/'} className="pick">
            <img src={p!.image} alt={clean(p!.title) + ', ' + p!.region} loading="lazy" />
            <span className="pk-body">
              <strong>{clean(p!.title)}</strong>
              <span className="pk-rg">{p!.region}</span>
            </span>
          </Link>
        ))}
      </div>

      <h2 className="sect">Where are you going?</h2>
      <div className="regcards">
        {headline.map(r => {
          const top = rankPlaces(places.filter(p => p.region === r.region), r.region)[0];
          return (
            <Link key={r.region} href={'/regions/' + r.region.toLowerCase() + '/'} className="regcard">
              {top && <img src={top.image} alt={'Places to visit in ' + r.region} loading="lazy" />}
              <span className="rc-body">
                <strong>{r.region}</strong>
                <span>{r.n} places</span>
              </span>
            </Link>
          );
        })}
      </div>
      <p className="strip">
        {rest.map(r => (
          <Link key={r.region} href={'/regions/' + r.region.toLowerCase() + '/'}>
            {r.region} ({r.n})
          </Link>
        ))}
      </p>

      <h2 className="sect">What are you into?</h2>
      {CAT_GROUPS.map(g => (
        <section key={g.title} className="catgroup">
          <h3>{g.title}</h3>
          <p className="meta">{g.blurb}</p>
          <div className="catrow">
            {g.cats.map(cat => {
              const meta = PLACE_CATS.find(c => c.cat === cat);
              const n = placesByCat(cat).length;
              if (!meta || n === 0) return null;
              const thumb = catThumb(cat);
              return (
                <Link key={meta.slug} href={'/places/' + meta.slug + '/'} className="cattile">
                  {thumb && <img src={thumb} alt={meta.label + ' in Korea'} loading="lazy" />}
                  <span className="ct-body">
                    <strong>{meta.label}</strong>
                    <span className="ct-n">{n}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <h2 className="sect">Planning around dates?</h2>
      <p>
        Places are always there; festivals and concerts are not. Put your travel dates into the{' '}
        <Link href="/plan/">Trip Planner</Link> to see what is on while you are in Korea, or read a{' '}
        <Link href="/guides/">city guide</Link> for a route that already accounts for closing days.
      </p>

      <section className="about-strip">
        <p>
          <strong>How this list is built:</strong> from the Korea Tourism Organization&apos;s
          English dataset, filtered to places with photographs and a confirmed location.
          Medical-tourism listings and chain-store branches registered under the same categories
          are excluded, so what is left is places you would actually travel to see.
        </p>
      </section>
    </>
  );
}
