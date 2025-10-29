import { useEffect, useRef, useState } from "react";
import { Users, TrendingDown, TrendingUp, DollarSign } from "lucide-react";

const ResultsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const Counter = ({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, end]);

    return (
      <span>
        {prefix}
        {count.toLocaleString("pt-BR")}
        {suffix}
      </span>
    );
  };

  const results = [
    {
      icon: Users,
      value: 520000,
      suffix: "+",
      prefix: "",
      label: "Cadastros Gerados",
      color: "from-primary to-primary/80",
    },
    {
      icon: TrendingDown,
      value: 82,
      suffix: "%",
      prefix: "",
      label: "Redução no CPA Médio",
      color: "from-accent to-accent/80",
    },
    {
      icon: TrendingUp,
      value: 980,
      suffix: "%",
      prefix: "+",
      label: "Aumento em FTDs",
      color: "from-primary to-accent",
    },
    {
      icon: DollarSign,
      value: 50,
      suffix: "M+",
      prefix: "R$ ",
      label: "Receita Otimizada",
      color: "from-accent to-primary",
    },
  ];

  return (
    <section id="results" ref={sectionRef} className="py-24 bg-gradient-to-br from-secondary/50 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Resultados em{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Números
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Métricas que falam por si</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${result.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <result.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-heading text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {isVisible && <Counter end={result.value} suffix={result.suffix} prefix={result.prefix} />}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{result.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
