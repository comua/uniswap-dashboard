import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import { GoSync } from 'react-icons/go'

import { formatTime } from '../lib/helpers'

interface ISyncButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  dataUpdatedAt?: number
}

const SYNCED_VALUE = 'Synced'

export const SyncButton: FC<ISyncButtonProps> = ({ onClick, dataUpdatedAt }) => {
  const [formattedSyncTime, setFormattedSyncTime] = useState(SYNCED_VALUE)

  useEffect(() => {
    setInterval(
      () => setFormattedSyncTime(`Synced ${formatTime(`${dataUpdatedAt / 1000}`)}`),
      60000
    )
  }, [])

  return (
    <button className="refresh-button flex items-center" onClick={onClick}>
      <GoSync size="1.6rem" />
      {dataUpdatedAt && (
        <span
          className={`ml-4 rounded-sm text-[1rem] font-normal transition-all duration-300 ${
            formattedSyncTime === SYNCED_VALUE
              ? 'text-green-600 hover:text-green-200'
              : 'text-zinc-400'
          }`}
        >
          {formattedSyncTime}
        </span>
      )}
    </button>
  )
}
