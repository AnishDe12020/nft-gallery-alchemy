// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const walletAddress = req.query.walletAddress || ''
  const collectionAddress = req.query.collectionAddress || ''

  if (!walletAddress && !collectionAddress) {
    res.status(400).json({
      error: 'Missing required query params',
    })
    return
  }

  let nfts
  const apiKey = process.env.ALCHEMY_API_KEY
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`

  const requestOptions = {
    method: 'GET',
  }

  if (!collectionAddress.length) {
    const fetchURL = `${baseURL}?owner=${walletAddress}`
    nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
  } else {
    const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`
    nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
  }

  res.status(200).json(nfts)
}

export default handler
