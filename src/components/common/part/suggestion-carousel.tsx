import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { WriterButton } from '../writer-button'
import { WriterText } from '../writer-text'

interface Props {
  suggestions: string[]
  onSelectSuggestion?: (suggestion: string) => void
}

export function SuggestionCarousel({ suggestions, onSelectSuggestion }: Props) {
  return (
    <Carousel
      width={getWidthByRatio(0.9)}
      height={getHeighByRatio(0.7)}
      autoPlay={false}
      data={suggestions}
      scrollAnimationDuration={1000}
      style={styles.carouselStyle}
      renderItem={({ index, item }) => (
        <View>
          <WriterText>{item}</WriterText>
          {!!onSelectSuggestion && (
            <View style={styles.buttonContainer}>
              <WriterButton onPress={() => onSelectSuggestion?.(item)}>
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
