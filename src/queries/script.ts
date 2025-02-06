import { gql } from '@apollo/client'

export const SCRIPT_DETAILS = `
  id
  createdAt
  updatedAt
  videoId
  script
`

export const GET_SCRIPT = gql`
  query Script($id: Int) {
    script(id: $id) {
      ${SCRIPT_DETAILS}
    }
  }
`
