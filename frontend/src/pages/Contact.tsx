import { Navbar } from "@/components/Navbar";
import { Contact as ContactSection } from "@/components/Contact";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <motion.section
        className="pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ContactSection />
      </motion.section>
    </div>
  );
};

export default ContactPage;
