import { AnnouncementBar } from "@/components/landing/announcement-bar";
import { Contact } from "@/components/landing/contact";
import { CtaBanner } from "@/components/landing/cta-banner";
import { Faq } from "@/components/landing/faq";
import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Navbar } from "@/components/landing/navbar";
import { Pricing } from "@/components/landing/pricing";
import { Services } from "@/components/landing/services";
import { Stats } from "@/components/landing/stats";
import { Testimonials } from "@/components/landing/testimonials";
import { WhyUs } from "@/components/landing/why-us";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Faq />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
