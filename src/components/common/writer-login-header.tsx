import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { WriterText } from './writer-text'

interface Props {
  style?: StyleProp<ViewStyle>
}

export function WriterLoginHeader({ style }: Props) {
  console.log(
    `${process.env.EXPO_PUBLIC_API_URL}/graphql`,
    'http://192.168.1.150:4000',
  )
  return (
    <View style={style}>
      <WriterText variant="headlineLarge" style={styles.appName}>
        AiitPoet
      </WriterText>
      <WriterText variant="labelSmall" style={styles.appSlogan}>
        You are Poet and I am about to show it
      </WriterText>
    </View>
  )
}

const styles = StyleSheet.create({
  appName: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 32,
  },
  appSlogan: {
    textAlign: 'center',
  },
})
