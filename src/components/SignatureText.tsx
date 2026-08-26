import React from 'react';
import { motion } from 'motion/react';

interface SignatureTextProps {
  text: string;
  className?: string;
  variant?: 'gold' | 'slate' | 'charcoal' | 'white';
  size?: 'sm' | 'md' | 'lg';
  withUnderline?: boolean;
}

export const SignatureText: React.FC<SignatureTextProps> = ({
  text,
  className = '',
  variant = 'slate',
  size = 'md',
  withUnderline = true,
}) => {
  const colorMap = {
    slate: 'text-[#4A748C]',
    gold: 'text-[#B89B5E]',
    charcoal: 'text-[#252525]',
    white: 'text-[#F5F7F8]',
  };

  const strokeColorMap = {
    slate: '#4A748C',
    gold: '#B89B5E',
    charcoal: '#252525',
    white: '#F5F7F8',
  };

  const sizeMap = {
    sm: 'text-xs tracking-[0.25em]',
    md: 'text-sm tracking-[0.22em]',
    lg: 'text-base tracking-[0.2em]',
  };

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2"
      >
        <span
          className={`font-semibold uppercase font-sans ${sizeMap[size]} ${colorMap[variant]}`}
        >
          {text}
        </span>
      </motion.div>

      {withUnderline && (
        <motion.svg
          viewBox="0 0 160 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-28 h-2.5 mt-0.5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.path
            d="M2 7C28 2 70 2 110 6C128 7.5 146 5 158 3"
            stroke={strokeColorMap[variant]}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 0.85,
                transition: {
                  pathLength: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
                  opacity: { duration: 0.4 },
                },
              },
            }}
          />
        </motion.svg>
      )}
    </div>
  );
};
