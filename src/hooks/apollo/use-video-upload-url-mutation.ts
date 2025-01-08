import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAuthContext } from '../../context/auth-context'
import { CREATE_VIDEO, GET_VIDEOS, UPLOAD_VIDEO_URL } from '../../queries/video'
import { MutationHooKParams } from '../../types/mutation'
import { useAlert } from '../use-alert'
import { useVideos } from './use-videos'

interface Params extends MutationHooKParams {
  pieceId?: number
}

export const useVideoUploadUrlMutation = (
  { onSuccess, onFail, showAlert }: Params = { showAlert: true },
) => {
  const { show } = useAlert()
  const { user } = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)
  const { refetch: refetchVideos } = useVideos()
  const [action] = useMutation(UPLOAD_VIDEO_URL, {
    refetchQueries: [
      { query: GET_VIDEOS, variables: { userId: user?.id, first: 12 } },
    ],
  })

  const uploadVideoUrl = async ({ id, url }: { id: number; url: string }) => {
    try {
      setLoading(true)
      const response = await action({
        variables: { id, url },
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
    uploadVideoUrl,
    loading,
  }
}
