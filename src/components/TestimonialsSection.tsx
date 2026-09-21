import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle2, Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface Review {
  id: number;
  name: string;
  formation: string;
  date: string;
  text: string;
  avatar: string;
  rating: number;
}

// Real reviews from Convention Permis' Google Business Profile (4.9/5, 61 avis).
// No photo avatars are used for real reviewers — ReviewAvatar falls back to
// initials automatically when `avatar` is empty.
const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Ismail',
    formation: 'Avis Google',
    date: 'Il y a 2 mois',
    rating: 5,
    text: "Je recommande vivement Convention Permis Paris 15 ! Un grand merci à toute l'équipe pour leur professionnalisme et leur gentillesse. Les moniteurs sont vraiment incroyables : patients, pédagogues et toujours à l'écoute. Grâce à eux, j'ai énormément appris et j'ai pris confiance au volant.",
    avatar: '',
  },
  {
    id: 2,
    name: 'vinc norid',
    formation: 'Avis Google',
    date: 'Il y a 2 mois',
    rating: 5,
    text: "Superbe auto-école ! Des moniteurs respectueux, à l'écoute et très pédagogues. L'accueil des élèves est chaleureux et l'ambiance est détendue, ce qui permet d'apprendre à conduire dans de très bonnes conditions.",
    avatar: '',
  },
  {
    id: 3,
    name: 'Nouhad Chirine Ayad',
    formation: 'Avis Google',
    date: 'Il y a 6 mois',
    rating: 5,
    text: "Super auto école, moniteur au top, équipe très pédagogique et à l'écoute de ses élèves. Grand + pour la flexibilité pour placer nos heures de conduite et merci à la secrétaire pour son accueil chaleureux.",
    avatar: '',
  },
  {
    id: 4,
    name: 'iyad',
    formation: 'Avis Google',
    date: 'Il y a 2 mois',
    rating: 5,
    text: 'Auto école très professionnel avec des moniteurs très sympathiques et pédagogues. Une secrétaire au top, super gentille et qui veut le bien et la réussite de ses élèves !',
    avatar: '',
  },
  {
    id: 5,
    name: 'theva sriram',
    formation: 'Avis Google',
    date: 'Il y a 2 mois',
    rating: 5,
    text: "Super auto-école avec une secrétaire incroyablement bienveillante et à l'écoute ! Les moniteurs sont vraiment pédagogues et gentils, franchement je la conseille à tout le monde !",
    avatar: '',
  },
  {
    id: 6,
    name: 'Zumaa Gds',
    formation: 'Avis Google',
    date: 'Il y a 2 mois',
    rating: 5,
    text: 'Très bonne auto-école ! Merci à Houari et Rayan pour leur gentillesse, leur patience et leurs précieux conseils. Je recommande sans hésiter !',
    avatar: '',
  },
  {
    id: 7,
    name: 'yacine hadj hacene',
    formation: 'Avis Google',
    date: 'Il y a 6 mois',
    rating: 5,
    text: "Une auto école au top ! Un accueil génial dès que vous rentrez, on vous met ultra à l'aise et on vous renseigne sur tout. Je recommande à fond, et au niveau des prix c'est incroyable.",
    avatar: '',
  },
  {
    id: 8,
    name: 'Amar Bouizegarene',
    formation: 'Avis Google',
    date: 'Il y a 2 mois',
    rating: 5,
    text: "Je me suis senti écouté et compris, des gens adorables, sages et à l'écoute, c'est très important. Après avoir fait toutes mes heures de conduite chez eux, je suis bien placé pour en parler.",
    avatar: '',
  },
  {
    id: 9,
    name: 'abdelhakim boujnane',
    formation: 'Avis Google',
    date: 'Il y a 6 mois',
    rating: 5,
    text: "Au top, très bien accueilli. Une équipe à l'écoute et qui est prête à nous aider. Je recommande à 100 % !",
    avatar: '',
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut", 
      staggerChildren: 0.15 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

interface AvatarProps {
  src: string;
  name: string;
}

const ReviewAvatar: React.FC<AvatarProps> = ({ src, name }) => {
  const [hasError, setHasError] = useState(!src);
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="relative shrink-0">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white/10 ring-2 ring-[#ff4d00]/20 shadow-md bg-zinc-800 flex items-center justify-center">
        {!hasError ? (
          <img 
            src={src} 
            alt={name} 
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-bold text-lg tracking-wider">
            {initials}
          </div>
        )}
      </div>
      <div className="absolute -bottom-1 -right-1 bg-zinc-900 rounded-full p-0.5 shadow">
        <CheckCircle2 className="w-4 h-4 text-[#ff4d00] fill-zinc-900" />
      </div>
    </div>
  );
};

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, REVIEWS.length - cardsToShow);

  useEffect(() => {
    if (isHovered) return; 
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000); 
    
    return () => clearInterval(timer);
  }, [maxIndex, isHovered]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-[#09090b] relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#ff4d00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#ff4d00]/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1 text-[#ff4d00]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ff4d00]" />
                ))}
              </div>
              <span className="text-white text-sm font-bold">4.9 / 5</span>
              <span className="text-zinc-500 text-sm">• 61 avis certifiés</span>
            </div>
            <motion.h2 
              variants={itemVariants}
              className="font-['Arial'] font-black uppercase text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-2xl tracking-[-0.02em]"
            >
              CE QUE NOS ÉLÈVES DISENT<br />
              DE CONVENTION PERMIS...
            </motion.h2>
          </div>
          
          {/* Decorative AVIS element */}
          <motion.div 
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
            className="hidden md:flex items-center gap-4 pb-2"
          >
            <div className="w-24 lg:w-32 h-[1px] bg-zinc-800 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-[1px] bg-[#ff4d00]" />
            </div>
            <span className="text-zinc-500 font-bold tracking-widest text-sm">AVIS CLIENTS</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full border border-zinc-500 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-zinc-400" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
              <div className="flex gap-0.5">
                <div className="w-1 h-1 rounded-full bg-zinc-600" />
                <div className="w-1 h-1 rounded-full bg-zinc-700" />
                <div className="w-1 h-1 rounded-full bg-zinc-800" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carousel Area */}
        <motion.div 
          variants={itemVariants}
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 p-2 text-[#ff4d00] hover:scale-110 transition-transform opacity-0 group-hover:opacity-100 disabled:opacity-0 bg-zinc-900/80 border border-white/10 rounded-full backdrop-blur-sm shadow-xl"
            aria-label="Avis précédent"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 p-2 text-[#ff4d00] hover:scale-110 transition-transform opacity-0 group-hover:opacity-100 disabled:opacity-0 bg-zinc-900/80 border border-white/10 rounded-full backdrop-blur-sm shadow-xl"
            aria-label="Avis suivant"
          >
            <ChevronRight size={28} strokeWidth={2.5} />
          </button>

          {/* Track Wrapper */}
          <div className="overflow-hidden w-full px-1 py-4">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
            >
              {REVIEWS.map((review) => (
                <div 
                  key={review.id} 
                  className="px-3 md:px-4 shrink-0"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <div className="bg-[#0f0f11] border border-white/5 hover:border-[#ff4d00]/30 transition-all duration-300 rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between relative group/card shadow-lg hover:shadow-[#ff4d00]/5">
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3.5">
                          <ReviewAvatar src={review.avatar} name={review.name} />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-bold text-lg leading-tight">{review.name}</h4>
                            </div>
                            <span className="inline-block text-[#ff4d00] text-xs font-semibold uppercase tracking-wider mt-0.5">
                              {review.formation}
                            </span>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-[#ff4d00] text-[#ff4d00]" />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Top Quote Icon */}
                        <Quote className="w-8 h-8 text-white/5 group-hover/card:text-[#ff4d00]/20 transition-colors shrink-0" />
                      </div>

                      {/* Review Text */}
                      <p className="text-zinc-300 text-[14.5px] sm:text-[15px] leading-relaxed italic">
                        « {review.text} »
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Avis vérifié
                      </span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pagination Dots */}
        <motion.div 
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
          className="flex justify-center items-center gap-2 mt-8"
        >
          {[...Array(maxIndex + 1)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx 
                  ? 'w-6 h-2 bg-[#ff4d00]' 
                  : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
              aria-label={`Aller à la page ${idx + 1}`}
            />
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
};

