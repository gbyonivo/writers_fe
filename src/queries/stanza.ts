import { gql } from '@apollo/client'

import { PAGINATION_META } from './common'

export const STANZA_DETAILS = `
  detectedLanguage
  id
  createdAt
  updatedAt
  aiAssisted
  content
  likes
  position
  userId
  stanzaId
`

export const GET_STANZA = gql`
  query Poem($id: Int) {
    stanza(id: $id) {
      ${STANZA_DETAILS}
    }
  }
`

export const GET_STANZAS = gql`
  query Stanzas($pagination: PaginationInput) {
    stanzas(pagination: $pagination) {
      ${PAGINATION_META}
      edges {
        node {
          ${STANZA_DETAILS}
        }
      }
    }
  }
`

export const RATE_STANZA = gql`
  mutation RateStanza($rateStanzaId: Int, $rating: Int) {
    rateStanza(id: $rateStanzaId, rating: $rating)
  }
`

export const CREATE_STANZA = gql`
  mutation CreateStanza(
    $content: String
    $poemId: Int
    $position: Int
    $stanzaId: Int
  ) {
    createStanza(
      content: $content
      poemId: $poemId
      position: $position
      stanzaId: $stanzaId
    ) {
      ${STANZA_DETAILS}
    }
  }
`
