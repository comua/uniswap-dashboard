import React, { FC, useState } from 'react'

import { PAGE_SIZE, QUERY_SIZE } from '../../lib/constants'
import { useTokens } from '../data/useTokens'
import { Cell } from '../table/Cell'
import { Container } from '../table/Container'
import { Row } from '../table/Row'
import { SkeletonRow } from '../table/SkeletonRow'
import { Table } from '../table/Table'
import { Title } from '../table/Title'
import { TokenRowData } from './TokenRowData'

const TOKEN_HEADERS = ['Token', 'Price', 'Price Change', 'TVL ↓']

export const TokenTable: FC = () => {
  const [page, setPage] = useState<number>(0)

  const { data, refetch, dataUpdatedAt, isLoading, isError, isFetching } = useTokens({
    size: QUERY_SIZE,
  })

  const rowClass = 'token-grid'

  if (isError) {
    return <div>Error: Failed to fetch tokens.</div>
  }

  return (
    <Container>
      <Title {...{ title: 'Top Tokens', onRefetch: () => refetch(), dataUpdatedAt }} />
      <Table {...{ page, setPage, lastPage: Math.ceil(data?.length / PAGE_SIZE) }}>
        <Row isHeader className={rowClass}>
          <Cell>#</Cell>
          {TOKEN_HEADERS.map((header, index) => (
            <Cell key={header} end={index !== 0}>
              {header}
            </Cell>
          ))}
        </Row>
        {!isLoading && !isFetching
          ? data?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map((token, index) => (
              <Row key={token.id} className={rowClass}>
                <TokenRowData {...{ token, headers: TOKEN_HEADERS.length, index, page }} />
              </Row>
            ))
          : Array(PAGE_SIZE).fill(
              <SkeletonRow {...{ amount: TOKEN_HEADERS.length + 1, rowClass }} />
            )}
      </Table>
    </Container>
  )
}
