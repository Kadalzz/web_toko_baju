import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Import seed function untuk development
import { seedCategories } from './scripts/seedCategories';
if (import.meta.env.DEV) {
  (window as any).seedCategories = seedCategories;
  console.log('💡 Untuk seed data kategori, jalankan: seedCategories()');
}

console.log('Starting app...');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

console.log('App rendered');
