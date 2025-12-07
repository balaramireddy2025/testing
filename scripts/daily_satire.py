#!/usr/bin/env python3
"""
Daily AI Satire Generator
Fetches real AI/tech news and transforms it into satirical content for AI Comic Daily News
"""

import os
import json
import requests
from datetime import datetime
from typing import Optional, List, Dict, Any
import firebase_admin
from firebase_admin import credentials, db
import google.generativeai as genai

# Configuration
NEWS_API_KEY = os.getenv('NEWS_API_KEY')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
FIREBASE_SERVICE_ACCOUNT = os.getenv('FIREBASE_SERVICE_ACCOUNT')

# News API endpoint
NEWS_API_URL = "https://newsapi.org/v2/everything"

# Category mappings with emojis
CATEGORY_EMOJIS = {
    'AI': '🤖',
    'Cloud': '☁️',
    'Crypto': '₿',
    'Tech': '💻',
    'Breaking': '🚨',
}

# Firebase categories
FIREBASE_CATEGORIES = {
    'AI': 'ai',
    'Cloud': 'cloud',
    'Crypto': 'crypto',
    'Tech': 'tech',
    'Breaking': 'breaking',
}

def init_firebase() -> None:
    """Initialize Firebase Admin SDK"""
    try:
        if not firebase_admin._apps:
            service_account_json = FIREBASE_SERVICE_ACCOUNT
            service_account_info = json.loads(service_account_json)
            
            cred = credentials.Certificate(service_account_info)
            firebase_admin.initialize_app(cred, {
                'databaseURL': service_account_info.get('database_url')
            })
            print("✓ Firebase initialized")
    except Exception as e:
        print(f"✗ Firebase initialization failed: {e}")
        raise

def init_gemini() -> None:
    """Initialize Gemini API"""
    genai.configure(api_key=GEMINI_API_KEY)
    print("✓ Gemini API configured")

def fetch_real_news(query: str, days: int = 7) -> List[Dict[str, Any]]:
    """
    Fetch real tech news from NewsAPI
    
    Args:
        query: Search query for news
        days: How many days back to search
        
    Returns:
        List of news articles
    """
    from_date = datetime.now().strftime('%Y-%m-%d')
    
    params = {
        'q': query,
        'sortBy': 'publishedAt',
        'apiKey': NEWS_API_KEY,
        'language': 'en',
        'pageSize': 10,
    }
    
    try:
        response = requests.get(NEWS_API_URL, params=params, timeout=10)
        response.raise_for_status()
        articles = response.json().get('articles', [])
        print(f"✓ Fetched {len(articles)} articles for '{query}'")
        return articles
    except requests.exceptions.RequestException as e:
        print(f"✗ Error fetching news: {e}")
        return []

def generate_satire(title: str, description: str, source: str) -> Optional[Dict[str, str]]:
    """
    Generate satirical version of news using Gemini
    
    Args:
        title: Original news title
        description: Original news description
        source: News source name
        
    Returns:
        Dictionary with satirical_title and satirical_description
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        prompt = f"""You are a witty satirist for "AI Comic Daily News" - a humorous newspaper about AI and tech.
Transform this tech news into a funny, satirical headline and short description.

RULES:
- Keep the satire clever and light-hearted, not mean-spirited
- Headline should be under 80 characters
- Description should be 1-2 sentences, funny but still somewhat related to the original
- Include comic/ironic exaggeration
- No hashtags, emojis in the text

Original Title: {title}
Original Description: {description}
Source: {source}

