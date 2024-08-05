import { useEffect, useState } from 'react'

import {
  onChangePartSignal,
  onPressCreatePartSignal,
} from '../../../utils/signal'
import { WriterHeaderButton } from '../writer-header-button'

export function PostPartButton() {
  const [enableButton, setEnableButton] = useState(false)

  useEffect(() => {
    let removeListener = null
    if (onChangePartSignal.getNumberOfListeners() < 1) {
      removeListener = onChangePartSignal.listen(({ isValid, submitting }) => {
        setEnableButton(isValid && !submitting)
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])

  const onClickPost = () => {
    onPressCreatePartSignal.emit()
  }

  return (
    <WriterHeaderButton
      label="Voice"
      onPress={onClickPost}
      enableButton={enableButton}
    />
  )
}
