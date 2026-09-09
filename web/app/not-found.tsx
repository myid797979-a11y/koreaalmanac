import Link from 'next/link';
import { festivals, status, today, MONTHS_FULL, MONTH_SLUGS } from '@/lib/data';

export const metadata = {
  title: 'Page not found',
  description: 'That page does not exist. Browse festivals, concerts and events happening in Korea instead.',
};

export default function NotFound() {
  const t = today();
  const mIdx = Number(t.slice(4, 6)) - 1;
  const live = festivals.filter(f => status(f, t) !== 'ended').length;

  return (
    <div className="overview" style={{ paddingBottom: 32 }}>
      <h1>That page isn&apos;t here</h1>
      <p className="sub">
        The link may be old, or the event may have finished — past festivals and concerts
        drop off the site automatically. There are {live} still to come.
      </p>

      <h2 className="sect">Try one of these</h2>
      <p className="strip">
        <Link href="/events/">What&apos;s on now</Link>
        <Link href={'/events/festivals/' + MONTH_SLUGS[mIdx] + '/'}>{MONTHS_FULL[mIdx]} festivals</Link>
        <Link href="/events/concerts/">Concerts &amp; live music</Link>
        <Link href="/calendar/">Full calendar</Link>
        <Link href="/regions/">Browse by region</Link>
      </p>

      <h2 className="sect">Planning around specific dates?</h2>
      <p>
        The <Link href="/plan/" style={{ textDecoration: 'underline' }}>Trip Planner</Link> takes
        your arrival and departure dates and shows everything happening while you are in Korea.
      </p>
    </div>
  );
}
