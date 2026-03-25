import { MapPin } from "lucide-react";
import { motion } from "motion/react";

const OFFICES = [
  {
    city: "India",
    address: "Sector 21, House No-1285, Main Road",
    role: "Studio",
  },
];

const VALUES = [
  {
    title: "Purpose",
    desc: "Every project begins with a deep inquiry into purpose — what this space must do for the people who inhabit it.",
  },
  {
    title: "Craft",
    desc: "We believe that the quality of execution is inseparable from the quality of design. We never compromise one for the other.",
  },
  {
    title: "Longevity",
    desc: "Architecture must endure. We design for the long arc — buildings that improve with age and serve future generations.",
  },
  {
    title: "Collaboration",
    desc: "Great architecture is never made alone. We build deep partnerships with our clients, collaborators, and communities.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 80% 20%, oklch(0.15 0.03 200 / 0.15), transparent)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Main about */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span
              className="font-display font-medium text-xs uppercase tracking-[0.3em] mb-6 block"
              style={{ color: "var(--neon-orange)" }}
            >
              Our Studio
            </span>
            <h2 className="font-display font-black uppercase text-5xl md:text-6xl text-foreground tracking-tight mb-8">
              ABOUT
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(90deg, var(--neon-orange), var(--neon-cyan))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                INSITE DESIGN
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Founded in 2014 by a collective of architects who had grown
              restless with architecture as spectacle, Insite Design
              Architecture was built on a different belief: that the highest
              ambition of architecture is not to be photographed, but to be
              lived.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              In the decade since, we have grown into a studio of 85 architects,
              designers, researchers, and thinkers across three continents. Our
              work spans scales from intimate private residences to major civic
              institutions, but all of it emerges from the same core conviction:
              that space is the most powerful medium available for shaping human
              experience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We maintain our studio in India, Sector 21 — a location that
              grounds our practice in a rich architectural heritage while
              keeping us connected to a rapidly evolving built environment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="p-6 rounded-sm border"
                style={{
                  background: "oklch(0.11 0.022 260)",
                  borderColor:
                    i % 2 === 0
                      ? "oklch(0.85 0.14 200 / 0.3)"
                      : "oklch(0.65 0.27 330 / 0.3)",
                }}
              >
                <div
                  className="font-display font-black uppercase text-sm mb-2"
                  style={{
                    color:
                      i % 2 === 0 ? "var(--neon-cyan)" : "var(--neon-magenta)",
                  }}
                >
                  {v.title}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Office */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3
            className="font-display font-black uppercase text-2xl mb-8"
            style={{ color: "var(--neon-cyan)" }}
          >
            Our Office
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {OFFICES.map((office) => (
              <div
                key={office.city}
                className="p-6 rounded-sm border flex flex-col gap-3 max-w-[400px]"
                style={{
                  background: "oklch(0.10 0.022 260)",
                  borderColor: "oklch(0.22 0.03 260)",
                }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: "var(--neon-cyan)" }} />
                  <span className="font-display font-black uppercase text-foreground">
                    {office.city}
                  </span>
                </div>
                <div className="text-muted-foreground text-sm">
                  {office.address}
                </div>
                <div
                  className="font-display font-medium text-xs uppercase tracking-widest"
                  style={{ color: "var(--neon-magenta)" }}
                >
                  {office.role}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
