import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { usePiece } from '../../../hooks/apollo/use-piece'
import { GenreList } from '../../common/genre/genre-list'
import { PartChainToggle } from '../../common/part/part-chain-toggle'
import { PartListForPiece } from '../../common/part/part-list-for-piece'
import { MovingText } from '../../common/voice-player/moving-text'
import { WriterActivityIndicator } from '../../common/writer-activity-indicator'
import { WriterAgeRating } from '../../common/writer-age-rating'
import { WriterBackground } from '../../common/writer-background'
import { WriterHeader } from '../../common/writer-header'
import { WriterText } from '../../common/writer-text'

interface Props {
  pieceId: number
  pieceName: string
  preselectedPartIds?: string
}

export function PieceScreen({ pieceId, pieceName, preselectedPartIds }: Props) {
  const theme = useTheme()
  const { loading, piece } = usePiece(pieceId)

  return (
    <WriterBackground isView style={styles.parentContainer}>
      {/* <WriterHeader title={piece?.title}> */}
      <WriterHeader
        title={piece?.title}
        containerStyle={{ justifyContent: 'space-between' }}
        maxTitleLength={12}
        isMoving
        movingTextContainerStyle={styles.movingTextContainer}
      >
        <PartChainToggle />
      </WriterHeader>
      <View style={[styles.container]}>
        {!!piece?.genreIds?.length && (
          <View style={styles.ageRatingAndGenreList}>
            <WriterAgeRating
              ageRating={piece?.firstPart?.ageRating}
              small
              style={styles.ageRating}
            />
            <GenreList
              genreIds={piece?.genreIds || []}
              containerStyle={styles.genreListContainer}
            />
          </View>
        )}
        {loading && <WriterActivityIndicator color={theme.colors.onPrimary} />}
        <PartListForPiece
          pieceId={pieceId}
          preselectedPartIds={preselectedPartIds}
        />
      </View>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  parentContainer: {},
  container: {
    flex: 1,
  },
  pieceNameContainer: {
    paddingHorizontal: 24,
  },
  genreListContainer: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    flex: 1,
  },
  ageRatingAndGenreList: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  ageRating: {
    left: 16,
    top: -2,
    position: 'absolute',
  },
  movingTextContainer: {
    width: 100,
  },
})
