import React from 'react'
import { DocsThemeConfig, useConfig, useTheme } from 'nextra-theme-docs'
import Image from 'next/image'

const Logo = () => {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR, render light theme as default
  if (!mounted) {
    return <Image src="/chipster-logo-light.svg" alt="Chipster" width={117} height={34} />
  }

  // After mounting, render the appropriate logo
  return (
    <Image 
      src={resolvedTheme === 'dark' ? '/chipster-logo-dark.svg' : '/chipster-logo-light.svg'} 
      alt="Chipster" 
      width={117} 
      height={34}
    />
  )
}

const config: DocsThemeConfig = {
  logo: Logo,
  faviconGlyph: "🚀",
  project: {
    link: 'https://github.com/micoblanc/chipster'
  },
  docsRepositoryBase: 'https://github.com/micoblanc/chipster/tree/main/packages/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Chipster'
    }
  },
  primaryHue: 210,
  primarySaturation: 100,
  footer: {
    text: '© 2024 Chipster by Micoblanc'
  },
  head: () => {
    const { frontMatter } = useConfig()
    return <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={frontMatter.title || 'Chipster'} />
      <meta property="og:description" content={frontMatter.description || 'Chipster Documentation'} />
    </>
  },
}

export default config
