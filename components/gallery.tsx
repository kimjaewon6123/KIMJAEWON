"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn, FileText, Lock } from "lucide-react"
import PDFModal from "./PDFModal"
import { tmScreens } from "@/lib/projects"

type GalleryItem = {
  id: string
  title: string
  images: string[]
  thumbnail: string
  pdf?: string // 지정하면 이미지 대신 PDF 뷰어로 열림
  confidential?: boolean // 사내 문서 블러본 → 카드에 배지 표시
}

const galleryCategories: { id: string; title: string; confidential?: boolean; items: GalleryItem[] }[] = [
  {
    id: "wips",
    title: "Professional · WIPS 실무",
    confidential: true,
    items: [
      {
        id: "tm-plan",
        title: "상표 연차료 확장 기획안 (HTML 프로토타입)",
        images: [
          "/wips/tm-overview-full.webp", "/wips/tm-process-full.webp", "/wips/tm-issue-full.webp", "/wips/tm-renewal-full.webp",
          "/wips/tm-poa-full.webp", "/wips/tm-status-full.webp", "/wips/tm-cost-full.webp", "/wips/tm-erd-full.webp",
        ],
        thumbnail: "/work/tm-overview.webp",
      },
      {
        id: "tm-screens",
        title: `상표 연차료 화면설계 ${tmScreens.filter((s) => !s.src.includes("ERD")).length}종 + ERD (화면코드 FID 표시)`,
        images: tmScreens.map((s) => s.src),
        thumbnail: "/wips/scr-SCH-014.webp",
        confidential: true,
      },
      {
        id: "hk-api",
        title: "고객사(한국타이어) 연계 API 인터페이스 규격서",
        images: ["/work/hk-api-spec-blur.webp", "/work/hk-api-insert-blur.webp", "/work/hk-api-reminder-blur.webp", "/work/hk-api-billing-blur.webp"],
        thumbnail: "/work/hk-api-insert-blur.webp",
        confidential: true,
      },
      { id: "api", title: "IPAZON 연동 API 프로세스 정의서", images: ["/work/wips-api-process-blur.webp"], thumbnail: "/work/wips-api-process-blur.webp", confidential: true },
      { id: "spec", title: "연동 화면설계서 — ON/OFF · 실패 알림 정의", images: ["/work/wips-spec1-blur.webp"], thumbnail: "/work/wips-spec1-blur.webp", confidential: true },
      { id: "its", title: "연차료 서비스 이슈처리(ITS) 프로세스", images: ["/work/wips-its-flow-blur.webp"], thumbnail: "/work/wips-its-flow-blur.webp", confidential: true },
    ],
  },
  {
    id: "archive",
    title: "Project Archive",
    items: [
      {
        id: "wf1",
        title: "POP-POP 화면설계서",
        images: [
          "/pop/pp1.jpg", "/pop/pp2.jpg", "/pop/pp3.jpg", "/pop/pp4.jpg", "/pop/pp5.jpg",
          "/pop/wire1.jpg", "/pop/wire2.jpg", "/pop/wire3.jpg", "/pop/wire4.jpg",
        ],
        thumbnail: "/pop/pp1.jpg",
      },
      { id: "sys", title: "POP-POP 시스템 기능 흐름도 (User·Client·Server·DB)", images: ["/pop/sy1.jpg"], thumbnail: "/pop/sy1.jpg" },
      { id: "ia", title: "POP-POP IA · 서비스 플로우", images: ["/pop/popia.jpg"], thumbnail: "/pop/popia.jpg" },
      { id: "wire3", title: "기출로 리뉴얼 화면설계서", images: ["/ki/기출로1.jpg", "/ki/기출로2.jpg", "/ki/기출로3.jpg"], thumbnail: "/ki/기출로1.jpg" },
      { id: "journey", title: "T셀파몰 페르소나 · 고객 여정지도", images: ["/user.jpg"], thumbnail: "/user.jpg" },
      { id: "comp", title: "T셀파몰 경쟁사 기능 비교 분석", images: ["/경쟁사.jpg"], thumbnail: "/경쟁사.jpg" },
    ],
  },
]

