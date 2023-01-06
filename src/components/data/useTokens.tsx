import { useQuery } from '@tanstack/react-query'
import request, { gql } from 'graphql-request'

import { PAGE_SIZE } from '../../lib/constants'

const tokensQuery = gql`
  query getTokens($orderBy: String!, $first: Int, $cursor: Int) {
    tokens(orderBy: $orderBy, orderDirection: desc, first: $first, skip: $cursor) {
      id
      name
      symbol
      volumeUSD
      totalValueLockedUSD

      tokenDayData(first: 2, orderBy: date, orderDirection: desc) {
        priceUSD
        date
      }
    }
  }
`

export const queryTokens = async ({ page, size }) => {
  const response = await request(
    'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    tokensQuery,
    {
      orderBy: 'totalValueLockedUSD',
      first: size,
      cursor: page * size,
    }
  )

  return response.tokens.map((token) => {
    const todayPrice = token.tokenDayData[0].priceUSD
    const yesterdayPrice = token.tokenDayData[1].priceUSD

    const percentChange = ((todayPrice - yesterdayPrice) / yesterdayPrice) * 100

    return {
      ...token,
      percentChange,
    }
  })
}

export const useTokens = ({ page = 0, size = PAGE_SIZE }) => {
  const tokens = useQuery({
    queryKey: ['tokens', page],
    queryFn: () => queryTokens({ page, size }),
    keepPreviousData: true,
  })

  return tokens
}
