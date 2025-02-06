import { gql } from '@apollo/client'

export const CREATE_INVITATION = gql`
  mutation CreateInvitation($email: String) {
    createInvitation(email: $email)
  }
`
