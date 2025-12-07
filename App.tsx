import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { NewsItem } from './types';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load demo news directly
        const demoNews: NewsItem[] = [
          {
            id: 1,
            title: 'GPT-5 Announced: Now With 50% More Hallucinations',
            original_title: 'OpenAI Announces GPT-5',
            description: 'The new model can confidently make up facts at twice the speed of GPT-4.',
            full_context: 'OpenAI has announced GPT-5, the latest iteration of their large language model.',
            category: 'ai',
            emoji: '🤖',
            date: new Date().toISOString(),
            source: 'AI Comic Daily',
            url: '#',
            image: 'https://images.unsplash.com/photo-1677442d019cecf8da46145f25edf22693eaf75190?w=500&h=300&fit=crop',
          },
          {
            id: 2,
            title: 'Crypto Investors Finally Invent Use Case',
            original_title: 'Cryptocurrency Market Updates',
            description: 'After 15 years, blockchain finally has a clear purpose: funding VCs.',
            full_context: 'The cryptocurrency market continues to evolve.',
            category: 'crypto',
            emoji: '₿',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            source: 'AI Comic Daily',
            url: '#',
            image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=300&fit=crop',
          },
          {
            id: 3,
            title: 'Cloud Devs Report 100% Increase in YAML Headaches',
            original_title: 'Cloud Infrastructure Trends',
            description: 'Engineers continue to struggle with indentation-based config files.',
            full_context: 'Cloud computing continues to evolve with new technologies.',
            category: 'cloud',
            emoji: '☁️',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            source: 'AI Comic Daily',
            url: '#',
            image: 'https://images.unsplash.com/photo-1560661617-004de2b47c3e?w=500&h=300&fit=crop',
          },
          {
            id: 4,
            title: 'Tech CEO Claims AI Will Replace All Jobs (Except His)',
            original_title: 'AI and Employment Discussion',
            description: 'Yet another billionaire warns of mass automation.',
            full_context: 'Industry leaders share their views on artificial intelligence.',
            category: 'tech',
            emoji: '💻',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            source: 'AI Comic Daily',
            url: '#',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
          },
        ];
        setNews(demoNews);
        setLoading(false);
      } catch (err) {
        setError('Failed to load news');
        setLoading(false);
        console.error(err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f2f0e6] font-hand text-ink pb-20">
      {/* Header */}
      <div className="h-4 bg-ink w-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        {/* Masthead */}
        <div className="text-center py-12 border-b-4 border-ink mb-12">
          <p className="text-sm tracking-widest mb-2">THE OFFICIAL SATIRE</p>
          <h1 className="font-comic text-6xl md:text-8xl text-ink mb-4" style={{ fontFamily: 'Permanent Marker, cursive' }}>
            AI COMIC
          </h1>
          <h2 className="font-comic text-5xl md:text-7xl text-[#e89da2] mb-4" style={{ fontFamily: 'Permanent Marker, cursive' }}>
            DAILY NEWS
          </h2>
          <p className="bg-ink text-white px-6 py-2 inline-block font-hand text-lg">
            "All the Artificial Intelligence fit to print."
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-16 h-16 animate-spin text-ink mb-6" />
            <h2 className="text-3xl tracking-widest">DRAWING THE CARTOONS...</h2>
          </div>
        )}

        {error && (
          <div className="bg-white border-4 border-[#e89da2] p-8 flex flex-col items-center justify-center text-center space-y-4 my-8">
            <AlertCircle size={48} className="text-[#e89da2]" />
            <span className="text-3xl">THE PRESS IS JAMMED!</span>
            <span className="text-xl">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((item) => (
              <div key={item.id} className="bg-white border-4 border-ink p-6 shadow-[8px_8px_0px_0px_#2a2a2a] hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold tracking-widest text-[#e89da2] mb-1">
                      {item.category.toUpperCase()}
                    </p>
                    <h3 className="font-bold text-lg leading-tight font-hand">{item.title}</h3>
                  </div>
                </div>

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover border-2 border-ink mb-4"
                  />
                )}

                <p className="text-sm mb-4 font-hand">{item.description}</p>

                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold">{item.source}</span>
                  <span className="text-gray-600">{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-24 text-center border-t-4 border-ink pt-8 pb-12 bg-ink text-white mt-12">
        <h2 className="text-4xl mb-4 font-bold">AI COMIC DAILY NEWS</h2>
        <p className="text-sm opacity-60">
          © {new Date().getFullYear()} AI Comic Daily News. Printed on recycled pixels.
        </p>
      </footer>
    </div>
  );
};

export default App;
