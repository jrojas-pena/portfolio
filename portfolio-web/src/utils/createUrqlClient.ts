// import { cacheExchange, Resolver, Cache } from '@urql/exchange-graphcache';
// import {
//   dedupExchange,
//   Exchange,
//   fetchExchange,
//   stringifyVariables,
// } from 'urql';
// import { pipe, tap } from 'wonka';
// // import {
// //   LoginMutation,
// //   LogoutMutation,
// //   MeDocument,
// //   MeQuery,
// //   RegisterMutation,
// //   VoteMutationVariables,
// //   DeletePostMutationVariables,
// // } from '../generated/graphql';
// // import { betterUpdateQuery } from './betterUpdateQuery';
// import Router from 'next/router';
// import gql from 'graphql-tag';
// // import { isServer } from './isServer';

import { cacheExchange, fetchExchange } from 'urql';
import { betterUpdateQuery } from './betterUpdateQuery';
import {
  LoginMutation,
  LogoutMutation,
  MeQuery,
  RegisterUserMutation,
} from '../gql/graphql';

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'https://localhost/backend/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null }),
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.error) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              },
            );
          },

          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterUserMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.error) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              },
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});
