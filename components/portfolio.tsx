"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useSpring } from "framer-motion"
import { FileText, ArrowUpRight, Plus, Lock } from "lucide-react"
import PDFModal from "./PDFModal"
import { GithubIcon } from "./icons"
import { projects, type Project, type Shot } from "@/lib/projects"

const EASE = [0.16, 1, 0.3, 1] as const

export default function Portfolio() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [active, setActive] = useState<number | null>(null)
  const [pdf, setPdf] = useState<{ url: string; title: string } | null>(null)

  // 마우스를 따라다니는 미리보기 (마우스가 있는 기기에서만)
  const [canHover, setCanHover] = useState(false)
  const mouseX = useSpring(0, { stiffness: 200, damping: 22, mass: 0.2 })
  const mouseY = useSpring(0, { stiffness: 200, damping: 22, mass: 0.2 })

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const onRowEnter = (e: React.MouseEvent, i: number) => {
    if (!canHover) return
    if (hovered === null) {
      mouseX.jump(e.clientX)
      mouseY.jump(e.clientY)
    }
    setHovered(i)
  }

  const toggle = (i: number) => {
    setActive((cur) => (cur === i ? null : i))
    // 펼친 뒤 해당 행이 화면 상단에 오도록 살짝 스크롤
    if (active !== i) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(`project-${projects[i].id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 120)
      })
    }
  }

  const showPreview = canHover && hovered !== null && hovered !== active

  return (
    <section id="portfolio" className="relative w-full py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-4 block text-sm font-medium uppercase tracking-widest text-muted-foreground/60">04 — Portfolio</span>
            <h2 className="text-4xl font-bold tracking-tighter md:text-6xl">SELECTED WORK</h2>
          </div>
          <p className="max-w-md text-muted-foreground md:text-right">
            실무 B2B 연동·운영부터 리서치, 팀 리딩, AI 프로토타이핑까지.
            <br className="hidden md:block" /> 항목을 눌러 케이스 스터디를 펼쳐보세요.
          </p>
        </div>

        <div className="flex flex-col border-t border-foreground/20" onMouseMove={canHover ? (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY) } : undefined} onMouseLeave={() => setHovered(null)}>
          {projects.map((p, i) => (
            <div key={p.id} id={`project-${p.id}`} className="scroll-mt-24">
              <div
                role="button"
                tabIndex={0}
                aria-expanded={active === i}
                data-cursor="project"
                onMouseEnter={(e) => onRowEnter(e, i)}
                onClick={() => toggle(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    toggle(i)
                  }
                }}
                className="group relative flex cursor-pointer flex-col justify-between border-b border-foreground/20 py-8 pl-4 pr-1 transition-colors md:px-0 hover:bg-foreground/[0.03] md:flex-row md:items-center md:py-11"
              >
                {/* 왼쪽 포인트 바 */}
                <span className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100" style={{ background: p.accent }} aria-hidden="true" />
                <div className="flex w-full items-center gap-6 md:w-auto md:gap-12 md:pl-6">
                  <span className="shrink-0 whitespace-nowrap font-mono text-xl text-foreground/40 md:text-2xl">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-col">
                    <span className="mb-2 text-xs font-semibold uppercase tracking-widest md:text-sm" style={{ color: p.accent }}>{p.client}</span>
                    <h3 className="text-2xl font-bold tracking-tight transition-transform duration-300 md:text-5xl md:group-hover:translate-x-2">{p.title}</h3>
                    <p className="mt-2 text-sm text-foreground/60 md:text-lg">{p.subtitle}</p>
                  </div>
                </div>
                <div className="mt-5 flex w-full items-center justify-between gap-4 md:mt-0 md:w-auto md:justify-end md:gap-12">
                  <div className="flex flex-col items-start md:items-end">
                    <span className="font-medium text-foreground/80">{p.role}</span>
                    <span className="mt-1 text-sm text-foreground/40">{p.period}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: active === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-background transition-colors group-hover:border-foreground/50"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <CaseStudy project={p} onOpenPdf={(url, title) => setPdf({ url, title })} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* 커서 미리보기 — 이미지를 겹쳐두고 투명도만 전환해 깜빡임 없음 */}
      {canHover && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 overflow-hidden rounded-xl bg-background shadow-2xl"
          style={{ width: 360, height: 250, x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
          initial={false}
          animate={{ opacity: showPreview ? 1 : 0, scale: showPreview ? 1 : 0.6 }}
          transition={{ opacity: { duration: 0.2 }, scale: { type: "spring", stiffness: 300, damping: 25 } }}
        >
          {projects.map((p, i) => (
            <Image key={p.id} src={p.image} alt="" fill sizes="360px" className="object-cover transition-opacity duration-200" style={{ opacity: hovered === i ? 1 : 0 }} />
          ))}
        </motion.div>
      )}

      <PDFModal isOpen={!!pdf} onClose={() => setPdf(null)} pdfUrl={pdf?.url ?? ""} title={pdf?.title} />
    </section>
  )
}

function CaseStudy({ project: p, onOpenPdf }: { project: Project; onOpenPdf: (url: string, title: string) => void }) {
  const phones = p.shots.length > 0 && p.shots.every((s) => s.kind === "phone")

  return (
    <div className="relative border-b border-foreground/20 bg-foreground/[0.03] px-5 py-10 md:px-12 md:py-14" style={{ ["--ac" as string]: p.accent }}>
      {/* 상단 포인트 그라데이션 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />

      {/* 요약 + 핵심 수치 */}
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <Label>Overview</Label>
          <p className="mt-4 text-lg leading-relaxed text-foreground/80 md:text-xl">{p.summary}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 self-start sm:gap-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-foreground/10 bg-background/60 px-3 py-4 sm:p-4 md:p-5">
              <div className="flex flex-wrap items-baseline gap-x-0.5 font-bold tracking-tight">
                <span className="text-2xl sm:text-3xl md:text-5xl">{m.value}</span>
                {m.unit && <span className="whitespace-nowrap text-xs font-semibold sm:text-sm md:text-lg" style={{ color: p.accent }}>{m.unit}</span>}
              </div>
              <p className="mt-2 text-xs leading-snug text-muted-foreground md:text-sm">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Problem → Approach → Result */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {([
          ["Problem", p.problem],
          ["Approach", p.approach],
          ["Result", p.result],
        ] as const).map(([k, items], idx) => (
          <div key={k} className={`rounded-2xl border p-6 ${idx === 2 ? "border-transparent bg-foreground text-background" : "border-foreground/10 bg-background/60"}`}>
            <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: idx === 2 ? undefined : p.accent }}>
              <span className={idx === 2 ? "opacity-60" : ""}>{String(idx + 1).padStart(2, "0")} · {k}</span>
            </div>
            <ul className="mt-4 space-y-3">
              {items.map((t) => (
                <li key={t} className={`relative pl-4 text-[15px] leading-relaxed ${idx === 2 ? "text-background/85" : "text-foreground/75"}`}>
                  <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 핵심 설계 포인트 */}
      {p.highlights && (
        <div className="mt-12">
          <Label>{p.highlights.label}</Label>
          <div className={`mt-5 grid gap-4 ${p.highlights.items.length === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"}`}>
            {p.highlights.items.map((h, hi) => (
              <div key={h.title} className="flex flex-col rounded-2xl border border-foreground/10 bg-background/60 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-sm font-bold" style={{ color: p.accent }}>{String(hi + 1).padStart(2, "0")}</span>
                  <span className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/55">{h.tag}</span>
                </div>
                <h4 className="mt-4 text-xl font-bold tracking-tight">{h.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground/70">{h.desc}</p>
                {h.points && (
                  <ul className="mt-4 space-y-2 border-t border-foreground/10 pt-4">
                    {h.points.map((t) => (
                      <li key={t} className="relative pl-4 text-sm leading-relaxed text-foreground/70">
                        <span className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 시스템 간 연동 시퀀스 */}
      {p.flow && <FlowDiagram flow={p.flow} accent={p.accent} />}

      {/* 묶음 카드: 하위 프로젝트별 결과물 · 문서 · GitHub */}
      {p.builds && p.builds.length > 0 && (
        <div className="mt-12">
          <Label>Builds</Label>
          <div className="mt-5 space-y-4">
            {p.builds.map((b, bi) => (
              <div key={b.name} className="rounded-2xl border border-foreground/10 bg-background/60 p-5 md:p-7">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
                  {!b.shots?.length && (
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl ring-1 ring-foreground/10 md:w-64">
                      <Image src={b.image} alt={b.name} fill sizes="(max-width: 768px) 100vw, 256px" className="object-cover" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-xl font-bold tracking-tight md:text-2xl">
                        <span className="mr-2 font-mono text-base" style={{ color: p.accent }}>{String(bi + 1).padStart(2, "0")}</span>
                        {b.name}
                      </h4>
                      <span className="text-sm tabular-nums text-foreground/40">{b.period}</span>
                    </div>
                    <p className="mt-3 leading-relaxed text-foreground/75">{b.summary}</p>
                    <ul className="mt-4 space-y-2">
                      {b.points.map((t) => (
                        <li key={t} className="relative pl-4 text-[15px] leading-relaxed text-foreground/70">
                          <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {b.tags.map((t) => (
                        <span key={t} className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/70">{t}</span>
                      ))}
                      <span className="flex-1" />
                      {b.pdf && (
                        <button onClick={(e) => { e.stopPropagation(); onOpenPdf(b.pdf!, b.name) }} className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90">
                          <FileText className="h-4 w-4" /> 문서 보기
                        </button>
                      )}
                      {b.github && (
                        <a href={b.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 rounded-full border border-foreground/30 px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/10">
                          <GithubIcon className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                {b.shots && b.shots.length > 0 && <PhoneShots shots={b.shots} small />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 결과물 */}
      {p.shots.length > 0 && (
        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <Label>Deliverables</Label>
            {p.confidential && <ConfidentialNote />}
          </div>
          {phones ? (
            <PhoneShots shots={p.shots} />
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {p.shots.map((s) => (
                <figure key={s.src}>
                  <a href={s.full ?? s.src} target="_blank" rel="noopener noreferrer" className="group/shot block overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10" onClick={(e) => e.stopPropagation()}>
                    <div className="relative aspect-[16/10]">
                      <Image src={s.src} alt={s.caption} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top transition-transform duration-700 group-hover/shot:scale-105" />
                    </div>
                  </a>
                  <figcaption className="mt-3 text-sm text-foreground/60">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 사내 화면설계 (FID 표시 · 블러) */}
      {p.screens && p.screens.length > 0 && (
        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <Label>Screen Design · {p.screens.filter((s) => !s.src.includes("ERD")).length}개 화면 + ERD (FID 표시)</Label>
            <ConfidentialNote />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-5">
            {p.screens.map((s) => (
              <figure key={s.src}>
                <a href={s.src} target="_blank" rel="noopener noreferrer" className="group/shot block overflow-hidden rounded-lg bg-white ring-1 ring-foreground/10" onClick={(e) => e.stopPropagation()}>
                  <div className="relative aspect-[16/10]">
                    <Image src={s.src} alt={s.caption} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover object-top transition-transform duration-700 group-hover/shot:scale-105" />
                  </div>
                </a>
                <figcaption className="mt-2 text-xs text-foreground/60 md:text-sm">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* 태그 · 버튼 */}
      <div className="mt-12 flex flex-col gap-6 border-t border-foreground/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-foreground/15 bg-background/50 px-3.5 py-1.5 text-sm text-foreground/75">{t}</span>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground"><span className="font-semibold text-foreground/70">Tools</span> · {p.tech}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          {p.pdf && (
            <button onClick={(e) => { e.stopPropagation(); onOpenPdf(p.pdf!, p.subtitle) }} className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-90">
              <FileText className="h-5 w-5" /> 프로젝트 문서 보기
            </button>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 rounded-full border border-foreground/30 px-6 py-3 font-medium transition-colors hover:bg-foreground/10">
              <GithubIcon className="h-5 w-5" /> GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function FlowDiagram({ flow, accent }: { flow: NonNullable<Project["flow"]>; accent: string }) {
  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-center gap-3">
        <Label>{flow.title}</Label>
        {flow.note && <ConfidentialNote text={flow.note} />}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-[150px_1fr_150px] md:gap-5">
        <div className="flex items-center justify-center rounded-2xl bg-foreground px-4 py-4 text-center text-background md:py-0">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest opacity-50">Client</div>
            <div className="mt-1 text-lg font-bold">{flow.left}</div>
          </div>
        </div>
        <ol className="space-y-2.5">
          {flow.steps.map((s, i) => (
            <li key={s.name} className="grid grid-cols-[36px_1fr] items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: accent }}>{i + 1}</span>
              <div className="rounded-xl border border-foreground/10 bg-background/60 px-4 py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold tracking-tight">{s.name}</span>
                  <span className="whitespace-nowrap text-[11px] font-bold tracking-wider" style={{ color: accent }}>
                    {s.dir === "out" ? `${flow.left} → WIPS` : `WIPS → ${flow.left}`}
                  </span>
                </div>
                <div className="relative my-2 h-px" style={{ background: s.dir === "out" ? accent : `repeating-linear-gradient(90deg, ${accent} 0 8px, transparent 8px 13px)` }} aria-hidden="true">
                  <span
                    className="absolute -top-[4px] border-y-[4.5px] border-y-transparent"
                    style={s.dir === "out" ? { right: 0, borderLeft: `8px solid ${accent}` } : { left: 0, borderRight: `8px solid ${accent}` }}
                  />
                </div>
                <p className="text-sm leading-relaxed text-foreground/65">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="flex items-center justify-center rounded-2xl px-4 py-4 text-center text-white md:py-0" style={{ background: accent }}>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest opacity-70">Service</div>
            <div className="mt-1 text-lg font-bold">{flow.right}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConfidentialNote({ text = "Confidential · 사내 문서라 블러 처리 — 원본은 면접에서 시연 가능" }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background/60 px-3 py-1 text-xs text-foreground/60">
      <Lock className="h-3 w-3" /> {text}
    </span>
  )
}

function PhoneShots({ shots, small = false }: { shots: Shot[]; small?: boolean }) {
  return (
    <div className={`mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 ${small ? "md:gap-3" : ""}`}>
      {shots.map((s) => (
        <figure key={s.src} className={small ? "" : "rounded-2xl bg-background/60 p-4 ring-1 ring-foreground/10"}>
          <div className={`relative mx-auto aspect-[9/16] w-full overflow-hidden rounded-[22px] border-[5px] border-neutral-900 bg-white shadow-xl ${small ? "max-w-[180px]" : "max-w-[220px]"}`}>
            <Image src={s.src} alt={s.caption} fill sizes="(max-width: 768px) 45vw, 220px" className="object-cover object-top" />
          </div>
          <figcaption className="mt-3 text-center text-sm font-medium text-foreground/70">{s.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{children}</div>
}
