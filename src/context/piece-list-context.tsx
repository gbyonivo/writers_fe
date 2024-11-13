import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Piece, PieceType } from 'writers_shared'

import { usePieces } from '../hooks/apollo/use-pieces'
import { setLikes } from '../store/slices/piece'

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
}

export const PieceListContext = React.createContext<IPieceListContext>(
  {} as IPieceListContext,
)

export function usePieceListContext(): IPieceListContext {
  return React.useContext<IPieceListContext>(PieceListContext)
}

function PieceListContextProvider({ children, userId, type }: Props) {
  const dispatch = useDispatch()
  const { loading, error, pieces, refetch, fetchMore } = usePieces({
    userId,
    type,
  })
  const pieceList = []
  const endCursor = pieces?.pageInfo?.endCursor
  const hasNextPage = !!pieces?.pageInfo?.hasNextPage

  const { likes } = useMemo(() => {
    let likes = {}
    const map = (pieces?.edges || []).reduce((acc, curr) => {
      likes = {
        ...likes,
        [curr.node.id]: curr.node.hasBeenLiked,
      }
      pieceList.push(curr.node)
      return {
        ...acc,
        [curr.node.id]: curr.node,
      }
    }, {})
    return { map, likes }
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

  useEffect(() => {
    dispatch(setLikes(likes))
  }, [likes])

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
