import React, { FC, MouseEventHandler } from 'react'

import { SyncButton } from '../SyncButton'

interface ITitleProps {
  title: string
  onRefetch: MouseEventHandler<HTMLButtonElement>
}

export const Title: FC<ITitleProps> = ({ title, onRefetch }) => {
  return (
    <div className="mb-16 flex items-center font-semibold">
      <span>{title}</span>
      {onRefetch && <SyncButton {...{ onClick: onRefetch }} />}
    </div>
  )
}
