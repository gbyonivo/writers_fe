import { useRef } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Part } from 'writers_shared'

import { useRatePartMutation } from '../../../hooks/apollo/use-rate-part-mutation'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WriterText } from '../writer-text'
import { PartRatingBottomSheet } from './part-rating-bottom-sheet'

interface Props {
  part: Part
  containerStyle?: StyleProp<ViewStyle>
}

export function PartItem({ part, containerStyle }: Props) {
  const { ratePart } = useRatePartMutation()
  const bottomsheetRef = useRef(null)
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
          <WriterText style={styles.pieceContentText}>
            {part.content}
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
  pieceContentText: {
    lineHeight: 28,
  },
  pieceContentContainer: {
    paddingVertical: 8,
  },
})
