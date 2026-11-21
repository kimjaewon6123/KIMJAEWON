'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ClipboardCheck, Target, Brain, UsersRound, type LucideIcon } from 'lucide-react'

type Skill = { icon: LucideIcon; slogan: string; description: string }

const skills: Skill[] = [
  {
    icon: ClipboardCheck,
    slogan: '실무 중심의 기획, 디테일에서 경쟁력이 나온다',
    description: '서비스 개선, IA 설계, 와이어프레임 및 프로토타입 작성 등 기획 전반의 실무형 문서화 역량 보유',
  },
  {
    icon: Target,
    slogan: '사용자 중심 전략을 구조화하다',
    description: '페르소나 설계, 여정 지도, 블루프린트 기반의 전략적 기획과 데이터 기반 의사결정 경험 보유',
  },
  {
    icon: Brain,
    slogan: 'AI와 함께 기획을 더 빠르고 똑똑하게',
    description: 'Prompt Engineering, Vibe Coding, ChatGPT 등 생성형 AI를 활용한 기획 자동화 및 혁신 경험',
  },
  {
    icon: UsersRound,
    slogan: '다양한 팀과 함께 목표를 실현하는 커뮤니케이터',
    description: '팀 커뮤니케이션, 요구사항 분석, 이해관계자 협업을 통해 효과적인 실행력을 이끈 경험',
  },
]

const toolImages = [
  { src: "/1.png", alt: "tool1" },
  { src: "/2.png", alt: "tool2" },
  { src: "/3.png", alt: "tool3" },
  { src: "/4.png", alt: "tool4" },
  { src: "/5.png", alt: "tool5" },
  { src: "/6.png", alt: "tool6" },
  { src: "/7.png", alt: "tool7" },
  { src: "/8.png", alt: "tool8" },
  { src: "/9.png", alt: "tool9" },
  { src: "/10.png", alt: "tool10" },
  { src: "/11.png", alt: "tool11" },
  { src: "/12.png", alt: "tool12" },
  { src: "/13.png", alt: "tool13" },
]

// 이전: hover 시 설명이 펼쳐지며 카드 높이가 바뀌어 아래 카드들이 밀리고 깜빡이는 문제가 있었음
// 수정: 설명은 항상 보이고, hover 효과는 레이아웃에 영향 없는 색/그림자만 사용
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const Icon = skill.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full rounded-2xl border border-border bg-card p-8 transition-[background-color,box-shadow,border-color] duration-300 hover:border-foreground/20 hover:bg-accent hover:shadow-xl"
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-foreground/60 transition-colors duration-300 group-hover:text-foreground">
          <Icon size={32} />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-4">
            <span className="text-4xl font-black text-foreground/10">0{index + 1}</span>
            <h3 className="text-xl font-bold text-foreground md:text-2xl">{skill.slogan}</h3>
          </div>
          <p className="mt-2 leading-relaxed text-muted-foreground">{skill.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function MarqueeRow({ items, reverse = false }: { items: typeof toolImages, reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden w-full">
      {/* Left & Right Fading Gradient Overlays (Replaces heavy mask-image) */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* gap 대신 각 아이템에 margin-right를 줘야 -50% 이동 시 이음새 없이 반복됨 */}
      <div className={reverse ? 'animate-scroll-reverse' : 'animate-scroll'}>
        {[...items, ...items].map((tool, idx) => (
          <div
            key={idx}
            aria-hidden={idx >= items.length}
            className="mr-8 flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-card p-4 shadow-sm md:h-28 md:w-28"
          >
            <Image src={tool.src} alt={tool.alt} width={80} height={80} className="h-full w-full object-contain opacity-60 transition-opacity duration-300 hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const midPoint = Math.ceil(toolImages.length / 2)
  const row1 = toolImages.slice(0, midPoint)
  const row2 = toolImages.slice(midPoint)

  return (
    <section id="skills" className="relative min-h-screen py-24 overflow-hidden bg-background">
      {/* 배경 그라데이션 (무거운 blur + mix-blend 대신 radial-gradient로 같은 느낌, GPU 부담 감소) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(500px circle at 25% 25%, hsl(var(--foreground) / 0.05), transparent 70%), radial-gradient(600px circle at 75% 75%, hsl(var(--foreground) / 0.03), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium tracking-widest text-muted-foreground/50 uppercase mb-4 block">03 — Skills</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            기획부터 실행까지, 성공적인 프로덕트를 만들기 위한 핵심 역량
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 mb-32">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            Tools & Technologies
          </h3>
          
          <div className="flex flex-col gap-8 w-full overflow-hidden">
            <MarqueeRow items={row1} />
            <MarqueeRow items={row2} reverse={true} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
