import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Poem } from 'writers_shared'

import { CREATE_POEM } from '../../queries/poem'
import { MutationHooKParams } from '../../types/mutation'

export const usePoemMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(CREATE_POEM)

  const createPoem = async (poem: Partial<Poem>) => {
    try {
      setLoading(true)
      const response = await action({
        variables: { ...poem, genre: 'Unknown' },
      })
      setLoading(false)
      onSuccess && onSuccess(response)
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    createPoem,
    loading,
  }
}
