import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Poem } from 'writers_shared'

import { isIos } from '../../../utils/common'
import { WriterTextInput } from '../inputs/writer-text-input'
import { WriterButton } from '../writer-button'

interface Props {
  values: Partial<Poem>
  handleChange: any
  onSubmit: any
  error: any
  loading: boolean
  created: boolean
  submitButtonDisabled?: boolean
  formErrors?: any
}

export function PoemCreateForm({
  values,
  handleChange,
  onSubmit,
  error,
  loading,
  created,
  submitButtonDisabled,
  formErrors,
}: Props) {
  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      keyboardVerticalOffset={isIos ? 100 : 0}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <WriterButton
          style={styles.buttonStyle}
          onPress={onSubmit}
          disabled={loading || created || submitButtonDisabled}
        >
          Create
        </WriterButton>
        <WriterTextInput
          value={values.title}
          label="Title"
          name="title"
          handleChange={handleChange}
          disabled={loading}
          error={formErrors?.title}
        />
        <WriterTextInput
          value={values.firstStanza.content}
          label="First Stanza"
          name="firstStanza.content"
          handleChange={handleChange}
          containerStyle={styles.contentContainer}
          multiline
          disabled={loading}
          error={formErrors?.firstStanza?.content}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    marginTop: 32,
  },
})
