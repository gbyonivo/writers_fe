import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { RATE_STANZA } from '../../queries/stanza'
import { MutationHooKParams } from '../../types/mutation'

export const useRateStanzaMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(RATE_STANZA)

  const rateStanza = async ({
    stanzaId,
    rating,
  }: {
    stanzaId: number
    rating: number
  }) => {
    try {
      setLoading(true)
      const response = await action({ variables: { id: stanzaId, rating } })
      setLoading(false)
      onSuccess && onSuccess(response)
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    rateStanza,
    loading,
  }
}
