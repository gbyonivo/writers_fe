import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Stanza } from 'writers_shared'

import { WriterText } from '../writer-text'

interface Props {
  stanza: Stanza
  containerStyle?: StyleProp<ViewStyle>
}

export const StanzaItem = ({ stanza, containerStyle }: Props) => {
  return (
    <View style={[styles.poemContentContainer, containerStyle]}>
      <WriterText style={styles.poemContentText}>
        {stanza.content} - {`${stanza.id}`} - {`${stanza.stanzaId || 'none'}`}
      </WriterText>
    </View>
  )
}

const styles = StyleSheet.create({
  poemContentText: {
    lineHeight: 28,
  },
  poemContentContainer: {
    paddingVertical: 8,
  },
})
