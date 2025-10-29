import { ArrowRight } from "lucide-react";
import ShaderBackground from "@/components/ui/shader-background";

const MetricsTable = () => {
  const metrics = [
    {
      stage: "Aquisição",
      metric: "Registro",
      optimization: "Redução do custo por registro (CPR)",
      result: "Mais usuários qualificados",
      color: "from-primary/10 to-primary/5",
    },
    {
      stage: "Ativação",
      metric: "CPA",
      optimization: "Otimização do custo por FTD",
      result: "Conversão eficiente",
      color: "from-accent/10 to-accent/5",
    },
    {
      stage: "Transação",
      metric: "FTD",
      optimization: "Aumento do valor médio do depósito",
      result: "Crescimento rápido de receita",
      color: "from-primary/10 to-primary/5",
    },
    {
      stage: "Retenção",
      metric: "Revenue",
      optimization: "Estratégias de LTV",
      result: "Maximização do ROI",
      color: "from-accent/10 to-accent/5",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="relative inline-block px-8 py-4 rounded-2xl overflow-hidden mb-6">
              <ShaderBackground />
              <h2 className="font-heading text-4xl md:text-5xl font-bold relative z-10">
                Transformando{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Funil em Lucro
                </span>
              </h2>
            </div>
            <p className="text-xl text-muted-foreground">Otimização métrica a métrica</p>
          </div>

          <div className="space-y-6">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${metric.color} rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300`}
              >
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1 font-medium">Etapa</div>
                    <div className="font-heading text-xl font-bold">{metric.stage}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary hidden md:block" />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 font-medium">Métrica</div>
                      <div className="font-heading text-xl font-bold">{metric.metric}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary hidden md:block" />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 font-medium">Otimização</div>
                      <div className="text-sm">{metric.optimization}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary hidden md:block" />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 font-medium">Resultado</div>
                      <div className="text-sm font-semibold">{metric.result}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsTable;
