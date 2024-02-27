import { useFormik } from 'formik'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Poem } from 'writers_shared'

import { usePoemMutation } from '../../../hooks/apollo/use-poem-mutation'
import { PoemCreateForm } from '../../common/poem/poem-create-form'
import { WriterBackground } from '../../common/writer-background'
import { WriterText } from '../../common/writer-text'

export const PoemCreationScreen = () => {
  const [created, setCreated] = useState(false)
  const { createPoem } = usePoemMutation({ onSuccess: () => setCreated(true) })
  const form = useFormik({
    enableReinitialize: false,
    initialValues: {
      title: '',
      firstStanza: {
        content: '',
      },
      stanzaLength: undefined,
    },
    onSubmit: async (value: Partial<Poem>) => {
      console.log(value)
      await createPoem(value)
    },
  })

  return (
    <WriterBackground isView style={styles.container}>
      <>
        <PoemCreateForm
          values={form.values}
          handleChange={form.handleChange}
          onSubmit={form.submitForm}
        />
        {created && <WriterText>Created</WriterText>}
      </>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
})
