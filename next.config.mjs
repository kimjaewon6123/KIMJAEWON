/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 화면 크기에 맞춰 리사이즈된 WebP/AVIF로 자동 변환해서 전송
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
}

export default nextConfig
