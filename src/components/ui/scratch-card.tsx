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
  const fxCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [canReset, setCanReset] = useState(true);
  const [gridIcons, setGridIcons] = useState<typeof icons>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const cachedContextsRef = useRef<{
    ctx: CanvasRenderingContext2D | null;
    scratchCtx: CanvasRenderingContext2D | null;
    fxCtx: CanvasRenderingContext2D | null;
    dpr: number;
    rect: { width: number; height: number };
  } | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);

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
    const fxCanvas = fxCanvasRef.current;
    if (!canvas || !scratchCanvas || !fxCanvas || gridIcons.length === 0) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    const scratchCtx = scratchCanvas.getContext('2d', { willReadFrequently: true });
    const fxCtx = fxCanvas.getContext('2d', { willReadFrequently: false });
    if (!ctx || !scratchCtx || !fxCtx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    scratchCanvas.width = rect.width * dpr;
    scratchCanvas.height = rect.height * dpr;
    fxCanvas.width = rect.width * dpr;
    fxCanvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    scratchCtx.scale(dpr, dpr);
    fxCtx.scale(dpr, dpr);

    // Cache contexts and DPR
    cachedContextsRef.current = {
      ctx,
      scratchCtx,
      fxCtx,
      dpr,
      rect: { width: rect.width, height: rect.height }
    };

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
      shimmerGradient.addColorStop(0.5, 'rgba(253, 72, 0, 0.10)');
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
      
      // Draw "RASPE AQUI" text
      scratchCtx.globalAlpha = 1;
      scratchCtx.globalCompositeOperation = 'source-over';
      
      // Calculate responsive font size (6-8% of width, min 24px, max 56px)
      const fontSize = Math.max(24, Math.min(56, rect.width * 0.07));
      scratchCtx.font = `700 ${fontSize}px Inter, system-ui, sans-serif`;
      scratchCtx.textAlign = 'center';
      scratchCtx.textBaseline = 'middle';
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Text shadow for depth
      scratchCtx.shadowColor = 'rgba(0, 0, 0, 0.12)';
      scratchCtx.shadowBlur = 6;
      scratchCtx.shadowOffsetX = 0;
      scratchCtx.shadowOffsetY = 2;
      
      // White stroke for visibility
      scratchCtx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      scratchCtx.lineWidth = fontSize * 0.15;
      scratchCtx.lineJoin = 'round';
      scratchCtx.strokeText('RASPE AQUI', centerX, centerY);
      
      // Main text color
      scratchCtx.fillStyle = '#FD6200';
      scratchCtx.fillText('RASPE AQUI', centerX, centerY);
      
      // Reset shadow
      scratchCtx.shadowColor = 'transparent';
      scratchCtx.shadowBlur = 0;
      
      // Set overlay opacity
      scratchCtx.globalAlpha = 0.60;
    };

    drawGrid();
    if (!isRevealed) {
      drawScratchOverlay();
    } else {
      // Fade out overlay
      scratchCtx.globalAlpha = 0;
      scratchCtx.clearRect(0, 0, rect.width, rect.height);
    }
  }, [gridIcons, isRevealed]);

  // Particle animation on separate FX canvas
  useEffect(() => {
    const animate = () => {
      const fxCanvas = fxCanvasRef.current;
      if (!fxCanvas) return;

      const cached = cachedContextsRef.current;
      if (!cached || !cached.fxCtx) return;

      const ctx = cached.fxCtx;
      ctx.clearRect(0, 0, cached.rect.width, cached.rect.height);

      // Limit to 80 active particles
      if (particlesRef.current.length > 80) {
        particlesRef.current = particlesRef.current.slice(-80);
      }

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
    if (isRevealed) return;

    const cached = cachedContextsRef.current;
    if (!cached || !cached.scratchCtx) return;

    const ctx = cached.scratchCtx;
    const brushSize = window.innerWidth < 768 ? 36 : 52;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Draw stroke connection from last point to current point - full erase
    if (lastPointerRef.current) {
      ctx.globalAlpha = 1.0;
      ctx.lineWidth = brushSize * 1.2;
      ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
      ctx.beginPath();
      ctx.moveTo(lastPointerRef.current.x, lastPointerRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    
    // Soft brush with full erase center
    ctx.globalAlpha = 1.0;
    const brushGradient = ctx.createRadialGradient(x, y, 0, x, y, brushSize);
    brushGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    brushGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.4)');
    brushGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = brushGradient;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    lastPointerRef.current = { x, y };

    // Add particles (3 per scratch)
    for (let i = 0; i < 3; i++) {
      const lifetime = 300 + Math.random() * 200; // 300-500ms
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2.5,
        vy: Math.random() * -2.5 - 0.8,
        life: lifetime,
        maxLife: lifetime,
        size: 2 + Math.random() * 2.5
      });
    }

    // Sample alpha check (step 16) for reveal percentage
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    let totalSampled = 0;
    for (let i = 3; i < imageData.data.length; i += 64) { // step 16 (4 channels * 16)
      if (imageData.data[i] < 128) transparentPixels++;
      totalSampled++;
    }
    const percentRevealed = (transparentPixels / totalSampled) * 100;

    if (percentRevealed >= 52 && !isRevealed) {
      setIsRevealed(true);
      
      // Fade out overlay
      const scratchCanvas = scratchCanvasRef.current;
      if (scratchCanvas && cached.scratchCtx) {
        const startTime = Date.now();
        const fadeOut = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / 280, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3); // cubic-bezier(0.22,1,0.36,1) approximation
          
          cached.scratchCtx!.globalAlpha = 0.60 * (1 - easedProgress);
          
          if (progress < 1) {
            requestAnimationFrame(fadeOut);
          } else {
            // Hide overlay canvas after fade completes
            scratchCanvas.style.display = 'none';
            scratchCanvas.style.pointerEvents = 'none';
          }
        };
        requestAnimationFrame(fadeOut);
      }
      
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
    lastPointerRef.current = null;
  };

  const handleReset = () => {
    if (!canReset) return;
    
    setIsRevealed(false);
    setCanReset(false);
    lastPointerRef.current = null;
    particlesRef.current = [];
    
    // Stop particle animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Re-show and reset overlay canvas
    const scratchCanvas = scratchCanvasRef.current;
    const fxCanvas = fxCanvasRef.current;
    if (scratchCanvas) {
      scratchCanvas.style.display = 'block';
      scratchCanvas.style.pointerEvents = 'auto';
    }
    
    // Clear FX canvas
    if (fxCanvas && cachedContextsRef.current?.fxCtx) {
      const ctx = cachedContextsRef.current.fxCtx;
      ctx.clearRect(0, 0, cachedContextsRef.current.rect.width, cachedContextsRef.current.rect.height);
    }
    
    // Reset and redraw overlay
    if (cachedContextsRef.current?.scratchCtx) {
      const ctx = cachedContextsRef.current.scratchCtx;
      const rect = cachedContextsRef.current.rect; 
      
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Redraw base gradient
      const baseGradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      baseGradient.addColorStop(0, '#FFF7F2');
      baseGradient.addColorStop(1, '#FFE8DE');
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // Redraw shimmer
      const shimmerOffset = (Date.now() / 6000) % 1;
      const shimmerGradient = ctx.createLinearGradient(
        -rect.width + shimmerOffset * rect.width * 2, 
        -rect.height + shimmerOffset * rect.height * 2,
        rect.width + shimmerOffset * rect.width * 2, 
        rect.height + shimmerOffset * rect.height * 2
      );
      shimmerGradient.addColorStop(0, 'rgba(253, 72, 0, 0)');
      shimmerGradient.addColorStop(0.5, 'rgba(253, 72, 0, 0.10)');
      shimmerGradient.addColorStop(1, 'rgba(253, 72, 0, 0)');
      ctx.fillStyle = shimmerGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // Inner glow
      ctx.shadowColor = 'rgba(253, 72, 0, 0.25)';
      ctx.shadowBlur = 16;
      ctx.strokeStyle = 'rgba(253, 72, 0, 0.1)';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, rect.width - 2, rect.height - 2);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      
      // Add noise texture
      const imageData = ctx.getImageData(0, 0, rect.width, rect.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const noise = Math.random() * 15 - 7.5;
        imageData.data[i] += noise;
        imageData.data[i + 1] += noise;
        imageData.data[i + 2] += noise;
      }
      ctx.putImageData(imageData, 0, 0);
      
      // Draw "RASPE AQUI" text
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      
      // Calculate responsive font size (6-8% of width, min 24px, max 56px)
      const textFontSize = Math.max(24, Math.min(56, rect.width * 0.07));
      ctx.font = `700 ${textFontSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const textCenterX = rect.width / 2;
      const textCenterY = rect.height / 2;
      
      // Text shadow for depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
      
      // White stroke for visibility
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = textFontSize * 0.15;
      ctx.lineJoin = 'round';
      ctx.strokeText('RASPE AQUI', textCenterX, textCenterY);
      
      // Main text color
      ctx.fillStyle = '#FD6200';
      ctx.fillText('RASPE AQUI', textCenterX, textCenterY);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      
      ctx.globalAlpha = 1;
    }
    
    // Re-randomize icons
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
  style={{ 
    opacity: 1,            // ✅ sempre visível
    filter: 'none',
    mixBlendMode: 'normal'
  }}
/>
        <canvas
          ref={scratchCanvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer"
          style={{ 
            willChange: 'transform', 
            transform: 'translateZ(0)',
            pointerEvents: isRevealed ? 'none' : 'auto'
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
        <canvas
          ref={fxCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        />

        {isRevealed && (
          <div 
            className="absolute inset-0 flex items-center justify-center animate-fade-in" 
            style={{ 
              background: 'rgba(255, 255, 255, 0.90)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.65)',
              animation: 'fade-in 0.28s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            <div className="text-center p-8 space-y-6">
              <div className="space-y-2">
                <h4 className="font-heading text-3xl font-bold" style={{ color: '#FD4800' }}>Boa!</h4>
                <p style={{ color: 'rgba(0, 0, 0, 0.75)' }}>
                  Continue a leitura no site e entre em contato.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => {
                    window.open('https://api.whatsapp.com/send/?phone=5511972276684&text&type=phone_number&app_absent=0', '_blank', 'noopener,noreferrer');
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        event: 'contact_whatsapp_click',
                        channel: 'scratch_success',
                        timestamp: Date.now()
                      });
                    }
                  }}
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
