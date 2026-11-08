/**
 * Website copy & structured content. Edit text here — components read from this file.
 * Technical values marked "typical" should be confirmed against your official data sheets.
 */

export type IconName =
  | 'shield' | 'sparkles' | 'sun' | 'droplet' | 'flask' | 'gem' | 'layers' | 'eye'
  | 'trending' | 'wrench' | 'badge' | 'truck' | 'users' | 'store' | 'car' | 'microscope'
  | 'factory' | 'package' | 'scan' | 'scissors' | 'boxes' | 'handshake' | 'graduation'
  | 'zap' | 'thermometer' | 'clock';

/* ───────────────────────── Products ───────────────────────── */

export interface Product {
  slug: string;
  name: string;
  type: string;
  short: string;
  tagline: string;
  image: string;
  accent: string;
  finish: 'gloss' | 'matte' | 'pro';
  description: string[];
  highlights: { icon: IconName; title: string; text: string }[];
  idealFor: string[];
  specs: [string, string][];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
}

export const products: Product[] = [
  {
    slug: 'transparent-tpu-ppf',
    name: 'WIKA Clear Gloss',
    type: 'Transparent TPU Paint Protection Film',
    short: 'Transparent TPU',
    tagline: 'Invisible protection. Showroom gloss that lasts.',
    image: 'gloss-yellow-car-bodywork',
    accent: '#1438D6',
    finish: 'gloss',
    description: [
      'WIKA Clear Gloss is our flagship transparent TPU paint protection film. It forms an optically clear, flexible shield over factory paint that absorbs stone chips, road debris and light abrasion — while keeping the original color, depth and gloss of the finish exactly as the manufacturer intended.',
      'A self-healing top coat lets fine swirl marks and light scratches disappear with heat from the sun or warm water, and a hydrophobic surface keeps the vehicle cleaner for longer. Engineered with German raw materials and a pressure-sensitive adhesive, the film installs smoothly, conforms to complex curves and can be removed cleanly according to specification.',
    ],
    highlights: [
      { icon: 'sparkles', title: 'Self-healing top coat', text: 'Fine scratches and swirl marks fade away with ambient heat.' },
      { icon: 'eye', title: 'Optical clarity', text: 'High-transparency TPU keeps the paint looking factory-fresh.' },
      { icon: 'sun', title: 'Anti-yellowing', text: 'UV-stable formulation resists discoloration over time.' },
      { icon: 'droplet', title: 'Hydrophobic & stain resistant', text: 'Water, dirt and contaminants bead off for easy washing.' },
    ],
    idealFor: ['Full-body wraps', 'Front-end packages (bumper, hood, fenders, mirrors)', 'Daily drivers & luxury vehicles', 'New car paint preservation'],
    specs: [
      ['Material', 'Aliphatic thermoplastic polyurethane (TPU)'],
      ['Finish', 'High gloss, optically clear'],
      ['Total thickness (typical)', '7.5 – 8.5 mil · 190 – 215 µm'],
      ['Top coat', 'Self-healing, hydrophobic, stain resistant'],
      ['Adhesive', 'Pressure-sensitive acrylic, repositionable during install'],
      ['Standard roll (typical)', '1.52 m × 15 m'],
      ['Warranty', 'Up to 10 years*'],
    ],
    keywords: ['transparent TPU PPF', 'clear paint protection film', 'clear bra', 'gloss PPF', 'self-healing PPF'],
    metaTitle: 'Clear TPU Paint Protection Film — Clear Gloss PPF',
    metaDescription:
      'WIKA Clear Gloss: self-healing, anti-yellowing, hydrophobic transparent TPU paint protection film with up to 10-year warranty. For installers & distributors.',
  },
  {
    slug: 'matte-tpu-ppf',
    name: 'WIKA Satin Matte',
    type: 'Matte TPU Paint Protection Film',
    short: 'Matte TPU',
    tagline: 'A satin statement — with full protection underneath.',
    image: 'matte-grey-supercar',
    accent: '#0A1330',
    finish: 'matte',
    description: [
      'WIKA Satin Matte combines the impact protection of premium TPU with a refined, low-sheen satin finish. Applied over gloss paint it creates a distinctive stealth look without a permanent respray; applied over factory matte paint it protects a finish that is notoriously difficult to repair.',
      'The matte top coat is engineered for an even, uniform appearance across panels, with the same self-healing, stain-resistant and UV-stable behavior as our clear films. Compatibility with the vehicle finish and installation method should be checked before application.',
    ],
    highlights: [
      { icon: 'gem', title: 'Uniform satin finish', text: 'Consistent low-gloss appearance from panel to panel.' },
      { icon: 'shield', title: 'Protects matte paint', text: 'Shields delicate factory matte finishes from chips and stains.' },
      { icon: 'sparkles', title: 'Self-healing', text: 'Light marks recover with heat — no polishing needed.' },
      { icon: 'zap', title: 'Reversible style', text: 'Change the look of the vehicle without a permanent respray.' },
    ],
    idealFor: ['Gloss-to-satin transformations', 'Factory matte & frozen paint', 'Performance & luxury vehicles', 'Accent parts: roofs, hoods, mirrors'],
    specs: [
      ['Material', 'Aliphatic thermoplastic polyurethane (TPU)'],
      ['Finish', 'Satin / matte'],
      ['Total thickness (typical)', '7.5 – 8.5 mil · 190 – 215 µm'],
      ['Top coat', 'Matte self-healing, stain resistant'],
      ['Adhesive', 'Pressure-sensitive acrylic'],
      ['Standard roll (typical)', '1.52 m × 15 m'],
      ['Warranty', 'Up to 10 years*'],
    ],
    keywords: ['matte PPF', 'matte paint protection film', 'satin PPF', 'stealth PPF', 'matte TPU film'],
    metaTitle: 'Matte TPU Paint Protection Film (Satin & Stealth PPF)',
    metaDescription:
      'WIKA Satin Matte: matte TPU paint protection film for a stealth satin look and for protecting factory matte paint. Self-healing, UV stable, 10-year warranty.',
  },
  {
    slug: 'pcu-ppf',
    name: 'WIKA PCU Pro',
    type: 'PCU Paint Protection Film',
    short: 'PCU',
    tagline: 'Maximum impact resistance for the most demanding drives.',
    image: 'red-sports-car-front',
    accent: '#E8202E',
    finish: 'pro',
    description: [
      'WIKA PCU Pro is a paint protection urethane film developed for the highest-impact zones and the most demanding use. Its tough, resilient construction is focused on resistance to stone chips and debris at speed — the kind of punishment front bumpers, rocker panels and leading edges take on highways and track days.',
      'PCU Pro is suited to sensitive surfaces and performance vehicles where protection comes first. Exact construction, thickness and performance characteristics depend on the selected grade; detailed data sheets are available to partners on request.',
    ],
    highlights: [
      { icon: 'shield', title: 'High stone-chip resistance', text: 'Built to absorb high-velocity road debris.' },
      { icon: 'car', title: 'Performance-ready', text: 'Suited to sports, track-day and racing vehicles.' },
      { icon: 'layers', title: 'Robust construction', text: 'Resilient urethane structure for high-impact zones.' },
      { icon: 'flask', title: 'Chemical resistance', text: 'Resists bird droppings, bug acids, tar and road salt.' },
    ],
    idealFor: ['Front bumpers & leading edges', 'Rocker panels & wheel arches', 'Track-day & racing vehicles', 'Sensitive or high-value surfaces'],
    specs: [
      ['Material', 'Paint protection urethane (PCU)'],
      ['Finish', 'Gloss'],
      ['Thickness', 'Grade dependent — see data sheet'],
      ['Top coat', 'Hard-wearing, stain resistant'],
      ['Adhesive', 'Pressure-sensitive acrylic'],
      ['Standard roll (typical)', '1.52 m × 15 m'],
      ['Warranty', 'Grade dependent*'],
    ],
    keywords: ['PCU PPF', 'PCU paint protection film', 'stone chip protection film', 'track PPF', 'high impact PPF'],
    metaTitle: 'PCU Paint Protection Film — High-Impact PPF',
    metaDescription:
      'WIKA PCU Pro paint protection film: maximum stone-chip and impact resistance for bumpers, leading edges and performance cars. For distributors & installers.',
  },
];

