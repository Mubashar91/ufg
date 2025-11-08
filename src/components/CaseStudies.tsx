import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CaseStudy {
  id: number;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  image: string;
  stats: {
    mainResult: string;
    timeframe: string;
    seoFocus: string;
  };
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "From $50K to $200K/Month with Authentic UGC",
    company: "GlowSkin Co.",
    industry: "DTC Skincare",
    challenge: "Studio ads were expensive and underperforming. CPAs were $85+ and ROAS was stuck at 1.8x. Needed scalable creative that converts.",
    solution: "Replaced studio ads with authentic UGC from real customers. Tested 15 creators, optimized hooks, and scaled winning variants across TikTok and Meta.",
    results: [
      { metric: "ROAS", value: "4.2x", description: "Return on ad spend" },
      { metric: "CPA", value: "-62%", description: "Cost per acquisition" },
      { metric: "Revenue", value: "$200K", description: "Monthly revenue" },
      { metric: "Time", value: "60 days", description: "From test to scale" }
    ],
    testimonial: "UGC ads outperformed our studio content 3:1. We scaled from $50K to $200K/month in 60 days.",
    testimonialAuthor: "Emma Rodriguez",
    testimonialRole: "Founder, GlowSkin Co.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=500&fit=crop",
    stats: { mainResult: "4.2x ROAS", timeframe: "60 days", seoFocus: "UGC Ads" }
  },
  {
    id: 2,
    title: "TikTok UGC Strategy: 8% CTR on Cold Traffic",
    company: "FitFuel Nutrition",
    industry: "Supplements",
    challenge: "Low engagement on paid TikTok ads. CTR was 1.2% and watch time was under 2 seconds. Ads felt like ads.",
    solution: "Created native TikTok UGC with trending sounds, authentic testimonials, and data-driven hooks. A/B tested 20+ variants.",
    results: [
      { metric: "CTR", value: "8.1%", description: "Click-through rate" },
      { metric: "Watch Time", value: "+340%", description: "Average watch time" },
      { metric: "CPC", value: "-58%", description: "Cost per click" },
      { metric: "Time", value: "3 weeks", description: "From brief to scale" }
    ],
    testimonial: "Our TikTok ads finally feel native. 8% CTR on cold traffic is unheard of in our niche.",
    testimonialAuthor: "Jake Morrison",
    testimonialRole: "CMO, FitFuel Nutrition",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
    stats: { mainResult: "8.1% CTR", timeframe: "3 weeks", seoFocus: "TikTok UGC" }
  },
  {
    id: 3,
    title: "Scaling UGC: 50 Videos/Month at $200/Video",
    company: "HomeEssentials",
    industry: "Home Goods",
    challenge: "Needed high-volume UGC for 20+ SKUs. Previous agency charged $800/video with 3-week turnaround. Couldn't scale.",
    solution: "Built a creator network, batch filming workflows, and quality control systems. Delivered 50 videos/month with 5-day turnaround.",
    results: [
      { metric: "Volume", value: "50/mo", description: "Videos delivered" },
      { metric: "Cost", value: "$200", description: "Per video" },
      { metric: "Turnaround", value: "5 days", description: "Average delivery" },
      { metric: "Time", value: "2 months", description: "From pilot to scale" }
    ],
    testimonial: "We went from 5 videos/month to 50 without sacrificing quality. Game-changer for our paid social.",
    testimonialAuthor: "Lisa Chen",
    testimonialRole: "Head of Growth, HomeEssentials",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=500&fit=crop",
    stats: { mainResult: "50 Videos/Mo", timeframe: "2 months", seoFocus: "UGC Scaling" }
  }
];

export { caseStudies };

export const CaseStudies = () => {
  const navigate = useNavigate();

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
            Success Stories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground dark:text-white">
            UGC <span className="bg-gradient-to-r from-[hsl(var(--brand-green))] via-[hsl(var(--gold))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            See how we helped DTC brands scale revenue with authentic UGC that outperforms studio ads 3:1 on paid social.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
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
              onClick={() => navigate(`/case-study/${study.id}`)}
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
                    <div className="text-[10px] sm:text-xs text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))]">Result</div>
                  </div>
                  <div className="text-center">
                    <div className="text-foreground dark:text-white font-bold text-sm sm:text-base lg:text-lg">{study.stats.seoFocus}</div>
                    <div className="text-[10px] sm:text-xs text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))]">Focus</div>
                  </div>
                  <div className="text-center">
                    <div className="text-foreground dark:text-white font-bold text-sm sm:text-base lg:text-lg">{study.stats.timeframe}</div>
                    <div className="text-[10px] sm:text-xs text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))]">Timeframe</div>
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
                  <span className="hidden sm:inline">View Full Case Study</span>
                  <span className="sm:hidden">View Study</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </motion.article>
          ))}
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
            Ready to write your own success story?
          </p>
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg">
            <span className="hidden sm:inline">Get Your UGC Quote →</span>
            <span className="sm:hidden">Get Quote →</span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};
