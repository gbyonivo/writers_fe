import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { CREATE_AUDIO_URLS } from '../../queries/audio'
import { GET_NEXT_PART_SUGGESTIONS } from '../../queries/suggestions'
import { MutationHooKParams } from '../../types/mutation'

export const useAudioMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(CREATE_AUDIO_URLS)

  const createAudios = async (data: { pieceId: number; partIds: number[] }) => {
    try {
      setLoading(true)
      const response = await action({
        variables: data,
      })
      setLoading(false)
      onSuccess?.(response)
      console.log('response', response)
      return response
    } catch (e) {
      console.log(e)
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    createAudios,
    loading,
  }
}
