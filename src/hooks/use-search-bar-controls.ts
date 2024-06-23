import { useCallback } from 'react'
import { LayoutChangeEvent } from 'react-native'

export interface SearchBarControls {
  onFocus?: () => void
  onBlur?: () => void
  onSubmitEditing?: () => void
  onChangeText?: (value: string) => void
  isFocus?: any
  refInput?: any
  cancelButtonWidth?: any
  clearButton?: any
}

export const useSearchBarControls = ({
  refInput,
  cancelButtonWidth,
  clearButton,
  isFocus,
  onChangeText,
  onFocus,
  onSubmitEditing,
  onBlur,
}: SearchBarControls) => {
  const onCancel = useCallback(() => {
    refInput.current?.blur()
  }, [refInput])

  const onCancelLayout = useCallback(
    (event: LayoutChangeEvent) => {
      cancelButtonWidth.value = event.nativeEvent.layout.width
    },
    [cancelButtonWidth],
  )

  const onClear = useCallback(() => {
    refInput.current?.clear()
    clearButton.value = false
    onChangeText?.('')
  }, [refInput, clearButton, onChangeText])

  const onTextInputFocus = useCallback(() => {
    isFocus.value = true
    onFocus?.()
  }, [isFocus, onFocus])

  const onTextInputBlur = useCallback(() => {
    isFocus.value = false
    onBlur?.()
  }, [isFocus, onBlur])

  const onTextInputSubmitEditing = useCallback(() => {
    isFocus.value = false
    onSubmitEditing?.()
  }, [isFocus, onSubmitEditing])

  const onChangeTextInput = useCallback(
    (text: string) => {
      onChangeText?.(text)
      if (text.length > 0) {
        clearButton.value = true
      } else {
        clearButton.value = false
      }
    },
    [clearButton, onChangeText],
  )

  return {
    onChangeTextInput,
    onTextInputSubmitEditing,
    onTextInputBlur,
    onTextInputFocus,
    onClear,
    onCancel,
    onCancelLayout,
  }
}
