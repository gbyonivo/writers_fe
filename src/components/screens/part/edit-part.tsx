import { useGlobalSearchParams, useRouter } from 'expo-router'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import {
  Country,
  Part,
  Sex,
  SpeakerNamesByCountryAndSex,
  SpeakerStyle,
} from 'writers_shared/dist'

import { usePartsByIds } from '../../../hooks/apollo/use-parts-by-ids'
import { usePiece } from '../../../hooks/apollo/use-piece'
import { useUpdatePartMutation } from '../../../hooks/apollo/use-update-part-mutation'
import { getHeighByRatio } from '../../../utils/common'
import { createPartWithVoiceSetup } from '../../../utils/part'
import { PartSchema } from '../../../validation-schema/part-schema'
import { WriterTextInput } from '../../common/inputs/writer-text-input'
import { VoiceSetUp, VoiceSetUpValue } from '../../common/voice-set-up'
import { VoiceSetUpContainer } from '../../common/voice-set-up-container'
import { WriterBackground } from '../../common/writer-background'
import { WriterButton } from '../../common/writer-button'
import { WriterHeader } from '../../common/writer-header'
import { AnimatedPager } from '../../containers/page-scroller'

export function EditPart() {
  const { partId, id: pieceId } = useGlobalSearchParams()
  const { parts } = usePartsByIds({ partIds: [parseInt(partId as string, 10)] })
  const { piece } = usePiece(parseInt(pieceId as string, 10))
  const part = parts?.[0]
  const pagerViewRef = useRef<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { updatePart } = useUpdatePartMutation({ showAlert: true })
  const { colors } = useTheme()

  const form = useFormik({
    enableReinitialize: false,
    validationSchema: PartSchema,
    initialValues: {
      content: part?.content || '',
      voiceSetup: {
        sex: Sex.FEMALE,
        style: SpeakerStyle.calm,
        country: Country.UK,
        preDelay: part?.naratorPreBreakTime || 1,
        postDelay: part?.naratorPostBreakTime || 1,
      },
      voiceId: part?.voiceId || '',
    },
    onSubmit: async (value: {
      content: string
      voiceSetup: VoiceSetUpValue
      voiceId: string
    }) => {
      setSubmitting(true)
      try {
        const updatedPart = createPartWithVoiceSetup({
          value,
          pieceId: parseInt(pieceId as string, 10),
          voiceId: value.voiceId,
        })
        await updatePart({ ...updatedPart, id: part.id })
        setSubmitting(false)
        router.back()
      } catch (e) {
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    if (!part) return
    let speakerSex = Sex.FEMALE
    const countryKey = Object.keys(SpeakerNamesByCountryAndSex).find((key) => {
      const isCorrect =
        SpeakerNamesByCountryAndSex[key].FEMALE === part.speakerName ||
        SpeakerNamesByCountryAndSex[key].MALE === part.speakerName
      if (isCorrect) {
        speakerSex =
          SpeakerNamesByCountryAndSex[key].FEMALE === part.speakerName
            ? Sex.FEMALE
            : Sex.MALE
      }
      return isCorrect
    })
    form.setFieldValue('voiceSetup', {
      sex: speakerSex,
      style: part.speakerStyle,
      country: countryKey,
      preDelay: part?.naratorPreBreakTime || 1,
      postDelay: part?.naratorPostBreakTime || 1,
    })

    form.setFieldValue('content', part?.content || '')
    console.log(part?.voiceId)
    form.setFieldValue('voiceId', part?.voiceId || '')
  }, [part])

  return (
    <WriterBackground isView>
      <WriterHeader
        title={`Edit Part ${part?.position} of ${piece?.title}`}
        containerStyle={styles.header}
      >
        <WriterButton
          onPress={form.submitForm}
          style={styles.createButton}
          disabled={submitting}
        >
          Save
        </WriterButton>
      </WriterHeader>
      <AnimatedPager
        style={styles.pagerView}
        initialPage={0}
        ref={pagerViewRef}
        scrollEnabled={false}
      >
        <View key={0} style={styles.formElement}>
          <WriterTextInput
            mode="flat"
            name="content"
            value={form.values.content}
            handleChange={form.handleChange}
            multiline
            style={{
              borderWidth: 0,
              borderColor: 'transparent',
              backgroundColor: 'transparent',
            }}
            containerStyle={{ borderWidth: 0, borderColor: 'transparent' }}
          />
          <View
            style={[styles.buttonContainer, { justifyContent: 'flex-end' }]}
          >
            <WriterButton
              onPress={() => pagerViewRef.current.setPage(1)}
              icon="chevron-right"
              iconColor={colors.outlineVariant}
              textColor={colors.outlineVariant}
              iconRight
            >
              Edit Voice
            </WriterButton>
          </View>
        </View>
        <View key={1} style={styles.formElement}>
          <VoiceSetUpContainer
            handleChange={(e) => {
              if (e.target.name === 'voiceId') {
                form.setFieldValue('voiceId', e.target.value)
              } else {
                form.handleChange(e)
              }
            }}
            value={form.values.voiceSetup}
            voiceId={form.values.voiceId}
            voiceContainerStyle={styles.voiceContainer}
          />
          <View style={[styles.buttonContainer, styles.editContentButton]}>
            <WriterButton
              onPress={() => pagerViewRef.current.setPage(0)}
              icon="chevron-left"
              iconColor={colors.outlineVariant}
              textColor={colors.outlineVariant}
            >
              Edit Content
            </WriterButton>
          </View>
        </View>
      </AnimatedPager>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    paddingRight: 16,
  },

  formElement: {
    marginVertical: 8,
    paddingHorizontal: 24,
  },
  createButton: {
    height: 56,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  voiceContainer: {
    overflow: 'hidden',
  },
  editContentButton: {
    position: 'absolute',
    bottom: 32,
    left: 32,
  },
})
