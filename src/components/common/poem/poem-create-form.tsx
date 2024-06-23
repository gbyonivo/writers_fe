import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import { Poem } from 'writers_shared'

import { isIos } from '../../../utils/common'
import { WriterTextInput } from '../inputs/writer-text-input'

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
  loading,
  formErrors,
}: Props) {
  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      keyboardVerticalOffset={isIos ? 100 : 0}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
