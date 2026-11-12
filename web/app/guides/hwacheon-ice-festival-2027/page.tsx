import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import RelatedGuides from '@/app/components/RelatedGuides';
import { GuideHero, FestivalRow, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: 'Hwacheon Sancheoneo Ice Festival 2027 — 9 to 31 January: ice fishing, prices, getting there from Seoul',
  description: 'Hwacheon Sancheoneo Ice Festival, 9–31 January 2027: ice fishing for mountain trout, the foreigners’ fishing zone, what it costs, what to wear at −15 °C, and how to get there from Seoul by bus or shuttle.',
};

export default function HwacheonIce2027() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: 'Hwacheon Ice Festival 2027', path: '/guides/hwacheon-ice-festival-2027/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/hwacheon-ice-festival-2027/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › Hwacheon Ice Festival 2027
      </div>

      <h1>Hwacheon Sancheoneo Ice Festival 2027: how to do it from Seoul</h1>
      <p className="sub">
        <strong>9 to 31 January 2027</strong>, on the frozen Hwacheoncheon stream in Gangwon
        Province, about two hours north-east of Seoul. You sit over a hole in the ice with a short
        rod and try to catch <em>sancheoneo</em>, a mountain trout; then you take what you caught to
        the grill tent and eat it. It sounds like a niche pastime and draws over a million visitors
        a year, and it is one of the few Korean festivals with a section run specifically for
        foreign visitors.
      </p>

      <GuideHero slugs={[
        'paroho-lake-hwacheon-793179',
        'peace-dam-hwacheon-1761490',
      ]} />

      <div className="callout">
        <strong>2027 at a glance</strong>
        <ul>
          <li><strong>Dates:</strong> Saturday 9 January to Sunday 31 January 2027, 23 days, as announced by the organisers.</li>
          <li><strong>Hours:</strong> fishing 09:00–18:00 (tickets until 17:00); night fishing on some days, 18:00–21:00.</li>
          <li><strong>Price:</strong> ₩15,000 for the fishing ticket in 2026, of which ₩5,000 came back as a voucher for local produce. Hwacheon County has said it plans to raise the ticket for 2027 and return more of it as vouchers; the final figure had not been published in November 2026.</li>
          <li><strong>Catch limit:</strong> three fish per person.</li>
          <li><strong>The ice decides:</strong> the festival only opens when the stream ice is thick enough to hold the crowds. In mild winters the opening has been postponed — check the official site the week before you go.</li>
        </ul>
      </div>

      <h2 className="sect">What you actually do</h2>
      <table className="facts">
        <tbody>
          <tr><th>Ice fishing</th><td>The main event. The stream is divided into grids of pre-drilled holes; you sit on a stool (bring something to sit on, or buy a cushion at the stalls) and jig a short lure rod. Rods and lures are sold cheaply on site. Fish are stocked, so most people catch something within an hour or two — but not everyone.</td></tr>
          <tr><th>Bare-hand catching</th><td>The photo you have seen: people in shorts and T-shirts wading into an icy pool to grab trout by hand, then stuffing them down their shirts. Aged 14 and over, a few sessions a day, same price as a fishing ticket. Changing rooms and hot showers are next to it. Entertaining to watch even if you do not do it.</td></tr>
          <tr><th>Eating your catch</th><td>Take your fish to the grill area: ₩3,000 a fish to have it salt-grilled (about 20 minutes), the same to have it sliced raw. They only cook fish caught at the festival — you cannot buy trout to grill.</td></tr>
          <tr><th>Everything else</th><td>Ice sledding (₩5,000 an hour), snow sledding and a bobsled run (₩5,000 each), the zip line over the stream, skating, and a huge indoor ice-sculpture hall in town (₩5,000). Most give back part of the price as Hwacheon gift vouchers you can spend at the stalls and in local shops.</td></tr>
        </tbody>
      </table>
      <FestivalRow slugs={['hwacheon-sancheoneo-ice-festival-685135']} />

      <h2 className="sect">The foreigners’ fishing zone</h2>
      <p>
        Hwacheon runs a separate <strong>ice-fishing area for foreign visitors</strong>, downstream
        of the suspension bridge, open every day of the festival with its own ticket booth, a warm
        rest area, a Muslim prayer room and its own grill station. It holds over a thousand people at
        once and is far calmer than the main grids at weekends. Bring your passport — it is how you
        get in. In 2026 the catch limit there was also three fish, and foreign passport holders were
        on the reduced-price list for the main tickets. The organisers’ global marketing team answers
        questions on +82 33-440-2328.
      </p>
      <p>
        The main grids can be booked in advance through Korean ticketing sites, which is fiddly
        without a Korean phone number. For most visitors the foreigners’ zone, or a shuttle package
        that includes its ticket, is the easier route.
      </p>

      <h2 className="sect">Getting there from Seoul</h2>
      <table className="facts">
        <tbody>
          <tr>
            <th>Shuttle package</th>
            <td>
              Foreigner-only shuttle buses run daily through the festival from central Seoul (usually
              Hongik University and Myeongdong stations), with the fishing ticket included. This is
              the simplest way: about <strong>2 hours 30</strong> each way, no transfers, and you
              do not have to read a Korean bus timetable. Book a few days ahead for weekends.
            </td>
          </tr>
          <tr>
            <th>Intercity bus</th>
            <td>
              Direct buses from <strong>Dong Seoul Bus Terminal</strong> (Gangbyeon station, line 2)
              to Hwacheon run through the day, about <strong>2 hours to 2 hours 30</strong>. The
              festival site is a 10-minute walk from Hwacheon terminal. Buy the return ticket as
              soon as you arrive — afternoon buses back fill up at weekends.
            </td>
          </tr>
          <tr>
            <th>Train + bus</th>
            <td>
              ITX-Cheongchun from Yongsan or Cheongnyangni to Chuncheon (about an hour), then an
              intercity bus from Chuncheon to Hwacheon (about 50 minutes). Worth it only if you are
              staying in Chuncheon or combining with Nami Island.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="sect">What to wear</h2>
      <p>
        Hwacheon is one of the coldest places in South Korea. Expect around <strong>−3 °C by day and
        −15 °C or lower at night and early morning</strong>, and sitting still on ice makes it feel
        colder. Thermal base layers, a long padded coat, a hat that covers your ears, waterproof
        boots with thick socks, and two pairs of gloves — thin ones for handling the line, thick ones
        over them. Heat packs (<em>hatpaek</em>) from any convenience store go in your boots and
        pockets. Your phone battery will drain fast; keep it inside your coat.
      </p>

      <h2 className="sect">Weekday or weekend</h2>
      <p>
        Weekdays. The opening weekend and every Saturday and Sunday are packed, with long queues
        for the grills and the bare-hand sessions, and the roads back to Seoul jam in the late
        afternoon. On a weekday you can get a good spot on the ice at 09:00 and be on a bus back by
        mid-afternoon. Night fishing (18:00–21:00) is mainly for people staying overnight in
        Hwacheon, who get passes with their room receipt.
      </p>

      <h2 className="sect">Combining it with something else</h2>
      <p>
        <strong>Nami Island</strong> is on the way, in the river at Gapyeong, and the classic
        combination is Hwacheon in the morning and Nami in the afternoon — easiest on a tour. The{' '}
        <strong>Garden of Morning Calm</strong> lights its hillside every winter evening and is
        another popular second stop. If you want a second ice-fishing festival, the{' '}
        <strong>Pyeongchang Trout Festival</strong> on the Odaecheon stream runs through January
        too, and suits anyone already heading to the ski resorts.
      </p>
      <PlaceRow slugs={['nami-island-264244', 'paroho-lake-hwacheon-793179']} />
      <FestivalRow slugs={['pyeongchang-trout-festival-661861']} />

      <BookBox
        offers={GUIDE_OFFERS.winterIce}
        title="Let someone else do the bus"
        intro="Day tours from Seoul include the transport and usually the fishing ticket; some add Nami Island or the Garden of Morning Calm lights."
      />
      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.winterSki}
        title="Staying near the ice"
        intro="Hwacheon has a few small hotels and pensions; Pyeongchang suits a ski-and-fishing trip."
      />

      <p className="strip">
        <Link href="/guides/korea-in-winter/">Korea in winter</Link>
        <Link href="/guides/skiing-in-korea/">Skiing in Korea</Link>
        <Link href="/guides/nami-island-day-trip/">Nami Island day trip</Link>
        <Link href="/events/festivals/january/">Korea in January</Link>
        <Link href="/events/festivals/gangwon/">All Gangwon festivals</Link>
      </p>

      <RelatedGuides href="/guides/hwacheon-ice-festival-2027/" />

      <p className="meta">
        Dates are as announced by the organisers for 2027 (narafestival.com) and registered with the
        Korea Tourism Organization. Prices are the 2026 figures from the official fee table; Hwacheon
        County announced in October 2026 that it plans to raise the fishing ticket for 2027 and return
        more of it in vouchers, and the 2027 table had not been published when this guide was checked
        in November 2026. Foreigners’ zone details from the official festival site (2026 edition).
        Bus times are typical. Photographs: Korea Tourism Organization.
      </p>
    </div>
  );
}
