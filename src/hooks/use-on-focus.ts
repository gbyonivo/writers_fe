import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'

export const useOnFocus = (action: () => void) => {
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      action()
    }
  }, [isFocused])
}
