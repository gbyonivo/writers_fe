import { useQuery } from '@apollo/client'

import { GET_USER } from '../../queries/user'

export const useUser = (userId: number) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  })
  return {
    loading,
    error,
    user: data?.user || null,
  }
}
