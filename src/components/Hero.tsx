import { RainbowButton } from "@/components/ui/rainbow-button";
import { RevealText } from "@/components/ui/reveal-text";
import { ArrowRight, TrendingUp, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPegasus from "@/assets/logo-pegasus.png";
import logoKwai from "@/assets/logo-kwai.png";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover md:object-cover object-[center_top]"
        >
          <source src="https://pegasuscriative.com.br/videos/videosite.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/85 to-background/80"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center pt-20 pb-16">
          {/* Logos */}
          <div className="flex justify-center items-center gap-8 mb-8 animate-fade-in">
            <img src={logoPegasus} alt="Pegasus" className="h-16 md:h-20 w-auto drop-shadow-lg" />
            <img src={logoKwai} alt="Kwai" className="h-16 md:h-20 w-auto drop-shadow-lg" />
          </div>

          {/* Floating Icons */}
          <div className="flex justify-center gap-6 mb-8 animate-fade-in">
            <div className="p-3 bg-primary/10 rounded-2xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="p-3 bg-accent/10 rounded-2xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
              <Target className="w-6 h-6 text-accent" />
            </div>
            <div className="p-3 bg-primary/10 rounded-2xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-center leading-tight">
            Maximize seu ROI no Kwai com Performance de Verdade
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            A Pegasus Creative Group é a agência especializada em iGaming que transforma visualizações em resultados reais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <RainbowButton
              onClick={scrollToContact}
              className="text-lg px-8 py-6 h-auto group"
            >
              Agendar Diagnóstico Gratuito
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </RainbowButton>
            <RainbowButton
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 py-6 h-auto"
            >
              Conhecer Serviços
            </RainbowButton>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {[
              { value: "520k+", label: "Cadastros Gerados" },
              { value: "82%", label: "Redução no CPA" },
              { value: "980%", label: "Aumento em FTDs" },
              { value: "R$ 50M+", label: "Receita Otimizada" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
