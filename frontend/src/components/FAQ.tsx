import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { apiService, type FaqItem } from "@/services/api";

export const FAQ = () => {
  const { t, lang } = useLanguage();
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchFaqs = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getFAQs(lang);
        if (!cancelled) {
          setFaqs((result.faqs || []).slice().sort((a, b) => a.order - b.order));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load');
          setFaqs([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchFaqs();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <motion.section 
      id="faq"
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-background via-muted/10 to-background z-80 overflow-hidden"
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-[hsl(var(--brand-green))]/5 to-[hsl(var(--gold))]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-[hsl(var(--gold))]/5 to-[hsl(var(--brand-green))]/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Badge - Centered */}
            <motion.div 
              className="flex justify-center mb-5 sm:mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            >
              <div className="px-4 py-2 bg-gradient-to-br from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] backdrop-blur-sm rounded-full text-sm font-semibold text-white flex items-center gap-2 border border-white/20">
                <HelpCircle className="w-4 h-4" />
                <span>{t("faq.badge")}</span>
              </div>
            </motion.div>

            {/* Heading - Centered */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 text-foreground dark:text-white px-2" style={{ textAlign: 'center' }}>
              {t("faq.title.pre")} <span className="bg-gradient-to-r from-[hsl(var(--brand-green))] via-[hsl(var(--gold))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent">{t("faq.title.highlight")}</span>
            </h2>
            {/* Description - Centered */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground dark:text-card-foreground/80 max-w-2xl leading-relaxed px-2 text-center mx-auto">
              {t("faq.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {loading ? (
                <div className="text-center text-muted-foreground">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : (
              faqs.map((faq, index) => (
                <motion.div
                  key={`${faq.lang}-${faq.order}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <AccordionItem 
                    value={`item-${faq.order}`}
                    className="group bg-card/60 backdrop-blur-sm border border-[hsl(215,32%,91%)] dark:border-border/40 rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 hover:border-[hsl(var(--brand-green))]/60 dark:hover:border-[hsl(var(--gold))]/60 hover:shadow-[0_10px_30px_-5px_hsl(142_70%_45%/0.2)] dark:hover:shadow-[0_10px_30px_-5px_rgba(34,197,94,0.15)] transition-all duration-300 data-[state=open]:border-[hsl(var(--brand-green))]/70 dark:data-[state=open]:border-[hsl(var(--gold))]/70 data-[state=open]:shadow-[0_15px_40px_-5px_hsl(142_70%_45%/0.25),0_0_20px_hsl(142_70%_45%/0.1)] dark:data-[state=open]:shadow-[0_15px_40px_-5px_rgba(34,197,94,0.2),0_0_20px_rgba(34,197,94,0.08)]"
                  >
                    <AccordionTrigger className="text-left text-base sm:text-lg md:text-xl font-semibold text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))] py-5 sm:py-6 hover:no-underline group-hover:text-[hsl(var(--brand-green))] dark:group-hover:text-[hsl(var(--gold))] transition-colors">
                      <span className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[hsl(var(--brand-green))] dark:bg-[hsl(var(--gold))] flex items-center justify-center text-white text-sm font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="flex-1">{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-card-foreground dark:text-card-foreground/85 leading-relaxed pt-2 pb-5 sm:pb-6 pl-9 sm:pl-10">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))
              )}
            </Accordion>
          </motion.div>

          {/* Enhanced trust indicators */}
          <motion.div 
            className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="p-5 sm:p-6 bg-card border-2 border-[hsl(215,32%,91%)] dark:border-border/50 rounded-xl sm:rounded-2xl group hover:border-[hsl(var(--brand-green))] dark:hover:border-[hsl(var(--gold))] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-[hsl(142,70%,97%)] dark:bg-card rounded-xl group-hover:bg-[hsl(142,70%,95%)] dark:group-hover:bg-card/70 transition-colors">
                  <Shield className="w-6 h-6 text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground dark:text-white mb-1.5">
                    Full Usage Rights
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-card-foreground/80 leading-relaxed">
                    Commercial usage rights for ads, organic posts, and website. No hidden licensing fees or restrictions.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-card border-2 border-[hsl(215,32%,91%)] dark:border-border/50 rounded-xl sm:rounded-2xl group hover:border-[hsl(var(--brand-green))] dark:hover:border-[hsl(var(--gold))] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-[hsl(142,70%,97%)] dark:bg-card rounded-xl group-hover:bg-[hsl(142,70%,95%)] dark:group-hover:bg-card/70 transition-colors">
                  <Zap className="w-6 h-6 text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground dark:text-white mb-1.5">
                    Complete UGC Production
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-card-foreground/80 leading-relaxed">
                    Scripting • Creator Casting • Filming • Editing • Captions • Multi-Format Delivery • Performance Tracking
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Still have questions CTA */}
          <motion.div 
            className="mt-8 sm:mt-10 md:mt-12 p-6 sm:p-8 bg-card border-2 border-[hsl(215,32%,91%)] dark:border-border/50 rounded-xl sm:rounded-2xl text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <p className="text-base sm:text-lg md:text-xl font-semibold text-foreground dark:text-white mb-2">
              {t("faq.still")}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground dark:text-card-foreground/80 mb-4 sm:mb-5">
              {t("faq.still.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="#pricing" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 border-0"
              >
                {t("faq.packages")}
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-[hsl(var(--brand-green))] text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))] font-semibold rounded-xl hover:bg-[hsl(var(--brand-green))]/10 transition-all duration-300"
              >
                {t("faq.getQuote")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};