"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logout, type Session } from "../lib/auth";

type Variant = "publico" | "login" | "logado";

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const LINKS_PUBLICO = [
  { href: "/jogos", label: "Jogos" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/sobre", label: "Sobre" },
];

export default function Nav({
  variant = "publico",
  active,
}: {
  variant?: Variant;
  active?: string;
}) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    getSession().then(setSession);
  }, []);

  async function handleLogout() {
    await logout();
    setSession(null);
    router.push("/login");
  }

  const classeLinks = menuAberto ? "nav-links open" : "nav-links";
  const toggle = (
    <button
      className="nav-toggle"
      type="button"
      aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
      aria-expanded={menuAberto}
      onClick={() => setMenuAberto((aberto) => !aberto)}
    >
      <MenuIcon />
    </button>
  );

  if (variant === "logado") {
    return (
      <nav className="nav">
        <div className="wrap">
          <a href="/" className="brand">
            Mrs. <span>Dani</span>
          </a>
          <ul className={classeLinks}>
            <li>
              <a href="/jogos" className={active === "/jogos" ? "active" : ""}>
                Jogos
              </a>
            </li>
            <li>
              <a href="/pais" className={active === "/pais" ? "active" : ""}>
                Meus jogos
              </a>
            </li>
            <li>
              <a href="/creditos" className={active === "/creditos" ? "active" : ""}>
                Créditos
              </a>
            </li>
          </ul>
          <div className="nav-cta">
            <button className="btn btn-ghost" type="button" onClick={handleLogout}>
              Sair
            </button>
            {toggle}
          </div>
        </div>
      </nav>
    );
  }

  if (variant === "login") {
    return (
      <nav className="nav">
        <div className="wrap">
          <a href="/" className="brand">
            Mrs. <span>Dani</span>
          </a>
          <ul className={classeLinks}>
            <li>
              <a href="/jogos">Jogos</a>
            </li>
            <li>
              <a href="/#como-funciona">Como funciona</a>
            </li>
            <li>
              <a href="/sobre">Sobre</a>
            </li>
            <li>
              <a href="/login" className="active">
                Entrar
              </a>
            </li>
          </ul>
          <div className="nav-cta">{toggle}</div>
        </div>
      </nav>
    );
  }

  // público (home, jogos, detalhe do jogo, sobre, school-support)
  return (
    <nav className="nav">
      <div className="wrap">
        <a href="/" className="brand">
          Mrs. <span>Dani</span>
        </a>
        <ul className={classeLinks}>
          {LINKS_PUBLICO.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={active === link.href ? "active" : ""}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <div className="lang-toggle">
            <button className="active">PT</button>
            <button>EN</button>
          </div>
          {session ? (
            <>
              <a href="/pais" className="btn btn-ghost">
                Meus jogos
              </a>
              <button className="btn btn-primary" type="button" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="btn btn-ghost">
                Entrar
              </a>
              <a href="/login?modo=criar" className="btn btn-primary">
                Criar conta
              </a>
            </>
          )}
          {toggle}
        </div>
      </div>
    </nav>
  );
}
