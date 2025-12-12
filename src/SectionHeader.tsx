import React from 'react';

interface SectionHeaderProps {
  title: string;
  color?: 'red' | 'blue' | 'yellow' | 'purple';
  align?: 'left' | 'center';
}

const colorMap = {
  red: 'bg-wash-red',
  blue: 'bg-wash-blue',
  yellow: 'bg-wash-yellow',
  purple: 'bg-purple-300',
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, color = 'red', align = 'left' }) => {
  return (
    <div className={`text-${align}`}>
      <div className={`${colorMap[color]} border-4 border-ink p-3 mb-6 inline-block shadow-ink transform -rotate-1`}>
        <h2 className="font-ink text-3xl md:text-4xl text-ink">{title}</h2>
      </div>
    </div>
  );
};
