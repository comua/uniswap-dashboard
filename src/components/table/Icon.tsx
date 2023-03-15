/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'

import { UnknownCoinIcon } from '../icons/UnknownCoinIcon'

export const Icon = ({ src, alt }) => {
  const [imageNotFound, setImageNotFound] = useState(false)
  if (imageNotFound) {
    return <UnknownCoinIcon size={16} />
  }

  return (
    <img
      src={src}
      alt={alt}
      width={16}
      height={16}
      className="flex h-16 w-16 items-center justify-center rounded-full"
      onError={() => setImageNotFound(true)}
    />
  )
}
