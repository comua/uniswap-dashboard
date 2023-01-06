export type Pool = {
  id: string
  name: string
  token0: Token
  token1: Token
  tvlUSD: number
  volumeUSD24: number
}

export type Token = {
  id: string
  name: string
  symbol: string
  volumeUSD: number
  totalValueLockedUSD: number
  percentChange: number
  tokenDayData: { priceUSD: number; date: number }
}

export type Transaction = {
  id: string
  type: TransactionType
  timestamp: string
  description: string
  totalValue: number
  amount0: number
  amount1: number
  token0: string
  token1: string
  account: string
}

export enum TransactionType {
  Burn = 'burn',
  Collect = 'collect',
  Flash = 'flash',
  Mint = 'mint',
  Swap = 'swap',
}
