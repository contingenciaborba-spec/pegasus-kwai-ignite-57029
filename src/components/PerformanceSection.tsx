import { Target, Lightbulb, TrendingUp } from "lucide-react";
import { ScratchCard } from "@/components/ui/scratch-card";
import { Spotlight } from "@/components/ui/spotlight";

const PerformanceSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Onde a Performance Encontra a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Audiência Certa
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estratégias inteligentes para escalar seus resultados no Kwai
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">Estratégias de Aquisição Eficientes</h3>
                  <p className="text-muted-foreground">
                    O mercado de iGaming exige estratégias de aquisição de usuários altamente eficientes e escaláveis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">Expertise em Kwai</h3>
                  <p className="text-muted-foreground">
                    A Pegasus combina expertise em performance com profundo conhecimento do algoritmo e audiência do Kwai.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">Resultados Mensuráveis</h3>
                  <p className="text-muted-foreground">
                    Entregando campanhas otimizadas, criativos nativos e resultados mensuráveis que impactam seu ROI.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[600px]">
              <div className="w-full h-full bg-background/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-primary/20 relative">
                <Spotlight
                  className="-top-40 left-0 md:left-60 md:-top-20"
                  fill="hsl(var(--primary))"
                />
                <ScratchCard />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
