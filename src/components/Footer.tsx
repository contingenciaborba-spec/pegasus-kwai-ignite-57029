import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="font-heading text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Pegasus Creative Group
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Agência de Performance especializada no mercado de apostas. Transformamos estratégias de user acquisition em resultados mensuráveis no Kwai.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading text-xl font-bold mb-6">Contato</h4>
              <div className="space-y-4">
                <a
                  href="mailto:fabio@pegasusgov.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>fabio@pegasusgov.com</span>
                </a>

                <a
                  href="https://wa.me/5511972276684"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <span>+55 11 97227-6684</span>
                </a>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span>São Paulo, SP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 Pegasus Creative Group — Todos os direitos reservados.
            </p>
            
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="group"
            >
              <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
              Voltar ao Topo
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
