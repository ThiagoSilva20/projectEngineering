import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "estaticos.animaeducacao.com.br",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.cimentoitambe.com.br",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tse3.mm.bing.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tse1.mm.bing.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cpzdarmrpsabpzwejzpw.supabase.co",
        pathname: "/**",
      },
    ],
  },
  /* outras opções de configuração aqui, se houver */
};

export default nextConfig;