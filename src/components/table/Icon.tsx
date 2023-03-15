/* eslint-disable @next/next/no-img-element */
import React from 'react'

export const Icon = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={16}
      height={16}
      className="flex h-16 w-16 items-center justify-center rounded-full"
    />
  )
}
