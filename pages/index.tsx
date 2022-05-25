import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [collectionAddress, setCollectionAddress] = useState<string>('')
  const [nfts, setNfts] = useState<string[]>([])
  const [fetchForCollection, setFetchForCollection] = useState<boolean>(false)

  console.log(nfts)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex w-full flex-col items-center justify-center space-y-4">
        <input
          type="text"
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-2 text-gray-300 transition duration-200 hover:border-gray-600 disabled:opacity-60"
          disabled={fetchForCollection}
        />
        <input
          type="text"
          placeholder="Collection Address"
          value={collectionAddress}
          onChange={(e) => setCollectionAddress(e.target.value)}
          className="rounded-lg border-2 border-gray-700 bg-gray-900 px-4 py-2 text-gray-400 transition duration-200 hover:border-gray-600"
        />
        <label className="text-gray-400">
          <input
            type="checkbox"
            className="mr-2"
            onChange={(e) => {
              setFetchForCollection(e.target.checked)
            }}
          />
          <span>Fetch for collection</span>
        </label>
        <button
          className="mt-3 w-1/5 rounded-xl bg-blue-700 px-4 py-2 text-white transition duration-200 hover:opacity-60 disabled:bg-slate-600"
          onClick={async () => {
            if (fetchForCollection) {
              const nfts = await (
                await fetch(
                  `/api/fetch-nfts-for-collection?collectionAddress=${collectionAddress}`
                )
              ).json()

              setNfts(nfts)
            } else {
              const nfts = await (
                await fetch(
                  `/api/fetch-nfts?walletAddress=${walletAddress}&collectionAddress=${collectionAddress}`
                )
              ).json()

              setNfts(nfts)
            }
          }}
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default Home
