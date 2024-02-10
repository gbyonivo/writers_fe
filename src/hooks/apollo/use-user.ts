import { useQuery } from '@apollo/client'
import { User } from 'writers_shared'

import { GET_USER } from '../../queries/user'

export const useUser = (userId: number) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  })
  const user: User | null = data?.user || null
  return {
    loading,
    error,
    user,
  }
}
