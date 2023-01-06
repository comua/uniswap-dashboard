import React, { FC, PropsWithChildren } from 'react'

interface ICellProps {
  end?: boolean
  className?: string
}

export const Cell: FC<PropsWithChildren<ICellProps>> = ({
  children,
  end = false,
  className = '',
}) => {
  return <div className={`${end && 'flex justify-end'} ${className}`}>{children}</div>
}
