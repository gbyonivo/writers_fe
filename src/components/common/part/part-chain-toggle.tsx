import { StyleProp, ViewStyle } from 'react-native'
import { useDispatch } from 'react-redux'

import { useShouldChainParts } from '../../../hooks/selectors/use-should-chain-parts'
import { toggleShouldChainPart } from '../../../store/slices/settings'
import { WriterIconButton } from '../writer-icon-button'

export function PartChainToggle({ style }: { style?: StyleProp<ViewStyle> }) {
  const shouldChainParts = useShouldChainParts()
  const dispatch = useDispatch()
  const onPressLock = () => {
    dispatch(toggleShouldChainPart())
  }
  return (
    <WriterIconButton
      icon={!shouldChainParts ? 'lock-open-variant' : 'lock'}
      onPress={onPressLock}
      style={[{ backgroundColor: 'transparent' }, style]}
    />
  )
}
