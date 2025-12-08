import { NewsItem } from '../types';

// Expanded mock data for a full newspaper feel
const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "NVIDIA REVEALS BLACKWELL GPU ARCHITECTURE",
    description: "The new B200 GPU promises 30x performance increase for LLM inference workloads, marking a massive leap in AI hardware capabilities that could redefine the industry standards overnight.",
    category: "breaking",
    emoji: "🚀",
    date: new Date().toISOString().split('T')[0],
    source: "TechCrunch",
    url: "#",
    image: "https://picsum.photos/800/600?random=1"
  },
  {
    id: 2,
    title: "OpenAI Announces GPT-5 Training Run",
    description: "Sam Altman hints at the start of the next generation model training, expected to achieve reason capabilities far beyond current standards.",
    category: "ai",
    emoji: "🤖",
    date: new Date().toISOString().split('T')[0],
    source: "The Verge",
    url: "#",
    image: "https://picsum.photos/800/600?random=2"
  },
  {
    id: 3,
    title: "Google Cloud Partners with Anthropic",
    description: "A strategic partnership to bring Claude 3 models to Vertex AI, enhancing enterprise cloud offerings.",
    category: "cloud",
    emoji: "☁️",
    date: new Date().toISOString().split('T')[0],
    source: "CNBC",
    url: "#",
    image: "https://picsum.photos/800/600?random=3"
  },
  {
    id: 4,
    title: "Bitcoin Surges as AI Trading Bots Take Over",
    description: "New algorithmic trading strategies driven by reinforcement learning are dominating the crypto markets this week.",
    category: "crypto",
    emoji: "💰",
    date: new Date().toISOString().split('T')[0],
    source: "Coindesk",
    url: "#",
    image: "https://picsum.photos/800/600?random=4"
  },
  {
    id: 5,
    title: "DeepMind Solves 50-Year Geometry Problem",
    description: "AlphaGeometry system demonstrates ability to solve complex math olympiad geometry problems without human demonstration.",
    category: "ai",
    emoji: "🧠",
    date: new Date().toISOString().split('T')[0],
    source: "Nature",
    url: "#",
    image: "https://picsum.photos/800/600?random=5"
  },
  {
    id: 6,
    title: "Meta Releases Llama 3 Open Source",
    description: "The open weights model outperforms proprietary models on several benchmarks, shaking up the developer ecosystem.",
    category: "breaking",
    emoji: "🦙",
    date: new Date().toISOString().split('T')[0],
    source: "Wired",
    url: "#",
    image: "https://picsum.photos/800/600?random=6"
  },
  {
    id: 7,
    title: "Apple Integrating Gemini into iPhone",
    description: "Rumors swirl that Apple is in talks with Google to power iPhone AI features with Gemini models.",
    category: "tech",
    emoji: "📱",
    date: new Date().toISOString().split('T')[0],
    source: "Bloomberg",
    url: "#",
    image: "https://picsum.photos/800/600?random=7"
  },
  {
    id: 8,
    title: "Robots Learn to Fold Laundry",
    description: "A new study from Stanford shows robots learning complex household tasks simply by watching videos.",
    category: "ai",
    emoji: "👕",
    date: new Date().toISOString().split('T')[0],
    source: "MIT Review",
    url: "#",
    image: "https://picsum.photos/800/600?random=8"
  }
];

export const fetchNews = async (): Promise<NewsItem[]> => {
  // Return mock data directly to avoid Firebase dependency issues
  // Simulate a small delay for realism
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_NEWS;
};
