import { gql } from '@apollo/client'

import { PAGINATION_META } from './common'

export const VIDEO_DETAILS = `
  id
  createdAt
  updatedAt
  pieceId
  partIds
  url
`

export const GET_VIDEO = gql`
  query Piece($id: Int) {
    part(id: $id) {
      ${VIDEO_DETAILS}
    }
  }
`

export const GET_VIDEOS = gql`
  query Videos($pagination: PaginationInput) {
    videos(pagination: $pagination) {
      ${PAGINATION_META}
      edges {
        node {
          ${VIDEO_DETAILS}
        }
      }
    }
  }
`

export const CREATE_VIDEO = gql`
  mutation CreateVideo(
    $pieceId: Int
    $partIds: [Int]
  ) {
    createVideo(
      pieceId: $pieceId
      partIds: $partIds
    ) {
      ${VIDEO_DETAILS}
    }
  }
`

export const DELETE_VIDEO = gql`
  mutation DeleteVideo($id: Int) {
    deleteVideo(id: $id)
  }
`

export const UPLOAD_VIDEO_URL = gql`
  mutation UploadVideoUrl($id: Int, $url: String) {
    uploadVideoUrl(id: $id, url: $url) {
      ${VIDEO_DETAILS}
    }
  }
`
