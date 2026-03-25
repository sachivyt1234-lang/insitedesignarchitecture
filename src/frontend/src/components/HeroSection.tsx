import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { Suspense, lazy, useRef } from "react";

const ThreeScene = lazy(() => import("./ThreeScene"));

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-grid">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, oklch(0.15 0.04 260 / 0.6) 0%, oklch(0.07 0.018 258) 70%)",
        }}
      />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>
      </div>

      {/* Floating neon accents */}
      <div
        className="absolute top-32 right-[10%] w-24 h-24 rotate-45 border-2 opacity-40 animate-float z-20 pointer-events-none"
        style={{
          borderColor: "var(--neon-cyan)",
          boxShadow: "0 0 20px var(--neon-cyan)",
        }}
      />
      <div
        className="absolute bottom-40 right-[25%] w-16 h-16 border-2 opacity-30 animate-float-slow z-20 pointer-events-none"
        style={{
          borderColor: "var(--neon-magenta)",
          boxShadow: "0 0 16px var(--neon-magenta)",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        }}
      />
      <div
        className="absolute top-[45%] right-[8%] w-12 h-12 rounded-full border opacity-50 animate-pulse-glow z-20 pointer-events-none"
        style={{
          borderColor: "var(--neon-orange)",
          boxShadow: "0 0 20px var(--neon-orange)",
        }}
      />

      {/* Hero image */}
      <div className="absolute top-0 right-0 w-1/2 h-full z-10 pointer-events-none hidden lg:block">
        <img
          src="/assets/generated/hero-pavilion.dim_1200x800.jpg"
          alt="Insite Architecture Hero"
          className="w-full h-full object-cover opacity-40"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 40%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 40%, black 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.07 0.018 258) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Text content */}
      <div className="relative z-30 max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 pb-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span
              className="inline-block font-display font-medium text-xs uppercase tracking-[0.3em] mb-8 px-4 py-1.5 rounded-full border"
              style={{
                borderColor: "var(--neon-cyan)",
                color: "var(--neon-cyan)",
                boxShadow: "0 0 12px oklch(0.85 0.14 200 / 0.3)",
              }}
            >
              Architecture Studio · Est. 2014
            </span>
          </motion.div>

          <motion.h1
            className="font-display font-black uppercase leading-none mb-8"
            style={{
              fontSize: "clamp(48px, 7vw, 88px)",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <span className="gradient-headline">DEFINING</span>
            <br />
            <span className="text-foreground">SPACE,</span>
            <br />
            <span className="gradient-headline">SHAPING</span>
            <br />
            <span className="text-foreground">TOMORROW</span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            We are a global architecture studio driven by the belief that space
            is the most powerful medium for human experience. From New York to
            Tokyo, we design buildings that endure, inspire, and transform.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <a
              href="#projects"
              data-ocid="hero.primary_button"
              className="font-display font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300"
              style={{
                background: "var(--neon-cyan)",
                color: "oklch(0.07 0.018 258)",
                boxShadow: "0 0 24px oklch(0.85 0.14 200 / 0.5)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 40px oklch(0.85 0.14 200 / 0.8)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 24px oklch(0.85 0.14 200 / 0.5)";
              }}
            >
              View Projects
            </a>
            <a
              href="#about"
              data-ocid="hero.secondary_button"
              className="font-display font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-sm border text-foreground transition-all duration-300 hover:bg-foreground/5"
              style={{ borderColor: "oklch(0.4 0.02 260)" }}
            >
              Our Studio
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t pt-12"
          style={{ borderColor: "oklch(0.22 0.03 260)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[
            { number: "200+", label: "Projects Completed" },
            { number: "15", label: "Awards Won" },
            { number: "3", label: "Global Offices" },
            { number: "10yr", label: "Studio Experience" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-display font-black text-4xl mb-1"
                style={{ color: "var(--neon-cyan)" }}
              >
                {stat.number}
              </div>
              <div className="font-body text-muted-foreground text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <ChevronDown size={16} className="text-muted-foreground" />
      </motion.div>
    </section>
  );
}
