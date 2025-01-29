import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { Piece, PieceType } from 'writers_shared'

import { usePieces } from '../hooks/apollo/use-pieces'

interface IPieceListContext {
  pieceList: Piece[]
  loading: boolean
  error: any | null
  refetch: () => void
  loadMore: () => void
  hasNextPage: boolean
}

interface Props {
  children: JSX.Element
  userId?: number
  type?: PieceType
  genreIds?: number[]
  liked?: boolean
}

export const PieceListContext = React.createContext<IPieceListContext>(
  {} as IPieceListContext,
)

export function usePieceListContext(): IPieceListContext {
  return React.useContext<IPieceListContext>(PieceListContext)
}

function PieceListContextProvider({
  children,
  userId,
  type,
  genreIds,
  liked,
}: Props) {
  const { loading, error, pieces, refetch, fetchMore } = usePieces({
    userId,
    type,
    genreIds,
    liked,
  })

  const endCursor = pieces?.pageInfo?.endCursor
  const hasNextPage = !!pieces?.pageInfo?.hasNextPage

  const pieceList = useMemo(() => {
    return (pieces?.edges || []).map(({ node }) => node)
  }, [pieces])

  const loadMore = useCallback(() => {
    if (!hasNextPage) return
    fetchMore({
      variables: {
        first: 6,
        after: pieces.pageInfo.endCursor,
      },
    })
  }, [endCursor, fetchMore])

  const value = useMemo(
    () => ({
      pieceList,
      loading,
      error,
      hasNextPage,
      refetch,
      loadMore,
    }),
    [loading, error, pieceList, loadMore, hasNextPage],
  )
  return (
    <PieceListContext.Provider value={value}>
      {children}
    </PieceListContext.Provider>
  )
}

PieceListContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default PieceListContextProvider
