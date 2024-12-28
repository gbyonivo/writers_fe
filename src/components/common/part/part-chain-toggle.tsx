import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useDispatch } from 'react-redux'

import { useShouldChainParts } from '../../../hooks/selectors/use-should-chain-parts'
import { toggleShouldChainPart } from '../../../store/slices/settings'
import {
  onBookmarkPiece,
  onPlayPiece,
  onSharePiece,
} from '../../../utils/signal'
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
        style={[styles.iconStyle, style]}
      />
      <WriterIconButton
        icon="share"
        onPress={() => onSharePiece.emit()}
        style={[styles.iconStyle, style]}
      />
      <WriterIconButton
        icon="bookmark"
        onPress={() => onBookmarkPiece.emit()}
        style={[styles.iconStyle, style]}
      />
      <WriterIconButton
        icon={!shouldChainParts ? 'lock-open-variant' : 'lock'}
        onPress={onPressLock}
        style={[styles.iconStyle, style]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  iconStyle: {
    backgroundColor: 'transparent',
  },
})
