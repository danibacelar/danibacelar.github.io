const links = [
  { href: "/painel", label: "Painel" },
  { href: "/jogos", label: "Todos os jogos" },
  { href: "/meus-jogos", label: "Meus jogos" },
  { href: "/creditos", label: "Créditos" },
  { href: "/login", label: "Entrar" },
];

export default function Nav({ active }: { active?: string }) {
  return (
    <nav className="nav">
      <div className="wrap">
        <a href="/" className="brand">
          Mrs. <span>Dani</span>
        </a>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={active === link.href ? "active" : ""}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <button className="nav-toggle" aria-label="Open menu" aria-expanded="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
