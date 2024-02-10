import { gql } from '@apollo/client'

import { PAGINATION_META } from './common'

const STANZA_DETAILS = `
  detectedLanguage
  id
  createdAt
  updatedAt
  statusLength
  aiAssisted
  content
  likes
  stanzaId
  position
  userId
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
