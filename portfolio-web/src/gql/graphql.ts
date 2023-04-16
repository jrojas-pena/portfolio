/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createUser: UserResponse;
  deletePost: Scalars['Boolean'];
  login?: Maybe<UserResponse>;
  updatePost?: Maybe<Post>;
};

export type MutationCreatePostArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};

export type MutationCreateUserArgs = {
  options: UsernamePasswordInput;
  user: UserInput;
};

export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};

export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type MutationUpdatePostArgs = {
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['Float'];
  title?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};

export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login?: {
    __typename?: 'UserResponse';
    user?: { __typename?: 'User'; id: number; username: string } | null;
    error?: Array<{
      __typename?: 'FieldError';
      message: string;
      field: string;
    }> | null;
  } | null;
};

export type RegisterUserMutationVariables = Exact<{
  options: UsernamePasswordInput;
  user: UserInput;
}>;

export type RegisterUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'UserResponse';
    user?: {
      __typename?: 'User';
      username: string;
      password: string;
      lastName: string;
      id: number;
      firstName: string;
    } | null;
    error?: Array<{
      __typename?: 'FieldError';
      message: string;
      field: string;
    }> | null;
  };
};

export const LoginDocument = gql`
  mutation Login($options: UsernamePasswordInput!) {
    login(options: $options) {
      user {
        id
        username
      }
      error {
        message
        field
      }
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const RegisterUserDocument = gql`
  mutation RegisterUser($options: UsernamePasswordInput!, $user: UserInput!) {
    createUser(options: $options, user: $user) {
      user {
        username
        password
        lastName
        id
        firstName
      }
      error {
        message
        field
      }
    }
  }
`;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    RegisterUserDocument,
  );
}
