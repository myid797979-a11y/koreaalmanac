-- ============================================================
-- Tour (프로젝트_v03) — 글로벌 관광정보 사이트 스키마
-- PostgreSQL 16
--
-- 원칙: Collector 는 TourAPI 응답을 원본 그대로 JSONB 적재(해석 금지).
--       병합·번역큐·파생값은 뷰와 Exporter 에서. (온담 컨벤션 계승)
--
-- 출처: 한국관광공사 TourAPI 4.0 GW (공공데이터포털)
--   KorService2  국문 — 축제 916건 (2026-09-04 실측)
--   EngService2  영문 — 축제 255건 (〃)
--   쿼터: 개발계정 서비스별 일 1,000콜 → api_call_log 로 예산 관리
-- ============================================================

create table if not exists raw_item (
    lang           text not null,               -- 'kor' | 'eng'
    contentid      text not null,               -- 언어별로 별개 체계 (국문↔영문 매칭은 뷰에서)
    contenttypeid  text not null,               -- kor 15 / eng 85 = 축제행사
    list_json      jsonb not null,              -- searchFestival2 목록 아이템 (제목·기간·좌표·이미지)
    common_json    jsonb,                       -- detailCommon2 (overview·홈페이지)
    intro_json     jsonb,                       -- detailIntro2  (요금·휴무·소요시간·주최)
    listed_at      timestamptz not null default now(),
    detailed_at    timestamptz,
    primary key (lang, contentid)
);

create index if not exists idx_raw_item_start on raw_item ((list_json->>'eventstartdate'));
create index if not exists idx_raw_item_end   on raw_item ((list_json->>'eventenddate'));

-- 일일 API 콜 예산 (서비스=언어별 1,000/일)
create table if not exists api_call_log (
    day   date not null,
    lang  text not null,
    calls int  not null default 0,
    primary key (day, lang)
);

-- 축제 사진 갤러리 (detailImage2) — 2026-09-08 추가
alter table raw_item add column if not exists images_json jsonb;
