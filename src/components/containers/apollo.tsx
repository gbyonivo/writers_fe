import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import React from 'react'
import { useSelector } from 'react-redux'

import { AppState } from '../../types/states/AppState'
import { IN_MEMORY_CACHE } from '../../utils/apollo-in-memory-cache'

const httpLink = createHttpLink({
  uri: `${process.env.EXPO_PUBLIC_API_URL}/graphql`,
})

interface Props {
  children: JSX.Element
}

export function Apollo({ children }: Props) {
  const token = useSelector((state: AppState) => state.login.token)

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : '',
        token,
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: IN_MEMORY_CACHE,
  })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
