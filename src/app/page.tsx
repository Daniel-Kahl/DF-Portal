import DFOSearch from '@/components/dfo_search'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DFOSearch></DFOSearch>
    </main>
  )
}
