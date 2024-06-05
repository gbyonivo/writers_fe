import { useFormik } from 'formik'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { getHeighByRatio } from '../../../utils/common'
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
  const form = useFormik({
    enableReinitialize: false,
    validationSchema: StanzaSchema,
    initialValues: {
      content: '',
    },
    onSubmit: async (value: { content: string }) => {
      // await createStanza({
      //   ...value,
      //   poemId,
      //   position,
      //   stanzaId: parentStanzaId,
      // })
      console.log({
        ...value,
        poemId,
        position,
        stanzaId: parentStanzaId,
      })
    },
  })

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
        error={form.errors.content}
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
