import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { usePiece } from '../../../hooks/apollo/use-piece'
import { GenreList } from '../../common/genre/genre-list'
import { PartListForPiece } from '../../common/part/part-list-for-piece'
import { WriterActivityIndicator } from '../../common/writer-activity-indicator'
import { WriterAgeRating } from '../../common/writer-age-rating'
import { WriterBackground } from '../../common/writer-background'
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
      <View style={[styles.container]}>
        <WriterText
          style={styles.pieceNameContainer}
          mb={8}
          mt={8}
          fontFamily="Bold"
          size={24}
          align="center"
        >
          {piece?.title || pieceName}
        </WriterText>
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
    top: 4,
    position: 'absolute',
  },
})
