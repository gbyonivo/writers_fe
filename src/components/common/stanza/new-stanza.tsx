import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { useStanzaMutation } from '../../../hooks/apollo/use-stanza-mutation'
import { WriterTextInput } from '../inputs/writer-text-input'
import { WriterButton } from '../writer-button'
import { WriterText } from '../writer-text'

interface Props {
  poemId: number
  position: number
  onSuccess: () => void
}

export const NewStanza = ({ poemId, position, onSuccess }: Props) => {
  const [created, setCreated] = useState(false)
  const { createStanza } = useStanzaMutation({
    onSuccess: () => {
      setCreated(true)
      onSuccess()
    },
  })

  const form = useFormik({
    enableReinitialize: false,
    initialValues: {
      content: '',
    },
    onSubmit: async (value: { content: string }) => {
      console.log({ ...value, poemId, position })
      await createStanza({ ...value, poemId, position })
    },
  })

  useEffect(() => {
    form.resetForm()
    setCreated(false)
  }, [created])

  return (
    <View style={styles.container}>
      <WriterTextInput
        value={form.values.content}
        label="Your Stanza"
        name="content"
        handleChange={form.handleChange}
        containerStyle={styles.contentContainer}
        multiline
      />
      <WriterButton style={styles.buttonStyle} onPress={form.submitForm}>
        Add Stanza
      </WriterButton>
      {created && <WriterText>Created</WriterText>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  contentContainer: {
    marginTop: 16,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    marginTop: 32,
  },
})
