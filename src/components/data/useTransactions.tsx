import { useQuery } from '@tanstack/react-query'
import request, { gql } from 'graphql-request'

import { PAGE_SIZE } from '../../lib/constants'
import { capitalize } from '../../lib/helpers'
import { TransactionType } from '../../lib/types'

const transactionsQuery = gql`
  query getTransactions($orderBy: String!, $first: Int, $cursor: Int) {
    transactions(orderBy: $orderBy, orderDirection: desc, first: $first, skip: $cursor) {
      id
      timestamp

      mints {
        id
        owner
        amount
        amount0
        amount1
        amountUSD
        timestamp

        token0 {
          symbol
        }

        token1 {
          symbol
        }
      }

      burns {
        id
        owner
        amount0
        amount1
        amountUSD
        timestamp

        token0 {
          symbol
        }

        token1 {
          symbol
        }
      }

      swaps {
        id
        sender
        recipient
        amount0
        amount1
        amountUSD
        timestamp

        token0 {
          symbol
        }

        token1 {
          symbol
        }
      }
    }
  }
`

const getTransactionData = ({ transaction, transactionType }) => {
  return {
    id: transaction.id,
    type: transactionType,
    timestamp: transaction.timestamp,
    description: `${capitalize(transactionType)} ${transaction.token0.symbol} and ${
      transaction.token1.symbol
    }`,
    totalValue: transaction.amountUSD,
    amount0: transaction.amount0,
    amount1: transaction.amount1,
    token0: transaction.token0.symbol,
    token1: transaction.token1.symbol,
    account: transactionType === TransactionType.Swap ? transaction.recipient : transaction.owner,
  }
}

export const queryTransactions = async ({ page, size }) => {
  const response = await request(
    'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    transactionsQuery,
    {
      orderBy: 'timestamp',
      first: size,
      cursor: page * size,
    }
  )

  const transactionData = []
  response.transactions.forEach((transaction) => {
    transaction.burns.forEach((burn) => {
      transactionData.push(
        getTransactionData({ transaction: burn, transactionType: TransactionType.Burn })
      )
    })

    transaction.mints.forEach((mint) => {
      transactionData.push(
        getTransactionData({ transaction: mint, transactionType: TransactionType.Mint })
      )
    })

    transaction.swaps.forEach((swap) => {
      transactionData.push(
        getTransactionData({ transaction: swap, transactionType: TransactionType.Swap })
      )
    })
  })

  return transactionData
}

export const useTransactions = ({ page = 0, size = PAGE_SIZE }) => {
  const tokens = useQuery({
    queryKey: ['transactions', page],
    queryFn: () => queryTransactions({ page, size }),
    keepPreviousData: true,
  })

  return tokens
}
