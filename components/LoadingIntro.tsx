"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingIntroProps {
  onComplete: () => void
}

const words = ["안녕하세요", "Hello", "Bonjour", "こんにちは", "Ciao"]
const DURATION = 1400 // ms
const SEEN_KEY = "intro-seen"

export default function LoadingIntro({ onComplete }: LoadingIntroProps) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    // 같은 탭에서 두 번째 방문부터는 인트로 생략
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1"
      sessionStorage.setItem(SEEN_KEY, "1")
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSkipped(true)
      onComplete()
      return
    }

    const step = DURATION / words.length
    const wordTimer = setInterval(() => {
      setIndex((i) => (i < words.length - 1 ? i + 1 : i))
    }, step)
    const doneTimer = setTimeout(() => setVisible(false), DURATION + 100)
    return () => {
      clearInterval(wordTimer)
      clearTimeout(doneTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (skipped) return null

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0d0d0d]"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.12 }}
              className="flex items-center text-[clamp(1.5rem,4vw,3rem)] font-medium text-white"
            >
              <span className="mr-4 inline-block h-2 w-2 rounded-full bg-white" />
              {words[index]}
            </motion.p>
          </AnimatePresence>

          {/* 진행 바: JS 타이머 대신 CSS 애니메이션으로 부드럽게 */}
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10">
            <div
              className="h-full origin-left bg-white"
              style={{ animation: `intro-progress ${DURATION}ms linear forwards` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
