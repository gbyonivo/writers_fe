import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAuthContext } from '../../context/auth-context'
import { CREATE_VIDEO, GET_VIDEOS } from '../../queries/video'
import { MutationHooKParams } from '../../types/mutation'
import { useAlert } from '../use-alert'
import { useVideos } from './use-videos'

interface Params extends MutationHooKParams {
  pieceId?: number
}

export const useVideoMutation = (
  { onSuccess, onFail, showAlert }: Params = { showAlert: true },
) => {
  const { show } = useAlert()
  const { user } = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)
  const { refetch: refetchVideos } = useVideos({ userId: user.id })
  const [action] = useMutation(CREATE_VIDEO, {
    refetchQueries: [
      { query: GET_VIDEOS, variables: { userId: user.id, first: 12 } },
    ],
  })

  const createVideo = async (video: Partial<any>) => {
    console.log(video)
    try {
      setLoading(true)
      const response = await action({
        variables: { ...video },
      })
      setLoading(false)
      onSuccess && onSuccess(response)
      refetchVideos()
      if (showAlert) {
        show({ message: 'Successfully videoed' })
      }
    } catch (e) {
      onFail && onFail(e)
      setLoading(false)
      if (showAlert) {
        show({ message: 'Encountered an issue', type: 'danger' })
      }
    }
  }

  return {
    createVideo,
    loading,
  }
}
