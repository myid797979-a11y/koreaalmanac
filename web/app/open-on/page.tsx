import Link from 'next/link';
import { DAYS, DAY_LABEL, openOn, closedOn } from '@/lib/open-days';
import TodayPick from './TodayPick';

export const metadata = {
  title: 'What’s open today in Korea — palaces, museums and markets by day of the week',
  description: 'Pick a day to see which palaces, museums, markets and viewpoints in Seoul, Busan, Jeju and beyond are open — and which close every Monday or Tuesday — from official opening data.',
};


export default function OpenOnIndex() {
  return (
    <div className="overview">
      <div className="crumb"><Link href="/">Home</Link> › Open today</div>
      <h1>What’s open today in Korea</h1>
      <p className="sub">
        Most of Seoul’s palaces close on Mondays, but Gyeongbokgung and Jongmyo close on Tuesdays;
        many museums close on Mondays, many markets on Sundays. Pick a day to see what is open —
        read from each place’s official closing-day record and refreshed every morning.
      </p>
      <TodayPick />

      <table className="facts">
        <tbody>
          {DAYS.map(d => (
            <tr key={d}>
              <th><Link href={'/open-on/' + d + '/'}>{DAY_LABEL[d]}</Link></th>
              <td>{openOn(d).length} open · {closedOn(d).length} close every {DAY_LABEL[d]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
