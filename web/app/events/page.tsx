import Link from 'next/link';
import { festivals, status, today, MONTHS_FULL, MONTH_SLUGS } from '@/lib/data';
import { upcomingConcerts } from '@/lib/concerts';
import { liveCulture } from '@/lib/culture';

export const metadata = {
  title: "What's On in Korea — Festivals, Concerts & Events",
  description: 'Everything on in Korea now and in the months ahead: festivals, concerts, traditional performances and exhibitions, with dates and venues.',
};

export default function EventsHub() {
  const t = today();
  const ongoing = festivals.filter(f => status(f, t) === 'ongoing').length;
  const upcomingFest = festivals.filter(f => status(f, t) === 'upcoming').length;
  const concerts = upcomingConcerts(t);
  const trad = liveCulture('traditional', t);
  const exh = liveCulture('exhibition', t);
  const curM = Number(t.slice(4, 6)) - 1;

  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> › What&apos;s On</div>
      <h1>What&apos;s on in Korea</h1>
      <p className="sub">
        Everything happening by date — {ongoing} festivals running right now,
        {' '}{upcomingFest} more coming up, and {concerts.length} concerts and shows worth
        planning a trip around.
      </p>

      <div className="hubgrid">
        <Link href="/events/festivals/" className="hubcard">
          <span className="hc-n">{festivals.length}</span>
          <h2>Festivals</h2>
          <p>
            Lantern nights, fireworks, harvest fairs and mountain flower seasons across all
            17 regions — from official tourism data, refreshed every morning.
          </p>
          <span className="hc-go">Browse festivals →</span>
        </Link>

        <Link href="/events/concerts/" className="hubcard">
          <span className="hc-n">{concerts.length}</span>
          <h2>Concerts &amp; live music</h2>
          <p>
            K-pop arena tours, year-end awards shows, EDM and indie festivals, plus
            international acts stopping in Korea. Hand-picked, with venue maps.
          </p>
          <span className="hc-go">Browse concerts →</span>
        </Link>

        {trad.length > 0 && (
          <Link href="/events/traditional/" className="hubcard">
            <span className="hc-n">{trad.length}</span>
            <h2>Traditional performance</h2>
            <p>
              Gugak, folk music, mask dance and court music — much of it running as regular
              weekend programmes at national centres, where tickets stay cheap and available.
            </p>
            <span className="hc-go">Browse performances →</span>
          </Link>
        )}

        {exh.length > 0 && (
          <Link href="/events/exhibitions/" className="hubcard">
            <span className="hc-n">{exh.length}</span>
            <h2>Exhibitions</h2>
            <p>
              Museum and gallery shows across the country, including the permanent displays
              at the national museums that are worth building a day around.
            </p>
            <span className="hc-go">Browse exhibitions →</span>
          </Link>
        )}
      </div>

      <h2 className="sect">Browse by month</h2>
      <p className="strip">
        {Array.from({ length: 12 }).map((_, k) => {
          const m = (curM + k) % 12;
          return (
            <Link key={m} href={'/events/festivals/' + MONTH_SLUGS[m] + '/'}>
              {MONTHS_FULL[m]}
            </Link>
          );
        })}
      </p>

      <h2 className="sect">Other ways in</h2>
      <p className="strip">
        <Link href="/plan/">Trip Planner — enter your dates</Link>
        <Link href="/calendar/">Full calendar</Link>
        <Link href="/regions/">By region</Link>
        <Link href="/guides/kpop-tickets/">K-pop ticket guide</Link>
      </p>
    </>
  );
}
