import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { usePiece } from '../../../hooks/apollo/use-piece'
import { onGoToPlayerSignal } from '../../../utils/signal'
import { GenreList } from '../../common/genre/genre-list'
import { PartChainToggle } from '../../common/part/part-chain-toggle'
import { PartList } from '../../common/part/part-list'
import { PartListForPiece } from '../../common/part/part-list-for-piece'
import { WriterActivityIndicator } from '../../common/writer-activity-indicator'
import { WriterAgeRating } from '../../common/writer-age-rating'
import { WriterBackground } from '../../common/writer-background'
import { WriterHeader } from '../../common/writer-header'

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
        onPressHeaderTitle={() => onGoToPlayerSignal.emit()}
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
        <PartList pieceId={pieceId} preselectedPartIds={preselectedPartIds} />
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
    flex: 1,
    overflow: 'hidden',
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
