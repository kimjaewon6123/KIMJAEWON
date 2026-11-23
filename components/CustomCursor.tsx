"use client"

import { useEffect, useRef, useState } from "react"
import { withBase } from "@/lib/base-path"

type CursorType = "default" | "pointer" | "project"

const SIZES: Record<CursorType, number> = { default: 40, pointer: 52, project: 56 }
const IMAGE_STYLE: Record<CursorType, { transform: string; filter: string }> = {
  default: { transform: "scale(1) rotate(0deg)", filter: "none" },
  pointer: { transform: "scale(1.3) rotate(15deg)", filter: "none" },
  project: { transform: "scale(1.5)", filter: "brightness(1.3)" },
}

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  // 마우스(정밀 포인터)가 있는 기기에서만 커스텀 커서 사용 — 터치 기기/태블릿은 기본 동작 유지
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const container = containerRef.current
    const image = imageRef.current
    if (!container || !image) return

    document.documentElement.classList.add("has-custom-cursor")

    const pos = { x: -100, y: -100 }
    const target = { x: -100, y: -100 }
    let size = SIZES.default
    let type: CursorType = "default"
    let rafId = 0
    let running = false

    const render = () => {
      pos.x += (target.x - pos.x) * 0.3
      pos.y += (target.y - pos.y) * 0.3
      container.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0)`
      // 목표 지점에 도착하면 루프를 멈춰 CPU 사용을 줄임
      if (Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1) {
        running = false
        return
      }
      rafId = requestAnimationFrame(render)
    }

    const kick = () => {
      if (!running) {
        running = true
        rafId = requestAnimationFrame(render)
      }
    }

    const onMove = (e: MouseEvent) => {
      if (pos.x < -50) {
        // 첫 진입 시 화면 구석에서 날아오지 않도록 바로 위치시킴
        pos.x = e.clientX
        pos.y = e.clientY
      }
      target.x = e.clientX
      target.y = e.clientY
      container.style.opacity = "1"
      kick()
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null
      let next: CursorType = "default"
      if (el?.closest?.('[data-cursor="project"]')) next = "project"
      if (el?.closest?.('a, button, [role="button"], [data-cursor="pointer"]')) next = "pointer"
      if (next === type) return
      type = next
      size = SIZES[next]
      Object.assign(image.style, IMAGE_STYLE[next])
      container.style.width = `${size}px`
      container.style.height = `${size}px`
      kick()
    }

    const onLeave = () => {
      container.style.opacity = "0"
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)

    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] select-none opacity-0 transition-opacity duration-200"
      style={{ width: 40, height: 40, willChange: "transform" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={withBase("/mouse.png")}
        alt=""
        className="animate-float-butterfly h-full w-full object-contain"
        style={{ transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), filter 0.3s" }}
      />
    </div>
  )
}
