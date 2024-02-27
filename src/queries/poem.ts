import { gql } from '@apollo/client'

import { PAGINATION_META } from './common'
import { STANZA_DETAILS } from './stanza'

const POEM_DETAILS = `
  title
  id
  createdAt
  updatedAt
  stanzaLength
  genre
  status
  firstStanza {
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

export const GET_POEM = gql`
  query Poem($id: Int) {
    poem(id: $id) {
      ${POEM_DETAILS}
    }
  }
`

export const GET_POEM_STANZAS = gql`
  query PoemStanzas($id: Int) {
    poemStanzas(id: $id) {
      ${STANZA_DETAILS}
    }
  }
`

export const GET_POEMS = gql`
  query Poems($pagination: PaginationInput) {
    poems(pagination: $pagination) {
      ${PAGINATION_META}
      edges {
        node {
          ${POEM_DETAILS}
        }
      }
    }
  }
`

export const LIKE_POEM = gql`
  mutation LikePoem($id: Int) {
    likePoem(id: $id)
  }
`

export const CREATE_POEM = gql`
  mutation CreatePoem(
    $title: String
    $genre: String
    $firstStanza: FirstStanzaInput
  ) {
    createPoem(
      title: $title
      firstStanza: $firstStanza
      genre: $genre
    ) {
      ${POEM_DETAILS}
    }
  }
`
