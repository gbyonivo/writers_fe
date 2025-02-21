import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Piece } from 'writers_shared/dist/index'

import { useFirstPartSuggestionsMutation } from '../../../hooks/apollo/use-first-part-suggestions-mutation'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WriterFloatingButton } from '../buttons/writer-floating-button'
import { WriterTextInput } from '../inputs/writer-text-input'
import { SuggestionCarousel } from '../part/suggestion-carousel'
import { WriterBottomSheet } from '../writer-bottom-sheet'

interface Props {
  values: Partial<Piece>
  handleChange: any
  loading: boolean
}

export function PieceCreateFormFirstPart({
  values,
  handleChange,
  loading,
}: Props) {
  const bottomsheetRef = useRef(null)
  const [suggestions, setSuggestions] = useState([])
  const { createFirstPartSuggestions } = useFirstPartSuggestionsMutation({
    onSuccess: (suggs) => {
      setSuggestions(suggs)
      bottomsheetRef.current.expand()
    },
  })

  return (
    <>
      <WriterTextInput
        value={values.firstPart.content}
        label="First Part"
        name="firstPart.content"
        handleChange={handleChange}
        multiline
        disabled={loading}
        // error={formErrors?.firstPart?.content}
      />
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
        icon="lightbulb"
        style={styles.floatingButton}
      />
      <WriterBottomSheet ref={bottomsheetRef} snapPoints={['80%']}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 16,
          }}
        >
          <SuggestionCarousel
            suggestions={suggestions}
            onSelectSuggestion={(suggestion) => {
              handleChange({
                target: {
                  value: suggestion,
                  name: 'firstPart.content',
                },
              })
            }}
          />
        </View>
      </WriterBottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  floatingButton: {
    bottom: 100,
    zIndex: 100,
  },
})
