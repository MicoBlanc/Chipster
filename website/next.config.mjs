import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    const chipsterPath = resolve(__dirname, '..');
    console.log('Chipster path:', chipsterPath);
    console.log('Chipster exists:', fs.existsSync(chipsterPath));
    console.log('Chipster contents:', fs.readdirSync(chipsterPath));
    config.resolve.alias['chipster'] = chipsterPath;
    return config;
  },
};

export default nextConfig;
