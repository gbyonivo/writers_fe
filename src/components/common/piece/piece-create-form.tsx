import get from 'lodash.get'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Piece, PieceType } from 'writers_shared/dist/index'

import { images } from '../../../assets/images/images'
import { SelectOption } from '../../../types/common'
import { AnimatedPager } from '../../containers/page-scroller'
import { GenreMultiSelect } from '../inputs/genre-multi-select'
import { WriterImageSegmentedControl } from '../inputs/writer-image-segmented-control'
import { WriterSegmentedButtons } from '../inputs/writer-segmented-buttons'
import { WriterTextInput } from '../inputs/writer-text-input'
import { VoiceSetUp } from '../voice-set-up'
import { WriterHeaderButton } from '../writer-header-button'
import { WriterText } from '../writer-text'

const typeOptions: SelectOption[] = [
  {
    value: PieceType.POEM,
    _id: PieceType.POEM,
    image: images.icons.poem,
  },
  {
    value: PieceType.STORY,
    _id: PieceType.STORY,
    image: images.icons.story,
  },
]

const poemDescription =
  'A poem is a form of literary art that uses rhythmic and often metaphorical language to evoke emotions, convey ideas, or tell a story. It can take various forms, including sonnets, haikus, free verse, and more.'
const storyDescription =
  'A story is a structured narrative that conveys a series of events, whether real or imaginary, designed to engage the reader or listener. It typically includes characters, a plot, and a setting, and can be expressed through various forms such as written text, oral tradition, or performance.'

interface Props {
  values: Partial<Piece>
  handleChange: any
  loading: boolean
  formErrors?: any
  submitForm: () => void
  created?: boolean
}

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
          <View>
            <WriterText mb={16}>What do you want to create?</WriterText>
            <WriterImageSegmentedControl
              handleChange={handleChange}
              name="type"
              options={typeOptions}
              value={values.type}
            />
            <WriterText mt={24}>
              {values.type === PieceType.POEM
                ? poemDescription
                : storyDescription}
            </WriterText>
          </View>
        </View>
        <View key={1} style={styles.formElement}>
          <View>
            <WriterText align="center">
              Select genres that best describe what you want to create
            </WriterText>
            <GenreMultiSelect
              value={values.genreIds}
              handleChange={handleChange}
              name="genreIds"
              error={formErrors?.genreIds}
            />
          </View>
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
          <VoiceSetUp
            handleChange={handleChange}
            // @ts-ignore
            value={values.firstPart.voiceSetup}
            prefix="firstPart."
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
})
