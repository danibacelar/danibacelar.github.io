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
  bronze: { anel: "#9C5F3C", anelEscuro: "#6B3E24", miolo: "#F1D3AC", texto: "#6B3E24", label: "#9C5F3C" },
  prata: { anel: "#305D60", anelEscuro: "#1F4345", miolo: "#E4EEEC", texto: "#1F4345", label: "#305D60" },
  ouro: { anel: "#E67B32", anelEscuro: "#C4661F", miolo: "#FCE9D9", texto: "#C4661F", label: "#C4661F" },
} as const;

// Folha de louro simples, desenhada apontando para "cima" (eixo -y a
// partir da origem) — é reaproveitada e só roda/translada por tier.
const FOLHA = "M0,0 Q5,-9 0,-19 Q-5,-9 0,0 Z";
// Brilho de 4 pontas, também reaproveitado.
const BRILHO = "M0,-6 L1.4,-1.4 L6,0 L1.4,1.4 L0,6 L-1.4,1.4 L-6,0 L-1.4,-1.4 Z";

function Louros({ cx, cy, r, cor }: { cx: number; cy: number; r: number; cor: string }) {
  const folhas = 6;
  const itens = [];
  for (let i = 0; i < folhas; i++) {
    // varre de ~125° a ~235° (arco inferior), espelhado nos dois lados
    const t = i / (folhas - 1);
    const ang = 55 + t * 70; // 55..125 graus a partir do topo, lado direito
    for (const lado of [1, -1]) {
      const angulo = (ang * Math.PI) / 180;
      const x = cx + lado * r * Math.sin(angulo);
      const y = cy + r * Math.cos(angulo);
      const rot = lado === 1 ? 90 - ang : -(90 - ang);
      itens.push(
        <path
          key={`${lado}-${i}`}
          d={FOLHA}
          fill={cor}
          transform={`translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${rot.toFixed(1)}) scale(${0.85 + t * 0.35})`}
        />
      );
    }
  }
  return <>{itens}</>;
}

function CordaTrançada({ cx, cy, r, cor }: { cx: number; cy: number; r: number; cor: string }) {
  const marcas = 40;
  const itens = [];
  for (let i = 0; i < marcas; i++) {
    const ang = (i / marcas) * 360;
    const rad = (ang * Math.PI) / 180;
    const x1 = cx + (r - 4) * Math.sin(rad);
    const y1 = cy - (r - 4) * Math.cos(rad);
    const x2 = cx + (r + 4) * Math.sin(rad);
    const y2 = cy - (r + 4) * Math.cos(rad);
    itens.push(
      <line
        key={i}
        x1={x1.toFixed(2)}
        y1={y1.toFixed(2)}
        x2={x2.toFixed(2)}
        y2={y2.toFixed(2)}
        stroke={cor}
        strokeWidth={i % 2 === 0 ? 2.4 : 1.2}
      />
    );
  }
  return <>{itens}</>;
}

function Brilhos({ pontos, cor }: { pontos: { x: number; y: number; s: number }[]; cor: string }) {
  return (
    <>
      {pontos.map((p, i) => (
        <path
          key={i}
          d={BRILHO}
          fill={cor}
          transform={`translate(${p.x},${p.y}) scale(${p.s})`}
        />
      ))}
    </>
  );
}

export default function CreditBadge({
  creditos,
  tier,
}: {
  creditos: number;
  tier: keyof typeof TIERS;
}) {
  const cores = TIERS[tier];
  const cx = 60;
  const cy = 62;

  return (
    <svg viewBox="0 0 120 140" width="96" height="112" role="img" aria-label={`${creditos} créditos`}>
      {tier === "bronze" && (
        <>
          <Louros cx={cx} cy={cy} r={50} cor={cores.anel} />
          <circle cx={cx} cy={cy} r={40} fill={cores.miolo} stroke={cores.anelEscuro} strokeWidth="2.5" />
          <circle cx={cx} cy={cy} r={35} fill="none" stroke={cores.anel} strokeWidth="1" strokeDasharray="1 4" />
          <polygon points={pontosEstrela(cx, cy - 36, 6, 2.6)} fill={cores.anel} />
        </>
      )}

      {tier === "prata" && (
        <>
          <CordaTrançada cx={cx} cy={cy} r={46} cor={cores.anel} />
          <circle cx={cx} cy={cy} r={40} fill={cores.miolo} stroke={cores.anelEscuro} strokeWidth="2" />
          <path
            d={`M${cx - 18},${cy - 42} Q${cx},${cy - 62} ${cx + 18},${cy - 42}`}
            fill="none"
            stroke={cores.anel}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy - 58} r="3.6" fill={cores.anel} />
          {[-9, 0, 9].map((dx) => (
            <polygon key={dx} points={pontosEstrela(cx + dx, cy - 27, 3.4, 1.4)} fill={cores.anel} />
          ))}
          <Brilhos
            cor={cores.anel}
            pontos={[
              { x: cx - 48, y: cy - 10, s: 1.3 },
              { x: cx + 49, y: cy + 6, s: 1 },
            ]}
          />
        </>
      )}

      {tier === "ouro" && (
        <>
          <polygon points={pontosOndulados(cx, cy, 54, 44, 16)} fill={cores.anel} />
          <circle cx={cx} cy={cy} r="40" fill={cores.miolo} stroke={cores.anelEscuro} strokeWidth="2" />
          <polygon points={pontosEstrela(cx, cy - 32, 6.5, 2.8)} fill={cores.anel} />
          <path
            d={`M${cx - 20},${cy + 46} L${cx - 20},${cy + 66} L${cx - 10},${cy + 58} L${cx},${cy + 68} L${cx + 10},${cy + 58} L${cx + 20},${cy + 66} L${cx + 20},${cy + 46} Z`}
            fill={cores.miolo}
            stroke={cores.anelEscuro}
            strokeWidth="1.5"
          />
          <Brilhos
            cor={cores.anel}
            pontos={[
              { x: cx - 50, y: cy - 14, s: 1.2 },
              { x: cx + 50, y: cy - 2, s: 1 },
            ]}
          />
        </>
      )}

      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight={600}
        fontSize="24"
        fill={cores.texto}
      >
        {creditos}
      </text>
      <text
        x={cx}
        y={cy + 21}
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontWeight={700}
        fontSize="8"
        letterSpacing="0.05em"
        fill={cores.label}
      >
        CRÉDITOS
      </text>
    </svg>
  );
}
