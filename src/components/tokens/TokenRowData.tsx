import { getAddress } from '@ethersproject/address'
import Image from 'next/image'
import React, { FC } from 'react'

import { COMPACT_NUMBER_FORMATTER, PAGE_SIZE } from '../../lib/constants'
import { Token } from '../../lib/types'
import { Cell } from '../table/Cell'
import { Icon } from '../table/Icon'

interface ITokenRowDataProps {
  token: Token
  index: number
  page: number
}

const getTokenImageSrc = ({ tokenAddress }) => {
  return `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`
}

export const TokenRowData: FC<ITokenRowDataProps> = ({ token, index, page }) => {
  const tokenAddress = getAddress(token.id)
  const tokenImageSrc = getTokenImageSrc({ tokenAddress })

  const fixedPercentChange = parseInt(token.percentChange.toFixed(2))
  const isNegativePercentChange = fixedPercentChange < 0
  const isPositivePercentChange = fixedPercentChange > 0
  const absolutePercentChange = Math.abs(fixedPercentChange)

  return (
    <>
      <Cell>{index + 1 + page * PAGE_SIZE}</Cell>
      <Cell>
        <span className="flex">
          <span className="flex items-center justify-center pr-4">
            <Icon src={tokenImageSrc} alt={token.symbol} />
          </span>
          <span>
            <span className="tablet:hidden">{token.symbol}</span>
            <span className="hidden tablet:block">
              <span>{token.name}</span> <span className="text-zinc-500">({token.symbol})</span>
            </span>
          </span>
        </span>
      </Cell>
      <Cell end>${COMPACT_NUMBER_FORMATTER.format(token.tokenDayData[0].priceUSD)}</Cell>
      <Cell
        end
        className={`${isPositivePercentChange && 'text-green-400'} ${
          isNegativePercentChange && 'text-red-400'
        } ${!isPositivePercentChange && !isNegativePercentChange && 'text-zinc-500'}`}
      >
        {COMPACT_NUMBER_FORMATTER.format(absolutePercentChange)}%
      </Cell>
      <Cell end>${COMPACT_NUMBER_FORMATTER.format(token.totalValueLockedUSD)}</Cell>
    </>
  )
}
