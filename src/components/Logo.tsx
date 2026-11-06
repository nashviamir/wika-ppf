interface Props {
  className?: string;
  mono?: boolean;
}

/** WIKA PPF wordmark — italic WIKA with the signature red swoosh. */
export default function Logo({ className, mono }: Props) {
  const blue = mono ? 'currentColor' : '#1438D6';
  const ink = mono ? 'currentColor' : '#0A1330';
  const red = mono ? 'currentColor' : '#E8202E';
  return (
    <svg className={className} viewBox="0 0 170 44" role="img" aria-label="WIKA PPF">
      <path d="M22 12.5C44 1.5 78 -0.5 108 8.5C80 4.6 50 6 22 12.5Z" fill={red} />
      <g transform="skewX(-12)">
        <text
          x="16"
          y="40"
          textLength="104"
          lengthAdjust="spacingAndGlyphs"
          fontFamily="'Sora Variable', Sora, 'Arial Black', sans-serif"
          fontWeight="800"
          fontSize="31"
          fill={blue}
        >
          WIKA
        </text>
      </g>
      <rect x="118" y="19" width="50" height="22" rx="6" fill={ink} />
      <text
        x="143"
        y="34.5"
        textAnchor="middle"
        fontFamily="'Sora Variable', Sora, Arial, sans-serif"
        fontWeight="700"
        fontSize="12.5"
        letterSpacing="1.6"
        fill="#fff"
      >
        PPF
      </text>
    </svg>
  );
}
