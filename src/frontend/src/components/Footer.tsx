import { MapPin } from "lucide-react";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="border-t py-16"
      style={{
        background: "oklch(0.07 0.018 258)",
        borderColor: "oklch(0.18 0.025 260)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo + tagline */}
          <div>
            <span
              className="font-display font-black text-lg tracking-widest uppercase block mb-3"
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
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A global architecture studio designing spaces that define culture,
              inspire human potential, and endure through time.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <div
              className="font-display font-bold text-xs uppercase tracking-widest mb-6"
              style={{ color: "var(--neon-cyan)" }}
            >
              Navigation
            </div>
            <ul className="space-y-3">
              {[
                { label: "Projects", href: "#projects" },
                { label: "Studio", href: "#about" },
                { label: "Journal", href: "#journal" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-ocid="footer.link"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-display uppercase tracking-wider"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices + social */}
          <div>
            <div
              className="font-display font-bold text-xs uppercase tracking-widest mb-6"
              style={{ color: "var(--neon-cyan)" }}
            >
              Offices
            </div>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin size={12} style={{ color: "var(--neon-cyan)" }} />
                India, Sector 21, House No-1285, Main Road
              </div>
            </div>
            <div className="flex gap-4">
              {[
                { Icon: SiX, label: "X / Twitter" },
                { Icon: SiInstagram, label: "Instagram" },
                { Icon: SiLinkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  data-ocid="footer.button"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 rounded border border-border/40 hover:border-primary/40"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t text-xs text-muted-foreground"
          style={{ borderColor: "oklch(0.18 0.025 260)" }}
        >
          <div>
            © {year}. Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-foreground transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-foreground transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
