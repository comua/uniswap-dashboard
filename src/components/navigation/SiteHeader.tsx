import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

import { UniswapLogoIcon } from '../icons/UniswapLogoIcon'

const NAV_MAP = [
  { label: 'Pools', path: '/' },
  { label: 'Tokens', path: '/tokens' },
  { label: 'Transactions', path: '/transactions' },
]

export const SiteHeader: FC = () => {
  const router = useRouter()

  const getClasses = (path) => {
    return twMerge(
      'mr-16 tablet:mr-24 last:mr-0 opacity-50 hover:opacity-100 transition-opacity duration-200 focus:opacity-100',
      path === router.asPath && 'opacity-100'
    )
  }

  return (
    <header
      className="fixed z-50 flex w-full items-center justify-between
    bg-zinc-900 py-16 px-24 text-14 transition-colors duration-1000 ease-in-out-expo"
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <div className="-mt-4 mr-8">
            <UniswapLogoIcon />
          </div>
          <div className="hidden tablet:inline">Uniswap Dashboard</div>
        </Link>
      </div>
      <div className="">
        <nav>
          <ul className="flex">
            {NAV_MAP.map((navItem) => {
              return (
                <li key={navItem.path} className={getClasses(navItem.path)}>
                  <Link href={navItem.path} shallow>
                    {navItem.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
