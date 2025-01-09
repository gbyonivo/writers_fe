import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Part } from 'writers_shared'

import { CREATE_PART, UPDATE_PART } from '../../queries/part'
import { GET_PIECE_PARTS } from '../../queries/piece'
import { MutationHooKParams } from '../../types/mutation'
import { useAlert } from '../use-alert'

interface Params extends MutationHooKParams {
  pieceId?: number
}

export const useUpdatePartMutation = ({
  onSuccess,
  onFail,
  pieceId,
  showAlert,
}: Params = {}) => {
  const { show } = useAlert()
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(UPDATE_PART, {
    refetchQueries: [{ query: GET_PIECE_PARTS, variables: { id: pieceId } }],
  })

  const updatePart = async (part: Partial<Part>) => {
    try {
      setLoading(true)
      const response = await action({
        variables: { ...part },
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
    updatePart,
    loading,
  }
}
