import React, { FC, useState } from 'react'

import { PAGE_SIZE } from '../../lib/constants'
import { usePools } from '../data/usePools'
import { Cell } from '../table/Cell'
import { Container } from '../table/Container'
import { Row } from '../table/Row'
import { SkeletonRow } from '../table/SkeletonRow'
import { Table } from '../table/Table'
import { Title } from '../table/Title'
import { PoolRowData } from './PoolRowData'

const POOL_HEADERS = ['Pool', 'TVL ↓', 'Volume 24H']

export const PoolTable: FC = () => {
  const [page, setPage] = useState<number>(0)

  const { data, error, refetch, isLoading, isError, isFetching } = usePools({
    page,
    size: PAGE_SIZE,
  })

  const rowClass = 'pool-grid'

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Container>
      <Title {...{ title: 'Pools', onRefetch: () => refetch() }} />
      <Table {...{ page, setPage }}>
        <Row isHeader className={rowClass}>
          <Cell>#</Cell>
          {POOL_HEADERS.map((header, index) => (
            <Cell key={header} end={index !== 0}>
              {header}
            </Cell>
          ))}
        </Row>
        {!isLoading && !isFetching
          ? data?.map((pool, index) => (
              <Row key={pool.id} className={rowClass}>
                <PoolRowData {...{ pool, index, page }} />
              </Row>
            ))
          : Array(PAGE_SIZE).fill(
              <SkeletonRow {...{ amount: POOL_HEADERS.length + 1, rowClass }} />
            )}
      </Table>
    </Container>
  )
}
