import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import nextra from 'nextra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true
})

export default withNextra({
  // Your existing Next.js config
  webpack: (config, { isServer }) => {
    config.resolve.alias['chipster'] = resolve(__dirname, '../chipster/src');

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [resolve(__dirname, '../chipster/src')],
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
})
