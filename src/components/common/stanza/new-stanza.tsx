import { StyleSheet, View } from 'react-native'

import { WriterButton } from '../writer-button'

interface Props {
  onPressAdd: () => void
  shouldShowToggleButton: boolean
}

export function NewStanza({ shouldShowToggleButton, onPressAdd }: Props) {
  return (
    <View style={styles.container}>
      {shouldShowToggleButton && (
        <WriterButton
          onPress={onPressAdd}
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
