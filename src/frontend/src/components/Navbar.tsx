import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Studio", href: "#about" },
  { label: "Journal", href: "#journal" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.07_0.018_258/0.95)] backdrop-blur-xl border-b border-[oklch(0.22_0.03_260)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0 flex flex-col leading-tight"
          data-ocid="nav.link"
        >
          <span
            className="font-display font-black text-xl tracking-widest uppercase"
            style={{
              background:
                "linear-gradient(90deg, var(--neon-orange), #ffffff 50%, var(--neon-cyan))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            INSITE DESIGN ARCHITECTURE
          </span>
          <span
            className="font-display font-medium text-xs tracking-[0.2em] uppercase mt-0.5"
            style={{ color: "var(--neon-cyan)", opacity: 0.85 }}
          >
            Ar. Vinay Bhalla
          </span>
        </a>

        {/* Center nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                data-ocid="nav.link"
                className="font-display font-medium text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            type="button"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Search"
            data-ocid="nav.button"
          >
            <Search size={18} />
          </button>
          <a
            href="#contact"
            data-ocid="nav.primary_button"
            className="font-display font-semibold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full border transition-all duration-300"
            style={{
              background: "oklch(0.12 0.025 310)",
              borderColor: "var(--neon-magenta)",
              color: "#fff",
              boxShadow: "0 0 16px oklch(0.65 0.27 330 / 0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 28px oklch(0.65 0.27 330 / 0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 16px oklch(0.65 0.27 330 / 0.3)";
            }}
          >
            Start a Project
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          data-ocid="nav.toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[oklch(0.09_0.02_258/0.97)] backdrop-blur-xl border-b border-border px-6 py-6 flex flex-col gap-5"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="nav.link"
                className="font-display font-semibold text-sm uppercase tracking-widest text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              data-ocid="nav.primary_button"
              className="inline-block text-center font-display font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-full border"
              style={{ borderColor: "var(--neon-magenta)", color: "#fff" }}
              onClick={() => {
                setMobileOpen(false);
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start a Project
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