/* ───────────────────────── Benefits / features ───────────────────────── */

export const benefits: { icon: IconName; title: string; text: string }[] = [
  { icon: 'shield', title: 'Stone-chip defense', text: 'A tough, elastic urethane layer absorbs gravel, sand and road debris before it reaches the paint.' },
  { icon: 'sparkles', title: 'Self-healing surface', text: 'Light scratches and swirl marks disappear with heat from the sun or warm water.' },
  { icon: 'sun', title: 'UV & anti-yellowing', text: 'UV-stable materials protect against fading and keep the film crystal clear for years.' },
  { icon: 'droplet', title: 'Hydrophobic & stain resistant', text: 'Water, mud and contaminants bead and roll off, making every wash faster.' },
  { icon: 'flask', title: 'Chemical resistance', text: 'Shields paint from bird droppings, bug acids, tar, tree sap and road salt.' },
  { icon: 'trending', title: 'Preserves resale value', text: 'Original, chip-free factory paint is one of the strongest drivers of resale value.' },
];

export const filmFeatures: { icon: IconName; title: string; text: string }[] = [
  { icon: 'layers', title: 'Multi-layer, anti-wrinkle structure', text: 'Reduces orange peel, stretch marks and bubbles on curved edges and complex panels.' },
  { icon: 'badge', title: 'Grade-A top coat', text: 'A premium clear coat that resists surface scratches and self-heals at ambient temperature.' },
  { icon: 'flask', title: 'German adhesive technology', text: 'Excellent environmental resistance, easy installation and clean removal without harming OEM paint.' },
  { icon: 'eye', title: 'Exceptional clarity', text: 'Advanced formulation for more depth, gloss and visual clarity over any color.' },
];

