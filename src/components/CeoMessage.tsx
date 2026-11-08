import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Img from './Img';
import { site } from '../config/site';

/** Leadership message with the CEO's portrait. `compact` is the short version used on the home page. */
export default function CeoMessage({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`ceo${compact ? ' compact' : ''}`}>
      <figure className="ceo-photo" data-reveal={compact ? 'left' : 'clip'}>
        <Img
          name="wika-ppf-ceo"
          alt={`${site.ceo.title} of ${site.name} at the company headquarters`}
          sizes={compact ? '(max-width: 900px) 92vw, 460px' : '(max-width: 900px) 92vw, 600px'}
          position="40% 30%"
        />
      </figure>
      <div className="ceo-body">
        <span className="eyebrow" data-reveal>
          {compact ? 'A word from our CEO' : 'Leadership'}
        </span>
        {!compact && (
          <h2 className="h2" data-reveal>
            A message from our CEO
          </h2>
        )}
        <blockquote data-reveal>
          {compact ? (
            <p>
              A car’s finish is the first thing people notice and the hardest thing to restore. Our job is to make sure our partners never
              have to compromise on the film that protects it.
            </p>
          ) : (
            <>
              <p>
                A car’s finish is the first thing people notice and the hardest thing to restore. When we started WIKA PPF, our goal was
                simple: give installers and distributors a film they never have to second-guess.
              </p>
              <p>
                That means German raw materials, documented quality checks on every batch, and clear warranty terms — not marketing
                claims. It also means being a partner who answers the phone, supplies on time and helps your business grow.
              </p>
              <p>Every roll that leaves our facility carries our name. We make sure it deserves to.</p>
            </>
          )}
        </blockquote>
        <div className="ceo-sign" data-reveal>
          <b>{site.ceo.title}</b>
          <span>{site.legalName}</span>
        </div>
        {compact && (
          <Link to="/about/" className="link-arrow" data-reveal>
            About WIKA PPF <ArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
}
