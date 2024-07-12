import { gql } from '@apollo/client'

export const GET_USER = gql`
  query User($id: Int) {
    user(id: $id) {
      name
      id
      username
      email
      pieceCount
      partCount
    }
  }
`
