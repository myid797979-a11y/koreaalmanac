// 빌드 직후 · 배포 직전에 돌린다.
//
// 하는 일 두 가지:
//   1) 페이지마다 내용이 실제로 바뀐 날짜를 기록하고, sitemap.xml 에 <lastmod> 를 넣는다.
//      Bing 웹마스터 지침 §3 이 명시적으로 요구하는 신선도 신호다. 전 페이지에 오늘 날짜를
//      박으면 신호가 아니라 잡음이 되므로, 내용이 바뀐 페이지만 날짜를 올린다.
//   2) 바뀐 URL 목록을 남겨 indexnow.mjs 가 그대로 제출하게 한다 (§4: 변경분만).
//
// 해시할 때 "Sep 11, 2026" 같은 날짜는 지운다 — 푸터 갱신일이 전 페이지에 있고
// 매일 바뀌어서, 그대로 두면 늘 전량이 '변경'으로 잡힌다.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { createHash } from 'crypto';
import { join, dirname } from 'path';

const HOST = 'koreaalmanac.com';

// 해시 계산 방식을 바꾸면 이 번호를 올린다.
//
// 왜 필요한가: 해시 함수를 고치면 저장된 해시와 전부 어긋나 3,900 페이지가 한꺼번에
// "변경"으로 잡히고 IndexNow 에 전량 나간다 — 내용은 하나도 안 바뀌었는데도.
// 번호가 다르면 해시만 조용히 다시 계산하고 lastmod 와 제출 목록은 건드리지 않는다.
//   v2: <header>·<footer> 를 해시에서 제외 (메뉴 링크 하나 바꿔도 전량이 잡혔다)
//   v3: 축제 상세의 "More festivals in" 블록 제외 (허브 정렬만 바꿔도 1,032 건이 나갔다)
//   v4: <head> 를 통째로 제외 (2026-09-29 AdSense 메타 태그 한 줄로 4,063페이지 전량이 잡혔다 —
//       제목·설명 같은 head 내용은 어차피 본문(<main>)이 바뀔 때 같이 바뀐다)
//   v5: 공연 상세의 "More shows like this" 목록 제외 (지나간 공연이 빠질 때마다 공연 페이지 전부가 잡혔다).
//       2026-10-06 지역×월 허브 요약 문단 추가분도 이 마이그레이션에 흡수된다.
const HASH_VERSION = 5;
const STATE = '../data/indexnow-state.json';
const CHANGED = 'out/.changed-urls.json';

const kst = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);

