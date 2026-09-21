"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logout, type Session } from "../lib/fakeAuth";

type Variant = "publico" | "login" | "aluno-picker" | "pais" | "aluno";

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
  const [, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    setSession(getSession());
  }, []);

  function handleLogout() {
    logout();
    setSession(null);
    router.push("/login");
  }

  if (variant === "aluno") {
    return (
      <nav className="nav">
        <div className="wrap">
          <a href="/" className="brand">
            Mrs. <span>Dani</span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="/aluno" className={active === "/aluno" ? "active" : ""}>
                Minhas Atividades
              </a>
            </li>
          </ul>
          <div className="nav-cta">
            <a href="/login/aluno" className="btn btn-ghost">
              Trocar perfil
            </a>
            <button className="nav-toggle" aria-label="Open menu" aria-expanded="false">
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  if (variant === "pais") {
    return (
      <nav className="nav">
        <div className="wrap">
          <a href="/" className="brand">
            Mrs. <span>Dani</span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="/jogos" className={active === "/jogos" ? "active" : ""}>
                Jogos
              </a>
            </li>
            <li>
              <a href="/pais" className={active === "/pais" ? "active" : ""}>
                Área dos Pais
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
            <button className="nav-toggle" aria-label="Open menu" aria-expanded="false">
              <MenuIcon />
            </button>
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
          <ul className="nav-links">
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
          <div className="nav-cta">
            <button className="nav-toggle" aria-label="Open menu" aria-expanded="false">
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  if (variant === "aluno-picker") {
    return (
      <nav className="nav">
        <div className="wrap">
          <a href="/" className="brand">
            Mrs. <span>Dani</span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="/login">Voltar ao login</a>
            </li>
          </ul>
          <div className="nav-cta">
            <button className="nav-toggle" aria-label="Open menu" aria-expanded="false">
              <MenuIcon />
            </button>
          </div>
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
        <ul className="nav-links">
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
          <a href="/login" className="btn btn-ghost">
            Entrar
          </a>
          <a href="/login?modo=criar" className="btn btn-primary">
            Criar conta
          </a>
          <button className="nav-toggle" aria-label="Open menu" aria-expanded="false">
            <MenuIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}
