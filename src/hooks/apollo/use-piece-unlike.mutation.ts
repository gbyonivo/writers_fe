import { useMutation } from '@apollo/client'
import { useState } from 'react'

import {
  GET_LIKED_PIECE_IDS,
  LIKE_PIECE,
  UNLIKE_PIECE,
} from '../../queries/piece'
import { MutationHooKParams } from '../../types/mutation'

export const usePieceUnlikeMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [unlikeAction] = useMutation(UNLIKE_PIECE, {
    refetchQueries: [{ query: GET_LIKED_PIECE_IDS }],
  })

  const unlikePiece = async (pieceId: number) => {
    try {
      setLoading(true)
      const response = await unlikeAction({ variables: { id: pieceId } })
      setLoading(false)
      onSuccess && onSuccess(response)
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    unlikePiece,
    loading,
  }
}
