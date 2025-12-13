import React from 'react';
import { NewsItem } from './types';
import { X } from 'lucide-react';

interface ArticleModalProps {
  item: NewsItem | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-ink p-8 max-w-2xl max-h-[90vh] overflow-y-auto shadow-ink-lg transform -rotate-1">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full"
        >
          <X size={24} />
        </button>
        
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-96 object-cover border-4 border-ink mb-4 watercolor-filter"
        />
        
        <h1 className="font-ink text-4xl mb-4">{item.title}</h1>
        <p className="font-hand text-gray-600 mb-4">{item.description}</p>
        
        <div className="flex gap-4 text-sm font-hand text-gray-500 mb-6">
          <span>📰 {item.source}</span>
          <span>📅 {new Date(item.publishedAt).toLocaleDateString()}</span>
          <span>🏷️ {item.category}</span>
        </div>
        
        <div className="font-hand text-lg leading-relaxed text-gray-800 border-l-4 border-wash-red pl-4">
          {item.content}
        </div>
      </div>
    </div>
  );
};
