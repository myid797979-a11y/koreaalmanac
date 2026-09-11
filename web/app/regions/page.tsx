import Link from 'next/link';
import RegionCard from '@/app/components/RegionCard';
import { REGIONS, today } from '@/lib/data';

export const metadata = {
  title: 'Korea by Region',
  description: 'Every region of Korea — Seoul, Busan, Jeju and 14 more — with what is on now and coming up. Updated daily from official tourism data.',
};

export default function RegionsPage() {
  const t = today();
  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › Regions</div>
      <h1>Korea by region</h1>
      <p className="sub">All 17 regions of Korea — places to visit in each, plus the festivals, concerts and exhibitions on while you are there.</p>
      <div className="grid">
        {REGIONS.map(r => <RegionCard key={r} region={r} t={t} />)}
      </div>
    </>
  );
}
