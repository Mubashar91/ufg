import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Video, TrendingUp, Target, Users, Sparkles, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  seoTopics?: never;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "UGC Hooks That Stop the Scroll: Data from 1000+ Videos",
    excerpt: "Discover the proven hook formulas that drive 3x higher watch time and 5x better CTR on TikTok and Reels.",
    content: `
      <h2>Top Hook Patterns</h2>
      <ul>
        <li>Problem-agitate-solve openers</li>
        <li>Pattern interrupts and curiosity gaps</li>
        <li>Social proof and authority hooks</li>
        <li>Before/after transformations</li>
      </ul>
    `,
    author: "UGC Team",
    date: "October 15, 2025",
    readTime: "7 min read",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "How to Cast the Perfect UGC Creator for Your Brand",
    excerpt: "Learn the exact criteria we use to match creators to brands—demographics, tone, authenticity, and performance history.",
    content: `
      <h2>Casting Criteria</h2>
      <ul>
        <li>Audience demographics and psychographics</li>
        <li>On-camera presence and authenticity</li>
        <li>Previous UGC performance metrics</li>
        <li>Brand alignment and tone matching</li>
      </ul>
    `,
    author: "Casting Team",
    date: "October 8, 2025",
    readTime: "6 min read",
    category: "Creators",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "UGC vs Studio Ads: Why Authentic Content Wins",
    excerpt: "Case study analysis: UGC ads outperform polished studio content 3:1 on paid social. Here's why.",
    content: `
      <h2>Key Findings</h2>
      <ul>
        <li>Authenticity drives trust and engagement</li>
        <li>Platform algorithms favor native content</li>
        <li>Lower production costs, higher ROAS</li>
        <li>Faster iteration and A/B testing</li>
      </ul>
    `,
    author: "Performance Team",
    date: "September 28, 2025",
    readTime: "5 min read",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Platform-Specific UGC: TikTok vs Reels vs Shorts",
    excerpt: "Master the nuances of each platform—pacing, captions, CTAs, and editing styles that drive conversions.",
    content: `
      <h2>Platform Differences</h2>
      <ul>
        <li>TikTok: Fast cuts, trending sounds, native feel</li>
        <li>Reels: Polished UGC, strong hooks, visual storytelling</li>
        <li>Shorts: Quick value, direct CTAs, evergreen content</li>
        <li>Cross-platform optimization strategies</li>
      </ul>
    `,
    author: "Platform Team",
    date: "September 15, 2025",
    readTime: "8 min read",
    category: "Platforms",
    image: "https://images.unsplash.com/photo-1611162618479-ee3d24aaef0b?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    title: "Scaling UGC: From 5 to 50 Videos Per Month",
    excerpt: "The exact systems and workflows we use to scale UGC production without sacrificing quality or authenticity.",
    content: `
      <h2>Scaling Framework</h2>
      <ul>
        <li>Creator network expansion strategies</li>
        <li>Batch filming and editing workflows</li>
        <li>Quality control and brand guidelines</li>
        <li>Performance tracking and iteration</li>
      </ul>
    `,
    author: "Operations Team",
    date: "August 30, 2025",
    readTime: "9 min read",
    category: "Scaling",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    title: "UGC Metrics That Matter: Beyond Views and Likes",
    excerpt: "Track CTR, watch time, conversion rate, and ROAS—the metrics that actually predict UGC ad performance.",
    content: `
      <h2>Key Metrics</h2>
      <ul>
        <li>Hook rate and 3-second watch time</li>
        <li>Click-through rate and landing page CVR</li>
        <li>Cost per acquisition and ROAS</li>
        <li>Creative fatigue and refresh cycles</li>
      </ul>
    `,
    author: "Analytics Team",
    date: "August 12, 2025",
    readTime: "8 min read",
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"
  }
];

export const Blog = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      id="blog"
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-background overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="relative mb-8 sm:mb-12 lg:mb-16 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            UGC Insights
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-[hsl(222,47%,11%)] dark:text-foreground">
            Blog & <span className="bg-gradient-to-r from-[hsl(var(--brand-green))] via-[hsl(var(--gold))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent">UGC Guides</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Expert UGC strategies, creator casting tips, platform optimization, and performance guides to scale your content.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
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
                className="group relative bg-card/80 backdrop-blur-sm border border-[hsl(215,32%,91%)] dark:border-border/40 rounded-2xl overflow-hidden hover:border-[hsl(var(--brand-green))]/60 dark:hover:border-[hsl(var(--gold))]/60 hover:shadow-[0_30px_80px_-20px_hsl(142_70%_45%/0.35),0_0_40px_hsl(142_70%_45%/0.15)] dark:hover:shadow-[0_30px_80px_-20px_rgba(34,197,94,0.3),0_0_40px_rgba(34,197,94,0.1)] transition-all duration-300 cursor-pointer w-full flex flex-col hover:-translate-y-2"
                onClick={() => navigate(`/blog/${post.id}`)}
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
                {/* Hover glow border */}
                <div className="pointer-events-none absolute -inset-px rounded-xl sm:rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[hsl(var(--brand-green))]/20 via-transparent to-[hsl(var(--gold))]/20" />
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--brand-green))] to-transparent opacity-60" />
                {/* Image */}
                <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Subtle image gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="px-2.5 py-1 sm:px-3 backdrop-blur-[2px] bg-card/90 dark:bg-[hsl(var(--gold))] text-[hsl(222,47%,20%)] dark:text-white text-[10px] sm:text-xs font-bold rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))] mb-2 sm:mb-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="truncate">{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 text-[hsl(222,47%,20%)] dark:text-white transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[hsl(220,30%,50%)] dark:text-white mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-[hsl(240,40%,92%)] dark:border-[hsl(240,30%,35%)]/50">
                    <span className="text-[10px] sm:text-xs text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))] truncate">By {post.author}</span>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-card dark:bg-white/10 text-[hsl(var(--brand-green))] dark:text-white border border-[hsl(var(--brand-green))]/30 dark:border-white/20 hover:bg-gradient-to-r hover:from-[hsl(var(--brand-green))] hover:to-[hsl(var(--gold))] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm">
                        <span className="hidden sm:inline">Read</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
