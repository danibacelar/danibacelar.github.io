import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Configuração mínima: sem cache incremental em R2 nem otimização de
// imagens (não usamos next/image), para não exigir nenhum recurso extra
// na conta da Cloudflare antes do primeiro deploy de teste.
export default defineCloudflareConfig();
