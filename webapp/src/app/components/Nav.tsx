"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logout, type Session } from "../lib/fakeAuth";

const links = [
  { href: "/painel", label: "Painel" },
  { href: "/jogos", label: "Todos os jogos" },
  { href: "/meus-jogos", label: "Meus jogos" },
  { href: "/creditos", label: "Créditos" },
];

export default function Nav({ active }: { active?: string }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    setSession(getSession());
  }, []);

  function handleLogout() {
    logout();
    setSession(null);
    router.push("/login");
  }

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
          {session === undefined ? null : session ? (
            <>
              <span style={{ fontSize: "0.85rem", color: "var(--ink-soft)" }}>
                {session.nome} · {session.creditos} créditos
              </span>
              <button className="btn btn-ghost" type="button" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <a href="/login" className={`btn btn-primary${active === "/login" ? " active" : ""}`}>
              Entrar
            </a>
          )}
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
