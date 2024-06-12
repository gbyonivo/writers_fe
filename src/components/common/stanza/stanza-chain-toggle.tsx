import { useDispatch, useSelector } from 'react-redux'

import { toggleShouldChainStanza } from '../../../store/slices/settings'
import { AppState } from '../../../types/states/AppState'
import { WriterIconButton } from '../writer-icon-button'

export function StanzaChainToggle() {
  const shouldChainStanzas = useSelector(
    (state: AppState) => state.settings.shouldChainStanzas,
  )
  const dispatch = useDispatch()
  const onPressLock = () => {
    dispatch(toggleShouldChainStanza())
  }
  return (
    <WriterIconButton
      icon={!shouldChainStanzas ? 'lock-open-variant' : 'lock'}
      onPress={onPressLock}
      style={{ backgroundColor: 'transparent' }}
    />
  )
}
