import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAuthContext } from '../../context/auth-context'
import {
  GET_PIECE,
  GET_PIECES,
  UPDATE_PIECE_IMAGE_URL,
} from '../../queries/piece'
import { GET_VIDEOS, UPLOAD_VIDEO_URL } from '../../queries/video'
import { MutationHooKParams } from '../../types/mutation'
import { useAlert } from '../use-alert'
import { usePieces } from './use-pieces'
import { useVideos } from './use-videos'

interface Params extends MutationHooKParams {
  pieceId?: number
}

export const usePieceImageUrlMutation = (
  { onSuccess, onFail, showAlert, pieceId }: Params = { showAlert: true },
) => {
  const { show } = useAlert()
  const { user } = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(UPDATE_PIECE_IMAGE_URL, {
    refetchQueries: [
      { query: GET_PIECES, variables: { userId: user?.id, first: 12 } },
      { query: GET_PIECE, variables: { id: pieceId } },
    ],
  })

  const updatePieceImageUrl = async ({
    id,
    imageUrl,
  }: {
    id: number
    imageUrl: string
  }) => {
    try {
      setLoading(true)
      const response = await action({
        variables: { id, imageUrl },
      })
      setLoading(false)
      onSuccess && onSuccess(response)
      if (showAlert) {
        show({ message: 'Successfully videoed' })
      }
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
      if (showAlert) {
        show({ message: 'Encountered an issue', type: 'danger' })
      }
    }
  }

  return {
    updatePieceImageUrl,
    loading,
  }
}
