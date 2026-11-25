const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export default function VoltarInicio() {
  return (
    <div className="wrap" style={{ paddingTop: 20 }}>
      <a className="link-inline" href="/" style={{ gap: 8 }}>
        <ArrowLeftIcon />
        Voltar para a página inicial
      </a>
    </div>
  );
}
