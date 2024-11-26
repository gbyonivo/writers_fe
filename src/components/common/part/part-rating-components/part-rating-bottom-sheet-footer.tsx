import React, { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { Part } from 'writers_shared'

import {
  getRatingDefaultConfig,
  getWidthByRatio,
} from '../../../../utils/common'
import { WriterButton } from '../../writer-button'
import { WriterText } from '../../writer-text'

export interface PartRatingBottomSheetProps {
  userRating?: number
  ratePart: (rating: number) => void
  setNewRating: (val: number) => void
}

export function PartRatingBottomSheetFooter({
  userRating,
  ratePart,
  setNewRating,
}: PartRatingBottomSheetProps) {
  const theme = useTheme()
  const [rating, setRating] = useState(3)
  const [submitted, setSubmitted] = useState(false)
  const [processing, setProcessing] = useState(false)
  const submitRating = async () => {
    try {
      setProcessing(true)
      await ratePart(rating)
      setSubmitted(true)
      setNewRating(rating)
      setProcessing(false)
    } catch (e) {
      setProcessing(false)
    }
  }

  const showText =
    (userRating !== undefined && userRating !== null) || submitted

  return (
    <View style={styles.footer}>
      {showText ? (
        <View>
          <WriterText align="center">
            You have rated this {`${userRating || rating}`}/5
          </WriterText>
        </View>
      ) : (
        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <Rating
              {...getRatingDefaultConfig(theme)}
              imageSize={30}
              startingValue={rating}
              onFinishRating={(val: any) => setRating(val)}
            />
          </View>
          <WriterButton
            onPress={submitRating}
            disabled={processing}
            style={styles.button}
          >
            Submit Rating
          </WriterButton>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  rating: {
    marginVertical: 16,
  },
  ratingContainer: {
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  text: {
    lineHeight: 32,
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: getWidthByRatio(1),
  },
  button: {
    width: 200,
    alignSelf: 'center',
  },
})
