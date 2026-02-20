import { motion, useReducedMotion } from "framer-motion";
import { ClipboardCheck, Settings, Mail, BarChart3, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { apiService, type HowItWorksStep } from "@/services/api";

const iconMap = {
  ClipboardCheck,
  Settings,
  Mail,
  BarChart3,
  Calendar,
} as const;

export const HowItWorks = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t, lang } = useLanguage();
  const [steps, setSteps] = useState<HowItWorksStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchSteps = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getHowItWorks(lang);
        if (!cancelled) {
          setSteps(result.steps || []);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load');
          setSteps([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchSteps();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  const fallbackStepLabelPrefix = lang === 'de' ? 'Schritt' : 'Step';

  return (
    <motion.section 
      id="how-it-works"
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-background via-muted/10 to-background z-20 min-h-[600px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: prefersReducedMotion ? 0.5 : 1.0, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="mb-10 sm:mb-16 md:mb-20 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span 
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-br from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4 shadow-[0_8px_24px_-6px_rgba(34,197,94,0.3)] border border-white/10 backdrop-blur-sm relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-30"></span>
            <span className="relative z-10">{t("how.badge")}</span>
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground dark:text-white leading-tight tracking-tight">
            {t("how.title.pre")} <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[hsl(var(--brand-green))] via-[hsl(var(--gold))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent bg-[length:200%_100%]">{t("how.title.highlight")}</span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--brand-green))]/40 to-transparent"></span>
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed dark:text-white/90">
            {t("how.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            steps.map((step, index) => {
              const Icon =
                (step.icon && (iconMap as Record<string, typeof Calendar>)[step.icon]) ||
                Calendar;
              const stepLabel =
                step.stepLabel || `${fallbackStepLabelPrefix} ${step.stepNumber}`;

              return (
            <motion.div 
              key={`${step.lang}-${step.stepNumber}`}
              className="relative mb-12 sm:mb-16 last:mb-0"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : (index % 2 === 0 ? -16 : 16), rotateY: 0 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: prefersReducedMotion ? 0.45 : 0.7, delay: index * 0.15, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <div className={`flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <motion.div 
                  className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] flex items-center justify-center text-white ring-1 ring-[hsl(var(--brand-green))]/20 shadow-[0_12px_30px_-12px_hsl(142_70%_45%/0.25)] relative group"
                  whileHover={prefersReducedMotion ? { scale: 1.02 } : { scale: 1.06, rotate: 6 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 rounded-full bg-[hsl(var(--brand-green))]/10 blur-md group-hover:blur-lg transition-all duration-500" />
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white relative z-10" />
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white dark:bg-[hsl(222,12%,15%)] text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))] rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 border-[hsl(var(--brand-green))]/30">
                    {step.stepNumber}
                  </div>
                </motion.div>
                
                <motion.div 
                  className={[
                    "relative flex-1 bg-card/80 backdrop-blur-sm border rounded-xl sm:rounded-2xl p-5 sm:p-7 md:p-9 transition-all duration-300 group overflow-hidden",
                    "text-foreground dark:text-white",
                    "border-[hsl(215,32%,91%)] dark:border-border/40",
                    "hover:border-[hsl(var(--brand-green))]/40 dark:hover:border-[hsl(var(--gold))]/40",
                    "hover:shadow-[0_20px_50px_-14px_hsl(142_70%_45%/0.2),0_0_30px_hsl(142_70%_45%/0.08)] dark:hover:shadow-[0_20px_50px_-14px_rgba(34,197,94,0.2),0_0_30px_rgba(34,197,94,0.08)]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-green))]",
                    index % 2 === 1 ? 'md:text-right' : ''
                  ].join(' ')}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.01,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  tabIndex={0}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[hsl(var(--brand-green))]/5 dark:from-[hsl(var(--brand-green))]/10 via-[hsl(var(--gold))]/5 dark:via-[hsl(var(--gold))]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))] font-semibold text-sm uppercase tracking-wider mb-3 inline-block px-3 py-1 bg-card dark:bg-[hsl(222,12%,15%)]/50 rounded-full">
                    {stepLabel}
                  </p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground dark:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground dark:text-white/90 leading-relaxed text-base sm:text-base md:text-lg">
                    {step.description}
                  </p>
                  
                  {/* Decorative corner */}
                  <div className={`absolute ${index % 2 === 1 ? 'top-0 left-0 border-t-2 border-l-2 rounded-tl-xl sm:rounded-tl-2xl' : 'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl sm:rounded-br-2xl'} w-12 h-12 sm:w-16 sm:h-16 border-[hsl(var(--brand-green))]/0 group-hover:border-[hsl(var(--brand-green))]/30 transition-all duration-500`} />
                </motion.div>
              </div>
              
            </motion.div>
              );
            })
          )}
          <motion.div 
            className="mt-8 sm:mt-12 flex justify-center"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.5 }}
          >
            <a href="#pricing" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white hover:opacity-90 hover:scale-105 transition-all duration-300 font-semibold shadow-md">
              {t("how.cta.packages")}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};