import React from 'react';
import { NewsItem } from './types';

interface NewsCardProps {
  item: NewsItem;
  variant: 'hero' | 'standard' | 'sidebar';
  onClick: (item: NewsItem) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, variant, onClick }) => {
  return (
    <div
      onClick={() => onClick(item)}
      className={`cursor-pointer transition-transform hover:scale-105 ${
        variant === 'hero'
          ? 'bg-white border-4 border-ink p-6 shadow-ink-lg mb-8 transform -rotate-1'
          : variant === 'standard'
          ? 'bg-white border-4 border-ink p-4 shadow-ink transform rotate-1'
          : 'bg-white border-2 border-ink p-3 mb-3 transform -rotate-1'
      }`}
    >
      {variant === 'hero' && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-64 object-cover border-4 border-ink mb-4 watercolor-filter"
        />
      )}
      {variant === 'standard' && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-40 object-cover border-2 border-ink mb-3 watercolor-filter"
        />
      )}
      <h3 className={`font-ink text-ink ${variant === 'hero' ? 'text-3xl' : 'text-lg'} mb-2`}>
        {item.title}
      </h3>
      <p className="font-hand text-sm text-gray-700 mb-2">{item.description}</p>
      <div className="flex justify-between text-xs font-hand text-gray-500">
        <span>{item.source}</span>
        <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};
