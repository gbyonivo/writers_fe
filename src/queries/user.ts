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

export const UPDATE_ACCOUNT_TYPE = gql`
  mutation UpdateAccountType($accountType: String) {
    updateAccountType(accountType: $accountType) {
      accountType
    }
  }
`
