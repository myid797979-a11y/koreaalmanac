import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import { GuideHero, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS } from '@/lib/affiliate';

export const metadata = {
  title: 'DMZ tour from Seoul — what you actually see, which tour, and what you can do on your own',
  description: 'The Paju DMZ day — Imjingak, the Third Tunnel, Dora Observatory — explained honestly: what is inside the tour and what is not, the JSA question, Cheorwon and Goseong as alternatives, and the passport rule that turns people away.',
};

export default function DmzTour() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'DMZ tour from Seoul', path: '/guides/dmz-tour-from-seoul/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/dmz-tour-from-seoul/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › DMZ tour from Seoul
      </div>

      <h1>A DMZ tour from Seoul: what you actually see</h1>
      <p className="sub">
        The Demilitarized Zone is the 4 km-wide strip that has divided the peninsula since the
        1953 armistice, and its southern edge is an hour north of Seoul. You cannot walk into it
        — access beyond the Civilian Control Line is by registered tour or military-run programme
        only — but a day on the edge of it is one of the most memorable things a visitor can do in
        Korea. It helps to know in advance what the day is and is not, because the marketing
        promises more than the border allows.
      </p>

      <GuideHero slugs={[
        'imjingak-resort-pyeonghwa-nuri-park-264487',
        'dorasan-station-1847807',
        'camp-greaves-dmz-experience-center-2376049',
      ]} />

      <div className="callout callout-warn">
        <strong>Before anything else</strong>
        <ul>
          <li><strong>Bring your passport.</strong> Not a photo, not a copy. Soldiers check it at the Civilian Control Line, and tours cannot take you in without it.</li>
          <li><strong>Closed on Mondays</strong> and on some national holidays, and it can close at a day’s notice for military or security reasons. Reputable tours refund when that happens.</li>
          <li><strong>The JSA (Panmunjom), the blue huts, is a different thing.</strong> Tours to the Joint Security Area were suspended in 2023 and access has been intermittent since. If a listing promises the blue huts, check the current status before paying.</li>
        </ul>
      </div>

      <h2 className="sect">The standard Paju day</h2>
      <p>
        Nearly every tour from Seoul runs the same loop in Paju, west of the peninsula, in
        about six hours with hotel pick-up.
      </p>
      <table className="facts">
        <tbody>
          <tr>
            <th>Imjingak</th>
            <td>
              A park and memorial on the south bank of the Imjin River, outside the control line —
              the Freedom Bridge, a bombed steam locomotive, and ribbons left by families separated
              since the war. Anyone can come here on their own; the <strong>Peace Gondola</strong>{' '}
              crosses the river into the control zone for a view north.
            </td>
          </tr>
          <tr>
            <th>Third Infiltration Tunnel</th>
            <td>
              One of four tunnels dug south by North Korea and discovered in 1978. You walk (or take
              a small train) down a steep 350-metre incline to the tunnel itself, in a hard hat,
              stooping in places. <strong>No photographs inside</strong>; lockers are provided.
              The walk back up is harder than it looks.
            </td>
          </tr>
          <tr>
            <th>Dora Observatory</th>
            <td>
              A hilltop looking across the zone to the North Korean propaganda village and the city
              of Kaesong on a clear day. Photography is restricted to behind a marked line; haze
              often shortens the view.
            </td>
          </tr>
          <tr>
            <th>Dorasan Station</th>
            <td>
              The last station on the line north, built for trains to Pyongyang that have never run
              regularly. A strange, quiet, deeply symbolic building.
            </td>
          </tr>
          <tr>
            <th>Camp Greaves</th>
            <td>
              A former US Army base inside the control line, converted into a small museum and
              guesthouse. Included on some tours.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'paju-imjingak-peace-gondola-dmz-peace-gondola-dmz-3491461',
        'odusan-unification-observatory-264489',
      ]} />

      <h2 className="sect">Tour or on your own?</h2>
      <p>
        <strong>Imjingak, the Peace Gondola and Odusan Unification Observatory</strong> you can
        reach independently: Imjingak by the Gyeongui–Jungang Line and a bus, Odusan by bus from
        Hapjeong in Seoul. Everything past the Civilian Control Line — the tunnel, Dora
        Observatory, Dorasan Station — needs a registered tour or the local security tour that
        leaves from Imjingak, which sells a limited number of places each day and requires a
        passport at the ticket desk. For most visitors a <strong>half-day or full-day tour from
        Seoul</strong> is simpler: pick-up, the paperwork, an English-speaking guide, and
        typically ₩50,000–90,000. Tours that add a North Korean defector talk are worth the extra.
      </p>

      <h2 className="sect">Two quieter alternatives</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Cheorwon</th>
            <td>
              Two hours north-east, the “Iron Triangle” of the heaviest fighting of the war: the
              bombed-out shell of the Workers’ Party headquarters, the Second Tunnel, and the
              Seungri Observatory. Fewer visitors, more landscape, and in winter the
              red-crowned cranes on the fields. Best on a tour; public transport is thin.
            </td>
          </tr>
          <tr>
            <th>Goseong</th>
            <td>
              On the east coast north of Sokcho, the Goseong Unification Observatory looks up the
              shore toward Mount Kumgang. It pairs naturally with Seoraksan in the foliage season
              — see the <Link href="/guides/autumn-foliage/">autumn foliage guide</Link>.
            </td>
          </tr>
        </tbody>
      </table>
      <PlaceRow slugs={[
        'cheorwon-facilities-management-office-formerly-iron-triangle-264163',
        'goseong-unification-observatory-264161',
      ]} />

      <h2 className="sect">Practical notes</h2>
      <ul className="tips">
        <li>Wear shoes you can walk a steep slope in; the tunnel is damp and cool all year.</li>
        <li>Dress codes have eased, but some tours still ask you to avoid ripped jeans, camouflage and military-style clothing.</li>
        <li>Children usually need to be at least 6–10 depending on the site; check the tour’s age rule.</li>
        <li>Clear, dry days after rain give the best views north; summer haze and spring yellow dust often hide Kaesong entirely.</li>
      </ul>

      <BookBox
        offers={GUIDE_OFFERS.dmz}
        title="DMZ tours from Seoul"
        intro="Half-day and full-day tours with hotel pick-up; the defector-talk tours are the ones people remember."
      />

      <p className="strip">
        <Link href="/guides/seoul-3-days/">3 days in Seoul</Link>
        <Link href="/regions/gyeonggi/">Everything in Gyeonggi</Link>
        <Link href="/regions/gangwon/">Everything in Gangwon</Link>
        <Link href="/plan/">Trip Planner</Link>
      </p>

      <p className="meta">
        Site access is set by the Ministry of National Defense and the local authorities and changes
        at short notice. The JSA status and the Imjingak security-tour arrangements are as publicly
        announced up to September 2026; check with the tour operator for the day you travel.
        Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
