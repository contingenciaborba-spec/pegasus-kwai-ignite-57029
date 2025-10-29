import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Award } from "lucide-react";

const PartnershipModel = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Modelo de{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Parceria
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Performance com custo fixo e resultados variáveis</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <DollarSign className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">Investimento Fixo Mensal</h3>
                <p className="text-muted-foreground">
                  Cobrindo gestão estratégica, otimização e análise de dados com total transparência.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">Investimento em Mídia</h3>
                <div className="text-2xl font-bold mb-4">100% Controlado por Você</div>
                <p className="text-muted-foreground">
                  Você define e controla todo o investimento em mídia, garantindo total visibilidade e transparência.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Cashback Highlight */}
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-heading text-3xl font-bold mb-3">Programa de Cashback Exclusivo</h3>
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    Nosso programa de cashback devolve{" "}
                    <span className="font-bold text-primary">até R$ 15.000 em mídia</span>, se sua operação atingir as metas trimestrais.{" "}
                    <span className="font-semibold">Nosso sucesso é o seu sucesso.</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PartnershipModel;
