import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'mono';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-10',
  variant = 'dark',
  showText = true,
}) => {
  const primaryColor = variant === 'light' ? '#FFFFFF' : '#4A748C';
  const textColor = variant === 'light' ? '#F5F7F8' : '#252525';
  const subtextColor = variant === 'light' ? '#D1D5DB' : '#4A748C';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Mark matching 360 Real Estate & Builder's authentic emblem */}
      <svg
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto shrink-0"
        aria-label="360 Real Estate & Builder's Emblem"
      >
        {/* Chimney */}
        <path
          d="M120 28H134V65L120 54V28Z"
          fill={primaryColor}
        />
        {/* Top Cap */}
        <rect x="117" y="24" width="20" height="4" fill={primaryColor} />

        {/* Roofline Outer */}
        <path
          d="M12 70L80 14L148 70L144 73L80 20L16 73L12 70Z"
          fill={primaryColor}
        />

        {/* 4 Window Panes */}
        <g fill={primaryColor}>
          <rect x="74" y="44" width="4.5" height="4.5" />
          <rect x="81.5" y="44" width="4.5" height="4.5" />
          <rect x="74" y="51" width="4.5" height="4.5" />
          <rect x="81.5" y="51" width="4.5" height="4.5" />
        </g>

        {/* Intertwined 360 Rings & Geometry */}
        {/* The "3" stroke */}
        <path
          d="M52 64H72L60 76C68 76 74 81 74 89C74 96 67 101 58 101C51 101 46 97 44 93"
          stroke={primaryColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ring 1 (6 Loop) */}
        <ellipse
          cx="78"
          cy="87"
          rx="18"
          ry="17"
          stroke={primaryColor}
          strokeWidth="3.5"
        />

        {/* Ring 2 (0 Loop) */}
        <ellipse
          cx="102"
          cy="87"
          rx="18"
          ry="17"
          stroke={primaryColor}
          strokeWidth="3.5"
        />

        {/* Real Estate Top Line */}
        <line
          x1="28"
          y1="80"
          x2="132"
          y2="80"
          stroke={primaryColor}
          strokeWidth="2.5"
        />

        {/* Real Estate Bottom Line */}
        <line
          x1="28"
          y1="94"
          x2="132"
          y2="94"
          stroke={primaryColor}
          strokeWidth="2.5"
        />

        {/* R E A L E S T A T E Text inside lines */}
        <text
          x="80"
          y="89"
          textAnchor="middle"
          fill={primaryColor}
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.28em"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          REAL ESTATE
        </text>

        {/* B U I L D E R bottom text */}
        <text
          x="80"
          y="114"
          textAnchor="middle"
          fill={subtextColor}
          fontSize="7"
          fontWeight="600"
          letterSpacing="0.4em"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          BUILDER
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col tracking-tight">
          <span
            className="font-bold tracking-wider text-sm uppercase leading-none"
            style={{ color: textColor }}
          >
            360 Real Estate
          </span>
          <span
            className="text-[10px] font-semibold tracking-[0.24em] uppercase mt-1 leading-none"
            style={{ color: subtextColor }}
          >
            &amp; Builder&apos;s
          </span>
        </div>
      )}
    </div>
  );
};
