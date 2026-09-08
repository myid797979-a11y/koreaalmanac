/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO가 상품의 전부 — 빌드 시점 정적 HTML 생성 (청약각·온담과 동일)
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
