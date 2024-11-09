import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  output: 'standalone',
  transpilePackages: ['@micoblanc/chipster'],
  images: {
    unoptimized: true
  },
  experimental: {
    optimizeCss: false
  }
})