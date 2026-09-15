import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card from '@/app/components/Card';
import {
  MONTHS_FULL, MONTH_SLUGS, REGIONS, REGION_MONTH_MIN,
  regionMonthList, targetYear,
} from '@/lib/data';

// 지역×월은 축제 3건 이상인 조합만 생성 (얇은 페이지 방지)
export function generateStaticParams() {
  const params: { hub: string; month: string }[] = [];
  for (const r of REGIONS)
    for (let i = 0; i < 12; i++)
      if (regionMonthList(r, i).length >= REGION_MONTH_MIN)
        params.push({ hub: r.toLowerCase(), month: MONTH_SLUGS[i] });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ hub: string; month: string }> }) {
  const { hub, month } = await params;
  const region = REGIONS.find(r => r.toLowerCase() === hub);
  const mIdx = MONTH_SLUGS.indexOf(month);
  if (!region || mIdx < 0) return {};
  const year = targetYear(mIdx);
  const n = regionMonthList(region, mIdx).length;
  return {
    title: region + ' Festivals in ' + MONTHS_FULL[mIdx] + ' ' + year,
    description: n + ' festivals in ' + region + ' this ' + MONTHS_FULL[mIdx] +
      ' — dates, venues, and admission from official tourism data.',
  };
}

export default async function RegionMonthPage({ params }: { params: Promise<{ hub: string; month: string }> }) {
  const { hub, month } = await params;
  const region = REGIONS.find(r => r.toLowerCase() === hub);
  const mIdx = MONTH_SLUGS.indexOf(month);
  if (!region || mIdx < 0) notFound();
  const list = regionMonthList(region!, mIdx);
  if (list.length < REGION_MONTH_MIN) notFound();
  const year = targetYear(mIdx);

  return (
    <>
      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/events/festivals/">Festivals</Link> › <Link href={'/events/festivals/' + hub + '/'}>{region}</Link> › {MONTHS_FULL[mIdx]}
      </div>
      <h1>{region} Festivals in {MONTHS_FULL[mIdx]} {year}</h1>
      <p className="sub">{list.length} festivals with confirmed dates · updated daily</p>
      <div className="grid">{list.map(f => <Card key={f.id} f={f} />)}</div>
      <p className="strip" style={{ marginTop: 24 }}>
        <Link href={'/events/festivals/' + hub + '/'}>All {region} festivals</Link>
        <Link href={'/events/festivals/' + month + '/'}>All Korea in {MONTHS_FULL[mIdx]}</Link>
      </p>
    </>
  );
}
