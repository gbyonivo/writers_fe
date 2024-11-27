import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { Country, Part, Sex, SpeakerStyle } from 'writers_shared/dist'

import { useGenres } from '../../../hooks/apollo/use-genres'
import { useNextPartSuggestionsMutation } from '../../../hooks/apollo/use-next-part-suggestions-mutation'
import { usePartMutation } from '../../../hooks/apollo/use-part-mutation'
import { useAlert } from '../../../hooks/use-alert'
import { AppState } from '../../../types/states/AppState'
import { getHeighByRatio } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { createPartWithVoiceSetup } from '../../../utils/part'
import {
  onChangePartSignal,
  onPressCreatePartSignal,
} from '../../../utils/signal'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { PartSchema } from '../../../validation-schema/part-schema'
import { WriterTextInput } from '../inputs/writer-text-input'
import { VoiceSetUp, VoiceSetUpValue } from '../voice-set-up'
import { WriterButton } from '../writer-button'
import { SparkForm } from './spark-form'
import { SuggestionCarousel } from './suggestion-carousel'

export interface AddPartFormProps {
  pieceId: number
  position: number
  parentPartId: number
  joinedPreviousPartIds: string
  setInitialText: (val: string) => void
}

enum BottomSheetContentType {
  VOICE_FORM,
  AI_HELP,
  SUGGESTIONS,
}

const snapPoints = ['80%']

export const AddPartForm = forwardRef(function AddPartFormComp(
  {
    parentPartId,
    position,
    pieceId,
    joinedPreviousPartIds,
    setInitialText,
  }: AddPartFormProps,
  ref,
) {
  const { createPart } = usePartMutation({ pieceId })
  const [submitting, setSubmitting] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [bottomSheetContentType, setBottomSheetContentType] = useState(
    BottomSheetContentType.VOICE_FORM,
  )
  const [error, setError] = useState(null)
  const router = useRouter()
  const { show } = useAlert()
  const { genres } = useGenres()
  const theme = useTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { shouldUseAiForOnlyTips } = useSelector(
    (state: AppState) => state.settings,
  )
  const bottomSheetIndicator = {
    backgroundColor: theme.colors.background,
  }
  const bottomSheetStyle = {
    backgroundColor: theme.colors.background,
  }

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
        const part: Part = createPartWithVoiceSetup({
          value,
          parentPartId,
          position,
          pieceId,
        })
        await createPart(part)
        bottomSheetRef.current.close()
        setSubmitting(false)
        show({ message: 'Your part has been added' })
        router.back()
      } catch (e) {
        setError(e)
        setSubmitting(false)
      }
    },
  })

  useImperativeHandle(ref, () => {
    return {
      showAiHelp: (aiSuggestion: string) => {
        Keyboard.dismiss()
        if (aiSuggestion) {
          setInitialText(form.values.content)
          form.setFieldValue('content', aiSuggestion)
          return
        }
        setBottomSheetContentType(BottomSheetContentType.AI_HELP)
        bottomSheetRef.current.expand()
      },
      undo: (initialText: string) => {
        form.setFieldValue('content', initialText)
      },
    }
  }, [])

  const { createNextPartSuggestions } = useNextPartSuggestionsMutation({
    onSuccess: (suggestionList) => {
      setSuggestions(suggestionList)
      setBottomSheetContentType(BottomSheetContentType.SUGGESTIONS)
    },
  })

  useEffect(() => {
    let removeListener = null
    if (onPressCreatePartSignal.getNumberOfListeners() < 1) {
      removeListener = onPressCreatePartSignal.listen(() => {
        Keyboard.dismiss()
        setBottomSheetContentType(BottomSheetContentType.VOICE_FORM)
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
            onClose={() => {
              Keyboard.dismiss()
            }}
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
              {bottomSheetContentType === BottomSheetContentType.VOICE_FORM && (
                <>
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
                </>
              )}
              {bottomSheetContentType === BottomSheetContentType.AI_HELP && (
                <SparkForm
                  genres={genres}
                  onSubmit={({ genreIds }) => {
                    const partIds = joinedPreviousPartIds
                      .split(',')
                      .map((partIdAsStr) => parseInt(partIdAsStr, 10))
                    trackEvent({
                      event: TrackedEvent.PRESS,
                      params: {
                        buttonName: 'Find_Spark',
                        genreIds,
                        pieceId,
                        partIds,
                      },
                    })
                    createNextPartSuggestions({
                      pieceId,
                      partIds,
                      genreIds,
                    })
                  }}
                  loading={submitting}
                />
              )}
              {bottomSheetContentType ===
                BottomSheetContentType.SUGGESTIONS && (
                <SuggestionCarousel
                  suggestions={suggestions}
                  onSelectSuggestion={
                    !shouldUseAiForOnlyTips &&
                    ((suggestion) => form.setFieldValue('content', suggestion))
                  }
                />
              )}
            </View>
          </BottomSheet>
        </Portal>
      </GestureHandlerRootView>
    </View>
  )
})

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
