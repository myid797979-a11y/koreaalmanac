import Link from 'next/link';
import SearchResults from './SearchResults';
import { REGIONS } from '@/lib/data';
import { PLACE_CATS } from '@/lib/places';

export const metadata = {
  title: 'Search — places and events across Korea',
  description: 'Search everything on Korea Almanac at once: 2,300+ places to visit, festivals, traditional performances and exhibitions, by name, city or type.',
};

export default function SearchPage() {
  const cats = PLACE_CATS.map(c => ({ slug: c.slug, label: c.label }));

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Search</div>
      <h1>Search</h1>
      <p className="sub">
        Everything at once — places to visit, festivals, traditional performances and
        exhibitions. Search by name, by city, or by the kind of thing you want
        (market, temple, beach).
      </p>
      <SearchResults regions={REGIONS} cats={cats} />
    </>
  );
}
