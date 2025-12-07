import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

// Firebase configuration - Add your actual values here
const firebaseConfig = {
  apiKey: "AIzaSyBEOVKrqLE7G3TnxKtCJnYIqRNc04vXQPM",
  authDomain: "ai-news-a0483.firebaseapp.com",
  databaseURL: "https://ai-news-a0483-default-rtdb.firebaseio.com",
  projectId: "ai-news-a0483",
  storageBucket: "ai-news-a0483.firebasestorage.app",
  messagingSenderId: "227037934522",
  appId: "1:227037934522:web:af5421280689a09e46383",
  measurementId: "G-2NZ8QEL8VT"
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  console.log('✓ Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export const newsRef = db ? ref(db, 'news') : null;
export { db };
