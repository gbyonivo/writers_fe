import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Piece } from 'writers_shared'

import { CREATE_PIECE } from '../../queries/piece'
import { MutationHooKParams } from '../../types/mutation'

export const usePieceMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(CREATE_PIECE)

  const createPiece = async (piece: Partial<Piece>) => {
    console.log(piece)
    try {
      setLoading(true)
      const response = await action({
        variables: { ...piece, genre: 'Unknown' },
      })
      setLoading(false)
      onSuccess && onSuccess(response)
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    createPiece,
    loading,
  }
}
