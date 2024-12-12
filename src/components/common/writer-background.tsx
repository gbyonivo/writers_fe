import { LinearGradient } from 'expo-linear-gradient'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getHeighByRatio } from '../../utils/common'

interface Props {
  children?: JSX.Element | JSX.Element[]
  style?: StyleProp<ViewStyle>
  isView?: boolean
}

export function WriterBackground({ children, style, isView }: Props) {
  const { colors } = useTheme()
  const Comp = isView ? View : SafeAreaView
  return (
    <Comp
      style={[styles.background, { backgroundColor: colors.background }, style]}
    >
      <LinearGradient
        colors={[colors.background, colors.onSecondary, colors.backdrop]}
        style={[
          styles.linearBackground,
          isView ? styles.linearGradienView : styles.linearGradienVSafeArea,
        ]}
        start={{ x: 0.2, y: 0.3 }}
      />
      {children ? children : <View />}
    </Comp>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },

  linearBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: getHeighByRatio(1),
  },
  linearGradienView: {
    top: 0,
  },
  linearGradienVSafeArea: {
    top: 0,
  },
})
