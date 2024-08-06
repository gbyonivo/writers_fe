import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useDispatch } from 'react-redux'

import { useShouldChainParts } from '../../../hooks/selectors/use-should-chain-parts'
import { toggleShouldChainPart } from '../../../store/slices/settings'
import { onBookmarkPiece, onPlayPiece } from '../../../utils/signal'
import { WriterIconButton } from '../writer-icon-button'

export function PartChainToggle({ style }: { style?: StyleProp<ViewStyle> }) {
  const shouldChainParts = useShouldChainParts()
  const dispatch = useDispatch()
  const onPressLock = () => {
    dispatch(toggleShouldChainPart())
  }
  return (
    <View style={styles.container}>
      <WriterIconButton
        icon="play"
        onPress={() => onPlayPiece.emit()}
        style={[{ backgroundColor: 'transparent' }, style]}
      />
      <WriterIconButton
        icon="share"
        onPress={() => console.log('share')}
        style={[{ backgroundColor: 'transparent' }, style]}
      />
      <WriterIconButton
        icon="bookmark"
        onPress={() => onBookmarkPiece.emit()}
        style={[{ backgroundColor: 'transparent' }, style]}
      />
      <WriterIconButton
        icon={!shouldChainParts ? 'lock-open-variant' : 'lock'}
        onPress={onPressLock}
        style={[{ backgroundColor: 'transparent' }, style]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
})
