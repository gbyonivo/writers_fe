import { useRef } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Part } from 'writers_shared'

import { useRatePartMutation } from '../../../hooks/apollo/use-rate-part-mutation'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedComponentLocation } from '../../../utils/tracking/tracked-component-location'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { PartRatingBottomSheet } from '../../common/part/part-rating-bottom-sheet'
import { WriterText } from '../../common/writer-text'
import { WrittenBy } from '../../common/written-by'

interface Props {
  part: Part
  indexLabel: string
}

export function PartSlide({ part, indexLabel }: Props) {
  const { ratePart } = useRatePartMutation()
  const bottomsheetRef = useRef(null)
  const { colors } = useTheme()
  const onPressPart = ({ part }: { part: Part }) => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        partId: part.id,
        location: TrackedComponentLocation.FLOATING_PLAYER_CAROUSEL,
      },
    })
    bottomsheetRef.current.show()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPressPart({ part })}
        style={{ height: 350, padding: 8 }}
      >
        <ScrollView>
          <WriterText style={styles.content}>{part.content}</WriterText>
        </ScrollView>
      </TouchableOpacity>
      <WriterText align="center" mt={16} mb={16} color={colors.outline}>
        {indexLabel}
      </WriterText>
      <WrittenBy name={part.user?.name} createdAt={part.createdAt} />
      <PartRatingBottomSheet
        ratePart={(rating: number) => {
          trackEvent({
            event: TrackedEvent.RATE_PART,
            params: {
              rating,
              partId: part.id,
            },
          })
          ratePart({ rating, partId: part.id })
        }}
        ref={bottomsheetRef}
        part={part}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    lineHeight: 28,
  },
})
