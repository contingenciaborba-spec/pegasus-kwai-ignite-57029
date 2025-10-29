import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PerformanceSection from "@/components/PerformanceSection";
import ServicesSection from "@/components/ServicesSection";
import MetricsTable from "@/components/MetricsTable";
import PartnershipModel from "@/components/PartnershipModel";
import Differentials from "@/components/Differentials";
import ResultsSection from "@/components/ResultsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <PerformanceSection />
      <ServicesSection />
      <MetricsTable />
      <PartnershipModel />
      <Differentials />
      <ResultsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
