import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import StoryPreview from "@/components/sections/StoryPreview";
import Expertise from "@/components/sections/Expertise";
import AsanaSection from "@/components/sections/AsanaSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import CompanySection from "@/components/sections/CompanySection";
import MediaPreview from "@/components/sections/MediaPreview";
import WellnessSeries from "@/components/sections/WellnessSeries";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";
import FinalCTA from "@/components/sections/FinalCTA";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <StoryPreview />
      <Expertise />
      <AsanaSection />
      <ServicesPreview />
      <CompanySection />
      <MediaPreview />
      <WellnessSeries />
      <Testimonials />
      <BlogPreview />
      <FinalCTA />
      <ContactSection />
    </>
  );
}
