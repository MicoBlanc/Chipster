import Head from 'next/head'
import { useState } from 'react'


export default function Home() {
  const [items, setItems] = useState<string[]>([])

  return (
    <>
      <Head>
        <title>Chipster Showcase</title>
        <meta name="description" content="Showcase for the Chipster component" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Chipster Component Showcase</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Basic Chipster</h2>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Current items:</h3>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(items, null, 2)}</pre>
          </div>
        </section>
      </main>
    </>
  )
}
