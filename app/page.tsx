"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import AboutMe from "@/components/about-me"
import Skills from "@/components/skills"
import Portfolio from "@/components/portfolio"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import LoadingIntro from "@/components/LoadingIntro"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // 인트로가 떠 있는 동안 뒤 페이지 스크롤 잠금
  useEffect(() => {
    document.documentElement.style.overflow = isLoading ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <LoadingIntro onComplete={() => setIsLoading(false)} />}
      <main className="min-h-screen">
        <Header />
        <Hero ready={!isLoading} />
        <AboutMe />
        <Skills />
        <Portfolio />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
