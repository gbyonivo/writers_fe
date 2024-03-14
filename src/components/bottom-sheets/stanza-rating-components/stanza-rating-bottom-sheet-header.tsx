import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { Stanza } from 'writers_shared'

import { getRatingDefaultConfig } from '../../../utils/common'
import { WriterText } from '../../common/writer-text'
import { WrittenBy } from '../../common/written-by'

export interface StanzaRatingBottomSheetProps {
  stanza: Stanza
  newRating: number | null
}

export function StanzaRatingBottomSheetHeader({
  stanza,
  newRating,
}: StanzaRatingBottomSheetProps) {
  const theme = useTheme()
  const initialNumberOfRatings = stanza.numberOfRatings || 0
  const numberOfRatings = initialNumberOfRatings + (newRating ? 1 : 0)
  const rating =
    ((stanza.rating || 0) * initialNumberOfRatings + (newRating || 0)) /
      numberOfRatings || 0

  return (
    <View style={styles.header}>
      <WrittenBy
        name={stanza.user?.name || 'unknown'}
        createdAt={stanza.createdAt}
      />
      <View>
        <Rating
          {...getRatingDefaultConfig(theme)}
          imageSize={20}
          startingValue={rating}
          readonly
        />
        {!!numberOfRatings && (
          <WriterText align="center">
            Rated by{' '}
            {`${numberOfRatings ? '1 person' : `${numberOfRatings} people`}`}
          </WriterText>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 16,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
})
