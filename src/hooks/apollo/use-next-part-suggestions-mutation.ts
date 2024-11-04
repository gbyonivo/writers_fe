import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GET_NEXT_PART_SUGGESTIONS } from '../../queries/suggestions'
import { addSuggestion } from '../../store/slices/suggestion'
import { MutationHooKParams } from '../../types/mutation'
import { AppState } from '../../types/states/AppState'
import { createKeyForSuggestions } from '../../utils/common'

export const useNextPartSuggestionsMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(GET_NEXT_PART_SUGGESTIONS)
  const dispatch = useDispatch()

  const shouldUseAiForOnlyTips = useSelector(
    (state: AppState) => state.settings.shouldUseAiForOnlyTips,
  )

  const suggestionMap = useSelector(
    (state: AppState) => state.suggestion.suggestionMap,
  )

  const createNextPartSuggestions = async (data: {
    pieceId: number
    partIds: number[]
    genreIds: number[]
  }) => {
    const suggestionKey = createKeyForSuggestions({
      partIds: data.partIds,
      isSuggestion: shouldUseAiForOnlyTips,
      pieceId: data.pieceId,
      genreIds: data.genreIds,
    })
    const existingSuggestions = suggestionMap[suggestionKey]
    if (existingSuggestions && existingSuggestions.length) {
      console.log(existingSuggestions)
      onSuccess?.(existingSuggestions)
      return existingSuggestions
    }

    try {
      setLoading(true)
      const response = await action({
        variables: { ...data, isSuggestion: shouldUseAiForOnlyTips },
      })

      const {
        data: { nextPartSuggestions: suggestions },
      } = response
      setLoading(false)
      onSuccess?.(suggestions)
      dispatch(
        addSuggestion({
          key: suggestionKey,
          value: suggestions,
        }),
      )
      return suggestions
    } catch (e) {
      onFail && onFail(e)
      console.log(e)
      setLoading(false)
    }
  }

  return {
    createNextPartSuggestions,
    loading,
  }
}
