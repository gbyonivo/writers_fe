import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export function Rail() {
  const theme = useTheme()
  return (
    <View style={[styles.root, { backgroundColor: theme.colors.secondary }]} />
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
})