/* ───────────────────────── Film layers (technology) ───────────────────────── */

export const layers = [
  {
    id: 'topcoat',
    name: 'Self-healing top coat',
    thickness: '≈ 10 µm',
    color: '#0A78B8',
    text: 'The outermost layer defines gloss or matte appearance, cleanability and stain resistance. Its elastomeric polymer network flows back into shape with heat, so fine scratches literally heal themselves.',
  },
  {
    id: 'tpu',
    name: 'TPU / PCU substrate',
    thickness: '≈ 150 – 170 µm',
    color: '#1F52D8',
    text: 'The structural core. A high-clarity, aliphatic polyurethane that stretches around curves, absorbs impact energy from stones and debris, and resists yellowing under UV.',
  },
  {
    id: 'adhesive',
    name: 'Pressure-sensitive adhesive',
    thickness: '≈ 30 µm',
    color: '#1438D6',
    text: 'German-engineered acrylic adhesive that allows controlled repositioning during installation, bonds securely once cured and can be removed according to specification.',
  },
  {
    id: 'liner',
    name: 'Release liner',
    thickness: 'Removed at install',
    color: '#5F6B88',
    text: 'A precision PET liner protects the adhesive through slitting, packaging, shipping and storage — and peels away cleanly at the moment of installation.',
  },
];

/* ───────────────────────── Manufacturing process ───────────────────────── */

export const process = [
  {
    step: '01',
    title: 'Raw material verification',
    text: 'Every batch of TPU resin, top coat and adhesive is checked against supplier documentation before it enters production. Our films are built on German raw materials.',
    image: 'tpu-film-production',
    icon: 'scan' as IconName,
  },
  {
    step: '02',
    title: 'Precision coating',
    text: 'Top coat and adhesive are applied on precision coating lines with tightly controlled tension, temperature and speed for a perfectly even layer.',
    image: 'ppf-coating-production-line',
    icon: 'factory' as IconName,
  },
  {
    step: '03',
    title: 'Curing & lamination',
    text: 'Coated layers are cured and laminated in a clean, climate-controlled environment to lock in clarity and prevent contamination, dust or bubbles.',
    image: 'ppf-precision-coating-head',
    icon: 'thermometer' as IconName,
  },
  {
    step: '04',
    title: 'Slitting & rewinding',
    text: 'Master rolls are slit and rewound to standard and custom widths with clean, straight edges ready for plotters and hand installation.',
    image: 'ppf-slitting-rewinding-line',
    icon: 'scissors' as IconName,
  },
  {
    step: '05',
    title: 'Quality inspection',
    text: 'Thickness, adhesion, release, clarity and finish are measured and visually inspected on light tables against defined test methods.',
    image: 'ppf-quality-control-lab',
    icon: 'microscope' as IconName,
  },
  {
    step: '06',
    title: 'Clean-room packing',
    text: 'Rolls are boxed in clean conditions with batch labels for full traceability — and retained samples are kept for every batch.',
    image: 'ppf-cleanroom-packing',
    icon: 'package' as IconName,
  },
  {
    step: '07',
    title: 'Warehousing & dispatch',
    text: 'Controlled storage and organized logistics keep partners supplied with consistent stock, from single rolls to full pallets.',
    image: 'ppf-warehouse-logistics',
    icon: 'truck' as IconName,
  },
];

