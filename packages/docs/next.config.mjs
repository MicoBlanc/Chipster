import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  transpilePackages: ['@micoblanc/chipster'],
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mdx'],
    }
    return config
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts']
})