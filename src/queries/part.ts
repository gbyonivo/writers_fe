import { gql } from '@apollo/client'

import { PAGINATION_META } from './common'

export const PART_DETAILS = `
  content
  detectedLanguage
  likes
  aiAssisted
  pieceId
  partId
  position
  status
  speakerName
  speakerStyle
  speakerRatePercentage
  speakerPitchPercentage
  speakerPreBreakTime
  speakerPostBreakTime
  naratorPreContent
  naratorPostContent
  naratorPreBreakTime
  naratorPostBreakTime
  id
  createdAt
  updatedAt
  userRating
  rating
  numberOfRatings
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
    $detectedLanguage: String
    $likes: Int
    $aiAssisted: Int
    $pieceId: Int
    $partId: Int
    $position: Int
    $status: String
    $speakerName: String
    $speakerStyle: String
    $speakerRatePercentage: Int
    $speakerPitchPercentage: Int
    $speakerPreBreakTime: Int
    $speakerPostBreakTime: Int
    $naratorPreContent: String
    $naratorPostContent: String
    $naratorPreBreakTime: Int
    $naratorPostBreakTime: Int
  ) {
    createPart(
      content: $content
      detectedLanguage: $detectedLanguage
      likes: $likes
      aiAssisted: $aiAssisted
      pieceId: $pieceId
      partId: $partId
      position: $position
      status: $status
      speakerName: $speakerName
      speakerStyle: $speakerStyle
      speakerRatePercentage: $speakerRatePercentage
      speakerPitchPercentage: $speakerPitchPercentage
      speakerPreBreakTime: $speakerPreBreakTime
      speakerPostBreakTime: $speakerPostBreakTime
      naratorPreContent: $naratorPreContent
      naratorPostContent: $naratorPostContent
      naratorPreBreakTime: $naratorPreBreakTime
      naratorPostBreakTime: $naratorPostBreakTime
    ) {
      ${PART_DETAILS}
    }
  }
`
