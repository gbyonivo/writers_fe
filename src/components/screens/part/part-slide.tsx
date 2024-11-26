import { useRef } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
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
          <WriterText>{part.content}</WriterText>
        </ScrollView>
      </TouchableOpacity>
      <WriterText align="center">{indexLabel}</WriterText>
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
})
