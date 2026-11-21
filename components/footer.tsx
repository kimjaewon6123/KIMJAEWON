import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-background text-muted-foreground border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm font-light tracking-wide">
        <p>© {currentYear} 김재원. All Rights Reserved.</p>
        <p>본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
      </div>
    </footer>
  );
}
