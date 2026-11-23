export type Metric = { value: string; unit?: string; label: string }
/** full: 클릭 시 여는 원본 크기 이미지 (없으면 src) */
export type Shot = { src: string; caption: string; kind?: "wide" | "phone"; full?: string }

/** 핵심 설계 포인트 카드 (로직·규격 원칙) */
export type Highlight = { tag: string; title: string; desc: string; points?: string[] }

/** 시스템 간 연동 단계 (시퀀스) */
export type FlowStep = { name: string; dir: "out" | "in"; desc: string }
export type Flow = { title: string; left: string; right: string; steps: FlowStep[]; note?: string }

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
  /** 핵심 설계 포인트 */
  highlights?: { label: string; items: Highlight[] }
  /** 연동 시퀀스 */
  flow?: Flow
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
  { src: "/wips/scr-ITM-019.webp", caption: "ITM-019 신건확인(상표) · 신규" },
  { src: "/wips/scr-ITM-002.webp", caption: "ITM-002 신건입력 · 수정" },
  { src: "/wips/scr-SCH-004.webp", caption: "SCH-004 건상세 · POA 이력 · 수정" },
  { src: "/wips/scr-SCH-008.webp", caption: "SCH-008 연차상세(상표) · 수정" },
  { src: "/wips/scr-SCH-017.webp", caption: "SCH-017 리마인더 회신 · 분할 · 수정" },
  { src: "/wips/scr-SCH-014.webp", caption: "SCH-014 POA 발송·회신 · 신규" },
  { src: "/wips/scr-SCH-015.webp", caption: "SCH-015 POA 생성 · 신규" },
  { src: "/wips/scr-SCH-016.webp", caption: "SCH-016 POA 독촉 일괄발송 · 신규" },
  { src: "/wips/scr-SCH-013.webp", caption: "SCH-013 POA 회신 등록 · 신규" },
  { src: "/wips/scr-ITM-008.webp", caption: "ITM-008 POA 발송 메일 · 수정" },
  { src: "/wips/scr-PAY-001.webp", caption: "PAY-001 인보이스 접수 · 수정" },
  { src: "/wips/scr-PAY-002.webp", caption: "PAY-002 인보이스 입력 · 수정" },
  { src: "/wips/scr-PAY-017.webp", caption: "PAY-017 상표 인보이스 입력 · 신규" },
  { src: "/wips/scr-PAY-015.webp", caption: "PAY-015 기타비용 · 신규" },
  { src: "/wips/scr-PAY-016.webp", caption: "PAY-016 기타비용 입력 · 신규" },
  { src: "/wips/scr-MGR-015.webp", caption: "MGR-015 국가 설정 · 상표 기준 · 수정" },
  { src: "/wips/scr-MGR-018.webp", caption: "MGR-018 POA 서식관리 · 신규" },
  { src: "/wips/scr-MGR-019.webp", caption: "MGR-019 POA 서식 등록 · 신규" },
  { src: "/wips/scr-MGR-020.webp", caption: "MGR-020 고객 상세 · 수수료 · 수정" },
  { src: "/wips/scr-ERD.webp", caption: "ERD 상표 추가항목 · 참고" },
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
      "특허·실용신안·디자인만 관리하던 연차료 서비스에 상표 갱신 업무를 통합하는 프로젝트를 혼자 맡아 기획하고 있습니다. 실제 운영 중인 시스템 화면을 기반으로 HTML 인터랙티브 기획안을 만들고, 요구사항을 11개 이슈 · 140개 세부 규칙으로 쪼개 화면의 기능 ID(FID)와 1:1로 연결했습니다. 화면에서 끝내지 않고 상표 데이터가 저장될 DB 구조까지 ERD와 대조했습니다.",
    metrics: [
      { value: "19", unit: "개", label: "화면 설계 (신규 10 · 수정 9)" },
      { value: "11", unit: "건", label: "이슈 단위 요구사항 정의" },
      { value: "140", unit: "개", label: "기능 ID에 연결한 세부 규칙" },
    ],
    problem: [
      "상표는 ‘연차’가 아니라 국가별 갱신 주기 · 류 수 · 지정상품 개수로 비용이 정해져, 기존 특실디 구조로는 처리 불가",
      "국가마다 다른 POA · 공증 · 사용선언 요건과 공증비 · 우편료 같은 부대비용이 수기 · 개별 관리",
      "ERD의 권리구분 코드부터 특허·실용·디자인뿐 — 상표 데이터를 담을 코드 · 컬럼 · 테이블 부재",
    ],
    approach: [
      "21단계 업무 프로세스는 유지하고 상표 영향 단계(회차 생성 · POA · 인보이스 · 청구)만 표시해 변경 범위 최소화",
      "‘회차’ 단위와 공통 공식을 정의해 국가 설정값(처리종류 · 최초 · 주기)만으로 날짜 · 회차 계산",
      "해외비용구조 엑셀에서 공통 구조를 찾아 국가별 분기 없는 ‘류 범위 × 금액’ 계산식 설계",
      "POA 진행상태를 기한 · 수령 서류로 자동 판정하고, 회신 완료 전엔 납부지시를 차단",
    ],
    result: [
      "HTML 기획안 + 기능명세서로 화면 19개 · 세부 규칙 140개 정의 (v0.2)",
      "ERD 영향 분석: 기존 15개 테이블 · 56개 컬럼 추가, 신규 테이블 6개, 코드 19건을 개발 전에 전달",
      "상표 관납료 기준표 202개 관납료번호 · 423행을 초기 데이터로 정리",
    ],
    shots: [
      { src: "/work/tm-overview.webp", full: "/wips/tm-overview-full.webp", caption: "서비스 개요 — 기존 권리와 상표의 차이" },
      { src: "/work/tm-process.webp", full: "/wips/tm-process-full.webp", caption: "21단계 업무 프로세스 · 상표 영향 단계 표시" },
      { src: "/work/tm-renewal.webp", full: "/wips/tm-renewal-full.webp", caption: "ISSUE-02 갱신 회차 · 분할납부 규칙" },
      { src: "/work/tm-status.webp", full: "/wips/tm-status-full.webp", caption: "ISSUE-05 POA 진행상태 자동 판정" },
      { src: "/work/tm-cost.webp", full: "/wips/tm-cost-full.webp", caption: "ISSUE-09 ‘류 범위 × 금액’ 비용 계산식" },
      { src: "/work/tm-erd.webp", full: "/wips/tm-erd-full.webp", caption: "ISSUE-11 ERD 영향 분석 (물리명 블러)" },
    ],
    highlights: {
      label: "Key Logic",
      items: [
        {
          tag: "ISSUE-02 · 규칙 36개",
          title: "‘연차’ 대신 ‘회차’를 정의",
          desc: "상표는 국가별 주기(보통 10년)마다 갱신하고 미국처럼 사용선언이 따로 있는 나라도 있어, 국가 설정값만으로 날짜가 계산되게 만들었습니다.",
          points: [
            "회차 = ROUND(만료일 − 기준일)년 + 1 ~ + 갱신 주기 (예: 2016 등록 · 2026 만료 → 11-20)",
            "KR 분할납부: 21-30 → 21-25 (1/2) + 지방세 / 26-30 (2/2) 마감 +5년",
            "갱신·사용선언 회신 N, 무회신 마감 경과 등 예외를 먼저 정의",
          ],
        },
        {
          tag: "ISSUE-09 · 규칙 14개",
          title: "‘류 범위 × 금액’ 공통 계산식",
          desc: "나라마다 금액은 달라도 ‘몇 류까지는 기본료, 그 뒤로는 류마다 추가’ 구조는 같다는 점을 찾아 국가별 분기를 없앴습니다.",
          points: [
            "대한민국 3개 류(상품 9 · 20 · 15개) → 201,000 + 221,000 + 211,000 + 지방세 9,120 = 642,120원",
            "독일 1-1 886 / 2-3 0 / 4-45 307 → 5개 류 = 1,500 USD",
            "류 범위는 1-1로 시작해 45류까지 빈 곳·겹침 없이 이어져야 저장",
          ],
        },
        {
          tag: "ISSUE-03~06 · 규칙 51개",
          title: "POA 상태는 사람이 바꾸지 않는다",
          desc: "권리만료일에서 거꾸로 기한을 계산하고, 진행상태를 날짜와 수령 서류로 매일 자동 판정합니다.",
          points: [
            "대리인 전달마감 = 만료 45일 전, 고객 회신기한 = 그 14일 전",
            "회신 완료 > 마감 초과 > 독촉 필요 > 고객사 확인중 > 요청 완료",
            "POA 필수 국가는 회신 완료 전 납부지시 목록에서 제외 — 서류 없는 납부 요청 차단",
          ],
        },
      ],
    },
    tags: ["B2B 기능 확장", "단독 기획", "HTML 프로토타입 기획안", "업무 규칙 설계", "비용 계산 로직", "ERD 영향 분석"],
    tech: "HTML · CSS · JS 프로토타입, Excel 기능명세서, ERD(논리모델), KIPRIS 데이터",
    screens: tmScreens,
    confidential: true,
  },
  {
    id: "wips",
    client: "(주) 윕스 · 실무",
    title: "IPAZON · 한국타이어 API 연동 & 운영",
    subtitle: "IPAZON 시스템 연동 · 고객사 연계 API 규격 · ITS 운영 고도화",
    period: "2025.07 – 현재",
    role: "PM · 서비스 기획",
    accent: "#F0574D",
    image: "/WIP.webp",
    summary:
      "글로벌 특허 관리 시스템(IPAZON)과 연차료 납부 서비스 간 데이터 연동 기획 및 운영 고도화를 리딩했습니다. 이어 고객사(한국타이어) 시스템이 연차료 업무를 직접 주고받도록 5단계 연계 프로세스와 API 7종의 요청·응답 규격을 정의했고, 기준이 없던 이슈 트래킹(ITS) 프로세스를 체계화했습니다.",
    metrics: [
      { value: "40", unit: "+단계", label: "IPAZON 연동 프로세스 세분화" },
      { value: "7", unit: "종", label: "고객사 연계 API 규격 정의" },
      { value: "90", unit: "%", label: "VOC 대응 일정 준수율" },
    ],
    problem: [
      "IPAZON과 연차료 서비스 간 상태값 불일치·결제 누락 위험",
      "고객사와 메일·엑셀로 오가던 접수 → 안내 → 회신 → 청구 업무",
      "서비스 오픈 후 쏟아지는 VOC를 처리할 이슈 트래킹 기준 부재",
    ],
    approach: [
      "비즈니스 요건을 40단계 이상 플로우로 세분화, 상태값(Status) 매핑 설계",
      "고객사 API는 실제 업무 순서 그대로 5단계로 나누고 응답 코드 · 부분 성공 · 상태 조건 등 실패 응답부터 정의",
      "Google Sheets + MantisBT 기반 ITS 파이프라인, 비즈니스 임팩트 기준 우선순위",
    ],
    result: [
      "수행계획 대비 기획 구현율 100%, VOC 대응 일정 준수율 90%",
      "고객사 연계 규격 v1.0 초안 공동 작성 → 개발 담당과 v1.14까지 확정",
      "환율 DB 갱신 시점과 API 호출 시점 차이 등 근본 원인을 찾아 개발팀과 해결",
    ],
    flow: {
      title: "Customer API · 한국타이어 연계 (2026.06 – 08)",
      left: "한국타이어",
      right: "WIPS 연차료",
      steps: [
        { name: "신건 접수", dir: "out", desc: "권리 목록 배열 + 첨부파일, 출원번호 기준 중복 차단 · 고객관리번호 ↔ 권리 ID 매핑 반환" },
        { name: "접수 확인 (Ack)", dir: "in", desc: "이관 결과 유지 / 반려(중복 · 긴급 · 소멸 · 만료), 청구 단위(사업부)" },
        { name: "리마인더 · 수신 확인", dir: "in", desc: "국가·연차별 납부 예상금액, 수신 확인은 성공·실패 건을 나눠 응답" },
        { name: "회신 · 수정", dir: "out", desc: "납부 여부 Y / N — 상태 조건이 맞는 건만 반영" },
        { name: "청구", dir: "in", desc: "원화 환산 · 최종 청구액, 고객 요청으로 환율 기준일(송금일) 추가" },
      ],
      note: "인증 정보 · 엔드포인트 · 실데이터는 보안상 비공개",
    },
    highlights: {
      label: "API Design Principles",
      items: [
        { tag: "Response", title: "실패 응답부터 정의", desc: "S01 성공 · S02 부분 성공 · E01 중복 · E03 필수값 누락(항목명 명시) · E04 매칭 없음 · E05 상태 불일치 — 고객사가 코드만 보고 다음 행동을 정할 수 있게." },
        { tag: "State Gate", title: "상태 조건 게이트", desc: "내부 화면은 ‘리마인더 발송’ 상태만 회신 입력이 되지만, API는 고객 시스템 처리 시차를 고려해 ‘고객 납부지시 수신’까지 허용 — 연차료팀과 합의 후 규격화." },
        { tag: "Partial", title: "부분 성공을 인정", desc: "여러 건을 한 번에 확인할 때 1건 실패로 전체를 되돌리지 않고, 성공·실패 건수와 실패 ID만 돌려줘 재시도 범위를 최소화." },
        { tag: "Amount", title: "금액 구조 표준화", desc: "관납료 · 현지대리인 · 윕스 수수료 × 현지 / 발행 / 청구 + 지분율 · VAT → 26개 금액·환율 항목을 하나의 정의표로 통일." },
      ],
    },
    shots: [
      { src: "/work/wips-its-flow-blur.webp", caption: "연차료 서비스 이슈처리 프로세스" },
      { src: "/work/wips-api-process-blur.webp", caption: "IPAZON API 연동 프로세스 정의서" },
      { src: "/work/hk-api-insert-blur.webp", caption: "고객사 연계 API 인터페이스 규격서" },
    ],
    tags: ["B2B 서비스 기획", "API 규격 설계", "외부 고객사 연동", "ITS 운영 총괄", "데이터 정합성", "예외 케이스 방어"],
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