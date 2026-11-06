import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { getMeta, notFoundMeta } from './seo/meta';
import { BASE } from './config/site';
import './styles/index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter basename={BASE.replace(/\/$/, '') || '/'}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Hydrate only when the prerendered HTML was rendered for this URL;
// otherwise (dev server, or a fallback page served for another path) render fresh.
const rel = '/' + location.pathname.slice(BASE.length).replace(/^\//, '');
const path = rel.endsWith('/') ? rel : rel + '/';
const rendered = root.dataset.path;
const matches = rendered === path || (rendered === notFoundMeta.path && getMeta(path) === notFoundMeta);

if (root.firstElementChild && matches) hydrateRoot(root, app);
else {
  root.innerHTML = '';
  createRoot(root).render(app);
}
