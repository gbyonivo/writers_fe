import get from 'lodash.get'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Piece, PieceType } from 'writers_shared/dist/index'

import { images } from '../../../assets/images/images'
import { useFirstPartSuggestionsMutation } from '../../../hooks/apollo/use-first-part-suggestions-mutation'
import { useGenres } from '../../../hooks/apollo/use-genres'
import { SelectOption } from '../../../types/common'
import { getWidthByRatio } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { AnimatedPager } from '../../containers/page-scroller'
import { WriterFloatingButton } from '../buttons/writer-floating-button'
import { GenreMultiSelect } from '../inputs/genre-multi-select'
import { WriterImageSegmentedControl } from '../inputs/writer-image-segmented-control'
import { WriterTextInput } from '../inputs/writer-text-input'
import { VoiceSetUp } from '../voice-set-up'
import { WriterHeaderButton } from '../writer-header-button'
import { WriterText } from '../writer-text'

const typeOptions: SelectOption[] = [
  {
    label: PieceType.POEM,
    value: PieceType.POEM,
    image: images.icons.poem,
  },
  {
    label: PieceType.STORY,
    value: PieceType.STORY,
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
const pages = [
  'Type_Select',
  'Genre_Select',
  'Title',
  'First_Content',
  'Voice_Selection',
]
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
  const { genres } = useGenres()
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
      handleChange({ target: { value: suggestion, name: 'firstPart.content' } })
    },
  })

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
              imageStyle={{
                width: getWidthByRatio(0.35),
                height: getWidthByRatio(0.35),
              }}
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
            <WriterText align="center" mb={32}>
              Select genres that best describe what you want to create
            </WriterText>
            <View>
              <GenreMultiSelect
                genres={genres}
                value={values.genreIds}
                handleChange={handleChange}
                name="genreIds"
                error={formErrors?.genreIds}
                hideImage
              />
            </View>
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
      {pageIndex === 3 && (
        <WriterFloatingButton
          onPress={async () => {
            trackEvent({
              event: TrackedEvent.PRESS,
              params: {
                buttonName: 'Press_First_Part_Suggestion',
                title: values.title,
                genreIds: values.genreIds,
                type: values.type,
              },
            })
            await createFirstPartSuggestions({
              title: values.title,
              genreIds: values.genreIds,
              type: values.type,
            })
          }}
          icon="plus"
          style={styles.floatingButton}
        />
      )}
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
  floatingButton: {
    bottom: 100,
  },
})
