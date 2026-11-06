import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products, { ProductDetail } from './pages/Products';
import Technology from './pages/Technology';
import Manufacturing from './pages/Manufacturing';
import Partners from './pages/Partners';
import Warranty from './pages/Warranty';
import Guides, { GuideArticle } from './pages/Guides';
import FaqPage from './pages/FaqPage';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/" element={<Products />} />
        <Route path="/products/:slug/" element={<ProductDetail />} />
        <Route path="/technology/" element={<Technology />} />
        <Route path="/manufacturing/" element={<Manufacturing />} />
        <Route path="/partners/" element={<Partners />} />
        <Route path="/warranty/" element={<Warranty />} />
        <Route path="/guides/" element={<Guides />} />
        <Route path="/guides/:slug/" element={<GuideArticle />} />
        <Route path="/faq/" element={<FaqPage />} />
        <Route path="/about/" element={<About />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
