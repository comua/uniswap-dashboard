import { dehydrate, QueryClient } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { FC } from 'react'

import { PageTransition } from '../components/animation/PageTransition'
import { queryTransactions } from '../components/data/useTransactions'
import { TransactionTable } from '../components/transactions/TransactionTable'
import { QUERY_SIZE } from '../lib/constants'

const Transactions: FC = () => {
  const title = 'Transactions'
  const description = 'All Transactions'

  return (
    <PageTransition
      className={`absolute flex w-[100svw] flex-col items-center justify-center px-24 text-white tablet:px-48`}
    >
      <NextSeo title={title} description={description} openGraph={{ title, description }} />
      <TransactionTable />
    </PageTransition>
  )
}

export async function getStaticProps() {
  const page = 0
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['transactions', page],
    queryFn: () => queryTransactions({ page, size: QUERY_SIZE }),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Transactions
