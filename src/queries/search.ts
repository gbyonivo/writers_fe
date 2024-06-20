import { gql } from '@apollo/client'

import { PAGINATION_META } from './common'

export const SEARCH_POEMS = gql`
  query PoemSearchResults($pagination: PaginationInput, $after: String) {
    poemSearchResults(pagination: $pagination, after: $after) {
      ${PAGINATION_META}
      edges {
        node {
          title,
          id
        }
      }
    }
  }
`

export const SEARCH_USERS = gql`
  query UserSearchResults($pagination: PaginationInput, $after: String) {
    userSearchResults(pagination: $pagination, after: $after) {
      ${PAGINATION_META}
      edges {
        node {
          name,
          username
          id
        }
      }
    }
  }
`
