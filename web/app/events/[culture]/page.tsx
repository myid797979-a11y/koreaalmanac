import Link from 'next/link';
import { notFound } from 'next/navigation';
import { liveCulture, KIND_META, cultureDateRange, isLongRun, type CultureEvent } from '@/lib/culture';
import { today } from '@/lib/data';

const SLUGS: Record<string, CultureEvent['kind']> = {
  traditional: 'traditional',
  exhibitions: 'exhibition',
};

export function generateStaticParams() {
  return Object.keys(SLUGS).map(culture => ({ culture }));
}

export async function generateMetadata({ params }: { params: Promise<{ culture: string }> }) {
  const { culture } = await params;
  const kind = SLUGS[culture];
  if (!kind) return {};
  const meta = KIND_META[kind];
  return kind === 'traditional'
    ? {
        title: 'Traditional Korean Performances — gugak, folk music & dance',
        description: 'Upcoming traditional Korean performances: gugak concerts, folk music, mask dance and court music, with dates, venues and maps. Many run as regular weekend programmes at national institutions.',
      }
    : {
        title: 'Exhibitions in Korea — museums & galleries',
        description: 'Current and upcoming exhibitions at museums and galleries across Korea, including the permanent displays at the national museums. Dates, venues, admission and maps.',
      };
}

function Row({ c }: { c: CultureEvent }) {
  return (
    <article className="cult">
      {c.image
        ? <Link href={'/culture/' + c.slug + '/'} className="cu-ph"><img src={c.image} alt={c.title} loading="lazy" /></Link>
        : <span className="cu-ph cu-noph" aria-hidden="true" />}
      <div className="cu-body">
        <div className="cu-when">
          {cultureDateRange(c)}
          {isLongRun(c) && <span className="cu-tag">Long run</span>}
        </div>
        <h2><Link href={'/culture/' + c.slug + '/'}>{c.title}</Link></h2>
        <p className="cu-place">
          {c.venue ? c.venue + ' · ' : ''}{c.region}{c.district ? ', ' + c.district : ''}
        </p>
      </div>
    </article>
  );
}

export default async function CultureHub({ params }: { params: Promise<{ culture: string }> }) {
  const { culture } = await params;
  const kind = SLUGS[culture];
  if (!kind) notFound();

  const t = today();
  const list = liveCulture(kind, t);
  const meta = KIND_META[kind];
  const isTrad = kind === 'traditional';

  return (
    <>
      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/events/">What&apos;s On</Link> › {isTrad ? 'Traditional' : 'Exhibitions'}
      </div>
      <h1>{isTrad ? 'Traditional Korean performances' : 'Exhibitions in Korea'}</h1>
      <p className="sub">{list.length} on now or coming up · {meta.blurb}</p>

      {isTrad && (
        <p className="intro">
          Korea&apos;s national institutions run traditional performance as a regular
          programme rather than a rare event — the National Gugak Center in Seoul, for
          instance, stages weekend shows most weeks, and provincial centres do the same.
          Tickets are usually inexpensive and seats are rarely a fight, which makes this
          one of the easier authentic experiences to slot into a trip.
        </p>
      )}

      {list.length === 0 ? (
        <div className="ended-banner">
          Nothing listed right now. Try the <Link href="/events/festivals/">festival calendar</Link> or
          {' '}<Link href="/events/concerts/">concerts and live music</Link>.
        </div>
      ) : (
        <div className="cult-list">{list.map(c => <Row key={c.id} c={c} />)}</div>
      )}

      <p className="meta" style={{ marginTop: 18 }}>
        Source: Korea Culture Information Service Agency open data, refreshed daily.
        Korean-language listings are translated here — check the venue&apos;s official page before you go.
      </p>

      <h2 className="sect">More to plan around</h2>
      <p className="strip">
        <Link href="/events/">What&apos;s On</Link>
        <Link href={isTrad ? '/events/exhibitions/' : '/events/traditional/'}>
          {isTrad ? 'Exhibitions' : 'Traditional performances'}
        </Link>
        <Link href="/events/festivals/">Festivals</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>
    </>
  );
}
