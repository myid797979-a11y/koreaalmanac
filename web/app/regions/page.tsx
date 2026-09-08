import Link from 'next/link';
import RegionCard from '@/app/components/RegionCard';
import { REGIONS, today } from '@/lib/data';

export const metadata = {
  title: 'Festivals by Region',
  description: 'Festivals in every region of Korea — Seoul, Busan, Jeju and 14 more, with live counts and dates. Updated daily from official tourism data.',
};

export default function RegionsPage() {
  const t = today();
  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Regions</div>
      <h1>Festivals by region</h1>
      <p className="sub">All 17 regions of Korea · counts include festivals happening now or upcoming</p>
      <div className="grid">
        {REGIONS.map(r => <RegionCard key={r} region={r} t={t} />)}
      </div>
    </>
  );
}
