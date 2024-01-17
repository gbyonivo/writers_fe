import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

interface Props {
  style?: StyleProp<ViewStyle>
}

export const WriterHeader = ({ style }: Props) => {
  return (
    <View style={style}>
      <Text variant="displayMedium" style={styles.appName}>
        AiitPoet
      </Text>
      <Text variant="labelSmall" style={styles.appSlogan}>
        Aiit Poet, take it easy!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  appName: {
    marginBottom: 16,
    textAlign: 'center',
  },
  appSlogan: {
    textAlign: 'center',
  },
})
