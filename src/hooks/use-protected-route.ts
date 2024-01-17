import { router, useRootNavigationState, useSegments } from 'expo-router'
import { useEffect, useState } from 'react'
import { User } from 'writers_shared'

export const useProtectedRoute = (user: User) => {
  const segments = useSegments()
  const navigationState = useRootNavigationState()

  const [hasNavigated, setHasNavigated] = useState(false)
  const userId = user?.id

  useEffect(() => {
    if (!navigationState?.key || hasNavigated) return
    const inAuthGroup = segments[0] === '(auth)'

    if (!user?.id && !inAuthGroup) {
      router.replace('/(auth)/sign-in')
      setHasNavigated(true)
    } else if (user?.id && inAuthGroup) {
      router.replace('/(tabs)')
      setHasNavigated(true)
    }
  }, [userId, segments, navigationState, hasNavigated])
}
