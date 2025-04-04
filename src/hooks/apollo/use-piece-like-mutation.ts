import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { GET_LIKED_PIECE_IDS, LIKE_PIECE } from '../../queries/piece'
import { MutationHooKParams } from '../../types/mutation'

export const usePieceLikeMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(LIKE_PIECE, {
    refetchQueries: [{ query: GET_LIKED_PIECE_IDS }],
  })

  const likePiece = async (pieceId: number) => {
    try {
      setLoading(true)
      const response = await action({ variables: { id: pieceId } })
      setLoading(false)
      onSuccess && onSuccess(response)
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    likePiece,
    loading,
  }
}
