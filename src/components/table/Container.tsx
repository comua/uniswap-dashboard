import React, { FC, PropsWithChildren } from 'react'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-[8rem] mb-24 text-14">{children}</div>
}
