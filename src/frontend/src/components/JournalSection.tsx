import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SAMPLE_ARTICLES } from "../data/sampleData";

const CARD_NEON_COLORS = [
  "var(--neon-cyan)",
  "var(--neon-magenta)",
  "var(--neon-orange)",
  "var(--neon-green)",
];

export default function JournalSection() {
  const [activeArticle, setActiveArticle] = useState<
    (typeof SAMPLE_ARTICLES)[0] | null
  >(null);

  return (
    <section id="journal" className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 70%, oklch(0.12 0.025 300 / 0.2), transparent)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span
            className="font-display font-medium text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{ color: "var(--neon-magenta)" }}
          >
            Articles / Blog
          </span>
          <h2 className="font-display font-black uppercase text-5xl md:text-6xl text-foreground tracking-tight">
            LATEST FROM THE JOURNAL
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {SAMPLE_ARTICLES.map((article, i) => {
            const neon = CARD_NEON_COLORS[i % CARD_NEON_COLORS.length];
            return (
              <motion.article
                key={article.id}
                data-ocid={`journal.item.${i + 1}`}
                className="group flex flex-col overflow-hidden rounded-sm border cursor-pointer"
                style={{ borderColor: "oklch(0.22 0.03 260)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = neon;
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 20px ${neon}33`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.22 0.03 260)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, oklch(0.09 0.02 258) 0%, ${neon}11 100%)`,
                    }}
                  />
                </div>

                {/* Body */}
                <div
                  className="flex flex-col flex-1 p-6"
                  style={{ background: "oklch(0.10 0.022 260)" }}
                >
                  <Badge
                    className="font-display text-[10px] uppercase tracking-widest mb-3 w-fit border-0"
                    style={{ background: `${neon}22`, color: neon }}
                  >
                    {article.category}
                  </Badge>
                  <h3 className="font-display font-bold uppercase text-base text-foreground tracking-tight leading-snug mb-3 flex-1">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="text-xs text-muted-foreground mb-4">
                    {article.date} · {article.author.split(",")[0]}
                  </div>
                  <button
                    type="button"
                    data-ocid={`journal.button.${i + 1}`}
                    className="flex items-center gap-2 font-display font-semibold text-xs uppercase tracking-widest transition-colors duration-200 mt-auto"
                    style={{ color: neon }}
                    onClick={() => setActiveArticle(article)}
                  >
                    Read More <ArrowRight size={12} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Article Modal */}
      <Dialog
        open={!!activeArticle}
        onOpenChange={(open) => !open && setActiveArticle(null)}
      >
        <DialogContent
          className="max-w-3xl max-h-[85vh] overflow-y-auto border"
          style={{
            background: "oklch(0.09 0.022 258)",
            borderColor: "oklch(0.25 0.04 260)",
          }}
          data-ocid="journal.dialog"
        >
          {activeArticle && (
            <>
              <DialogHeader className="mb-6">
                <div className="mb-4">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-56 object-cover rounded-sm mb-6"
                  />
                  <Badge
                    className="font-display text-[10px] uppercase tracking-widest mb-3 border-0"
                    style={{
                      background: "oklch(0.85 0.14 200 / 0.15)",
                      color: "var(--neon-cyan)",
                    }}
                  >
                    {activeArticle.category}
                  </Badge>
                </div>
                <DialogTitle className="font-display font-black uppercase text-2xl text-foreground leading-tight tracking-tight">
                  {activeArticle.title}
                </DialogTitle>
                <div className="text-muted-foreground text-sm mt-2">
                  {activeArticle.date} · {activeArticle.author}
                </div>
              </DialogHeader>
              <div className="text-muted-foreground text-base leading-relaxed space-y-4">
                {activeArticle.content.split("\n\n").map((para) => (
                  <p key={para.slice(0, 30)}>{para}</p>
                ))}
              </div>
              <button
                type="button"
                data-ocid="journal.close_button"
                className="mt-8 font-display font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-sm transition-all duration-300"
                style={{
                  background: "var(--neon-cyan)",
                  color: "oklch(0.07 0.018 258)",
                }}
                onClick={() => setActiveArticle(null)}
              >
                Close Article
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
