import { gql } from '@apollo/client'

export const CREATE_AUDIO_URLS = gql`
  mutation CreateAudios($pieceId: Int, $partIds: [Int]) {
    createAudios(pieceId: $pieceId, partIds: $partIds)
  }
`

export const GET_ELEVEN_VOICES = gql`
  query ElevenVoices {
    elevenVoices {
      name
      id
      previewUrl
      accent
      description
      age
      gender
      useCase
    }
  }
`
