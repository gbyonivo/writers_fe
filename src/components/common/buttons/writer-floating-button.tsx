import { BlurView } from 'expo-blur'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { useTheme } from 'react-native-paper'

import { Icon, WriterIcon } from '../writer-icon'

interface Props {
  onPress: () => void
  style?: StyleProp<ViewStyle>
  icon: Icon
  iconSize?: number
}

export function WriterFloatingButton({
  onPress,
  style,
  icon,
  iconSize = 40,
}: Props) {
  const { colors } = useTheme()
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <BlurView
        intensity={10}
        style={[styles.blur, { backgroundColor: colors.backdrop }]}
      />
      <WriterIcon icon={icon} size={iconSize} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    opacity: 0.2,
    borderRadius: 35,
  },
})
