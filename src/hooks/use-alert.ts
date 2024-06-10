import { useCallback } from 'react'
import { useToast } from 'react-native-toast-notifications'

interface ShowAlertParams {
  message: string
  type?: string
  animationType?: 'slide-in' | 'zoom-in'
  placement?: 'top' | 'bottom' | 'center'
}

interface Return {
  show: (value: ShowAlertParams) => void
}

export const useAlert = (): Return => {
  const toast = useToast()

  const show = useCallback(({ message, ...rest }: ShowAlertParams): void => {
    toast.show(message, {
      type: rest.type || 'success',
      animationType: rest.animationType || 'slide-in',
      placement: rest.placement || 'top',
    })
  }, [])

  return {
    show,
  }
}
