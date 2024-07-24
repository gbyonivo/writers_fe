import { gql } from '@apollo/client'

import { PAGINATION_META } from './common'

export const PART_DETAILS = `
  id
  createdAt
  updatedAt
  name
  pieceId
  partIds
  locked
`

export const GET_BOOKMARK = gql`
  query Piece($id: Int) {
    part(id: $id) {
      ${PART_DETAILS}
    }
  }
`

export const GET_BOOKMARKS = gql`
  query Bookmarks($pagination: PaginationInput) {
    bookmarks(pagination: $pagination) {
      ${PAGINATION_META}
      edges {
        node {
          ${PART_DETAILS}
        }
      }
    }
  }
`

export const CREATE_BOOKMARK = gql`
  mutation CreateBookmark(
    $pieceId: Int
    $partIds: [Int]
    $name: String
    $locked: Boolean
  ) {
    createBookmark(
      pieceId: $pieceId
      partIds: $partIds
      name: $name
      locked: $locked
    ) {
      ${PART_DETAILS}
      name
      locked
    }
  }
`
