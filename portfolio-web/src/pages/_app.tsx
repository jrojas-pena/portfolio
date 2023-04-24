import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import type { AppProps } from 'next/app';
import { Provider, createClient, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { LoginMutation, MeDocument, MeQuery } from '../gql/graphql';


function betterUpdateQuery<Result, Query>(
  cache: any,
  queryInput: any,
  result: any,
  fn: any
) {
  return cache.updateQuery(queryInput, (data: any) => fn(result, data as any) as any);
}

const client = createClient({
  url: 'https://localhost/backend/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [cacheExchange({
    updates: {
      Mutation: {
        login: (_result, args, cache, info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            (result, query) => {
              if (result.login.error){
                return query;
              }
              else {
                return {
                  me: result.login.user
                }
              }
            }
          )         
        },
        
        register: (_result, args, cache, info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            (result, query) => {
              if (result.register.error){
                return query;
              }
              else {
                return {
                  me: result.register.user
                };
              }
            }
          )         
        }

      }
    }
  }), fetchExchange]
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
