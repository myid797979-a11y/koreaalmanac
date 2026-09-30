'use client';

import { useState } from 'react';

// 예산 가이드의 하루 예산표(1인 ₩60,000 / ₩130,000 / ₩250,000)와 같은 기준으로 계산한다.
// 숙소는 방 단위(중·상급은 2인 1실), 나머지는 1인 단위. 환율은 가이드와 같은 ₩1,350/US$.
const STYLES = {
  budget:  { label: 'Budget',      room: 25000,  perRoom: 1, other: 35000, note: 'hostel dorm, markets, subway' },
  mid:     { label: 'Mid-range',   room: 80000,  perRoom: 2, other: 50000, note: 'business hotel, one sit-down dinner, a paid sight' },
  comfort: { label: 'Comfortable', room: 180000, perRoom: 2, other: 70000, note: 'four-star hotel, restaurants, taxis' },
} as const;
type StyleKey = keyof typeof STYLES;

const EXTRAS = [
  { id: 'busan', label: 'KTX to Busan and back', perPerson: 120000 },
  { id: 'jeju', label: 'Return flight to Jeju', perPerson: 100000 },
  { id: 'park', label: 'A theme park day', perPerson: 65000 },
  { id: 'dmz', label: 'A DMZ or day tour', perPerson: 70000 },
] as const;

const RATE = 1350;
const won = (n: number) => '₩' + (Math.round(n / 1000) * 1000).toLocaleString('en-US');
const usd = (n: number) => 'about US$' + (Math.round(n / RATE / 10) * 10).toLocaleString('en-US');

export default function BudgetCalculator() {
  const [days, setDays] = useState(7);
  const [people, setPeople] = useState(2);
  const [style, setStyle] = useState<StyleKey>('mid');
  const [extras, setExtras] = useState<string[]>(['busan']);

  const s = STYLES[style];
  const nights = Math.max(days - 1, 0);
  const rooms = Math.ceil(people / s.perRoom);
  const beds = s.room * rooms * nights;
  const daily = s.other * people * days;
  const extra = EXTRAS.filter(e => extras.includes(e.id)).reduce((a, e) => a + e.perPerson * people, 0);
  const total = beds + daily + extra;

  const toggle = (id: string) => setExtras(x => (x.includes(id) ? x.filter(y => y !== id) : [...x, id]));

  return (
    <div className="calc">
      <div className="tripform calc-form">
        <label>
          Days
          <input type="number" min={1} max={60} value={days}
            onChange={e => setDays(Math.min(60, Math.max(1, Number(e.target.value) || 1)))} />
        </label>
        <label>
          Travellers
          <input type="number" min={1} max={8} value={people}
            onChange={e => setPeople(Math.min(8, Math.max(1, Number(e.target.value) || 1)))} />
        </label>
        <label>
          Style
          <select value={style} onChange={e => setStyle(e.target.value as StyleKey)}>
            {(Object.keys(STYLES) as StyleKey[]).map(k => <option key={k} value={k}>{STYLES[k].label}</option>)}
          </select>
        </label>
      </div>
      <p className="calc-extras">
        {EXTRAS.map(e => (
          <label key={e.id} className={'kf' + (extras.includes(e.id) ? ' on' : '')}>
            <input type="checkbox" checked={extras.includes(e.id)} onChange={() => toggle(e.id)} />
            {e.label}
          </label>
        ))}
      </p>

      <table className="facts calc-out">
        <tbody>
          <tr><th>Beds</th><td>{won(beds)} <span className="meta">· {nights} nights, {rooms} {rooms === 1 ? 'room' : 'rooms'}</span></td></tr>
          <tr><th>Food, transport, sights</th><td>{won(daily)} <span className="meta">· {s.note}</span></td></tr>
          {extra > 0 && <tr><th>Trips</th><td>{won(extra)}</td></tr>}
          <tr className="calc-total"><th>Total</th><td><strong>{won(total)}</strong> <span className="meta">· {usd(total)} · {won(total / people)} per person</span></td></tr>
        </tbody>
      </table>
      <p className="meta" style={{ margin: '6px 0 0' }}>
        A rough estimate from the daily budgets above, not a quote. Flights to Korea and shopping are
        not included.
      </p>
    </div>
  );
}
