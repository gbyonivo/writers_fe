import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Poem } from 'writers_shared'

import { usePoems } from '../hooks/apollo/use-poems'
import { setLikes } from '../store/slices/poem'

interface IPoemListContext {
  getPoem: (poemId: number) => Poem | null
  poemIds: number[]
  loading: boolean
  error: any | null
  refetch: () => void
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
  const { loading, error, poems, refetch } = usePoems(userId)
  const dispatch = useDispatch()
  const poemIds = []
  const { map: poemMap, likes } = useMemo(() => {
    let likes = {}
    const map = (poems?.edges || []).reduce((acc, curr) => {
      likes = {
        ...likes,
        [curr.node.id]: curr.node.hasBeenLiked,
      }
      poemIds.push(curr.node.id)
      return {
        ...acc,
        [curr.node.id]: curr.node,
      }
    }, {})
    return { map, likes }
  }, [poems])
  const getPoem = useCallback(
    (poemId: number) => poemMap[poemId] || null,
    [poemMap],
  )
  useEffect(() => {
    dispatch(setLikes(likes))
  }, [likes])
  const value = useMemo(
    () => ({
      getPoem,
      poemIds,
      loading,
      error,
      refetch,
    }),
    [loading, error, poemIds, getPoem],
  )
  return (
    // @ts-ignore
    <PoemListContext.Provider value={value}>
      {children}
    </PoemListContext.Provider>
  )
}

PoemListContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default PoemListContextProvider
