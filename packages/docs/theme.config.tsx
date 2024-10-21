import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Chipster Docs</span>,
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
    text: '© 2024 Chipster'
  },
  head: () => {
    const { frontMatter } = useConfig()
    return <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={frontMatter.title || 'Chipster'} />
      <meta property="og:description" content={frontMatter.description || 'Chipster Documentation'} />
    </>
  }
}

export default config
