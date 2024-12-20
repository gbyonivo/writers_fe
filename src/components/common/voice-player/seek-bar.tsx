import Slider from '@react-native-community/slider'
import { useEffect } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import styles from 'rn-range-slider/styles'

interface Props {
  durationMillis: number
  positionMillis: number
  onSeek: (val: number) => void
  containerStyle?: StyleProp<ViewStyle>
}

export function SeekBar({
  durationMillis,
  positionMillis,
  onSeek,
  containerStyle,
}: Props) {
  const theme = useTheme()
  const calculateSeekBarValue = () => {
    if (positionMillis === null || durationMillis === null) {
      return 0
    }
    return positionMillis / durationMillis
  }

  const handleSeek = (value) => {
    const newPosition = value * durationMillis
    onSeek(newPosition)
  }

  return (
    <View style={containerStyle}>
      <Slider
        value={calculateSeekBarValue()}
        onValueChange={handleSeek}
        style={{ flex: 1, marginBottom: -16 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={theme.colors.outlineVariant}
        maximumTrackTintColor={theme.colors.onBackground}
        step={0.0001}
        thumbTintColor="transparent"
      />
    </View>
  )
}
