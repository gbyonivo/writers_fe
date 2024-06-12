import { StyleSheet, View } from 'react-native'

import { WriterButton } from '../writer-button'
import { WriterText } from '../writer-text'

interface Props {
  onPressAddStanza: () => void
  showAddStanzaToLineButton: boolean
}

export function NewStanzaButton({
  showAddStanzaToLineButton,
  onPressAddStanza,
}: Props) {
  return (
    <View style={styles.container}>
      {showAddStanzaToLineButton && (
        <WriterButton
          onPress={onPressAddStanza}
          icon="plus"
          style={styles.showFormButton}
        >
          <WriterText>Add Stanza</WriterText>
        </WriterButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  showFormButton: {
    alignSelf: 'flex-start',
  },
})
