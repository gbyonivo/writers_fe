import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import React, { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { Stanza } from 'writers_shared'

import { WriterButton } from '../common/writer-button'
import { WriterText } from '../common/writer-text'
import { WrittenBy } from '../common/written-by'

export interface StanzaRatingBottomSheetProps {
  onClose: () => void
  stanza: Stanza
  rateStanza: (rating: number) => void
  loading: boolean
}

export const StanzaRatingBottomSheet = ({
  onClose,
  stanza,
  rateStanza,
  loading,
}: StanzaRatingBottomSheetProps) => {
  const snapPoints = useMemo(() => ['80%'], [])
  const theme = useTheme()
  const [rating, setRating] = useState(3)

  const commonRatingProps = useMemo(
    () => ({
      type: 'star',
      tintColor: theme.colors.background,
      ratingColor: theme.colors.error,
      ratingBackgroundColor: theme.colors.primary,
      ratingTextColor: theme.colors.onBackground,
      ratingCount: 5,
    }),
    [],
  )

  const bottomSheetIndicator = {
    backgroundColor: theme.colors.background,
  }

  const bottomSheetStyle = {
    backgroundColor: theme.colors.background,
  }

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleIndicatorStyle={bottomSheetIndicator}
      onClose={onClose}
      backgroundStyle={bottomSheetStyle}
      enablePanDownToClose
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={-1}
          enableTouchThrough
          opacity={0.6}
        />
      )}
    >
      <View style={[styles.contentContainer]}>
        <View style={styles.header}>
          <WrittenBy
            name={stanza.user?.name || 'unknown'}
            createdAt={stanza.createdAt}
          />
          <View>
            <Rating
              {...commonRatingProps}
              imageSize={20}
              startingValue={stanza.rating}
              readonly
            />
            {!!stanza.numberOfRatings && (
              <WriterText align="center">
                Rated by{' '}
                {`${stanza.numberOfRatings ? '1 person' : `${stanza.numberOfRatings} people`}`}
              </WriterText>
            )}
          </View>
        </View>
        <ScrollView
          style={[
            styles.body,
            {
              borderColor: theme.colors.onSecondary,
            },
          ]}
        >
          <WriterText style={styles.text}>{stanza.content}</WriterText>
        </ScrollView>
        <View style={styles.footer}>
          {stanza.userRating !== undefined && stanza.userRating !== null ? (
            <View>
              <WriterText align="center">
                You have rated this {`${stanza.userRating}`}/5
              </WriterText>
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: 16,
                }}
              >
                <Rating
                  {...commonRatingProps}
                  imageSize={30}
                  startingValue={rating}
                  onFinishRating={(val: any) => setRating(val)}
                />
              </View>
              <WriterButton
                onPress={() => rateStanza(rating)}
                style={styles.submitButton}
                disabled={loading}
              >
                Submit Rating
              </WriterButton>
            </>
          )}
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
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
