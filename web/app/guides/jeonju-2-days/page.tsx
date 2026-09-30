import Link from 'next/link';
import { breadcrumbJsonLd, ldStr } from '@/lib/jsonld';
import GuideLd from '@/app/components/GuideLd';
import { GuideHero, Stop, DayHead, PlaceRow } from '@/app/components/GuideBits';
import BookBox from '@/app/components/BookBox';
import { GUIDE_OFFERS, GUIDE_STAY } from '@/lib/affiliate';

export const metadata = {
  title: '2 days in Jeonju — the hanok village, bibimbap and a night in a traditional house',
  description: 'A 2-day Jeonju itinerary: the largest hanok village in Korea, Gyeonggijeon and the Joseon founder’s portrait, Jeondong Cathedral, the Nambu Market night market, makgeolli alleys, and why you should stay the night in a hanok. With the KTX from Seoul.',
};

export default function JeonjuTwoDays() {
  const crumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: '2 days in Jeonju', path: '/guides/jeonju-2-days/' },
  ]);

  return (
    <div className="guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldStr(crumbLd) }} />
      <GuideLd href="/guides/jeonju-2-days/" />

      <div className="crumb">
        <Link href="/">Home</Link> › <Link href="/guides/">Guides</Link> › 2 days in Jeonju
      </div>

      <h1>2 days in Jeonju</h1>
      <p className="sub">
        Jeonju was the ancestral seat of the Joseon royal family and is still the country’s capital of
        food and tradition: a town of 650,000 with a living hanok village of more than 700 tiled
        houses at its centre. It is under two hours from Seoul by KTX. A day trip works, but the
        village is at its best in the evening and early morning, after the day visitors leave, so
        stay the night.
      </p>

      <GuideHero slugs={[
        'jeonju-hanok-village-slow-city-264285',
        'gyeonggijeon-shrine-264419',
        'jeonju-pungnammun-gate-264412',
      ]} />

      <div className="callout">
        <strong>Before you go</strong>
        <ul>
          <li><strong>KTX</strong> from Yongsan to Jeonju takes about 1 hour 40 minutes; Jeonju Station is 20–30 minutes by bus or taxi from the village. Express buses from Seoul take about 2 hours 45 minutes but drop you closer.</li>
          <li><strong>Stay in a hanok.</strong> The village is full of guesthouses in traditional houses, sleeping on a heated floor; book ahead for autumn weekends.</li>
          <li><strong>Weekends are busy</strong> with hanbok-wearing day-trippers. Weekdays are far calmer.</li>
        </ul>
      </div>

      <BookBox
        provider="agoda"
        offers={GUIDE_STAY.jeonju}
        title="Where to stay"
        intro="A hanok guesthouse inside the village is the point of an overnight; the station area has modern hotels if you prefer a bed."
      />

      <DayHead
        day="Day 1"
        title="The village, the shrine and the night market"
        sub="Arrive by lunch, walk the lanes in the afternoon, eat your way through Nambu Market after dark."
      />

      <ol className="g-timeline">
        <Stop time="12:00" title="Lunch: Jeonju bibimbap">
          <p>
            Bibimbap is Jeonju’s dish: rice cooked in beef broth, topped with a dozen seasoned
            vegetables, beef tartare and a raw egg yolk, served in brass. The long-established
            restaurants around the village are the place for it.
          </p>
        </Stop>

        <Stop slug="gyeonggijeon-shrine-264419" time="13:30" title="Gyeonggijeon Shrine" walk="in the village">
          <p>
            Built in 1410 to hold the portrait of Yi Seong-gye, the founder of the Joseon dynasty,
            whose family came from Jeonju. The grounds are a quiet walled garden of bamboo and old
            trees, with a museum of royal portraits.
          </p>
        </Stop>

        <Stop slug="jeonju-jeondong-catholic-cathedral-264421" time="14:30" title="Jeondong Cathedral" walk="across the road">
          <p>
            A red-brick Romanesque cathedral of 1914, built on the site where Korea’s first Catholic
            martyrs were executed. One of the most beautiful churches in Korea, and a startling sight
            opposite a Joseon shrine.
          </p>
        </Stop>

        <Stop slug="jeonju-hanok-village-slow-city-264285" time="15:30" title="The hanok lanes and Omokdae">
          <p>
            Wander the back lanes away from the main street of snack stalls. Climb the short path to
            Omokdae for the view over the tiled roofs, and try on hanbok if you like; rental shops
            line the main road.
          </p>
        </Stop>

        <Stop slug="jeonju-nambu-traditional-market-1945427" time="19:00" title="Nambu Market night market" walk="10 min walk">
          <p>
            The traditional market by Pungnammun Gate turns into a night market of food stalls on
            Friday and Saturday evenings, and the youth mall on its upper floor has small bars and
            cafés. Kongnamul gukbap, bean-sprout soup, is the local breakfast here the next morning.
          </p>
        </Stop>
      </ol>

      <DayHead
        day="Day 2"
        title="Murals, makgeolli and the train home"
        sub="A slow morning in the village, the mural village on the hill, and a makgeolli lunch before the KTX."
      />

      <ol className="g-timeline">
        <Stop slug="jaman-mural-village-3116081" time="09:30" title="Jaman Mural Village">
          <p>
            A hillside of small houses covered in murals, just across the stream from the hanok
            village, with cafés and a view back over the roofs.
          </p>
        </Stop>

        <Stop time="11:00" title="Crafts and hanji">
          <p>
            Jeonju is the home of hanji, traditional mulberry paper. The craft shops and exhibition
            hall in the village sell it as fans, lamps and notebooks, the best souvenir from the town.
          </p>
        </Stop>

        <Stop slug="samcheon-2-i-dong-makgeolli-street-2-3510771" time="13:00" title="A makgeolli lunch" walk="taxi 10 min">
          <p>
            In Jeonju’s makgeolli houses you order a kettle of rice wine and the side dishes simply
            keep coming, a whole table of them, with each new kettle. Go as a group and go hungry.
          </p>
        </Stop>
      </ol>

      <BookBox
        offers={GUIDE_OFFERS.jeonju}
        title="Getting there"
        intro="A day tour does the transport for you; the rail pass pays off if Jeonju is one stop on a longer KTX trip."
      />

      <h2 className="sect">On in Jeonju this autumn</h2>
      <ul className="tips">
        <li><Link href="/festival/jeonju-hanok-village-traditional-performance-parade-3487931/">Traditional performance parades</Link> through the hanok village on weekends until 31 October.</li>
        <li><Link href="/festival/jeonju-cultural-heritage-night-tour-2394700/">Cultural Heritage Night Tour</Link>, 2–3 October.</li>
        <li><Link href="/festival/jeonju-international-hanji-industry-fair-506838/">Jeonju International Hanji Fair</Link>, 8–10 October.</li>
        <li><Link href="/festival/jeonju-street-puppet-festival-2757751/">Jeonju Street Puppet Festival</Link>, 10–11 October.</li>
      </ul>
      <PlaceRow slugs={[
        'jeonju-crafts-exhibition-hall-268160',
        'gimje-geumsansa-temple-824869',
      ]} />

      <p className="strip">
        <Link href="/guides/day-trips-from-seoul/">Day trips from Seoul</Link>
        <Link href="/guides/gyeongju-2-days/">2 days in Gyeongju</Link>
        <Link href="/guides/korean-food-guide/">Eating in Korea</Link>
        <Link href="/regions/jeonbuk/">Everything in Jeonbuk</Link>
      </p>

      <p className="meta">
        Train times and opening hours as published by Korail and the city of Jeonju in September 2026.
        The Nambu night market runs on weekend evenings and may change with the season. Photographs:
        Korea Tourism Organization.
      </p>
    </div>
  );
}
