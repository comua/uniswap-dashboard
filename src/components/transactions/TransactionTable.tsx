import React, { FC, useState } from 'react'

import { PAGE_SIZE, QUERY_SIZE } from '../../lib/constants'
import { useTransactions } from '../data/useTransactions'
import { Cell } from '../table/Cell'
import { Container } from '../table/Container'
import { Row } from '../table/Row'
import { SkeletonRow } from '../table/SkeletonRow'
import { Table } from '../table/Table'
import { Title } from '../table/Title'
import { TransactionRowData } from './TransactionRowData'

const TRANSACTION_HEADERS = [
  'Transaction',
  'Total Value',
  'Token Amount 1',
  'Token Amount 2',
  'Linked Account',
  'Time ↓',
]

export const TransactionTable: FC = () => {
  const [page, setPage] = useState<number>(0)

  const { data, refetch, isLoading, isError, isFetching } = useTransactions({
    size: QUERY_SIZE,
  })

  const rowClass = 'transaction-grid'

  if (isError) {
    return <div>Error: Failed to fetch Transactions.</div>
  }

  return (
    <Container>
      <Title {...{ title: 'Transactions', onRefetch: () => refetch() }} />
      <Table
        {...{
          page,
          setPage,
          lastPage: Math.ceil(data?.length / PAGE_SIZE),
        }}
      >
        <Row isHeader className={rowClass}>
          {TRANSACTION_HEADERS.map((header, index) => (
            <Cell key={header} end={index !== 0}>
              {header}
            </Cell>
          ))}
        </Row>
        {!isLoading && !isFetching
          ? data?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map((transaction, index) => (
              <Row key={transaction.id} className={rowClass}>
                <TransactionRowData
                  {...{ transaction, headers: TRANSACTION_HEADERS.length, index, page }}
                />
              </Row>
            ))
          : Array(PAGE_SIZE).fill(
              <SkeletonRow {...{ amount: TRANSACTION_HEADERS.length, rowClass }} />
            )}
      </Table>
    </Container>
  )
}
