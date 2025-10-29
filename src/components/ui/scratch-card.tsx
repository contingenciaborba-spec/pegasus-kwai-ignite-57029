import { useEffect, useRef, useState } from 'react';
import fortuneTiger from '@/assets/fortune-tiger.jpg';
import aviator from '@/assets/aviator.png';
import pepper from '@/assets/pepper.png';
import { Button } from './button';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const icons = [
  { src: fortuneTiger, name: 'Fortune Tiger' },
  { src: aviator, name: 'Aviator' },
  { src: pepper, name: 'Pepper' }
];

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [canReset, setCanReset] = useState(true);
  const [gridIcons, setGridIcons] = useState<typeof icons>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  // Shuffle icons for 3x3 grid
  const shuffleIcons = () => {
    const shuffled: typeof icons = [];
    for (let i = 0; i < 9; i++) {
      shuffled.push(icons[i % 3]);
    }
    // Randomize
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setGridIcons(shuffled);
  };

  useEffect(() => {
    shuffleIcons();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scratchCanvas = scratchCanvasRef.current;
    if (!canvas || !scratchCanvas || gridIcons.length === 0) return;

    const ctx = canvas.getContext('2d');
    const scratchCtx = scratchCanvas.getContext('2d');
    if (!ctx || !scratchCtx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    scratchCanvas.width = rect.width * dpr;
    scratchCanvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    scratchCtx.scale(dpr, dpr);

    // Draw grid with icons
    const drawGrid = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      const cellWidth = rect.width / 3;
      const cellHeight = rect.height / 3;
      const iconSize = Math.min(cellWidth, cellHeight) * 0.6;

      gridIcons.forEach((icon, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const x = col * cellWidth + cellWidth / 2;
        const y = row * cellHeight + cellHeight / 2;

        const img = new Image();
        img.src = icon.src;
        img.onload = () => {
          ctx.save();
          ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = 2;
          ctx.drawImage(img, x - iconSize / 2, y - iconSize / 2, iconSize, iconSize);
          ctx.restore();
        };
      });
    };

    // Draw scratch overlay with metallic gradient and shimmer
    const drawScratchOverlay = () => {
      // Base metallic gradient
      const baseGradient = scratchCtx.createLinearGradient(0, 0, rect.width, rect.height);
      baseGradient.addColorStop(0, '#FFF7F2');
      baseGradient.addColorStop(1, '#FFE8DE');
      scratchCtx.fillStyle = baseGradient;
      scratchCtx.fillRect(0, 0, rect.width, rect.height);

      // Animated shimmer overlay
      const shimmerOffset = (Date.now() / 6000) % 1;
      const shimmerGradient = scratchCtx.createLinearGradient(
        -rect.width + shimmerOffset * rect.width * 2, 
        -rect.height + shimmerOffset * rect.height * 2,
        rect.width + shimmerOffset * rect.width * 2, 
        rect.height + shimmerOffset * rect.height * 2
      );
      shimmerGradient.addColorStop(0, 'rgba(253, 72, 0, 0)');
      shimmerGradient.addColorStop(0.5, 'rgba(253, 72, 0, 0.18)');
      shimmerGradient.addColorStop(1, 'rgba(253, 72, 0, 0)');
      scratchCtx.fillStyle = shimmerGradient;
      scratchCtx.fillRect(0, 0, rect.width, rect.height);

      // Inner glow
      scratchCtx.shadowColor = 'rgba(253, 72, 0, 0.25)';
      scratchCtx.shadowBlur = 16;
      scratchCtx.strokeStyle = 'rgba(253, 72, 0, 0.1)';
      scratchCtx.lineWidth = 2;
      scratchCtx.strokeRect(1, 1, rect.width - 2, rect.height - 2);
      scratchCtx.shadowColor = 'transparent';
      scratchCtx.shadowBlur = 0;

      // Add noise texture
      const imageData = scratchCtx.getImageData(0, 0, rect.width, rect.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const noise = Math.random() * 15 - 7.5;
        imageData.data[i] += noise;
        imageData.data[i + 1] += noise;
        imageData.data[i + 2] += noise;
      }
      scratchCtx.putImageData(imageData, 0, 0);
      
      // Set overlay opacity
      scratchCtx.globalAlpha = 0.78;
    };

    drawGrid();
    if (!isRevealed) {
      drawScratchOverlay();
    }
  }, [gridIcons, isRevealed]);

  // Particle animation
  useEffect(() => {
    const animate = () => {
      const canvas = scratchCanvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life--;

        if (p.life > 0) {
          const alpha = p.life / p.maxLife;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, `rgba(253, 72, 0, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(255, 113, 51, ${alpha * 0.6})`);
          gradient.addColorStop(1, `rgba(197, 60, 0, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }
        return false;
      });

      if (particlesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (particlesRef.current.length > 0) {
      animate();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isScratching]);

  const scratch = (x: number, y: number) => {
    const canvas = scratchCanvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const brushSize = window.innerWidth < 768 ? 40 : 60;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.globalAlpha = 0.65;
    
    // Soft brush with glow
    const brushGradient = ctx.createRadialGradient(
      x * scaleX, y * scaleY, 0,
      x * scaleX, y * scaleY, brushSize * scaleX
    );
    brushGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    brushGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.4)');
    brushGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = brushGradient;
    ctx.beginPath();
    ctx.arc(x * scaleX, y * scaleY, brushSize * scaleX, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Add particles
    for (let i = 0; i < 2; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2.5,
        vy: Math.random() * -2.5 - 0.8,
        life: 25 + Math.random() * 25,
        maxLife: 50,
        size: 2 + Math.random() * 2.5
      });
    }

    // Check reveal progress
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 128) transparentPixels++;
    }
    const percentRevealed = (transparentPixels / (imageData.data.length / 4)) * 100;

    if (percentRevealed >= 45 && !isRevealed) {
      setIsRevealed(true);
      
      // Analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'scratch_complete',
          percent: Math.round(percentRevealed),
          timestamp: Date.now(),
          device: window.innerWidth < 768 ? 'mobile' : 'desktop'
        });
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsScratching(true);
    const rect = scratchCanvasRef.current?.getBoundingClientRect();
    if (rect) {
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    }

    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'scratch_start',
        timestamp: Date.now()
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching) return;
    const rect = scratchCanvasRef.current?.getBoundingClientRect();
    if (rect) {
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const handlePointerUp = () => {
    setIsScratching(false);
  };

  const handleReset = () => {
    if (!canReset) return;
    
    setIsRevealed(false);
    setCanReset(false);
    shuffleIcons();
    
    setTimeout(() => setCanReset(true), 8000);

    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'scratch_reset',
        timestamp: Date.now()
      });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center p-6">
      <div className="text-center mb-6">
        <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2">
          Descubra o poder da performance
        </h3>
        <p className="text-sm text-muted-foreground">
          Passe o mouse ou o dedo para revelar
        </p>
      </div>

      <div 
        className="relative w-full max-w-lg aspect-square bg-gradient-to-br from-[#FFF7F2] to-[#FFE8DE] rounded-2xl shadow-[0_8px_28px_rgba(253,72,0,0.12)] overflow-hidden"
        style={{ touchAction: 'none' }}
        role="application"
        aria-label="Raspagem interativa – painel de revelação"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.05 }}
        />
        <canvas
          ref={scratchCanvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />

        {isRevealed && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-md animate-fade-in">
            <div className="text-center p-8 space-y-6">
              <div className="space-y-2">
                <h4 className="font-heading text-3xl font-bold text-primary">Boa!</h4>
                <p className="text-muted-foreground">
                  Continue a leitura no site e entre em contato.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={scrollToContact}
                  className="bg-[#FD4800] hover:bg-[#C53C00] text-white shadow-lg shadow-[#FD4800]/30"
                >
                  Falar com a Pegasus
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  disabled={!canReset}
                  className="border-[#FD4800] text-[#FD4800] hover:bg-[#FD4800]/10"
                >
                  Raspar novamente
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
