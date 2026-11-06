import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { allPages, headHtml, getMeta, notFoundMeta } from './seo/meta';
import { BASE } from './config/site';

export function render(url: string) {
  return renderToString(
    <StaticRouter location={BASE.replace(/\/$/, '') + url} basename={BASE.replace(/\/$/, '') || '/'}>
      <App />
    </StaticRouter>,
  );
}

export { allPages, headHtml, getMeta, notFoundMeta };
