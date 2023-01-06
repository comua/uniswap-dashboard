import { dehydrate, QueryClient } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { FC } from 'react'

import { queryTokens } from '../components/data/useTokens'
import { TokenTable } from '../components/tokens/TokenTable'
import { PAGE_SIZE } from '../lib/constants'

const Tokens: FC = () => {
  const title = 'Tokens'
  const description = 'All Tokens'

  return (
    <AnimatePresence>
      <div
        className={`relative flex w-[100svw] flex-col items-center justify-center bg-black px-24 text-white tablet:px-48`}
      >
        <NextSeo title={title} description={description} openGraph={{ title, description }} />
        <TokenTable />
      </div>
    </AnimatePresence>
  )
}

export async function getStaticProps() {
  const page = 0
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['tokens', page],
    queryFn: () => queryTokens({ page, size: PAGE_SIZE }),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Tokens
