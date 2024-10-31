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

export default withNextra({
  webpack: (config, { isServer }) => {
    // Always configure TypeScript/React processing for chipster
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [path.resolve(__dirname, '../chipster/src')],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['next/babel', {
                'preset-react': {
                  runtime: 'automatic',
                  importSource: 'react'
                }
              }]
            ]
          },
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, '../chipster/tsconfig.json')
          }
        }
      ]
    })

    // Handle aliases based on environment
    if (process.env.NODE_ENV === 'development') {
      config.resolve.alias['@micoblanc/chipster'] = path.resolve(__dirname, '../chipster/src')
    }

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false
      }
    }

    return config
  }
})