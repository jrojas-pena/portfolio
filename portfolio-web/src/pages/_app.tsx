import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import type { AppProps } from 'next/app';
import { Provider, createClient, cacheExchange, fetchExchange } from 'urql';

const client = createClient({
  url: 'https://localhost/backend/graphql',
  exchanges: [cacheExchange, fetchExchange]
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
