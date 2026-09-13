import type { Metadata } from "next";
import "./site-style.css";
import "./site-components.css";

export const metadata: Metadata = {
  title: "Mrs. Dani — Jogos (novo site)",
  description: "Nova versão do site, com login e créditos de verdade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
