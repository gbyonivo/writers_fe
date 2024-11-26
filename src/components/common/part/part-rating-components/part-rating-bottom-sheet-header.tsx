import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { Part } from 'writers_shared'

import { getRatingDefaultConfig } from '../../../../utils/common'
import { WriterText } from '../../writer-text'
import { WrittenBy } from '../../written-by'

export interface PartRatingBottomSheetProps {
  part: Part
  newRating: number | null
}

export function PartRatingBottomSheetHeader({
  part,
  newRating,
}: PartRatingBottomSheetProps) {
  const theme = useTheme()
  const initialNumberOfRatings = part.numberOfRatings || 0
  const numberOfRatings = initialNumberOfRatings + (newRating ? 1 : 0)
  const rating =
    ((part.rating || 0) * initialNumberOfRatings + (newRating || 0)) /
      numberOfRatings || 0

  return (
    <View style={styles.header}>
      <WrittenBy
        name={part.user?.name || 'unknown'}
        createdAt={part.createdAt}
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
    paddingHorizontal: 16,
  },
})
