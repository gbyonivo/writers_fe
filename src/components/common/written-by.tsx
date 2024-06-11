import { StyleSheet, View } from 'react-native'

import { timeAgo } from '../../utils/date'
import { WriterText } from './writer-text'

interface Props {
  name: string
  createdAt: string
}

export function WrittenBy({ name, createdAt }: Props) {
  return (
    <View>
      <WriterText style={styles.name} fontFamily="ExtraLight">
        by {name}
      </WriterText>
      <WriterText fontFamily="ExtraLight">
        {timeAgo.format(parseInt(createdAt, 10))}
      </WriterText>
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    marginBottom: 4,
  },
})
