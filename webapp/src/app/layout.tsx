import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mrs. Dani — Jogos (novo site)",
  description: "Nova versão do site, com login e créditos de verdade.",
};

const navLinks = [
  { href: "/", label: "Jogos" },
  { href: "/creditos", label: "Créditos" },
  { href: "/login", label: "Entrar" },
  { href: "/admin", label: "Admin" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="site-nav">
          <div className="wrap nav-inner">
            <a href="/" className="brand">
              Mrs. <span>Dani</span>
            </a>
            <nav>
              <ul className="nav-links">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <p>© 2026 Mrs. Dani — versão em construção, ainda não é o site real.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
