import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Piece, PieceType } from 'writers_shared/dist/index'

import { usePieceMutation } from '../../../hooks/apollo/use-piece-mutation'
import { useAlert } from '../../../hooks/use-alert'
import { onChangePieceSignal } from '../../../utils/signal'
import { PieceSchema } from '../../../validation-schema/piece-schema'
import { PieceCreateForm } from '../../common/piece/piece-create-form'
import { WriterBackground } from '../../common/writer-background'

export function PieceCreationScreen() {
  const [created, setCreated] = useState(false)
  const { show } = useAlert()
  const router = useRouter()
  const { createPiece, loading } = usePieceMutation({
    onSuccess: (response) => {
      setCreated(true)
      show({ message: 'Your piece has been created' })
      router.push(`/pieces/${response.data.createPiece.id}?backOverride=/home`)
    },
    onFail: () => {
      show({ message: 'Your piece has been created', type: 'danger' })
    },
  })
  const form = useFormik({
    enableReinitialize: false,
    validationSchema: PieceSchema,
    initialValues: {
      title: '',
      genreIds: [],
      type: undefined,
      firstPart: {
        content: '',
      },
    },
    onSubmit: async (value: Partial<Piece>) => {
      await createPiece(value)
    },
  })

  useEffect(() => {
    form.validateForm()
  }, [])

  useEffect(() => {
    if (created) {
      form.resetForm()
      setCreated(false)
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
        created={created}
      />
    </WriterBackground>
  )
}
