import Link from 'next/link';
import { places, PLACE_CATS, placesByCat, regionsRanked } from '@/lib/places';

export const metadata = {
  title: 'Places to Visit in Korea — attractions by type and region',
  description: 'Palaces, temples, hanok villages, mountains, beaches, viewpoints and neighbourhoods across Korea — with photos, maps and practical detail from official tourism data.',
};

export default function PlacesHub() {
  const regions = regionsRanked();

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Places</div>
      <h1>Places to visit in Korea</h1>
      <p className="sub">
        {places.length} places worth going out of your way for — palaces and temples,
        mountains and coastline, market alleys and observation decks. Everything here comes
        from official Korea Tourism Organization data, with photos and maps.
      </p>

      <h2 className="sect">By what you want to see</h2>
      <div className="hubgrid">
        {PLACE_CATS.map(c => {
          const n = placesByCat(c.cat).length;
          if (n === 0) return null;
          return (
            <Link key={c.slug} href={'/places/' + c.slug + '/'} className="hubcard">
              <span className="hc-n">{n}</span>
              <h2>{c.label}</h2>
              <p>{c.blurb}</p>
              <span className="hc-go">Browse →</span>
            </Link>
          );
        })}
      </div>

      <h2 className="sect">By region</h2>
      <p className="strip">
        {regions.map(r => (
          <Link key={r.region} href={'/regions/' + r.region.toLowerCase() + '/'}>
            {r.region} ({r.n})
          </Link>
        ))}
      </p>

      <section className="about-strip">
        <p>
          <strong>How this list is built:</strong> from the Korea Tourism Organization&apos;s
          English dataset, filtered to places with photographs and a confirmed location.
          Medical-tourism listings registered under the same category are excluded, so what
          is left is places you would actually travel to see.
        </p>
      </section>
    </>
  );
}
