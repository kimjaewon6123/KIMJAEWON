"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT ME", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PORTFOLIO", href: "#portfolio" },
  { name: "DOCUMENT", href: "#gallery" },
  { name: "CONTACT", href: "#contact" },
]

// 마우스를 살짝 따라오는 로고 — state 대신 motion value를 써서 마우스 이동마다 리렌더링하지 않음
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 15, mass: 0.1 })
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 15, mass: 0.1 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.1)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.1)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    // 현재 보고 있는 섹션 감지 (매 스크롤마다 위치를 계산하지 않도록 IntersectionObserver 사용)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection("#" + entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    navItems.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1))
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-[background-color,padding] duration-300",
          scrolled ? "bg-black/80 py-4 text-white backdrop-blur-lg" : "bg-transparent py-6 text-foreground"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
          <Magnetic>
            <a href="#home" className="relative z-50 text-xl font-bold tracking-tighter">
              KIM JAE WON
            </a>
          </Magnetic>

          <nav className="hidden items-center space-x-8 md:flex">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center space-x-2 text-sm font-medium transition-opacity hover:opacity-100",
                    isActive ? "opacity-100" : "opacity-70"
                  )}
                >
                  <span className="font-mono text-xs opacity-50">0{index + 1}</span>
                  <span>{item.name}</span>
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-current"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
            <div className="border-l border-current/20 pl-4">
              <ModeToggle />
            </div>
          </nav>

          <div className="relative z-50 flex items-center gap-4 md:hidden">
            <ModeToggle />
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="-mr-2 p-2"
              aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0)" }}
            animate={{ clipPath: "circle(150% at 100% 0)" }}
            exit={{ clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-zinc-950 text-white"
          >
            <nav className="flex w-full flex-col items-center space-y-8 px-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.06 }}
                  className={cn(
                    "flex w-full flex-col items-center text-center text-3xl font-bold transition-colors",
                    activeSection === item.href ? "text-white" : "text-gray-500 hover:text-white"
                  )}
                >
                  <span className="mb-2 font-mono text-sm text-gray-500">0{index + 1}</span>
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
