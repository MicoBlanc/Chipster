import React from 'react'
import { DocsThemeConfig, useConfig, useTheme } from 'nextra-theme-docs'

const Logo = () => {
  const { resolvedTheme } = useTheme()
  const fillColor = resolvedTheme === 'dark' ? '#FFFFFF' : '#262626'
  const fillColorSecondary = resolvedTheme === 'dark' ? '#A0A0A0' : '#5A5A5A'

  return (
    <svg width="117" height="34" viewBox="0 0 117 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9062 30.3906C5.3125 30.3906 1.17188 25.9844 1.17188 18.7188V18.7031C1.17188 11.4375 5.32812 7.0625 11.9062 7.0625C17.375 7.0625 21.2969 10.5156 21.7344 15.2969L21.75 15.4375H17.1562L17.0938 15.1719C16.5625 12.6875 14.7188 11.0625 11.9062 11.0625C8.29688 11.0625 5.98438 13.9688 5.98438 18.6875V18.7031C5.98438 23.4531 8.29688 26.3906 11.9062 26.3906C14.625 26.3906 16.5312 24.8281 17.1406 22.1562L17.1719 22H21.7656L21.75 22.1719C21.3125 26.9688 17.3594 30.3906 11.9062 30.3906ZM23.1262 30V7.45312H27.6887V16.1406H27.7825C28.6419 14.0625 30.4075 12.9062 32.9231 12.9062C36.5481 12.9062 38.7981 15.4375 38.7981 19.4844V30H34.2356V20.4219C34.2356 18.0781 33.0794 16.6875 31.0012 16.6875C28.9856 16.6875 27.6887 18.2188 27.6887 20.4062V30H23.1262ZM42.8306 11.0938C41.4556 11.0938 40.3931 10.0156 40.3931 8.71875C40.3931 7.42188 41.4556 6.34375 42.8306 6.34375C44.2056 6.34375 45.2681 7.42188 45.2681 8.71875C45.2681 10.0156 44.2056 11.0938 42.8306 11.0938ZM40.5494 30V13.25H45.1119V30H40.5494ZM46.8944 35.4688V13.25H51.4569V16.1719H51.5662C52.4725 14.1406 54.3006 12.9062 56.6756 12.9062C60.9256 12.9062 63.5194 16.1562 63.5194 21.6094V21.625C63.5194 27.0625 60.9256 30.3438 56.7381 30.3438C54.3475 30.3438 52.4569 29.125 51.5506 27.1406H51.4569V35.4688H46.8944ZM55.1756 26.5625C57.4412 26.5625 58.8787 24.6719 58.8787 21.625V21.6094C58.8787 18.5469 57.4412 16.6875 55.1756 16.6875C52.9569 16.6875 51.4412 18.5938 51.4412 21.625V21.6406C51.4412 24.6562 52.9569 26.5625 55.1756 26.5625Z" fill={fillColor}/>
      <path d="M71.505 30.3438C66.8644 30.3438 64.2863 28.2031 63.9269 25.0312L63.9113 24.8906H68.3644L68.3956 25.0312C68.6925 26.3438 69.6769 27.1094 71.505 27.1094C73.2238 27.1094 74.2706 26.4375 74.2706 25.3594V25.3438C74.2706 24.4531 73.7081 23.9375 72.0675 23.5781L69.2238 22.9844C65.9738 22.2969 64.3331 20.6719 64.3331 18.1719V18.1562C64.3331 14.9688 67.0831 12.9062 71.3488 12.9062C75.8019 12.9062 78.2863 15.2656 78.3956 18.2031V18.3594H74.1925L74.1769 18.2344C74.0206 17.0312 73.0363 16.125 71.3488 16.125C69.7706 16.125 68.7863 16.8281 68.7863 17.9062V17.9219C68.7863 18.7812 69.3644 19.3438 71.0519 19.7031L73.8956 20.3125C77.3956 21.0469 78.8331 22.4219 78.8331 24.8906V24.9062C78.8331 28.1875 75.8175 30.3438 71.505 30.3438ZM86.4594 30.3438C82.7406 30.3438 80.9906 28.9062 80.9906 25.3125V16.6875H78.6625V13.25H80.9906V9.15625H85.6V13.25H88.6625V16.6875H85.6V24.8125C85.6 26.375 86.3031 26.9062 87.6781 26.9062C88.0844 26.9062 88.3812 26.8594 88.6625 26.8281V30.1719C88.1469 30.25 87.4125 30.3438 86.4594 30.3438ZM97.2731 30.3438C92.1481 30.3438 89.0387 27.0156 89.0387 21.6562V21.6406C89.0387 16.3125 92.1794 12.9062 97.0856 12.9062C101.992 12.9062 105.07 16.2344 105.07 21.2969V22.7031H93.5387C93.5856 25.375 95.0387 26.9375 97.3669 26.9375C99.2419 26.9375 100.382 25.9062 100.711 24.9688L100.742 24.875H104.929L104.882 25.0469C104.367 27.5156 102.054 30.3438 97.2731 30.3438ZM97.1637 16.3125C95.2887 16.3125 93.8825 17.5625 93.5856 19.8281H100.695C100.414 17.5156 99.0544 16.3125 97.1637 16.3125ZM106.149 30V13.25H110.712V16.1719H110.806C111.306 14.1094 112.665 12.9062 114.618 12.9062C115.118 12.9062 115.587 12.9844 115.931 13.0781V17.0938C115.556 16.9375 114.931 16.8438 114.274 16.8438C112.024 16.8438 110.712 18.1875 110.712 20.625V30H106.149Z" fill={fillColorSecondary}/>
    </svg>
  )
}

const config: DocsThemeConfig = {
  logo: Logo,
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
  }
}

export default config
