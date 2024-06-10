import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Poem } from 'writers_shared'

import { usePoems } from '../hooks/apollo/use-poems'
import { setLikes } from '../store/slices/poem'

interface IPoemListContext {
  getPoem: (poemId: number) => Poem | null
  poemList: Poem[]
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
  const poemList = []
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
      poemList,
      loading,
      error,
      refetch,
    }),
    [loading, error, poemList, getPoem],
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
