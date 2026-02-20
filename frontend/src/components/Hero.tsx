import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Calendar, Sparkles, Mail, Inbox, Award } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { apiService, type HeroData } from "@/services/api";

const HeroContent = ({ heroData }: { heroData: HeroData }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.section 
      ref={ref}
      className="relative min-h-screen flex items-center bg-[image:var(--gradient-light)] dark:bg-[image:var(--gradient-dark)] text-foreground overflow-hidden pt-16 sm:pt-20 md:pt-0"
      style={{ opacity }}
    >
      {/* Parallax background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-[hsl(var(--brand-green))/0.15] via-[hsl(var(--gold))/0.08] to-[hsl(var(--brand-green))/0.12] dark:from-[hsl(var(--brand-green))/0.08] dark:via-[hsl(222,12%,10%)] dark:to-[hsl(var(--brand-green))/0.05]"
        style={{ y }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ 
              duration: 1, 
              delay: 0.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100
            }}
          >
            <div className="inline-block mb-3 sm:mb-4 md:mb-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              {heroData.tagline}
            </div>
            
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-5 md:mb-6 leading-[1.15] sm:leading-[1.12] md:leading-[1.1] tracking-tight text-foreground">
              {heroData.title}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-xl text-muted-foreground mb-6 sm:mb-7 md:mb-8 leading-relaxed max-w-xl font-normal dark:text-white/90">
              {heroData.subtitle}
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-3"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  onClick={() => window.location.href = '/book-meeting'}
                  className="bg-gradient-to-r from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white hover:opacity-90 px-8 py-4 rounded-lg font-semibold transition-all relative overflow-hidden group shadow-lg hover:shadow-xl border-0"
                  aria-label={heroData.ctaPrimary}
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
                  />
                  <span className="flex items-center gap-2 relative z-10">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                    <span className="hidden sm:inline">{heroData.ctaPrimary}</span>
                    <span className="sm:hidden">{heroData.ctaPrimary}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-muted-foreground dark:text-white/80"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" aria-hidden="true" />
                </motion.div>
                <span className="font-medium">{heroData.urgency}</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Right: 3D Image + Stats */}
          <motion.div
            className="relative lg:ml-auto mt-8 sm:mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{ perspective: 1200 }}
          >
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-20"
            >
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative bg-gradient-to-br from-[hsl(var(--brand-green))] via-[hsl(var(--gold))] to-[hsl(var(--brand-green))] text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-[0_10px_30px_-5px_rgba(34,197,94,0.4)] border border-white/20 flex items-center gap-1.5 sm:gap-2 backdrop-blur-sm"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-50"></div>
                <Award className="w-3 h-3 sm:w-4 sm:h-4 relative z-10" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap relative z-10">{heroData.stats?.clients} Clients</span>
              </motion.div>
            </motion.div>
            
            {/* 3D Tilt Card */}
            <motion.div
              className="relative rounded-xl md:rounded-2xl overflow-hidden border-2 border-[hsl(var(--gold))]/30 group shadow-[0_30px_120px_-30px_hsl(48,100%,53%/0.45)]"
              whileHover={{ rotateX: -6, rotateY: 10 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Hero Image - Optimized Size */}
              <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 shadow-2xl">
                <img
                  src={heroData.image}
                  alt={heroData.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 backdrop-blur-xl bg-white/80 dark:bg-[hsl(222,12%,12%)/0.9] border border-[hsl(var(--gold))/0.4] rounded-xl p-4 sm:p-5 shadow-2xl"
                style={{ transform: "translateZ(80px)" }}
              >
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-[hsl(var(--brand-blue))]" />
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground">{heroData.stats?.clients}</div>
                      <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium">Clients</div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center border-x border-border/50"
                  >
                    <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
                      <Inbox className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-[hsl(var(--brand-blue))]" />
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground">{heroData.stats?.costSaved}</div>
                      <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium">Cost Saved</div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-[hsl(var(--brand-blue))]" />
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground">{heroData.stats?.rating}</div>
                      <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium">Rating</div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Animated Decorations */}
            <motion.div 
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[hsl(var(--gold))]/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-[hsl(var(--brand-green))]/20 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              aria-hidden="true"
            />
            <motion.div 
              className="absolute top-1/2 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-[hsl(var(--brand-blue))]/10 rounded-full blur-2xl"
              animate={{ x: [-10, 10, -10], scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export const Hero = () => {
  const { lang } = useLanguage();
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch hero data from API
  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        const data = await apiService.getHero(lang);
        setHeroData(data);
      } catch (err) {
        console.error('Failed to fetch hero data:', err);
        // No fallback - show error state
        setHeroData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [lang]);

  // Show loading state
  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center bg-[image:var(--gradient-light)] dark:bg-[image:var(--gradient-dark)] text-foreground overflow-hidden pt-16 sm:pt-20 md:pt-0">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--brand-green))] mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (!heroData) {
    return (
      <section className="relative min-h-screen flex items-center bg-[image:var(--gradient-light)] dark:bg-[image:var(--gradient-dark)] text-foreground overflow-hidden pt-16 sm:pt-20 md:pt-0">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
          <div className="text-center">
            <p className="text-red-500">Failed to load hero content</p>
          </div>
        </div>
      </section>
    );
  }

  return <HeroContent heroData={heroData} />;
};