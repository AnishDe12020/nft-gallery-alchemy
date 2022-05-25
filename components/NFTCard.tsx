const NFTCard = ({ nft }: { nft: any }) => {
  return (
    <div className="flex w-1/4 flex-col bg-gray-900">
      <div className="rounded-md">
        <img
          className="h-128 w-full rounded-t-md object-cover"
          src={nft.media[0].gateway}
        ></img>
      </div>
      <div className="h-110 flex flex-col space-y-2 rounded-b-md px-2 py-3 ">
        <div className="">
          <h2 className="text-xl text-gray-100">{nft.title}</h2>
          <p className="break-all text-gray-400">Id: {nft.id.tokenId}</p>
          <p className="text-gray-400">{`${nft.contract.address}`}</p>
        </div>

        <div className="mt-2 flex-grow">
          <p className="text-gray-400">{nft.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NFTCard
