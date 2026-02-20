import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().or(z.literal("")),
  message: z.string().min(10)
});

type FormValues = z.infer<typeof schema>;

export const Contact = () => {
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", message: "" }
  });

  const onSubmit = (data: FormValues) => {
    const subject = encodeURIComponent(`${t("contact.subjectPrefix")} ${data.name}`);
    const body = encodeURIComponent(
      `${t("contact.form.name")}: ${data.name}\n${t("contact.form.email")}: ${data.email}\n${t("contact.form.company")}: ${data.company || "-"}\n\n${t("contact.form.message")}:\n${data.message}`
    );
    const mailto = `mailto:${t("contact.mailto")}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    toast.success(t("contact.toast.sent"));
    reset();
  };

  return (
    <motion.section
      id="contact"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-background text-foreground z-10 overflow-hidden"
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 max-w-3xl">
        <div className="mb-8 sm:mb-10 md:mb-12 text-left">
          <span className="inline-block px-3 py-1.5 bg-gradient-to-br from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white text-xs sm:text-sm font-bold rounded-full mb-3 border border-white/20">
            {t("contact.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground leading-tight tracking-tight">
            {t("contact.title.pre")} <span className="bg-gradient-to-r from-[hsl(var(--brand-green))] via-[hsl(var(--gold))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent">{t("contact.title.highlight")}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">{t("contact.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">{t("contact.form.name")}</Label>
              <Input id="name" placeholder={t("contact.form.namePh")} {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{t("contact.err.name")}</p>}
            </div>
            <div>
              <Label htmlFor="email">{t("contact.form.email")}</Label>
              <Input id="email" type="email" placeholder={t("contact.form.emailPh")} {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{t("contact.err.email")}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="company">{t("contact.form.company")}</Label>
            <Input id="company" placeholder={t("contact.form.companyPh")} {...register("company")} />
          </div>
          <div>
            <Label htmlFor="message">{t("contact.form.message")}</Label>
            <Textarea id="message" placeholder={t("contact.form.messagePh")} rows={6} {...register("message")} />
            {errors.message && <p className="text-red-500 text-sm mt-1">{t("contact.err.message")}</p>}
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">{t("contact.privacy")}</p>
            <Button type="submit" size="lg" className="bg-gradient-to-r from-[hsl(var(--brand-green))] to-[hsl(var(--gold))] text-white border-0" disabled={isSubmitting}>
              {t("contact.submit")} 
            </Button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};