const xml = readFileSync('out/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (urls.length === 0) { console.log('sitemap에 URL 없음 — 건너뜀'); process.exit(0); }

function hashOf(url) {
  const p = url.replace('https://' + HOST, '').replace(/\/$/, '');
  const f = join('out', p, 'index.html');
  if (!existsSync(f)) return null;
  // 렌더된 내용만 남긴다. Next.js 는 빌드마다 buildId·청크 해시·next/font 클래스명
  // (__variable_d64f0b)이 달라져서, 페이지를 한 글자도 안 고쳐도 HTML 전체가 바뀐다.
  // 스크립트와 링크를 통째로 빼면 그 잡음이 전부 사라진다.
  // 푸터 갱신일("Sep 11, 2026")도 전 페이지에 있고 매일 바뀌므로 지운다.
  const body = readFileSync(f, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<link[^>]*>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')            // <!--1134a6DoyRaVkfKMRzHL9--> 같은 빌드 토큰
    .replace(/<meta name="next-size-adjust"[^>]*>/g, '')  // Next.js 패치 버전에 따라 있고 없다
    // 상단 메뉴·푸터는 전 페이지가 공유한다. 여기에 링크 하나만 넣거나 빼도
    // 3,900 페이지가 통째로 "변경"으로 잡혀 IndexNow 에 전량 나간다 — 정작 그 페이지의
    // 내용은 그대로다. 페이지 고유 내용(<main>)만 보고 판단한다.
    .replace(/<head>[\s\S]*?<\/head>/g, '')
    .replace(/<header[\s\S]*?<\/header>/g, '')
    .replace(/<footer[\s\S]*?<\/footer>/g, '')
    .replace(/__variable_[0-9a-f]+/g, '')
    .replace(/[A-Z][a-z]{2} \d{1,2}, 20\d\d/g, 'DATE')
    // 오늘 날짜에서 파생된 표시를 뺀다. D-54 가 D-53 이 되는 건 "내용이 바뀐" 게 아닌데,
    // 그대로 두면 매일 축제·장소 800여 페이지가 변경으로 잡혀 IndexNow 에 그대로 나간다.
    // 실제 변경은 하루 15건 남짓이다(신규 등록분).
    .replace(/<span class="stamp[^"]*">[^<]*<\/span>/g, 'STAMP')
    .replace(/(?<![A-Za-z])D-(?:\d+|DAY)(?![A-Za-z])/g, 'DDAY')
    // 페이지 끝의 "관련 목록" 블록들 — 그 페이지의 내용이 아니라 다른 페이지로 가는 통로다.
    //   · 장소 상세의 "What's on nearby" 는 120일 지평선이라 날마다 목록이 달라진다
    //   · 축제 상세의 "More festivals in <지역>" 도 같다. 실제로 허브 정렬을 한 번 바꿨더니
    //     내용이 하나도 안 바뀐 축제 1,032 페이지가 전부 변경으로 잡혀 IndexNow 에 나갔다.
    //   · 축제·장소 하단의 "Plan your trip to <지역>" 가이드 줄(components/RegionGuides) — 가이드 목록이
    //     바뀔 때마다 4천 페이지가 잡히면 안 된다. 추가된 날(2026-10-02)에도 이 규칙 덕에 전량이 잡히지 않는다.
    .replace(/<nav class="g-related[^"]*"[\s\S]*?<\/nav>/g, '')
    .replace(/<h2 class="sect">What&#x27;s on nearby<\/h2>[\s\S]*?(?=<h2|<\/main|<footer)/g, 'NEARBY')
    .replace(/<h2 class="sect">More festivals in[\s\S]*?(?=<h2|<\/main|<footer)/g, 'RELATED')
    .replace(/<h2 class="sect">More shows like this<\/h2>[\s\S]*?(?=<h2|<\/main|<footer)/g, 'SHOWS');
  return createHash('sha1').update(body).digest('hex').slice(0, 12);
}

// 예전 상태는 {url: "해시"} 였다. 지금은 {url: {h, m}} + 맨 위에 _v(해시 버전).
const rawPrev = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {};
const prevVersion = rawPrev._v ?? 1;
const migrating = Object.keys(rawPrev).length > 0 && prevVersion !== HASH_VERSION;
const prev = {};
for (const [u, v] of Object.entries(rawPrev)) {
  if (u === '_v') continue;
  prev[u] = typeof v === 'string' ? { h: v, m: kst } : v;
}
if (migrating) {
  console.log(`해시 v${prevVersion} → v${HASH_VERSION} — 해시만 다시 계산하고 제출은 건너뜁니다`);
}

const next = {};
const changed = [];
for (const url of urls) {
  const h = hashOf(url);
  if (h === null) continue;
  const was = prev[url];
  if (was && was.h === h) next[url] = was;               // 그대로 — 날짜 유지
  else if (was && migrating) next[url] = { h, m: was.m }; // 해시 방식만 바뀜 — 날짜 유지, 제출 안 함
  else { next[url] = { h, m: kst }; changed.push(url); } // 바뀌었다 — 오늘로
}
// 사이트맵에서 뺐을 뿐 페이지는 남아 있는 URL 은 삭제가 아니다 (2026-09-29 사이트맵 우선순위 정리로 850건이
// 사이트맵에서 빠졌다). 상태는 그대로 이어 가고, 파일이 실제로 사라진 것만 삭제로 제출한다.
const removed = [];
for (const u of Object.keys(prev)) {
  if (u in next) continue;
  if (hashOf(u) !== null) next[u] = prev[u];   // 페이지는 있다 — 상태 유지, 제출 안 함
  else removed.push(u);
}

// 상태 파일은 실제로 배포하는 쪽(CI)만 쓴다. 로컬은 node_modules 의 Next.js 패치 버전이
// CI 의 npm ci 결과와 달라 해시가 미묘하게 어긋나므로, 로컬에서 덮어쓰면 다음 CI 배포에서
// 전량이 '변경'으로 잡힌다. 로컬에서는 보고만 하고, 굳이 쓰려면 --write 를 준다.
const persist = process.env.CI === 'true' || process.argv.includes('--write');
if (persist) {
  mkdirSync(dirname(STATE), { recursive: true });
  writeFileSync(STATE, JSON.stringify({ _v: HASH_VERSION, ...next }, null, 0));
}
writeFileSync(CHANGED, JSON.stringify([...changed, ...removed]));

// sitemap 에 <lastmod> 주입 — <loc> 바로 뒤에 넣는다
let n = 0;
const out = xml.replace(/<loc>([^<]+)<\/loc>/g, (m, u) => {
  const e = next[u];
  if (!e) return m;
  n++;
  return m + '\n<lastmod>' + e.m + '</lastmod>';
});
writeFileSync('out/sitemap.xml', out);

console.log(
  `lastmod 주입 ${n}/${urls.length}건 · 오늘 변경 ${changed.length} · 삭제 ${removed.length}`);
