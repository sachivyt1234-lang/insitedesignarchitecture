import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { SAMPLE_PROJECTS } from "../data/sampleData";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.12 0.03 260 / 0.3), transparent)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span
            className="font-display font-medium text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{ color: "var(--neon-cyan)" }}
          >
            Our Work
          </span>
          <h2 className="font-display font-black uppercase text-5xl md:text-6xl text-foreground tracking-tight">
            FEATURED PROJECTS
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              data-ocid={`projects.item.${i + 1}`}
              className="group relative overflow-hidden rounded-sm border cursor-pointer"
              style={{ borderColor: "oklch(0.22 0.03 260)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  project.neonColor;
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 0 24px ${project.neonColor}4d`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.22 0.03 260)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.09 0.02 258) 0%, transparent 60%)",
                  }}
                />
                {/* Neon corner accent */}
                <div
                  className="absolute top-0 right-0 w-12 h-12"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${project.neonColor}33 50%)`,
                  }}
                />
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-80"
                  style={{
                    background: project.neonColor,
                    boxShadow: `0 0 8px ${project.neonColor}`,
                  }}
                />
              </div>

              {/* Content */}
              <div
                className="p-6"
                style={{ background: "oklch(0.10 0.022 260)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge
                      className="font-display text-[10px] uppercase tracking-widest mb-3 border-0"
                      style={{
                        background: `${project.neonColor}22`,
                        color: project.neonColor,
                      }}
                    >
                      {project.category}
                    </Badge>
                    <h3 className="font-display font-black uppercase text-xl text-foreground tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <span className="font-display text-muted-foreground text-sm">
                    {project.year}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                <div
                  className="mt-4 flex items-center gap-2 font-display font-semibold text-xs uppercase tracking-widest transition-colors duration-200"
                  style={{ color: project.neonColor }}
                >
                  View Project <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
