import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring, useMotionValueEvent } from 'motion/react';

interface ScrollThumbnailProps {
  /** Public folder under /frames/ e.g. "clio_grise" or "clio_bleu" */
  folderName: string;
  totalFrames?: number;
  fallbackImage?: string;
  className?: string;
}

export const ClioScrollThumbnail: React.FC<ScrollThumbnailProps> = ({
  folderName,
  totalFrames = 120,
  fallbackImage,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const isVisibleRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.15,
    restDelta: 0.0001,
  });

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;
    setFirstFrameLoaded(false);
    currentFrameRef.current = 0;
    targetFrameRef.current = 0;

    const frameUrl = (index: number) => {
      const padded = String(index).padStart(3, '0');
      return `/frames/${folderName}/ezgif-frame-${padded}.jpg`;
    };

    const firstImg = new Image();
    firstImg.src = frameUrl(1);
    firstImg.onload = () => { if (isMounted) setFirstFrameLoaded(true); };
    images[0] = firstImg;

    for (let i = 2; i <= totalFrames; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      images[i - 1] = img;
    }

    return () => { isMounted = false; };
  }, [folderName, totalFrames]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const num = typeof latest === 'number' ? latest : parseFloat(String(latest)) || 0;
    const clamped = Math.max(0, Math.min(1, num));
    targetFrameRef.current = Math.min(totalFrames - 1, Math.floor(clamped * (totalFrames - 1)));
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    mousePos.current.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
  };
  const handleMouseLeave = () => {
    mousePos.current.targetX = 0;
    mousePos.current.targetY = 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = () => {
      animationFrameId.current = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.1;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.1;

      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current = Math.abs(diff) > 0.01
        ? currentFrameRef.current + diff * 0.28
        : targetFrameRef.current;

      const idx = Math.round(Math.max(0, Math.min(totalFrames - 1, currentFrameRef.current)));
      const img = imagesRef.current[idx] || imagesRef.current[0];

      if (img?.complete && img.naturalWidth > 0) {
        const { width: cW, height: cH } = canvas;
        const ratio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cW / cH;
        let drawW: number, drawH: number;
        if (canvasRatio > ratio) { drawW = cW; drawH = cW / ratio; }
        else { drawH = cH; drawW = cH * ratio; }
        const scale = 1.05;
        const sW = drawW * scale, sH = drawH * scale;
        ctx.drawImage(img, (cW - sW) / 2 + mousePos.current.x, (cH - sH) / 2 + mousePos.current.y, sW, sH);
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

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full overflow-hidden bg-[#0e0e11] select-none ${className}`}
    >
      {fallbackImage && (
        <img
          src={fallbackImage}
          alt="Formation véhicule"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            firstFrameLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      )}

      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-700 ${
          firstFrameLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 pointer-events-none" />

      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-widest text-[#ff4d00] pointer-events-none shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] animate-pulse" />
        <span>3D Scroll</span>
      </div>
    </div>
  );
};
