import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const THUMB_RADIUS_LOW = 12
const THUMB_RADIUS_HIGH = 16

interface Props {
  name?: 'high' | 'low'
}

export function Thumb({ name }: Props) {
  const theme = useTheme()
  return (
    <View
      style={
        name === 'high'
          ? [
              styles.rootHigh,
              {
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.primary,
              },
            ]
          : [
              styles.rootLow,
              {
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.primary,
              },
            ]
      }
    />
  )
}

const styles = StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 2,
  },
  rootHigh: {
    width: THUMB_RADIUS_HIGH * 2,
    height: THUMB_RADIUS_HIGH * 2,
    borderRadius: THUMB_RADIUS_HIGH,
    borderWidth: 2,
  },
})
