import { useState } from 'react'

export const useEnhancedRefetch = (refetch: () => Promise<any>) => {
  const [refetching, setRefetching] = useState(false)
  const [errorRefetching, setErrorRefetching] = useState(null)
  const [response, setResponse] = useState(null)

  const enhancedRefetch = async () => {
    try {
      setErrorRefetching(null)
      setRefetching(true)
      const response = await refetch()
      setResponse(response)
      setRefetching(false)
    } catch (e) {
      setRefetching(false)
      setErrorRefetching(e)
    }
  }

  return {
    refetching,
    errorRefetching,
    enhancedRefetch,
    refetch,
    response,
  }
}
