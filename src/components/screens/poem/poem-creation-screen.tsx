import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { CommonGenre, Poem, PoemType } from 'writers_shared/dist/index'

import { usePoemMutation } from '../../../hooks/apollo/use-poem-mutation'
import { useAlert } from '../../../hooks/use-alert'
import {
  onChangePoemSignal,
  onPressNextOnCreationScreenSignal,
} from '../../../utils/signal'
import { PoemSchema } from '../../../validation-schema/poem-schema'
import { PoemCreateForm } from '../../common/poem/poem-create-form'
import { WriterBackground } from '../../common/writer-background'

export function PoemCreationScreen() {
  const [created, setCreated] = useState(false)
  const [error, setError] = useState(null)
  const [nextCounter, setNextCounter] = useState(0)
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
      genre: CommonGenre.OTHERS,
      type: PoemType.POEM,
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
    onChangePoemSignal.emit({
      isValid: form.isValid,
      isDirty: form.dirty,
      submitting: loading,
    })
  }, [form.dirty, form.isValid, loading])

  return (
    <WriterBackground>
      <PoemCreateForm
        values={form.values}
        handleChange={form.handleChange}
        loading={loading}
        formErrors={form.errors}
        submitForm={form.submitForm}
      />
    </WriterBackground>
  )
}
