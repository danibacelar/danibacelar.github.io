function pontosOndulados(
  cx: number,
  cy: number,
  rExterno: number,
  rInterno: number,
  pontas: number
): string {
  const pontos: string[] = [];
  const total = pontas * 2;
  for (let i = 0; i < total; i++) {
    const angulo = (Math.PI * 2 * i) / total - Math.PI / 2;
    const r = i % 2 === 0 ? rExterno : rInterno;
    pontos.push(`${(cx + r * Math.cos(angulo)).toFixed(2)},${(cy + r * Math.sin(angulo)).toFixed(2)}`);
  }
  return pontos.join(" ");
}

function pontosEstrela(cx: number, cy: number, rExterno: number, rInterno: number): string {
  return pontosOndulados(cx, cy, rExterno, rInterno, 5);
}

const TIERS = {
  bronze: { anel: "#9C5F3C", miolo: "#F1D3AC", texto: "#6B3E24", label: "#9C5F3C" },
  prata: { anel: "#305D60", miolo: "#E4EEEC", texto: "#1F4345", label: "#305D60" },
  ouro: { anel: "#E67B32", miolo: "#FCE9D9", texto: "#C4661F", label: "#C4661F" },
} as const;

export default function CreditBadge({
  creditos,
  tier,
}: {
  creditos: number;
  tier: keyof typeof TIERS;
}) {
  const cores = TIERS[tier];

  return (
    <svg viewBox="0 0 120 120" width="92" height="92" role="img" aria-label={`${creditos} créditos`}>
      <polygon points={pontosOndulados(60, 60, 56, 47, 14)} fill={cores.anel} />
      <circle cx="60" cy="60" r="42" fill={cores.miolo} stroke={cores.anel} strokeWidth="2" />
      <polygon points={pontosEstrela(60, 28, 7, 3)} fill={cores.anel} />
      <text
        x="60"
        y="65"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight={600}
        fontSize="26"
        fill={cores.texto}
      >
        {creditos}
      </text>
      <text
        x="60"
        y="82"
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontWeight={700}
        fontSize="9"
        letterSpacing="0.05em"
        fill={cores.label}
      >
        CRÉDITOS
      </text>
    </svg>
  );
}
