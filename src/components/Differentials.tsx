import { CheckCircle2, Target, BarChart3, Sparkles, Handshake, FileText } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

const Differentials = () => {
  const items = [
    {
      icon: Target,
      title: "Especialização em nichos de alta performance no Kwai",
      description: "Foco exclusivo no mercado de apostas e no algoritmo do Kwai",
    },
    {
      icon: BarChart3,
      title: "Estratégias orientadas a dados reais",
      description: "Decisões baseadas em métricas concretas e análise aprofundada",
    },
    {
      icon: Sparkles,
      title: "Criativos que superam a fadiga de audiência",
      description: "Produção contínua de conteúdo nativo e engajador",
    },
    {
      icon: Handshake,
      title: "Alinhamento de incentivos com cashback",
      description: "Seu crescimento é recompensado com benefícios exclusivos",
    },
    {
      icon: FileText,
      title: "Relatórios mensais transparentes",
      description: "Visibilidade completa de todas as métricas e investimentos",
    },
    {
      icon: CheckCircle2,
      title: "Suporte estratégico contínuo",
      description: "Acompanhamento próximo e ajustes em tempo real",
    },
  ];

  return (
    <section id="differentials" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 relative z-10">
              Por que escolher a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent relative inline-block">
                Pegasus Creative
                <div className="absolute -inset-12 w-[calc(100%+6rem)] h-[calc(100%+6rem)]">
                  <SparklesCore
                    background="transparent"
                    minSize={1.2}
                    maxSize={3}
                    particleDensity={400}
                    className="w-full h-full"
                    particleColor="#ff6b35"
                    speed={2}
                  />
                </div>
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl hover:bg-secondary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentials;
