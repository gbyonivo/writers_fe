import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export function Label({ text, ...restProps }) {
  const theme = useTheme()
  return (
    <View
      style={[styles.root, { backgroundColor: theme.colors.primary }]}
      {...restProps}
    >
      <Text style={[styles.text, { color: theme.colors.onPrimary }]}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
  },
})
