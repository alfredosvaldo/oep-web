/** @type {import('next').NextConfig} */
// GitHub Pages sirve el sitio bajo /oep-web/: GHPAGES=1 activa el prefijo
// (assets y fetch estáticos vía NEXT_PUBLIC_BASE_PATH, que queda '' en local).
// GHPAGES=v2 publica el rediseño bajo /oep-web/v2/ (v1 sigue en la raíz).
const isGhPages = process.env.GHPAGES === '1' || process.env.GHPAGES === 'v2';
const basePath = process.env.GHPAGES === 'v2' ? '/oep-web/v2' : isGhPages ? '/oep-web' : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
