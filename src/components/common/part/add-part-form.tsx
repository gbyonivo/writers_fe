import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import reactotron from 'reactotron-react-native'

import { usePartMutation } from '../../../hooks/apollo/use-part-mutation'
import { useAlert } from '../../../hooks/use-alert'
import { getHeighByRatio } from '../../../utils/common'
import {
  onChangePartSignal,
  onPressCreatePartSignal,
} from '../../../utils/signal'
import { PartSchema } from '../../../validation-schema/part-schema'
import { WriterTextInput } from '../inputs/writer-text-input'

export interface AddPartFormProps {
  pieceId: number
  position: number
  parentPartId: number
}

export function AddPartForm({
  parentPartId,
  position,
  pieceId,
}: AddPartFormProps) {
  const { createPart } = usePartMutation({ pieceId })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { show } = useAlert()

  useEffect(() => {
    reactotron.log('motherfucker')
  }, [])

  const form = useFormik({
    enableReinitialize: false,
    validationSchema: PartSchema,
    initialValues: {
      content: '',
    },
    onSubmit: async (value: { content: string }) => {
      setSubmitting(true)
      try {
        await createPart({
          ...value,
          pieceId,
          position,
          partId: parentPartId,
        })
        setSubmitting(false)
        show({ message: 'Your part has been added' })
        router.back()
      } catch (e) {
        setError(e)
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    let removeListener = null
    if (onPressCreatePartSignal.getNumberOfListeners() < 1) {
      removeListener = onPressCreatePartSignal.listen(() => {
        form.submitForm()
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])

  useEffect(() => {
    onChangePartSignal.emit({
      isValid: form.isValid,
      isDirty: form.dirty,
      submitting,
    })
  }, [form.dirty, form.isValid, submitting])

  return (
    <View style={{ marginBottom: getHeighByRatio(0.5) }}>
      <WriterTextInput
        value={form.values.content}
        name="content"
        handleChange={form.handleChange}
        containerStyle={styles.contentContainer}
        multiline
        outlineStyle={styles.inputOutlineStyle}
        autoFocus
        style={styles.textStyle}
        error={form.errors.content || error}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    borderColor: 'transparent',
    borderWidth: 0,
  },

  inputOutlineStyle: {
    borderWidth: 0,
  },
  bottomSheetHeader: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 0,
  },
})
