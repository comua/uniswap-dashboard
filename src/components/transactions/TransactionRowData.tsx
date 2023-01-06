import React, { FC, useEffect, useState } from 'react'

import { COMPACT_NUMBER_FORMATTER, PAGE_SIZE } from '../../lib/constants'
import { formatTime } from '../../lib/helpers'
import { Transaction } from '../../lib/types'
import { Cell } from '../table/Cell'

interface ITransactionRowDataProps {
  transaction: Transaction
  index: number
  page: number
}

export const TransactionRowData: FC<ITransactionRowDataProps> = ({ transaction, index, page }) => {
  const accountLength = transaction.account.length

  const [formattedTime, setFormattedTime] = useState<string>('')

  useEffect(() => {
    setFormattedTime(formatTime(transaction.timestamp))
  }, [])

  return (
    <>
      <Cell>{index + 1 + page * PAGE_SIZE}</Cell>
      <Cell>
        <a
          target="_blank"
          href={`https://etherscan.io/tx/${transaction.id}`}
          className="text-orange-400 transition-all duration-300 hover:text-orange-200"
          rel="noreferrer"
        >
          {transaction.description}
        </a>
      </Cell>
      <Cell end>${COMPACT_NUMBER_FORMATTER.format(transaction.totalValue)}</Cell>
      <Cell end>{`${COMPACT_NUMBER_FORMATTER.format(Math.abs(transaction.amount0))}`}</Cell>
      <Cell end>{COMPACT_NUMBER_FORMATTER.format(Math.abs(transaction.amount1))}</Cell>
      <Cell end>
        <a
          target="_blank"
          href={`https://etherscan.io/address/${transaction.account}`}
          className="text-orange-400 transition-all duration-300 hover:text-orange-200"
          rel="noreferrer"
        >{`${transaction.account.slice(0, 6)}...${transaction.account.slice(
          accountLength - 4,
          accountLength
        )}`}</a>
      </Cell>
      <Cell end>{formattedTime}</Cell>
    </>
  )
}
