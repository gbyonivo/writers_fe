import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Part } from 'writers_shared'

import { CREATE_PART } from '../../queries/part'
import { GET_PIECE_PARTS } from '../../queries/piece'
import { MutationHooKParams } from '../../types/mutation'

interface Params extends MutationHooKParams {
  pieceId?: number
}

export const usePartMutation = ({
  onSuccess,
  onFail,
  pieceId,
}: Params = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(CREATE_PART, {
    refetchQueries: [{ query: GET_PIECE_PARTS, variables: { id: pieceId } }],
  })

  const createPart = async (part: Partial<Part>) => {
    try {
      setLoading(true)
      const response = await action({
        variables: { ...part },
      })
      setLoading(false)
      onSuccess && onSuccess(response)
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    createPart,
    loading,
  }
}
