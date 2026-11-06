import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PageHero } from '../components/ui';
import { WhatsappIcon } from '../components/Icon';
import { site } from '../config/site';

const topics = [
  { id: 'samples', label: 'Samples & data sheets' },
  { id: 'pricing', label: 'Wholesale pricing' },
  { id: 'distribution', label: 'Distribution partnership' },
  { id: 'technical', label: 'Technical support' },
  { id: 'other', label: 'Something else' },
];
const businessTypes = ['Distributor / wholesaler', 'PPF installation studio', 'Detailing center', 'Car dealer / showroom', 'Vehicle owner', 'Other'];

/**
 * No backend: the form composes a message and hands it to the visitor's email app or WhatsApp.
 */
export default function Contact() {
  const [params] = useSearchParams();
  const [topic, setTopic] = useState('samples');
  const [sent, setSent] = useState<null | 'email' | 'whatsapp'>(null);

  useEffect(() => {
    const t = params.get('topic');
    if (t && topics.some((x) => x.id === t)) setTopic(t);
  }, [params]);

  const compose = (form: HTMLFormElement) => {
    const f = new FormData(form);
    const topicLabel = topics.find((t) => t.id === topic)?.label ?? topic;
    const lines = [
      `Topic: ${topicLabel}`,
      `Name: ${f.get('name')}`,
      f.get('company') ? `Company: ${f.get('company')}` : '',
      `Business type: ${f.get('business')}`,
      f.get('country') ? `Country: ${f.get('country')}` : '',
      `Email: ${f.get('email')}`,
      f.get('phone') ? `Phone: ${f.get('phone')}` : '',
      '',
      String(f.get('message') ?? ''),
    ].filter((l) => l !== null);
    return { subject: `WIKA PPF inquiry — ${topicLabel}`, body: lines.join('\n') };
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === 'whatsapp' ? 'whatsapp' : 'email';
    const { subject, body } = compose(form);
    if (via === 'whatsapp') {
      window.open(`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, '_blank', 'noopener');
    } else {
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setSent(via);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s talk <span className="text-grad">protection.</span>
          </>
        }
        lead="Product information, film samples, technical data sheets, wholesale pricing or partnerships — tell us what you need and our team will get back to you."
        crumbs={[{ name: 'Contact' }]}
      />

      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container contact-grid">
          <aside className="contact-info" data-reveal="left">
            <a href={`mailto:${site.contact.email}`} className="ci-row">
              <span className="icon-tile">
                <Mail />
              </span>
              <div>
                <small>Email</small>
                <b>{site.contact.email}</b>
              </div>
            </a>
            <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="ci-row">
              <span className="icon-tile">
                <Phone />
              </span>
              <div>
                <small>Phone</small>
                <b>{site.contact.phone}</b>
              </div>
            </a>
            <a href={`https://wa.me/${site.contact.whatsapp}`} className="ci-row" target="_blank" rel="noopener noreferrer">
              <span className="icon-tile wa">
                <WhatsappIcon />
              </span>
              <div>
                <small>WhatsApp</small>
                <b>Chat with our team</b>
              </div>
            </a>
            <div className="ci-row">
              <span className="icon-tile">
                <MapPin />
              </span>
              <div>
                <small>Address</small>
                <b>{site.contact.address}</b>
              </div>
            </div>
            <div className="ci-row">
              <span className="icon-tile">
                <Clock />
              </span>
              <div>
                <small>Business hours</small>
                <b>{site.contact.hours}</b>
              </div>
            </div>
          </aside>

          <form className="contact-form" onSubmit={onSubmit} data-reveal="right">
            {sent ? (
              <div className="form-sent">
                <span className="sent-icon">
                  <Check />
                </span>
                <h2 className="h3">Almost there!</h2>
                <p>
                  Your message has been prepared in {sent === 'email' ? 'your email app' : 'WhatsApp'}. Just press send there and we’ll get back to
                  you shortly.
                </p>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSent(null)}>
                  Write another message
                </button>
              </div>
            ) : (
              <>
                <fieldset className="topic-field">
                  <legend>What can we help with?</legend>
                  <div className="topic-chips">
                    {topics.map((t) => (
                      <label key={t.id} className={topic === t.id ? 'on' : ''}>
                        <input type="radio" name="topic" value={t.id} checked={topic === t.id} onChange={() => setTopic(t.id)} />
                        {t.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="field-row">
                  <label className="field">
                    <span>Full name *</span>
                    <input name="name" required autoComplete="name" placeholder="Jane Doe" />
                  </label>
                  <label className="field">
                    <span>Company</span>
                    <input name="company" autoComplete="organization" placeholder="Your business" />
                  </label>
                </div>
                <div className="field-row">
                  <label className="field">
                    <span>Email *</span>
                    <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
                  </label>
                  <label className="field">
                    <span>Phone</span>
                    <input name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" />
                  </label>
                </div>
                <div className="field-row">
                  <label className="field">
                    <span>Business type *</span>
                    <select name="business" required defaultValue="">
                      <option value="" disabled>
                        Select…
                      </option>
                      {businessTypes.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    <span>Country / region</span>
                    <input name="country" autoComplete="country-name" placeholder="e.g. Germany" />
                  </label>
                </div>
                <label className="field">
                  <span>Message *</span>
                  <textarea name="message" required rows={5} placeholder="Tell us about your needs, volumes or questions…" />
                </label>
                <div className="form-actions">
                  <button type="submit" value="email" className="btn btn-primary">
                    <Send /> Send via email
                  </button>
                  <button type="submit" value="whatsapp" className="btn btn-ghost">
                    <WhatsappIcon /> Send via WhatsApp
                  </button>
                </div>
                <p className="form-note">We only use your details to reply to your inquiry.</p>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
