import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Ambient } from '../components/ui';

export default function NotFound() {
  return (
    <section className="notfound">
      <Ambient />
      <div className="container">
        <span className="nf-code" aria-hidden="true">
          404
        </span>
        <h1 className="h1">This road doesn’t exist.</h1>
        <p className="lead">The page you’re looking for may have moved. Let’s get you back on track.</p>
        <div className="btn-row">
          <Link to="/" className="btn btn-primary">
            Back to home <ArrowRight className="arrow" />
          </Link>
          <Link to="/products/" className="btn btn-ghost">
            View products
          </Link>
        </div>
      </div>
    </section>
  );
}
