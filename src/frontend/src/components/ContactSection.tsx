import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useSubmitContact } from "../hooks/useQueries";

export default function ContactSection() {
  const { actor } = useActor();
  const { mutate: submitContact, isPending } = useSubmitContact();
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    submitContact(
      {
        actor,
        name: form.name,
        email: form.email,
        message: `[${form.projectType || "General"}] ${form.message}`,
      },
      {
        onSuccess: () => {
          toast.success("Message sent! We'll be in touch within 48 hours.");
          setForm({ name: "", email: "", projectType: "", message: "" });
        },
        onError: () => toast.error("Something went wrong. Please try again."),
      },
    );
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 80%, oklch(0.15 0.04 300 / 0.2), transparent)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span
              className="font-display font-medium text-xs uppercase tracking-[0.3em] mb-6 block"
              style={{ color: "var(--neon-magenta)" }}
            >
              Get in Touch
            </span>
            <h2 className="font-display font-black uppercase text-5xl md:text-6xl text-foreground tracking-tight mb-8">
              START A
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(90deg, var(--neon-magenta), var(--neon-purple))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                PROJECT
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Tell us about your vision. Whether you have a fully developed
              brief or just the seed of an idea, we would love to hear from you.
              We respond to all enquiries within 48 hours.
            </p>

            <div className="space-y-4">
              {[
                {
                  label: "Initial Consultation",
                  desc: "Free 60-minute discovery call",
                },
                {
                  label: "Global Reach",
                  desc: "Projects across 20+ countries",
                },
                {
                  label: "Responsive Team",
                  desc: "Dedicated point of contact from day one",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{
                      background: "var(--neon-magenta)",
                      boxShadow: "0 0 8px var(--neon-magenta)",
                    }}
                  />
                  <div>
                    <div className="font-display font-semibold text-foreground text-sm uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-sm border space-y-6"
              style={{
                background: "oklch(0.10 0.022 260)",
                borderColor: "oklch(0.25 0.04 260)",
              }}
              data-ocid="contact.modal"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    Name *
                  </Label>
                  <Input
                    data-ocid="contact.input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="border-border/50 bg-background/50 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <Label className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    Email *
                  </Label>
                  <Input
                    data-ocid="contact.input"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="border-border/50 bg-background/50 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                  Project Type
                </Label>
                <Select
                  value={form.projectType}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, projectType: v }))
                  }
                >
                  <SelectTrigger
                    data-ocid="contact.select"
                    className="border-border/50 bg-background/50"
                  >
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Cultural">Cultural / Public</SelectItem>
                    <SelectItem value="Urban Design">Urban Design</SelectItem>
                    <SelectItem value="Interior">
                      Interior Architecture
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                  Message *
                </Label>
                <Textarea
                  data-ocid="contact.textarea"
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className="border-border/50 bg-background/50 focus:border-primary min-h-[120px]"
                  required
                />
              </div>

              <button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={isPending}
                className="w-full font-display font-bold text-sm uppercase tracking-widest py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{
                  background: "var(--neon-magenta)",
                  color: "white",
                  boxShadow: "0 0 24px oklch(0.65 0.27 330 / 0.4)",
                }}
              >
                {isPending && <Loader2 size={16} className="animate-spin" />}
                {isPending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
