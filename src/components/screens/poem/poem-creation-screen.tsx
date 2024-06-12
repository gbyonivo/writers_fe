import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Poem } from 'writers_shared'

import { usePoemMutation } from '../../../hooks/apollo/use-poem-mutation'
import { useAlert } from '../../../hooks/use-alert'
import {
  onChangePoemSignal,
  onPressCreatePoemSignal,
} from '../../../utils/signal'
import { PoemSchema } from '../../../validation-schema/poem-schema'
import { PoemCreateForm } from '../../common/poem/poem-create-form'
import { WriterBackground } from '../../common/writer-background'

export function PoemCreationScreen() {
  const [created, setCreated] = useState(false)
  const [error, setError] = useState(null)
  const { show } = useAlert()
  const { createPoem, loading } = usePoemMutation({
    onSuccess: () => {
      setCreated(true)
      show({ message: 'Your poem has been created' })
    },
    onFail: (e) => setError(e),
  })
  const form = useFormik({
    enableReinitialize: false,
    validationSchema: PoemSchema,
    initialValues: {
      title: '',
      firstStanza: {
        content: '',
      },
      stanzaLength: undefined,
    },
    onSubmit: async (value: Partial<Poem>) => {
      await createPoem(value)
    },
  })

  useEffect(() => {
    if (created) {
      form.resetForm()
    }
  }, [created])

  useEffect(() => {
    let removeListener = null
    if (onPressCreatePoemSignal.getNumberOfListeners() < 1) {
      removeListener = onPressCreatePoemSignal.listen(() => {
        form.submitForm()
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])

  useEffect(() => {
    onChangePoemSignal.emit({
      isValid: form.isValid,
      isDirty: form.dirty,
      submitting: loading,
    })
  }, [form.dirty, form.isValid, loading])

  return (
    <WriterBackground isView style={styles.container}>
      <>
        <PoemCreateForm
          values={form.values}
          handleChange={form.handleChange}
          onSubmit={form.submitForm}
          loading={loading}
          error={error}
          created={created}
          submitButtonDisabled={!form.isValid && form.dirty}
          formErrors={form.errors}
        />
      </>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
})