export const qualityChecks = [
  'Incoming material & supplier-document verification',
  'Visual inspection for contamination, scratches & bubbles',
  'Film thickness & roll-dimension measurement',
  'Adhesion & release-liner testing',
  'Gloss, clarity & finish consistency checks',
  'Batch identification, traceability & retained samples',
  'Packaging inspection & controlled storage',
];

/* ───────────────────────── Partners ───────────────────────── */

export const partnerTypes: { icon: IconName; title: string; text: string }[] = [
  { icon: 'boxes', title: 'Distributors & wholesalers', text: 'Regional and national distribution with dependable supply planning and competitive volume pricing.' },
  { icon: 'wrench', title: 'Installation studios', text: 'PPF and detailing studios that want consistent, installer-friendly film and fast technical support.' },
  { icon: 'store', title: 'Dealers & showrooms', text: 'Add premium paint protection to new-vehicle sales with a trusted, warranty-backed product.' },
  { icon: 'handshake', title: 'Regional representatives', text: 'Grow the WIKA PPF brand in your market with dealer development and marketing support.' },
];

export const partnerBenefits: { icon: IconName; title: string; text: string }[] = [
  { icon: 'badge', title: 'Batch-to-batch consistency', text: 'Documented quality checkpoints mean every roll installs and looks the same.' },
  { icon: 'graduation', title: 'Product education', text: 'Installation guidance, technical data sheets and training resources for your team.' },
  { icon: 'truck', title: 'Dependable supply', text: 'Long-term supply planning so you never run out in peak season.' },
  { icon: 'shield', title: 'Warranty-backed', text: 'Clear written warranty terms that help you sell with confidence.' },
  { icon: 'sparkles', title: 'Marketing support', text: 'Brand assets, packaging and point-of-sale materials for your store and socials.' },
  { icon: 'users', title: 'Responsive service', text: 'A direct line to our team for orders, technical questions and claims.' },
];

export const partnerSteps = [
  { title: 'Get in touch', text: 'Tell us about your business, market and expected volumes.' },
  { title: 'Samples & data sheets', text: 'Receive film samples and technical documentation to evaluate.' },
  { title: 'Agreement & onboarding', text: 'Agree on terms, pricing tiers and territory, then onboard your team.' },
  { title: 'Launch & grow', text: 'Start selling with ongoing supply, training and marketing support.' },
];

/* ───────────────────────── Installation & care ───────────────────────── */

export const installSteps = [
  'Inspect the paintwork and identify repainted, damaged or sensitive surfaces.',
  'Decontaminate, clay and prepare the surface with suitable products.',
  'Follow approved installation temperature and slip-solution guidance.',
  'Use appropriate squeegees and avoid overstretching the film.',
  'Finish edges carefully and inspect under suitable lighting.',
  'Hand the customer aftercare and curing instructions.',
];

export const careTips: { icon: IconName; title: string; text: string }[] = [
  { icon: 'clock', title: 'Let it cure', text: 'Avoid washing for the first 48–72 hours (up to a week in cold weather) while the adhesive cures.' },
  { icon: 'droplet', title: 'Wash gently', text: 'Use a pH-neutral shampoo and the two-bucket method. Keep pressure washers 30 cm+ from film edges.' },
  { icon: 'sun', title: 'Let heat heal', text: 'Park in the sun or pour warm water over light marks — the self-healing top coat does the rest.' },
  { icon: 'flask', title: 'Remove contaminants fast', text: 'Clean bird droppings, bug splatter and tree sap promptly to keep the finish pristine.' },
];

