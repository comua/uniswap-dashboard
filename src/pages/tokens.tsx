import { dehydrate, QueryClient } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { FC } from 'react'

import { PageTransition } from '../components/animation/PageTransition'
import { queryTokens } from '../components/data/useTokens'
import { TokenTable } from '../components/tokens/TokenTable'
import { QUERY_SIZE } from '../lib/constants'

const Tokens: FC = () => {
  const title = 'Tokens'
  const description = 'All Tokens'

  return (
    <PageTransition
      className={`absolute flex w-[100svw] flex-col items-center justify-center px-24 text-white tablet:px-48`}
    >
      <NextSeo title={title} description={description} openGraph={{ title, description }} />
      <TokenTable />
    </PageTransition>
  )
}

export async function getStaticProps() {
  const page = 0
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['tokens', page],
    queryFn: () => queryTokens({ size: QUERY_SIZE }),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Tokens
