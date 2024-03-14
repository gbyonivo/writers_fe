import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { useStanzaMutation } from '../../../hooks/apollo/use-stanza-mutation'
import { WriterTextInput } from '../inputs/writer-text-input'
import { WriterButton } from '../writer-button'
import { WriterIconButton } from '../writer-icon-button'
import { WriterText } from '../writer-text'

interface Props {
  poemId: number
  position: number
  onSuccess: () => void
  hideForm: () => void
  showForm: () => void
  shouldShowForm: boolean
  shouldShowToggleButton: boolean
  parentStanzaId?: number
}

export function NewStanza({
  poemId,
  position,
  onSuccess,
  hideForm,
  showForm,
  shouldShowForm,
  shouldShowToggleButton,
  parentStanzaId,
}: Props) {
  const [created, setCreated] = useState(false)
  const { createStanza } = useStanzaMutation({
    onSuccess: () => {
      setCreated(true)
      hideForm()
      onSuccess()
    },
  })

  const form = useFormik({
    enableReinitialize: false,
    initialValues: {
      content: '',
    },
    onSubmit: async (value: { content: string }) => {
      await createStanza({
        ...value,
        poemId,
        position,
        stanzaId: parentStanzaId,
      })
    },
  })

  useEffect(() => {
    form.resetForm()
    setCreated(false)
  }, [created])

  return (
    <View style={styles.container}>
      {shouldShowToggleButton && !shouldShowForm && (
        <WriterButton
          onPress={showForm}
          icon="plus"
          style={styles.showFormButton}
        >
          <>Add Stanza ({`${position}`})</>
        </WriterButton>
      )}
      {shouldShowForm && (
        <>
          <WriterTextInput
            value={form.values.content}
            labelComponent={
              <View style={styles.labelContainer}>
                <WriterText style={styles.label}>
                  Your Stanza ({`${position}`})
                </WriterText>
                <View>
                  <WriterIconButton onPress={hideForm} icon="minus" />
                </View>
              </View>
            }
            name="content"
            handleChange={form.handleChange}
            containerStyle={styles.contentContainer}
            multiline
          />
          <WriterButton style={styles.buttonStyle} onPress={form.submitForm}>
            Add Stanza
          </WriterButton>
          {created && <WriterText>Created</WriterText>}
        </>
      )}
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
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    paddingTop: 24,
  },
  showFormButton: {
    alignSelf: 'flex-start',
  },
})
