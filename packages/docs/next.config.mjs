import nextra from 'nextra'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const useLocalChipster = fs.existsSync(path.resolve(__dirname, '../chipster/src'))

export default withNextra({
  webpack: (config, { isServer }) => {
    if (useLocalChipster) {
      config.resolve.alias['chipster'] = path.resolve(__dirname, '../chipster/src')
      
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, '../chipster/src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['next/babel'],
            },
          },
        ],
      })
    }

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      }
    }

    return config
  }
})