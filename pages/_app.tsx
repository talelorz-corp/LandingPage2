import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title></title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          <script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            defer
          ></script>
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
