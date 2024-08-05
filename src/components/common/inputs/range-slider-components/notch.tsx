import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export function Notch() {
  const theme = useTheme()
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.primary,
          borderLeftColor: theme.colors.background,
          borderRightColor: theme.colors.background,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
})
