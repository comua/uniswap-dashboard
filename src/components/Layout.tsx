import { FC, PropsWithChildren } from 'react'

import { SiteFooter } from './navigation/SiteFooter'
import { SiteHeader } from './navigation/SiteHeader'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <SiteHeader />
      <div id="main">{children}</div>
      <SiteFooter />
    </div>
  )
}
