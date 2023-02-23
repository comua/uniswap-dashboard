import React, { FC, MouseEventHandler } from 'react'

import { SyncButton } from '../SyncButton'

interface ITitleProps {
  title: string
  onRefetch: MouseEventHandler<HTMLButtonElement>
  dataUpdatedAt?: number
}

export const Title: FC<ITitleProps> = ({ title, onRefetch, dataUpdatedAt }) => {
  return (
    <div className="mb-16 flex items-center font-semibold">
      <span>{title}</span>
      {onRefetch && (
        <span className="ml-12">
          <SyncButton {...{ onClick: onRefetch, dataUpdatedAt }} />
        </span>
      )}
    </div>
  )
}
