import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring, useMotionValueEvent } from 'motion/react';
import { Rotate3D, Eye } from 'lucide-react';

interface VehicleScrollCinematicProps {
  folderName: string;
  totalFrames?: number;
  fallbackImage?: string;
  className?: string;
  badgeText?: string;
}

export const VehicleScrollCinematic: React.FC<VehicleScrollCinematicProps> = ({
  folderName,
  totalFrames = 120,
  fallbackImage,
  className = '',
  badgeText = 'Vue 360° Interactive',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const isVisibleRef = useRef(false);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1);

  // Scroll tracking for cinematic rotation during scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001,
  });

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const mouseTilt = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Manual Drag to rotate
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartFrame = useRef(0);

  // Preload frames progressively
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;
    setFirstFrameLoaded(false);
    setLoadProgress(0);
    currentFrameRef.current = 0;
    targetFrameRef.current = 0;

    const frameUrl = (index: number) => {
      const padded = String(index).padStart(3, '0');
      return `/frames/${folderName}/ezgif-frame-${padded}.jpg`;
    };

    let loadedCount = 0;
    const updateProgress = () => {
      loadedCount++;
      if (isMounted) {
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
      }
    };

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = frameUrl(1);
    firstImg.onload = () => {
      if (isMounted) {
        setFirstFrameLoaded(true);
        updateProgress();
      }
    };
    images[0] = firstImg;

    // Load remaining frames
    for (let i = 2; i <= totalFrames; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      img.onload = updateProgress;
      images[i - 1] = img;
    }

    return () => {
      isMounted = false;
    };
  }, [folderName, totalFrames]);

  // Intersection observer to pause render loop when offscreen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Update target frame from scroll when not manually dragging
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (isDragging.current) return;
    const num = typeof latest === 'number' ? latest : parseFloat(String(latest)) || 0;
    const clamped = Math.max(0, Math.min(1, num));
    targetFrameRef.current = Math.min(totalFrames - 1, Math.floor(clamped * (totalFrames - 1)));
  });

  // Mouse tilt effect & drag
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (isDragging.current) {
      const deltaX = e.clientX - dragStartX.current;
      const sensitivity = 0.35;
      const frameDelta = -Math.floor(deltaX * sensitivity);
      let nextFrame = (dragStartFrame.current + frameDelta) % totalFrames;
      if (nextFrame < 0) nextFrame += totalFrames;
      targetFrameRef.current = nextFrame;
      currentFrameRef.current = nextFrame;
    } else {
      mouseTilt.current.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      mouseTilt.current.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartFrame.current = targetFrameRef.current;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    mouseTilt.current.targetX = 0;
    mouseTilt.current.targetY = 0;
  };

  // Touch drag support for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      dragStartX.current = e.touches[0].clientX;
      dragStartFrame.current = targetFrameRef.current;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging.current && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - dragStartX.current;
      const sensitivity = 0.45;
      const frameDelta = -Math.floor(deltaX * sensitivity);
      let nextFrame = (dragStartFrame.current + frameDelta) % totalFrames;
      if (nextFrame < 0) nextFrame += totalFrames;
      targetFrameRef.current = nextFrame;
      currentFrameRef.current = nextFrame;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // 60FPS Render Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let lastRenderedFrame = -1;

    const render = () => {
      animationFrameId.current = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      // Smooth tilt interpolation
      mouseTilt.current.x += (mouseTilt.current.targetX - mouseTilt.current.x) * 0.1;
      mouseTilt.current.y += (mouseTilt.current.targetY - mouseTilt.current.y) * 0.1;

      // Smooth frame interpolation
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current = Math.abs(diff) > 0.01
        ? currentFrameRef.current + diff * 0.25
        : targetFrameRef.current;

      const idx = Math.round(Math.max(0, Math.min(totalFrames - 1, currentFrameRef.current)));
      
      if (idx !== lastRenderedFrame) {
        lastRenderedFrame = idx;
        setCurrentFrameDisplay(idx + 1);
      }

      const img = imagesRef.current[idx] || imagesRef.current[0];

      if (img?.complete && img.naturalWidth > 0) {
        const { width: cW, height: cH } = canvas;
        const ratio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cW / cH;
        let drawW: number, drawH: number;
        
        if (canvasRatio > ratio) {
          drawW = cW;
          drawH = cW / ratio;
        } else {
          drawH = cH;
          drawW = cH * ratio;
        }

        const scale = 1.04;
        const sW = drawW * scale;
        const sH = drawH * scale;

        ctx.fillStyle = '#0a0a0c';
        ctx.fillRect(0, 0, cW, cH);
        
        ctx.drawImage(
          img,
          (cW - sW) / 2 + mouseTilt.current.x,
          (cH - sH) / 2 + mouseTilt.current.y,
          sW,
          sH
        );
      }
    };

    const onResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };

    onResize();
    window.addEventListener('resize', onResize);
    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', onResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [totalFrames]);

  const rotationAngle = Math.round((currentFrameDisplay / totalFrames) * 360);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full overflow-hidden rounded-2xl md:rounded-3xl bg-[#09090b] border border-white/10 shadow-2xl group cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ aspectRatio: '16/10' }}
    >
      {/* Fallback image while initial frame loads */}
      {fallbackImage && (
        <img
          src={fallbackImage}
          alt="Véhicule Convention Permis"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            firstFrameLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      )}

      {/* 360 Animated Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-700 ${
          firstFrameLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Ambient glowing vignette & gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40 pointer-events-none" />
      <div className="absolute inset-0 border border-[#ff4d00]/10 rounded-2xl md:rounded-3xl pointer-events-none group-hover:border-[#ff4d00]/30 transition-colors duration-500" />

      {/* Top HUD Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs text-white font-medium shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#ff4d00] animate-pulse" />
          <span className="tracking-wide uppercase text-[11px] font-bold text-zinc-300">
            {badgeText}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-400 shadow-lg">
          <Rotate3D className="w-3.5 h-3.5 text-[#ff4d00]" />
          <span>{rotationAngle}°</span>
        </div>
      </div>

      {/* Bottom HUD / Drag indication */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 text-xs text-zinc-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
          <Eye className="w-3.5 h-3.5 text-[#ff4d00]" />
          <span className="hidden sm:inline">Scrollez ou glissez pour faire pivoter</span>
          <span className="sm:hidden">Glissez pour pivoter 360°</span>
        </div>

        <div className="text-[11px] font-mono text-zinc-500 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5">
          FRAME {String(currentFrameDisplay).padStart(3, '0')}/{totalFrames}
        </div>
      </div>

      {/* Loading bar for progressive frame prefetch */}
      {loadProgress < 100 && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-zinc-800 pointer-events-none">
          <div 
            className="h-full bg-[#ff4d00] transition-all duration-300"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};
