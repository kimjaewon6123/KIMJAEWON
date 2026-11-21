export type Metric = { value: string; unit?: string; label: string }
export type Shot = { src: string; caption: string; kind?: "wide" | "phone" }

export type Project = {
  id: string
  client: string
  title: string
  subtitle: string
  period: string
  role: string
  /** 프로젝트 포인트 컬러 (상세 패널에서만 은은하게 사용) */
  accent: string
  image: string
  summary: string
  metrics: Metric[]
  problem: string[]
  approach: string[]
  result: string[]
  shots: Shot[]
  tags: string[]
  tech: string
  pdf?: string
  github?: string
  /** 사내 문서 — 이미지는 블러 처리본, 상세는 면접에서 시연 */
  confidential?: boolean
  /** 사내 화면설계 — 화면코드(FID) 표시 + 내용 블러 */
  screens?: Shot[]
  /** 여러 개의 작은 프로젝트를 한 카드로 묶을 때 — 각자 문서·GitHub를 따로 가짐 */
  builds?: Build[]
}

export type Build = {
  name: string
  period: string
  image: string
  summary: string
  points: string[]
  tags: string[]
  shots?: Shot[]
  pdf?: string
  github?: string
}

/** 상표 연차료 — 이슈별로 바뀐 화면 (Alt+I 화면코드 표시, 내용 블러) */
export const tmScreens: Shot[] = [
  { src: "/wips/scr-ITM-019.webp", caption: "신건확인(상표) · 신규" },
  { src: "/wips/scr-ITM-002.webp", caption: "신건입력 · 수정" },
  { src: "/wips/scr-SCH-004.webp", caption: "건상세 · POA 발송·이력" },
  { src: "/wips/scr-ITM-008.webp", caption: "POA 발송 메일 · 수정" },
  { src: "/wips/scr-SCH-014.webp", caption: "POA 발송·회신 추적 · 신규" },
  { src: "/wips/scr-SCH-015.webp", caption: "POA 발송 생성 · 신규" },
  { src: "/wips/scr-SCH-013.webp", caption: "POA 회신 등록 · 신규" },
  { src: "/wips/scr-PAY-001.webp", caption: "인보이스 접수 · 수정" },
  { src: "/wips/scr-PAY-017.webp", caption: "상표 인보이스 입력 · 신규" },
  { src: "/wips/scr-PAY-015.webp", caption: "기타비용 · 신규" },
  { src: "/wips/scr-PAY-016.webp", caption: "기타비용 입력 · 신규" },
  { src: "/wips/scr-SCH-008.webp", caption: "연차상세(상표) · 관납료 계산" },
  { src: "/wips/scr-MGR-015.webp", caption: "국가 설정 · 갱신·관납료 기준" },
  { src: "/wips/scr-MGR-018.webp", caption: "POA 서식관리 · 신규" },
  { src: "/wips/scr-MGR-019.webp", caption: "POA 서식 등록 · 신규" },
  { src: "/wips/scr-MGR-020.webp", caption: "고객 상세 · 수수료 기준" },
]

