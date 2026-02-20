import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { apiService, type TestimonialItem } from "@/services/api";

export const Testimonials = () => {
  const { t, lang } = useLanguage();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getTestimonials(lang);
        if (!cancelled) {
          setTestimonials((result.testimonials || []).slice().sort((a, b) => a.order - b.order));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load');
          setTestimonials([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTestimonials();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <motion.section 
      id="testimonials"
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-background text-foreground z-40"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-4">
        <motion.div 
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground dark:text-white leading-tight tracking-tight px-2">
            {t("testimonials.title.pre")} <span className="bg-gradient-to-r from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] bg-clip-text text-transparent">{t("testimonials.title.highlight")}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl px-2 dark:text-white/90">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
          {loading ? (
            <div className="col-span-full text-center text-muted-foreground">Loading...</div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">{error}</div>
          ) : (
            testimonials.map((testimonial, index) => (
              <motion.div 
                key={`${testimonial.lang}-${testimonial.order}`}
                className="relative bg-card/50 backdrop-blur-sm border border-[hsl(215,32%,91%)] dark:border-border/40 rounded-xl p-5 sm:p-6 md:p-8 hover:border-[hsl(var(--brand-green))]/60 dark:hover:border-[hsl(var(--gold))]/60 hover:shadow-[0_20px_60px_-15px_hsl(142_70%_45%/0.3),0_0_30px_hsl(142_70%_45%/0.1)] dark:hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.25),0_0_30px_rgba(34,197,94,0.1)] transition-all duration-300 hover:-translate-y-2 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.12, 
                  ease: [0.23, 1, 0.32, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }
                }}
              >
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(Math.max(1, Math.min(5, testimonial.rating || 5)))].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
                    >
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[hsl(var(--gold))] text-[hsl(var(--gold))] drop-shadow-[0_2px_4px_rgba(250,204,21,0.4)]" />
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-sm sm:text-base text-foreground mb-4 sm:mb-5 md:mb-6 leading-relaxed dark:text-white/90">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t border-[hsl(220,40%,92%)] dark:border-border/50 pt-3 sm:pt-4">
                  <p className="text-sm sm:text-base font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.div 
          className="relative bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border border-[hsl(215,32%,91%)] dark:border-border/40 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-5xl mx-auto hover:border-[hsl(var(--brand-green))]/70 dark:hover:border-[hsl(var(--gold))]/70 hover:shadow-[0_25px_70px_-15px_hsl(142_70%_45%/0.35),0_0_40px_hsl(142_70%_45%/0.15)] dark:hover:shadow-[0_25px_70px_-15px_rgba(34,197,94,0.3),0_0_40px_rgba(34,197,94,0.1)] transition-all duration-300 overflow-hidden group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <div className="text-left">
            <span className="inline-block px-3 py-1 bg-card dark:bg-[hsl(222,12%,15%)]/50 text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))] text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
              {t("testimonials.success.badge")}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
              {t("testimonials.success.title.pre")} <span className="bg-gradient-to-r from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] bg-clip-text text-transparent">{t("testimonials.success.title.highlight")}</span>
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-5 sm:mb-6 leading-relaxed max-w-3xl">
              {t("testimonials.success.desc")}
            </p>
            <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white hover:opacity-95 transition-all duration-300 hover:scale-105 font-semibold border-0">
              {t("testimonials.success.btn")}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};