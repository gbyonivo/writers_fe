import React, { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { Stanza } from 'writers_shared'

import { getRatingDefaultConfig } from '../../../utils/common'
import { WriterButton } from '../../common/writer-button'
import { WriterText } from '../../common/writer-text'

export interface StanzaRatingBottomSheetProps {
  userRating?: number
  rateStanza: (rating: number) => void
  setNewRating: (val: number) => void
}

export function StanzaRatingBottomSheetFooter({
  userRating,
  rateStanza,
  setNewRating,
}: StanzaRatingBottomSheetProps) {
  const theme = useTheme()
  const [rating, setRating] = useState(3)
  const [submitted, setSubmitted] = useState(false)
  const [processing, setProcessing] = useState(false)
  const submitRating = async () => {
    try {
      setProcessing(true)
      await rateStanza(rating)
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
        <>
          <View style={styles.ratingContainer}>
            <Rating
              {...getRatingDefaultConfig(theme)}
              imageSize={30}
              startingValue={rating}
              onFinishRating={(val: any) => setRating(val)}
            />
          </View>
          <WriterButton
            onPress={submitRating}
            style={styles.submitButton}
            disabled={processing}
          >
            Submit Rating
          </WriterButton>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: 48,
    justifyContent: 'space-between',
  },
  text: {
    lineHeight: 32,
  },
  ratingContainerStyle: {
    backgroundColor: 'green',
  },
  header: {
    marginTop: 16,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    width: '100%',
    borderTopWidth: 2,
    marginTop: 16,
  },
  footer: {
    width: '100%',
  },
  submitButton: {
    padding: 12,
  },
})
