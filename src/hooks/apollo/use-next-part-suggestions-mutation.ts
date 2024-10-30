import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { GET_NEXT_PART_SUGGESTIONS } from '../../queries/suggestions'
import { MutationHooKParams } from '../../types/mutation'

export const useNextPartSuggestionsMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(GET_NEXT_PART_SUGGESTIONS)

  const createNextPartSuggestions = async (data: {
    pieceId: number
    partIds: number[]
    genreIds: number[]
  }) => {
    try {
      setLoading(true)
      const response = await action({
        variables: data,
      })
      const {
        data: { nextPartSuggestions: suggestions },
      } = response
      setLoading(false)
      onSuccess?.(suggestions)
      return suggestions
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    createNextPartSuggestions,
    loading,
  }
}
