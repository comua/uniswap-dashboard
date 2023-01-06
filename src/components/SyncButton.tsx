import React, { FC, MouseEventHandler } from 'react'
import { GoSync } from 'react-icons/go'

interface ISyncButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const SyncButton: FC<ISyncButtonProps> = ({ onClick }) => {
  return (
    <button className="refresh-button ml-12" onClick={onClick}>
      <GoSync size="1.6rem" />
    </button>
  )
}
