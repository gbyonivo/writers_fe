import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import { AgeRating } from 'writers_shared/dist'

import { WriterText } from '../common/writer-text'

interface Props {
  ageRating: AgeRating
  style?: StyleProp<ViewStyle>
  small?: boolean
}

// const ageRatingColor: Record<AgeRating, string> = {
//   U: '#ff7d12',
//   PG: '#ff7d12',
//   '12': '#ff7d12',
//   '15': '#fb4e93',
//   '18': '#dc090a',
// }

export function WriterAgeRating({ ageRating, style, small }: Props) {
  const theme = useTheme()
  return (
    <View
      style={[
        styles.container,
        small ? styles.smallContainer : styles.bigContainer,
        { backgroundColor: theme.colors.scrim },
        style,
      ]}
    >
      <WriterText fontFamily="Bold" size={small ? 14 : 28} align="center">
        {ageRating}
      </WriterText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'white',
  },
  bigContainer: {
    width: 60,
    height: 60,
    borderRadius: 60,
    padding: 8,
  },
  smallContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    padding: 3.5,
  },
})
