import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Stanza } from 'writers_shared'

import { CREATE_STANZA } from '../../queries/stanza'
import { MutationHooKParams } from '../../types/mutation'

export const useStanzaMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(CREATE_STANZA)

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
