import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Bookmark } from 'writers_shared'

import { useAuthContext } from '../../context/auth-context'
import { CREATE_BOOKMARK, GET_BOOKMARKS } from '../../queries/bookmark'
import { MutationHooKParams } from '../../types/mutation'
import { useAlert } from '../use-alert'

interface Params extends MutationHooKParams {
  pieceId?: number
}

export const useBookmarkMutation = (
  { onSuccess, onFail, showAlert }: Params = { showAlert: true },
) => {
  const { show } = useAlert()
  const { user } = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(CREATE_BOOKMARK, {
    refetchQueries: [
      { query: GET_BOOKMARKS, variables: { userId: user.id, first: 12 } },
    ],
  })

  const createBookmark = async (bookmark: Partial<Bookmark>) => {
    try {
      setLoading(true)
      const response = await action({
        variables: { ...bookmark },
      })
      setLoading(false)
      onSuccess && onSuccess(response)
      if (showAlert) {
        show({ message: 'Successfully bookmarked' })
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
    createBookmark,
    loading,
  }
}
