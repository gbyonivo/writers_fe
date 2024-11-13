import { gql } from '@apollo/client'

export const GET_NEXT_PART_SUGGESTIONS = gql`
  mutation NextPartSuggestions(
    $pieceId: Int
    $partIds: [Int]
    $genreIds: [Int]
    $isSuggestion: Boolean
  ) {
    nextPartSuggestions(
      pieceId: $pieceId
      partIds: $partIds
      genreIds: $genreIds
      isSuggestion: $isSuggestion
    )
  }
`

export const GET_FIRST_PART_SUGGESTIONS = gql`
  mutation FirstPartSuggestions(
    $title: String
    $genreIds: [Int]
    $type: String
    $isSuggestion: Boolean
  ) {
    firstPartSuggestions(
      title: $title
      genreIds: $genreIds
      type: $type
      isSuggestion: $isSuggestion
    )
  }
`
