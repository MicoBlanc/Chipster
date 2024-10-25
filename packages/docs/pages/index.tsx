import HomePage from '@/components/HomePage'
import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'

export default function Index() {
  const { route } = useRouter()
  const { frontMatter } = useConfig()

  if (route !== '/') {
    return null
  }

  return (
    <div className="nx-px-6 nx-py-16 mx-auto">
      <HomePage />
    </div>
  )
}