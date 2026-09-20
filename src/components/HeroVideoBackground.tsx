import React, { useEffect, useRef, useState } from 'react';
import defaultHeroVideo from '../assets/videos/hero-background.mp4';

interface HeroVideoBackgroundProps {
  videoUrl?: string;
  className?: string;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  videoUrl = defaultHeroVideo,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Mouse parallax state
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationFrameId = useRef<number | null>(null);

  // Mouse move for subtle cinematic parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      mousePos.current.targetX = normX * 14;
      mousePos.current.targetY = normY * 10;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax animation loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      // Smooth mouse parallax lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.06;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.06;

      if (video) {
        video.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) scale(1.06)`;
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Auto-play video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay policy fallback: muted autoplay is supported in all modern browsers
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* HTML5 Video element auto-playing in continuous loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setIsVideoReady(true)}
        className={`w-full h-full object-cover will-change-transform transition-opacity duration-1000 ${
          isVideoReady ? 'opacity-90' : 'opacity-0'
        }`}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Cinematic Grading & Vignette Overlays */}
      {/* 1. Left dark gradient overlay for text contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/95 via-[#09090b]/75 to-[#09090b]/40" />

      {/* 2. Top fade under navbar */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#09090b] via-[#09090b]/80 to-transparent" />

      {/* 3. Bottom fade to blend seamlessly into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#09090b] via-[#09090b]/90 to-transparent" />

      {/* 4. Cinematic brand ambient glow (orange neon reflection) */}
      <div className="absolute -top-20 right-1/4 w-[500px] h-[500px] bg-[#ff4d00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#ff4d00]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* 5. Subtle cinematic scanline/grid texture for high-end look */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
    </div>
  );
};
