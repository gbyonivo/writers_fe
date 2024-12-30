import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Piece } from 'writers_shared/dist/index'

import { useFirstPartSuggestionsMutation } from '../../../hooks/apollo/use-first-part-suggestions-mutation'
import { trackEvent } from '../../../utils/mixpanel'
import {
  errorKeys,
  nextButtonLabel,
  pages,
  previousButtonLabel,
} from '../../../utils/piece-creation'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { AnimatedPager } from '../../containers/page-scroller'
import { WriterTextInput } from '../inputs/writer-text-input'
import { VoiceSetUpContainer } from '../voice-set-up-container'
import { WriterHeader } from '../writer-header'
import { PieceCreateFormFirstPart } from './piece-create-form-first-part'
import { PieceCreateFormGenres } from './piece-create-form-genres'
import { PieceCreateFormHeader } from './piece-create-form-header'
import { PieceCreateFormType } from './piece-create-form-type'

interface Props {
  values: Partial<Piece>
  handleChange: any
  loading: boolean
  formErrors?: any
  submitForm: () => void
  created?: boolean
}

export function PieceCreateForm({
  values,
  handleChange,
  loading,
  formErrors,
  submitForm,
  created,
}: Props) {
  const pagerViewRef = useRef(null)
  const [pageIndex, setPageIndex] = useState(0)
  const onPressNext = () => {
    if (pageIndex === nextButtonLabel.length - 1) {
      trackEvent({
        event: TrackedEvent.PRESS,
        params: {
          buttonName: 'Submit_Piece_Creation_Form',
        },
      })
      submitForm()
      return
    }
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        buttonName: 'Next_Form_In_Piece_Creation',
        from: pages[pageIndex],
        to: pages[pageIndex + 1],
      },
    })
    pagerViewRef.current.setPage(pageIndex + 1)
  }
  const onPressPrevious = () => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        buttonName: 'Next_Form_In_Piece_Creation',
        from: pages[pageIndex],
        to: pages[pageIndex - 1],
      },
    })
    pagerViewRef.current.setPage(pageIndex - 1)
  }

  useEffect(() => {
    if (created) {
      setPageIndex(0)
    }
  }, [])

  const { createFirstPartSuggestions } = useFirstPartSuggestionsMutation({
    onSuccess: ([suggestion]) => {
      handleChange({
        target: {
          value: suggestion,
          name: 'firstPart.content',
        },
      })
    },
  })

  return (
    <>
      <WriterHeader title="" hideBackButton containerStyle={styles.header}>
        <PieceCreateFormHeader
          type={values.type}
          loading={loading}
          formErrors={formErrors}
          pageIndex={pageIndex}
          onPressNext={onPressNext}
          onPressPrevious={onPressPrevious}
          errorKey={errorKeys[pageIndex]}
          previousBtnLabel={previousButtonLabel[pageIndex]}
          nextBtnLabel={nextButtonLabel[pageIndex]}
        />
      </WriterHeader>

      <AnimatedPager
        style={styles.pagerView}
        initialPage={0}
        ref={pagerViewRef}
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
        scrollEnabled={false}
      >
        <View key={0} style={styles.formElement}>
          <PieceCreateFormType type={values.type} handleChange={handleChange} />
        </View>
        <View key={1} style={styles.formElement}>
          <PieceCreateFormGenres
            handleChange={handleChange}
            genreIds={values.genreIds}
            error={formErrors?.genreIds}
          />
        </View>
        <View key={2} style={styles.formElement}>
          <WriterTextInput
            value={values.title}
            label="Title"
            name="title"
            handleChange={handleChange}
            disabled={loading}
            // error={formErrors?.title}
          />
        </View>
        <View key={3} style={styles.formElement}>
          <PieceCreateFormFirstPart
            values={values}
            handleChange={handleChange}
            loading={loading}
          />
        </View>
        <View key={4} style={styles.formElement}>
          <VoiceSetUpContainer
            handleChange={handleChange}
            // @ts-ignore
            value={values.firstPart.voiceSetup}
            prefix="firstPart."
            voiceId={values.firstPart.voiceId}
          />
        </View>
      </AnimatedPager>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formElement: {
    paddingHorizontal: 24,
  },
  pagerView: {
    flex: 1,
  },
  floatingButton: {
    bottom: 100,
  },
  header: {
    justifyContent: 'flex-end',
  },
})
