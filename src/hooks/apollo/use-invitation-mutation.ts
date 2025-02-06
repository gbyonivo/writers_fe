import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { CREATE_INVITATION } from '../../queries/invitation'
import { MutationHooKParams } from '../../types/mutation'
import { useAlert } from '../use-alert'

interface Params extends MutationHooKParams {}

export const useInvitationMutation = (
  { onSuccess, onFail, showAlert }: Params = { showAlert: true },
) => {
  const { show } = useAlert()
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(CREATE_INVITATION)

  const createInvitation = async (email: string) => {
    try {
      setLoading(true)
      const response = await action({
        variables: { email },
      })
      setLoading(false)
      onSuccess && onSuccess(response)
      if (showAlert) {
        show({ message: 'Invitation has been sent to your friend' })
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
    createInvitation,
    loading,
  }
}
