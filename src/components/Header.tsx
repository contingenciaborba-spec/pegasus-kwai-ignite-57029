import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Serviços", id: "services" },
    { label: "Diferenciais", id: "differentials" },
    { label: "Resultados", id: "results" },
    { label: "Contato", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection("hero")}
            className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Pegasus Creative
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item, idx) => {
              const gradients = [
                { from: '#FF6B35', to: '#F7931E' },
                { from: '#FF8C42', to: '#FFA726' },
                { from: '#FF7043', to: '#FF5722' },
                { from: '#FF6F00', to: '#FF9800' },
              ];
              const gradient = gradients[idx % gradients.length];
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{ 
                    '--gradient-from': gradient.from, 
                    '--gradient-to': gradient.to 
                  } as React.CSSProperties}
                  className="relative px-6 py-2 bg-background/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-500 hover:shadow-none group cursor-pointer overflow-visible"
                >
                  {/* Gradient background on hover */}
                  <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
                  {/* Blur glow */}
                  <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50"></span>
                  {/* Text */}
                  <span className="relative z-10 text-foreground/80 group-hover:text-white transition-colors duration-500 font-medium text-sm">
                    {item.label}
                  </span>
                </button>
              );
            })}
            <ThemeToggle />
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all"
            >
              Falar com Especialista
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-6 flex flex-col gap-4 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/80 hover:text-primary transition-colors font-medium text-left"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-primary to-accent text-white w-full"
            >
              Falar com Especialista
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
