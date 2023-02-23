import React, { FC, PropsWithChildren } from 'react'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-64 mb-24 w-full text-14 tablet:mt-[8rem] tablet:w-auto">{children}</div>
}
