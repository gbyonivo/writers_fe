import { gql } from '@apollo/client'

import { PAGINATION_META } from './common'

export const SEARCH_PIECES = gql`
  query PieceSearchResults($pagination: PaginationInput, $after: String) {
    pieceSearchResults(pagination: $pagination, after: $after) {
      ${PAGINATION_META}
      edges {
        node {
          title,
          id
          imageUrl
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
