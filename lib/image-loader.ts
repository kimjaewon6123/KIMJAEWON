import { withBase } from "./base-path"

/** next/image 커스텀 로더 — 리사이즈 없이 public 파일에 basePath만 붙임 (w는 캐시 키 구분용) */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  return `${withBase(src)}?w=${width}`
}
