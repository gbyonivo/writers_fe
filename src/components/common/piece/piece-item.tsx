import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import { Image, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Piece } from 'writers_shared'

import { getWidthByRatio } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { GenreList } from '../genre/genre-list'
import { WriterAgeRating } from '../writer-age-rating'
import { WriterText } from '../writer-text'
import { WrittenBy } from '../written-by'
import { PieceLikeButton } from './piece-like-button'

interface Props {
  piece: Piece
  trackedScreen: TrackedScreen
}

export function PieceItem({ piece, trackedScreen }: Props) {
  const router = useRouter()
  const theme = useTheme()
  const containerStyle = {
    borderBottomColor: theme.colors.backdrop,
  }
  const onPress = () => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        buttonName: 'Piece Item',
        screen: trackedScreen,
      },
    })
    router.push(`/pieces/${piece.id}?name=${piece?.title}`)
  }

  if (!piece) return null
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.imageAndTitle}>
          <Image source={{ uri: piece.imageUrl }} style={styles.image} />
          <View>
            <WriterText
              color={theme.colors.onSurfaceVariant}
              size={18}
              fontFamily="Bold"
            >
              {piece.title}
            </WriterText>
            <View>
              {!!piece.genreIds.length && (
                <GenreList
                  genreIds={piece.genreIds}
                  containerStyle={styles.genreListContainer}
                />
              )}
              <WriterAgeRating
                ageRating={piece.firstPart.ageRating}
                style={styles.ageRating}
                small
              />
            </View>
          </View>
        </View>
        {piece.firstPart && (
          <View style={styles.pieceContent}>
            <WriterText
              style={styles.pieceContentText}
              fontFamily="Medium"
            >{`${piece.firstPart.content}`}</WriterText>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.pieceFooter}>
        <WrittenBy name={piece.user.name} createdAt={piece.createdAt} />
        <View>
          <PieceLikeButton pieceId={piece.id} likes={piece.likes} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    borderBottomWidth: 2,
  },
  pieceContent: {
    marginTop: 20,
    overflow: 'hidden',
    height: 100,
  },
  pieceContentText: {
    lineHeight: 28,
    fontStyle: 'italic',
  },
  pieceWriter: {
    marginBottom: 4,
  },
  pieceFooter: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genreListContainer: {
    marginTop: 8,
    paddingLeft: 32,
    width: getWidthByRatio(1) - 110,
  },
  ageRating: {
    position: 'absolute',
    top: 12,
    left: 0,
  },
  image: {
    height: 96,
    width: 96,
    borderRadius: 8,
    marginRight: 16,
  },
  imageAndTitle: {
    flexDirection: 'row',
  },
})
