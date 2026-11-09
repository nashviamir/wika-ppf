/**
 * Technical data sheets, transcribed from the manufacturer's test documents.
 * Values are reference values; actual data per batch is given in the COA test report.
 */

export interface DataRow {
  item: string;
  unit?: string;
  /** one value per entry in `columns` */
  values: string[];
  method?: string;
  note?: string;
}

export interface DataSheet {
  product: string; // product slug
  title: string;
  subtitle: string;
  columns: string[];
  groups: { title: string; rows: DataRow[] }[];
  notes: string[];
}

export const datasheets: DataSheet[] = [
  {
    product: 'transparent-tpu-ppf',
    title: 'WIKA Clear Gloss — technical data sheet',
    subtitle: 'Covestro high-transparency TPU paint protection film',
    columns: ['Clear Gloss'],
    groups: [
      {
        title: 'Appearance performance',
        rows: [
          { item: 'Liner bubbles', values: ['Visually invisible'], method: 'Visual test' },
          { item: 'Dust', values: ['Visually invisible'], method: 'Visual test' },
          { item: 'Crystal points 0.1 – 0.6 mm', values: ['Allowed'], method: 'Visual test' },
          { item: 'Crystal points 0.7 – 2.9 mm', values: ['< 10'], method: 'Visual test' },
          { item: 'Crystal points ≥ 3.0 mm', values: ['Max. 1'], method: 'Visual test' },
          { item: 'Coating strips', values: ['Visually invisible'], method: 'Visual test' },
          { item: 'Glue line', values: ['Visually invisible'], method: 'Visual test' },
        ],
      },
      {
        title: 'Physical performance',
        rows: [
          { item: 'Gloss (60°)', unit: '%', values: ['≥ 93'], method: 'GB 8807' },
          { item: 'Weight (finished)', unit: 'g/m²', values: ['390 – 440'], method: 'GB/T 4669' },
          { item: 'Weight (adhesive)', unit: 'g/m²', values: ['25 – 30'], method: 'GB/T 4669' },
          { item: 'Product thickness', unit: 'µm', values: ['232 ± 15'], method: 'GB/T 7125' },
          { item: 'Protective film thickness', unit: 'µm', values: ['54 ± 5'], method: 'GB/T 7125' },
          { item: 'Coating thickness', unit: 'µm', values: ['10 ± 5'], method: 'GB/T 7125' },
          { item: 'Urethane (base film) thickness', unit: 'µm', values: ['208 ± 5'], method: 'GB/T 7125' },
          { item: 'Adhesive thickness', unit: 'µm', values: ['26 ± 5'], method: 'GB/T 7125' },
          { item: 'Liner thickness', unit: 'µm', values: ['75 ± 5'], method: 'GB/T 7125' },
          { item: 'Tensile strength', unit: 'kg/cm', values: ['≥ 320'], method: 'GB/T 1040.1' },
          { item: 'Peel strength', unit: 'N/m', values: ['≥ 275'], method: 'GB/T 1040.1' },
          { item: 'Elongation at break', unit: '%', values: ['≥ 376'], method: 'GB/T 1040.1' },
        ],
      },
    ],
    notes: [
      'Coating strips: after removing the protective film, the sample surface is checked with natural vision.',
      'Crystal points: the densest area of the sample is used as the measuring area, counted over 12.7 cm × 12.7 cm.',
    ],
  },
  {
    product: 'pcu-ppf',
    title: 'WIKA PCU Pro — technical data sheet',
    subtitle: 'Transparent PCU (polyurethane) paint protection film · 1 mil = 25.4 µm',
    columns: ['7.5 mil', '8.5 mil'],
    groups: [
      {
        title: 'Performance',
        rows: [
          { item: 'Base thickness', unit: 'mil / µm', values: ['7.5 / 190.5', '8.5 / 215.9'], method: 'ASTM D374', note: 'Nominal' },
          { item: 'Light transmittance', unit: '%', values: ['≥ 92', '≥ 92'], method: 'ASTM D1003', note: 'Clear film' },
          { item: 'Haze', unit: '%', values: ['≤ 1.5', '≤ 1.5'], method: 'ASTM D1003', note: 'Clarity' },
          { item: 'Gloss (60°)', unit: 'GU', values: ['≥ 95', '≥ 95'], method: 'ASTM D523', note: 'High gloss' },
          { item: 'Tensile strength', unit: 'MPa', values: ['≥ 45', '≥ 45'], method: 'ASTM D882', note: 'MD / TD' },
          { item: 'Elongation at break', unit: '%', values: ['≥ 400', '≥ 400'], method: 'ASTM D882', note: 'Flexible' },
          { item: 'Tear strength', unit: 'N/mm', values: ['≥ 90', '≥ 95'], method: 'ASTM D1004', note: 'Anti-tear' },
          { item: 'Pencil hardness', values: ['≥ 2H', '≥ 2H'], method: 'ASTM D3363', note: 'Scratch resistance' },
          { item: 'Surface self-healing', values: ['Heat repair', 'Heat repair'], note: 'Heat-activated' },
          { item: 'Adhesion (cross-hatch)', unit: 'Grade', values: ['5B', '5B'], method: 'ASTM D3359', note: 'To clear coat' },
          { item: 'Abrasion resistance (Taber)', unit: 'cycles', values: ['≥ 2000', '≥ 2000'], method: 'ASTM D4060', note: '500 g / CS-10' },
          { item: 'UV aging resistance', values: ['Pass', 'Pass'], method: 'QUV 3000 h', note: 'No yellowing' },
          { item: 'Weatherability', values: ['Pass', 'Pass'], method: 'ASTM G154', note: 'Outdoor durable' },
          { item: 'Yellowing resistance (Δb)', values: ['≤ 2', '≤ 2'], method: '3-year test', note: 'Long-term stable' },
          { item: 'Temperature range', unit: '°C', values: ['−30 to 80', '−30 to 80'], note: 'Install / use' },
          { item: 'UV blocking', unit: '%', values: ['≥ 99', '≥ 99'], note: 'Paint protection' },
          { item: 'IR blocking', unit: '%', values: ['≥ 60', '≥ 60'], note: 'Heat insulation' },
          { item: 'Stretch recovery', values: ['Excellent', 'Excellent'], note: 'Install memory' },
          { item: 'Warranty', unit: 'years', values: ['5', '7'], method: 'Factory warranty' },
        ],
      },
    ],
    notes: ['Values are general reference values for transparent PCU film. Actual data is given in the per-batch COA test report.'],
  },
];

export const datasheetFor = (slug: string) => datasheets.find((d) => d.product === slug);

/** Headline test results shown in the "Tested performance" section. */
export const keyMetrics = [
  { value: '≥ 92%', label: 'Light transmittance', method: 'ASTM D1003' },
  { value: '≥ 95 GU', label: 'Gloss at 60°', method: 'ASTM D523' },
  { value: '≥ 400%', label: 'Elongation at break', method: 'ASTM D882' },
  { value: '≥ 2H', label: 'Pencil hardness', method: 'ASTM D3363' },
  { value: '5B', label: 'Cross-hatch adhesion', method: 'ASTM D3359' },
  { value: '2,000+', label: 'Taber abrasion cycles', method: 'ASTM D4060' },
  { value: '3,000 h', label: 'QUV aging, no yellowing', method: 'QUV test' },
  { value: '≥ 99%', label: 'UV blocking', method: 'Paint protection' },
];
