import React from 'react';
import { PenTool, Feather } from 'lucide-react';

export const Masthead: React.FC = () => {
  return (
    <header className="mb-12 relative">
        
        {/* Top bar with volume and date */}
        <div className="flex flex-col md:flex-row justify-between items-center py-2 px-4 border-b-4 border-ink border-dashed font-hand font-bold text-lg text-gray-600 mb-6">
            <span>Vol. 404 • Issue #1</span>
            <span className="uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>Price: Your Data</span>
        </div>

        {/* Main Title Block */}
        <div className="relative text-center py-4">
            
            {/* Background Ink Blot shape (CSS) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] bg-ink opacity-5 -rotate-1 rounded-[50%_40%_40%_50%_/_40%_50%_50%_40%] z-0 blur-sm"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-center space-x-4 mb-2">
                    <Feather className="w-8 h-8 text-ink transform -rotate-45" />
                    <span className="font-hand font-bold text-xl uppercase tracking-[0.2em] border-b-2 border-ink">The Official Satire</span>
                    <Feather className="w-8 h-8 text-ink transform rotate-12 scale-x-[-1]" />
                </div>

                <h1 className="font-ink text-7xl md:text-9xl text-ink leading-[0.8] tracking-tighter drop-shadow-sm transform -rotate-1">
                    AI COMIC
                    <br />
                    <span className="text-wash-red relative inline-block px-2">
                        DAILY NEWS
                        {/* Underline scribble */}
                        <svg className="absolute -bottom-2 left-0 w-full h-4 text-ink opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                        </svg>
                    </span>
                </h1>
                
                <div className="mt-6 flex justify-center">
                    <p className="bg-ink text-paper font-hand text-xl md:text-2xl px-6 py-1 transform rotate-1 inline-block border-2 border-transparent shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                        "All the Artificial Intelligence fit to print."
                    </p>
                </div>
            </div>
        </div>
    </header>
  );
};
