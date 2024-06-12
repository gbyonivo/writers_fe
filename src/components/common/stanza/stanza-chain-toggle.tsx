import { useDispatch } from 'react-redux'

import { useShouldChainStanzas } from '../../../hooks/selectors/use-should-chain-stanzas'
import { toggleShouldChainStanza } from '../../../store/slices/settings'
import { WriterIconButton } from '../writer-icon-button'

export function StanzaChainToggle() {
  const shouldChainStanzas = useShouldChainStanzas()
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
