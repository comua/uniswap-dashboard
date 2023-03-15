/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'

import { GenericCoinIcon } from '../icons/GenericCoinIcon'

export const Icon = ({ src, alt }) => {
  const [imageNotFound, setImageNotFound] = useState(false)
  if (imageNotFound) {
    return <GenericCoinIcon size="1.6rem" />
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
