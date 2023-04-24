import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import type { AppProps } from 'next/app';
import { Provider, createClient, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterUserMutation } from '../gql/graphql';
import { InMemoryCache } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';


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
  // cache: new InMemoryCache({
  //   fragments: createFragmentRegistry(gql`
  //   fragment RegularUserResponse on UserResponse {
  //     error {
  //       ...RegularError
  //     }
  //     user {
  //       ...RegularUser
  //     }
  //   }
  //   fragment RegularError on FieldError {
  //     field
  //     message
  //   }
  //   fragment RegularUser on User {
  //     id
  //     username
  //   }
  // `)
  // }),
  exchanges: [cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, args, cache, info) => {
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            () => ({me: null})
          )
        },
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
          betterUpdateQuery<RegisterUserMutation, MeQuery>(
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
                }
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
