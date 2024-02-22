import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { WriterText } from './writer-text'

interface Props {
  style?: StyleProp<ViewStyle>
}

export const WriterLoginHeader = ({ style }: Props) => {
  return (
    <View style={style}>
      <WriterText variant="displayMedium" style={styles.appName}>
        AiitPoet
      </WriterText>
      <WriterText variant="labelSmall" style={styles.appSlogan}>
        Aiit Poet, take it easy!
      </WriterText>
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
