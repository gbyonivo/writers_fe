import { useEffect, useState } from 'react'

import {
  onChangePoemSignal,
  onPressCreatePoemSignal,
} from '../../../utils/signal'
import { WriterHeaderButton } from '../writer-header-button'

export function CreatePoemButton() {
  const [enableButton, setEnableButton] = useState(false)

  useEffect(() => {
    let removeListener = null
    if (onChangePoemSignal.getNumberOfListeners() < 1) {
      removeListener = onChangePoemSignal.listen(({ isValid, submitting }) => {
        setEnableButton(isValid && !submitting)
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])

  const onClickPost = () => {
    onPressCreatePoemSignal.emit()
  }

  return (
    <WriterHeaderButton
      label="Create"
      onPress={onClickPost}
      enableButton={enableButton}
    />
  )
}
