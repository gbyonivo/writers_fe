import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { CommonGenre, Piece, PieceType } from 'writers_shared/dist/index'

import { usePieceMutation } from '../../../hooks/apollo/use-piece-mutation'
import { useAlert } from '../../../hooks/use-alert'
import {
  onChangePieceSignal,
  onPressNextOnCreationScreenSignal,
} from '../../../utils/signal'
import { PieceSchema } from '../../../validation-schema/piece-schema'
import { PieceCreateForm } from '../../common/piece/piece-create-form'
import { WriterBackground } from '../../common/writer-background'

export function PieceCreationScreen() {
  const [created, setCreated] = useState(false)
  const [error, setError] = useState(null)
  const [nextCounter, setNextCounter] = useState(0)
  const { show } = useAlert()
  const { createPiece, loading } = usePieceMutation({
    onSuccess: () => {
      setCreated(true)
      show({ message: 'Your piece has been created' })
    },
    onFail: (e) => setError(e),
  })
  const form = useFormik({
    enableReinitialize: false,
    validationSchema: PieceSchema,
    initialValues: {
      title: '',
      genre: [CommonGenre.OTHERS],
      type: PieceType.POEM,
      firstPart: {
        content: '',
      },
      partLength: undefined,
    },
    onSubmit: async (value: Partial<Piece>) => {
      await createPiece(value)
    },
  })

  useEffect(() => {
    if (created) {
      form.resetForm()
    }
  }, [created])

  useEffect(() => {
    onChangePieceSignal.emit({
      isValid: form.isValid,
      isDirty: form.dirty,
      submitting: loading,
    })
  }, [form.dirty, form.isValid, loading])

  return (
    <WriterBackground>
      <PieceCreateForm
        values={form.values}
        handleChange={form.handleChange}
        loading={loading}
        formErrors={form.errors}
        submitForm={form.submitForm}
      />
    </WriterBackground>
  )
}
