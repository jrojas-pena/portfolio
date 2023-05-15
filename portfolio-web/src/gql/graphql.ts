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
  logout: Scalars['Boolean'];
  updatePost?: Maybe<Post>;
};

export type MutationCreatePostArgs = {
  body: Scalars['String'];
  imageUri: Scalars['String'];
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
  imageUri?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  body?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  imageUri?: Maybe<Scalars['String']>;
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
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  profilePicture?: Maybe<Scalars['String']>;
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

export type RegularErrorFragment = {
  __typename?: 'FieldError';
  field: string;
  message: string;
} & { ' $fragmentName'?: 'RegularErrorFragment' };

export type RegularUserFragment = {
  __typename?: 'User';
  id: number;
  username: string;
} & { ' $fragmentName'?: 'RegularUserFragment' };

export type RegularUserResponseFragment = {
  __typename?: 'UserResponse';
  error?: Array<
    { __typename?: 'FieldError' } & {
      ' $fragmentRefs'?: { RegularErrorFragment: RegularErrorFragment };
    }
  > | null;
  user?:
    | ({ __typename?: 'User' } & {
        ' $fragmentRefs'?: { RegularUserFragment: RegularUserFragment };
      })
    | null;
} & { ' $fragmentName'?: 'RegularUserResponseFragment' };

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login?:
    | ({ __typename?: 'UserResponse' } & {
        ' $fragmentRefs'?: {
          RegularUserResponseFragment: RegularUserResponseFragment;
        };
      })
    | null;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type RegisterUserMutationVariables = Exact<{
  options: UsernamePasswordInput;
  user: UserInput;
}>;

export type RegisterUserMutation = {
  __typename?: 'Mutation';
  createUser: { __typename?: 'UserResponse' } & {
    ' $fragmentRefs'?: {
      RegularUserResponseFragment: RegularUserResponseFragment;
    };
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: { __typename?: 'User'; username: string; id: number } | null;
};

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = {
  __typename?: 'Query';
  posts: Array<{
    __typename?: 'Post';
    body?: string | null;
    createdAt: string;
    id: number;
    title: string;
    updatedAt: string;
    imageUri?: string | null;
    author: { __typename?: 'User'; id: number };
  }>;
};

export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    error {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const LoginDocument = gql`
  mutation Login($options: UsernamePasswordInput!) {
    login(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
  );
}
export const RegisterUserDocument = gql`
  mutation RegisterUser($options: UsernamePasswordInput!, $user: UserInput!) {
    createUser(options: $options, user: $user) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    RegisterUserDocument,
  );
}
export const MeDocument = gql`
  query Me {
    me {
      username
      id
    }
  }
`;

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options,
  });
}
export const PostsDocument = gql`
  query Posts {
    posts {
      author {
        id
      }
      body
      createdAt
      id
      title
      updatedAt
      imageUri
    }
  }
`;

export function usePostsQuery(
  options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({
    query: PostsDocument,
    ...options,
  });
}
