"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "./icons";

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden py-24 px-6 md:px-12"
    >
      {/* Background Marquee */}
      {/* 배경 마키: JS 무한 애니메이션 대신 CSS 애니메이션 (메인 스레드 부담 없음) */}
      <div className="absolute inset-0 z-0 flex items-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="animate-marquee">
          {[0, 1].map((i) => (
            <span key={i} className="text-[15vw] font-black text-foreground/[0.03] tracking-tighter pr-8">
              CONTACT — LET’S CONNECT — WORK WITH ME —
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-12 left-6 md:left-12 z-10">
        <span className="text-sm font-medium text-muted-foreground/50 tracking-wider">
          06 — Contact
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl w-full mx-auto flex flex-col items-center text-center z-10"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-muted-foreground text-base md:text-lg font-medium tracking-wide">
            변화하는 기술을 빠르게 흡수하고, 현실적인 해결책으로 이어내는 기획자, 김재원입니다.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12 w-full">
          <h2
            className="font-bold leading-tight tracking-tighter text-foreground"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            함께 일해요
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8 relative group">
          <a
            href="mailto:twice6123@naver.com"
            className="text-2xl md:text-4xl font-light tracking-tight inline-block pb-2 text-foreground"
          >
            twice6123@naver.com
          </a>
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-foreground origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16">
          <p className="text-lg md:text-xl font-light text-muted-foreground">
            +82 10 7751 6123
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          <a
            href="/docs/portfolio.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-8 py-4 rounded-full border border-border bg-transparent overflow-hidden transition-colors"
          >
            <div className="absolute inset-0 bg-foreground transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></div>
            <FileText className="w-5 h-5 relative z-10 text-foreground group-hover:text-background transition-colors duration-300" />
            <span className="relative z-10 font-medium text-foreground group-hover:text-background transition-colors duration-300 uppercase tracking-widest text-xs">
              Portfolio
            </span>
          </a>

          <a
            href="/docs/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-8 py-4 rounded-full border border-border bg-transparent overflow-hidden transition-colors"
          >
            <div className="absolute inset-0 bg-foreground transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></div>
            <FileText className="w-5 h-5 relative z-10 text-foreground group-hover:text-background transition-colors duration-300" />
            <span className="relative z-10 font-medium text-foreground group-hover:text-background transition-colors duration-300 uppercase tracking-widest text-xs">
              Resume
            </span>
          </a>

          <a
            href="https://instagram.com/w0n.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-8 py-4 rounded-full border border-border bg-transparent overflow-hidden transition-colors"
          >
            <div className="absolute inset-0 bg-foreground transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></div>
            <InstagramIcon className="w-5 h-5 relative z-10 text-foreground group-hover:text-background transition-colors duration-300" />
            <span className="relative z-10 font-medium text-foreground group-hover:text-background transition-colors duration-300 uppercase tracking-widest text-xs">
              Instagram
            </span>
            <ArrowUpRight className="w-4 h-4 relative z-10 text-foreground group-hover:text-background transition-colors duration-300" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
