import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Poem } from 'writers_shared'

import { usePoems } from '../hooks/apollo/use-poems'
import { setLikes } from '../store/slices/poem'

interface IPoemListContext {
  poemList: Poem[]
  loading: boolean
  error: any | null
  refetch: () => void
  loadMore: () => void
  hasNextPage: boolean
}

interface Props {
  children: JSX.Element
  userId?: number
}

export const PoemListContext = React.createContext<IPoemListContext>(
  {} as IPoemListContext,
)

export function usePoemListContext(): IPoemListContext {
  return React.useContext<IPoemListContext>(PoemListContext)
}

function PoemListContextProvider({ children, userId }: Props) {
  const dispatch = useDispatch()
  const { loading, error, poems, refetch, fetchMore } = usePoems(userId)
  const poemList = []
  const endCursor = poems?.pageInfo?.endCursor
  const hasNextPage = !!poems?.pageInfo?.hasNextPage

  const { map: poemMap, likes } = useMemo(() => {
    let likes = {}
    const map = (poems?.edges || []).reduce((acc, curr) => {
      likes = {
        ...likes,
        [curr.node.id]: curr.node.hasBeenLiked,
      }
      poemList.push(curr.node)
      return {
        ...acc,
        [curr.node.id]: curr.node,
      }
    }, {})
    return { map, likes }
  }, [poems])

  const loadMore = useCallback(() => {
    if (!hasNextPage) return
    fetchMore({
      variables: {
        first: 6,
        after: poems.pageInfo.endCursor,
      },
    })
  }, [endCursor, fetchMore])

  useEffect(() => {
    dispatch(setLikes(likes))
  }, [likes])

  const value = useMemo(
    () => ({
      poemList,
      loading,
      error,
      hasNextPage,
      refetch,
      loadMore,
    }),
    [loading, error, poemList, loadMore, hasNextPage],
  )
  return (
    <PoemListContext.Provider value={value}>
      {children}
    </PoemListContext.Provider>
  )
}

PoemListContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default PoemListContextProvider
