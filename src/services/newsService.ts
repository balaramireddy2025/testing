import { ref, get, child } from 'firebase/database';
import { db } from './firebaseConfig';
import { NewsItem } from '../types';

/**
 * Fetch all news from Firebase Realtime Database
 */
export const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    const newsRef = ref(db, 'news');
    const snapshot = await get(newsRef);

    if (!snapshot.exists()) {
      console.warn('No news data found in Firebase');
      return getPlaceholderNews();
    }

    const newsData = snapshot.val();
    const newsArray: NewsItem[] = [];

    // Convert Firebase object to array
    Object.values(newsData).forEach((item: any) => {
      if (item && typeof item === 'object') {
        newsArray.push({
          id: item.id || Math.random(),
          title: item.title || 'Untitled',
          original_title: item.original_title,
          description: item.description || '',
          full_context: item.full_context || item.description,
          category: item.category || 'tech',
          emoji: item.emoji || '📰',
          date: item.date || new Date().toISOString(),
          source: item.source || 'Unknown',
          url: item.url || '#',
          image: item.image,
          fetchedAt: item.fetchedAt,
        });
      }
    });

    // Sort by date (newest first)
    newsArray.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    return newsArray.length > 0 ? newsArray : getPlaceholderNews();
  } catch (error) {
    console.error('Error fetching news from Firebase:', error);
    return getPlaceholderNews();
  }
};

/**
 * Placeholder news for development/demo
 */
const getPlaceholderNews = (): NewsItem[] => {
  return [
    {
      id: 1,
      title: 'GPT-5 Announced: Now With 50% More Hallucinations',
      original_title: 'OpenAI Announces GPT-5',
      description: 'The new model can confidently make up facts at twice the speed of GPT-4. Industry experts question whether this is progress.',
      full_context: 'OpenAI has announced GPT-5, the latest iteration of their large language model. The model shows significant improvements in various benchmarks.',
      category: 'ai',
      emoji: '🤖',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'AI Comic Daily',
      url: '#',
      image: 'https://images.unsplash.com/photo-1677442d019cecf8da46145f25edf22693eaf75190?w=500&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Crypto Investors Finally Invent Use Case: Funding Venture Capitalists',
      original_title: 'Cryptocurrency Market Updates',
      description: 'After 15 years, blockchain technology finally has a clear purpose: making it easier for VCs to raise money from confused investors.',
      full_context: 'The cryptocurrency market continues to evolve with new projects and innovations.',
      category: 'crypto',
      emoji: '₿',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'AI Comic Daily',
      url: '#',
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'Cloud Native Developers Report 100% Increase in YAML Headaches',
      original_title: 'Cloud Infrastructure Trends',
      description: 'Engineers continue to struggle with indentation-based configuration files, leading to a 40% increase in rubber duck debugging sessions.',
      full_context: 'Cloud computing continues to evolve with new technologies and best practices.',
      category: 'cloud',
      emoji: '☁️',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'AI Comic Daily',
      url: '#',
      image: 'https://images.unsplash.com/photo-1560661617-004de2b47c3e?w=500&h=300&fit=crop',
    },
    {
      id: 4,
      title: 'Tech CEO Claims AI Will Replace All Jobs by 2025 (Except His)',
      original_title: 'AI and Employment Discussion',
      description: 'Yet another billionaire warns of mass automation while continuing to extract maximum value from human labor.',
      full_context: 'Industry leaders share their views on artificial intelligence and its impact on the job market.',
      category: 'tech',
      emoji: '💻',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'AI Comic Daily',
      url: '#',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    },
    {
      id: 5,
      title: 'Server Farms Now Require More Cooling Than Small Countries',
      original_title: 'Data Center Energy Consumption',
      description: 'As AI models grow larger, data centers consume electricity at alarming rates, making ice caps melt faster just to run TensorFlow.',
      full_context: 'Data center infrastructure and energy consumption continue to be major concerns in the tech industry.',
      category: 'tech',
      emoji: '⚡',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'AI Comic Daily',
      url: '#',
    },
    {
      id: 6,
      title: 'Machine Learning Model Achieves 99% Accuracy on Training Data (100% on Guessing)',
      original_title: 'ML Model Performance',
      description: 'Researchers celebrate overfitting achievement as their model learns to perfectly memorize the entire training set.',
      full_context: 'New research in machine learning shows promising results in model performance.',
      category: 'ai',
      emoji: '🤖',
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'AI Comic Daily',
      url: '#',
    },
  ];
};

export default fetchNews;
