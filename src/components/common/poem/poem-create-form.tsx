import { StyleSheet, View } from 'react-native'
import { Poem } from 'writers_shared'

import { WriterTextInput } from '../inputs/writer-text-input'
import { WriterButton } from '../writer-button'

interface Props {
  values: Partial<Poem>
  handleChange: any
  onSubmit: any
}

export function PoemCreateForm({ values, handleChange, onSubmit }: Props) {
  return (
    <View>
      <WriterTextInput
        value={values.title}
        label="Title"
        name="title"
        handleChange={handleChange}
      />
      <WriterTextInput
        value={values.firstStanza.content}
        label="First Stanza"
        name="firstStanza.content"
        handleChange={handleChange}
        containerStyle={styles.contentContainer}
        multiline
      />
      <WriterButton style={styles.buttonStyle} onPress={onSubmit}>
        Start Poem
      </WriterButton>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 16,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    marginTop: 32,
  },
})
