import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  transpilePackages: ['@micoblanc/chipster'],
  webpack: (config, { isServer }) => {
    // Preserve the original resolve configuration
    config.resolve = {
      ...config.resolve,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mdx'],
    }
    return config
  }
})