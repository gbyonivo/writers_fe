import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { WriterText } from './writer-text'

interface Props {
  style?: StyleProp<ViewStyle>
}

export function WriterLoginHeader({ style }: Props) {
  return (
    <View style={style}>
      <WriterText variant="headlineLarge" style={styles.appName}>
        AiitPoet
      </WriterText>
      <WriterText
        variant="labelSmall"
        fontFamily="ExtraLight"
        style={styles.appSlogan}
      >
        {`Lets twist it a little bit, tweak it a little bit.\nSee what we get`}
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
