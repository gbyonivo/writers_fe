import { useQuery } from '@apollo/client'
import { Part } from 'writers_shared'

import { GET_PIECE_PARTS } from '../../queries/piece'
import { useEnhancedRefetch } from './use-enhanced-refetch'

export const usePieceParts = (pieceId: number) => {
  const { data, loading, error, refetch } = useQuery(GET_PIECE_PARTS, {
    variables: { id: pieceId },
    skip: !pieceId,
  })

  const { response, refetching, enhancedRefetch, errorRefetching } =
    useEnhancedRefetch(refetch)

  const parts: Part[] | null = data?.pieceParts || response?.pieceParts

  return {
    loading: loading || refetching,
    error: error || errorRefetching,
    refetch: enhancedRefetch,
    parts,
  }
}
