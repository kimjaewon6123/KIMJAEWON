/**
 * GitHub Pages(프로젝트 페이지)는 https://<user>.github.io/<repo>/ 아래에서 서비스되므로
 * 배포 빌드에서만 PAGES_BASE_PATH(예: /KIMJAEWON)를 주입합니다. 로컬 개발은 기존처럼 루트(/)에서 동작.
 */
const basePath = process.env.PAGES_BASE_PATH ?? ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 사이트(out/)로 빌드 — GitHub Pages는 정적 파일만 서빙
  output: "export",
  basePath,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    // 정적 호스팅엔 이미지 최적화 서버가 없으므로, public 파일에 basePath만 붙여 그대로 사용
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
}

export default nextConfig
