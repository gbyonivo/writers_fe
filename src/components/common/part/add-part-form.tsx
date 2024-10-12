import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import {
  Country,
  Part,
  Sex,
  SpeakerNamesByCountryAndSex,
  SpeakerStyle,
} from 'writers_shared/dist'

import { usePartMutation } from '../../../hooks/apollo/use-part-mutation'
import { useAlert } from '../../../hooks/use-alert'
import { getHeighByRatio } from '../../../utils/common'
import {
  onChangePartSignal,
  onPressCreatePartSignal,
} from '../../../utils/signal'
import { PartSchema } from '../../../validation-schema/part-schema'
import { WriterTextInput } from '../inputs/writer-text-input'
import { VoiceSetUp, VoiceSetUpValue } from '../voice-set-up'
import { WriterButton } from '../writer-button'

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
  const theme = useTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const form = useFormik({
    enableReinitialize: false,
    validationSchema: PartSchema,
    initialValues: {
      content: '',
      voiceSetup: {
        sex: Sex.FEMALE,
        style: SpeakerStyle.calm,
        country: Country.UK,
        preDelay: 1,
        postDelay: 1,
      },
    },
    onSubmit: async (value: {
      content: string
      voiceSetup: VoiceSetUpValue
    }) => {
      setSubmitting(true)
      try {
        const part: Part = {
          content: value.content,
          speakerPostBreakTime: value.voiceSetup.postDelay,
          speakerPreBreakTime: value.voiceSetup.preDelay,
          speakerName:
            SpeakerNamesByCountryAndSex[value.voiceSetup.country][
              value.voiceSetup.sex
            ],
          pieceId,
          position,
          partId: parentPartId,
          // @ts-ignore
          speakerStyle: value.voiceSetup.style,
        }
        await createPart(part)
        bottomSheetRef.current.collapse()
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
        bottomSheetRef.current.expand()
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
  const snapPoints = useMemo(() => ['80%'], [])
  const bottomSheetIndicator = {
    backgroundColor: theme.colors.background,
  }

  const bottomSheetStyle = {
    backgroundColor: theme.colors.background,
  }

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

      <GestureHandlerRootView>
        <Portal>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            handleIndicatorStyle={bottomSheetIndicator}
            backgroundStyle={bottomSheetStyle}
            enablePanDownToClose
            index={-1}
            backdropComponent={(backdropProps) => (
              <BottomSheetBackdrop
                {...backdropProps}
                disappearsOnIndex={-1}
                enableTouchThrough
                opacity={0.6}
              />
            )}
          >
            <View style={styles.voiceSetUpContainer}>
              <VoiceSetUp
                handleChange={form.handleChange}
                value={form.values.voiceSetup}
              />
              <WriterButton
                onPress={() => form.submitForm()}
                style={styles.button}
                disabled={submitting}
              >
                Add part
              </WriterButton>
            </View>
          </BottomSheet>
        </Portal>
      </GestureHandlerRootView>
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

  voiceSetUpContainer: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  button: {
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
})
