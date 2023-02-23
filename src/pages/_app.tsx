import '../css/app.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'nprogress/nprogress.css'

import { Inter } from '@next/font/google'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import { useEffect } from 'react'

import { Layout } from '../components/Layout'
import { DefaultMeta } from '../components/seo/DefaultMeta'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Wait for font to load
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 60 * 1000, // 1 hr
      cacheTime: 5 * 60 * 60 * 1000, // 5 hrs
    },
  },
})

const App = ({ Component, pageProps, router }: AppProps) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${router.route}`

  NProgress.configure({ showSpinner: false })

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start())
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  return (
    <div className={`relative h-[100svh] overflow-x-hidden font-body ${inter.variable}`}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <DefaultMeta canonical={url} />
          <Layout>
            <AnimatePresence initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </div>
  )
}

export default App
