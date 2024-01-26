import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import React from 'react'
import { useSelector } from 'react-redux'

import { AppState } from '../../types/states/AppState'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

interface Props {
  children: JSX.Element
}

export const Apollo = ({ children }: Props) => {
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
    cache: new InMemoryCache(),
  })
  console.log(token)
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
