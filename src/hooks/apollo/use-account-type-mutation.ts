import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { UPDATE_ACCOUNT_TYPE } from '../../queries/user'
import { setAccountType } from '../../store/slices/login'
import { MutationHooKParams } from '../../types/mutation'

export const useAccountTypeMutation = ({
  onSuccess,
  onFail,
}: MutationHooKParams = {}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [action] = useMutation(UPDATE_ACCOUNT_TYPE)
  const dispatch = useDispatch()

  const updateAccountType = async ({
    accountType,
  }: {
    accountType: string
  }) => {
    try {
      setLoading(true)
      const response = await action({ variables: { accountType } })
      const newAccountType = response.data.updateAccountType.accountType
      dispatch(setAccountType(newAccountType as string))
      setLoading(false)
      onSuccess && onSuccess(response)
    } catch (e) {
      console.log(e)
      onFail && onFail(e)
      setLoading(false)
    }
  }

  return {
    updateAccountType,
    loading,
  }
}
