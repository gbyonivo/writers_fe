import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Part } from 'writers_shared'

import { useBottomSheetContext } from '../../../context/bottom-sheet-context'
import { useRatePartMutation } from '../../../hooks/apollo/use-rate-part-mutation'
import { BottomSheet } from '../../../types/bottom-sheet'
import { PROCESSING_STAGE } from '../../../types/common'
import { WriterText } from '../writer-text'

interface Props {
  part: Part
  containerStyle?: StyleProp<ViewStyle>
}

export function PartItem({ part, containerStyle }: Props) {
  const { selectBottomSheet } = useBottomSheetContext()
  const { ratePart } = useRatePartMutation()
  return (
    <TouchableOpacity
      onPress={() => {
        selectBottomSheet({
          bottomSheet: BottomSheet.PART_RATING,
          params: {
            part,
            ratePart: (rating: number) => {
              ratePart({ partId: part.id, rating })
            },
          },
        })
      }}
    >
      <View style={[styles.pieceContentContainer, containerStyle]}>
        <WriterText style={styles.pieceContentText}>{part.content}</WriterText>
      </View>
    </TouchableOpacity>
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
