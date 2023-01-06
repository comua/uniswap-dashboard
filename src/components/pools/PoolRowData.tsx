import { getAddress } from '@ethersproject/address'
import Image from 'next/image'
import React, { FC } from 'react'

import { COMPACT_NUMBER_FORMATTER, PAGE_SIZE } from '../../lib/constants'
import { Pool } from '../../lib/types'
import { Cell } from '../table/Cell'

interface IPoolRowData {
  pool: Pool
  index: number
  page: number
}

const getTokenImageSrc = ({ tokenAddress }) => {
  return `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`
}

export const PoolRowData: FC<IPoolRowData> = ({ pool, index, page }) => {
  const token0Address = getAddress(pool.token0.id)
  const token1Address = getAddress(pool.token1.id)
  const token0ImageSrc = getTokenImageSrc({ tokenAddress: token0Address })
  const token1ImageSrc = getTokenImageSrc({ tokenAddress: token1Address })

  return (
    <>
      <Cell>{index + 1 + page * PAGE_SIZE}</Cell>
      <Cell>
        <span className="flex">
          <span className="flex items-center justify-center pr-4">
            <Image
              src={token0ImageSrc}
              alt={pool.token0.symbol}
              width={16}
              height={16}
              className="flex h-16 w-16 items-center justify-center rounded-full"
            />
            <Image
              src={token1ImageSrc}
              alt={pool.token1.symbol}
              width={16}
              height={16}
              className="flex h-16 w-16 items-center justify-center rounded-full"
            />
          </span>
          {pool.name}
        </span>
      </Cell>
      <Cell end>${COMPACT_NUMBER_FORMATTER.format(pool.tvlUSD)}</Cell>
      <Cell end>${COMPACT_NUMBER_FORMATTER.format(pool.volumeUSD24)}</Cell>
    </>
  )
}
