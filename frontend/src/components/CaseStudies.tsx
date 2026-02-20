import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { apiService, type CaseStudyItem } from "@/services/api";

export const CaseStudies = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getCaseStudies(lang);
        if (!cancelled) {
          setCaseStudies((result.caseStudies || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.caseStudyId - b.caseStudyId));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load');
          setCaseStudies([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCaseStudies();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <motion.section
      id="case-studies"
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-background via-muted/10 to-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8 sm:mb-12 lg:mb-16 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            {t("case.badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground dark:text-white">
            {t("case.title.pre")} <span className="bg-gradient-to-r from-[hsl(var(--brand-green))] via-[hsl(var(--gold))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent">{t("case.title.highlight")}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {t("case.subtitle")}
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {loading ? (
            <div className="col-span-full text-center text-muted-foreground">Loading...</div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">{error}</div>
          ) : (
            caseStudies.map((study, index) => (
            <motion.article
              key={`${study.lang}-${study.caseStudyId}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="group relative bg-card/80 backdrop-blur-sm border border-[hsl(215,32%,91%)] dark:border-border/40 rounded-2xl overflow-hidden hover:border-[hsl(var(--brand-green))]/60 dark:hover:border-[hsl(var(--gold))]/60 hover:shadow-[0_25px_70px_-15px_hsl(142_70%_45%/0.35),0_0_35px_hsl(142_70%_45%/0.15)] dark:hover:shadow-[0_25px_70px_-15px_rgba(34,197,94,0.3),0_0_35px_rgba(34,197,94,0.1)] transition-all duration-300 cursor-pointer w-full hover:-translate-y-1"
              onClick={() => navigate(`/case-study/${study.caseStudyId}`)}
              whileHover={{ 
                y: -6, 
                scale: 1.01,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 0.5
                }
              }}
            >
              {/* Image */}
              <div className="relative h-44 sm:h-52 md:h-48 lg:h-56 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.company}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-card dark:bg-[hsl(var(--gold))] text-foreground dark:text-white text-xs font-bold rounded-full mb-1.5 sm:mb-2">
                    {study.industry}
                  </span>
                  <h3 className="text-white font-bold text-base sm:text-lg line-clamp-2">
                    {study.company}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 lg:p-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-[hsl(220,40%,92%)] dark:border-border/50">
                  <div className="text-center">
                    <div className="text-foreground dark:text-white font-bold text-sm sm:text-base lg:text-lg">{study.stats.mainResult}</div>
                    <div className="text-[10px] sm:text-xs text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))]">{t("case.label.result")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-foreground dark:text-white font-bold text-sm sm:text-base lg:text-lg">{study.stats.seoFocus}</div>
                    <div className="text-[10px] sm:text-xs text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))]">{t("case.label.focus")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-foreground dark:text-white font-bold text-sm sm:text-base lg:text-lg">{study.stats.timeframe}</div>
                    <div className="text-[10px] sm:text-xs text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))]">{t("case.label.time")}</div>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-foreground dark:text-white transition-colors line-clamp-2">
                  {study.title}
                </h4>

                {/* Challenge snippet */}
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-white/90 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {study.challenge}
                </p>

                {/* Read more */}
                <div className="flex items-center gap-1 sm:gap-2 text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))] font-semibold text-xs sm:text-sm group-hover:gap-2 sm:group-hover:gap-3 transition-all">
                  <span className="hidden sm:inline">{t("case.read.full")}</span>
                  <span className="sm:hidden">{t("case.read.short")}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </motion.article>
          ))
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-12 lg:mt-16 text-center"
        >
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6">
            {t("case.cta.ready")}
          </p>
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg">
            <span className="hidden sm:inline">{t("cta.getQuote")} →</span>
            <span className="sm:hidden">{t("hero.cta.short")} →</span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};
