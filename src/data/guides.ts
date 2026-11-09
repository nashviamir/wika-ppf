/**
 * Knowledge-hub articles. These long-form guides target the questions people
 * actually search for around paint protection film (long-tail SEO).
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'callout'; title: string; text: string };

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  image: string;
  date: string;
  keywords: string[];
  body: Block[];
}

export const guides: Guide[] = [
  {
    slug: 'what-is-paint-protection-film',
    title: 'What Is Paint Protection Film (PPF)? The Complete Guide',
    metaTitle: 'What Is Paint Protection Film (PPF)? Complete Guide',
    description:
      'Learn what paint protection film (PPF) is, how it works, what it protects against, how long it lasts and how to choose the right PPF for your car.',
    excerpt: 'How PPF works, what it protects against, how long it lasts and how to choose the right film.',
    category: 'Basics',
    readMinutes: 6,
    image: 'white-car-side-gloss',
    date: '2026-11-01',
    keywords: ['what is PPF', 'paint protection film', 'clear bra', 'car paint protection'],
    body: [
      { type: 'p', text: 'Paint protection film — usually shortened to PPF and sometimes called “clear bra” — is a thin, transparent (or matte) polyurethane film applied directly to a vehicle’s painted panels. Its job is simple: take the damage so the paint doesn’t. Stone chips, sand, light scratches, bug acids and bird droppings hit the film instead of the factory clear coat.' },
      { type: 'h2', text: 'How paint protection film works' },
      { type: 'p', text: 'Modern PPF is a multi-layer construction. Each layer has a specific job, and the quality of the finished product depends on all of them working together:' },
      { type: 'ul', items: [
        'Top coat — the outer surface. It controls gloss or matte appearance, stain resistance, hydrophobic behavior and, on premium films, self-healing.',
        'Substrate — the thick, elastic core, usually thermoplastic polyurethane (TPU). It absorbs impact energy and stretches around curves.',
        'Adhesive — a pressure-sensitive adhesive that allows repositioning during installation, bonds firmly once cured and releases cleanly when removed correctly.',
        'Release liner — protects the adhesive until the moment of installation.',
      ] },
      { type: 'p', text: 'When a stone hits a protected panel, the elastic TPU layer deforms and spreads the energy instead of letting it crack the paint. Fine scratches in the top coat can flow back into shape with heat — that is the “self-healing” effect.' },
      { type: 'h2', text: 'What PPF protects against' },
      { type: 'ul', items: [
        'Stone chips and road debris on bumpers, hoods, mirrors and rocker panels',
        'Light scratches and swirl marks from washing, keys, bags and pets',
        'Chemical etching from bird droppings, bug splatter, tree sap and tar',
        'UV fading and oxidation of the paint underneath',
        'Road salt, sand and grime in harsh climates',
      ] },
      { type: 'callout', title: 'Good to know', text: 'PPF is not a substitute for careful driving — it will not stop damage from a collision or deep vandalism — but it dramatically reduces the everyday wear that makes a car look old.' },
      { type: 'h2', text: 'Coverage options' },
      { type: 'p', text: 'Most owners choose one of three levels of coverage. A partial front package covers the bumper, the leading part of the hood and fenders, and mirrors. A full front covers the whole hood, fenders and bumper. A full-body wrap protects every painted panel and offers the most seamless look.' },
      { type: 'h2', text: 'How long does PPF last?' },
      { type: 'p', text: 'A premium TPU film that is installed correctly and cared for properly typically lasts many years. Lifespan depends on climate, sun exposure, mileage and maintenance. WIKA PPF films carry a warranty of up to 10 years depending on grade and region.' },
      { type: 'h2', text: 'How to choose the right paint protection film' },
      { type: 'ul', items: [
        'Material — aliphatic TPU offers the best balance of clarity, flexibility, self-healing and yellowing resistance.',
        'Finish — choose clear gloss to keep the factory look, or matte to protect matte paint or create a satin style.',
        'Top coat — look for self-healing, hydrophobic and stain-resistant properties.',
        'Warranty — check the period, what is covered and what is excluded, in writing.',
        'Installer — even the best film needs a skilled, trained installer for an invisible result.',
      ] },
      { type: 'p', text: 'Explore the WIKA PPF range — Clear Gloss TPU, Satin Matte TPU and PCU Pro — to find the right protection for every vehicle and every finish.' },
    ],
  },
  {
    slug: 'tpu-vs-pcu-vs-pvc-ppf',
    title: 'TPU vs PCU vs PVC Paint Protection Film: Which Is Best?',
    metaTitle: 'TPU vs PCU vs PVC PPF — Material Comparison Guide',
    description:
      'Compare TPU, PCU and PVC paint protection film materials: clarity, self-healing, yellowing, flexibility, impact resistance and lifespan explained.',
    excerpt: 'A clear comparison of the materials behind paint protection film — and why it matters.',
    category: 'Materials',
    readMinutes: 5,
    image: 'tpu-film-production',
    date: '2026-11-02',
    keywords: ['TPU vs PVC PPF', 'TPU PPF', 'PCU PPF', 'PPF material'],
    body: [
      { type: 'p', text: 'Not all paint protection films are made the same. The base material decides how clear the film looks, how well it stretches, whether it self-heals, whether it yellows and how long it lasts. Here is how the three most common material families compare.' },
      { type: 'h2', text: 'TPU — thermoplastic polyurethane' },
      { type: 'p', text: 'TPU is the material of choice for premium PPF. It is highly elastic, optically clear and compatible with self-healing top coats. Aliphatic TPU grades are especially resistant to yellowing under UV light. TPU stretches around complex curves and absorbs impact energy well, which makes it the best all-round option for daily drivers and luxury vehicles alike.' },
      { type: 'h2', text: 'PCU — paint protection urethane' },
      { type: 'p', text: 'PCU films are urethane constructions focused on toughness. Their priority is high resistance to stone chips and debris, which makes them a strong option for the most exposed panels — front bumpers, leading edges, rocker panels — and for performance and racing vehicles that see high speeds or track use.' },
      { type: 'h2', text: 'PVC — polyvinyl chloride' },
      { type: 'p', text: 'PVC is the oldest and cheapest film technology. It is stiffer, less clear and does not self-heal. Plasticizers in PVC can migrate over time, which can cause the film to harden, crack and turn yellow. PVC is generally considered an entry-level option and is not used in WIKA films.' },
      { type: 'h2', text: 'Side-by-side comparison' },
      { type: 'table', head: ['Property', 'TPU', 'PCU', 'PVC'], rows: [
        ['Optical clarity', 'Excellent', 'Very good', 'Fair'],
        ['Self-healing', 'Yes (with top coat)', 'Yes (heat repair)', 'No'],
        ['Yellowing resistance', 'Excellent (aliphatic)', 'Very good', 'Poor'],
        ['Flexibility / conformability', 'Excellent', 'Good', 'Limited'],
        ['Stone-chip resistance', 'Very good', 'Excellent', 'Fair'],
        ['Typical use', 'Full body & daily drivers', 'High-impact & performance', 'Budget / short-term'],
      ] },
      { type: 'callout', title: 'Our recommendation', text: 'For most vehicles, a premium transparent TPU like WIKA Clear Gloss gives the best balance of looks and protection. Choose PCU Pro for high-impact zones and performance driving, and Satin Matte TPU for matte paint or a stealth look.' },
      { type: 'h2', text: 'It’s about the whole construction' },
      { type: 'p', text: 'Material name alone does not guarantee performance. Top-coat chemistry, adhesive quality, thickness consistency and manufacturing control all matter just as much. That is why WIKA PPF verifies raw materials, measures thickness and adhesion, and keeps retained samples for every production batch.' },
    ],
  },
  {
    slug: 'ppf-vs-ceramic-coating',
    title: 'PPF vs Ceramic Coating: Differences, Pros & Cons',
    metaTitle: 'PPF vs Ceramic Coating — Which Is Better for Your Car?',
    description:
      'Paint protection film vs ceramic coating: how they differ in protection, appearance, lifespan and cost — and why many owners combine both.',
    excerpt: 'Two popular ways to protect paint — what each one does, and why the best answer is often both.',
    category: 'Comparisons',
    readMinutes: 5,
    image: 'black-car-front-quarter',
    date: '2026-11-03',
    keywords: ['PPF vs ceramic coating', 'ceramic coating over PPF', 'paint protection'],
    body: [
      { type: 'p', text: 'Paint protection film and ceramic coating are often mentioned in the same breath, but they solve different problems. Understanding the difference helps you choose the right protection — or the right combination.' },
      { type: 'h2', text: 'What is ceramic coating?' },
      { type: 'p', text: 'A ceramic coating is a liquid polymer (often silica-based) that cures into an extremely thin, hard, glossy layer on top of the clear coat. It makes paint more hydrophobic, easier to clean and more resistant to chemical staining and UV. Because it is only microns thick, however, it offers very little protection against physical impacts.' },
      { type: 'h2', text: 'What is paint protection film?' },
      { type: 'p', text: 'PPF is a physical urethane layer, roughly 190–240 µm thick — many times thicker than a coating. It absorbs stone chips and scratches, and premium TPU films self-heal light marks with heat.' },
      { type: 'table', head: ['', 'Paint protection film', 'Ceramic coating'], rows: [
        ['Stone-chip protection', 'Excellent', 'Minimal'],
        ['Scratch resistance', 'High, self-healing', 'Light swirl resistance'],
        ['Hydrophobic / easy clean', 'Yes (with top coat)', 'Excellent'],
        ['Chemical & UV resistance', 'Excellent', 'Very good'],
        ['Thickness', '≈ 190 – 240 µm', '≈ 1 – 3 µm'],
        ['Typical lifespan', 'Many years', '1 – 5 years'],
      ] },
      { type: 'h2', text: 'Why many owners combine both' },
      { type: 'p', text: 'The most complete setup is PPF on impact-prone areas (or the whole car) with a film-safe ceramic coating on top. The film handles chips and scratches; the coating adds extra slickness, gloss and easier washing. Coatings should only be applied once the film has fully cured.' },
      { type: 'callout', title: 'Bottom line', text: 'If your main concern is stone chips and scratches, choose PPF. If you mainly want gloss and easy cleaning, a coating helps. For maximum protection, use both.' },
    ],
  },
  {
    slug: 'ppf-care-and-maintenance',
    title: 'How to Care for Paint Protection Film: Washing & Maintenance',
    metaTitle: 'PPF Care Guide — How to Wash a Car with PPF',
    description:
      'Keep your paint protection film looking new: curing time, safe washing, pressure-washer distance, self-healing tips and what products to avoid.',
    excerpt: 'Curing, washing, self-healing and the products to avoid — keep your film looking brand new.',
    category: 'Care',
    readMinutes: 4,
    image: 'ppf-quality-control-lab',
    date: '2026-11-04',
    keywords: ['PPF care', 'how to wash PPF', 'PPF maintenance', 'self-healing PPF'],
    body: [
      { type: 'p', text: 'Paint protection film is low-maintenance, but a few simple habits keep it clear, glossy and performing for its full lifespan.' },
      { type: 'h2', text: 'The first week: let it cure' },
      { type: 'p', text: 'After installation, small amounts of slip solution remain under the film. You may see slight haze or tiny water pockets — these normally evaporate within days. Avoid washing the vehicle for 48–72 hours (longer in cold or humid weather) and do not pick at the edges.' },
      { type: 'h2', text: 'Washing a car with PPF' },
      { type: 'ul', items: [
        'Hand wash with a pH-neutral car shampoo and clean microfiber mitts.',
        'Use the two-bucket method to keep grit away from the surface.',
        'Keep pressure-washer nozzles at least 30 cm from the film and never aim directly at edges.',
        'Dry with a soft microfiber towel or filtered air.',
        'Avoid abrasive polishes, cutting compounds and harsh solvents on the film.',
      ] },
      { type: 'h2', text: 'Using the self-healing effect' },
      { type: 'p', text: 'Light swirl marks and fine scratches in the top coat will recover with heat. Parking in direct sun is often enough; pouring warm water over the area or using gentle heat from a professional heat gun also works. Deep cuts that penetrate the film cannot heal.' },
      { type: 'h2', text: 'Remove contaminants quickly' },
      { type: 'p', text: 'Bird droppings, bug splatter, tree sap and fuel spills are acidic or solvent-based. The film resists them far better than bare paint, but cleaning them promptly keeps the top coat in perfect condition.' },
      { type: 'callout', title: 'Warranty tip', text: 'Keep your installation invoice and follow the care instructions provided by your installer — correct maintenance is usually a condition of warranty coverage.' },
    ],
  },
];
