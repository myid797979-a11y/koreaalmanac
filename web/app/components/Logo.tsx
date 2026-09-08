// 로고: 낙관(도장) 안에 오늘이 찍힌 달력 한 장 — 인주 사각 + 달력 머리줄 + 오늘 칸
export default function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1.5" y="1.5" width="29" height="29" rx="7" fill="#c4362a" />
      <rect x="8" y="8.5" width="16" height="3.2" rx="1.6" fill="#fdfcf8" />
      <rect x="11.6" y="15.5" width="8.8" height="8.8" rx="2.2" fill="#fdfcf8" />
    </svg>
  );
}
