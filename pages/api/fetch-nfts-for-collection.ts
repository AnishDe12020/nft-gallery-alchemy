// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const collectionAddress = req.query.collectionAddress || ''

  if (!collectionAddress) {
    res.status(400).json({
      error: 'Missing required query params',
    })
    return
  }

  const apiKey = process.env.ALCHEMY_API_KEY
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection/`

  const requestOptions = {
    method: 'GET',
  }

  const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${'true'}`

  const nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())

  res.status(200).json(nfts)
}

export default handler
