import { InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'

export const IN_MEMORY_CACHE = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pieces: {
          ...relayStylePagination(),
          keyArgs: ['pagination'],
        },
        users: {
          ...relayStylePagination(),
          keyArgs: ['pagination'],
        },
        bookmarks: {
          ...relayStylePagination(),
          keyArgs: ['pagination'],
        },
      },
    },
  },
})
