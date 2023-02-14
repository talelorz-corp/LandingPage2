import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
          <title></title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <script src="https://developers.kakao.com/sdk/js/kakao.js"
            defer
          >
          </script>


        </Head >
      <Component {...pageProps} />
    </>

  )
}