/* ───────────────────────── FAQ ───────────────────────── */

export const faqs: { q: string; a: string; cat: 'General' | 'Products' | 'Installation & care' | 'Business' }[] = [
  { cat: 'General', q: 'What is paint protection film (PPF)?', a: 'Paint protection film is a clear (or matte) polyurethane film applied to a vehicle’s painted surfaces. It absorbs stone chips, scratches, road debris and chemical contaminants so the original paint underneath stays in factory condition. It is sometimes called “clear bra”.' },
  { cat: 'General', q: 'What is WIKA PPF?', a: 'WIKA PPF is a premium paint protection film brand offering transparent TPU, matte TPU and PCU films built on German raw materials. We supply professional installers, detailing centers, dealers and distributors with consistent, warranty-backed film.' },
  { cat: 'Products', q: 'What is the difference between TPU and PCU film?', a: 'TPU (thermoplastic polyurethane) is highly flexible, self-healing and anti-yellowing, making it the all-round choice for any vehicle. PCU (paint protection urethane) is focused on maximum stone-chip and impact resistance for high-impact zones and performance or racing vehicles.' },
  { cat: 'Products', q: 'Does WIKA PPF really self-heal?', a: 'Yes. The self-healing top coat on our TPU films lets light scratches and swirl marks recover with heat — from sunlight, a warm engine or warm water. Deep cuts that penetrate the film cannot self-heal.' },
  { cat: 'Products', q: 'Will the film turn yellow?', a: 'WIKA TPU films use UV-stable, anti-yellowing materials designed to stay clear over the long term. Proper care and avoiding harsh solvents helps maintain clarity throughout the film’s life.' },
  { cat: 'Products', q: 'Can PPF be applied over matte paint?', a: 'Yes. WIKA Satin Matte is designed to protect factory matte finishes while preserving their look. It can also turn gloss paint into a satin finish without a respray.' },
  { cat: 'General', q: 'How long does paint protection film last?', a: 'High-quality TPU film typically lasts many years with correct installation and care. WIKA PPF films are covered by a warranty of up to 10 years depending on product grade and region — see the written warranty terms for details.' },
  { cat: 'Installation & care', q: 'How do I wash a car with PPF?', a: 'Wait 48–72 hours after installation, then hand wash with a pH-neutral shampoo. Avoid aiming pressure washers directly at film edges, and do not use abrasive polishes or harsh solvents on the film.' },
  { cat: 'Installation & care', q: 'Can I put ceramic coating on top of PPF?', a: 'Yes. A ceramic coating designed for films can be applied over PPF once it has fully cured, adding extra gloss and easier cleaning. The two products complement each other.' },
  { cat: 'Installation & care', q: 'Can PPF be removed without damaging the paint?', a: 'When applied to healthy OEM paint and removed correctly by a professional — usually with gentle heat — WIKA PPF is designed to come off cleanly without damaging the factory finish.' },
  { cat: 'Business', q: 'Do you work with distributors and installers?', a: 'Yes — partnerships are at the core of our business. We work with distributors, wholesalers, PPF installation studios, detailing centers, dealers and regional representatives. Visit our Partners page or contact us to start the conversation.' },
  { cat: 'Business', q: 'Can I get samples and technical data sheets?', a: 'Qualified business partners can request film samples and technical data sheets for each product grade. Contact our team with details about your business and market.' },
];

/* ───────────────────────── Stats ───────────────────────── */

export const stats = [
  { value: 10, suffix: '', label: 'Year warranty', sub: 'Up to, on select grades' },
  { value: 3, suffix: '', label: 'Film lines', sub: 'Clear TPU · Matte TPU · PCU' },
  { value: 7, suffix: '', label: 'Quality checkpoints', sub: 'On every production batch' },
  { value: 100, suffix: '%', label: 'Batch traceability', sub: 'Labeled & sample-retained' },
];

export const marqueeWords = [
  'Paint Protection Film', 'Self-Healing TPU', 'Anti-Yellowing', 'Matte PPF', 'Stone-Chip Defense',
  'Hydrophobic Top Coat', 'German Raw Materials', 'PCU Film', 'Clear Bra', '10-Year Warranty',
];
