import { useEffect, useState } from 'react'

import {
  onChangeStanzaSignal,
  onPressCreateStanzaSignal,
} from '../../../utils/signal'
import { WriterButton } from '../writer-button'

export function PostStanzaButton() {
  const [enablePostButton, setEnablePostButton] = useState(false)

  useEffect(() => {
    let removeListener = null
    if (onChangeStanzaSignal.getNumberOfListeners() < 1) {
      removeListener = onChangeStanzaSignal.listen(
        ({ isValid, submitting }) => {
          setEnablePostButton(isValid && !submitting)
        },
      )
    }

    return () => {
      removeListener?.()
    }
  }, [])

  const onClickPost = () => {
    onPressCreateStanzaSignal.emit()
  }

  return (
    <WriterButton onPress={onClickPost} disabled={!enablePostButton}>
      Post
    </WriterButton>
  )
}
