import { useQuery } from '@tanstack/react-query'
import request, { gql } from 'graphql-request'

import { HIDDEN_POOLS } from '../../lib/constants'

const poolsQuery = gql`
  query getPools($orderBy: String!, $first: Int, $cursor: Int) {
    pools(orderBy: $orderBy, orderDirection: desc, first: $first, skip: $cursor) {
      id
      feeTier
      totalValueLockedUSD

      poolDayData(orderBy: date, orderDirection: desc, first: 1) {
        id
        date
        volumeUSD
      }

      token0 {
        id
        name
        symbol
      }
      token1 {
        id
        name
        symbol
      }
    }
  }
`

export const queryPools = async ({ page = 0, size }: { page: number; size: number }) => {
  const response = await request(
    'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    poolsQuery,
    {
      orderBy: 'totalValueLockedUSD',
      first: size,
      cursor: page * size,
    }
  )

  return response?.pools.map((pool) => {
    const token0 = pool.token0
    const token1 = pool.token1

    return {
      id: pool.id,
      name: `${token0.symbol}/${token1.symbol}`,
      token0: token0,
      token1: token1,
      tvlUSD: pool.totalValueLockedUSD,
      volumeUSD24: pool.poolDayData[0].volumeUSD || 0,
    }
  })
}

export const usePools = ({ page = 0, size = 10 }: { page?: number; size: number }) => {
  const pools = useQuery({
    queryKey: ['pools', page],
    queryFn: () => queryPools({ page, size }),
    keepPreviousData: true,
  })

  const filteredData = pools.data?.filter((pool) => !HIDDEN_POOLS.includes(pool.id))

  return { ...pools, data: filteredData }
}
