import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { LIKE_POEM } from '../../queries/poem'
import { MutationHooKParams } from '../../types/Mutation'

export const usePoemLikeMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(LIKE_POEM)

  const likePoem = async (poemId: number) => {
    try {
      setLoading(true)
      const response = await action({ variables: { id: poemId } })
      setLoading(false)
      onSuccess && onSuccess(response)
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    likePoem,
    loading,
  }
}
