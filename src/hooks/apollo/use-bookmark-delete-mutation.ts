import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAuthContext } from '../../context/auth-context'
import { DELETE_BOOKMARK, GET_BOOKMARKS } from '../../queries/bookmark'
import { MutationHooKParams } from '../../types/mutation'
import { useAlert } from '../use-alert'

interface Params extends MutationHooKParams {
  pieceId?: number
}

export const useBookmarkDeleteMutation = (
  { onSuccess, onFail, showAlert }: Params = { showAlert: true },
) => {
  const { show } = useAlert()
  const { user } = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(DELETE_BOOKMARK, {
    refetchQueries: [
      { query: GET_BOOKMARKS, variables: { userId: user?.id, first: 12 } },
    ],
  })

  const deleteBookmark = async (bookmarkId: number) => {
    try {
      setLoading(true)
      const response = await action({
        variables: { id: bookmarkId },
      })
      setLoading(false)
      onSuccess && onSuccess(response)
      if (showAlert) {
        show({ message: 'Successfully deleted' })
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
    deleteBookmark,
    loading,
  }
}
