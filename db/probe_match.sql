-- 국문↔영문 매칭률 실측: ①영문 제목 괄호 안 한글 = 국문 제목  ②좌표 소수4자리 일치
with eng as (
  select contentid,
         replace(btrim(substr(list_json->>'title', nullif(strpos(list_json->>'title','('),0)), ' ()'), ' ', '') as korkey,
         nullif(list_json->>'mapx','') as mapx, nullif(list_json->>'mapy','') as mapy
  from raw_item where lang='eng'
),
kor as (
  select contentid,
         replace(list_json->>'title', ' ', '') as korkey,
         nullif(list_json->>'mapx','') as mapx, nullif(list_json->>'mapy','') as mapy,
         coalesce(list_json->>'eventenddate','00000000') >= to_char(current_date,'YYYYMMDD') as active
  from raw_item where lang='kor'
),
tmatch as (select distinct k.contentid from kor k join eng e on e.korkey is not null and e.korkey <> '' and k.korkey = e.korkey),
cmatch as (select distinct k.contentid from kor k join eng e
           on e.mapx is not null and k.mapx is not null
          and round(e.mapx::numeric,4) = round(k.mapx::numeric,4)
          and round(e.mapy::numeric,4) = round(k.mapy::numeric,4)),
matched as (select contentid from tmatch union select contentid from cmatch)
select
  (select count(*) from kor)                                        as kor_total,
  (select count(*) from tmatch)                                     as by_title,
  (select count(*) from cmatch)                                     as by_coord,
  (select count(*) from matched)                                    as matched,
  (select count(*) from kor where contentid not in (select contentid from matched))            as need_transl,
  (select count(*) from kor where contentid not in (select contentid from matched) and active) as need_transl_active;
