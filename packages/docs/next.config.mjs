import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  transpilePackages: ['@micoblanc/chipster'],
  webpack: (config, { isServer }) => {
    // Force case sensitivity
    config.resolve = {
      ...config.resolve,
      enforceExtensions: true,
      enforceModuleExtension: true,
      caseSensitive: true
    }
    return config
  }
})