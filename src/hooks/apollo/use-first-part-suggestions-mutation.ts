import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { PieceType } from 'writers_shared/dist'

import {
  GET_FIRST_PART_SUGGESTIONS,
  GET_NEXT_PART_SUGGESTIONS,
} from '../../queries/suggestions'
import { MutationHooKParams } from '../../types/mutation'

export const useFirstPartSuggestionsMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(GET_FIRST_PART_SUGGESTIONS)

  const createFirstPartSuggestions = async (data: {
    title: string
    genreIds: number[]
    type: PieceType
  }) => {
    try {
      setLoading(true)
      const {
        data: { firstPartSuggestions: suggestions },
      } = await action({
        variables: data,
      })
      setLoading(false)
      onSuccess?.(suggestions)
      return suggestions
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    createFirstPartSuggestions,
    loading,
  }
}
