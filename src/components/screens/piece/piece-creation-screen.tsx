import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import {
  Country,
  Piece,
  PieceType,
  Sex,
  SpeakerStyle,
} from 'writers_shared/dist/index'

import { usePieceMutation } from '../../../hooks/apollo/use-piece-mutation'
import { useAlert } from '../../../hooks/use-alert'
import { createPartWithVoiceSetup } from '../../../utils/part'
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
      show({ message: 'Sorry we encountered an error', type: 'danger' })
    },
  })
  const form = useFormik({
    enableReinitialize: false,
    validationSchema: PieceSchema,
    initialValues: {
      title: '',
      genreIds: [],
      type: PieceType.STORY,
      firstPart: {
        content: '',
        voiceId: '',
        voiceSetup: {
          sex: Sex.FEMALE,
          style: SpeakerStyle.calm,
          country: Country.UK,
          preDelay: 1,
          postDelay: 1,
        },
      },
    },
    // todo: onSubmit: async (value: Partial<Piece>) => {
    onSubmit: async (value: Partial<any>) => {
      await createPiece({
        ...value,
        firstPart: createPartWithVoiceSetup({
          value: value.firstPart,
          position: 1,
          voiceId: value.firstPart.voiceId,
        }),
      })
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