export const projects: Project[] = [
  {
    id: "wips-tm",
    client: "(주) 윕스 · 실무 · 단독 기획",
    title: "상표 연차료 서비스 확장",
    subtitle: "특허·실용신안·디자인에 이어 상표까지 — 연차료 관리 통합 기획",
    period: "2026 – 진행 중",
    role: "단독 기획 · 화면설계 · 기능명세",
    accent: "#1677FF",
    image: "/work/tm-overview.webp",
    summary:
      "특허·실용신안·디자인만 관리하던 연차료 서비스에 상표 갱신 업무를 통합하는 프로젝트를 혼자 맡아 기획하고 있습니다. 실제 운영 중인 연차료 시스템 화면을 그대로 기반 삼아 HTML 인터랙티브 기획안을 직접 만들어, 개발자와 현업이 화면을 눌러보며 요구사항을 확인할 수 있게 했습니다.",
    metrics: [
      { value: "22", unit: "개", label: "화면 설계 (신규·수정)" },
      { value: "10", unit: "건", label: "이슈 단위 요구사항 정의" },
      { value: "21", unit: "단계", label: "연차료 업무 프로세스 재정의" },
    ],
    problem: [
      "상표는 연차가 아니라 국가별 갱신 주기·류 수·지정상품 개수로 비용이 정해져, 기존 특실디 구조로는 처리 불가",
      "국가마다 다른 POA·공증·사용선언 요건과 공증료·우편료 같은 부대비용이 수기·개별 관리",
    ],
    approach: [
      "21단계 업무 프로세스에서 상표 영향 단계(회차 생성·POA·인보이스·청구)만 표시해 변경 범위 최소화",
      "요구사항을 10개 ISSUE로 쪼개 이슈별 기준 · 관련 화면 · 기능 ID를 1:1로 연결",
      "해외비용구조 엑셀을 분석해 국가별 분기 없이 쓰는 ‘류 범위 × 금액’ 공통 계산식 설계",
    ],
    result: [
      "실제 시스템 기반 HTML 기획안 + 기능명세서로 화면 22개 정의 (v0.2 진행 중)",
      "POA 진행상태 자동 판정, KR 분할납부, 회차 계산 등 예외 규칙을 명세 단계에서 확정",
    ],
    shots: [
      { src: "/work/tm-overview.webp", caption: "기획안 — 서비스 개요 · 기존 권리와의 차이" },
      { src: "/work/tm-process.webp", caption: "21단계 업무 프로세스 · 상표 영향 단계 표시" },
      { src: "/work/tm-issue.webp", caption: "이슈별 화면설계 — 기준 · 관련 화면 · 기능 ID" },
    ],
    tags: ["B2B 기능 확장", "단독 기획", "HTML 프로토타입 기획안", "업무 프로세스 설계", "비용 계산 로직", "예외 규칙 정의"],
    tech: "HTML · CSS · JS 프로토타입, Excel 기능명세서, KIPRIS 데이터",
    screens: tmScreens,
  },
  {
    id: "wips",
    client: "(주) 윕스 · 실무",
    title: "WIPS 시스템 연동 및 운영 고도화",
    subtitle: "IPAZON – 연차료 서비스 통합 연동",
    period: "2025.07 – 현재",
    role: "PM · 서비스 기획 총괄",
    accent: "#F0574D",
    image: "/WIP.webp",
    summary:
      "글로벌 특허 관리 시스템(IPAZON)과 연차료 납부 서비스 간의 데이터 연동 기획 및 운영 고도화를 리딩했습니다. 특허 데이터가 유실 없이 오가도록 API 명세를 설계하고, 기준이 없던 이슈 트래킹(ITS) 프로세스를 체계화했습니다.",
    metrics: [
      { value: "40", unit: "+단계", label: "API 연동 프로세스 세분화" },
      { value: "100", unit: "%", label: "수행계획 대비 기획 구현율" },
      { value: "90", unit: "%", label: "VOC 대응 일정 준수율" },
    ],
    problem: [
      "IPAZON과 연차료 서비스 간 상태값 불일치·결제 누락 위험",
      "서비스 오픈 후 쏟아지는 VOC를 처리할 이슈 트래킹 기준 부재",
    ],
    approach: [
      "비즈니스 요건을 40단계 이상 플로우로 세분화, 상태값(Status) 매핑 설계",
      "API 전송 실패 시 처리 중단·실패 알림 등 엣지 케이스 방어 정책 수립",
      "Google Sheets + MantisBT 기반 ITS 파이프라인, 비즈니스 임팩트 기준 우선순위",
    ],
    result: [
      "수행계획 대비 기획 구현율 100%, VOC 대응 일정 준수율 90%",
      "환율 DB 갱신 시점과 API 호출 시점 차이 등 근본 원인을 찾아 개발팀과 해결",
    ],
    shots: [
      { src: "/work/wips-its-flow-blur.webp", caption: "연차료 서비스 이슈처리 프로세스" },
      { src: "/work/wips-spec1-blur.webp", caption: "화면설계서 — 연동 ON/OFF·실패 알림 정의" },
      { src: "/work/wips-api-process-blur.webp", caption: "API 연동 프로세스 정의서" },
    ],
    tags: ["B2B 서비스 기획", "API 연동 명세", "ITS 운영 총괄", "데이터 정합성", "예외 케이스 방어"],
    tech: "MantisBT, Google Sheets, MS Excel, PowerPoint",
    confidential: true,
  },
  {
    id: "tsel",
    client: "천재교육 · 현업 프로젝트",
    title: "교육 플랫폼 UX 혁신",
    subtitle: "천재교육 T셀파몰 리뉴얼",
    period: "2025.01.14 – 01.24",
    role: "UX 리서치 · 기획 총괄",
    accent: "#F28A2E",
    image: "/p1.webp",
    summary:
      "현직 초등교사 10명을 대상으로 시나리오 기반 UT와 경쟁사 분석을 진행해 실사용 맥락의 인사이트를 도출하고, 후기 기반 커뮤니티와 장바구니·온보딩 경험을 다시 설계했습니다.",
    metrics: [
      { value: "10", unit: "명", label: "현직 초등교사 인터뷰·UT" },
      { value: "67", unit: "%", label: "A/B 테스트 개선안 선택 비율" },
      { value: "3", unit: "개", label: "핵심 화면 리디자인" },
    ],
    problem: [
      "미이용 교사의 100%가 “T셀파몰을 알지 못함” — 낮은 인지도",
      "평점·짧은 텍스트 위주의 후기, 수량 합산·교사 간 협의 기능 부재",
    ],
    approach: [
      "설문·심층 인터뷰, 페르소나·여정지도, AARRR 퍼널 진단",
      "가설 기반 ZOOM 비대면 UT와 A/B 테스트로 메인·장바구니·쌤후기zip 검증",
    ],
    result: [
      "월별 행사 카테고리·플로팅 메뉴·평점 시스템으로 메인 개선",
      "구매 이력 기반 후기 작성, 폴더형·공유 장바구니 설계",
    ],
    shots: [
      { src: "/work/tsel-main.webp", caption: "메인 — 월별 행사 · 플로팅 메뉴" },
      { src: "/work/tsel-review.webp", caption: "쌤후기zip — 카테고리별 후기" },
      { src: "/work/tsel-cart.webp", caption: "폴더형 장바구니" },
    ],
    tags: ["현업 프로젝트", "교사 대상 UT", "유저 리서치", "A/B 테스트", "시장분석"],
    tech: "Figma, Google Forms, Notion, Zoom, Slack",
    pdf: "/docs/t셀파몰.pdf",
  },
  {
    id: "pop",
    client: "입사 전 · IT'S TIME 6인 팀",
    title: "POP-POP 팀 리딩 · MVP 출시",
    subtitle: "실시간 팝업스토어 커뮤니티 앱 — 6인 팀을 애자일 스프린트로 리드",
    period: "2025.02.14 – 06.10",
    role: "PM · 기획 총괄",
    accent: "#4C7DFF",
    image: "/p3.webp",
    summary:
      "팝업스토어 소비자 330명 설문에서 “방문 전 가장 궁금한 건 대기 줄”(72%)이라는 인사이트를 찾고, 기획·디자인·개발 6인 팀을 리드해 실시간 대기 공유 커뮤니티 앱을 MVP로 출시했습니다.",
    metrics: [
      { value: "6", unit: "인", label: "기획·디자인·개발 협업 리딩" },
      { value: "330", unit: "명", label: "소비자 설문 기반 기획" },
      { value: "72", unit: "%", label: "‘대기 줄’이 가장 궁금하다" },
    ],
    problem: [
      "팝업 검색량 5년간 486% 증가, 하지만 실시간 대기 정보는 흩어져 있음",
      "탐색 → 방문 → 기록 → 공유 여정이 서로 다른 서비스로 분절",
    ],
    approach: [
      "리서치 → 페르소나·여정 → IA·기능명세 → Figma 화면설계",
      "Jira 스프린트·Notion 문서화·정기 회의로 협업 구조 설계",
    ],
    result: [
      "실시간 대기 공유·지도·리뷰·즐겨찾기를 갖춘 MVP 출시",
      "반복 피드백으로 앱 구조를 지속 개선, 87%가 이용 희망",
    ],
    shots: [
      { src: "/work/pop-home.webp", caption: "홈", kind: "phone" },
      { src: "/work/pop-wait.webp", caption: "대기 현황 공유", kind: "phone" },
      { src: "/work/pop-map.webp", caption: "지도 탭", kind: "phone" },
      { src: "/work/pop-review.webp", caption: "팝업 리뷰", kind: "phone" },
    ],
    tags: ["PM 실전 경험", "애자일 협업", "MVP 출시", "기획-디자인-개발 소통"],
    tech: "Figma, Notion, Jira, Slack, Discord, GitHub",
    pdf: "/docs/POP.pdf",
    github: "https://github.com/ita-poppop/backend.git",
  },
  {
    id: "builds",
    client: "Side Builds · 개인",
    title: "AI로 직접 만들어 검증하는 기획",
    subtitle: "SCRS 실시간 예약 웹앱 · AI 논술 분석 / MBTI 챗봇",
    period: "2025.03 – 2025.05",
    role: "기획 → 설계 → 개발 단독 수행",
    accent: "#9B7BFF",
    image: "/p4.webp",
    summary:
      "문서로만 기획하면 동시성·예외 상황·AI 출력 품질 같은 리스크가 잘 보이지 않습니다. 그래서 AI 코딩 도구를 활용해 요구사항 정의부터 설계·구현까지 직접 완주하며, 기획이 실제로 돌아가는지 손으로 검증한 두 개의 프로토타입입니다.",
    metrics: [
      { value: "2", unit: "종", label: "직접 구현한 동작 프로토타입" },
      { value: "1", unit: "인", label: "요구사항부터 DB 연결까지 단독" },
      { value: "16", unit: "개", label: "성향별 챗봇 페르소나 구현" },
    ],
    problem: [
      "기획서만으로는 동시 접속·실패 처리 같은 예외 흐름을 놓치기 쉬움",
      "LLM 기능은 ‘얼마나 믿을 만한 결과를 주는가’를 직접 만들어 봐야 판단 가능",
    ],
    approach: [
      "요구사항 정의 → 유즈케이스 → ERD → 구현까지 Cursor·ChatGPT·Claude로 단독 진행",
      "예약 중복 발생 → 확인 → 비교 → 삽입 → 커밋 트랜잭션으로 재설계",
      "OCR → 과목별 Rubric 분기 → 항목별 평가 → 리라이팅 재평가로 AI 품질 기준 설계",
    ],
    result: [
      "예약·결제·취소·대기·알림을 갖춘 웹앱, 항목별 점수·해설을 즉시 주는 AI 분석 프로토타입",
      "예외 흐름을 먼저 설계하는 습관 → 현재 WIPS API 연동의 실패 처리 정책 설계로 연결",
    ],
    shots: [],
    tags: ["AI 프로토타이핑", "예외 케이스 설계", "트랜잭션", "LLM 서비스 기획", "프롬프트 설계"],
    tech: "Cursor, ChatGPT, Claude, OpenAI API, JSP, MySQL, React, Figma",
    builds: [
      {
        name: "SCRS — 미용실 실시간 예약 웹앱",
        period: "2025.03.01 – 03.18",
        image: "/p4.webp",
        summary: "노쇼(예약부도)가 잦은 미용실 예약 문제를 주제로, 실시간 예약·대기·알림 흐름을 설계하고 JSP/MySQL로 구현했습니다.",
        points: [
          "요구사항 정의서·유즈케이스·시퀀스·ERD 직접 작성",
          "동시 접속 시 예약 중복 문제를 트랜잭션 흐름 재설계로 해결",
        ],
        tags: ["JSP", "MySQL", "ERD"],
        shots: [
          { src: "/work/scrs-list.webp", caption: "매장 리스트", kind: "phone" },
          { src: "/work/scrs-detail.webp", caption: "매장 상세", kind: "phone" },
          { src: "/work/scrs-rev.webp", caption: "예약 · 대기", kind: "phone" },
          { src: "/work/scrs-my.webp", caption: "마이페이지", kind: "phone" },
        ],
        pdf: "/docs/Full.pdf",
        github: "https://github.com/kimjaewon6123/scrs.git",
      },
      {
        name: "AI 논술 분석 & MBTI 성향 챗봇",
        period: "2025.04.22 – 05.15",
        image: "/p6.webp",
        summary: "평균 2~3일 걸리던 논술 첨삭을 즉시 피드백으로 바꾸는 분석 서비스와, 16개 성향을 구현한 MBTI 챗봇을 OpenAI API로 만들었습니다.",
        points: [
          "논술: OCR → 과목별 Rubric → 항목별 점수·해설·개선 예시",
          "챗봇: Role Prompting · RAG · 메모리 주입으로 16개 페르소나 일관성 유지",
        ],
        tags: ["OpenAI API", "RAG", "React"],
        pdf: "/docs/AI.pdf",
        github: "https://github.com/kimjaewon6123/mbti.git",
      },
    ],
  },
]