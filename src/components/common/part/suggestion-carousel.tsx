import { StyleSheet, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WriterButton } from '../writer-button'
import { WriterText } from '../writer-text'

interface Props {
  suggestions: string[]
  onSelectSuggestion?: (suggestion: string) => void
}

export function SuggestionCarousel({ suggestions, onSelectSuggestion }: Props) {
  return (
    <Carousel
      width={getWidthByRatio(1)}
      height={getHeighByRatio(0.6)}
      autoPlay={false}
      data={suggestions}
      scrollAnimationDuration={1000}
      style={styles.carouselStyle}
      renderItem={({ item }) => (
        <View key={item} style={{ padding: 8 }}>
          <WriterText>{item}</WriterText>
          {!!onSelectSuggestion && (
            <View style={styles.buttonContainer}>
              <WriterButton
                onPress={() => {
                  trackEvent({
                    event: TrackedEvent.PRESS,
                    params: {
                      suggestionSelected: item,
                    },
                  })
                  onSelectSuggestion?.(item)
                }}
              >
                Use Suggestion
              </WriterButton>
            </View>
          )}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  carouselStyle: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
})
