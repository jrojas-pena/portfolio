/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment RegularError on FieldError {\n  field\n  message\n}": types.RegularErrorFragmentDoc,
    "fragment RegularUser on User {\n  id\n  username\n}": types.RegularUserFragmentDoc,
    "fragment RegularUserResponse on UserResponse {\n  error {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}": types.RegularUserResponseFragmentDoc,
    "mutation Login($options: UsernamePasswordInput!) {\n  login(options: $options) {\n    user {\n      id\n      username\n    }\n    error {\n      message\n      field\n    }\n  }\n}": types.LoginDocument,
    "mutation RegisterUser($options: UsernamePasswordInput!, $user: UserInput!) {\n  createUser(options: $options, user: $user) {\n    user {\n      username\n      password\n      lastName\n      id\n      firstName\n    }\n    error {\n      message\n      field\n    }\n  }\n}": types.RegisterUserDocument,
    "query Me {\n  me {\n    username\n    id\n  }\n}": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularError on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment RegularError on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUser on User {\n  id\n  username\n}"): (typeof documents)["fragment RegularUser on User {\n  id\n  username\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUserResponse on UserResponse {\n  error {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}"): (typeof documents)["fragment RegularUserResponse on UserResponse {\n  error {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($options: UsernamePasswordInput!) {\n  login(options: $options) {\n    user {\n      id\n      username\n    }\n    error {\n      message\n      field\n    }\n  }\n}"): (typeof documents)["mutation Login($options: UsernamePasswordInput!) {\n  login(options: $options) {\n    user {\n      id\n      username\n    }\n    error {\n      message\n      field\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterUser($options: UsernamePasswordInput!, $user: UserInput!) {\n  createUser(options: $options, user: $user) {\n    user {\n      username\n      password\n      lastName\n      id\n      firstName\n    }\n    error {\n      message\n      field\n    }\n  }\n}"): (typeof documents)["mutation RegisterUser($options: UsernamePasswordInput!, $user: UserInput!) {\n  createUser(options: $options, user: $user) {\n    user {\n      username\n      password\n      lastName\n      id\n      firstName\n    }\n    error {\n      message\n      field\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    username\n    id\n  }\n}"): (typeof documents)["query Me {\n  me {\n    username\n    id\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;