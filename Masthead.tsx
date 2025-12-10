import React from 'react';

export const Masthead: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="font-comic text-6xl md:text-8xl text-ink mb-2 transform -rotate-1">
        AI COMIC DAILY
      </h1>
      <p className="font-hand text-2xl text-gray-600 italic">
        "All the News That's Fit to Pixelate"
      </p>
      <p className="font-hand text-lg text-gray-500 mt-2">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
    </div>
  );
};
