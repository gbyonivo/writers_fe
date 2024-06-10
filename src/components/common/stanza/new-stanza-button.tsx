import { StyleSheet, View } from 'react-native'

import { WriterButton } from '../writer-button'

interface Props {
  onPressAddStanza: () => void
  shouldShowToggleButton: boolean
}

export function NewStanzaButton({
  shouldShowToggleButton,
  onPressAddStanza,
}: Props) {
  return (
    <View style={styles.container}>
      {shouldShowToggleButton && (
        <WriterButton
          onPress={onPressAddStanza}
          icon="plus"
          style={styles.showFormButton}
        >
          <>Add Stanza</>
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
