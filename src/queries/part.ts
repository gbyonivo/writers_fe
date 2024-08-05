import { gql } from '@apollo/client'

import { PAGINATION_META } from './common'

export const PART_DETAILS = `
  detectedLanguage
  id
  createdAt
  updatedAt
  aiAssisted
  content
  likes
  position
  userId
  partId
  userRating
  rating
  numberOfRatings
  rate
  pitch
  identifier
`

export const GET_PART = gql`
  query Piece($id: Int) {
    part(id: $id) {
      ${PART_DETAILS}
    }
  }
`

export const GET_PARTS = gql`
  query Parts($pagination: PaginationInput) {
    parts(pagination: $pagination) {
      ${PAGINATION_META}
      edges {
        node {
          ${PART_DETAILS}
        }
      }
    }
  }
`

export const RATE_PART = gql`
  mutation RatePart($id: Int, $rating: Int) {
    ratePart(id: $id, rating: $rating) {
      ${PART_DETAILS}
    }
  }
`

export const CREATE_PART = gql`
  mutation CreatePart(
    $content: String
    $pieceId: Int
    $position: Int
    $partId: Int
    $pitch: Float
    $rate: Float
    $identifier: String
  ) {
    createPart(
      content: $content
      pieceId: $pieceId
      position: $position
      partId: $partId
      pitch: $pitch
      rate: $rate
      identifier: $identifier
    ) {
      ${PART_DETAILS}
    }
  }
`
