import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { APP_TITLE } from '../../utils/constants'
import { WriterText } from './writer-text'

interface Props {
  style?: StyleProp<ViewStyle>
}

export function WriterLoginHeader({ style }: Props) {
  return (
    <View style={style}>
      <WriterText variant="headlineLarge" style={styles.appName}>
        {APP_TITLE}
      </WriterText>
      <WriterText
        variant="labelSmall"
        fontFamily="ExtraLight"
        style={styles.appSlogan}
      >
        Let's spin a few tales
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
