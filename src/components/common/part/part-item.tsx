import { useRef } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { Part } from 'writers_shared'

import { useRatePartMutation } from '../../../hooks/apollo/use-rate-part-mutation'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WriterText } from '../writer-text'
import { PartRatingBottomSheet } from './part-rating-bottom-sheet'

interface Props {
  part: Part
  containerStyle?: StyleProp<ViewStyle>
  lineIndex: number
}

export function PartItem({ part, containerStyle, lineIndex }: Props) {
  const { ratePart } = useRatePartMutation()
  const { colors } = useTheme()
  const bottomsheetRef = useRef(null)
  const [firstWord, ...rest] = part.content.trimStart().split(' ')
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          trackEvent({
            event: TrackedEvent.PRESS,
            params: {
              part: part.id,
              buttonName: 'Rate_Part_Item_On_Piece_Screen',
            },
          })
          bottomsheetRef.current.show()
        }}
      >
        <View style={[styles.pieceContentContainer, containerStyle]}>
          <WriterText>
            <WriterText
              style={styles.pieceStartWord}
              size={20}
              color={colors.outlineVariant}
            >
              {`${firstWord}`}
            </WriterText>
            <WriterText style={styles.pieceContentText}>
              {` ${rest.join(' ')}`}
            </WriterText>
          </WriterText>
        </View>
      </TouchableOpacity>
      <PartRatingBottomSheet
        ratePart={(rating: number) => ratePart({ partId: part.id, rating })}
        ref={bottomsheetRef}
        part={part}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pieceContentContainer: {
    paddingVertical: 8,
  },
  pieceContentText: {
    lineHeight: 28,
  },
  pieceStartWord: {
    lineHeight: 28,
  },
})
