import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import reactotron from 'reactotron-react-native'

import { useStanzaMutation } from '../../../hooks/apollo/use-stanza-mutation'
import { useAlert } from '../../../hooks/use-alert'
import { getHeighByRatio } from '../../../utils/common'
import {
  onChangeStanzaSignal,
  onPressCreateStanzaSignal,
} from '../../../utils/signal'
import { StanzaSchema } from '../../../validation-schema/stanza-schema'
import { WriterTextInput } from '../inputs/writer-text-input'

export interface AddStanzaFormProps {
  poemId: number
  position: number
  parentStanzaId: number
}

export function AddStanzaForm({
  parentStanzaId,
  position,
  poemId,
}: AddStanzaFormProps) {
  const { createStanza } = useStanzaMutation()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { show } = useAlert()

  useEffect(() => {
    reactotron.log('motherfucker')
  }, [])

  const form = useFormik({
    enableReinitialize: false,
    validationSchema: StanzaSchema,
    initialValues: {
      content: '',
    },
    onSubmit: async (value: { content: string }) => {
      setSubmitting(true)
      try {
        await createStanza({
          ...value,
          poemId,
          position,
          stanzaId: parentStanzaId,
        })
        setSubmitting(false)
        show({ message: 'Your stanza has been added' })
        router.back()
      } catch (e) {
        setError(e)
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    let removeListener = null
    if (onPressCreateStanzaSignal.getNumberOfListeners() < 1) {
      removeListener = onPressCreateStanzaSignal.listen(() => {
        form.submitForm()
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])

  useEffect(() => {
    onChangeStanzaSignal.emit({
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
