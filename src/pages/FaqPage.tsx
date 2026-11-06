import { CtaBand, Faq, PageHero } from '../components/ui';
import { faqs } from '../data/content';

const cats = ['General', 'Products', 'Installation & care', 'Business'] as const;

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Paint protection film, <span className="text-grad">answered.</span>
          </>
        }
        lead="Everything you want to know about PPF, WIKA films, care and partnering with us."
        crumbs={[{ name: 'FAQ' }]}
      />
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container narrow faq-page">
          {cats.map((c) => (
            <div key={c} className="faq-group">
              <h2 className="h3" data-reveal>
                {c}
              </h2>
              <Faq items={faqs.filter((f) => f.cat === c)} />
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Still have questions?" text="Our team is happy to help with product, technical or partnership questions." />
    </>
  );
}
