import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import { Image, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Piece } from 'writers_shared'

import { TYPE_LABEL_REPLACEMENTS, getWidthByRatio } from '../../../utils/common'
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
    <View style={[styles.container]}>
      <View style={styles.imageAndTitle}>
        <View>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={{ uri: piece.imageUrl }}
              style={[styles.image, { borderColor: theme.colors.scrim }]}
            />
          </TouchableOpacity>
          <WriterAgeRating
            ageRating={piece.firstPart.ageRating}
            style={[
              styles.ageRating,
              {
                backgroundColor: theme.colors.backdrop,
              },
            ]}
            small
          />
        </View>

        <View>
          <WriterText
            color={theme.colors.onBackground}
            size={18}
            fontFamily="Bold"
            style={styles.pieceTitle}
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
          </View>
          <View>
            <WriterText color={theme.colors.outline} size={14}>
              {TYPE_LABEL_REPLACEMENTS[piece.type]}
            </WriterText>
          </View>
        </View>
      </View>
      {piece.firstPart && (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.pieceContent}>
            <WriterText
              style={styles.pieceContentText}
            >{`${piece.firstPart.content}`}</WriterText>
          </View>
        </TouchableOpacity>
      )}
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
  },
  pieceTitle: {
    width: getWidthByRatio(0.6),
    flexWrap: 'wrap',
  },
  pieceContent: {
    marginTop: 20,
    overflow: 'hidden',
    height: 100,
    paddingHorizontal: 8,
    width: getWidthByRatio(0.96),
  },
  pieceContentText: {
    lineHeight: 28,
    marginLeft: -8,
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
    marginTop: 4,
    marginLeft: -4,
    width: getWidthByRatio(1) - 150,
  },
  ageRating: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    borderWidth: 0,
  },
  image: {
    height: 96,
    width: 96,
    borderRadius: 8,
    marginRight: 16,
    borderWidth: 1,
  },
  imageAndTitle: {
    flexDirection: 'row',
  },
})
