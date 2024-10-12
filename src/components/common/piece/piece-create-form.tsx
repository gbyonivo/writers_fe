import get from 'lodash.get'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Piece, PieceType } from 'writers_shared/dist/index'

import { AnimatedPager } from '../../containers/page-scroller'
import { GenreMultiSelect } from '../inputs/genre-multi-select'
import { WriterSegmentedButtons } from '../inputs/writer-segmented-buttons'
import { WriterTextInput } from '../inputs/writer-text-input'
import { VoiceSetUp } from '../voice-set-up'
import { WriterHeaderButton } from '../writer-header-button'

interface Props {
  values: Partial<Piece>
  handleChange: any
  loading: boolean
  formErrors?: any
  submitForm: () => void
  created?: boolean
}

const typeOptions = Object.keys(PieceType).map((val) => ({
  label: val,
  value: val,
}))

const errorKeys = ['type', 'genreIds', 'title', 'firstPart.content', 'voice']
const nextButtonLabel = [
  'Genre',
  'Title',
  'First Content',
  'Voice (optional)',
  'Create',
]
const previousButtonLabel = [
  '',
  'Type',
  'Genres',
  'Title',
  'First Content',
  'Voice',
]

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
      submitForm()
      return
    }
    pagerViewRef.current.setPage(pageIndex + 1)
  }
  const onPressPrevious = () => {
    pagerViewRef.current.setPage(pageIndex - 1)
  }

  useEffect(() => {
    if (created) {
      setPageIndex(0)
    }
  }, [])

  return (
    <>
      <View style={styles.header}>
        <WriterHeaderButton
          label={previousButtonLabel[pageIndex] || 'Previous'}
          onPress={onPressPrevious}
          enableButton={pageIndex > 0}
          icon="arrow-left"
          style={pageIndex === 0 ? { display: 'none' } : {}}
        />
        <WriterHeaderButton
          label={nextButtonLabel[pageIndex] || 'Next'}
          onPress={onPressNext}
          enableButton={!get(formErrors, errorKeys[pageIndex])}
          iconRight
          icon="arrow-right"
        />
      </View>
      <AnimatedPager
        style={styles.pagerView}
        initialPage={0}
        ref={pagerViewRef}
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
        scrollEnabled={false}
      >
        <View key={0} style={styles.formElement}>
          <WriterSegmentedButtons
            options={typeOptions}
            value={values.type}
            handleChange={handleChange}
            name="type"
          />
        </View>
        <View key={1} style={styles.formElement}>
          <GenreMultiSelect
            value={values.genreIds}
            handleChange={handleChange}
            name="genreIds"
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
          <WriterTextInput
            value={values.firstPart.content}
            label="First Part"
            name="firstPart.content"
            handleChange={handleChange}
            multiline
            disabled={loading}
            // error={formErrors?.firstPart?.content}
          />
        </View>
        <View key={4} style={styles.formElement}>
          <VoiceSetUp handleChange={handleChange} value={voiceSetup} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
})
