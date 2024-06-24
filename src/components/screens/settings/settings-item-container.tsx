import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

export function SettingsItemContainer({
  children,
  style,
}: {
  children: any
  style?: StyleProp<ViewStyle>
}) {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
})