Respond in this exact JSON format:
{{
  "satirical_title": "Your funny headline here",
  "satirical_description": "Your funny description here"
}}"""

        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Try to extract JSON from response
        start_idx = response_text.find('{')
        end_idx = response_text.rfind('}') + 1
        if start_idx != -1 and end_idx > start_idx:
            json_str = response_text[start_idx:end_idx]
            result = json.loads(json_str)
            return result
        else:
            print(f"✗ Could not parse Gemini response as JSON")
            return None
            
    except Exception as e:
        print(f"✗ Error generating satire: {e}")
        return None

def categorize_article(title: str, description: str) -> tuple[str, str]:
    """
    Categorize article and return (category_name, firebase_category)
    
    Args:
        title: Article title
        description: Article description
        
    Returns:
        Tuple of (category_display_name, firebase_category_key)
    """
    text = (title + ' ' + description).lower()
    
    keywords = {
        'AI': ['ai', 'artificial intelligence', 'gpt', 'claude', 'llm', 'machine learning', 'neural', 'model'],
        'Crypto': ['crypto', 'bitcoin', 'ethereum', 'blockchain', 'web3', 'coin', 'defi'],
        'Cloud': ['cloud', 'aws', 'azure', 'gcp', 'infrastructure', 'kubernetes', 'devops'],
        'Breaking': ['emergency', 'critical', 'alert', 'urgent', 'breaking', 'outage'],
    }
    
    for category, kws in keywords.items():
        if any(kw in text for kw in kws):
            return category, FIREBASE_CATEGORIES[category]
    
    return 'Tech', FIREBASE_CATEGORIES['Tech']

def create_news_item(article: Dict[str, Any], satire: Dict[str, str], article_id: int) -> Dict[str, Any]:
    """
    Create a news item for Firebase
    
    Args:
        article: Original article from NewsAPI
        satire: Satirical version from Gemini
        article_id: Unique ID for this article
        
    Returns:
        Formatted news item for Firebase
    """
    category_display, firebase_category = categorize_article(
        article.get('title', ''),
        article.get('description', '')
    )
    
    emoji = CATEGORY_EMOJIS.get(category_display, '📰')
    
    return {
        'id': article_id,
        'title': satire.get('satirical_title', article.get('title', 'Untitled')),
        'original_title': article.get('title', ''),
        'description': satire.get('satirical_description', article.get('description', '')),
        'full_context': article.get('content', article.get('description', '')),
        'category': firebase_category,
        'emoji': emoji,
        'date': article.get('publishedAt', datetime.now().isoformat()),
        'source': article.get('source', {}).get('name', 'Unknown'),
        'url': article.get('url', ''),
        'image': article.get('urlToImage', ''),
        'fetchedAt': datetime.now().isoformat(),
    }

def save_to_firebase(news_items: List[Dict[str, Any]]) -> None:
    """
    Save news items to Firebase Realtime Database
    
    Args:
        news_items: List of news items to save
    """
    try:
        ref = db.reference('news')
        
        # Clear old news (optional - adjust based on your needs)
        # ref.delete()
        
        # Save each news item
        for item in news_items:
            item_ref = ref.child(f'item_{item["id"]}')
            item_ref.set(item)
            print(f"✓ Saved: {item['title'][:50]}...")
        
        # Save metadata
        metadata_ref = db.reference('metadata')
        metadata_ref.update({
            'last_updated': datetime.now().isoformat(),
            'total_items': len(news_items),
        })
        
        print(f"✓ Successfully saved {len(news_items)} news items to Firebase")
        
    except Exception as e:
        print(f"✗ Error saving to Firebase: {e}")
        raise

def main():
    """Main execution function"""
    print("🎨 AI Comic Daily News Generator")
    print("=" * 50)
    
    try:
        # Initialize services
        init_firebase()
        init_gemini()
        
        # Fetch news from different categories
        print("\n📰 Fetching news...")
        all_articles = []
        search_queries = [
            'AI artificial intelligence',
            'cryptocurrency blockchain',
            'cloud computing AWS',
            'tech news',
        ]
        
        for query in search_queries:
            articles = fetch_real_news(query)
            all_articles.extend(articles)
        
        if not all_articles:
            print("✗ No articles fetched. Check your NEWS_API_KEY.")
            return
        
        # Limit to 12 articles for performance
        all_articles = all_articles[:12]
        
        # Generate satire for each article
        print("\n😄 Generating satire...")
        news_items = []
        
        for idx, article in enumerate(all_articles, 1):
            title = article.get('title', 'Untitled')
            description = article.get('description', '')
            source = article.get('source', {}).get('name', 'Unknown')
            
            if not description:
                continue
                
            satire = generate_satire(title, description, source)
            
            if satire:
                news_item = create_news_item(article, satire, idx)
                news_items.append(news_item)
                print(f"  {idx}. {satire['satirical_title'][:50]}...")
            else:
                print(f"  {idx}. Skipped (satire generation failed)")
        
        if not news_items:
            print("✗ No satire generated. Check your GEMINI_API_KEY.")
            return
        
        # Save to Firebase
        print("\n💾 Saving to Firebase...")
        save_to_firebase(news_items)
        
        print("\n✅ Daily satire generation complete!")
        print(f"   Generated {len(news_items)} satirical news items")
        
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        raise

if __name__ == '__main__':
    main()
