import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/CustomCursor"
import ScrollToTop from "@/components/scroll-to-top"

export const metadata: Metadata = {
  metadataBase: new URL("https://jwkim.co.kr"),
  alternates: { canonical: "/" },
  title: "김재원 포트폴리오 | 서비스 기획자 · PM",
  description: "AI 기술과 사람을 잇는 브릿지 기획자 김재원입니다. B2B 시스템 연동, 사용자 리서치, 팀 리딩, 풀사이클 개발 경험을 소개합니다.",
  keywords: ["김재원", "서비스 기획자", "PM", "포트폴리오", "UX 기획", "B2B 기획"],
  openGraph: {
    title: "김재원 포트폴리오 | 서비스 기획자 · PM",
    description: "변화하는 기술을 빠르게 흡수하고, 현실적인 해결책으로 이어내는 기획자",
    type: "website",
    url: "https://jwkim.co.kr",
    siteName: "김재원 포트폴리오",
    locale: "ko_KR",
    images: [{ url: "/work/profile.webp", width: 800, height: 1160, alt: "김재원" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#09090b",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <CustomCursor />
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
