import React from 'react';

interface SectionHeaderProps {
  title: string;
  color?: 'yellow' | 'red' | 'blue' | 'purple';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  color = 'yellow', 
  align = 'left',
  className = '' 
}) => {
  
  const getAlign = () => {
    switch (align) {
      case 'center': return 'items-center';
      case 'right': return 'items-end';
      case 'left': default: return 'items-start';
    }
  };

  const getColorClass = () => {
    switch(color) {
        case 'red': return 'text-wash-red';
        case 'blue': return 'text-wash-blue';
        case 'purple': return 'text-purple-500';
        default: return 'text-wash-yellow';
    }
  }

  return (
    <div className={`flex flex-col mb-8 ${getAlign()} ${className}`}>
      <div className="relative inline-block">
        {/* Background scribble */}
        <svg viewBox="0 0 300 40" className={`absolute -inset-2 w-[110%] h-[140%] -z-10 ${getColorClass()} opacity-30 transform -rotate-2`} preserveAspectRatio="none">
            <path d="M0,20 Q150,0 300,20" stroke="currentColor" strokeWidth="30" fill="none" strokeLinecap="round" />
            <path d="M20,25 Q150,5 280,25" stroke="currentColor" strokeWidth="15" fill="none" strokeLinecap="round" />
        </svg>

        <h2 className="font-ink text-4xl tracking-tight text-ink transform rotate-1 uppercase">
          {title}
        </h2>
      </div>
    </div>
  );
};
