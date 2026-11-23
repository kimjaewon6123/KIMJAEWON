/** 배포 경로 접두사 (GitHub Pages: /KIMJAEWON, 로컬: "") */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/** public 폴더 파일 경로("/docs/x.pdf")에 basePath를 붙임. 외부 URL·해시·이미 붙은 경로는 그대로 */
export function withBase(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path
  if (BASE_PATH && (path === BASE_PATH || path.startsWith(BASE_PATH + "/"))) return path
  return BASE_PATH + path
}
