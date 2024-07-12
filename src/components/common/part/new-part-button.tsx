import { StyleSheet, View } from 'react-native'

import { WriterButton } from '../writer-button'
import { WriterText } from '../writer-text'

interface Props {
  onPressAddPart: () => void
  showAddPartToLineButton: boolean
}

export function NewPartButton({
  showAddPartToLineButton,
  onPressAddPart,
}: Props) {
  return (
    <View style={styles.container}>
      {showAddPartToLineButton && (
        <WriterButton
          onPress={onPressAddPart}
          icon="plus"
          style={styles.showFormButton}
        >
          <WriterText>Add Part</WriterText>
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
