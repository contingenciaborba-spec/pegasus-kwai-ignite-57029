import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, FileText, Rocket, Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Diagnóstico Rápido",
      description: "Analisamos seu cenário atual e identificamos oportunidades de crescimento no Kwai",
    },
    {
      icon: FileText,
      number: "02",
      title: "Proposta Personalizada",
      description: "Plano de ação detalhado com projeções realistas e estratégias customizadas",
    },
    {
      icon: Rocket,
      number: "03",
      title: "Lançamento",
      description: "Execução otimizada com acompanhamento contínuo e crescimento acelerado",
    },
  ];

  const handleWhatsApp = () => {
    window.open("https://wa.me/5511972276684", "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:fabio@pegasusgov.com";
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Pronto para{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Acelerar seus Resultados
              </span>
              {" "}no Kwai?
            </h2>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl font-bold text-primary/20 font-heading">{step.number}</div>
                    <div className={`w-14 h-14 bg-gradient-to-br ${index % 2 === 0 ? 'from-primary to-accent' : 'from-accent to-primary'} rounded-xl flex items-center justify-center`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="text-center mb-16">
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 transition-all text-xl px-12 py-8 mb-6"
            >
              Quero Crescer com a Pegasus
            </Button>
            <p className="text-muted-foreground">Agende seu diagnóstico gratuito agora mesmo</p>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <button
              onClick={handleEmail}
              className="flex items-center gap-3 p-6 bg-card rounded-xl hover:shadow-lg transition-all group border-2 border-transparent hover:border-primary/20"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <div className="font-medium text-sm">fabio@pegasusgov.com</div>
              </div>
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-3 p-6 bg-card rounded-xl hover:shadow-lg transition-all group border-2 border-transparent hover:border-primary/20"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <div className="text-sm text-muted-foreground mb-1">WhatsApp</div>
                <div className="font-medium text-sm">+55 11 97227-6684</div>
              </div>
            </button>

            <div className="flex items-center gap-3 p-6 bg-card rounded-xl border-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm text-muted-foreground mb-1">Localização</div>
                <div className="font-medium text-sm">São Paulo, SP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
