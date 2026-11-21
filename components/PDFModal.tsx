"use client"

import { useEffect, useState } from "react"
import { X, Loader2, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface PDFModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  title?: string
}

export default function PDFModal({ isOpen, onClose, pdfUrl, title }: PDFModalProps) {
  const [loaded, setLoaded] = useState(false)

  // 다른 문서를 열 때마다 로딩 표시 초기화
  useEffect(() => {
    if (isOpen) setLoaded(false)
  }, [isOpen, pdfUrl])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showClose={false}
        aria-describedby={undefined}
        className="flex h-[90vh] w-[94vw] max-w-[1400px] flex-col gap-0 overflow-hidden border-none bg-white p-0 sm:rounded-xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-3 text-black">
          <DialogTitle className="truncate text-sm font-semibold">{title || "문서 보기"}</DialogTitle>
          <div className="flex shrink-0 items-center gap-1">
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-black/60 hover:bg-black/5 hover:text-black"
              >
                <ExternalLink className="h-4 w-4" />
                새 탭에서 열기
              </a>
            )}
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-black/60 hover:bg-black/5 hover:text-black"
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 bg-neutral-100">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-black/50">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="text-sm">문서를 불러오는 중입니다…</span>
            </div>
          )}
          {isOpen && pdfUrl && (
            <iframe
              key={pdfUrl}
              src={pdfUrl}
              title={title || "PDF 문서"}
              onLoad={() => setLoaded(true)}
              className="h-full w-full border-0"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
