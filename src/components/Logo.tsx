import React from 'react';
import logoImg from '../assets/images/logo-convention-permis-transparent-v3.png';

export const Logo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'md',
}) => {
  const heightClass = size === 'sm' ? 'h-8 sm:h-9' : size === 'lg' ? 'h-14 sm:h-16' : 'h-10 sm:h-12';

  return (
    <a
      id="header-brand-logo"
      href="#home"
      aria-label="Convention Permis"
      className={`inline-flex items-center justify-center group cursor-pointer select-none transition-transform hover:scale-105 duration-300 ${className}`}
    >
      <img 
        src={logoImg} 
        alt="Convention Permis Logo" 
        className={`${heightClass} w-auto object-contain drop-shadow-md`}
      />
    </a>
  );
};
