import { NewsItem } from '../types';

// Mock news data - Replace with actual API call
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'GPT-5 Rumors Swirl as OpenAI Stays Quiet',
    description: 'Industry insiders speculate about next-gen AI capabilities',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://via.placeholder.com/600x400?text=GPT5',
    source: 'AI Daily',
    publishedAt: new Date().toISOString(),
    category: 'AI',
  },
  {
    id: '2',
    title: 'Quantum Computing Breakthrough Announced',
    description: 'New chip achieves record coherence time',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://via.placeholder.com/400x300?text=Quantum',
    source: 'Tech Times',
    publishedAt: new Date().toISOString(),
    category: 'Technology',
  },
  {
    id: '3',
    title: 'Crypto Market Rallies on Regulatory News',
    description: 'Bitcoin surges past previous resistance levels',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://via.placeholder.com/400x300?text=Crypto',
    source: 'Coin Tracker',
    publishedAt: new Date().toISOString(),
    category: 'Crypto',
  },
  {
    id: '4',
    title: 'New AI Safety Framework Proposed',
    description: 'Leading researchers unite on standards',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://via.placeholder.com/400x300?text=Safety',
    source: 'AI Research',
    publishedAt: new Date().toISOString(),
    category: 'AI',
  },
  {
    id: '5',
    title: 'SpaceX Starship Test Successful',
    description: 'Fully integrated test shows progress',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://via.placeholder.com/400x300?text=SpaceX',
    source: 'Space News',
    publishedAt: new Date().toISOString(),
    category: 'Space',
  },
  {
    id: '6',
    title: 'Cloud Computing Costs Drop',
    description: 'Major providers announce price reductions',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://via.placeholder.com/400x300?text=Cloud',
    source: 'Cloud Weekly',
    publishedAt: new Date().toISOString(),
    category: 'Technology',
  },
];

export const fetchNews = async (): Promise<NewsItem[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockNews;
};
