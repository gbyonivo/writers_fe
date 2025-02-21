import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { WriterText } from '../../common/writer-text'

export function AdItem() {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.backdrop }]}>
      <WriterText
        fontFamily="Bold"
        size={28}
        align="center"
        color={colors.backdrop}
      >
        AD Space
      </WriterText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: getHeighByRatio(0.3),
    width: getWidthByRatio(1),
    justifyContent: 'center',
  },
})
