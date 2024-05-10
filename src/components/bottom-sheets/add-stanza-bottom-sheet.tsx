import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import { useFormik } from 'formik'
import React, { useMemo } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { HelperText, useTheme } from 'react-native-paper'
import { Stanza } from 'writers_shared'

import { StanzaSchema } from '../../validation-schema/stanza-schema'
import { WriterTextInput } from '../common/inputs/writer-text-input'
import { WriterButton } from '../common/writer-button'
import { WriterIconButton } from '../common/writer-icon-button'
import { WriterText } from '../common/writer-text'

export interface AddStanzaBottomSheetProps {
  onClose: () => void
  poemId: number
  position: number
  parentStanzaId: number
  createStanza: (val: any) => Promise<void>
  previousStanzas: Stanza[]
}

export function AddStanzaBottomSheet({
  onClose,
  parentStanzaId,
  position,
  poemId,
  createStanza,
  previousStanzas,
}: AddStanzaBottomSheetProps) {
  const snapPoints = useMemo(() => ['100%'], [])
  const theme = useTheme()

  console.log(previousStanzas)

  const form = useFormik({
    enableReinitialize: false,
    validationSchema: StanzaSchema,
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

  const bottomSheetIndicator = {
    backgroundColor: theme.colors.background,
  }

  const bottomSheetStyle = {
    backgroundColor: theme.colors.background,
  }

  const hasContent = !!form.values.content

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleIndicatorStyle={bottomSheetIndicator}
      onClose={onClose}
      backgroundStyle={bottomSheetStyle}
      enablePanDownToClose={!hasContent}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={-1}
          enableTouchThrough
          opacity={0.6}
        />
      )}
    >
      <SafeAreaView style={styles.bottomSheetHeader}>
        <WriterIconButton
          onPress={() => {
            form.resetForm()
            onClose()
          }}
          icon="minus"
        />
        <WriterIconButton
          onPress={form.submitForm}
          icon="plus"
          disabled={form.dirty && !form.isValid}
        />
      </SafeAreaView>
      <BottomSheetScrollView>
        <View style={styles.bottomSheetInnerContainer}>
          <>
            <View style={styles.previousContetnContainer}>
              {previousStanzas.map((stanza) => (
                <WriterText
                  key={stanza.id}
                  size={18}
                  style={styles.previousText}
                >
                  {stanza.content}
                </WriterText>
              ))}
            </View>
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
          </>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    margin: 16,
    borderColor: 'transparent',
    borderWidth: 0,
  },

  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },

  bottomSheetInnerContainer: { marginTop: 16 },

  previousContetnContainer: {
    marginHorizontal: 24,
  },

  previousText: { lineHeight: 32 },

  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  inputOutlineStyle: {
    borderWidth: 0,
  },
})