export default function Gallery() {
  const [activeTab, setActiveTab] = useState(galleryCategories[0].id)
  const [lightbox, setLightbox] = useState<{ images: string[]; title: string } | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const [pdf, setPdf] = useState<{ url: string; title: string } | null>(null)

  const activeCategory = galleryCategories.find((c) => c.id === activeTab) ?? galleryCategories[0]
  const count = lightbox?.images.length ?? 0

  const openItem = (item: GalleryItem) => {
    if (item.pdf) {
      setPdf({ url: item.pdf, title: item.title })
    } else if (item.images.length > 0) {
      setSlideIndex(0)
      setLightbox({ images: item.images, title: item.title })
    }
  }

  const close = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() => setSlideIndex((i) => (i - 1 + count) % count), [count])
  const next = useCallback(() => setSlideIndex((i) => (i + 1) % count), [count])

  // 라이트박스: 키보드 조작 + 뒤 페이지 스크롤 잠금
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowLeft" && count > 1) prev()
      else if (e.key === "ArrowRight" && count > 1) next()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightbox, count, close, prev, next])

  return (
    <section id="gallery" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container relative z-10 mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="mb-4 block text-sm font-medium uppercase tracking-widest text-muted-foreground/60">
            05 — Documents
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">Document</h2>
        </motion.div>

        <div className="mb-12 flex gap-6 border-b border-border/30 pb-4" role="tablist">
          {galleryCategories.map((category) => (
            <button
              key={category.id}
              role="tab"
              aria-selected={activeTab === category.id}
              onClick={() => setActiveTab(category.id)}
              className={`relative pb-2 text-sm font-medium transition-colors duration-300 ${
                activeTab === category.id ? "text-foreground" : "text-muted-foreground/50 hover:text-muted-foreground"
              }`}
            >
              {category.title}
              {activeTab === category.id && (
                <motion.div
                  layoutId="gallery-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {activeCategory.confidential && (
          <p className="-mt-6 mb-8 flex items-start gap-2 text-sm text-muted-foreground">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" /> <span>Confidential 표시 문서는 보안상 내용을 블러 처리했습니다. 원본은 면접에서 직접 시연해 드릴 수 있습니다.</span>
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {activeCategory.items.map((item) => (
              <GalleryCard key={item.id} item={item} confidential={item.confidential} onOpen={() => openItem(item)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 이미지 라이트박스 */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative mx-4 w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-4 text-white/70">
                <p className="truncate text-sm font-medium">
                  {lightbox.title} {count > 1 && <span className="text-white/40">({slideIndex + 1}/{count})</span>}
                </p>
                <button onClick={close} className="shrink-0 p-1 transition-colors hover:text-white" aria-label="닫기 (Esc)">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="relative h-[75vh] w-full overflow-hidden rounded-lg bg-black/50">
                <Image
                  key={lightbox.images[slideIndex]}
                  src={lightbox.images[slideIndex]}
                  alt={`${lightbox.title} ${slideIndex + 1}`}
                  fill
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-contain"
                  priority
                />
                {/* 다음 장 미리 받아두기 → 넘길 때 대기 없음 */}
                {count > 1 && (
                  <Image
                    src={lightbox.images[(slideIndex + 1) % count]}
                    alt=""
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="invisible object-contain"
                    loading="eager"
                    aria-hidden="true"
                  />
                )}

                {count > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/25"
                      aria-label="이전"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/25"
                      aria-label="다음"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                  </>
                )}
              </div>

              {count > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2 overflow-x-auto py-2">
                  {lightbox.images.map((img, i) => (
                    <button
                      key={`${img}-${i}`}
                      onClick={() => setSlideIndex(i)}
                      aria-label={`${i + 1}번째 이미지`}
                      className={`relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                        slideIndex === i ? "scale-110 border-white" : "border-transparent opacity-50 hover:opacity-80"
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="48px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PDFModal isOpen={!!pdf} onClose={() => setPdf(null)} pdfUrl={pdf?.url ?? ""} title={pdf?.title} />
    </section>
  )
}

// hover 효과는 전부 CSS(group-hover)로 처리 → 마우스 움직일 때 리렌더링 없음
function GalleryCard({ item, onOpen, confidential }: { item: GalleryItem; onOpen: () => void; confidential?: boolean }) {
  const [imgError, setImgError] = useState(false)

  return (
    <button type="button" onClick={onOpen} className="group block w-full text-left" aria-label={`${item.title} 보기`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/20 bg-muted/20">
        {!imgError ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className={`transition-[transform,filter] duration-700 ease-out group-hover:scale-110 group-hover:brightness-75 ${
              item.pdf ? "bg-white object-contain p-6" : "object-cover"
            }`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
            <span className="text-xs text-muted-foreground/40">썸네일 없음</span>
          </div>
        )}

        {confidential && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
            <Lock className="h-3 w-3" /> Confidential
          </span>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="mb-3 flex h-12 w-12 scale-50 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-transform duration-300 group-hover:scale-100">
            {item.pdf ? <FileText className="h-5 w-5 text-white" /> : <ZoomIn className="h-5 w-5 text-white" />}
          </div>
          <p className="translate-y-2 px-4 text-center text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
            {item.title}
          </p>
        </div>
      </div>
    </button>
  )
}
