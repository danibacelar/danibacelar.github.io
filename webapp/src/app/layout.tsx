import type { Metadata } from "next";
// Fontes self-hospedadas via pacote npm (@fontsource), não via
// next/font/google: o build buscar essas fontes direto do Google na hora
// de compilar já falhou mais de uma vez por instabilidade de rede do
// runner do GitHub Actions — com @fontsource, os arquivos .woff2 já vêm
// dentro do pacote baixado pelo "npm ci", sem nenhuma rede extra na build.
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./fonts.css";
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
