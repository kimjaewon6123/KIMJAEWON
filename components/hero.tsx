"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { withBase } from "@/lib/base-path"

const titleLines = ["변화하는 기술을 빠르게 흡수하고,", "현실적인 해결책으로 이어내는 기획자"]
const nameWords = ["KIM", "JAE", "WON"]
const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero({ ready = true }: { ready?: boolean }) {
  const containerRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // 섹션 자체가 아닌 내부 콘텐츠에만 패럴랙스 적용 (섹션을 움직이면 아래 섹션과 겹치고 앵커 위치가 틀어짐)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // 3D 틸트
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 18 })
  const sy = useSpring(y, { stiffness: 150, damping: 18 })
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // 로딩 인트로가 끝난 뒤에 등장 애니메이션 시작
  const state = ready ? "show" : "hidden"

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-background pb-20 pt-32"
    >
      <motion.div className="container z-10 mx-auto px-6" style={{ y: yParallax, opacity: opacityParallax }}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="flex flex-col space-y-10">
            <motion.div
              initial="hidden"
              animate={state}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-4 text-sm text-foreground/55 md:text-base"
            >
              <span className="h-px w-10 bg-foreground/30" aria-hidden="true" />
              <span className="font-medium tracking-wide text-foreground/80">Service Planner · PM</span>
              <span className="text-foreground/25" aria-hidden="true">/</span>
              <span>WIPS DX기획팀</span>
            </motion.div>
            <div className="space-y-4">
              {titleLines.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial="hidden"
                  animate={state}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: EASE }}
                  className="text-xl font-medium leading-relaxed text-foreground/80 md:text-2xl lg:text-3xl"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <h1 className="flex flex-wrap gap-x-4 gap-y-2" aria-label="KIM JAE WON">
              {nameWords.map((word, wordIdx) => (
                <span key={wordIdx} className="flex overflow-hidden" aria-hidden="true">
                  {word.split("").map((letter, letterIdx) => (
                    <motion.span
                      key={letterIdx}
                      initial="hidden"
                      animate={state}
                      variants={{ hidden: { y: "100%" }, show: { y: 0 } }}
                      transition={{ duration: 0.8, delay: 0.3 + (wordIdx * 3 + letterIdx) * 0.04, ease: EASE }}
                      className="inline-block text-6xl font-bold tracking-tighter text-foreground md:text-8xl lg:text-[10rem]"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.div
              initial="hidden"
              animate={state}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <a href="#portfolio" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5">
                프로젝트 보기
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a href={withBase("/docs/portfolio.pdf")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/10">
                포트폴리오 PDF
              </a>
              <span className="ml-2 hidden items-center gap-3 text-sm font-medium uppercase tracking-wider text-foreground/40 sm:flex">
                <span className="h-px w-10 bg-foreground/20" />
                Scroll
                <ArrowDown className="h-4 w-4 animate-bounce-soft" />
              </span>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate={state}
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
            className="relative flex w-full justify-center lg:justify-end"
            style={{ perspective: 1200 }}
          >
            <motion.div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY }}
              className="group relative aspect-[3/4] w-full max-w-[450px] overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src="/my.webp"
                alt="김재원"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 450px"
                className="pointer-events-none object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 배경 마키 (CSS 애니메이션) */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 w-full select-none overflow-hidden opacity-[0.03]" aria-hidden="true">
        <div className="animate-marquee">
          {[0, 1].map((i) => (
            <span key={i} className="pr-12 text-[12rem] font-black uppercase leading-none">
              PRODUCT MANAGER • CREATIVE PLANNER • PROBLEM SOLVER •
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
