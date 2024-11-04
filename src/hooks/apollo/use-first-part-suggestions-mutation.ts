import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PieceType } from 'writers_shared/dist'

import {
  GET_FIRST_PART_SUGGESTIONS,
  GET_NEXT_PART_SUGGESTIONS,
} from '../../queries/suggestions'
import { addSuggestion } from '../../store/slices/suggestion'
import { MutationHooKParams } from '../../types/mutation'
import { AppState } from '../../types/states/AppState'
import { createKeyForSuggestions } from '../../utils/common'

export const useFirstPartSuggestionsMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const shouldUseAiForOnlyTips = useSelector(
    (state: AppState) => state.settings.shouldUseAiForOnlyTips,
  )
  const suggestionMap = useSelector(
    (state: AppState) => state.suggestion.suggestionMap,
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(GET_FIRST_PART_SUGGESTIONS)
  const dispatch = useDispatch()

  const createFirstPartSuggestions = async (data: {
    title: string
    genreIds: number[]
    type: PieceType
  }) => {
    const suggestionKey = createKeyForSuggestions({
      isSuggestion: shouldUseAiForOnlyTips,
      genreIds: data.genreIds,
      type: data.type,
    })
    const existingSuggestions = suggestionMap[suggestionKey]
    if (existingSuggestions && existingSuggestions.length) {
      onSuccess?.(existingSuggestions)
      return existingSuggestions
    }
    try {
      setLoading(true)
      const {
        data: { firstPartSuggestions: suggestions },
      } = await action({
        variables: { ...data, isSuggestion: shouldUseAiForOnlyTips },
      })
      dispatch(
        addSuggestion({
          key: suggestionKey,
          value: suggestions,
        }),
      )
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
