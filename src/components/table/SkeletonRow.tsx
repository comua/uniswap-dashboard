import React, { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

import { Row } from './Row'

interface ISkeletonRowProps {
  amount: number
  rowClass: string
}

export const SkeletonRow: FC<ISkeletonRowProps> = ({ amount, rowClass }) => {
  return (
    <Row className={rowClass}>{Array(amount).fill(<Skeleton baseColor="#000" duration={1} />)}</Row>
  )
}
