import { motion } from "framer-motion";

const tools = [
  { name: "TikTok Ads", category: "Platform" },
  { name: "Meta Ads", category: "Platform" },
  { name: "YouTube Ads", category: "Platform" },
  { name: "Pinterest Ads", category: "Platform" },
  { name: "Shopify", category: "E-commerce" },
  { name: "WooCommerce", category: "E-commerce" },
  { name: "Google Analytics", category: "Analytics" },
  { name: "Triple Whale", category: "Analytics" },
  { name: "Klaviyo", category: "Marketing" },
  { name: "Attentive", category: "Marketing" },
  { name: "Frame.io", category: "Delivery" },
  { name: "Dropbox", category: "Delivery" },
  { name: "Slack", category: "Collaboration" },
  { name: "Asana", category: "Collaboration" },
  { name: "CapCut", category: "Editing" },
  { name: "Adobe Premiere", category: "Editing" },
  { name: "Notion", category: "Workflow" },
  { name: "Airtable", category: "Workflow" }
];

const categories = ["Platform", "E-commerce", "Analytics", "Marketing", "Delivery", "Collaboration", "Editing", "Workflow"];

export const ToolsIntegration = () => {
  return (
    <motion.section 
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-background via-muted/10 to-background z-60"
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-4">
        <motion.div 
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.span 
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-br from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4 shadow-[0_8px_24px_-6px_rgba(34,197,94,0.3)] border border-white/10 backdrop-blur-sm relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-30"></span>
            <span className="relative z-10">Platform Integrations</span>
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-2 text-foreground dark:text-white leading-tight tracking-tight">
            Seamless <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[hsl(var(--brand-green))] via-[hsl(var(--gold))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent bg-[length:200%_100%]">UGC Integrations</span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--brand-green))]/40 to-transparent"></span>
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl px-2 dark:text-white/90">
            We integrate with all major ad platforms, e-commerce tools, and analytics systems—delivering UGC directly to your workflow.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {tools.slice(0, 18).map((tool, index) => (
              <motion.div 
                key={index}
                className="relative bg-card/80 backdrop-blur-sm border border-[hsl(215,32%,91%)] dark:border-border/40 rounded-xl p-3 sm:p-4 text-center hover:border-[hsl(var(--brand-green))]/40 dark:hover:border-[hsl(var(--gold))]/40 hover:shadow-[0_12px_35px_-10px_hsl(142_70%_45%/0.15),0_0_20px_hsl(142_70%_45%/0.05)] dark:hover:shadow-[0_12px_35px_-10px_rgba(34,197,94,0.15),0_0_20px_rgba(34,197,94,0.05)] transition-all duration-300 group overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-green))]/3 to-[hsl(var(--gold))]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-sm sm:text-base font-bold text-foreground dark:text-white transition-colors relative z-10">
                  {tool.name}
                </p>
                <span className="inline-block mt-2 px-2 py-0.5 text-[10px] sm:text-xs font-semibold bg-gradient-to-r from-[hsl(var(--brand-green))]/10 to-[hsl(var(--gold))]/10 dark:from-[hsl(var(--brand-green))]/15 dark:to-[hsl(var(--gold))]/15 text-[hsl(var(--brand-green))] dark:text-[hsl(var(--gold))] rounded-full border border-[hsl(var(--brand-green))]/20 dark:border-[hsl(var(--gold))]/25 relative z-10">
                  {tool.category}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="relative bg-card/80 backdrop-blur-xl border border-[hsl(215,32%,91%)] dark:border-border/40 rounded-2xl p-6 sm:p-8 md:p-10 text-center overflow-hidden group hover:border-[hsl(var(--brand-green))]/40 dark:hover:border-[hsl(var(--gold))]/40 hover:shadow-[0_20px_50px_-15px_hsl(142_70%_45%/0.15),0_0_30px_hsl(142_70%_45%/0.05)] dark:hover:shadow-[0_20px_50px_-15px_rgba(34,197,94,0.15),0_0_30px_rgba(34,197,94,0.05)] transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-green))]/3 to-[hsl(var(--gold))]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--brand-green))]/30 to-transparent"></div>
            <p className="text-base sm:text-lg md:text-xl font-bold text-foreground dark:text-white mb-3 sm:mb-4 relative z-10">
              <span className="bg-gradient-to-r from-[hsl(var(--brand-green))] via-[hsl(var(--gold))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent">Using a different platform?</span> We adapt. 
            </p>
            <p className="text-sm sm:text-base text-muted-foreground dark:text-white/90 leading-relaxed relative z-10">
              Share your ad platform or workflow—we'll deliver UGC in the format you need, wherever you need it.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};