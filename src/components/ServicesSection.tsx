import { Sparkles, BarChart3, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      icon: Sparkles,
      title: "Criação de Conteúdo Otimizado",
      description: "Produção de criativos nativos e de alta conversão, desenhados para o algoritmo do Kwai.",
      color: "from-primary to-primary/80",
    },
    {
      icon: BarChart3,
      title: "Otimização de Campanhas",
      description: "Gestão ativa com testes contínuos e ajustes estratégicos para o melhor desempenho.",
      color: "from-accent to-accent/80",
    },
    {
      icon: Target,
      title: "Foco em Métricas de Valor",
      description: "Analisamos o que realmente importa: Registro, CPA, FTD e Revenue.",
      color: "from-primary to-accent",
    },
  ];

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Performance de{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ponta a Ponta
              </span>
              {" "}para Casas de Apostas
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-card hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
