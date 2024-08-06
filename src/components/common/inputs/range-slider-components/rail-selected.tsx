import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export function RailSelected() {
  const theme = useTheme()
  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.colors.secondaryContainer },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    height: 4,
    borderRadius: 2,
  },
})
