import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GET_LIKED_PIECE_IDS } from '../../queries/piece'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const useLikedPieceIds = () => {
  const { data, loading, error, refetch } = useQuery(GET_LIKED_PIECE_IDS)
  const dispatch = useDispatch()

  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const likedPieceIds: number[] | null =
    data?.likedPieceIds || response?.likedPieceIds

  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    refetch: enhancedRefetch,
    likedPieceIds,
  }
}
