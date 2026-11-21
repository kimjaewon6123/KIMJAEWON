"use client"

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
// (sticky 프로필 사진이 동작하도록 section은 overflow-hidden 대신 overflow-clip 사용)
import { ExternalLink, Mail, Phone, MapPin, Calendar, BookOpen, Award } from 'lucide-react'
import PDFModal from './PDFModal'

const experiences = [
  { company: '주식회사 윕스 · DX기획팀', period: '2025.07 – 현재', desc: 'IPAZON 연동 기획 · ITS 운영 총괄 · 상표 연차료 확장 단독 기획', current: true },
  { company: '천재교육 · 에듀테크 PM 서비스/콘텐츠 기획자 10기', period: '2024.12 – 2025.07', desc: '현직 교사 UT, 10만 건 학습 데이터 분석 등 실무형 프로젝트 수행' },
  { company: "IT'S TIME · 대학생 연합 IT 동아리 PM", period: '2025.02 – 2025.07', desc: '6인 팀 리딩, Jira 스프린트 운영으로 MVP 출시' },
  { company: '패스트캠퍼스 · EXPORT PM/PO 4기', period: '2024.09 – 2024.12', desc: '시장 조사부터 로드맵·MVP 설계까지 PM/PO 전 과정 실습' },
  { company: '한국무역협회 · G-TEP 18기', period: '2024.03 – 2025.02', desc: '홍콩 IT 박람회 바이어 상담, 아마존 상품 등록·판매 직접 수행' },
  { company: 'NUFI · 한국공학대학교 동아리 기획부장', period: '2024.03 – 2025.02', desc: '' },
]

const educations = [
  { school: '한국공학대학교', major: 'IT경영학과 전공 · e-커머스 복수전공 (2025.07 졸업)' }
]

const certs = [
  { name: 'Google Analytics (GAIQ)', date: '2025.05' },
  { name: 'ITQ 아래한글 A등급', date: '2013.03' },
  { name: 'ITQ 파워포인트 B등급', date: '2012.12' }
]

export default function AboutMe() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  return (
    <section id="about" ref={containerRef} className="relative py-24 bg-background overflow-clip">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <span className="text-sm font-medium tracking-widest text-muted-foreground/50 uppercase mb-4 block">02 — About Me</span>
        <div className="max-w-4xl">
          <div className="flex flex-col space-y-16">
            
            {/* Intro & Title */}
            <div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-foreground/70 font-semibold mb-4"
              >
                서비스/콘텐츠 기획자 ∙ PM
              </motion.p>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-8">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="block mb-2"
                >
                  데이터와 인사이트로
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="block"
                >
                  단단한 기획을 만듭니다
                </motion.span>
              </h2>

              <motion.blockquote 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-lg lg:text-xl leading-relaxed text-muted-foreground border-l-4 border-foreground/20 pl-6 py-2 my-8"
              >
                보기 좋은 기획서는 많습니다.<br />
                저는 <strong className="text-foreground/70">‘왜 필요한가’</strong>에 끝까지 답할 수 있는 기획을 만듭니다.
              </motion.blockquote>

              <div className="my-10 grid gap-6 sm:grid-cols-3">
                {[
                  ["‘왜 필요한가’부터 묻습니다", "요청을 그대로 옮기지 않고, 업무 흐름에서 실제로 막히는 지점을 먼저 찾습니다."],
                  ["예외 상황을 먼저 막습니다", "연동 실패·상태값 충돌·국가별 예외처럼 운영에서 터질 문제를 명세 단계에서 정의합니다."],
                  ["눌러볼 수 있게 만들어 합의합니다", "동작하는 HTML 기획안으로 개발자·현업과 같은 화면을 보며 결정합니다."],
                ].map(([t, d], i) => (
                  <div key={t} className="border-t-2 border-foreground/80 pt-4">
                    <p className="text-sm font-bold tabular-nums text-foreground/50">0{i + 1}</p>
                    <p className="mt-2 font-bold text-foreground">{t}</p>
                    <p className="mt-1.5 break-keep text-sm leading-relaxed text-foreground/60">{d}</p>
                  </div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col space-y-3 text-muted-foreground"
              >
                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <span>twice6123@naver.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>+82 10 7751 6123</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} />
                  <span>Seoul, South Korea</span>
                </div>
              </motion.div>
            </div>

            {/* Experience */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-6 text-foreground">
                <Calendar className="text-foreground/50" />
                Experience
              </h3>
              <div className="space-y-6 border-l-2 border-border ml-3 pl-6">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="relative group cursor-default"
                  >
                    <div className={`absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${exp.current ? 'bg-foreground border-foreground shadow-[0_0_0_5px_hsl(var(--foreground)/0.12)]' : 'bg-background border-foreground/30'}`} />
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                      <h4 className="text-lg font-bold text-foreground">{exp.company}</h4>
                      <p className="shrink-0 text-muted-foreground text-sm tabular-nums">{exp.period}</p>
                    </div>
                    {exp.desc && <p className="mt-1 text-[15px] text-foreground/60">{exp.desc}</p>}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education & Certs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [perspective:1000px]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.01, rotateX: 2, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="bg-secondary p-6 rounded-2xl shadow-sm border border-border/10 cursor-default"
              >
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-foreground">
                  <BookOpen className="text-foreground/50" />
                  Education
                </h3>
                {educations.map((edu, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-foreground">{edu.school}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{edu.major}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.01, rotateX: 2, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="bg-secondary p-6 rounded-2xl shadow-sm border border-border/10 cursor-default"
              >
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-foreground">
                  <Award className="text-foreground/50" />
                  Certifications
                </h3>
                <ul className="space-y-2">
                  {certs.map((cert, i) => (
                    <li key={i} className="flex justify-between items-center text-sm">
                      <span className="font-medium text-foreground">{cert.name}</span>
                      <span className="text-muted-foreground">{cert.date}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Resume Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="group flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <span>이력서 보기</span>
                <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.div>

          </div>
        </div>
      </div>

      <PDFModal 
        isOpen={isPdfModalOpen} 
        onClose={() => setIsPdfModalOpen(false)} 
        pdfUrl="/docs/resume.pdf"
        title="이력서"
      />
    </section>
  )
}
