import { dehydrate, QueryClient } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { FC } from 'react'

import { PageTransitionFM } from '../components/animation/PageTransitionFM'
import { queryPools } from '../components/data/usePools'
import { PoolTable } from '../components/pools/PoolTable'
import { PAGE_SIZE } from '../lib/constants'

const Home: FC = () => {
  const title = 'Pools'
  const description = 'All Pools'

  return (
    <PageTransitionFM
      className={`absolute flex w-[100svw] flex-col items-center justify-center bg-black px-24 text-white tablet:px-48`}
    >
      <NextSeo title={title} description={description} openGraph={{ title, description }} />
      <PoolTable />
    </PageTransitionFM>
  )
}

export async function getStaticProps() {
  const page = 0
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['pools', page],
    queryFn: () => queryPools({ page, size: PAGE_SIZE }),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
