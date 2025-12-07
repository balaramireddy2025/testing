import React from 'react';
import { NewsItem } from '../types';
import { X, ExternalLink, Share2, Printer } from 'lucide-react';

interface ArticleModalProps {
  item: NewsItem | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const paragraphs = [
    item.description,
    "The political landscape of silicon valley is shifting rapidly. In caricatures drawn by market forces, we see the giants wrestling for dominance while regulators stand by with undersized nets.",
    "This latest development is sketched with bold lines: a definitive move that erases previous assumptions. The ink is barely dry on the press releases, yet the implications are already staining the broader ecosystem.",
    "Critics argue the picture isn't as rosy as painted. They point to the rough edges—ethical concerns, energy consumption, and the displacement of human labor—that are often cropped out of the frame.",
    "However, proponents see a masterpiece in the making. They envision a future illustrated with efficiency and breakthrough discoveries, provided we can keep the pen steady.",
    "As we turn the page on this chapter, one thing is certain: the story of AI is being written in permanent marker, and there is no eraser large enough to undo what has been drawn."
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-8 overflow-y-auto font-hand">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/90 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content - Sketchbook Page */}
      <div className="relative bg-paper w-full max-w-4xl min-h-[60vh] shadow-[10px_10px_0px_0px_rgba(50,50,50,0.5)] flex flex-col animate-in fade-in zoom-in duration-200 border-2 border-ink"
           style={{ borderRadius: '5px 20px 5px 25px / 20px 5px 25px 5px' }}>
        
        {/* Header Actions */}
        <div className="absolute top-4 right-4 z-20 flex space-x-2">
             <button onClick={onClose} className="bg-ink text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-wash-red transition-colors transform hover:rotate-90 duration-300 border-2 border-white shadow-sm">
                <X size={24} />
            </button>
        </div>

        {/* Article Content */}
        <div className="p-8 md:p-12 overflow-y-auto max-h-[85vh]">
            
            <div className="text-center mb-8 border-b-2 border-ink border-dashed pb-6">
                 <div className="inline-block bg-ink text-white px-4 py-1 font-ink text-lg transform -rotate-2 mb-4">
                    {item.category.toUpperCase()}
                 </div>
                 <h1 className="font-ink text-5xl md:text-7xl leading-[0.9] text-ink mb-4">
                    {item.title}
                </h1>
                <p className="text-xl text-gray-500 italic">
                    By {item.source} • {item.date}
                </p>
            </div>

            {/* Main Image with Frame */}
            <div className="mb-10 p-2 border-2 border-ink bg-white shadow-sketch transform rotate-1">
                <img 
                    src={item.image || `https://picsum.photos/seed/${item.id}/800/400`} 
                    alt={item.title}
                    className="w-full h-64 md:h-96 object-cover grayscale contrast-125 brightness-90"
                />
            </div>

            {/* Body Text */}
            <div className="text-2xl leading-relaxed text-ink md:columns-2 gap-12 space-y-6 text-justify">
                {paragraphs.map((para, i) => (
                    <p key={i} className="mb-4">
                        {i === 0 && <span className="float-left text-6xl font-ink mr-2 mt-[-10px] text-wash-red">"</span>}
                        {para}
                    </p>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t-2 border-ink flex justify-center">
                <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="
                        group flex items-center space-x-3
                        text-ink font-ink text-2xl uppercase
                        border-b-4 border-wash-yellow hover:border-wash-red
                        transition-colors pb-1
                    "
                >
                    <span>Read Original Source</span>
                    <ExternalLink size={24} className="group-hover:-translate-y-1 transition-transform" />
                </a>
            </div>

        </div>
      </div>
    </div>
  );
};
