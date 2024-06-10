import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Stanza } from 'writers_shared'

import { GET_POEM_STANZAS } from '../../queries/poem'
import { CREATE_STANZA } from '../../queries/stanza'
import { MutationHooKParams } from '../../types/mutation'

interface Params extends MutationHooKParams {
  poemId?: number
}

export const useStanzaMutation = ({
  onSuccess,
  onFail,
  poemId,
}: Params = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(CREATE_STANZA, {
    refetchQueries: [{ query: GET_POEM_STANZAS, variables: { id: poemId } }],
  })

  const createStanza = async (stanza: Partial<Stanza>) => {
    try {
      setLoading(true)
      const response = await action({
        variables: { ...stanza },
      })
      setLoading(false)
      onSuccess && onSuccess(response)
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    createStanza,
    loading,
  }
}
