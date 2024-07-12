import { gql } from '@apollo/client'

import { PAGINATION_META } from './common'
import { PART_DETAILS } from './part'

const PIECE_DETAILS = `
  title
  id
  createdAt
  updatedAt
  partLength
  genreIds
  status
  type
  firstPart {
    id,
    content
  }
  title
  user {
    id
    name
  }
  likes
  hasBeenLiked
`

export const GET_PIECE = gql`
  query Piece($id: Int) {
    piece(id: $id) {
      ${PIECE_DETAILS}
    }
  }
`

export const GET_PIECE_PARTS = gql`
  query PieceParts($id: Int) {
    pieceParts(id: $id) {
      ${PART_DETAILS}
    }
  }
`

export const GET_PIECES = gql`
  query Pieces($pagination: PaginationInput, $after: String) {
    pieces(pagination: $pagination, after: $after) {
      ${PAGINATION_META}
      edges {
        node {
          ${PIECE_DETAILS}
        }
      }
    }
  }
`

export const LIKE_PIECE = gql`
  mutation LikePiece($id: Int) {
    likePiece(id: $id)
  }
`

export const CREATE_PIECE = gql`
  mutation CreatePiece(
    $title: String
    $type: String
    $genreIds: [Int]
    $firstPart: FirstPartInput
  ) {
    createPiece(
      title: $title
      type: $type
      firstPart: $firstPart
      genreIds: $genreIds
    ) {
      ${PIECE_DETAILS}
    }
  }
`
