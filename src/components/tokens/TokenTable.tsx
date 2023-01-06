import React, { FC, useState } from 'react'

import { PAGE_SIZE } from '../../lib/constants'
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

  const { data, error, refetch, isLoading, isError, isFetching } = useTokens({
    page,
    size: PAGE_SIZE,
  })

  const rowClass = 'token-grid'

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Container>
      <Title {...{ title: 'Tokens', onRefetch: () => refetch() }} />
      <Table {...{ page, setPage, headers: TOKEN_HEADERS }}>
        <Row isHeader className={rowClass}>
          <Cell>#</Cell>
          {TOKEN_HEADERS.map((header, index) => (
            <Cell key={header} end={index !== 0}>
              {header}
            </Cell>
          ))}
        </Row>
        {!isLoading && !isFetching
          ? data?.map((token, index) => (
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
