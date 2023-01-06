import React, { FC, PropsWithChildren } from 'react'

interface IRowProps {
  className: string
  isHeader?: boolean
}

export const Row: FC<PropsWithChildren<IRowProps>> = ({
  children,
  className,
  isHeader = false,
}) => {
  return (
    <li
      className={`w-full border-b-sm border-b-zinc-800 py-16 ${
        isHeader && 'pt-0 font-semibold text-zinc-400'
      } ${className}`}
    >
      {children}
    </li>
  )
}
