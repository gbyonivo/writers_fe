import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { RATE_PART } from '../../queries/part'
import { MutationHooKParams } from '../../types/mutation'

export const useRatePartMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(RATE_PART)

  const ratePart = async ({
    partId,
    rating,
  }: {
    partId: number
    rating: number
  }) => {
    try {
      setLoading(true)
      const response = await action({ variables: { id: partId, rating } })
      setLoading(false)
      onSuccess && onSuccess(response)
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    ratePart,
    loading,
  }
}
